// The CarMatch Reliability Score: an estimate out of 5 for every car.
//
// There's no free official reliability data the way NHTSA publishes crash
// tests, so this is always an estimate, and labeled as one. It's 70% the
// brand's general track record for dependability (CarMatch's own rating,
// below) and 30% the model's NHTSA recall count, which is official.

import type { Car } from "./cars";
import { officialFor } from "./official";
import { recallPoints } from "./safety";

/**
 * Each brand's general track record for dependability, out of 5. CarMatch's
 * own judgment from long-running owner surveys and repair records, not any
 * one survey's published score.
 */
const BRAND_TRACK_RECORD: Record<string, number> = {
  Lexus: 5,
  Toyota: 5,
  Mazda: 4.5,
  Honda: 4.5,
  Acura: 4.5,
  Subaru: 4,
  Hyundai: 4,
  Kia: 4,
  Genesis: 4,
  Porsche: 4,
  BMW: 3.5,
  Audi: 3.5,
  Mini: 3.5,
  Nissan: 3.5,
  Infiniti: 3.5,
  Buick: 3.5,
  Mitsubishi: 3.5,
  Ferrari: 3.5,
  "Rolls-Royce": 3.5,
  Ford: 3,
  Chevrolet: 3,
  GMC: 3,
  Cadillac: 3,
  Lincoln: 3,
  "Mercedes-Benz": 3,
  Volvo: 3,
  Volkswagen: 3,
  Tesla: 3,
  Ram: 3,
  Dodge: 3,
  Polestar: 3,
  Lotus: 3,
  Lamborghini: 3,
  Bentley: 3,
  Jeep: 2.5,
  Chrysler: 2.5,
  "Alfa Romeo": 2.5,
  Fiat: 2.5,
  Rivian: 2.5,
  Lucid: 2.5,
  Maserati: 2.5,
  McLaren: 2.5,
  "Aston Martin": 2.5,
  "Land Rover": 2,
};
const UNKNOWN_BRAND = 3;
const WEIGHTS = { brand: 0.7, recalls: 0.3 };

export interface ReliabilityScore {
  /** 1 to 5, in half steps. Always an estimate. */
  score: number;
  /** The brand's track record out of 5. */
  brand: number;
  /** NHTSA recalls for the model year, or null when unknown. */
  recalls: number | null;
  recallYear: number | null;
}

export function reliabilityScore(car: Car): ReliabilityScore {
  const brand = BRAND_TRACK_RECORD[car.make] ?? UNKNOWN_BRAND;
  const recallData = officialFor(car.id)?.recalls ?? null;
  const raw = WEIGHTS.brand * brand + WEIGHTS.recalls * recallPoints(recallData?.count ?? null);
  return {
    score: Math.min(5, Math.max(1, Math.round(raw * 2) / 2)),
    brand,
    recalls: recallData?.count ?? null,
    recallYear: recallData?.year ?? null,
  };
}

/** One line on what the score is based on. */
export function reliabilityBasis(r: ReliabilityScore, make: string): string {
  const recalls = r.recalls === null ? "recalls unknown" : `${r.recalls} NHTSA recall${r.recalls === 1 ? "" : "s"}`;
  return `${make} track record ${r.brand}/5 · ${recalls}`;
}
