"use client";

import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import CarPhoto from "@/components/CarPhoto";
import type { AdvisorCard } from "@/lib/advisor-cards";
import { MAX_MESSAGE_CHARS, MAX_USER_MESSAGES } from "@/lib/advisor-limits";
import { usd } from "@/lib/budget";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  /** Recommended cars from the dataset, shown under the reply. */
  cards?: AdvisorCard[];
  /** What the data check found wrong in the reply. */
  corrections?: string[];
}

/** Corrections go back with the reply, so the next answer doesn't repeat the mistake. */
const contentForServer = ({ content, corrections }: ChatMessage) =>
  corrections?.length ? `${content}\n\nCorrections from the site's data check: ${corrections.join(" ")}` : content;

const STORAGE_KEY = "carmatch-advisor-chat";
const STARTERS = [
  "I commute 40 miles a day and want to spend as little as possible on gas. Budget around $30k.",
  "We have three kids and a big dog, and we camp most weekends. What should we get?",
  "I want something fun for weekends that can still handle a daily drive, under $60k.",
];

/** Renders **bold** and "- " lists as React elements, so model text is never treated as HTML. */
function formatInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  );
}

const isBullet = (line: string) => /^\s*[-*] /.test(line);

/** Splits a block into runs of plain lines and runs of "- " bullets, so a pitch line can sit above its bullets. */
function MessageText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).filter((b) => b.trim());
  return (
    <>
      {blocks.flatMap((block, i) => {
        const runs: { bullets: boolean; lines: string[] }[] = [];
        for (const line of block.split("\n").filter((l) => l.trim())) {
          const bullets = isBullet(line);
          const last = runs[runs.length - 1];
          if (last && last.bullets === bullets) last.lines.push(line);
          else runs.push({ bullets, lines: [line] });
        }
        return runs.map((run, r) =>
          run.bullets ? (
            <ul key={`${i}-${r}`}>
              {run.lines.map((l, j) => (
                <li key={j}>{formatInline(l.replace(/^\s*[-*] /, ""))}</li>
              ))}
            </ul>
          ) : (
            <p key={`${i}-${r}`} className={/^my take:/i.test(run.lines[0].trim()) ? "advisor-take" : undefined}>
              {run.lines.map((l, j) => (
                <span key={j}>
                  {j > 0 && <br />}
                  {formatInline(l)}
                </span>
              ))}
            </p>
          ),
        );
      })}
    </>
  );
}

const MORE_OPTIONS_MESSAGE = "Can you show me a few more options?";

