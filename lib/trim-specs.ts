// Extra specs for every trim in lib/trims.ts, used by Advanced Search.
//
// Approximate 2025 US figures for planning, written from general knowledge:
// 0-60 mph times are typical published or tested values, and cargo is cubic feet
// behind the rearmost seats (or bed volume for pickups). Confirm with a dealer.
//
// Row: [0-60 per trim, transmission (one for all, or per trim), cargo, camera, towing]
//   camera: index of the first trim offering a 360-degree camera (it and every
//           pricier trim have it), or null if none do
//   towing: optional lb per trim, when it varies by engine. Otherwise each trim
//           uses the model's towing figure from lib/cars.ts.
// lib/cars.ts refuses to build if a row doesn't line up with the model's trims.

const A6 = "6-speed automatic";
const A8 = "8-speed automatic";
const A9 = "9-speed automatic";
const A10 = "10-speed automatic";
const CVT = "CVT";
const EV = "Single-speed";
const EV2 = "2-speed automatic";
const D7 = "7-speed dual-clutch";
const D8 = "8-speed dual-clutch";
const M6 = "6-speed manual";
const M6A8 = "6-speed manual or 8-speed automatic";
const M6A10 = "6-speed manual or 10-speed automatic";
const M6A6 = "6-speed manual or 6-speed automatic";
const M6A9 = "6-speed manual or 9-speed automatic";

export type SpecRow = [number[], string | string[], number, number | null, number[]?];

