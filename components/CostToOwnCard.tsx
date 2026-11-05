import { usd } from "@/lib/budget";
import type { Match, Preferences } from "@/lib/match";
import { CONDITIONS, CONDITION_LABELS } from "@/lib/pricing";
import { costToOwn } from "@/lib/ownership";

export default function CostToOwnCard({
  match: m,
  milesPerYear,
}: {
  match: Pick<Match, "car" | "trim" | "condition" | "ownership">;
  milesPerYear: Preferences["milesPerYear"];
}) {
  const cost = m.ownership;
  const rows = [
    ["Depreciation", cost.depreciation],
    [cost.fuelLabel, cost.fuel],
    ["Insurance", cost.insurance],
    ["Maintenance", cost.maintenance],
    ["Taxes & fees", cost.fees],
  ] as const;

  return (
    <section className="cost-card" aria-label="5-year cost to own, estimated">
      <div className="cost-head">
        <div>
          <h3>5-Year Cost to Own</h3>
          <p className="field-hint">
            Estimate for the {m.trim.name}, {CONDITION_LABELS[m.condition]}, at {milesPerYear.toLocaleString("en-US")}{" "}
            miles a year
          </p>
        </div>
        <div className="cost-totals">
          <span className="cost-total">
            {usd(cost.total)} <span className="price-est">est.</span>
          </span>
          <span className="cost-monthly">{usd(cost.monthly)}/mo est.</span>
        </div>
      </div>
      <dl className="cost-rows">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{usd(value)}</dd>
          </div>
        ))}
      </dl>
      <p className="cost-others">
        By condition:{" "}
        {CONDITIONS.map((c) => `${CONDITION_LABELS[c]} ${usd(costToOwn(m.car, m.trim, c, milesPerYear).total)}`).join(" · ")}
      </p>
    </section>
  );
}
