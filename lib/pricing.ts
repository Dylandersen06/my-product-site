// Used and certified pre-owned (CPO) price estimates, per trim.
//
// These are modeled from each trim's new price using typical depreciation
// patterns. They are NOT live market data: real prices vary by trim, mileage,
// condition and region, so the UI labels them as estimates and tells shoppers
// to check local listings.

import type { BodyStyle, Fuel } from "./cars";

/** Display order for the toggle and the price comparison. */
export const CONDITIONS = ["used", "cpo", "new"] as const;
export type Condition = (typeof CONDITIONS)[number];

export const DEFAULT_CONDITIONS: Condition[] = ["new"];

export const CONDITION_LABELS: Record<Condition, string> = {
  used: "Used",
  cpo: "Certified Pre-Owned",
  new: "New",
};

export interface ConditionPricing {
  prices: Record<Condition, number>;
  /** Typical odometer readings for used and CPO examples. */
  mileage: { used: number; cpo: number };
  /** Age of the used and CPO examples the estimates describe. */
  usedAgeYears: number;
  /** Share of the new price a typical 3-year-old example keeps. */
  threeYearShare: number;
}

/** Share of the new price a typical 3-year-old example keeps, by brand. */
const BRAND_RETENTION: Record<string, number> = {
  Toyota: 0.78,
  Honda: 0.75,
  Subaru: 0.73,
  Lexus: 0.74,
  Porsche: 0.75,
  Mazda: 0.7,
  Ford: 0.66,
  Jeep: 0.66,
  GMC: 0.67,
  Kia: 0.67,
  Hyundai: 0.66,
  Chevrolet: 0.65,
  Ram: 0.65,
  Tesla: 0.65,
  Nissan: 0.6,
  Volkswagen: 0.6,
  Mitsubishi: 0.6,
  Buick: 0.58,
  Chrysler: 0.52,
  BMW: 0.55,
  Audi: 0.55,
  Genesis: 0.55,
  Volvo: 0.55,
  "Land Rover": 0.55,
  "Mercedes-Benz": 0.53,
  Cadillac: 0.52,
  Lincoln: 0.52,
  Maserati: 0.42,
  "Aston Martin": 0.5,
  McLaren: 0.55,
  Bentley: 0.58,
  "Rolls-Royce": 0.6,
  Lamborghini: 0.8,
  Ferrari: 0.85,
};

const FUEL_ADJUSTMENT: Record<Fuel, number> = { gas: 0, hybrid: 0.02, phev: -0.05, electric: -0.12 };
const TRUCK_ADJUSTMENT = 0.05;

/** Models known to hold value noticeably better or worse than their brand. */
const MODEL_RETENTION: Record<string, number> = {
  "toyota-tacoma": 0.85,
  "toyota-4runner": 0.85,
  "toyota-sienna": 0.82,
  "toyota-rav4-hybrid": 0.82,
  "ford-maverick": 0.88,
  "ford-bronco": 0.78,
  "ford-mustang": 0.72,
  "jeep-wrangler": 0.8,
  "honda-civic": 0.78,
  "subaru-wrx": 0.75,
  "mazda-mx-5-miata": 0.78,
  "volkswagen-golf-gti": 0.72,
  "chevrolet-tahoe": 0.72,
  "cadillac-escalade": 0.7,
  "bmw-m3": 0.75,
  "mercedes-benz-g-class": 0.85,
  "lexus-lx": 0.85,
  "porsche-911-carrera": 0.9,
  "nissan-leaf": 0.45,
};

/**
 * Models launched too recently to have 3-year-old examples, mapped to the age
 * of the oldest ones around. Everything else uses 3 years.
 */
const USED_AGE_YEARS: Record<string, number> = {
  "kia-k4": 1,
  "porsche-macan-electric": 1,
  "lamborghini-temerario": 1,
  "ferrari-12cilindri": 1,
  "buick-envista": 2,
  "chevrolet-equinox-ev": 2,
  "kia-ev9": 2,
  "mazda-cx-90": 2,
  "tesla-cybertruck": 2,
  "lamborghini-revuelto": 2,
  "ferrari-purosangue": 2,
  "rolls-royce-spectre": 2,
  "aston-martin-db12": 2,
  "mclaren-750s": 2,
  "mclaren-artura": 2,
  "maserati-grecale": 2,
  "maserati-granturismo": 2,
};

