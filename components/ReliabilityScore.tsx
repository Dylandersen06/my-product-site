import { Stars } from "@/components/SafetyScore";
import { reliabilityBasis, type ReliabilityScore as Score } from "@/lib/reliability";
import { formatSafety } from "@/lib/safety";

/**
 * The CarMatch Reliability Score, always an estimate. "large" is the block on a
 * car's page; "compact" is one line for result cards.
 */
export default function ReliabilityScore({
  reliability,
  make,
  size = "compact",
}: {
  reliability: Score;
  make: string;
  size?: "large" | "compact";
}) {
  const value = formatSafety(reliability.score);
  if (size === "compact") {
    return (
      <p className="safety-compact">
        <span className="safety-compact-label">Reliability</span>
        <Stars score={reliability.score} />
        <strong>{value}/5</strong>
        <span className="safety-est">est.</span>
      </p>
    );
  }
  return (
    <section className="safety-large reliability-large" aria-labelledby="reliability-score-title">
      <div className="safety-large-head">
        <h2 id="reliability-score-title">Reliability score</h2>
        <span className="safety-est">Estimate</span>
      </div>
      <p className="safety-large-value">
        <strong>{value}</strong>
        <span>/ 5</span>
        <Stars score={reliability.score} />
      </p>
      <p className="safety-basis">{reliabilityBasis(reliability, make)}</p>
      <p className="safety-how">
        There&rsquo;s no free official reliability data, so this is our estimate: 70% {make}&rsquo;s general track
        record for dependability and 30% the model&rsquo;s official NHTSA recalls. Check owner reviews for the exact
        model year too.
      </p>
    </section>
  );
}
