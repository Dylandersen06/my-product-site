import Link from "next/link";
import CarPhoto from "@/components/CarPhoto";
import { CompareCheckbox } from "@/components/Compare";
import CostToOwnCard from "@/components/CostToOwnCard";
import PriceComparison from "@/components/PriceComparison";
import ScoreRing from "@/components/ScoreRing";
import SpecStrip from "@/components/SpecStrip";
import TrimList from "@/components/TrimList";
import { BODY_LABELS, FUEL_LABELS, carDetailsHref } from "@/lib/cars";
import type { Match } from "@/lib/match";
import { DEFAULT_MILES_PER_YEAR } from "@/lib/ownership";
import { photoFor } from "@/lib/photos";
import type { Condition } from "@/lib/pricing";

export default function ResultCard({
  match: m,
  rank,
  conditions,
  advanced,
  milesPerYear,
}: {
  match: Match;
  rank: number;
  conditions: Condition[];
  advanced: boolean;
  milesPerYear: number;
}) {
  const name = `${m.car.make} ${m.car.model}`;
  const details = carDetailsHref(
    m.car.id,
    m.trim.name,
    m.condition,
    milesPerYear === DEFAULT_MILES_PER_YEAR ? undefined : milesPerYear,
  );
  return (
    <li className="result-card">
      <div className="result-media">
        <CarPhoto name={name} bodyLabel={BODY_LABELS[m.car.body]} photo={photoFor(m.car.id)} rank={rank} />
      </div>
      <div className="result-body">
        <div className="result-top">
          <div className="result-heading">
            <h2>
              <Link href={details} className="result-title-link">
                {name}
              </Link>
            </h2>
            <p className="recommended-trim">
              {m.car.trims.length > 1 ? "Recommended trim: " : "Trim: "}
              <strong>{m.trim.name}</strong>
            </p>
            <p className="result-specs">
              {BODY_LABELS[m.car.body]} · {FUEL_LABELS[m.car.fuel]} · {m.car.seats} seats
            </p>
            {/* Advanced cards show horsepower and economy in the spec strip, so they aren't repeated here. */}
            <p className="result-specs">
              {advanced
                ? `${m.trim.engine} · ${m.trim.drivetrain}`
                : `${m.trim.engine} · ${m.trim.hp} hp · ${m.trim.economy} · ${m.trim.drivetrain}`}
            </p>
          </div>
          <ScoreRing score={m.score} />
        </div>
        {advanced && <SpecStrip trim={m.trim} />}
        <ul className="reasons">
          {m.reasons.map((r) => (
            <li key={r} className="reason-good">
              {r}
            </li>
          ))}
          {m.caveats.map((c) => (
            <li key={c} className="reason-warn">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="result-foot">
        <PriceComparison match={m} conditions={conditions} />
        <div className="disclosures">
          <CostToOwnCard match={m} milesPerYear={milesPerYear} />
          <TrimList match={m} conditions={conditions} />
        </div>
        <div className="result-actions">
          {advanced && <CompareCheckbox id={m.car.id} name={name} />}
          <Link href={details} className="button button-outline result-details-link">
            View details
          </Link>
        </div>
      </div>
    </li>
  );
}
