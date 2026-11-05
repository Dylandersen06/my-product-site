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
  type Usage,
} from "./cars";
import { CONDITION_LABELS, savingsVsNew, type Condition } from "./pricing";

export interface Preferences {
  /** One or more conditions, in display order. */
  conditions: Condition[];
  budget: Budget;
  seats: number;
  fuel: Fuel | "any";
  body: BodyStyle | "any";
  usage: Usage;
  features: Feature[];
}

export const SORT_LABELS = {
  best: "Best match",
  price: "Price: low to high",
  savings: "Biggest savings",
} as const;
export type SortKey = keyof typeof SORT_LABELS;
export const DEFAULT_SORT: SortKey = "best";

export interface Match {
  car: Car;
  /** The selected condition that fits the budget best, used for the score. */
  condition: Condition;
  /** The car's price in that condition. */
  price: number;
  /** Largest saving vs new among the selected used/CPO conditions. */
  savings: number;
  score: number; // 0–100
  reasons: string[];
  caveats: string[];
}

export interface MatchResult {
  matches: Match[];
  excludedCount: number;
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

const priceText = (condition: Condition, price: number) =>
  condition === "new"
    ? `New starts around ${usd(price)}`
    : `${CONDITION_LABELS[condition]} estimate around ${usd(price)}`;

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
function savingsFor(car: Car, conditions: Condition[]): number {
  const preOwned = conditions.filter((c) => c !== "new");
  return Math.max(...(preOwned.length > 0 ? preOwned : (["used"] as const)).map((c) => savingsVsNew(car.prices, c)));
}

/**
 * Score one car against the shopper's preferences, using whichever selected
 * condition fits the budget best (the cheaper one on a tie). Returns null when
 * the car fails a hard requirement (too few seats, or far over budget in every
 * selected condition unless `ignoreBudgetCap` is set).
 */
export function scoreCar(car: Car, prefs: Preferences, { ignoreBudgetCap = false } = {}): Match | null {
  const reasons: string[] = [];
  const caveats: string[] = [];
  let score = 0;

  // Seats: a hard requirement.
  if (car.seats < prefs.seats) return null;
  score += WEIGHTS.seats;
  reasons.push(
    car.seats === prefs.seats
      ? `Seats ${car.seats}, exactly what you need`
      : `Seats ${car.seats}, room for your ${prefs.seats}`,
  );

  // Budget: judged on the selected condition that fits best.
  let best: { condition: Condition; price: number; points: number } | null = null;
  for (const condition of prefs.conditions) {
    const price = car.prices[condition];
    const points = budgetPoints(price, prefs.budget, ignoreBudgetCap);
    if (points === null) continue;
    if (!best || points > best.points || (points === best.points && price < best.price)) {
      best = { condition, price, points };
    }
  }
  if (!best) return null;
  score += best.points;

  const { min, max, range } = prefs.budget;
  const text = priceText(best.condition, best.price);
  if (best.price > max) {
    caveats.push(`${text}, ${usd(best.price - max)} over your ${usd(max)} max`);
  } else if (best.price < min) {
    caveats.push(
      range ? `${text}, below your ${budgetLabel(prefs.budget)} range` : `${text}, well below your ${usd(max)} budget`,
    );
  } else if (range && min > 0) {
    reasons.push(`${text}, within your ${budgetLabel(prefs.budget)} range`);
  } else {
    const under = max - best.price;
    reasons.push(under >= 1000 ? `${text}, ${usd(under)} under your budget` : `${text}, right at your budget`);
  }

  // Fuel type
  if (prefs.fuel === "any" || car.fuel === prefs.fuel) {
    score += WEIGHTS.fuel;
    if (prefs.fuel !== "any") reasons.push(`${FUEL_LABELS[car.fuel]}, as requested (${car.efficiency})`);
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
  if (car.goodFor.includes(prefs.usage)) {
    score += WEIGHTS.usage;
    reasons.push(USAGE_REASONS[prefs.usage]);
  } else {
    caveats.push(`Not a standout for ${USAGE_LABELS[prefs.usage].toLowerCase()}`);
  }

  // Must-have features
  if (prefs.features.length === 0) {
    score += WEIGHTS.features;
  } else {
    const have = prefs.features.filter((f) => hasFeature(car, f));
    const missing = prefs.features.filter((f) => !hasFeature(car, f));
    score += WEIGHTS.features * (have.length / prefs.features.length);
    if (have.length > 0) {
      reasons.push(
        `Offers ${have.length} of ${prefs.features.length} must-haves: ${have.map((f) => FEATURE_LABELS[f]).join(", ")}`,
      );
    }
    if (missing.length > 0) {
      caveats.push(`Missing: ${missing.map((f) => FEATURE_LABELS[f]).join(", ")}`);
    }
  }

  return {
    car,
    condition: best.condition,
    price: best.price,
    savings: savingsFor(car, prefs.conditions),
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
  return matches;
}

export function rankCars(prefs: Preferences, sort: SortKey = DEFAULT_SORT, limit = 10): MatchResult {
  const scored = CARS.map((car) => scoreCar(car, prefs)).filter(isMatch);
  // Ties go to the car priced closest to the middle of the budget, so an
  // "Under $30k" search favors cheap cars and a $150k search favors cars
  // that actually use the budget.
  const target = (prefs.budget.min + prefs.budget.max) / 2;
  const distance = (m: Match) => Math.abs(m.price - target);
  scored.sort((a, b) => b.score - a.score || distance(a) - distance(b));

  if (scored.length > 0) {
    return {
      matches: applySort(scored.slice(0, limit), sort),
      excludedCount: CARS.length - scored.length,
      fallback: false,
    };
  }

  // Nothing fits the budget (e.g. a very low max): show the cheapest cars
  // that still seat everyone, so the shopper sees how close they can get.
  const closest = CARS.map((car) => scoreCar(car, prefs, { ignoreBudgetCap: true }))
    .filter(isMatch)
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);
  return { matches: applySort(closest, sort), excludedCount: CARS.length, fallback: closest.length > 0 };
}
