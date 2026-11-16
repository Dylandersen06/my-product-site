import type { CSSProperties } from "react";
import { formatSafety, safetyBasis, type SafetyScore as Score } from "@/lib/safety";

/** Five stars, filled to the score. The number is always shown as text too. */
export function Stars({ score }: { score: number }) {
  return (
    <span className="safety-stars" aria-hidden="true" style={{ "--fill": `${(score / 5) * 100}%` } as CSSProperties}>
      <span className="safety-stars-empty">★★★★★</span>
      <span className="safety-stars-full">★★★★★</span>
    </span>
  );
}

/**
 * The CarMatch Safety Score. "large" is the headline block on a car's page;
 * "compact" is one line for result cards.
 */
export default function SafetyScore({ safety, size = "compact" }: { safety: Score; size?: "large" | "compact" }) {
  const value = formatSafety(safety.score);
  if (size === "compact") {
    return (
      <p className="safety-compact">
        <span className="safety-compact-label">Safety</span>
        <Stars score={safety.score} />
        <strong>{value}/5</strong>
        {!safety.crashTested && <span className="safety-est">est.</span>}
      </p>
    );
  }
  return (
    <section className="safety-large" aria-labelledby="safety-score-title">
      <div className="safety-large-head">
        <h2 id="safety-score-title">Safety score</h2>
        {!safety.crashTested && <span className="safety-est">Estimate</span>}
      </div>
      <p className="safety-large-value">
        <strong>{value}</strong>
        <span>/ 5</span>
        <Stars score={safety.score} />
      </p>
      <p className="safety-basis">{safetyBasis(safety)}</p>
      <p className="safety-how">
        Mostly the official NHTSA crash-test rating (70%), plus this trim&rsquo;s blind-spot monitoring, adaptive
        cruise and 360° camera (20%) and the model&rsquo;s NHTSA recalls (10%).
        {!safety.crashTested &&
          " NHTSA hasn't crash-tested this model, so the crash part uses a cautious middle value. That isn't the same as unsafe."}
      </p>
    </section>
  );
}
