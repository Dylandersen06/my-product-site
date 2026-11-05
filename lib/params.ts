import {
  BUDGET_INPUT_MAX,
  BUDGET_INPUT_MIN,
  DEFAULT_RANGE,
  EXACT_BUDGET_FLOOR,
  findRange,
  type Budget,
} from "./budget";
import { BODY_LABELS, FEATURE_LABELS, FUEL_LABELS, USAGE_LABELS, type Feature } from "./cars";
import { DEFAULT_SORT, SORT_LABELS, type Preferences, type SortKey } from "./match";
import { CONDITIONS, DEFAULT_CONDITIONS, type Condition } from "./pricing";

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const all = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

function isKey<T extends string>(map: Record<T, string>, key: string | undefined): key is T {
  return key !== undefined && Object.prototype.hasOwnProperty.call(map, key);
}

/**
 * An exact `budget` (max dollars) takes priority over a preset `range`.
 * Falls back to the default range when neither is valid.
 */
function parseBudget(params: RawParams): Budget {
  const exact = Number(first(params.budget));
  if (Number.isFinite(exact) && exact > 0) {
    const max = Math.min(Math.max(exact, BUDGET_INPUT_MIN), BUDGET_INPUT_MAX);
    return { min: Math.round(max * EXACT_BUDGET_FLOOR), max, range: null };
  }
  const range = findRange(first(params.range)) ?? findRange(DEFAULT_RANGE)!;
  return { min: range.min, max: range.max, range: range.key };
}

/** Selected conditions in display order, defaulting to New when none are valid. */
function parseConditions(params: RawParams): Condition[] {
  const picked = all(params.condition);
  const conditions = CONDITIONS.filter((c) => picked.includes(c));
  return conditions.length > 0 ? conditions : DEFAULT_CONDITIONS;
}

export function parseSort(params: RawParams): SortKey {
  const sort = first(params.sort);
  return isKey(SORT_LABELS, sort) ? sort : DEFAULT_SORT;
}

/** Turn URL search params into validated preferences, falling back to sensible defaults. */
export function parsePreferences(params: RawParams): Preferences {
  const seatsRaw = Number(first(params.seats));
  const seats = Number.isInteger(seatsRaw) && seatsRaw >= 1 && seatsRaw <= 8 ? seatsRaw : 5;

  const fuelRaw = first(params.fuel);
  const fuel = isKey(FUEL_LABELS, fuelRaw) ? fuelRaw : "any";

  const bodyRaw = first(params.body);
  const body = isKey(BODY_LABELS, bodyRaw) ? bodyRaw : "any";

  const usageRaw = first(params.usage);
  const usage = isKey(USAGE_LABELS, usageRaw) ? usageRaw : "commute";

  const features = [...new Set(all(params.features))].filter((f): f is Feature => isKey(FEATURE_LABELS, f));

  return { conditions: parseConditions(params), budget: parseBudget(params), seats, fuel, body, usage, features };
}
