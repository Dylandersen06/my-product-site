import {
  ANY_RANGE,
  BUDGET_INPUT_MAX,
  BUDGET_INPUT_MIN,
  DEFAULT_RANGE,
  EXACT_BUDGET_FLOOR,
  findRange,
  type Budget,
} from "./budget";
import { BODY_LABELS, BRANDS, FEATURE_LABELS, FUEL_LABELS, USAGE_LABELS, type Feature } from "./cars";
import { DRIVETRAIN_LABELS, TRANSMISSION_LABELS, type Filters } from "./filters";
import { DEFAULT_SORT, SORT_LABELS, type Preferences, type SortKey } from "./match";
import { CONDITIONS, DEFAULT_CONDITIONS, type Condition } from "./pricing";

type RawParams = Record<string, string | string[] | undefined>;
export type SearchMode = "quick" | "advanced";

/** Params that mean a search was actually submitted. */
const SEARCH_KEYS = ["condition", "range", "budget", "seats", "fuel", "body", "usage", "features", "sort"];
export const hasSearch = (params: RawParams) => SEARCH_KEYS.some((key) => params[key] !== undefined);

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const all = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

function isKey<T extends string>(map: Record<T, string>, key: string | undefined): key is T {
  return key !== undefined && Object.prototype.hasOwnProperty.call(map, key);
}

/**
 * An exact `budget` (max dollars) takes priority over a preset `range`.
 * Falls back to the default range when neither is valid.
 */
function parseBudget(params: RawParams, mode: SearchMode): Budget {
  const exact = Number(first(params.budget));
  if (Number.isFinite(exact) && exact > 0) {
    const max = Math.min(Math.max(exact, BUDGET_INPUT_MIN), BUDGET_INPUT_MAX);
    return { min: Math.round(max * EXACT_BUDGET_FLOOR), max, range: null };
  }
  const range = findRange(first(params.range)) ?? findRange(mode === "advanced" ? ANY_RANGE.key : DEFAULT_RANGE)!;
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

/** A positive number from the URL, or null if it's empty or invalid. */
function positive(params: RawParams, key: string): number | null {
  const value = first(params[key]);
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function parseFilters(params: RawParams): Filters {
  let hpMin = positive(params, "hpMin");
  let hpMax = positive(params, "hpMax");
  if (hpMin !== null && hpMax !== null && hpMin > hpMax) [hpMin, hpMax] = [hpMax, hpMin];
  const drivetrain = first(params.drivetrain);
  const transmission = first(params.transmission);
  const brands = (key: string) => [...new Set(all(params[key]))].filter((b) => BRANDS.includes(b));
  return {
    hpMin,
    hpMax,
    zero60Max: positive(params, "zero60Max"),
    mpgMin: positive(params, "mpgMin"),
    rangeMin: positive(params, "rangeMin"),
    drivetrain: isKey(DRIVETRAIN_LABELS, drivetrain) ? drivetrain : null,
    transmission: isKey(TRANSMISSION_LABELS, transmission) ? transmission : null,
    towMin: positive(params, "towMin"),
    cargoMin: positive(params, "cargoMin"),
    makes: brands("make"),
    excludeMakes: brands("excludeMake"),
  };
}

/** Turn URL search params into validated preferences, falling back to sensible defaults. */
export function parsePreferences(params: RawParams, mode: SearchMode = "quick"): Preferences {
  const advanced = mode === "advanced";
  const seatsRaw = Number(first(params.seats));
  const seats = Number.isInteger(seatsRaw) && seatsRaw >= 1 && seatsRaw <= 8 ? seatsRaw : advanced ? 1 : 5;

  const fuelRaw = first(params.fuel);
  const fuel = isKey(FUEL_LABELS, fuelRaw) ? fuelRaw : "any";

  const bodyRaw = first(params.body);
  const body = isKey(BODY_LABELS, bodyRaw) ? bodyRaw : "any";

  const usageRaw = first(params.usage);
  const usage = isKey(USAGE_LABELS, usageRaw) ? usageRaw : advanced ? "any" : "commute";

  const features = [...new Set(all(params.features))].filter((f): f is Feature => isKey(FEATURE_LABELS, f));

  return {
    conditions: parseConditions(params),
    budget: parseBudget(params, mode),
    seats,
    fuel,
    body,
    usage,
    features,
    filters: advanced ? parseFilters(params) : null,
  };
}
