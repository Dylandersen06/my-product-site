import { budgetLabel, usd, type Budget } from "./budget";
import {
  BODY_LABELS,
  CARS,
  FEATURE_LABELS,
  FUEL_LABELS,
  USAGE_LABELS,
  hasFeature,
  type BodyStyle,
  type Car,
  type Feature,
  type Fuel,
  type Trim,
  type Usage,
} from "./cars";
import { trimPasses, type Filters } from "./filters";
import { overallStars } from "./official";
import { costToOwn, type CostToOwn } from "./ownership";
import { CONDITION_LABELS, savingsVsNew, type Condition } from "./pricing";

export interface Preferences {
  /** One or more conditions, in display order. */
  conditions: Condition[];
  budget: Budget;
  seats: number;
  fuel: Fuel | "any";
  body: BodyStyle | "any";
  usage: Usage | "any";
  features: Feature[];
  /**
   * Advanced Search only. When set, these filters, the body style, the fuel type
   * and the features are all strict requirements instead of scoring preferences.
   */
  filters: Filters | null;
  /** Annual driving behind the cost-to-own estimates. */
  milesPerYear: number;
}

export const SORT_LABELS = {
  best: "Best match",
  price: "Price: low to high",
  savings: "Biggest savings",
  cost: "Lowest cost to own",
} as const;
export type SortKey = keyof typeof SORT_LABELS;
export const DEFAULT_SORT: SortKey = "best";

export interface Match {
  car: Car;
  /** The trim that best fits the budget and must-haves. */
  trim: Trim;
  /** The selected condition that fits best, used for the score. */
  condition: Condition;
  /** The recommended trim's price in that condition. */
  price: number;
  /** Largest saving vs new among the selected used/CPO conditions. */
  savings: number;
  /** 5-year estimate for the recommended trim in that condition. */
  ownership: CostToOwn;
  score: number; // 0–100
  reasons: string[];
  caveats: string[];
}

export interface MatchResult {
  matches: Match[];
  excludedCount: number;
  /** How many cars qualified before limiting the list. */
  totalMatches: number;
  /**
   * True when no car fit the budget, so `matches` holds the closest-priced
   * cars that still have enough seats instead.
   */
  fallback: boolean;
}

/** How many points each criterion can contribute (sums to 100). */
const WEIGHTS = {
  budget: 30,
  seats: 15,
  fuel: 15,
  body: 15,
  usage: 10,
  features: 15,
} as const;

/** Cars priced more than this fraction above budget are excluded. */
const MAX_OVER_BUDGET = 0.2;

/** Partial credit for fuel types that are close to what was asked for. */
const FUEL_SIMILARITY: Partial<Record<Fuel, Partial<Record<Fuel, number>>>> = {
  hybrid: { phev: 0.6, gas: 0.3 },
  phev: { hybrid: 0.7, electric: 0.5 },
  electric: { phev: 0.5 },
  gas: { hybrid: 0.5 },
};

/** Partial credit for body styles that are close to what was asked for. */
const BODY_SIMILARITY: Partial<Record<BodyStyle, Partial<Record<BodyStyle, number>>>> = {
  suv: { wagon: 0.6, minivan: 0.4 },
  wagon: { suv: 0.6, hatchback: 0.6 },
  hatchback: { wagon: 0.6, sedan: 0.5 },
  sedan: { hatchback: 0.5 },
  minivan: { suv: 0.4 },
  coupe: { hatchback: 0.3, sedan: 0.3 },
};

const USAGE_REASONS: Record<Usage, string> = {
  commute: "A strong pick for daily commuting",
  family: "Practical for hauling family and gear",
  roadtrip: "Comfortable and capable on long road trips",
  offroad: "Built to handle trails and rough roads",
  towing: "Well suited to towing and hauling",
  city: "Easy to drive and park in the city",
  performance: "Genuinely fun to drive",
  luxury: "Delivers a genuinely premium, comfortable experience",
};

const priceText = (trim: Trim, condition: Condition, price: number) =>
  condition === "new"
    ? `The ${trim.name} starts around ${usd(price)} new`
    : `The ${trim.name} is around ${usd(price)} ${CONDITION_LABELS[condition].toLowerCase()} (estimate)`;

/**
 * Budget points for a price: full points inside [min, max]. Above the max, a
 * sliding scale down to zero at 20% over (beyond that it returns null unless
 * `ignoreCap` is set). Below the min (the bottom of a preset range, or a
 * quarter of an exact budget), partial credit in proportion to how close it
 * gets, so a $22k car doesn't top the list for a $250k–$1M shopper.
 */
