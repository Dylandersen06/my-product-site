// Finds what to loosen when a search has no results, by re-running the search
// with each change and counting the matches. If no single change helps, it looks
// for the smallest group of changes that does.

import { BUDGET_INPUT_MAX, usd } from "./budget";
import { BODY_LABELS, CARS, FEATURE_LABELS, FUEL_LABELS } from "./cars";
import type { Filters } from "./filters";
import { scoreCar, type Preferences } from "./match";
import { CONDITIONS, CONDITION_LABELS } from "./pricing";

export type RawParams = Record<string, string | string[] | undefined>;

export interface ParamChange {
  /** Params to drop entirely. */
  remove?: string[];
  /** Single values to drop from a repeated param. */
  removeValues?: [string, string][];
  /** Params to replace. */
  set?: Record<string, string>;
  /** Values to add to a repeated param. */
  add?: [string, string][];
}

export interface Suggestion {
  label: string;
  count: number;
  change: ParamChange;
}

/** A URL for the same search with a change applied. */
export function hrefWith(basePath: string, params: RawParams, change: ParamChange = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || change.remove?.includes(key) || change.set?.[key] !== undefined) continue;
    for (const v of Array.isArray(value) ? value : [value]) {
      if (v === "" || change.removeValues?.some(([k, x]) => k === key && x === v)) continue;
      query.append(key, v);
    }
  }
  for (const [key, value] of Object.entries(change.set ?? {})) query.set(key, value);
  for (const [key, value] of change.add ?? []) query.append(key, value);
  const qs = query.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

const countMatches = (prefs: Preferences) => CARS.filter((car) => scoreCar(car, prefs)).length;

const SEAT_STEPS = [7, 6, 5, 4, 2];
const MAX_COMBINED = 5;

interface Relaxation {
  label: string;
  apply: (prefs: Preferences) => Preferences;
  change: ParamChange;
}

/** Every requirement in this search that could be relaxed. */
function relaxations(prefs: Preferences): Relaxation[] {
  const list: Relaxation[] = [];
  const add = (label: string, apply: Relaxation["apply"], change: ParamChange) => list.push({ label, apply, change });
  const filter = (patch: Partial<Filters>) => (p: Preferences) => ({ ...p, filters: p.filters && { ...p.filters, ...patch } });

  if (prefs.budget.range !== "any") {
    add("Allow any budget", (p) => ({ ...p, budget: { min: 0, max: BUDGET_INPUT_MAX, range: "any" } }), {
      remove: ["budget"],
      set: { range: "any" },
    });
  }
  const missing = CONDITIONS.filter((c) => !prefs.conditions.includes(c));
  if (missing.length > 0) {
    add(
      `Also include ${missing.map((c) => CONDITION_LABELS[c]).join(" and ")}`,
      (p) => ({ ...p, conditions: [...CONDITIONS] }),
      { add: missing.map((c) => ["condition", c]) },
    );
  }
  if (prefs.seats > 1) add("Allow any number of seats", (p) => ({ ...p, seats: 1 }), { set: { seats: "1" } });

  const f = prefs.filters;
  if (!f) return list;

  if (prefs.fuel !== "any") {
    add(`Allow any fuel type, not just ${FUEL_LABELS[prefs.fuel].toLowerCase()}`, (p) => ({ ...p, fuel: "any" }), {
      remove: ["fuel"],
    });
  }
  if (prefs.body !== "any") {
    add(`Allow any body style, not just ${BODY_LABELS[prefs.body].toLowerCase()}`, (p) => ({ ...p, body: "any" }), {
      remove: ["body"],
    });
  }
  if (f.hpMin !== null || f.hpMax !== null) {
    add("Remove the horsepower range", filter({ hpMin: null, hpMax: null }), { remove: ["hpMin", "hpMax"] });
  }
  if (f.zero60Max !== null) {
    add(`Remove the 0–60 limit (under ${f.zero60Max}s)`, filter({ zero60Max: null }), { remove: ["zero60Max"] });
  }
  if (f.mpgMin !== null || f.rangeMin !== null) {
    add("Remove the MPG and EV range minimums", filter({ mpgMin: null, rangeMin: null }), {
      remove: ["mpgMin", "rangeMin"],
    });
  }
  if (f.drivetrain) add("Allow any drivetrain", filter({ drivetrain: null }), { remove: ["drivetrain"] });
  if (f.transmission) add("Allow any transmission", filter({ transmission: null }), { remove: ["transmission"] });
  if (f.towMin !== null) {
    add(`Remove the ${f.towMin.toLocaleString("en-US")} lb towing minimum`, filter({ towMin: null }), {
      remove: ["towMin"],
    });
  }
  if (f.cargoMin !== null) {
    add(`Remove the ${f.cargoMin} cu ft cargo minimum`, filter({ cargoMin: null }), { remove: ["cargoMin"] });
  }
  if (f.makes.length > 0) add("Show all brands", filter({ makes: [] }), { remove: ["make"] });
  if (f.excludeMakes.length > 0) add("Stop excluding brands", filter({ excludeMakes: [] }), { remove: ["excludeMake"] });
  if (f.minStars !== null) {
    add(`Remove the ${f.minStars}-star safety minimum`, filter({ minStars: null }), { remove: ["minStars"] });
  }
  for (const feature of prefs.features) {
    add(
      `Drop the ${FEATURE_LABELS[feature]} requirement`,
      (p) => ({ ...p, features: p.features.filter((x) => x !== feature) }),
      { removeValues: [["features", feature]] },
    );
  }
  return list;
}

