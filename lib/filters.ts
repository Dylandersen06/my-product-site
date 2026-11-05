// Advanced Search filters. Unlike Quick Search's scoring, these are strict: a
// trim has to pass every filter that's set. No lib/cars.ts values are imported
// here, so browser components can use the option lists without loading the data.

import type { Trim } from "./cars";

export const DRIVETRAIN_LABELS = {
  fwd: "Front-wheel drive",
  rwd: "Rear-wheel drive",
  awd: "AWD or 4WD",
} as const;
export type DrivetrainKey = keyof typeof DRIVETRAIN_LABELS;

export const TRANSMISSION_LABELS = {
  automatic: "Automatic (no clutch pedal)",
  manual: "Manual",
  cvt: "CVT",
  dct: "Dual-clutch",
  single: "Single-speed (most EVs)",
} as const;
export type TransmissionKey = keyof typeof TRANSMISSION_LABELS;

const DRIVETRAIN_TESTS: Record<DrivetrainKey, RegExp> = { fwd: /FWD/, rwd: /RWD/, awd: /AWD|4WD/ };
const TRANSMISSION_TESTS: Record<TransmissionKey, RegExp> = {
  automatic: /automatic|CVT|dual-clutch|single-speed/i,
  manual: /manual/i,
  cvt: /CVT/,
  dct: /dual-clutch/i,
  single: /single-speed/i,
};

export const HP_PICKS = [
  { label: "Under 200", min: "", max: "199" },
  { label: "200–300", min: "200", max: "300" },
  { label: "300–450", min: "300", max: "450" },
  { label: "450–700", min: "450", max: "700" },
  { label: "700+", min: "700", max: "" },
] as const;

export const ZERO60_OPTIONS = [8, 7, 6, 5, 4, 3];
export const MPG_OPTIONS = [20, 25, 30, 35, 40, 50];
export const EV_RANGE_OPTIONS = [20, 40, 100, 200, 250, 300, 350, 400];
export const TOWING_OPTIONS = [1500, 3500, 5000, 7500, 10000, 13000];
export const CARGO_OPTIONS = [10, 15, 20, 30, 40, 60];

export interface Filters {
  hpMin: number | null;
  hpMax: number | null;
  zero60Max: number | null;
  mpgMin: number | null;
  rangeMin: number | null;
  drivetrain: DrivetrainKey | null;
  transmission: TransmissionKey | null;
  towMin: number | null;
  cargoMin: number | null;
  makes: string[];
  excludeMakes: string[];
}

export function trimPasses(trim: Trim, f: Filters): boolean {
  if (f.hpMin !== null && trim.hp < f.hpMin) return false;
  if (f.hpMax !== null && trim.hp > f.hpMax) return false;
  if (f.zero60Max !== null && trim.zero60 > f.zero60Max) return false;
  if (f.drivetrain && !DRIVETRAIN_TESTS[f.drivetrain].test(trim.drivetrain)) return false;
  if (f.transmission && !TRANSMISSION_TESTS[f.transmission].test(trim.transmission)) return false;
  if (f.towMin !== null && trim.towingLbs < f.towMin) return false;
  if (f.cargoMin !== null && trim.cargoCuFt < f.cargoMin) return false;
  // MPG or EV range: with either set, a trim qualifies by meeting at least one.
  if (f.mpgMin !== null || f.rangeMin !== null) {
    const mpgOk = f.mpgMin !== null && trim.mpg !== null && trim.mpg >= f.mpgMin;
    const rangeOk = f.rangeMin !== null && trim.evRangeMi !== null && trim.evRangeMi >= f.rangeMin;
    if (!mpgOk && !rangeOk) return false;
  }
  return true;
}

/** Short labels for the active filters, for the results summary. */
export function filterChips(f: Filters): string[] {
  const chips: string[] = [];
  if (f.hpMin !== null && f.hpMax !== null) chips.push(`${f.hpMin}–${f.hpMax} hp`);
  else if (f.hpMin !== null) chips.push(`${f.hpMin}+ hp`);
  else if (f.hpMax !== null) chips.push(`Up to ${f.hpMax} hp`);
  if (f.zero60Max !== null) chips.push(`0–60 under ${f.zero60Max}s`);
  if (f.mpgMin !== null) chips.push(`${f.mpgMin}+ mpg`);
  if (f.rangeMin !== null) chips.push(`${f.rangeMin}+ mi EV range`);
  if (f.drivetrain) chips.push(DRIVETRAIN_LABELS[f.drivetrain]);
  if (f.transmission) chips.push(TRANSMISSION_LABELS[f.transmission]);
  if (f.towMin !== null) chips.push(`Tows ${f.towMin.toLocaleString("en-US")}+ lb`);
  if (f.cargoMin !== null) chips.push(`${f.cargoMin}+ cu ft cargo`);
  if (f.makes.length > 0) chips.push(`Only: ${f.makes.join(", ")}`);
  if (f.excludeMakes.length > 0) chips.push(`Not: ${f.excludeMakes.join(", ")}`);
  return chips;
}