/** Depreciation is steepest early: share of the 3-year loss taken by each age. */
const AGE_CURVE: Record<number, number> = { 1: 0.5, 2: 0.78, 3: 1 };
const DEFAULT_USED_AGE = 3;
/** After year 3, value keeps falling by about this share each year. */
const YEARLY_LOSS_AFTER_3 = 0.12;

/** Share of the new price a car keeps at a given age, up to and past 3 years. */
export function valueShareAtAge(threeYearShare: number, age: number): number {
  if (age <= 0) return 1;
  if (age <= 3) return 1 - (1 - threeYearShare) * AGE_CURVE[age];
  return threeYearShare * (1 - YEARLY_LOSS_AFTER_3) ** (age - 3);
}

const LUXURY_BRANDS = new Set([
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Lexus",
  "Porsche",
  "Genesis",
  "Volvo",
  "Land Rover",
  "Cadillac",
  "Lincoln",
]);
const EXOTIC_BRANDS = new Set([
  "Ferrari",
  "Lamborghini",
  "McLaren",
  "Aston Martin",
  "Maserati",
  "Bentley",
  "Rolls-Royce",
]);

/** Used prices stay below new, even for cars that hold value very well. */
const MAX_USED_SHARE_OF_NEW = 0.95;
const MAX_CPO_SHARE_OF_NEW = 0.97;
const CPO_MILEAGE_SHARE = 0.8;

export function brandTier(make: string): "mainstream" | "luxury" | "exotic" {
  if (EXOTIC_BRANDS.has(make)) return "exotic";
  return LUXURY_BRANDS.has(make) ? "luxury" : "mainstream";
}

function cpoPremium(make: string): number {
  if (EXOTIC_BRANDS.has(make)) return 1.1;
  if (LUXURY_BRANDS.has(make)) return 1.08;
  return 1.06;
}

function milesPerYear(make: string, body: BodyStyle, fuel: Fuel): number {
  if (EXOTIC_BRANDS.has(make)) return body === "coupe" ? 2500 : 5000;
  if (body === "coupe") return 7000;
  if (body === "truck") return 13000;
  if (fuel === "electric") return 10000;
  return 12000;
}

const roundPrice = (n: number) => (n >= 100_000 ? Math.round(n / 1000) * 1000 : Math.round(n / 100) * 100);
const roundMiles = (n: number) => Math.max(1000, Math.round(n / 1000) * 1000);

export function estimatePricing(car: {
  id: string;
  make: string;
  body: BodyStyle;
  fuel: Fuel;
  newPrice: number;
}): ConditionPricing {
  const { id, make, body, fuel, newPrice } = car;
  const usedAgeYears = USED_AGE_YEARS[id] ?? DEFAULT_USED_AGE;

  const threeYearShare =
    MODEL_RETENTION[id] ??
    (BRAND_RETENTION[make] ?? 0.6) + FUEL_ADJUSTMENT[fuel] + (body === "truck" ? TRUCK_ADJUSTMENT : 0);
  const share = valueShareAtAge(threeYearShare, usedAgeYears);

  const used = roundPrice(newPrice * Math.min(share, MAX_USED_SHARE_OF_NEW));
  const cpo = roundPrice(Math.min(used * cpoPremium(make), newPrice * MAX_CPO_SHARE_OF_NEW));
  const usedMiles = milesPerYear(make, body, fuel) * usedAgeYears;

  return {
    prices: { used, cpo, new: newPrice },
    mileage: { used: roundMiles(usedMiles), cpo: roundMiles(usedMiles * CPO_MILEAGE_SHARE) },
    usedAgeYears,
    threeYearShare,
  };
}

/** How much a condition saves compared with buying new. */
export function savingsVsNew(prices: Record<Condition, number>, condition: Condition): number {
  return prices.new - prices[condition];
}

/** A caveat for brands whose pre-owned sales don't fit the usual CPO mold. */
export function cpoNote(make: string): string | null {
  return make === "Tesla"
    ? "Tesla has no traditional dealer CPO program, so treat that figure as a rough guide."
    : null;
}
