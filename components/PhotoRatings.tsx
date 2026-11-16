import { formatSafety } from "@/lib/safety";

/** Safety and reliability scores stacked in a photo's corner. */
export default function PhotoRatings({
  safety,
  reliability,
}: {
  safety: { score: number; estimated: boolean };
  /** Always an estimate. */
  reliability?: number;
}) {
  return (
    <span className="photo-ratings">
      <span
        className="photo-rating"
        aria-label={`Safety score ${formatSafety(safety.score)} out of 5${safety.estimated ? ", estimated" : ""}`}
      >
        <span className="photo-rating-label">Safety</span>
        <span aria-hidden="true">★</span> {formatSafety(safety.score)}
        <span className="photo-rating-of">/5</span>
        {safety.estimated && <span className="photo-rating-est">est.</span>}
      </span>
      {reliability !== undefined && (
        <span className="photo-rating" aria-label={`Reliability score ${formatSafety(reliability)} out of 5, estimated`}>
          <span className="photo-rating-label">Reliability</span>
          <span aria-hidden="true">★</span> {formatSafety(reliability)}
          <span className="photo-rating-of">/5</span>
          <span className="photo-rating-est">est.</span>
        </span>
      )}
    </span>
  );
}
