import { usd } from "@/lib/budget";
import type { Match, Preferences } from "@/lib/match";
import { CONDITIONS, CONDITION_LABELS } from "@/lib/pricing";
import { costToOwn } from "@/lib/ownership";

/**
 * The yearly running cost: fuel, maintenance, insurance and registration,
 * averaged over 5 years, with no purchase price or financing. The total is
 * always visible; the breakdown opens on demand, or starts open on the details page.
 */
export default function CostToOwnCard({
  match: m,
  milesPerYear,
  open = false,
}: {
  match: Pick<Match, "car" | "trim" | "condition" | "ownership">;
  milesPerYear: Preferences["milesPerYear"];
  open?: boolean;
}) {
  const cost = m.ownership.yearly;
  const rows = [
    [m.ownership.fuelLabel, cost.fuel],
    ["Maintenance & repairs", cost.maintenance],
    ["Insurance", cost.insurance],
    ["Registration", cost.registration],
  ] as const;

  return (
    <details className="cost-card" open={open}>
      <summary className="cost-head">
        <h3>Yearly Running Cost</h3>
        <span className="cost-totals">
          <span className="cost-total">
            {usd(cost.total)}/yr <span className="price-est">est.</span>
          </span>
          <span className="cost-monthly">{usd(cost.monthly)}/mo est.</span>
        </span>
      </summary>
      <div className="cost-body">
        <p className="field-hint">
          Average per year over 5 years for the {m.trim.name}, {CONDITION_LABELS[m.condition]}, at{" "}
          {milesPerYear.toLocaleString("en-US")} miles a year. Doesn&rsquo;t include the purchase price or financing.
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
          {CONDITIONS.map((c) => `${CONDITION_LABELS[c]} ${usd(costToOwn(m.car, m.trim, c, milesPerYear).yearly.total)}/yr`).join(" · ")}
        </p>
      </div>
    </details>
  );
}