export const TRIM_SPECS: Record<string, SpecRow> = {
  // Sedans
  "toyota-corolla": [[8.6, 8.6, 8.6], CVT, 13, null],
  "honda-civic": [[8.0, 8.0, 6.8], [CVT, CVT, M6], 14.8, null],
  "hyundai-elantra": [[8.3, 8.3, 8.3, 6.6], [CVT, CVT, CVT, D7], 14.2, null],
  "toyota-camry": [[7.0, 7.0, 7.0, 7.0], CVT, 15.1, 2],
  "honda-accord": [[7.4, 7.4], CVT, 16.7, null],
  "tesla-model-3": [[4.9, 4.2, 2.9], EV, 24, null],
  "bmw-3-series": [[5.6, 5.5, 4.1], A8, 17, 0],

  // Hatchbacks & wagons
  "toyota-prius": [[7.2, 7.2, 7.2], CVT, 23.8, 2],
  "mazda-mazda3-hatchback": [[7.5, 7.5, 5.6], A6, 20.1, 2],
  "volkswagen-golf-gti": [[5.9, 5.9, 5.9], D7, 17.4, null],
  "nissan-leaf": [[7.4, 6.7], EV, 23.6, 1],
  "subaru-outback": [[8.7, 8.7, 8.7, 6.1], CVT, 32.6, null],

  // Small & midsize SUVs
  "chevrolet-trax": [[9.0, 9.0, 9.0], A6, 25.6, null],
  "honda-hr-v": [[9.4, 9.4, 9.4], CVT, 24.4, null],
  "honda-cr-v": [[7.9, 7.9, 7.9], CVT, 39.3, null],
  "toyota-rav4-hybrid": [[7.4, 7.4, 7.4, 7.4], CVT, 37.5, 3],
  "toyota-rav4-plug-in-hybrid": [[5.7, 5.7], CVT, 33.5, 1],
  "mazda-cx-5": [[8.4, 8.4, 8.4, 6.2], A6, 30.8, 3],
  "subaru-forester": [[8.7, 8.7, 8.7, 8.7], CVT, 29.6, null],
  "hyundai-tucson": [[8.9, 8.9, 8.9, 8.9], A8, 38.7, 3],
  "jeep-wrangler": [[6.9, 6.9, 7.2], M6A8, 31.7, null],
  "ford-bronco": [[6.9, 6.9, 7.0], "7-speed manual or 10-speed automatic", 35.6, 1],
  "toyota-4runner": [[7.0, 7.0, 7.2], A8, 42.6, 2],

  // Three-row SUVs
  "ford-explorer": [[6.9, 6.9, 6.9, 5.2], A10, 18.2, 1],
  "honda-pilot": [[7.0, 7.0, 7.2, 7.0], A10, 18.6, 2],
  "toyota-highlander": [[7.5, 7.5, 7.5, 7.5], A8, 16, 3],
  "kia-telluride": [[7.1, 7.1, 7.1, 7.1], A8, 21, 3],
  "chevrolet-tahoe": [[7.4, 7.6, 7.4, 6.2], A10, 25.5, 2],

  // Electric SUVs
  "tesla-model-y": [[5.4, 4.6, 3.3], EV, 34.3, null],
  "hyundai-ioniq-5": [[7.4, 5.0, 5.0, 5.0], EV, 27.2, 3],
  "chevrolet-equinox-ev": [[7.5, 6.8], EV, 22.7, 1],
  "ford-mustang-mach-e": [[5.8, 5.6, 3.6], EV, 29.7, 1],
  "kia-ev9": [[8.8, 5.0, 4.5], EV, 20.2, 1],

  // Minivans
  "honda-odyssey": [[7.3, 7.3, 7.3, 7.3], A10, 32.8, null],
  "toyota-sienna": [[7.6, 7.6, 7.6, 7.6], CVT, 33.5, 3],
  "chrysler-pacifica-plug-in-hybrid": [[7.3, 7.3], CVT, 32.3, 1],
  "kia-carnival": [[7.4, 7.4, 7.4, 7.4], A8, 40.2, 3],

  // Pickup trucks (cargo is bed volume)
  "ford-maverick": [[7.7, 7.7, 7.7], CVT, 33.3, null],
  "toyota-tacoma": [[8.0, 7.0, 7.2, 7.2], [A8, M6A8, M6A8, A8], 38, 3],
  "ford-f-150": [[6.3, 6.3, 5.5, 5.5], A10, 52.8, 1, [10100, 10100, 13500, 13500]],
  "chevrolet-silverado-1500": [[7.0, 6.9, 7.2, 6.9], [A8, A10, A10, A10], 62.9, 3, [9500, 13300, 13300, 13300]],

  // Coupes & sports cars
  "ford-mustang": [[5.0, 4.2, 4.1], [A10, M6A10, M6A10], 13.5, null],
  "mazda-mx-5-miata": [[5.7, 5.7, 5.8], [M6, M6, "6-speed manual or 6-speed automatic"], 4.6, null],

  // More mainstream brands
  "nissan-versa": [[9.7, 9.7, 9.7], ["5-speed manual or CVT", CVT, CVT], 15, null],
  "nissan-rogue": [[7.5, 7.5, 7.5, 7.5], CVT, 31.6, 2],
  "mitsubishi-mirage": [[11.5, 11.5, 11.5], CVT, 17.1, null],
  "mitsubishi-eclipse-cross": [[9.3, 9.3, 9.3], CVT, 22.6, 2],
  "mitsubishi-outlander": [[8.5, 8.5, 8.5], CVT, 11.7, 1],
  "mitsubishi-outlander-phev": [[6.2, 6.2], EV, 11.7, 1],
  "kia-k4": [[8.9, 8.9, 8.9, 7.3], [CVT, CVT, CVT, A8], 17, null],
  "kia-sportage": [[8.2, 8.2, 8.2, 8.4], A8, 39.6, 3],
  "hyundai-venue": [[9.4, 9.4, 9.4], CVT, 18.7, null],
  "hyundai-santa-fe": [[8.9, 8.9, 6.7, 6.7], [A8, A8, D8, D8], 14.6, 3],
  "hyundai-palisade": [[7.4, 7.4, 7.4, 7.4], A8, 18, 3],
  "mazda-cx-50": [[8.5, 8.5, 6.2], A6, 31.1, 1],
  "mazda-cx-90": [[7.2, 7.2, 7.2, 6.0], A8, 15.9, 2],
  "subaru-crosstrek": [[9.7, 9.7, 8.4, 8.4], CVT, 19.9, null],
  "subaru-ascent": [[7.3, 7.3, 7.3], CVT, 17.6, null],
  "subaru-wrx": [[5.5, 5.5, 5.5, 5.5], [M6, "6-speed manual or CVT", "6-speed manual or CVT", M6], 12.5, null],
  "volkswagen-jetta": [[8.2, 8.2, 8.2, 8.2], [M6A8, M6A8, A8, A8], 14.1, null],
  "volkswagen-tiguan": [[8.5, 8.5, 7.9], A8, 33, 2],
  "volkswagen-atlas": [[7.5, 7.5, 7.5], A8, 20.6, 2],
  "volkswagen-id-4": [[7.5, 6.7, 5.4], EV, 30.3, 2],
  "jeep-compass": [[8.0, 8.0, 8.0], A8, 27, null],
  "jeep-grand-cherokee": [[7.4, 7.4, 7.4, 7.4], A8, 37.7, 2],
  "jeep-gladiator": [[7.7, 8.0, 8.0], M6A8, 35, null],
  "ram-1500": [[7.1, 7.1, 5.5, 4.6], A8, 61.5, 2],
  "ram-2500": [[7.5, 7.5, 7.5], A8, 74.7, 2],
  "gmc-terrain": [[9.2, 9.2, 9.2], A8, 29.8, 2],
  "gmc-sierra-1500": [[7.0, 6.9, 5.6, 5.6], [A8, A10, A10, A10], 62.9, 2, [9500, 11300, 13200, 13200]],
  "gmc-yukon": [[7.4, 7.4, 6.0, 6.0], A10, 25.5, 1],
  "buick-envista": [[9.2, 9.2, 9.2], A6, 20.7, null],
  "buick-encore-gx": [[9.4, 8.8, 8.8], "CVT or 9-speed automatic", 23.5, null],
  "buick-enclave": [[7.0, 7.0, 7.0], A8, 23.6, 2],
  "chrysler-pacifica": [[7.4, 7.4, 7.4], A9, 32.3, 1],
  "chrysler-voyager": [[7.4, 7.4], A9, 32.3, null],

  // Luxury brands
  "tesla-model-s": [[3.1, 2.0], EV, 28, null],
  "tesla-model-x": [[3.8, 2.5], EV, 12.7, null],
  "tesla-cybertruck": [[4.1, 2.6], EV, 67, null],
  "bmw-x3": [[6.0, 4.4], A8, 31.7, 0],
  "bmw-i4": [[5.7, 5.5, 3.7], EV, 16.6, 0],
  "bmw-x5": [[5.3, 5.3, 4.2], A8, 33.9, 0],
  "bmw-m3": [[4.1, 3.8, 3.4], [M6, A8, A8], 13, 0],
  "mercedes-benz-c-class": [[5.9, 5.9, 4.6], A9, 12.6, 0],
  "mercedes-benz-glc": [[6.2, 6.2, 4.6], A9, 19.4, 0],
  "mercedes-benz-e-class": [[6.2, 6.2, 4.5], A9, 19, 0],
  "mercedes-benz-s-class": [[4.9, 4.4, 4.5], A9, 12.9, 0],
  "mercedes-benz-gls": [[5.8, 4.6, 4.1], A9, 17.4, 0],
  "mercedes-benz-g-class": [[5.6, 4.2], A9, 38.1, 0],
  "audi-a3": [[6.8, 6.8, 4.5], D7, 10.9, null],
  "audi-q5": [[6.0, 6.0, 6.0, 4.4], [D7, D7, D7, A8], 25.8, 2],
  "audi-q7": [[6.9, 6.9, 5.7], A8, 14.2, 1],
  "audi-s-e-tron-gt": [[3.4, 3.4, 2.4], EV2, 12.3, 1],
  "lexus-es": [[7.7, 7.7, 7.7], CVT, 13.9, 2],
  "lexus-nx": [[7.2, 7.2, 7.2], CVT, 22.7, 2],
  "lexus-rx": [[7.2, 7.2, 7.2], A8, 29.6, 2],
  "lexus-lx": [[6.9, 6.9, 6.9], A10, 11.4, 0],
  "dodge-hornet": [[6.5, 6.5], A9, 27.6, null],
  "dodge-durango": [[7.0, 6.0, 4.5], A8, 17.2, 1, [6200, 8700, 8700]],
  "dodge-charger-daytona": [[4.7, 3.3], EV, 22.6, null],
  "mini-cooper": [[7.5, 6.4, 5.9], D7, 8.7, null],
  "mini-countryman": [[6.2, 5.2], D7, 25.3, null],
  "fiat-500e": [[8.5, 8.5], EV, 7.5, null],
  "polestar-2": [[5.9, 4.3, 4.0], EV, 14.3, 1],
  "polestar-4": [[7.1, 3.7], EV, 18.6, 0],
  "polestar-3": [[7.5, 4.8, 4.5], EV, 17.1, 0],
  "rivian-r1t": [[4.5, 3.6, 2.9], EV, 29, 0, [7700, 11000, 11000]],
  "rivian-r1s": [[4.6, 3.6, 2.9], EV, 17.6, 0],
  "lucid-air": [[4.5, 3.4, 3.0], EV, 22.1, 1],
  "lucid-gravity": [[3.4], EV, 20, 0],
  "infiniti-qx50": [[6.3, 6.3], CVT, 31.4, 0],
  "infiniti-qx60": [[7.0, 7.0, 7.0], A9, 14.5, 1],
  "infiniti-qx80": [[6.0, 6.0, 6.0], A9, 22, 0],
  "alfa-romeo-tonale": [[6.4, 6.4], A9, 22.9, null],
  "alfa-romeo-giulia": [[5.5, 5.1, 3.8], A8, 13.4, null],
  "alfa-romeo-stelvio": [[5.4, 5.4, 3.6], A8, 18.5, null],
  "lotus-emira": [[4.0, 4.2], [D8, "6-speed manual or 8-speed automatic"], 7, null],
  "acura-integra": [[7.4, 7.4, 7.2, 5.1], [CVT, CVT, "CVT or 6-speed manual", M6], 24.3, null],
  "acura-rdx": [[6.6, 6.6, 6.6, 6.6], A10, 29.5, 3],
  "acura-mdx": [[6.8, 6.8, 6.7, 6.7, 5.5], A10, 16.3, 3],
  "genesis-g70": [[5.8, 5.8, 4.5], A8, 10.5, 1],
  "genesis-gv70": [[6.0, 6.0, 5.1], A8, 28.9, 1],
  "genesis-gv80": [[6.4, 5.4, 5.4], A8, 11.6, 1],
  "volvo-xc40": [[6.3, 6.3, 6.3], A8, 20.7, 2],
  "volvo-xc60": [[6.5, 6.5, 6.5], A8, 22.4, 2],
  "volvo-xc90": [[7.4, 7.4, 6.6], A8, 12.6, 2],
  "land-rover-defender-110": [[7.7, 5.8, 5.8], A8, 34, 0],
  "land-rover-range-rover-sport": [[5.7, 5.4, 4.3], A8, 31.8, 0],
  "land-rover-range-rover": [[5.7, 4.4, 4.2], A8, 40.6, 0],
  "cadillac-ct5": [[6.2, 6.2, 4.8], A10, 11.9, 1],
  "cadillac-lyriq": [[5.7, 5.7, 4.7], EV, 28, 1],
  "cadillac-escalade": [[6.0, 6.0, 6.0, 6.0], A10, 25.5, 1],
  "lincoln-corsair": [[7.0, 7.0], A8, 27.6, 1],
  "lincoln-aviator": [[5.6, 5.6, 5.6], A10, 18.3, 1],
  "lincoln-navigator": [[6.0, 6.0, 6.0], A10, 20.9, 0],
  "porsche-macan-electric": [[5.7, 4.9, 3.1], EV, 19, 0],
  "porsche-cayenne": [[5.7, 4.4, 4.2], A8, 27, 0],
  "porsche-taycan": [[4.8, 3.5, 2.5], EV2, 14.3, 0],
  "porsche-911-carrera": [[3.9, 3.3, 3.2], D8, 4.7, 0],

  // Exotic & ultra-luxury brands
  "maserati-grecale": [[5.3, 5.0, 3.6], A8, 20, 0],
  "maserati-granturismo": [[3.8, 3.4], A8, 9.2, 0],
  "maserati-mc20": [[2.9, 3.0], D8, 5.4, null],
  "aston-martin-vantage": [[3.4, 3.6], A8, 12.9, 0],
  "aston-martin-db12": [[3.5, 3.6], A8, 9.2, 0],
  "aston-martin-dbx707": [[3.1], A9, 22.3, 0],
  "bentley-bentayga": [[4.4, 4.4, 4.0], A8, 17, 0],
  "bentley-continental-gt": [[3.6, 3.1, 3.1], D8, 9.2, 0],
  "mclaren-gts": [[3.1], D7, 20.1, null],
  "mclaren-artura": [[3.0, 3.0], D8, 5.4, null],
  "mclaren-750s": [[2.7, 2.7], D7, 5.4, null],
  "ferrari-roma": [[3.4, 3.4], D8, 9.6, null],
  "ferrari-296-gtb": [[2.9, 2.9], D8, 2.6, null],
  "ferrari-purosangue": [[3.3], D8, 16.7, null],
  "ferrari-12cilindri": [[2.9, 3.0], D8, 7.4, null],
  "ferrari-sf90-stradale": [[2.5, 2.5], D8, 2.6, null],
  "lamborghini-urus-se": [[3.4], A8, 21.7, 0],
  "lamborghini-temerario": [[2.7], D8, 3.5, null],
  "lamborghini-revuelto": [[2.5], D8, 1.4, null],
  "rolls-royce-ghost": [[4.6, 4.8, 4.5], A8, 17.9, 0],
  "rolls-royce-cullinan": [[4.9, 4.9], A8, 21.2, 0],
  "rolls-royce-spectre": [[4.4, 4.1], EV, 8.6, 0],
  "rolls-royce-phantom": [[5.1, 5.3], A8, 19, 0],
  // Full lineups: Japanese mainstream brands
  "toyota-corolla-hatchback": [[8.2, 8.2, 8.2], CVT, 17.8, null],
  "toyota-corolla-cross": [[9.5, 9.5, 7.5, 9.5], CVT, 24.9, null],
  "toyota-crown": [[7.6, 7.6, 5.7], [CVT, CVT, A6], 15.2, 1],
  "toyota-crown-signia": [[7.3, 7.3], CVT, 25.8, 0],
  "toyota-bz4x": [[7.1, 6.5, 6.5], EV, 27.7, 2],
  "toyota-grand-highlander": [[7.6, 8.5, 7.6, 6.3], [A8, CVT, A8, A6], 20.6, 2, [5000, 3500, 5000, 5000]],
  "toyota-sequoia": [[6.1, 6.1, 6.1, 6.1], A10, 11.5, 1],
  "toyota-tundra": [[6.5, 6.1, 6.1, 5.7], A10, 62.9, 1, [8300, 12000, 11200, 11175]],
  "toyota-land-cruiser": [[7.5, 7.5, 7.5], A8, 37.5, 1],
  "toyota-gr86": [[6.1, 6.1], M6A6, 6.3, null],
  "toyota-gr-supra": [[3.9, 3.9], M6A8, 10.2, null],
  "toyota-gr-corolla": [[5.0, 5.0], M6A8, 17.8, null],
  "toyota-mirai": [[9.1, 9.1], EV, 9.6, 1],
  "honda-passport": [[6.4, 6.4, 6.4], A9, 41.2, null],
  "honda-ridgeline": [[6.5, 6.5, 6.5, 6.5], A9, 33.9, null],
  "honda-prologue": [[7.3, 7.3, 6.3], EV, 25.2, null],
  "honda-civic-type-r": [[5.0], M6, 24.5, null],
  "nissan-sentra": [[8.7, 8.7, 8.7], CVT, 14.3, 2],
  "nissan-altima": [[7.8, 7.8, 7.8, 7.8], CVT, 15.4, null],
  "nissan-kicks": [[8.9, 8.9, 8.9], CVT, 30, 2],
  "nissan-murano": [[7.2, 7.2, 7.2], A9, 37.4, 1],
  "nissan-pathfinder": [[6.8, 6.8, 6.8, 6.8], A9, 16.6, 2, [3500, 3500, 6000, 6000]],
  "nissan-armada": [[5.9, 5.9, 5.9, 5.9], A9, 20.2, 1],
  "nissan-frontier": [[6.6, 6.6, 6.6], A9, 33.5, 2],
  "nissan-ariya": [[7.5, 7.5, 5.0], EV, 22.8, 2],
  "nissan-z": [[4.5, 4.3, 4.1], [M6A9, M6A9, A9], 6.9, null],
  "mazda-mazda3-sedan": [[7.6, 7.6, 5.6], A6, 13.2, 2],
  "mazda-cx-30": [[8.2, 8.2, 6.4], A6, 20.2, 2],
  "mazda-cx-70": [[6.5, 6.2, 5.9], A8, 39.6, 1, [5000, 3500, 5000]],
  "subaru-impreza": [[9.5, 9.5, 7.6], CVT, 20.4, null],
  "subaru-legacy": [[8.6, 8.6, 6.0, 8.6], CVT, 15.1, null],
  "subaru-brz": [[6.1, 6.1, 6.1], [M6A6, M6A6, M6], 6.3, null],
  "subaru-solterra": [[6.5, 6.5, 6.5], EV, 23.8, 2],
  "mitsubishi-outlander-sport": [[9.5, 8.6, 8.6], CVT, 21.7, null],
};
