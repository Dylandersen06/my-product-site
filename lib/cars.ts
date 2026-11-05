// Car dataset for CarMatch AI.
// Prices are approximate 2025 starting MSRPs in USD (base trim, before
// destination fees). Features count as "available" if at least one trim
// offers them. Efficiency and towing figures are approximate manufacturer/EPA
// estimates. Always confirm details with a dealer.

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

/** Features stored directly on a car. `thirdRow` and `towing` are derived. */
type StoredFeature =
  | "awd"
  | "carplay"
  | "adaptiveCruise"
  | "blindSpot"
  | "heatedSeats"
  | "sunroof";

export type Feature = StoredFeature | "thirdRow" | "towing";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  body: BodyStyle;
  fuel: Fuel;
  seats: number;
  price: number;
  efficiency: string;
  towingLbs: number;
  features: StoredFeature[];
  goodFor: Usage[];
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
};

export const TOWING_THRESHOLD_LBS = 3500;

export function hasFeature(car: Car, feature: Feature): boolean {
  if (feature === "thirdRow") return car.seats >= 7;
  if (feature === "towing") return car.towingLbs >= TOWING_THRESHOLD_LBS;
  return car.features.includes(feature);
}

const ALL: StoredFeature[] = [
  "awd",
  "carplay",
  "adaptiveCruise",
  "blindSpot",
  "heatedSeats",
  "sunroof",
];
const ALL_BUT_AWD: StoredFeature[] = ALL.filter((f) => f !== "awd");
/** Teslas and GM EVs don't offer Apple CarPlay / Android Auto. */
const NO_CARPLAY: StoredFeature[] = ALL.filter((f) => f !== "carplay");
/** Driver aids typically available on exotic sports cars (rear-wheel drive). */
const EXOTIC: StoredFeature[] = ["carplay", "adaptiveCruise", "blindSpot"];
const EXOTIC_AWD: StoredFeature[] = ["awd", ...EXOTIC];

