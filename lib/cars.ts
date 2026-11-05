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
  | "performance";

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
  car("BMW", "3 Series", "sedan", "gas", 5, 45500, "Est. 30 mpg", 0, ALL, ["commute", "roadtrip", "performance"]),

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
];
