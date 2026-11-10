import Anthropic from "@anthropic-ai/sdk";
import { jsonSchemaOutputFormat } from "@anthropic-ai/sdk/helpers/json-schema";
import { currentUser } from "@clerk/nextjs/server";
import { accessFrom } from "@/lib/plan";
import {
  SNAP_MAX_BYTES,
  SNAP_MEDIA_TYPES,
  SNAP_MODEL,
  SNAP_SCHEMA,
  SNAP_SYSTEM,
  snapResult,
  type SnapIdentification,
  type SnapMediaType,
} from "@/lib/snap";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const jsonError = (status: number, message: string) => Response.json({ error: message }, { status });

// Per-user limit on this server instance. The Anthropic Console spend limit is the real ceiling.
const SNAPS_PER_WINDOW = 10;
const WINDOW_MS = 10 * 60 * 1000;
const recent = new Map<string, number[]>();
function overLimit(userId: string, now = Date.now()): boolean {
  const times = (recent.get(userId) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= SNAPS_PER_WINDOW) return true;
  recent.set(userId, [...times, now]);
  return false;
}

const isMediaType = (type: string): type is SnapMediaType => (SNAP_MEDIA_TYPES as readonly string[]).includes(type);

/** Identifies the car in an uploaded photo. Body: multipart form with a "photo" file. */
export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return jsonError(503, "Snap a car isn't set up yet. Please check back soon.");

  // An AI feature, so it's part of a paid plan like the advisor.
  const user = await currentUser();
  if (!user) return jsonError(401, "Log in to use Snap a car.");
  if (!accessFrom(user.publicMetadata).advisor) return jsonError(402, "Snap a car needs a plan. Pick one on this page to continue.");
  if (overLimit(user.id)) return jsonError(429, "You've snapped a lot of photos. Please wait a few minutes and try again.");

  const form = await request.formData().catch(() => null);
  const photo = form?.get("photo");
  if (!(photo instanceof File)) return jsonError(400, "Choose a photo to upload.");
  if (!isMediaType(photo.type)) return jsonError(415, "Use a JPEG, PNG, WebP or GIF photo.");
  if (photo.size > SNAP_MAX_BYTES) return jsonError(413, "That photo is too large. Try one under 4 MB.");

  const data = Buffer.from(await photo.arrayBuffer()).toString("base64");
  const client = new Anthropic({ apiKey, maxRetries: 1, timeout: 45_000 });

  try {
    const response = await client.messages.parse({
      model: SNAP_MODEL,
      max_tokens: 3000,
      output_config: { effort: "low", format: jsonSchemaOutputFormat(SNAP_SCHEMA) },
      system: [{ type: "text", text: SNAP_SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: photo.type, data } },
            { type: "text", text: "Identify the car in this photo." },
          ],
        },
      ],
    });
    console.log(
      `snap usage: in=${response.usage.input_tokens} cache_read=${response.usage.cache_read_input_tokens ?? 0} out=${response.usage.output_tokens} stop=${response.stop_reason}`,
    );
    if (response.stop_reason === "refusal") return jsonError(422, "We couldn't look at that photo. Try a different one.");
    const identification = response.parsed_output as SnapIdentification | null;
    if (!identification) return jsonError(502, "We couldn't read that photo. Please try again.");
    return Response.json(snapResult(identification));
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return jsonError(503, "Snap a car is busy right now. Please try again in a minute.");
    if (error instanceof Anthropic.BadRequestError) return jsonError(400, "That photo couldn't be read. Try a JPEG or PNG.");
    if (error instanceof Anthropic.APIConnectionError) return jsonError(503, "Couldn't reach the car identifier. Please try again.");
    console.error("snap failed", error instanceof Error ? error.message : error);
    return jsonError(500, "Something went wrong. Please try again.");
  }
}
