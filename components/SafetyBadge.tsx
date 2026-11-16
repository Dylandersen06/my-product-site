import { formatSafety } from "@/lib/safety";

/** The safety score in a photo's corner: "★ 4.5", with "est." when there's no crash test. */
export default function SafetyBadge({ score, estimated }: { score: number; estimated: boolean }) {
  return (
    <span className="safety-badge" aria-label={`Safety score ${formatSafety(score)} out of 5${estimated ? ", estimated" : ""}`}>
      <span aria-hidden="true">★</span> {formatSafety(score)}
      <span className="safety-badge-of">/5</span>
      {estimated && <span className="safety-badge-est">est.</span>}
    </span>
  );
}
