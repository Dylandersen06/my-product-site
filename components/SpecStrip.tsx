import { towingText, type Trim } from "@/lib/cars";

/** Horsepower, 0-60, MPG or range, and towing for a trim. */
export default function SpecStrip({ trim }: { trim: Trim }) {
  return (
    <dl className="spec-strip">
      <div>
        <dt>Horsepower</dt>
        <dd>{trim.hp} hp</dd>
      </div>
      <div>
        <dt>0–60 mph</dt>
        <dd>{trim.zero60}s</dd>
      </div>
      <div>
        <dt>{trim.mpg === null && trim.evRangeMi !== null ? "EV range" : "MPG / range"}</dt>
        <dd>{trim.economy}</dd>
      </div>
      <div>
        <dt>Towing</dt>
        <dd>{towingText(trim.towingLbs)}</dd>
      </div>
    </dl>
  );
}