function RecommendationCards({ cards }: { cards: AdvisorCard[] }) {
  return (
    <section className="advisor-stats" aria-label="Full stats for the recommended cars">
      <h3 className="advisor-stats-title">Full stats</h3>
      <ul className="advisor-cards">
        {cards.map((card, i) => (
          <li key={`${card.id}-${card.trim}-${card.condition}`} className="advisor-card">
            <CarPhoto name={card.name} bodyLabel={card.bodyLabel} photo={card.photo} />
            <div className="advisor-card-body">
              {i === 0 && cards.length > 1 && <span className="advisor-card-badge">Top pick</span>}
              <h3>{card.name}</h3>
              <p className="advisor-card-trim">
                {card.trim} · {card.conditionLabel}
              </p>
              <dl className="advisor-card-figures">
                <div>
                  <dt>{card.condition === "new" ? "Starting price" : "Price (est.)"}</dt>
                  <dd>{usd(card.price)}</dd>
                </div>
                {card.yearlyCost !== undefined && (
                  <div>
                    <dt>Running cost (est.)</dt>
                    <dd>{usd(card.yearlyCost)}/yr</dd>
                  </div>
                )}
              </dl>
              <p className="advisor-card-monthly">
                Yearly average over 5 years for fuel, maintenance, insurance and registration at 12,000 miles a year.
                Doesn&rsquo;t include the price or financing.
              </p>
              {card.stats && (
                <dl className="advisor-card-specs">
                  {card.stats.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {card.features && card.features.length > 0 && (
                <>
                  <h4 className="advisor-card-subhead">Features</h4>
                  <ul className="advisor-card-tags">
                    {card.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
              {card.highlights && card.highlights.length > 0 && (
                <>
                  <h4 className="advisor-card-subhead">Highlights</h4>
                  <p className="advisor-card-highlights">{card.highlights.join(" · ")}</p>
                </>
              )}
              <Link href={card.href} className="button button-outline advisor-card-link">
                View details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AdvisorChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const [restored, setRestored] = useState(false);

  // Keep the chat for this browser tab, so visiting other pages doesn't lose it.
  useEffect(() => {
    try {
      const saved: ChatMessage[] = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
      // A reload mid-reply can leave an unanswered question at the end. Drop it.
      while (saved.length > 0 && (saved[saved.length - 1].role === "user" || !saved[saved.length - 1].content)) {
        saved.pop();
      }
      setMessages(saved);
    } catch {
      // Storage can be unavailable. The chat still works without it.
    }
    setRestored(true);
    return () => abort.current?.abort();
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // See above.
    }
    if (messages.length > 0) end.current?.scrollIntoView({ block: "nearest" });
  }, [messages, restored]);

  const asked = messages.filter((m) => m.role === "user").length;
  const atLimit = asked >= MAX_USER_MESSAGES;

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy || atLimit || content.length > MAX_MESSAGE_CHARS) return;
    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setBusy(true);
    const controller = new AbortController();
    abort.current = controller;

    const appendText = (delta: string) =>
      setMessages((current) => {
        const last = current[current.length - 1];
        return [...current.slice(0, -1), { ...last, content: last.content + delta }];
      });
    let reply = "";
    let failure: string | null = null;

    try {
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Only the words go back to the server. Cards are for display.
        body: JSON.stringify({ messages: history.map((m) => ({ role: m.role, content: contentForServer(m) })) }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong with the advisor. Please try again.");
      }
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line) continue;
          const event = JSON.parse(line);
          if (event.text) {
            reply += event.text;
            appendText(event.text);
          }
          if (event.cards) {
            setMessages((current) => [...current.slice(0, -1), { ...current[current.length - 1], cards: event.cards }]);
          }
          if (event.corrections) {
            setMessages((current) => [
              ...current.slice(0, -1),
              { ...current[current.length - 1], corrections: event.corrections },
            ]);
          }
          if (event.error) failure = event.error;
          if (event.stop === "max_tokens" && reply.trim()) {
            const note = "\n\n(That reply hit the length limit. Ask me to continue if you'd like more.)";
            reply += note;
            appendText(note);
          }
          if (event.stop === "refusal") failure = "The advisor can't help with that. Try asking about cars instead.";
        }
      }
    } catch (e) {
      if (controller.signal.aborted) return;
      failure = e instanceof Error ? e.message : "Something went wrong with the advisor. Please try again.";
    }

    setBusy(false);
    if (failure || !reply.trim()) {
      // Take the failed turn back out, so the question can be retried and isn't counted.
      setMessages(history.slice(0, -1));
      setInput(content);
      setError(failure ?? "The advisor didn't reply. Please try again.");
    }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  function reset() {
    abort.current?.abort();
    setMessages([]);
    setInput("");
    setError(null);
    setBusy(false);
  }

  return (
    <div className="advisor">
      {messages.length === 0 ? (
        <div className="advisor-starters">
          <p className="field-label">Tell me about your life and what you want, or try one of these:</p>
          {STARTERS.map((starter) => (
            <button key={starter} type="button" className="advisor-starter" onClick={() => void send(starter)}>
              {starter}
            </button>
          ))}
        </div>
      ) : (
        <div className="advisor-log" aria-live="polite">
          {messages.map((m, i) => (
            <Fragment key={i}>
              <div className={`advisor-msg ${m.role}`}>
                {m.role === "assistant" && !m.content ? (
                  <p className="advisor-thinking">Thinking…</p>
                ) : m.role === "assistant" ? (
                  <MessageText text={m.content} />
                ) : (
                  <p>{m.content}</p>
                )}
              </div>
              {m.corrections && m.corrections.length > 0 && (
                <div className="advisor-corrections" role="note">
                  <strong>Correction from our data</strong>
                  <ul>
                    {m.corrections.map((correction) => (
                      <li key={correction}>{correction}</li>
                    ))}
                  </ul>
                </div>
              )}
              {m.cards && m.cards.length > 0 && <RecommendationCards cards={m.cards} />}
              {m.cards && m.cards.length > 0 && i === messages.length - 1 && !busy && !atLimit && (
                <div className="advisor-more">
                  <p>Want to see more options?</p>
                  <button type="button" className="button button-outline" onClick={() => void send(MORE_OPTIONS_MESSAGE)}>
                    Show more options
                  </button>
                </div>
              )}
            </Fragment>
          ))}
          <div ref={end} />
        </div>
      )}

      {error && (
        <p className="notice advisor-error" role="alert">
          {error}
        </p>
      )}

      {atLimit && !busy ? (
        <div className="notice advisor-limit">
          <p>You&rsquo;ve reached the limit of {MAX_USER_MESSAGES} questions for this chat.</p>
          <button type="button" className="button button-primary" onClick={reset}>
            Start a new chat
          </button>
        </div>
      ) : (
        <form className="advisor-form" onSubmit={submit}>
          <label htmlFor="advisor-input" className="sr-only">
            Your message
          </label>
          <textarea
            id="advisor-input"
            rows={3}
            value={input}
            maxLength={MAX_MESSAGE_CHARS}
            placeholder="e.g. I drive 25 miles a day, have two kids, and want something safe under $40k"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
          />
          <div className="advisor-form-row">
            <span className="field-hint">
              {input.length}/{MAX_MESSAGE_CHARS} characters · {asked} of {MAX_USER_MESSAGES} questions
            </span>
            {messages.length > 0 && (
              <button type="button" className="compare-clear" onClick={reset}>
                New chat
              </button>
            )}
            <button type="submit" className="button button-primary" disabled={busy || !input.trim()}>
              {busy ? "Sending…" : "Send"}
            </button>
          </div>
        </form>
      )}

      <p className="field-hint advisor-disclaimer">
        AI can make mistakes. Prices, specs and costs are estimates, so check local listings and confirm with a dealer.
        Messages are sent to Anthropic to generate replies, so please don&rsquo;t share personal details.
      </p>
    </div>
  );
}
