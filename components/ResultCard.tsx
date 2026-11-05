import Link from "next/link";
import CarPhoto from "@/components/CarPhoto";
import { CompareCheckbox } from "@/components/Compare";
import CostToOwnCard from "@/components/CostToOwnCard";
import PriceComparison from "@/components/PriceComparison";
import SpecStrip from "@/components/SpecStrip";
import TrimList from "@/components/TrimList";
import { BODY_LABELS, FUEL_LABELS, carDetailsHref } from "@/lib/cars";
import type { Match } from "@/lib/match";
import { DEFAULT_MILES_PER_YEAR } from "@/lib/ownership";
import { photoFor } from "@/lib/photos";
import type { Condition } from "@/lib/pricing";

function scoreTone(score: number) {
  if (score >= 85) return "great";
  if (score >= 65) return "good";
  return "fair";
}

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
      <CarPhoto name={name} bodyLabel={BODY_LABELS[m.car.body]} photo={photoFor(m.car.id)} rank={rank} />
      <div className="result-body">
        <div className="result-top">
          <div>
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
            <p className="result-specs">
              {m.trim.engine} · {m.trim.hp} hp · {m.trim.economy} · {m.trim.drivetrain}
            </p>
          </div>
          <div className={`score score-${scoreTone(m.score)}`}>
            <span className="score-num">{m.score}</span>
            <span className="score-label">match</span>
          </div>
        </div>
        <div className="meter" aria-hidden="true">
          <div className={`meter-fill score-${scoreTone(m.score)}`} style={{ width: `${m.score}%` }} />
        </div>
        {advanced && (
          <>
            <SpecStrip trim={m.trim} />
            <CompareCheckbox id={m.car.id} name={name} />
          </>
        )}
        <PriceComparison match={m} conditions={conditions} />
        <CostToOwnCard match={m} milesPerYear={milesPerYear} />
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
        <TrimList match={m} conditions={conditions} />
        <Link href={details} className="button button-outline result-details-link">
          View details
        </Link>
      </div>
    </li>
  );
}
