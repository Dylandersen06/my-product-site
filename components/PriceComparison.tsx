import { usd } from "@/lib/budget";
import type { Match } from "@/lib/match";
import { CONDITIONS, CONDITION_LABELS, cpoNote, savingsVsNew, type Condition } from "@/lib/pricing";

export default function PriceComparison({ match, conditions }: { match: Match; conditions: Condition[] }) {
  const { car } = match;
  const note = cpoNote(car.make);
  const age = `~${car.usedAgeYears} yr${car.usedAgeYears === 1 ? "" : "s"} old`;

  return (
    <>
      <ul className="price-compare" aria-label="Price by condition">
        {CONDITIONS.map((condition) => {
          const selected = conditions.includes(condition);
          const bestFit = selected && conditions.length > 1 && condition === match.condition;
          return (
            <li key={condition} className={`price-cell${selected ? " selected" : ""}`}>
              <div className="price-cell-head">
                <span className="price-cond">{CONDITION_LABELS[condition]}</span>
                {selected && <span className="price-tag">{bestFit ? "Best fit" : "Selected"}</span>}
              </div>
              <p className="price-amount">
                {usd(car.prices[condition])}
                {condition !== "new" && <span className="price-est">est.</span>}
              </p>
              {condition === "new" ? (
                <>
                  <p className="price-base">Starting price</p>
                  <p className="price-meta">{car.year} model</p>
                </>
              ) : (
                <>
                  <p className="price-save">Save {usd(savingsVsNew(car.prices, condition))} vs new</p>
                  <p className="price-meta">
                    <span>{age}</span>
                    <span>~{car.mileage[condition].toLocaleString("en-US")} mi</span>
                  </p>
                </>
              )}
            </li>
          );
        })}
      </ul>
      {note && <p className="cpo-note">{note}</p>}
    </>
  );
}
