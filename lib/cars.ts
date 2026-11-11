// Car dataset for CarMatch AI.
// Each model has its main trims in lib/trims.ts. New prices are approximate 2025
// starting MSRPs in USD (before destination fees). Used and CPO prices and
// mileage are modeled per trim by lib/pricing.ts. Specs and towing figures are
// approximate. Always confirm details with a dealer.

import { estimatePricing, type ConditionPricing } from "./pricing";
import { TRIM_DATA } from "./trims";
import { TRIM_SPECS } from "./trim-specs";

export type BodyStyle =
  | "sedan"
  | "hatchback"
  | "suv"
  | "wagon"
  | "minivan"
  | "truck"
  | "coupe";

export type Fuel = "gas" | "hybrid" | "phev" | "electric";

export type Usage =
  | "commute"
  | "family"
  | "roadtrip"
  | "offroad"
  | "towing"
  | "city"
  | "performance"
  | "luxury";

/** Features stored per trim. `thirdRow` and `towing` come from the model. */
export type StoredFeature =
  | "awd"
  | "carplay"
  | "adaptiveCruise"
  | "blindSpot"
  | "heatedSeats"
  | "sunroof"
  | "camera360";

export type Feature = StoredFeature | "thirdRow" | "towing";

export interface Trim extends ConditionPricing {
  name: string;
  engine: string;
  hp: number;
  /** MPG, EV range or plug-in range, ready to display. */
  economy: string;
  drivetrain: string;
  /** 0-60 mph in seconds. */
  zero60: number;
  transmission: string;
  /** Cubic feet behind the rearmost seats, or bed volume for pickups. */
  cargoCuFt: number;
  /** Max towing in pounds, 0 when not rated. */
  towingLbs: number;
  /** Combined MPG, null for pure EVs and unrated vehicles. */
  mpg: number | null;
  /** Electric range in miles, null if it doesn't plug in or isn't published. */
  evRangeMi: number | null;
  features: StoredFeature[];
  highlights: string[];
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  body: BodyStyle;
  fuel: Fuel;
  seats: number;
  towingLbs: number;
  goodFor: Usage[];
  /** Main trims, cheapest first. */
  trims: Trim[];
}

export const BODY_LABELS: Record<BodyStyle, string> = {
  sedan: "Sedan",
  hatchback: "Hatchback",
  suv: "SUV",
  wagon: "Wagon",
  minivan: "Minivan",
  truck: "Pickup truck",
  coupe: "Coupe / sports car",
};

export const FUEL_LABELS: Record<Fuel, string> = {
  gas: "Gas",
  hybrid: "Hybrid",
  phev: "Plug-in hybrid",
  electric: "Electric",
};

export const USAGE_LABELS: Record<Usage, string> = {
  commute: "Daily commuting",
  family: "Family hauling",
  roadtrip: "Road trips",
  offroad: "Off-road & outdoors",
  towing: "Towing & hauling",
  city: "City driving & parking",
  performance: "Fun & performance",
  luxury: "Luxury & comfort",
};

export const FEATURE_LABELS: Record<Feature, string> = {
  awd: "AWD / 4WD",
  carplay: "Apple CarPlay / Android Auto",
  adaptiveCruise: "Adaptive cruise control",
  blindSpot: "Blind-spot monitoring",
  heatedSeats: "Heated seats",
  sunroof: "Sunroof / glass roof",
  thirdRow: "Third-row seating",
  towing: "Tows 3,500+ lbs",
  camera360: "360° camera",
};

export const TOWING_THRESHOLD_LBS = 3500;

export function hasFeature(car: Car, trim: Trim, feature: Feature): boolean {
  if (feature === "thirdRow") return car.seats >= 7;
  if (feature === "towing") return trim.towingLbs >= TOWING_THRESHOLD_LBS;
  return trim.features.includes(feature);
}

/** The details page for a car, opened on a trim and condition. */
export function carDetailsHref(id: string, trim: string, condition: string, milesPerYear?: number): string {
  const query = new URLSearchParams({ trim, condition });
  if (milesPerYear !== undefined) query.set("miles", String(milesPerYear));
  return `/cars/${id}?${query}`;
}

export const towingText = (lbs: number) => (lbs > 0 ? `${lbs.toLocaleString("en-US")} lb` : "Not rated");

