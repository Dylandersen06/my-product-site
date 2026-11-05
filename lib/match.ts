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

export interface Preferences {
  budget: Budget;
  seats: number;
  fuel: Fuel | "any";
  body: BodyStyle | "any";
  usage: Usage;
  features: Feature[];
}

export interface Match {
  car: Car;
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

/**
 * Score one car against the shopper's preferences. Returns null when the car
 * fails a hard requirement (too few seats, or far over budget unless
 * `ignoreBudgetCap` is set).
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

  // Budget: full points inside [min, max]. Above the max, a sliding scale down
  // to zero at 20% over (beyond that the car is excluded). Below the min (the
  // bottom of a preset range, or a quarter of an exact budget), partial credit
  // in proportion to how close it gets, so a $22k car doesn't top the list
  // for a $250k–$1M shopper.
  const { min, max, range } = prefs.budget;
  if (car.price > max) {
    const over = (car.price - max) / max;
    if (over > MAX_OVER_BUDGET && !ignoreBudgetCap) return null;
    score += WEIGHTS.budget * Math.max(0, 1 - over / MAX_OVER_BUDGET);
    caveats.push(`Starts around ${usd(car.price)}, ${usd(car.price - max)} over your ${usd(max)} max`);
  } else if (car.price < min) {
    score += WEIGHTS.budget * (car.price / min);
    caveats.push(
      range
        ? `Starts around ${usd(car.price)}, below your ${budgetLabel(prefs.budget)} range`
        : `Starts around ${usd(car.price)}, well below your ${usd(max)} budget`,
    );
  } else if (range && min > 0) {
    score += WEIGHTS.budget;
    reasons.push(`Starts around ${usd(car.price)}, within your ${budgetLabel(prefs.budget)} range`);
  } else {
    score += WEIGHTS.budget;
    const under = max - car.price;
    reasons.push(
      under >= 1000
        ? `Starts around ${usd(car.price)}, ${usd(under)} under your budget`
        : `Starts around ${usd(car.price)}, right at your budget`,
    );
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

  return { car, score: Math.round(score), reasons, caveats };
}

const isMatch = (m: Match | null): m is Match => m !== null;

export function rankCars(prefs: Preferences, limit = 10): MatchResult {
  const scored = CARS.map((car) => scoreCar(car, prefs)).filter(isMatch);
  // Ties go to the car priced closest to the middle of the budget, so an
  // "Under $30k" search favors cheap cars and a $150k search favors cars
  // that actually use the budget.
  const target = (prefs.budget.min + prefs.budget.max) / 2;
  const distance = (m: Match) => Math.abs(m.car.price - target);
  scored.sort((a, b) => b.score - a.score || distance(a) - distance(b));

  if (scored.length > 0) {
    return { matches: scored.slice(0, limit), excludedCount: CARS.length - scored.length, fallback: false };
  }

  // Nothing fits the budget (e.g. a very low max): show the cheapest cars
  // that still seat everyone, so the shopper sees how close they can get.
  const closest = CARS.filter((car) => car.seats >= prefs.seats)
    .sort((a, b) => a.price - b.price)
    .slice(0, 5)
    .map((car) => scoreCar(car, prefs, { ignoreBudgetCap: true }))
    .filter(isMatch);
  return { matches: closest, excludedCount: CARS.length, fallback: closest.length > 0 };
}
