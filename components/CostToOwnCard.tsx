import { usd } from "@/lib/budget";
import type { Match, Preferences } from "@/lib/match";
import { CONDITIONS, CONDITION_LABELS } from "@/lib/pricing";
import { costToOwn } from "@/lib/ownership";

/** The total is always visible. The breakdown opens on demand, or starts open on the details page. */
export default function CostToOwnCard({
  match: m,
  milesPerYear,
  open = false,
}: {
  match: Pick<Match, "car" | "trim" | "condition" | "ownership">;
  milesPerYear: Preferences["milesPerYear"];
  open?: boolean;
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
    <details className="cost-card" open={open}>
      <summary className="cost-head">
        <h3>5-Year Cost to Own</h3>
        <span className="cost-totals">
          <span className="cost-total">
            {usd(cost.total)} <span className="price-est">est.</span>
          </span>
          <span className="cost-monthly">{usd(cost.monthly)}/mo est.</span>
        </span>
      </summary>
      <div className="cost-body">
        <p className="field-hint">
          Estimate for the {m.trim.name}, {CONDITION_LABELS[m.condition]}, at {milesPerYear.toLocaleString("en-US")}{" "}
          miles a year
        </p>
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
      </div>
    </details>
  );
}