/** Reads the numbers out of an economy label like "42 mi electric / 38 mpg". */
function parseEconomy(economy: string) {
  const mpg = economy.match(/(\d+) mpg/);
  const range = economy.match(/(\d+) mi (?:range|electric)/);
  return { mpg: mpg ? Number(mpg[1]) : null, evRangeMi: range ? Number(range[1]) : null };
}

const FEATURE_CODES: Record<string, StoredFeature> = {
  a: "awd",
  c: "carplay",
  r: "adaptiveCruise",
  b: "blindSpot",
  h: "heatedSeats",
  s: "sunroof",
};

function car(
  make: string,
  model: string,
  body: BodyStyle,
  fuel: Fuel,
  seats: number,
  towingLbs: number,
  goodFor: Usage[],
): Car {
  const id = `${make}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const rows = TRIM_DATA[id];
  if (!rows?.length) throw new Error(`No trims for ${id}`);
  const specs = TRIM_SPECS[id];
  if (!specs) throw new Error(`No specs for ${id}`);
  const [zero60s, transmissions, cargoCuFt, cameraFrom, towing] = specs;
  if (
    zero60s.length !== rows.length ||
    (Array.isArray(transmissions) && transmissions.length !== rows.length) ||
    (towing && towing.length !== rows.length)
  ) {
    throw new Error(`Specs for ${id} don't line up with its ${rows.length} trims`);
  }
  const trims = rows.map(
    ([name, newPrice, engine, hp, economy, drivetrain, codes, highlights], i): Trim => ({
      name,
      engine,
      hp,
      economy,
      drivetrain,
      zero60: zero60s[i],
      transmission: Array.isArray(transmissions) ? transmissions[i] : transmissions,
      cargoCuFt,
      towingLbs: towing ? towing[i] : towingLbs,
      ...parseEconomy(economy),
      features: [
        ...[...codes].map((code) => FEATURE_CODES[code]),
        ...(cameraFrom !== null && i >= cameraFrom ? (["camera360"] as const) : []),
      ],
      highlights: highlights.split(", "),
      ...estimatePricing({ id, make, body, fuel, newPrice }),
    }),
  );
  return { id, make, model, year: 2025, body, fuel, seats, towingLbs, goodFor, trims };
}

