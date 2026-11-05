"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { MAX_MESSAGE_CHARS, MAX_USER_MESSAGES } from "@/lib/advisor-limits";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

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

function MessageText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).filter((b) => b.trim());
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (lines.every((l) => /^\s*[-*] /.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{formatInline(l.replace(/^\s*[-*] /, ""))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {formatInline(l)}
              </span>
            ))}
          </p>
        );
      })}
    </>
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
        body: JSON.stringify({ messages: history }),
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
          if (event.error) failure = event.error;
          if (event.stop === "max_tokens") {
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
            <div key={i} className={`advisor-msg ${m.role}`}>
              {m.role === "assistant" && !m.content ? (
                <p className="advisor-thinking">Thinking…</p>
              ) : m.role === "assistant" ? (
                <MessageText text={m.content} />
              ) : (
                <p>{m.content}</p>
              )}
            </div>
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
