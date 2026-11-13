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
import { brandTier, CONDITION_LABELS, savingsVsNew, type Condition } from "./pricing";

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
  cost: "Lowest yearly cost",
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
  /** Cost estimates, including the yearly running cost, for the recommended trim in that condition. */
  ownership: CostToOwn;
  score: number; // 0–100
  /** The unrounded score, used for ordering so near-ties still rank by fit. */
  rank: number;
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
  budget: 25,
  seats: 10,
  fuel: 15,
  body: 15,
  usage: 20,
  features: 15,
} as const;

/**
 * Of the usage points, how many come from the car being known for that use.
 * The rest measure how well this trim's specs suit it (see `usageFit`), which
 * is what separates the many cars that tick every box.
 */
const USAGE_TAG_POINTS = 12;

/**
 * Share of the tag points by where the use sits in the car's `goodFor` list,
 * which is ordered by what the car is best at. A sports car whose main job is
 * performance beats an off-roader that's also quick.
 */
const TAG_POSITION_SHARE = [1, 0.85, 0.7, 0.6];

/**
 * Cars can be up to this fraction over budget and still count as matches.
 * Anything pricier is excluded.
 */
const MAX_OVER_BUDGET = 0.05;
/** Budget points a car loses at the full 5% over, so one at the budget still wins a tie. */
const MAX_OVER_BUDGET_LOSS = 2;

/** The most a matching car can cost: the budget plus the 5% allowance. */
const budgetCeiling = (budget: Budget) => budget.max * (1 + MAX_OVER_BUDGET);

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** 0–1: fuel economy, with EVs and plug-ins near the top. */
function efficiency(trim: Trim): number {
  // EVs top out a little below a 50-mpg hybrid, so an open-fuel commuter search
  // shows a mix instead of only EVs.
  if (trim.fuel === "electric") return 0.6 + 0.3 * clamp01((trim.evRangeMi ?? 0) / 300);
  if (trim.fuel === "phev") return 0.8;
  return clamp01(((trim.mpg ?? 20) - 20) / 30);
}

const OFFROAD_GEAR =
  /lock|skid|all-terrain|off-road|\btrail(?!er)|rock|mud|TRD|Rubicon|Badlands|Raptor|Tremor|Z71|ZR2|AT4|PRO-4X|Overtrail|Wildtrak|Trailhawk|X-MODE/i;

/**
 * 0–1: how well this trim's specs suit the chosen use, beyond the car being
 * tagged for it. A towing search ranks by towing capacity, a performance
 * search by 0–60 time, a family search by seats and cargo, and so on.
 */
function usageFit(car: Car, trim: Trim, usage: Usage): number {
  switch (usage) {
    case "commute":
      return efficiency(trim);
    case "city": {
      const size = car.body === "hatchback" ? 1 : car.body === "sedan" ? 0.8 : car.body === "suv" && car.seats <= 5 ? 0.6 : 0.2;
      return 0.6 * efficiency(trim) + 0.4 * size;
    }
    case "roadtrip":
      return 0.5 * efficiency(trim) + 0.3 * clamp01(trim.cargoCuFt / 35) + 0.2 * (trim.features.includes("adaptiveCruise") ? 1 : 0);
    case "family":
      return 0.5 * clamp01((car.seats - 4) / 4) + 0.5 * clamp01(trim.cargoCuFt / 40);
    case "offroad": {
      const drive = /4WD/.test(trim.drivetrain) ? 0.6 : /AWD/.test(trim.drivetrain) ? 0.4 : 0;
      const gear = OFFROAD_GEAR.test(`${trim.name} ${trim.highlights.join(" ")}`) ? 0.4 : 0;
      return drive + gear;
    }
    case "towing":
      return clamp01(trim.towingLbs / 12000);
    case "performance":
      // 2.0s or quicker scores 1, 8.0s scores 0, so supercars still out-rank 3-second SUVs.
      return clamp01((8 - trim.zero60) / 6);
    case "luxury": {
      const tier = brandTier(car.make);
      return 0.5 * (tier === "mainstream" ? 0 : 1) + 0.5 * clamp01(trim.features.length / 7);
    }
  }
}

