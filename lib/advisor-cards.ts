// Turns the recommendation lines in an AI reply into cards. Every figure comes
// from the dataset, not the model's text, and a line that doesn't match a real
// car and trim gets no card, so a card can't show an invented car or price.

import { BODY_LABELS, CARS, carDetailsHref, type Car, type Trim } from "./cars";
import { DEFAULT_MILES_PER_YEAR, costToOwn } from "./ownership";
import { photoFor, type CarPhoto } from "./photos";
import { CONDITION_LABELS, type Condition } from "./pricing";

export interface AdvisorCard {
  id: string;
  name: string;
  bodyLabel: string;
  trim: string;
  condition: Condition;
  conditionLabel: string;
  price: number;
  fiveYearCost: number;
  monthlyCost: number;
  photo?: CarPhoto;
  href: string;
}

const MAX_CARDS_PER_REPLY = 3;

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Longest names first, so "Toyota RAV4 Plug-in Hybrid" wins over a shorter match. */
const CARS_BY_NAME = CARS.map((car) => ({ car, name: normalize(`${car.make} ${car.model}`) })).sort(
  (a, b) => b.name.length - a.name.length,
);

function parseCondition(text: string): Condition | null {
  const c = normalize(text);
  if (/certified|cpo/.test(c)) return "cpo";
  if (/used|pre owned/.test(c)) return "used";
  if (/\bnew\b/.test(c)) return "new";
  return null;
}

/** The trim named at the end of a label, or the only trim of a one-trim model. */
function findTrim(car: Car, label: string, carName: string): Trim | null {
  const named = car.trims
    .map((trim) => ({ trim, name: normalize(trim.name) }))
    .filter(({ name }) => label === `${carName} ${name}` || label.endsWith(` ${name}`) || label === name)
    .sort((a, b) => b.name.length - a.name.length)[0];
  if (named) return named.trim;
  return car.trims.length === 1 && label === carName ? car.trims[0] : null;
}

export function matchLabel(rawLabel: string): { car: Car; trim: Trim } | null {
  const label = normalize(rawLabel);
  for (const { car, name } of CARS_BY_NAME) {
    if (label !== name && !label.startsWith(`${name} `)) continue;
    const trim = findTrim(car, label, name);
    if (trim) return { car, trim };
  }
  // "BMW M340i" leaves out the model, which is fine if only one car has that trim.
  const found = brandTrimMatches(label);
  return found.length === 1 ? found[0] : null;
}

function brandTrimMatches(label: string): { car: Car; trim: Trim }[] {
  return CARS.flatMap((car) => {
    const make = normalize(car.make);
    if (!label.startsWith(`${make} `)) return [];
    const trim = car.trims.find((t) => normalize(t.name) === label.slice(make.length + 1));
    return trim ? [{ car, trim }] : [];
  });
}

/** True for "Honda EX-L": a real trim of that brand, even if several models share it. */
export const isBrandAndTrim = (rawLabel: string) => brandTrimMatches(normalize(rawLabel)).length > 0;

export function cardsFromReply(text: string): AdvisorCard[] {
  const cards = new Map<string, AdvisorCard>();
  for (const [, label, conditionText] of text.matchAll(/\*\*([^*\n]+?)\s*\(([^()\n]+)\)\s*\*\*/g)) {
    const condition = parseCondition(conditionText);
    const match = matchLabel(label);
    if (!condition || !match) continue;
    const { car, trim } = match;
    const key = `${car.id}|${trim.name}|${condition}`;
    if (cards.has(key) || cards.size >= MAX_CARDS_PER_REPLY) continue;
    const cost = costToOwn(car, trim, condition, DEFAULT_MILES_PER_YEAR);
    cards.set(key, {
      id: car.id,
      name: `${car.make} ${car.model}`,
      bodyLabel: BODY_LABELS[car.body],
      trim: trim.name,
      condition,
      conditionLabel: CONDITION_LABELS[condition],
      price: trim.prices[condition],
      fiveYearCost: cost.total,
      monthlyCost: cost.monthly,
      photo: photoFor(car.id),
      href: carDetailsHref(car.id, trim.name, condition),
    });
  }
  return [...cards.values()];
}
