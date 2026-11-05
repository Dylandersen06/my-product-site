import Anthropic from "@anthropic-ai/sdk";
import { cardsFromReply } from "@/lib/advisor-cards";
import { verifyReply } from "@/lib/advisor-verify";
import { MAX_ASSISTANT_CHARS, MAX_MESSAGE_CHARS, MAX_OUTPUT_TOKENS, MAX_USER_MESSAGES, RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW_MS } from "@/lib/advisor-limits";
import { ADVISOR_SYSTEM_PROMPT } from "@/lib/advisor-prompt";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = "claude-haiku-5-5";
const MAX_BODY_BYTES = (MAX_USER_MESSAGES * MAX_MESSAGE_CHARS + MAX_USER_MESSAGES * MAX_ASSISTANT_CHARS) * 2;

const jsonError = (status: number, message: string, headers: HeadersInit = {}) =>
  Response.json({ error: message }, { status, headers });

/** Browsers send Origin on cross-site requests. Requests without one aren't from another site's page. */
function fromAnotherSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== request.headers.get("host");
  } catch {
    return true;
  }
}

// Per-visitor limit. Serverless instances don't share memory, so this slows
// abuse rather than stopping it outright. A spend limit in the Anthropic Console
// is the real ceiling on cost.
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now = Date.now()): number | null {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_REQUESTS) {
    hits.set(ip, recent);
    return Math.ceil((recent[0] + RATE_LIMIT_WINDOW_MS - now) / 1000);
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return null;
}

/** Checks a conversation from the browser, which can't be trusted to follow the limits. */
function validate(body: unknown): { messages: Anthropic.MessageParam[] } | { error: string } {
  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return { error: "Send at least one message." };
  if (raw.length > MAX_USER_MESSAGES * 2 - 1) {
    return { error: `This chat has reached its limit of ${MAX_USER_MESSAGES} questions. Start a new chat to continue.` };
  }
  const messages: Anthropic.MessageParam[] = [];
  for (const [i, message] of raw.entries()) {
    const role = i % 2 === 0 ? "user" : "assistant";
    const content = (message as { content?: unknown })?.content;
    if ((message as { role?: unknown })?.role !== role || typeof content !== "string" || !content.trim()) {
      return { error: "That conversation isn't in a valid format. Start a new chat to continue." };
    }
    if (role === "user" && content.length > MAX_MESSAGE_CHARS) {
      return { error: `Messages can be up to ${MAX_MESSAGE_CHARS} characters.` };
    }
    if (role === "assistant" && content.length > MAX_ASSISTANT_CHARS) {
      return { error: "That conversation isn't in a valid format. Start a new chat to continue." };
    }
    messages.push({ role, content });
  }
  if (messages[messages.length - 1].role !== "user") return { error: "The last message must be yours." };
  return { messages };
}

/** A message that's safe to show visitors, with no API details. */
function friendlyError(error: unknown): string {
  if (error instanceof Anthropic.RateLimitError) return "The advisor is busy right now. Please try again in a minute.";
  if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) {
    return "The advisor isn't available right now.";
  }
  if (error instanceof Anthropic.APIConnectionError) return "Couldn't reach the advisor. Please try again.";
  return "Something went wrong with the advisor. Please try again.";
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return jsonError(503, "The advisor isn't set up yet. Please check back soon.");

  if (fromAnotherSite(request)) return jsonError(403, "Not allowed.");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const retryAfter = rateLimited(ip);
  if (retryAfter !== null) {
    return jsonError(429, "You've sent a lot of messages. Please wait a few minutes and try again.", {
      "Retry-After": String(retryAfter),
    });
  }

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return jsonError(413, "That conversation is too long. Start a new chat to continue.");
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return jsonError(400, "That request isn't valid.");
  }
  const checked = validate(body);
  if ("error" in checked) return jsonError(400, checked.error);

  const client = new Anthropic({ apiKey, maxRetries: 1, timeout: 45_000 });
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    // Thinking stays on: with it off, the model reasons and corrects itself in the
    // visible reply. It counts toward max_tokens, so that limit allows room for it.
    output_config: { effort: "low" },
    system: [{ type: "text", text: ADVISOR_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: checked.messages,
  });

  // One JSON object per line: {text}, then {cards} and {corrections} if any, then {done, stop} or {error}.
  const encoder = new TextEncoder();
  const body$ = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: object) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            send({ text: event.delta.text });
          }
        }
        const final = await stream.finalMessage();
        console.log(
          `advisor usage: in=${final.usage.input_tokens} cache_read=${final.usage.cache_read_input_tokens ?? 0} cache_write=${final.usage.cache_creation_input_tokens ?? 0} out=${final.usage.output_tokens} stop=${final.stop_reason} blocks=${final.content.map((b) => `${b.type}:${b.type === "text" ? `${b.text.length}c/${b.text.replace(/\s/g, "").length}nonspace` : JSON.stringify(b).length}`).join(",")}`,
        );
        const reply = final.content.flatMap((block) => (block.type === "text" ? [block.text] : [])).join("");
        const cards = cardsFromReply(reply);
        if (cards.length > 0) send({ cards });
        const previous = checked.messages.findLast((m) => m.role === "assistant");
        const corrections = verifyReply(reply, typeof previous?.content === "string" ? previous.content : "");
        if (corrections.length > 0) {
          console.log(`advisor corrections: ${corrections.length}`);
          send({ corrections });
        }
        send({ done: true, stop: final.stop_reason });
      } catch (error) {
        if (!stream.aborted) {
          console.error("advisor error:", error instanceof Anthropic.APIError ? error.status : "connection");
          send({ error: friendlyError(error) });
        }
      } finally {
        try {
          controller.close();
        } catch {
          // The visitor already left.
        }
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body$, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },
  });
}