function usagePoints(car: Car, trim: Trim, usage: Usage | "any"): number {
  if (usage === "any") return WEIGHTS.usage;
  const position = car.goodFor.indexOf(usage);
  const tagged = position < 0 ? 0 : USAGE_TAG_POINTS * TAG_POSITION_SHARE[Math.min(position, TAG_POSITION_SHARE.length - 1)];
  return tagged + (WEIGHTS.usage - USAGE_TAG_POINTS) * usageFit(car, trim, usage);
}

function fuelPoints(trim: Trim, fuel: Fuel | "any"): number {
  if (fuel === "any" || trim.fuel === fuel) return WEIGHTS.fuel;
  return WEIGHTS.fuel * (FUEL_SIMILARITY[fuel]?.[trim.fuel] ?? 0);
}

/** A short spec that backs up why the car suits the chosen use. */
function usageDetail(car: Car, trim: Trim, usage: Usage): string | null {
  if (usage === "towing" && trim.towingLbs > 0) return `tows up to ${trim.towingLbs.toLocaleString("en-US")} lb`;
  if (usage === "performance") return `0–60 mph in ${trim.zero60}s`;
  if (usage === "family") return `${car.seats} seats, ${trim.cargoCuFt} cu ft of cargo`;
  if (usage === "commute" || usage === "city") return trim.economy;
  return null;
}

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
 * Prices from this share of the budget up to the max get full budget points,
 * so a $100k shopper sees cars that use their budget, not $20k ones.
 */
const BUDGET_SWEET_SPOT = 0.85;
/** At or below this share of the budget, a price loses the most budget points. */
const BUDGET_POINTS_FLOOR = 0.2;
/**
 * The most budget points a far-under-budget price can lose. Kept below the
 * full budget weight so a car that fits what was asked for (say, the hybrid
 * a shopper wants) still beats one that's merely priced closer.
 */
const MAX_UNDER_BUDGET_LOSS = 12;

/**
 * Budget points for a price: full points from 85% of the max up to the max.
 * Up to 5% over the max loses a few points (beyond that it returns null
 * unless `ignoreCap` is set). Below 85%, points fall off
 * steadily down to 20% of the max, so cars close to the budget rank first.
 * "Any budget" has no target, so every price gets full points.
 */
function budgetPoints(price: number, budget: Budget, ignoreCap: boolean): number | null {
  if (price > budget.max) {
    const over = (price - budget.max) / budget.max;
    if (over > MAX_OVER_BUDGET && !ignoreCap) return null;
    return Math.max(0, WEIGHTS.budget - MAX_OVER_BUDGET_LOSS * (over / MAX_OVER_BUDGET));
  }
  if (budget.range === "any") return WEIGHTS.budget;
  const share = price / budget.max;
  if (share >= BUDGET_SWEET_SPOT) return WEIGHTS.budget;
  const shortfall = clamp01((BUDGET_SWEET_SPOT - share) / (BUDGET_SWEET_SPOT - BUDGET_POINTS_FLOOR));
  return WEIGHTS.budget - MAX_UNDER_BUDGET_LOSS * shortfall;
}

/** The biggest saving vs new among selected used/CPO conditions (or used, if only New is selected). */
function savingsFor(trim: Trim, conditions: Condition[]): number {
  const preOwned = conditions.filter((c) => c !== "new");
  return Math.max(...(preOwned.length > 0 ? preOwned : (["used"] as const)).map((c) => savingsVsNew(trim.prices, c)));
}

/**
 * The price ties are broken toward. "Any budget" favors the cheapest option;
 * otherwise the budget itself, so the closest to it wins.
 */
const budgetMidpoint = (budget: Budget) => (budget.range === "any" ? 0 : budget.max);

/**
 * Picks the trim and selected condition that fit best. Anything within the
 * budget plus its 5% allowance beats anything pricier; after that, the most points for budget,
 * fuel, must-haves and how well the trim suits the chosen use. Ties go to the
 * price closest to the budget, so shoppers get the best-equipped trim they
 * can afford. Returns null if every option is too far over budget.
 */
