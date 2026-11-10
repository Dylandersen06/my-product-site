// 5-Year Cost to Own estimates. These are modeled from each trim's price and
// specs with the assumptions below, not quotes: real costs vary by location,
// driver, loan terms and how the car is used. Loan interest isn't included.

import type { Car, Trim } from "./cars";
import { brandTier, valueShareAtAge, type Condition } from "./pricing";

export const DEFAULT_MILES_PER_YEAR = 12_000;
export const MIN_MILES_PER_YEAR = 1_000;
export const MAX_MILES_PER_YEAR = 50_000;

export const YEARS = 5;

/** Fuel and electricity, in dollars. */
const REGULAR_GAS_PER_GALLON = 3.3;
const PREMIUM_GAS_PER_GALLON = 4.1;
const ELECTRICITY_PER_KWH = 0.17;
/** Used when a vehicle has no published MPG, like heavy-duty trucks. */
const FALLBACK_MPG = { truck: 13, other: 16 };
/** Typical consumption, by body style. */
const KWH_PER_MILE: Partial<Record<Car["body"], number>> = { sedan: 0.27, coupe: 0.3, hatchback: 0.28, suv: 0.33, minivan: 0.38, truck: 0.48 };
/** Roughly how much a plug-in hybrid's driving is electric, from its range. */
const phevElectricShare = (rangeMi: number) => rangeMi / (rangeMi + 30);

/** Each 1,000 miles a year above or below the default moves resale value 1%, up to 15%. */
const RESALE_PER_1000_MILES = 0.01;
const MAX_RESALE_MILEAGE_EFFECT = 0.15;

/** Insurance per year: a base plus a share of the car's average value over the 5 years. */
const INSURANCE_BASE = 900;
const INSURANCE_VALUE_SHARE = 0.025;
const SPORTS_CAR_INSURANCE = 1.25;

/** Maintenance and repairs per year at 12,000 miles. */
const MAINTENANCE_BASE = { mainstream: 650, luxury: 1200 };
const EXOTIC_MAINTENANCE_MIN = 3000;
const EXOTIC_MAINTENANCE_SHARE = 0.01;
const RELIABLE_BRANDS = new Set(["Toyota", "Lexus", "Honda", "Acura", "Mazda"]);
const RELIABLE_FACTOR = 0.85;
const EV_FACTOR = 0.6;
const AGE_FACTOR: Record<Condition, number> = { new: 1, cpo: 1.1, used: 1.25 };

/** Purchase and registration fees. */
export const SALES_TAX = 0.06;
export const DOC_FEE = 400;
const NEW_CAR_DESTINATION_FEE = 1300;
const REGISTRATION_PER_YEAR = 150;

export interface CostToOwn {
  depreciation: number;
  fuel: number;
  insurance: number;
  maintenance: number;
  fees: number;
  total: number;
  monthly: number;
  /** "Fuel", "Charging" or "Fuel + charging". */
  fuelLabel: string;
}

const round10 = (n: number) => Math.round(n / 10) * 10;

function fuelCost(car: Car, trim: Trim, miles: number): { cost: number; label: string } {
  const tier = brandTier(car.make);
  const gasPrice = tier === "mainstream" ? REGULAR_GAS_PER_GALLON : PREMIUM_GAS_PER_GALLON;
  const kwh = KWH_PER_MILE[car.body] ?? 0.33;
  const perMileElectric = kwh * ELECTRICITY_PER_KWH;
  const mpg = trim.mpg ?? (car.body === "truck" ? FALLBACK_MPG.truck : FALLBACK_MPG.other);
  const perMileGas = gasPrice / mpg;

  if (car.fuel === "electric") return { cost: miles * YEARS * perMileElectric, label: "Charging" };
  if (car.fuel === "phev") {
    const share = phevElectricShare(trim.evRangeMi ?? 10);
    return { cost: miles * YEARS * (share * perMileElectric + (1 - share) * perMileGas), label: "Fuel + charging" };
  }
  return { cost: miles * YEARS * perMileGas, label: "Fuel" };
}

export function costToOwn(car: Car, trim: Trim, condition: Condition, milesPerYear: number): CostToOwn {
  const price = trim.prices[condition];
  const startAge = condition === "new" ? 0 : trim.usedAgeYears;
  const tier = brandTier(car.make);

  const mileageEffect = Math.max(
    -MAX_RESALE_MILEAGE_EFFECT,
    Math.min(MAX_RESALE_MILEAGE_EFFECT, ((milesPerYear - DEFAULT_MILES_PER_YEAR) / 1000) * RESALE_PER_1000_MILES),
  );
  const resale = trim.prices.new * valueShareAtAge(trim.threeYearShare, startAge + YEARS) * (1 - mileageEffect);
  const depreciation = Math.max(0, price - resale);

  const fuel = fuelCost(car, trim, milesPerYear);

  const averageValue = (price + Math.min(resale, price)) / 2;
  const insurancePerYear =
    (INSURANCE_BASE + averageValue * INSURANCE_VALUE_SHARE) * (car.body === "coupe" ? SPORTS_CAR_INSURANCE : 1);

  const base =
    tier === "exotic"
      ? Math.max(EXOTIC_MAINTENANCE_MIN, trim.prices.new * EXOTIC_MAINTENANCE_SHARE)
      : MAINTENANCE_BASE[tier];
  const maintenancePerYear =
    base *
    (RELIABLE_BRANDS.has(car.make) ? RELIABLE_FACTOR : 1) *
    (car.fuel === "electric" ? EV_FACTOR : 1) *
    AGE_FACTOR[condition] *
    (milesPerYear / DEFAULT_MILES_PER_YEAR);

  const fees =
    price * SALES_TAX +
    DOC_FEE +
    (condition === "new" ? NEW_CAR_DESTINATION_FEE : 0) +
    REGISTRATION_PER_YEAR * YEARS;

  const parts = {
    depreciation: round10(depreciation),
    fuel: round10(fuel.cost),
    insurance: round10(insurancePerYear * YEARS),
    maintenance: round10(maintenancePerYear * YEARS),
    fees: round10(fees),
  };
  const total = parts.depreciation + parts.fuel + parts.insurance + parts.maintenance + parts.fees;
  return { ...parts, total, monthly: Math.round(total / (YEARS * 12)), fuelLabel: fuel.label };
}