export const CARS: Car[] = [
  // Sedans
  car("Toyota", "Corolla", "sedan", "gas", 5, 0, ["commute", "city"]),
  car("Honda", "Civic", "sedan", "gas", 5, 0, ["commute", "city", "performance"]),
  car("Hyundai", "Elantra", "sedan", "gas", 5, 0, ["commute", "city"]),
  car("Toyota", "Camry", "sedan", "hybrid", 5, 0, ["commute", "roadtrip", "family"]),
  car("Honda", "Accord", "sedan", "gas", 5, 0, ["commute", "roadtrip", "family"]),
  car("Tesla", "Model 3", "sedan", "electric", 5, 0, ["commute", "roadtrip", "performance"]),
  car("BMW", "3 Series", "sedan", "gas", 5, 0, ["commute", "roadtrip", "performance", "luxury"]),

  // Hatchbacks & wagons
  car("Toyota", "Prius", "hatchback", "hybrid", 5, 0, ["commute", "city", "roadtrip"]),
  car("Mazda", "Mazda3 Hatchback", "hatchback", "gas", 5, 0, ["commute", "city", "performance"]),
  car("Volkswagen", "Golf GTI", "hatchback", "gas", 5, 0, ["performance", "commute", "city"]),
  car("Nissan", "Leaf", "hatchback", "electric", 5, 0, ["city", "commute"]),
  car("Subaru", "Outback", "wagon", "gas", 5, 2700, ["roadtrip", "offroad", "family", "commute"]),

  // Small & midsize SUVs
  car("Chevrolet", "Trax", "suv", "gas", 5, 0, ["city", "commute"]),
  car("Honda", "HR-V", "suv", "gas", 5, 0, ["city", "commute"]),
  car("Honda", "CR-V", "suv", "gas", 5, 1500, ["family", "commute", "roadtrip"]),
  car("Toyota", "RAV4 Hybrid", "suv", "hybrid", 5, 1750, ["family", "commute", "roadtrip"]),
  car("Toyota", "RAV4 Plug-in Hybrid", "suv", "phev", 5, 2500, ["commute", "family", "roadtrip", "performance"]),
  car("Mazda", "CX-5", "suv", "gas", 5, 2000, ["commute", "roadtrip", "family"]),
  car("Subaru", "Forester", "suv", "gas", 5, 3000, ["offroad", "family", "roadtrip"]),
  car("Hyundai", "Tucson", "suv", "gas", 5, 2000, ["family", "commute"]),
  car("Jeep", "Wrangler", "suv", "gas", 5, 3500, ["offroad"]),
  car("Ford", "Bronco", "suv", "gas", 5, 3500, ["offroad", "roadtrip"]),
  car("Toyota", "4Runner", "suv", "gas", 5, 6000, ["offroad", "towing", "roadtrip"]),

  // Three-row SUVs
  car("Ford", "Explorer", "suv", "gas", 7, 5300, ["family", "roadtrip", "towing"]),
  car("Honda", "Pilot", "suv", "gas", 8, 5000, ["family", "roadtrip", "towing"]),
  car("Toyota", "Highlander", "suv", "gas", 8, 5000, ["family", "roadtrip"]),
  car("Kia", "Telluride", "suv", "gas", 8, 5000, ["family", "roadtrip", "towing"]),
  car("Chevrolet", "Tahoe", "suv", "gas", 8, 8400, ["family", "towing", "roadtrip"]),

  // Electric SUVs
  car("Tesla", "Model Y", "suv", "electric", 5, 3500, ["family", "commute", "roadtrip"]),
  car("Hyundai", "Ioniq 5", "suv", "electric", 5, 2300, ["commute", "family", "roadtrip"]),
  car("Chevrolet", "Equinox EV", "suv", "electric", 5, 1500, ["commute", "family", "roadtrip"]),
  car("Ford", "Mustang Mach-E", "suv", "electric", 5, 2000, ["commute", "performance", "roadtrip"]),
  car("Kia", "EV9", "suv", "electric", 7, 5000, ["family", "roadtrip", "towing"]),

  // Minivans
  car("Honda", "Odyssey", "minivan", "gas", 8, 3000, ["family", "roadtrip"]),
  car("Toyota", "Sienna", "minivan", "hybrid", 8, 3500, ["family", "roadtrip", "commute"]),
  car("Chrysler", "Pacifica Plug-in Hybrid", "minivan", "phev", 7, 0, ["family", "commute", "roadtrip"]),
  car("Kia", "Carnival", "minivan", "gas", 8, 3500, ["family", "roadtrip"]),

  // Pickup trucks
  car("Ford", "Maverick", "truck", "hybrid", 5, 2000, ["commute", "city", "towing"]),
  car("Toyota", "Tacoma", "truck", "gas", 5, 6500, ["offroad", "towing", "roadtrip"]),
  car("Ford", "F-150", "truck", "gas", 5, 13500, ["towing", "offroad", "family"]),
  car("Chevrolet", "Silverado 1500", "truck", "gas", 5, 13300, ["towing", "offroad", "family"]),

  // Coupes & sports cars
  car("Ford", "Mustang", "coupe", "gas", 4, 0, ["performance"]),
  car("Mazda", "MX-5 Miata", "coupe", "gas", 2, 0, ["performance", "city"]),

  // ── More mainstream brands ───────────────────────────────────────────────
  car("Nissan", "Versa", "sedan", "gas", 5, 0, ["commute", "city"]),
  car("Nissan", "Rogue", "suv", "gas", 5, 1500, ["family", "commute", "roadtrip"]),
  car("Mitsubishi", "Mirage", "hatchback", "gas", 5, 0, ["city", "commute"]),
  car("Mitsubishi", "Eclipse Cross", "suv", "gas", 5, 1500, ["city", "commute"]),
  car("Mitsubishi", "Outlander", "suv", "gas", 7, 2000, ["family", "commute", "roadtrip"]),
  car("Mitsubishi", "Outlander PHEV", "suv", "phev", 7, 1500, ["family", "commute"]),
  car("Kia", "K4", "sedan", "gas", 5, 0, ["commute", "city"]),
  car("Kia", "Sportage", "suv", "gas", 5, 2500, ["family", "commute"]),
  car("Hyundai", "Venue", "suv", "gas", 5, 0, ["city", "commute"]),
  car("Hyundai", "Santa Fe", "suv", "gas", 7, 3500, ["family", "roadtrip", "towing"]),
  car("Hyundai", "Palisade", "suv", "gas", 8, 5000, ["family", "roadtrip", "towing"]),
  car("Mazda", "CX-50", "suv", "gas", 5, 3500, ["offroad", "roadtrip", "commute"]),
  car("Mazda", "CX-90", "suv", "gas", 8, 5000, ["family", "roadtrip", "luxury"]),
  car("Subaru", "Crosstrek", "suv", "gas", 5, 1500, ["commute", "offroad", "city"]),
  car("Subaru", "Ascent", "suv", "gas", 8, 5000, ["family", "roadtrip", "towing"]),
  car("Subaru", "WRX", "sedan", "gas", 5, 0, ["performance"]),
  car("Volkswagen", "Jetta", "sedan", "gas", 5, 0, ["commute", "city"]),
  car("Volkswagen", "Tiguan", "suv", "gas", 5, 1500, ["family", "commute"]),
  car("Volkswagen", "Atlas", "suv", "gas", 7, 5000, ["family", "roadtrip", "towing"]),
  car("Volkswagen", "ID.4", "suv", "electric", 5, 2700, ["commute", "family"]),
  car("Jeep", "Compass", "suv", "gas", 5, 2000, ["commute", "city", "offroad"]),
  car("Jeep", "Grand Cherokee", "suv", "gas", 5, 6200, ["offroad", "family", "towing", "roadtrip"]),
  car("Jeep", "Gladiator", "truck", "gas", 5, 7700, ["offroad", "towing"]),
  car("Ram", "1500", "truck", "gas", 5, 11500, ["towing", "family", "offroad"]),
  car("Ram", "2500", "truck", "gas", 5, 16000, ["towing", "offroad"]),
  car("GMC", "Terrain", "suv", "gas", 5, 1500, ["commute", "family"]),
  car("GMC", "Sierra 1500", "truck", "gas", 5, 13200, ["towing", "family", "offroad"]),
  car("GMC", "Yukon", "suv", "gas", 8, 8400, ["family", "towing", "roadtrip", "luxury"]),
  car("Buick", "Envista", "suv", "gas", 5, 0, ["city", "commute"]),
  car("Buick", "Encore GX", "suv", "gas", 5, 0, ["city", "commute"]),
  car("Buick", "Enclave", "suv", "gas", 7, 5000, ["family", "roadtrip", "luxury"]),
  car("Chrysler", "Pacifica", "minivan", "gas", 8, 3600, ["family", "roadtrip"]),
  car("Chrysler", "Voyager", "minivan", "gas", 7, 3600, ["family"]),

  // ── Full lineups: Japanese mainstream brands ─────────────────────────────
  car("Toyota", "Corolla Hatchback", "hatchback", "gas", 5, 0, ["commute", "city"]),
  car("Toyota", "Corolla Cross", "suv", "gas", 5, 1500, ["commute", "city", "family"]),
  car("Toyota", "Crown", "sedan", "hybrid", 5, 0, ["luxury", "commute", "roadtrip"]),
  car("Toyota", "Crown Signia", "suv", "hybrid", 5, 2700, ["family", "roadtrip", "luxury"]),
  car("Toyota", "bZ4X", "suv", "electric", 5, 1500, ["commute", "family"]),
  car("Toyota", "Grand Highlander", "suv", "gas", 8, 5000, ["family", "roadtrip", "towing"]),
  car("Toyota", "Sequoia", "suv", "hybrid", 8, 9520, ["family", "towing", "roadtrip"]),
  car("Toyota", "Tundra", "truck", "gas", 5, 12000, ["towing", "offroad", "family"]),
  car("Toyota", "Land Cruiser", "suv", "hybrid", 5, 6000, ["offroad", "towing", "roadtrip", "family"]),
  car("Toyota", "GR86", "coupe", "gas", 4, 0, ["performance"]),
  car("Toyota", "GR Supra", "coupe", "gas", 2, 0, ["performance"]),
  car("Toyota", "GR Corolla", "hatchback", "gas", 5, 0, ["performance", "commute"]),
  car("Toyota", "Mirai", "sedan", "electric", 5, 0, ["commute", "city"]),
  car("Honda", "Passport", "suv", "gas", 5, 5000, ["offroad", "roadtrip", "family"]),
  car("Honda", "Ridgeline", "truck", "gas", 5, 5000, ["family", "offroad", "commute"]),
  car("Honda", "Prologue", "suv", "electric", 5, 1500, ["commute", "family", "roadtrip"]),
  car("Honda", "Civic Type R", "hatchback", "gas", 5, 0, ["performance"]),
  car("Nissan", "Sentra", "sedan", "gas", 5, 0, ["commute", "city"]),
  car("Nissan", "Altima", "sedan", "gas", 5, 0, ["commute", "roadtrip", "family"]),
  car("Nissan", "Kicks", "suv", "gas", 5, 0, ["city", "commute"]),
  car("Nissan", "Murano", "suv", "gas", 5, 3500, ["family", "commute", "luxury"]),
  car("Nissan", "Pathfinder", "suv", "gas", 8, 6000, ["family", "roadtrip", "towing"]),
  car("Nissan", "Armada", "suv", "gas", 8, 8500, ["family", "towing", "roadtrip"]),
  car("Nissan", "Frontier", "truck", "gas", 5, 7150, ["towing", "offroad", "commute"]),
  car("Nissan", "Ariya", "suv", "electric", 5, 1500, ["commute", "family"]),
  car("Nissan", "Z", "coupe", "gas", 2, 0, ["performance"]),
  car("Mazda", "Mazda3 Sedan", "sedan", "gas", 5, 0, ["commute", "city", "performance"]),
  car("Mazda", "CX-30", "suv", "gas", 5, 2000, ["city", "commute"]),
  car("Mazda", "CX-70", "suv", "gas", 5, 5000, ["luxury", "roadtrip", "towing"]),
  car("Subaru", "Impreza", "hatchback", "gas", 5, 0, ["commute", "city"]),
  car("Subaru", "Legacy", "sedan", "gas", 5, 0, ["commute", "roadtrip"]),
  car("Subaru", "BRZ", "coupe", "gas", 4, 0, ["performance"]),
  car("Subaru", "Solterra", "suv", "electric", 5, 1500, ["commute", "offroad", "family"]),
  car("Mitsubishi", "Outlander Sport", "suv", "gas", 5, 1500, ["city", "commute"]),
  // ── Full lineups: US, Korean and Volkswagen brands ───────────────────────
  car("Chevrolet", "Trailblazer", "suv", "gas", 5, 1000, ["city", "commute"]),
  car("Chevrolet", "Equinox", "suv", "gas", 5, 1500, ["family", "commute"]),
  car("Chevrolet", "Blazer", "suv", "gas", 5, 4500, ["family", "roadtrip", "performance"]),
  car("Chevrolet", "Blazer EV", "suv", "electric", 5, 3500, ["commute", "family", "performance"]),
  car("Chevrolet", "Traverse", "suv", "gas", 8, 5000, ["family", "roadtrip", "towing"]),
  car("Chevrolet", "Suburban", "suv", "gas", 8, 8300, ["family", "towing", "roadtrip"]),
  car("Chevrolet", "Colorado", "truck", "gas", 5, 7700, ["towing", "offroad", "commute"]),
  car("Chevrolet", "Silverado 2500HD", "truck", "gas", 5, 22500, ["towing", "offroad"]),
  car("Chevrolet", "Silverado EV", "truck", "electric", 5, 12500, ["towing", "commute", "offroad"]),
  car("Chevrolet", "Corvette", "coupe", "gas", 2, 0, ["performance", "roadtrip"]),
  car("Chevrolet", "Malibu", "sedan", "gas", 5, 0, ["commute", "roadtrip"]),
  car("Ford", "Escape", "suv", "gas", 5, 3500, ["commute", "family"]),
  car("Ford", "Bronco Sport", "suv", "gas", 5, 2200, ["offroad", "commute", "family"]),
  car("Ford", "Expedition", "suv", "gas", 8, 9600, ["family", "towing", "roadtrip"]),
  car("Ford", "Ranger", "truck", "gas", 5, 7500, ["towing", "offroad", "commute"]),
  car("Ford", "F-150 Lightning", "truck", "electric", 5, 10000, ["towing", "commute", "family"]),
  car("Ford", "F-250 Super Duty", "truck", "gas", 5, 23000, ["towing", "offroad"]),
  car("GMC", "Acadia", "suv", "gas", 7, 5000, ["family", "roadtrip", "towing"]),
  car("GMC", "Canyon", "truck", "gas", 5, 7700, ["towing", "offroad"]),
  car("GMC", "Sierra 2500HD", "truck", "gas", 5, 22500, ["towing", "offroad", "luxury"]),
  car("GMC", "Hummer EV Pickup", "truck", "electric", 5, 7500, ["offroad", "performance"]),
  car("GMC", "Hummer EV SUV", "suv", "electric", 5, 7500, ["offroad", "performance", "luxury"]),
  car("GMC", "Sierra EV", "truck", "electric", 5, 12500, ["towing", "luxury", "offroad"]),
  car("Jeep", "Grand Cherokee L", "suv", "gas", 7, 6200, ["family", "offroad", "towing", "roadtrip"]),
  car("Jeep", "Wagoneer", "suv", "gas", 8, 10000, ["family", "towing", "roadtrip"]),
  car("Jeep", "Grand Wagoneer", "suv", "gas", 8, 9850, ["luxury", "family", "towing"]),
  car("Jeep", "Wagoneer S", "suv", "electric", 5, 3500, ["luxury", "commute", "performance"]),
  car("Ram", "3500", "truck", "gas", 5, 37090, ["towing"]),
  car("Buick", "Envision", "suv", "gas", 5, 1500, ["luxury", "commute", "family"]),
  car("Hyundai", "Sonata", "sedan", "gas", 5, 0, ["commute", "roadtrip", "family"]),
  car("Hyundai", "Kona", "suv", "gas", 5, 1500, ["city", "commute"]),
  car("Hyundai", "Kona Electric", "suv", "electric", 5, 0, ["city", "commute"]),
  car("Hyundai", "Santa Cruz", "truck", "gas", 5, 5000, ["commute", "offroad", "city"]),
  car("Hyundai", "Ioniq 6", "sedan", "electric", 5, 0, ["commute", "roadtrip"]),
  car("Hyundai", "Ioniq 9", "suv", "electric", 7, 5000, ["family", "roadtrip", "towing"]),
  car("Kia", "Soul", "hatchback", "gas", 5, 0, ["city", "commute"]),
  car("Kia", "Seltos", "suv", "gas", 5, 0, ["city", "commute"]),
  car("Kia", "K5", "sedan", "gas", 5, 0, ["commute", "roadtrip"]),
  car("Kia", "Niro", "suv", "hybrid", 5, 1300, ["commute", "city"]),
  car("Kia", "Niro EV", "suv", "electric", 5, 0, ["commute", "city"]),
  car("Kia", "Sorento", "suv", "gas", 7, 3500, ["family", "roadtrip"]),
  car("Kia", "EV6", "suv", "electric", 5, 2300, ["commute", "performance", "roadtrip"]),
  car("Volkswagen", "Taos", "suv", "gas", 5, 0, ["city", "commute"]),
  car("Volkswagen", "Atlas Cross Sport", "suv", "gas", 5, 5000, ["family", "commute", "roadtrip"]),
  car("Volkswagen", "ID. Buzz", "minivan", "electric", 7, 0, ["family", "roadtrip"]),
  car("Volkswagen", "Golf R", "hatchback", "gas", 5, 0, ["performance", "commute"]),
  // ── Luxury brands ────────────────────────────────────────────────────────
  car("Tesla", "Model S", "sedan", "electric", 5, 0, ["performance", "roadtrip", "luxury"]),
  car("Tesla", "Model X", "suv", "electric", 7, 5000, ["family", "roadtrip", "luxury", "towing"]),
  car("Tesla", "Cybertruck", "truck", "electric", 5, 11000, ["towing", "offroad"]),
  car("BMW", "X3", "suv", "gas", 5, 5000, ["luxury", "family", "commute"]),
  car("BMW", "i4", "sedan", "electric", 5, 0, ["commute", "performance", "luxury"]),
  car("BMW", "X5", "suv", "gas", 5, 7200, ["luxury", "family", "towing", "roadtrip"]),
  car("BMW", "M3", "sedan", "gas", 5, 0, ["performance"]),
  car("Mercedes-Benz", "C-Class", "sedan", "gas", 5, 0, ["luxury", "commute"]),
  car("Mercedes-Benz", "GLC", "suv", "gas", 5, 3500, ["luxury", "family"]),
  car("Mercedes-Benz", "E-Class", "sedan", "gas", 5, 0, ["luxury", "roadtrip"]),
  car("Mercedes-Benz", "S-Class", "sedan", "gas", 5, 0, ["luxury", "roadtrip"]),
  car("Mercedes-Benz", "GLS", "suv", "gas", 7, 7700, ["luxury", "family", "towing", "roadtrip"]),
  car("Mercedes-Benz", "G-Class", "suv", "gas", 5, 7000, ["luxury", "offroad", "towing"]),
  car("Audi", "A3", "sedan", "gas", 5, 0, ["commute", "luxury"]),
  car("Audi", "Q5", "suv", "gas", 5, 4400, ["luxury", "family"]),
  car("Audi", "Q7", "suv", "gas", 7, 7700, ["family", "luxury", "towing"]),
  car("Audi", "S e-tron GT", "sedan", "electric", 5, 0, ["performance", "luxury"]),
  car("Lexus", "ES", "sedan", "hybrid", 5, 0, ["luxury", "commute", "roadtrip"]),
  car("Lexus", "NX", "suv", "hybrid", 5, 2000, ["luxury", "commute"]),
  car("Lexus", "RX", "suv", "gas", 5, 3500, ["luxury", "family"]),
  car("Lexus", "LX", "suv", "gas", 7, 8000, ["luxury", "offroad", "towing", "family"]),
  car("Acura", "Integra", "hatchback", "gas", 5, 0, ["commute", "city", "performance"]),
  car("Acura", "RDX", "suv", "gas", 5, 1500, ["luxury", "commute", "family"]),
  car("Acura", "MDX", "suv", "gas", 7, 5000, ["luxury", "family", "roadtrip"]),
  car("Dodge", "Hornet", "suv", "gas", 5, 2000, ["commute", "performance", "city"]),
  car("Dodge", "Durango", "suv", "gas", 7, 8700, ["family", "towing", "performance"]),
  car("Dodge", "Charger Daytona", "coupe", "electric", 5, 0, ["performance", "commute"]),
  car("Mini", "Cooper", "hatchback", "gas", 4, 0, ["city", "commute", "performance"]),
  car("Mini", "Countryman", "suv", "gas", 5, 1650, ["city", "commute", "family"]),
  car("Fiat", "500e", "hatchback", "electric", 4, 0, ["city", "commute"]),
  car("Polestar", "2", "sedan", "electric", 5, 2000, ["commute", "performance"]),
  car("Polestar", "4", "suv", "electric", 5, 3300, ["luxury", "commute"]),
  car("Polestar", "3", "suv", "electric", 5, 3500, ["luxury", "family", "roadtrip"]),
  car("Rivian", "R1T", "truck", "electric", 5, 11000, ["offroad", "towing", "roadtrip"]),
  car("Rivian", "R1S", "suv", "electric", 7, 7700, ["family", "offroad", "roadtrip"]),
  car("Lucid", "Air", "sedan", "electric", 5, 0, ["luxury", "roadtrip", "performance"]),
  car("Lucid", "Gravity", "suv", "electric", 7, 6000, ["luxury", "family", "roadtrip"]),
  car("Infiniti", "QX50", "suv", "gas", 5, 3000, ["luxury", "commute"]),
  car("Infiniti", "QX60", "suv", "gas", 7, 6000, ["luxury", "family", "roadtrip"]),
  car("Infiniti", "QX80", "suv", "gas", 8, 8500, ["luxury", "family", "towing"]),
  car("Alfa Romeo", "Tonale", "suv", "gas", 5, 2000, ["commute", "city", "luxury"]),
  car("Alfa Romeo", "Giulia", "sedan", "gas", 5, 0, ["performance", "luxury", "commute"]),
  car("Alfa Romeo", "Stelvio", "suv", "gas", 5, 3000, ["performance", "luxury", "commute"]),
  car("Lotus", "Emira", "coupe", "gas", 2, 0, ["performance"]),
  car("Genesis", "G70", "sedan", "gas", 5, 0, ["performance", "luxury", "commute"]),
  car("Genesis", "GV70", "suv", "gas", 5, 3500, ["luxury", "family"]),
  car("Genesis", "GV80", "suv", "gas", 7, 6000, ["luxury", "family", "towing"]),
  car("Volvo", "XC40", "suv", "gas", 5, 3500, ["commute", "city", "luxury"]),
  car("Volvo", "XC60", "suv", "gas", 5, 3500, ["luxury", "family", "commute"]),
  car("Volvo", "XC90", "suv", "gas", 7, 5000, ["family", "luxury", "towing", "roadtrip"]),
  car("Land Rover", "Defender 110", "suv", "gas", 5, 8200, ["offroad", "towing", "luxury"]),
  car("Land Rover", "Range Rover Sport", "suv", "gas", 5, 7700, ["luxury", "offroad", "towing"]),
  car("Land Rover", "Range Rover", "suv", "gas", 5, 8200, ["luxury", "offroad", "towing", "roadtrip"]),
  car("Cadillac", "CT5", "sedan", "gas", 5, 0, ["luxury", "commute", "performance"]),
  car("Cadillac", "Lyriq", "suv", "electric", 5, 3500, ["luxury", "family", "commute"]),
  car("Cadillac", "Escalade", "suv", "gas", 8, 8200, ["luxury", "family", "towing", "roadtrip"]),
  car("Lincoln", "Corsair", "suv", "gas", 5, 3000, ["luxury", "commute"]),
  car("Lincoln", "Aviator", "suv", "gas", 7, 6700, ["luxury", "family", "towing"]),
  car("Lincoln", "Navigator", "suv", "gas", 8, 8700, ["luxury", "family", "towing"]),
  car("Porsche", "Macan Electric", "suv", "electric", 5, 4400, ["performance", "luxury", "commute"]),
  car("Porsche", "Cayenne", "suv", "gas", 5, 7700, ["luxury", "family", "towing", "performance"]),
  car("Porsche", "Taycan", "sedan", "electric", 4, 0, ["performance", "luxury"]),
  car("Porsche", "911 Carrera", "coupe", "gas", 4, 0, ["performance"]),

  // ── Exotic & ultra-luxury brands ─────────────────────────────────────────
  car("Maserati", "Grecale", "suv", "gas", 5, 3500, ["luxury", "performance"]),
  car("Maserati", "GranTurismo", "coupe", "gas", 4, 0, ["performance", "luxury", "roadtrip"]),
  car("Maserati", "MC20", "coupe", "gas", 2, 0, ["performance"]),
  car("Aston Martin", "Vantage", "coupe", "gas", 2, 0, ["performance"]),
  car("Aston Martin", "DB12", "coupe", "gas", 4, 0, ["performance", "luxury", "roadtrip"]),
  car("Aston Martin", "DBX707", "suv", "gas", 5, 0, ["performance", "luxury"]),
  car("Bentley", "Bentayga", "suv", "gas", 5, 7700, ["luxury", "roadtrip", "towing"]),
  car("Bentley", "Continental GT", "coupe", "phev", 4, 0, ["luxury", "performance", "roadtrip"]),
  car("McLaren", "GTS", "coupe", "gas", 2, 0, ["performance", "roadtrip"]),
  car("McLaren", "Artura", "coupe", "phev", 2, 0, ["performance"]),
  car("McLaren", "750S", "coupe", "gas", 2, 0, ["performance"]),
  car("Ferrari", "Roma", "coupe", "gas", 4, 0, ["performance", "roadtrip"]),
  car("Ferrari", "296 GTB", "coupe", "phev", 2, 0, ["performance"]),
  car("Ferrari", "Purosangue", "suv", "gas", 4, 0, ["performance", "luxury", "family"]),
  car("Ferrari", "12Cilindri", "coupe", "gas", 2, 0, ["performance", "roadtrip"]),
  car("Ferrari", "SF90 Stradale", "coupe", "phev", 2, 0, ["performance"]),
  car("Lamborghini", "Urus SE", "suv", "phev", 5, 0, ["performance", "luxury"]),
  car("Lamborghini", "Temerario", "coupe", "phev", 2, 0, ["performance"]),
  car("Lamborghini", "Revuelto", "coupe", "phev", 2, 0, ["performance"]),
  car("Rolls-Royce", "Ghost", "sedan", "gas", 5, 0, ["luxury", "roadtrip"]),
  car("Rolls-Royce", "Cullinan", "suv", "gas", 5, 0, ["luxury", "roadtrip"]),
  car("Rolls-Royce", "Spectre", "coupe", "electric", 4, 0, ["luxury", "roadtrip"]),
  car("Rolls-Royce", "Phantom", "sedan", "gas", 5, 0, ["luxury"]),
  // Bugatti is intentionally omitted: its cheapest model costs several million
  // dollars, far above the $1,000,000 budget cap.
];

/** Every brand in the dataset, A to Z. */
export const BRANDS: string[] = [...new Set(CARS.map((c) => c.make))].sort();
