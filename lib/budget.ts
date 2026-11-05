export const BUDGET_INPUT_MIN = 5000;
export const BUDGET_INPUT_MAX = 1_000_000;

/**
 * For an exact max budget, cars below this fraction of it get only partial
 * budget points, so a $900k shopper isn't shown a $30k car first.
 */
export const EXACT_BUDGET_FLOOR = 0.25;

export const BUDGET_RANGES = [
  { key: "under30", label: "Under $30k", min: 0, max: 30_000 },
  { key: "30-60", label: "$30–60k", min: 30_000, max: 60_000 },
  { key: "60-100", label: "$60–100k", min: 60_000, max: 100_000 },
  { key: "100-250", label: "$100–250k", min: 100_000, max: 250_000 },
  { key: "250-1m", label: "$250k–$1M", min: 250_000, max: 1_000_000 },
] as const;

export type BudgetRangeKey = (typeof BUDGET_RANGES)[number]["key"];

export const DEFAULT_RANGE: BudgetRangeKey = "30-60";

export interface Budget {
  min: number;
  max: number;
  /** The preset used, or null when the shopper typed an exact max budget. */
  range: BudgetRangeKey | null;
}

export const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export function findRange(key: string | undefined) {
  return BUDGET_RANGES.find((r) => r.key === key);
}

export function budgetLabel(budget: Budget): string {
  const range = findRange(budget.range ?? undefined);
  return range ? range.label : `Up to ${usd(budget.max)}`;
}