function budgetPoints(price: number, budget: Budget, ignoreCap: boolean): number | null {
  if (price > budget.max) {
    const over = (price - budget.max) / budget.max;
    if (over > MAX_OVER_BUDGET && !ignoreCap) return null;
    return WEIGHTS.budget * Math.max(0, 1 - over / MAX_OVER_BUDGET);
  }
  if (price < budget.min) return WEIGHTS.budget * (price / budget.min);
  return WEIGHTS.budget;
}

/** The biggest saving vs new among selected used/CPO conditions (or used, if only New is selected). */
function savingsFor(trim: Trim, conditions: Condition[]): number {
  const preOwned = conditions.filter((c) => c !== "new");
  return Math.max(...(preOwned.length > 0 ? preOwned : (["used"] as const)).map((c) => savingsVsNew(trim.prices, c)));
}

/** The price ties are broken toward. "Any budget" favors the cheapest option. */
const budgetMidpoint = (budget: Budget) => (budget.range === "any" ? 0 : (budget.min + budget.max) / 2);

/**
 * Picks the trim and selected condition with the most budget and must-have
 * points. Ties go to the price closest to the middle of the budget, so an
 * "Under $30k" search gets the cheapest trim that does the job and a bigger
 * budget gets a better-equipped one. Returns null if every option is too far
 * over budget.
 */
function bestOption(car: Car, prefs: Preferences, ignoreCap: boolean) {
  const target = budgetMidpoint(prefs.budget);
  let best: { trim: Trim; condition: Condition; price: number; points: number; budget: number } | null = null;
  for (const trim of car.trims) {
    const have = prefs.features.filter((f) => hasFeature(car, trim, f)).length;
    if (prefs.filters && (!trimPasses(trim, prefs.filters) || have < prefs.features.length)) continue;
    const featureShare = prefs.features.length === 0 ? 1 : have / prefs.features.length;
    for (const condition of prefs.conditions) {
      const price = trim.prices[condition];
      const budget = budgetPoints(price, prefs.budget, ignoreCap);
      if (budget === null) continue;
      const points = budget + WEIGHTS.features * featureShare;
      const closer = best !== null && Math.abs(price - target) < Math.abs(best.price - target);
      if (!best || points > best.points || (points === best.points && closer)) {
        best = { trim, condition, price, points, budget };
      }
    }
  }
  return best;
}

/**
 * Score one car against the shopper's preferences, using its best-fitting trim
 * and condition. Returns null when the car fails a hard requirement (too few
 * seats, or every trim far over budget unless `ignoreBudgetCap` is set).
 */
