import { usd } from "@/lib/budget";
import { FEATURE_LABELS } from "@/lib/cars";
import type { Match } from "@/lib/match";
import { CONDITIONS, CONDITION_LABELS, type Condition } from "@/lib/pricing";

const SHORT_LABELS: Record<Condition, string> = { used: "Used est.", cpo: "CPO est.", new: "New" };

export default function TrimList({ match, conditions }: { match: Match; conditions: Condition[] }) {
  const { car, trim: recommended } = match;
  const count = car.trims.length;

  return (
    <details className="trim-details">
      <summary>{count > 1 ? `View all trims (${count})` : "View trim details"}</summary>
      <ul className="trim-list">
        {car.trims.map((trim) => (
          <li key={trim.name} className={`trim-row${trim === recommended ? " recommended" : ""}`}>
            <div className="trim-head">
              <span className="trim-name">{trim.name}</span>
              {trim === recommended && count > 1 && <span className="price-tag">Recommended</span>}
            </div>
            <p className="trim-specs">
              {trim.engine} · {trim.hp} hp · {trim.economy} · {trim.drivetrain}
            </p>
            <p className="trim-features">
              {[...trim.highlights, ...trim.features.map((f) => FEATURE_LABELS[f])].join(" · ")}
            </p>
            <ul className="trim-prices" aria-label={`${trim.name} price by condition`}>
              {CONDITIONS.map((condition) => (
                <li key={condition} className={conditions.includes(condition) ? "selected" : undefined}>
                  <span className="trim-price-label" title={CONDITION_LABELS[condition]}>
                    {SHORT_LABELS[condition]}
                  </span>
                  <span className="trim-price-amount">{usd(trim.prices[condition])}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </details>
  );
}