function bestOption(car: Car, prefs: Preferences, ignoreCap: boolean) {
  const target = budgetMidpoint(prefs.budget);
  const strict = prefs.filters !== null;
  let best: { trim: Trim; condition: Condition; price: number; key: number; budget: number } | null = null;
  for (const trim of car.trims) {
    const have = prefs.features.filter((f) => hasFeature(car, trim, f)).length;
    if (strict && (!trimPasses(trim, prefs.filters!) || have < prefs.features.length)) continue;
    if (strict && prefs.fuel !== "any" && trim.fuel !== prefs.fuel) continue;
    const featureShare = prefs.features.length === 0 ? 1 : have / prefs.features.length;
    const trimPoints =
      WEIGHTS.features * featureShare + fuelPoints(trim, prefs.fuel) + usagePoints(car, trim, prefs.usage);
    for (const condition of prefs.conditions) {
      const price = trim.prices[condition];
      const budget = budgetPoints(price, prefs.budget, ignoreCap);
      if (budget === null) continue;
      const key = (price <= budgetCeiling(prefs.budget) ? 1000 : 0) + budget + trimPoints;
      const closer = best !== null && Math.abs(price - target) < Math.abs(best.price - target);
      if (!best || key > best.key + 1e-9 || (Math.abs(key - best.key) <= 1e-9 && closer)) {
        best = { trim, condition, price, key, budget };
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
    // Fuel is checked per trim in bestOption, so a gas model's hybrid trim counts.
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

  // Fuel type, judged on the recommended trim
  score += fuelPoints(trim, prefs.fuel);
  if (prefs.fuel === "any" || trim.fuel === prefs.fuel) {
    if (prefs.fuel !== "any") reasons.push(`${FUEL_LABELS[trim.fuel]}, as requested (${trim.economy})`);
  } else {
    caveats.push(`${FUEL_LABELS[trim.fuel]} rather than ${FUEL_LABELS[prefs.fuel].toLowerCase()}`);
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

  // Primary use: being known for it, plus how well this trim's specs suit it
  score += usagePoints(car, trim, prefs.usage);
  if (prefs.usage !== "any") {
    const detail = usageDetail(car, trim, prefs.usage);
    if (car.goodFor.includes(prefs.usage)) {
      reasons.push(detail ? `${USAGE_REASONS[prefs.usage]} (${detail})` : USAGE_REASONS[prefs.usage]);
    } else {
      caveats.push(`Not a standout for ${USAGE_LABELS[prefs.usage].toLowerCase()}`);
    }
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
    rank: score,
    reasons,
    caveats,
  };
}

const isMatch = (m: Match | null): m is Match => m !== null;

/** Reorders the chosen matches. The set itself is always the best matches. */
function applySort(matches: Match[], sort: SortKey): Match[] {
  if (sort === "price") return [...matches].sort((a, b) => a.price - b.price || b.score - a.score);
  if (sort === "savings") return [...matches].sort((a, b) => b.savings - a.savings || b.score - a.score);
  if (sort === "cost") {
    return [...matches].sort((a, b) => a.ownership.yearly.total - b.ownership.yearly.total || b.score - a.score);
  }
  return matches;
}

export function rankCars(prefs: Preferences, sort: SortKey = DEFAULT_SORT, limit = 10): MatchResult {
  const scored = CARS.map((car) => scoreCar(car, prefs)).filter(isMatch);
  // Ties go to the car priced closest to the budget, so a $100k search favors
  // cars that actually use it.
  const target = budgetMidpoint(prefs.budget);
  const distance = (m: Match) => Math.abs(m.price - target);
  const byFit = (a: Match, b: Match) => b.rank - a.rank || distance(a) - distance(b);
  // Every scored car is at most 5% over budget, and those over it lose a few
  // points, so cars at or under the budget win close calls.
  const top = scored.sort(byFit).slice(0, limit);

  if (scored.length > 0) {
    return {
      matches: applySort(top, sort),
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
