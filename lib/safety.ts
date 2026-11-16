// The CarMatch Safety Score: one rating out of 5 for every car and trim.
//
// It's built mostly from the official NHTSA crash-test rating, plus the
// driver-assist features on that exact trim and the model's NHTSA recall
// count. About half the catalog has no NHTSA crash test (many trucks, sports,
// luxury and exotic cars). Those get a cautious middle value for the crash
// part and are labeled as estimates, so a score never claims crash results
// that don't exist.

import { FEATURE_LABELS, hasFeature, type Car, type Feature, type Trim } from "./cars";
import { officialFor, overallStars } from "./official";

/** How much each part counts toward the score. */
const WEIGHTS = { crash: 0.7, assist: 0.2, recalls: 0.1 };
/** Used for the crash part when NHTSA hasn't crash-tested the model: below most rated cars. */
const UNRATED_CRASH = 3.5;
/** Used for the recall part when NHTSA's recall records couldn't be matched. */
const UNKNOWN_RECALLS = 3.5;
/** Driver-assist features in the data that help avoid crashes. */
const ASSIST_FEATURES: Feature[] = ["blindSpot", "adaptiveCruise", "camera360"];

export interface SafetyScore {
  /** 1 to 5, in half steps. */
  score: number;
  /** True when it includes an official NHTSA crash-test rating. */
  crashTested: boolean;
  /** NHTSA overall stars, or null when not crash-tested. */
  crashStars: number | null;
  /** Driver-assist features this trim has, in plain words. */
  assists: string[];
  /** NHTSA recalls for the model year, or null when unknown. */
  recalls: number | null;
  recallYear: number | null;
}

/** 5 for no recalls, down to 1 for ten or more. */
export function recallPoints(count: number | null): number {
  if (count === null) return UNKNOWN_RECALLS;
  if (count === 0) return 5;
  if (count <= 2) return 4;
  if (count <= 5) return 3;
  if (count <= 9) return 2;
  return 1;
}

export function safetyScore(car: Car, trim: Trim): SafetyScore {
  const crashStars = overallStars(car.id);
  const recallData = officialFor(car.id)?.recalls ?? null;
  const assistKeys = ASSIST_FEATURES.filter((f) => hasFeature(car, trim, f));
  const raw =
    WEIGHTS.crash * (crashStars ?? UNRATED_CRASH) +
    WEIGHTS.assist * (5 * (assistKeys.length / ASSIST_FEATURES.length)) +
    WEIGHTS.recalls * recallPoints(recallData?.count ?? null);
  return {
    score: Math.min(5, Math.max(1, Math.round(raw * 2) / 2)),
    crashTested: crashStars !== null,
    crashStars,
    assists: assistKeys.map((f) => FEATURE_LABELS[f]),
    recalls: recallData?.count ?? null,
    recallYear: recallData?.year ?? null,
  };
}

/** "4.5" or "4", for display. */
export const formatSafety = (score: number) => (Number.isInteger(score) ? String(score) : score.toFixed(1));

/** One line on what the score is based on. */
export function safetyBasis(s: SafetyScore): string {
  const crash = s.crashTested
    ? `NHTSA ${s.crashStars}★ crash rating`
    : "No NHTSA crash test, so partly estimated";
  const assists = s.assists.length > 0 ? `${s.assists.length} of 3 driver-assist features` : "no listed driver-assist features";
  const recalls = s.recalls === null ? "recalls unknown" : `${s.recalls} recall${s.recalls === 1 ? "" : "s"}`;
  return `${crash} · ${assists} · ${recalls}`;
}