function combos<T>(items: T[], size: number, start = 0): T[][] {
  if (size === 0) return [[]];
  const out: T[][] = [];
  for (let i = start; i <= items.length - size; i++) {
    for (const rest of combos(items, size - 1, i + 1)) out.push([items[i], ...rest]);
  }
  return out;
}

const mergeChanges = (changes: ParamChange[]): ParamChange => ({
  remove: changes.flatMap((c) => c.remove ?? []),
  removeValues: changes.flatMap((c) => c.removeValues ?? []),
  set: Object.assign({}, ...changes.map((c) => c.set ?? {})),
  add: changes.flatMap((c) => c.add ?? []),
});

/** The smallest combination of relaxations that brings any cars back. */
function smallestCombination(prefs: Preferences, options: Relaxation[], limit: number): Suggestion[] {
  for (let size = 2; size <= Math.min(MAX_COMBINED, options.length); size++) {
    const found = combos(options, size).flatMap((group) => {
      const count = countMatches(group.reduce((p, r) => r.apply(p), prefs));
      if (count === 0) return [];
      return [{ label: group.map((r) => r.label).join(" + "), count, change: mergeChanges(group.map((r) => r.change)) }];
    });
    if (found.length > 0) return found.sort((a, b) => b.count - a.count).slice(0, limit);
  }
  return [];
}

/** Single changes that bring cars back, or else the smallest group that does. */
export function suggestLoosening(prefs: Preferences, limit = 4): Suggestion[] {
  const out: Suggestion[] = [];
  const options = relaxations(prefs);

  for (const option of options) {
    if (option.label === "Allow any budget") {
      // On its own, a budget only needs to rise to the lowest qualifying price.
      const prices = CARS.flatMap((car) => scoreCar(car, prefs, { ignoreBudgetCap: true })?.price ?? []);
      if (prices.length === 0) continue;
      const needed = Math.ceil(Math.min(...prices) / 500) * 500;
      if (needed <= prefs.budget.max) continue;
      const count = countMatches({ ...prefs, budget: { min: 0, max: needed, range: null } });
      if (count > 0) {
        out.push({
          label: `Raise your budget to ${usd(needed)}`,
          count,
          change: { remove: ["range"], set: { budget: String(needed) } },
        });
      }
      continue;
    }
    if (option.label === "Allow any number of seats") {
      // Likewise, seats only need to drop as far as it takes.
      const seats = SEAT_STEPS.find((n) => n < prefs.seats && countMatches({ ...prefs, seats: n }) > 0);
      if (seats) {
        out.push({
          label: `Lower seats needed to ${seats}+`,
          count: countMatches({ ...prefs, seats }),
          change: { set: { seats: String(seats) } },
        });
      }
      continue;
    }
    const count = countMatches(option.apply(prefs));
    if (count > 0) out.push({ label: option.label, count, change: option.change });
  }

  if (out.length > 0) return out.sort((a, b) => b.count - a.count).slice(0, limit);
  return smallestCombination(prefs, options, Math.min(limit, 3));
}