function car(
  make: string,
  model: string,
  body: BodyStyle,
  fuel: Fuel,
  seats: number,
  price: number,
  efficiency: string,
  towingLbs: number,
  features: StoredFeature[],
  goodFor: Usage[],
): Car {
  const id = `${make}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return { id, make, model, year: 2025, body, fuel, seats, price, efficiency, towingLbs, features, goodFor };
}

export const CARS: Car[] = [
  // Sedans
  car("Toyota", "Corolla", "sedan", "gas", 5, 22500, "Est. 35 mpg", 0, ALL_BUT_AWD, ["commute", "city"]),
  car("Honda", "Civic", "sedan", "gas", 5, 24500, "Est. 36 mpg", 0, ALL_BUT_AWD, ["commute", "city", "performance"]),
  car("Hyundai", "Elantra", "sedan", "gas", 5, 22000, "Est. 37 mpg", 0, ALL_BUT_AWD, ["commute", "city"]),
  car("Toyota", "Camry", "sedan", "hybrid", 5, 29000, "Est. 51 mpg", 0, ALL, ["commute", "roadtrip", "family"]),
  car("Honda", "Accord", "sedan", "gas", 5, 28500, "Est. 32 mpg", 0, ALL_BUT_AWD, ["commute", "roadtrip", "family"]),
  car("Tesla", "Model 3", "sedan", "electric", 5, 42500, "EV · est. 360 mi range", 0, ["awd", "adaptiveCruise", "blindSpot", "heatedSeats", "sunroof"], ["commute", "roadtrip", "performance"]),
  car("BMW", "3 Series", "sedan", "gas", 5, 45500, "Est. 30 mpg", 0, ALL, ["commute", "roadtrip", "performance", "luxury"]),

  // Hatchbacks & wagons
  car("Toyota", "Prius", "hatchback", "hybrid", 5, 28500, "Est. 57 mpg", 0, ALL, ["commute", "city", "roadtrip"]),
  car("Mazda", "Mazda3 Hatchback", "hatchback", "gas", 5, 25000, "Est. 31 mpg", 0, ALL, ["commute", "city", "performance"]),
  car("Volkswagen", "Golf GTI", "hatchback", "gas", 5, 32500, "Est. 28 mpg", 0, ALL_BUT_AWD, ["performance", "commute", "city"]),
  car("Nissan", "Leaf", "hatchback", "electric", 5, 28500, "EV · est. 149 mi range", 0, ["carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["city", "commute"]),
  car("Subaru", "Outback", "wagon", "gas", 5, 29500, "Est. 28 mpg", 2700, ALL, ["roadtrip", "offroad", "family", "commute"]),

  // Small & midsize SUVs
  car("Chevrolet", "Trax", "suv", "gas", 5, 21500, "Est. 30 mpg", 0, ALL_BUT_AWD, ["city", "commute"]),
  car("Honda", "HR-V", "suv", "gas", 5, 25500, "Est. 28 mpg", 0, ALL, ["city", "commute"]),
  car("Honda", "CR-V", "suv", "gas", 5, 30500, "Est. 30 mpg", 1500, ALL, ["family", "commute", "roadtrip"]),
  car("Toyota", "RAV4 Hybrid", "suv", "hybrid", 5, 33000, "Est. 39 mpg", 1750, ALL, ["family", "commute", "roadtrip"]),
  car("Toyota", "RAV4 Plug-in Hybrid", "suv", "phev", 5, 43500, "PHEV · est. 42 mi electric range", 2500, ALL, ["commute", "family", "roadtrip", "performance"]),
  car("Mazda", "CX-5", "suv", "gas", 5, 29500, "Est. 28 mpg", 2000, ALL, ["commute", "roadtrip", "family"]),
  car("Subaru", "Forester", "suv", "gas", 5, 30000, "Est. 29 mpg", 3000, ALL, ["offroad", "family", "roadtrip"]),
  car("Hyundai", "Tucson", "suv", "gas", 5, 29000, "Est. 28 mpg", 2000, ALL, ["family", "commute"]),
  car("Jeep", "Wrangler", "suv", "gas", 5, 33000, "Est. 20 mpg", 3500, ["awd", "carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["offroad"]),
  car("Ford", "Bronco", "suv", "gas", 5, 40000, "Est. 20 mpg", 3500, ["awd", "carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["offroad", "roadtrip"]),
  car("Toyota", "4Runner", "suv", "gas", 5, 41000, "Est. 22 mpg", 6000, ALL, ["offroad", "towing", "roadtrip"]),

  // Three-row SUVs
  car("Ford", "Explorer", "suv", "gas", 7, 40500, "Est. 24 mpg", 5300, ALL, ["family", "roadtrip", "towing"]),
  car("Honda", "Pilot", "suv", "gas", 8, 41000, "Est. 22 mpg", 5000, ALL, ["family", "roadtrip", "towing"]),
  car("Toyota", "Highlander", "suv", "gas", 8, 40000, "Est. 25 mpg", 5000, ALL, ["family", "roadtrip"]),
  car("Kia", "Telluride", "suv", "gas", 8, 36500, "Est. 21 mpg", 5000, ALL, ["family", "roadtrip", "towing"]),
  car("Chevrolet", "Tahoe", "suv", "gas", 8, 59000, "Est. 17 mpg", 8400, ALL, ["family", "towing", "roadtrip"]),

  // Electric SUVs
  car("Tesla", "Model Y", "suv", "electric", 5, 45000, "EV · est. 320 mi range", 3500, ["awd", "adaptiveCruise", "blindSpot", "heatedSeats", "sunroof"], ["family", "commute", "roadtrip"]),
  car("Hyundai", "Ioniq 5", "suv", "electric", 5, 43000, "EV · est. 245 mi range", 2300, ALL, ["commute", "family", "roadtrip"]),
  car("Chevrolet", "Equinox EV", "suv", "electric", 5, 35000, "EV · est. 319 mi range", 1500, ["awd", "adaptiveCruise", "blindSpot", "heatedSeats", "sunroof"], ["commute", "family", "roadtrip"]),
  car("Ford", "Mustang Mach-E", "suv", "electric", 5, 40000, "EV · est. 260 mi range", 2000, ALL, ["commute", "performance", "roadtrip"]),
  car("Kia", "EV9", "suv", "electric", 7, 55000, "EV · est. 230 mi range", 5000, ALL, ["family", "roadtrip", "towing"]),

  // Minivans
  car("Honda", "Odyssey", "minivan", "gas", 8, 39500, "Est. 22 mpg", 3000, ALL_BUT_AWD, ["family", "roadtrip"]),
  car("Toyota", "Sienna", "minivan", "hybrid", 8, 39500, "Est. 36 mpg", 3500, ALL, ["family", "roadtrip", "commute"]),
  car("Chrysler", "Pacifica Plug-in Hybrid", "minivan", "phev", 7, 51000, "PHEV · est. 32 mi electric range", 0, ALL_BUT_AWD, ["family", "commute", "roadtrip"]),
  car("Kia", "Carnival", "minivan", "gas", 8, 36500, "Est. 22 mpg", 3500, ALL_BUT_AWD, ["family", "roadtrip"]),

  // Pickup trucks
  car("Ford", "Maverick", "truck", "hybrid", 5, 28500, "Est. 37 mpg", 2000, ["awd", "carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["commute", "city", "towing"]),
  car("Toyota", "Tacoma", "truck", "gas", 5, 32500, "Est. 21 mpg", 6500, ALL, ["offroad", "towing", "roadtrip"]),
  car("Ford", "F-150", "truck", "gas", 5, 39500, "Est. 22 mpg", 13500, ALL, ["towing", "offroad", "family"]),
  car("Chevrolet", "Silverado 1500", "truck", "gas", 5, 38000, "Est. 20 mpg", 13300, ALL, ["towing", "offroad", "family"]),

  // Coupes & sports cars
  car("Ford", "Mustang", "coupe", "gas", 4, 33000, "Est. 22 mpg", 0, ["carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["performance"]),
  car("Mazda", "MX-5 Miata", "coupe", "gas", 2, 29500, "Est. 30 mpg", 0, ["carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["performance", "city"]),

  // ── More mainstream brands ───────────────────────────────────────────────
  car("Nissan", "Versa", "sedan", "gas", 5, 18000, "Est. 35 mpg", 0, ["carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["commute", "city"]),
  car("Nissan", "Rogue", "suv", "gas", 5, 29500, "Est. 33 mpg", 1500, ALL, ["family", "commute", "roadtrip"]),
  car("Mitsubishi", "Mirage", "hatchback", "gas", 5, 17500, "Est. 39 mpg", 0, ["carplay"], ["city", "commute"]),
  car("Mitsubishi", "Eclipse Cross", "suv", "gas", 5, 27500, "Est. 26 mpg", 1500, ALL, ["city", "commute"]),
  car("Mitsubishi", "Outlander", "suv", "gas", 7, 29500, "Est. 26 mpg", 2000, ALL, ["family", "commute", "roadtrip"]),
  car("Mitsubishi", "Outlander PHEV", "suv", "phev", 7, 41000, "PHEV · est. 38 mi electric range", 1500, ALL, ["family", "commute"]),
  car("Kia", "K4", "sedan", "gas", 5, 22500, "Est. 34 mpg", 0, ALL_BUT_AWD, ["commute", "city"]),
  car("Kia", "Sportage", "suv", "gas", 5, 28500, "Est. 28 mpg", 2500, ALL, ["family", "commute"]),
  car("Hyundai", "Venue", "suv", "gas", 5, 20500, "Est. 31 mpg", 0, ["carplay", "blindSpot", "heatedSeats", "sunroof"], ["city", "commute"]),
  car("Hyundai", "Santa Fe", "suv", "gas", 7, 34500, "Est. 25 mpg", 3500, ALL, ["family", "roadtrip", "towing"]),
  car("Hyundai", "Palisade", "suv", "gas", 8, 39000, "Est. 22 mpg", 5000, ALL, ["family", "roadtrip", "towing"]),
  car("Mazda", "CX-50", "suv", "gas", 5, 31000, "Est. 27 mpg", 3500, ALL, ["offroad", "roadtrip", "commute"]),
  car("Mazda", "CX-90", "suv", "gas", 8, 38500, "Est. 25 mpg", 5000, ALL, ["family", "roadtrip", "luxury"]),
  car("Subaru", "Crosstrek", "suv", "gas", 5, 26500, "Est. 29 mpg", 1500, ALL, ["commute", "offroad", "city"]),
  car("Subaru", "Ascent", "suv", "gas", 8, 39000, "Est. 22 mpg", 5000, ALL, ["family", "roadtrip", "towing"]),
  car("Subaru", "WRX", "sedan", "gas", 5, 33500, "Est. 22 mpg", 0, ALL, ["performance"]),
  car("Volkswagen", "Jetta", "sedan", "gas", 5, 22500, "Est. 35 mpg", 0, ALL_BUT_AWD, ["commute", "city"]),
  car("Volkswagen", "Tiguan", "suv", "gas", 5, 30000, "Est. 28 mpg", 1500, ALL, ["family", "commute"]),
  car("Volkswagen", "Atlas", "suv", "gas", 7, 39000, "Est. 23 mpg", 5000, ALL, ["family", "roadtrip", "towing"]),
  car("Volkswagen", "ID.4", "suv", "electric", 5, 40000, "EV · est. 290 mi range", 2700, ALL, ["commute", "family"]),
  car("Jeep", "Compass", "suv", "gas", 5, 27500, "Est. 27 mpg", 2000, ALL, ["commute", "city", "offroad"]),
  car("Jeep", "Grand Cherokee", "suv", "gas", 5, 37500, "Est. 23 mpg", 6200, ALL, ["offroad", "family", "towing", "roadtrip"]),
  car("Jeep", "Gladiator", "truck", "gas", 5, 39000, "Est. 19 mpg", 7700, ["awd", "carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["offroad", "towing"]),
  car("Ram", "1500", "truck", "gas", 5, 41500, "Est. 20 mpg", 11500, ALL, ["towing", "family", "offroad"]),
  car("Ram", "2500", "truck", "gas", 5, 48000, "Heavy duty · not EPA-rated", 16000, ALL, ["towing", "offroad"]),
  car("GMC", "Terrain", "suv", "gas", 5, 33500, "Est. 26 mpg", 1500, ALL, ["commute", "family"]),
  car("GMC", "Sierra 1500", "truck", "gas", 5, 40000, "Est. 20 mpg", 13200, ALL, ["towing", "family", "offroad"]),
  car("GMC", "Yukon", "suv", "gas", 8, 62000, "Est. 17 mpg", 8400, ALL, ["family", "towing", "roadtrip", "luxury"]),
  car("Buick", "Envista", "suv", "gas", 5, 24000, "Est. 30 mpg", 0, ALL_BUT_AWD, ["city", "commute"]),
  car("Buick", "Encore GX", "suv", "gas", 5, 26500, "Est. 30 mpg", 0, ALL, ["city", "commute"]),
  car("Buick", "Enclave", "suv", "gas", 7, 46000, "Est. 22 mpg", 5000, ALL, ["family", "roadtrip", "luxury"]),
  car("Chrysler", "Pacifica", "minivan", "gas", 8, 41500, "Est. 22 mpg", 3600, ALL, ["family", "roadtrip"]),
  car("Chrysler", "Voyager", "minivan", "gas", 7, 40500, "Est. 22 mpg", 3600, ALL_BUT_AWD, ["family"]),

  // ── Luxury brands ────────────────────────────────────────────────────────
  car("Tesla", "Model S", "sedan", "electric", 5, 80000, "EV · est. 400 mi range", 0, NO_CARPLAY, ["performance", "roadtrip", "luxury"]),
  car("Tesla", "Model X", "suv", "electric", 7, 85000, "EV · est. 330 mi range", 5000, NO_CARPLAY, ["family", "roadtrip", "luxury", "towing"]),
  car("Tesla", "Cybertruck", "truck", "electric", 5, 80000, "EV · est. 325 mi range", 11000, NO_CARPLAY, ["towing", "offroad"]),
  car("BMW", "X3", "suv", "gas", 5, 50000, "Est. 28 mpg", 5000, ALL, ["luxury", "family", "commute"]),
  car("BMW", "i4", "sedan", "electric", 5, 57500, "EV · est. 300 mi range", 0, ALL, ["commute", "performance", "luxury"]),
  car("BMW", "X5", "suv", "gas", 5, 67500, "Est. 24 mpg", 7200, ALL, ["luxury", "family", "towing", "roadtrip"]),
  car("BMW", "M3", "sedan", "gas", 5, 77000, "Est. 19 mpg", 0, ALL, ["performance"]),
  car("Mercedes-Benz", "C-Class", "sedan", "gas", 5, 48000, "Est. 30 mpg", 0, ALL, ["luxury", "commute"]),
  car("Mercedes-Benz", "GLC", "suv", "gas", 5, 49500, "Est. 26 mpg", 3500, ALL, ["luxury", "family"]),
  car("Mercedes-Benz", "E-Class", "sedan", "gas", 5, 62500, "Est. 27 mpg", 0, ALL, ["luxury", "roadtrip"]),
  car("Mercedes-Benz", "S-Class", "sedan", "gas", 5, 118500, "Est. 24 mpg", 0, ALL, ["luxury", "roadtrip"]),
  car("Mercedes-Benz", "G-Class", "suv", "gas", 5, 148000, "Est. 15 mpg", 7000, ALL, ["luxury", "offroad", "towing"]),
  car("Audi", "A3", "sedan", "gas", 5, 39000, "Est. 31 mpg", 0, ALL, ["commute", "luxury"]),
  car("Audi", "Q5", "suv", "gas", 5, 47000, "Est. 25 mpg", 4400, ALL, ["luxury", "family"]),
  car("Audi", "Q7", "suv", "gas", 7, 61000, "Est. 21 mpg", 7700, ALL, ["family", "luxury", "towing"]),
  car("Audi", "S e-tron GT", "sedan", "electric", 5, 126000, "EV · est. 300 mi range", 0, ALL, ["performance", "luxury"]),
  car("Lexus", "ES", "sedan", "hybrid", 5, 44500, "Est. 44 mpg", 0, ALL, ["luxury", "commute", "roadtrip"]),
  car("Lexus", "NX", "suv", "hybrid", 5, 46000, "Est. 39 mpg", 2000, ALL, ["luxury", "commute"]),
  car("Lexus", "RX", "suv", "gas", 5, 50000, "Est. 24 mpg", 3500, ALL, ["luxury", "family"]),
  car("Lexus", "LX", "suv", "gas", 7, 105000, "Est. 19 mpg", 8000, ALL, ["luxury", "offroad", "towing", "family"]),
  car("Genesis", "G70", "sedan", "gas", 5, 42000, "Est. 25 mpg", 0, ALL, ["performance", "luxury", "commute"]),
  car("Genesis", "GV70", "suv", "gas", 5, 46500, "Est. 24 mpg", 3500, ALL, ["luxury", "family"]),
  car("Genesis", "GV80", "suv", "gas", 7, 58000, "Est. 21 mpg", 6000, ALL, ["luxury", "family", "towing"]),
  car("Volvo", "XC40", "suv", "gas", 5, 40000, "Est. 26 mpg", 3500, ALL, ["commute", "city", "luxury"]),
  car("Volvo", "XC60", "suv", "gas", 5, 47000, "Est. 25 mpg", 3500, ALL, ["luxury", "family", "commute"]),
  car("Volvo", "XC90", "suv", "gas", 7, 58500, "Est. 22 mpg", 5000, ALL, ["family", "luxury", "towing", "roadtrip"]),
  car("Land Rover", "Defender 110", "suv", "gas", 5, 58000, "Est. 18 mpg", 8200, ALL, ["offroad", "towing", "luxury"]),
  car("Land Rover", "Range Rover Sport", "suv", "gas", 5, 85000, "Est. 21 mpg", 7700, ALL, ["luxury", "offroad", "towing"]),
  car("Land Rover", "Range Rover", "suv", "gas", 5, 110000, "Est. 20 mpg", 8200, ALL, ["luxury", "offroad", "towing", "roadtrip"]),
  car("Cadillac", "CT5", "sedan", "gas", 5, 50000, "Est. 26 mpg", 0, ALL, ["luxury", "commute", "performance"]),
  car("Cadillac", "Lyriq", "suv", "electric", 5, 59000, "EV · est. 310 mi range", 3500, NO_CARPLAY, ["luxury", "family", "commute"]),
  car("Cadillac", "Escalade", "suv", "gas", 8, 87000, "Est. 16 mpg", 8200, ALL, ["luxury", "family", "towing", "roadtrip"]),
  car("Lincoln", "Corsair", "suv", "gas", 5, 40000, "Est. 25 mpg", 3000, ALL, ["luxury", "commute"]),
  car("Lincoln", "Aviator", "suv", "gas", 7, 56000, "Est. 21 mpg", 6700, ALL, ["luxury", "family", "towing"]),
  car("Lincoln", "Navigator", "suv", "gas", 8, 98000, "Est. 18 mpg", 8700, ALL, ["luxury", "family", "towing"]),
  car("Porsche", "Macan Electric", "suv", "electric", 5, 76000, "EV · est. 300 mi range", 4400, ALL, ["performance", "luxury", "commute"]),
  car("Porsche", "Cayenne", "suv", "gas", 5, 85000, "Est. 19 mpg", 7700, ALL, ["luxury", "family", "towing", "performance"]),
  car("Porsche", "Taycan", "sedan", "electric", 4, 100000, "EV · est. 300 mi range", 0, ALL, ["performance", "luxury"]),
  car("Porsche", "911 Carrera", "coupe", "gas", 4, 122000, "Est. 20 mpg", 0, ALL, ["performance"]),

  // ── Exotic & ultra-luxury brands ─────────────────────────────────────────
  car("Maserati", "Grecale", "suv", "gas", 5, 70000, "Est. 22 mpg", 3500, ALL, ["luxury", "performance"]),
  car("Maserati", "GranTurismo", "coupe", "gas", 4, 175000, "Est. 18 mpg", 0, ["awd", "carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["performance", "luxury", "roadtrip"]),
  car("Maserati", "MC20", "coupe", "gas", 2, 240000, "Est. 18 mpg", 0, EXOTIC, ["performance"]),
  car("Aston Martin", "Vantage", "coupe", "gas", 2, 195000, "Est. 18 mpg", 0, [...EXOTIC, "heatedSeats"], ["performance"]),
  car("Aston Martin", "DB12", "coupe", "gas", 4, 250000, "Est. 18 mpg", 0, [...EXOTIC, "heatedSeats"], ["performance", "luxury", "roadtrip"]),
  car("Aston Martin", "DBX707", "suv", "gas", 5, 250000, "Est. 15 mpg", 0, [...EXOTIC_AWD, "heatedSeats", "sunroof"], ["performance", "luxury"]),
  car("Bentley", "Bentayga", "suv", "gas", 5, 205000, "Est. 18 mpg", 7700, ALL, ["luxury", "roadtrip", "towing"]),
  car("Bentley", "Continental GT", "coupe", "phev", 4, 300000, "PHEV · est. 40 mi electric range", 0, ["awd", "carplay", "adaptiveCruise", "blindSpot", "heatedSeats"], ["luxury", "performance", "roadtrip"]),
  car("McLaren", "GTS", "coupe", "gas", 2, 210000, "Est. 18 mpg", 0, EXOTIC, ["performance", "roadtrip"]),
  car("McLaren", "Artura", "coupe", "phev", 2, 250000, "PHEV · est. 11 mi electric range", 0, EXOTIC, ["performance"]),
  car("McLaren", "750S", "coupe", "gas", 2, 332000, "Est. 17 mpg", 0, EXOTIC, ["performance"]),
  car("Ferrari", "Roma", "coupe", "gas", 4, 250000, "Est. 18 mpg", 0, EXOTIC, ["performance", "roadtrip"]),
  car("Ferrari", "296 GTB", "coupe", "phev", 2, 342000, "PHEV · est. 15 mi electric range", 0, EXOTIC, ["performance"]),
  car("Ferrari", "Purosangue", "suv", "gas", 4, 400000, "Est. 12 mpg", 0, EXOTIC_AWD, ["performance", "luxury", "family"]),
  car("Ferrari", "12Cilindri", "coupe", "gas", 2, 423000, "Est. 12 mpg", 0, EXOTIC, ["performance", "roadtrip"]),
  car("Ferrari", "SF90 Stradale", "coupe", "phev", 2, 530000, "PHEV · est. 15 mi electric range", 0, EXOTIC_AWD, ["performance"]),
  car("Lamborghini", "Urus SE", "suv", "phev", 5, 258000, "PHEV · est. 37 mi electric range", 0, [...EXOTIC_AWD, "heatedSeats", "sunroof"], ["performance", "luxury"]),
  car("Lamborghini", "Temerario", "coupe", "phev", 2, 350000, "PHEV · short electric range", 0, EXOTIC_AWD, ["performance"]),
  car("Lamborghini", "Revuelto", "coupe", "phev", 2, 608000, "PHEV · short electric range", 0, EXOTIC_AWD, ["performance"]),
  car("Rolls-Royce", "Ghost", "sedan", "gas", 5, 350000, "Est. 14 mpg", 0, ALL, ["luxury", "roadtrip"]),
  car("Rolls-Royce", "Cullinan", "suv", "gas", 5, 400000, "Est. 14 mpg", 0, ALL, ["luxury", "roadtrip"]),
  car("Rolls-Royce", "Spectre", "coupe", "electric", 4, 420000, "EV · est. 260 mi range", 0, ALL, ["luxury", "roadtrip"]),
  car("Rolls-Royce", "Phantom", "sedan", "gas", 5, 475000, "Est. 14 mpg", 0, ALL_BUT_AWD, ["luxury"]),
  // Bugatti is intentionally omitted: its cheapest model costs several million
  // dollars, far above the $1,000,000 budget cap.
];