export function scoreCar(car: Car, prefs: Preferences, { ignoreBudgetCap = false } = {}): Match | null {
  const reasons: string[] = [];
  const caveats: string[] = [];
  let score = 0;

  const filters = prefs.filters;
  if (filters) {
    if (filters.makes.length > 0 && !filters.makes.includes(car.make)) return null;
    if (filters.excludeMakes.includes(car.make)) return null;
    if (filters.minStars !== null && (overallStars(car.id) ?? 0) < filters.minStars) return null;
    if (prefs.fuel !== "any" && car.fuel !== prefs.fuel) return null;
    if (prefs.body !== "any" && car.body !== prefs.body) return null;
  }

  // Seats: a hard requirement.
  if (car.seats < prefs.seats) return null;
  score += WEIGHTS.seats;
  if (prefs.seats > 1) {
    reasons.push(
      car.seats === prefs.seats
        ? `Seats ${car.seats}, exactly what you need`
        : `Seats ${car.seats}, room for your ${prefs.seats}`,
    );
  }

  const best = bestOption(car, prefs, ignoreBudgetCap);
  if (!best) return null;
  const { trim, condition, price } = best;
  score += best.budget;

  const { min, max, range } = prefs.budget;
  const text = priceText(trim, condition, price);
  if (range === "any") {
    reasons.push(text);
  } else if (price > max) {
    caveats.push(`${text}, ${usd(price - max)} over your ${usd(max)} max`);
  } else if (price < min) {
    caveats.push(
      range ? `${text}, below your ${budgetLabel(prefs.budget)} range` : `${text}, well below your ${usd(max)} budget`,
    );
  } else if (range && min > 0) {
    reasons.push(`${text}, within your ${budgetLabel(prefs.budget)} range`);
  } else {
    const under = max - price;
    reasons.push(under >= 1000 ? `${text}, ${usd(under)} under your budget` : `${text}, right at your budget`);
  }

  // Fuel type
  if (prefs.fuel === "any" || car.fuel === prefs.fuel) {
    score += WEIGHTS.fuel;
    if (prefs.fuel !== "any") reasons.push(`${FUEL_LABELS[car.fuel]}, as requested (${trim.economy})`);
  } else {
    const similarity = FUEL_SIMILARITY[prefs.fuel]?.[car.fuel] ?? 0;
    score += WEIGHTS.fuel * similarity;
    caveats.push(`${FUEL_LABELS[car.fuel]} rather than ${FUEL_LABELS[prefs.fuel].toLowerCase()}`);
  }

  // Body style
  if (prefs.body === "any" || car.body === prefs.body) {
    score += WEIGHTS.body;
    if (prefs.body !== "any") reasons.push(`${BODY_LABELS[car.body]}, your preferred body style`);
  } else {
    const similarity = BODY_SIMILARITY[prefs.body]?.[car.body] ?? 0;
    score += WEIGHTS.body * similarity;
    caveats.push(`${BODY_LABELS[car.body]} rather than ${BODY_LABELS[prefs.body].toLowerCase()}`);
  }

  // Primary use
  if (prefs.usage === "any") {
    score += WEIGHTS.usage;
  } else if (car.goodFor.includes(prefs.usage)) {
    score += WEIGHTS.usage;
    reasons.push(USAGE_REASONS[prefs.usage]);
  } else {
    caveats.push(`Not a standout for ${USAGE_LABELS[prefs.usage].toLowerCase()}`);
  }

  // Must-have features
  if (prefs.features.length === 0) {
    score += WEIGHTS.features;
  } else {
    const have = prefs.features.filter((f) => hasFeature(car, trim, f));
    const missing = prefs.features.filter((f) => !hasFeature(car, trim, f));
    score += WEIGHTS.features * (have.length / prefs.features.length);
    if (have.length > 0) {
      reasons.push(
        `This trim has ${have.length} of ${prefs.features.length} must-haves: ${have.map((f) => FEATURE_LABELS[f]).join(", ")}`,
      );
    }
    for (const feature of missing) {
      const other = car.trims.find((t) => hasFeature(car, t, feature));
      caveats.push(
        other
          ? `Missing on this trim: ${FEATURE_LABELS[feature]} (available on the ${other.name})`
          : `Missing: ${FEATURE_LABELS[feature]}`,
      );
    }
  }

  return {
    car,
    trim,
    condition,
    price,
    savings: savingsFor(trim, prefs.conditions),
    ownership: costToOwn(car, trim, condition, prefs.milesPerYear),
    score: Math.round(score),
    reasons,
    caveats,
  };
}

const isMatch = (m: Match | null): m is Match => m !== null;

/** Reorders the chosen matches. The set itself is always the best matches. */
function applySort(matches: Match[], sort: SortKey): Match[] {
  if (sort === "price") return [...matches].sort((a, b) => a.price - b.price || b.score - a.score);
  if (sort === "savings") return [...matches].sort((a, b) => b.savings - a.savings || b.score - a.score);
  if (sort === "cost") return [...matches].sort((a, b) => a.ownership.total - b.ownership.total || b.score - a.score);
  return matches;
}

export function rankCars(prefs: Preferences, sort: SortKey = DEFAULT_SORT, limit = 10): MatchResult {
  const scored = CARS.map((car) => scoreCar(car, prefs)).filter(isMatch);
  // Ties go to the car priced closest to the middle of the budget, so an
  // "Under $30k" search favors cheap cars and a $150k search favors cars
  // that actually use the budget.
  const target = budgetMidpoint(prefs.budget);
  const distance = (m: Match) => Math.abs(m.price - target);
  scored.sort((a, b) => b.score - a.score || distance(a) - distance(b));

  if (scored.length > 0) {
    return {
      matches: applySort(scored.slice(0, limit), sort),
      excludedCount: CARS.length - scored.length,
      totalMatches: scored.length,
      fallback: false,
    };
  }

  // Advanced Search shows what was asked for, or suggestions to loosen it.
  if (prefs.filters) return { matches: [], excludedCount: CARS.length, totalMatches: 0, fallback: false };

  // Nothing fits the budget (e.g. a very low max): show the cheapest cars
  // that still seat everyone, so the shopper sees how close they can get.
  const closest = CARS.map((car) => scoreCar(car, prefs, { ignoreBudgetCap: true }))
    .filter(isMatch)
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);
  return {
    matches: applySort(closest, sort),
    excludedCount: CARS.length,
    totalMatches: 0,
    fallback: closest.length > 0,
  };
}
