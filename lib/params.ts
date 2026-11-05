import { BODY_LABELS, FEATURE_LABELS, FUEL_LABELS, USAGE_LABELS, type Feature } from "./cars";
import type { Preferences } from "./match";

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const all = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

function isKey<T extends string>(map: Record<T, string>, key: string | undefined): key is T {
  return key !== undefined && Object.prototype.hasOwnProperty.call(map, key);
}

/** Turn URL search params into validated preferences, falling back to sensible defaults. */
export function parsePreferences(params: RawParams): Preferences {
  const budgetRaw = Number(first(params.budget));
  const budget = Number.isFinite(budgetRaw) && budgetRaw > 0 ? Math.min(Math.max(budgetRaw, 5000), 250000) : 35000;

  const seatsRaw = Number(first(params.seats));
  const seats = Number.isInteger(seatsRaw) && seatsRaw >= 1 && seatsRaw <= 8 ? seatsRaw : 5;

  const fuelRaw = first(params.fuel);
  const fuel = isKey(FUEL_LABELS, fuelRaw) ? fuelRaw : "any";

  const bodyRaw = first(params.body);
  const body = isKey(BODY_LABELS, bodyRaw) ? bodyRaw : "any";

  const usageRaw = first(params.usage);
  const usage = isKey(USAGE_LABELS, usageRaw) ? usageRaw : "commute";

  const features = [...new Set(all(params.features))].filter((f): f is Feature => isKey(FEATURE_LABELS, f));

  return { budget, seats, fuel, body, usage, features };
}
