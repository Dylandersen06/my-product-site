import CarPhoto from "@/components/CarPhoto";
import { CompareCheckbox } from "@/components/Compare";
import PriceComparison from "@/components/PriceComparison";
import TrimList from "@/components/TrimList";
import { BODY_LABELS, FUEL_LABELS, towingText } from "@/lib/cars";
import type { Match } from "@/lib/match";
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
}: {
  match: Match;
  rank: number;
  conditions: Condition[];
  advanced: boolean;
}) {
  const name = `${m.car.make} ${m.car.model}`;
  return (
    <li className="result-card">
      <CarPhoto name={name} bodyLabel={BODY_LABELS[m.car.body]} photo={photoFor(m.car.id)} rank={rank} />
      <div className="result-body">
        <div className="result-top">
          <div>
            <h2>{name}</h2>
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
            <dl className="spec-strip">
              <div>
                <dt>Horsepower</dt>
                <dd>{m.trim.hp} hp</dd>
              </div>
              <div>
                <dt>0–60 mph</dt>
                <dd>{m.trim.zero60}s</dd>
              </div>
              <div>
                <dt>{m.trim.mpg === null && m.trim.evRangeMi !== null ? "EV range" : "MPG / range"}</dt>
                <dd>{m.trim.economy}</dd>
              </div>
              <div>
                <dt>Towing</dt>
                <dd>{towingText(m.trim.towingLbs)}</dd>
              </div>
            </dl>
            <CompareCheckbox id={m.car.id} name={name} />
          </>
        )}
        <PriceComparison match={m} conditions={conditions} />
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
      </div>
    </li>
  );
}
