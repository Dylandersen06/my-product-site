// Checks an AI Advisor reply against the dataset after it's written: every car
// and trim it names, and every feature it says a trim does or doesn't have.
//
// It only corrects what it can pin on a specific car. A wrong correction would be
// worse than a missed one, so unclear sentences are left alone. It knows the
// features listed below, and checks words rather than meaning, so it reduces
// mistakes without guaranteeing a reply is perfect.

import { isBrandAndTrim, matchLabel } from "./advisor-cards";
import { CARS, hasFeature, type Car, type Feature, type Trim } from "./cars";

const MAX_CORRECTIONS = 5;

/** Features with a yes or no per trim in the data. */
const STRUCTURED: { key: Feature; label: string; claim: RegExp }[] = [
  { key: "camera360", label: "a 360° camera", claim: /\b360(?:[- ]?degree|°)?[- ]?(?:view |surround[- ]view )?cam(?:era)?s?\b|\bsurround[- ]view\b|\bbird'?s[- ]eye\b/gi },
  { key: "sunroof", label: "a sunroof or glass roof", claim: /\b(?:sun|moon)roofs?\b|\b(?:glass|panoramic) roofs?\b/gi },
  { key: "heatedSeats", label: "heated seats", claim: /\bheated (?:front |rear |second-row )?seats?\b/gi },
  { key: "awd", label: "AWD or 4WD", claim: /\bAWD\b|\b4WD\b|\b4x4\b|\ball[- ]wheel[- ]drive\b|\bfour[- ]wheel[- ]drive\b/gi },
  { key: "carplay", label: "Apple CarPlay or Android Auto", claim: /\bcarplay\b|\bandroid auto\b/gi },
  { key: "adaptiveCruise", label: "adaptive cruise control", claim: /\badaptive cruise\b/gi },
  { key: "blindSpot", label: "blind-spot monitoring", claim: /\bblind[- ]spot\b/gi },
  { key: "thirdRow", label: "a third row", claim: /\bthird[- ]row\b|\b3rd[- ]row\b|\bthree rows\b/gi },
];

/** Features that only appear in a trim's highlights text. */
const HIGHLIGHTS: { label: string; claim: RegExp; data: RegExp }[] = [
  { label: "leather seats", claim: /\bleather(?:ette)?(?:-trimmed)? seats?\b/gi, data: /leather|nappa/i },
  { label: "a power tailgate", claim: /\bpower (?:tail|lift)gates?\b/gi, data: /power (?:tail|lift)gate/i },
  { label: "ventilated seats", claim: /\b(?:ventilated|cooled) (?:front )?seats?\b/gi, data: /ventilated|cooled/i },
  { label: "massaging seats", claim: /\bmassag\w+ (?:front )?seats?\b/gi, data: /massag/i },
  { label: "a heads-up display", claim: /\bheads?[- ]up display\b/gi, data: /heads?-up/i },
  { label: "wireless charging", claim: /\bwireless (?:phone )?charging\b/gi, data: /wireless charging/i },
  { label: "remote start", claim: /\bremote start\b/gi, data: /remote start/i },
  { label: "air suspension", claim: /\bair suspension\b/gi, data: /air (?:suspension|ride)/i },
  { label: "locking differentials", claim: /\blocking (?:rear )?differentials?\b/gi, data: /locking/i },
  { label: "Bose audio", claim: /\bBose\b/g, data: /Bose/ },
  { label: "JBL audio", claim: /\bJBL\b/g, data: /JBL/ },
  { label: "Harman Kardon audio", claim: /\bHarman Kardon\b/g, data: /Harman Kardon/ },
  { label: "Bang & Olufsen audio", claim: /\bBang & Olufsen\b/g, data: /Bang & Olufsen/ },
];

type Check = { label: string; has: (car: Car, trim: Trim) => boolean };
type Occurrence = Check & { start: number; end: number };

const CHECKS: { claim: RegExp; check: Check }[] = [
  ...STRUCTURED.map(({ key, label, claim }) => ({
    claim,
    check: { label, has: (car: Car, trim: Trim) => hasFeature(car, trim, key) },
  })),
  ...HIGHLIGHTS.map(({ label, claim, data }) => ({
    claim,
    check: { label, has: (_: Car, trim: Trim) => data.test(trim.highlights.join(", ")) },
  })),
];

/** Shorter names people use for a model, beyond its plain model name. */
const EXTRA_ALIASES: Record<string, string[]> = {
  "toyota-rav4-hybrid": ["RAV4"],
  "mazda-mazda3-hatchback": ["Mazda3"],
  "mazda-mx-5-miata": ["Miata", "MX-5"],
  "volkswagen-golf-gti": ["GTI"],
  "ford-mustang-mach-e": ["Mach-E"],
  "chevrolet-silverado-1500": ["Silverado"],
  "gmc-sierra-1500": ["Sierra"],
  "land-rover-defender-110": ["Defender"],
  "porsche-911-carrera": ["911"],
  "porsche-macan-electric": ["Macan"],
  "audi-s-e-tron-gt": ["e-tron GT"],
  "aston-martin-dbx707": ["DBX"],
  "ferrari-sf90-stradale": ["SF90"],
  "ferrari-296-gtb": ["296"],
  "lamborghini-urus-se": ["Urus"],
};

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const ALIASES = new Map<string, Car>();
for (const car of CARS) {
  ALIASES.set(`${car.make} ${car.model}`, car);
  if (!/^\d+$/.test(car.model) && !ALIASES.has(car.model)) ALIASES.set(car.model, car);
  for (const alias of EXTRA_ALIASES[car.id] ?? []) ALIASES.set(alias, car);
}
const ALIAS_PATTERN = new RegExp(
  `(?<![\\w-])(?:${[...ALIASES.keys()]
    .sort((a, b) => b.length - a.length)
    .map(escape)
    .join("|")})(?![\\w-])`,
  "g",
);

/** Brands the dataset doesn't carry. Any brand later added to the catalog drops out automatically. */
const OTHER_BRANDS = ["Dodge", "Acura", "Infiniti", "Alfa Romeo", "Mini", "Fiat", "Rivian", "Lucid", "Polestar", "Bugatti", "Koenigsegg", "Pagani", "Lotus", "Scion", "Saab", "Pontiac"].filter(
  (brand) => !CARS.some((car) => car.make === brand),
);
const OTHER_BRAND_PATTERN = new RegExp(`\\b(${OTHER_BRANDS.join("|")}) ([A-Z0-9][\\w-]*)`, "g");

const MAKES = [...new Set(CARS.map((car) => car.make))];
const MAKE_THEN_NAME = new RegExp(`(?<![\\w-])(${MAKES.map(escape).join("|")}) ([A-Z0-9][\\w-]*(?:\\.\\d[\\w-]*)?(?: [A-Z0-9][\\w-]*)?)`, "g");
/** Words that can follow a brand without being a model: "Toyota Safety Sense". */
const NOT_MODELS = /^(?:Safety|Sensing|EyeSight|SmartSense|Drive|Co-Pilot|Certified|CPO|Used|New|Pre-Owned|Dealers?|Cars?|Models?|SUVs?|Trucks?|Hybrid|Hybrids|EVs?|Autopilot|Super|Motor|Vehicles?|Ride|Is|Has|Offers|Makes|And|Or)\b/;

const NEGATION = /\b(?:no|not|without|lacks?|lacking|missing|neither|nor|never)\b|n['’]t\b/i;
const CLAUSE_BREAK = /[,;:]|\b(?:but|though|although|while|whereas|however)\b/gi;
const UNSURE = /\bnot listed\b|\bisn['’]t listed\b|\bmay\b|\bmight\b|\bpossibly\b|\bperhaps\b|\bconfirm\b|\bcheck (?:with|whether|if)\b/i;
const ASKING = /\bif you\b|\byou(?:['’]d| would)? (?:want|need|asked|mentioned|prefer|said|care|like)\b|\byour (?:need|priorit)|\blooking for\b|\bmatters? to you\b|\blet me know\b|\bdo you\b|\bwould you\b/i;
const GROUP = /\b(?:both|all three|all of (?:them|these|those)|none of (?:them|these|those|the \w+)|neither)\b/i;
const GROUP_NEGATIVE = /\b(?:none of|neither)\b/i;
/** "360 camera: the XLE doesn't have one", where the "no" comes after the feature. */
const DENIED_LATER = /(?:n['’]t|\bnot\b)\s+(?:\w+\s+)?(?:have|include|offer|get|come with|list)\s+(?:it|one|that)\b|\b(?:lacks|skips|omits)\s+(?:it|one|that)\b|\b(?:does|do)n['’]t\s*[.,;]?\s*$/i;
const PRONOUN_CLAIM = /\b(?:includes?|has|have|offers?|gets?|adds?|comes? with)\s+(?:it|one|that)\b/i;

interface Subject {
  car: Car;
  trim: Trim | null;
  start: number;
}

/** A trim named right after the model, even if the names overlap ("Porsche 911 Carrera S"). */
function trimAfter(car: Car, sentence: string, start: number, alias: string): { trim: Trim; end: number } | null {
  const window = sentence.slice(start, start + alias.length + 40);
  const trims = [...car.trims].sort((a, b) => b.name.length - a.name.length);
  for (const trim of trims) {
    // The trim either follows the name or shares its last word with it.
    for (let at = window.indexOf(trim.name); at >= 0 && at <= alias.length + 1; at = window.indexOf(trim.name, at + 1)) {
      const end = at + trim.name.length;
      if (end <= alias.length) continue;
      if (at > 0 && /[\w-]/.test(window[at - 1])) continue;
      if (end < window.length && /[\w-]/.test(window[end])) continue;
      return { trim, end: start + end };
    }
  }
  return null;
}

/** Trims named alone for the car in focus: "the XLE" or "XLE trim". */
function bareTrims(car: Car, sentence: string, from: number, to: number): Subject[] {
  const found: Subject[] = [];
  const part = sentence.slice(from, to);
  for (const trim of car.trims) {
    const name = escape(trim.name);
    for (const m of part.matchAll(new RegExp(`\\b[Tt]he ${name}(?![\\w-])|(?<![\\w-])${name} trims?\\b`, "g"))) {
      found.push({ car, trim, start: from + m.index });
    }
  }
  return found;
}

function findSubjects(sentence: string, focus: Car | null): Subject[] {
  const subjects: Subject[] = [];
  let car = focus;
  let cursor = 0;
  for (const m of sentence.matchAll(ALIAS_PATTERN)) {
    if (m.index < cursor) continue;
    if (car) subjects.push(...bareTrims(car, sentence, cursor, m.index));
    car = ALIASES.get(m[0]) ?? car;
    if (!car) continue;
    const named = trimAfter(car, sentence, m.index, m[0]);
    subjects.push({ car, trim: named?.trim ?? null, start: m.index });
    cursor = named ? named.end : m.index + m[0].length;
  }
  if (car) subjects.push(...bareTrims(car, sentence, cursor, sentence.length));
  return subjects.sort((a, b) => a.start - b.start);
}

function findOccurrences(sentence: string): Occurrence[] {
  const found: Occurrence[] = [];
  for (const { claim, check } of CHECKS) {
    for (const m of sentence.matchAll(claim)) found.push({ ...check, start: m.index, end: m.index + m[0].length });
  }
  return found.sort((a, b) => a.start - b.start);
}

/** Where the clause holding this position starts. */
function clauseStart(sentence: string, position: number): number {
  let start = 0;
  for (const m of sentence.slice(0, position).matchAll(CLAUSE_BREAK)) start = m.index + m[0].length;
  return start;
}

function hasBreak(text: string): boolean {
  return new RegExp(CLAUSE_BREAK.source, "i").test(text);
}

/** Whichever named car the sentence attaches a feature to. */
function subjectFor(occurrence: Occurrence, subjects: Subject[], sentence: string): Subject | null {
  const before = subjects.filter((s) => s.start < occurrence.start).at(-1) ?? null;
  const after = subjects.find((s) => s.start >= occurrence.end) ?? null;
  if (!before) return after;
  if (after && hasBreak(sentence.slice(before.start, occurrence.start)) && !hasBreak(sentence.slice(occurrence.end, after.start))) {
    return after;
  }
  return before;
}

/** "Porsche 911 Carrera S" rather than "Porsche 911 Carrera Carrera S". */
function trimmedName(car: Car, trim: Trim): string {
  const first = trim.name.split(" ")[0];
  const overlap = car.model.split(" ").at(-1) === first;
  return `${car.make} ${car.model}${overlap ? trim.name.slice(first.length) : ` ${trim.name}`}`;
}

function correctionFor(subject: Pick<Subject, "car" | "trim">, check: Check, claimsItHas: boolean): string | null {
  const { car, trim } = subject;
  const name = `${car.make} ${car.model}`;
  const withIt = car.trims.filter((t) => check.has(car, t)).map((t) => t.name);
  if (trim) {
    const has = check.has(car, trim);
    if (claimsItHas && !has) {
      const where = withIt.length > 0 ? ` It's listed on the ${joinNames(withIt)}.` : " No trim of this model lists it.";
      return `The ${trimmedName(car, trim)} doesn't list ${check.label} in our data.${where}`;
    }
    if (!claimsItHas && has) return `The ${trimmedName(car, trim)} does list ${check.label} in our data.`;
    return null;
  }
  if (claimsItHas && withIt.length === 0) return `Our data doesn't list ${check.label} on any ${name} trim.`;
  return null;
}

const joinNames = (names: string[]) =>
  names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;

/** Cars recommended with a **Make Model Trim (Condition)** line. */
function recommended(text: string): { car: Car; trim: Trim }[] {
  return [...text.matchAll(/\*\*([^*\n]+?)\s*\(([^()\n]+)\)\s*\*\*/g)].flatMap(([, label]) => matchLabel(label) ?? []);
}

/** The reply already says this car isn't available, so there's nothing to correct. */
const ALREADY_SAID_MISSING = /(?:isn['’]t|aren['’]t|not|never)\s+(?:\w+\s+)?(?:in|on|part of|listed|available|included)\b|(?:don['’]t|doesn['’]t|do not|does not)\s+(?:\w+\s+)?(?:have|carry|list|include)\b/i;

function sentenceAround(text: string, at: number): string {
  const before = text.slice(0, at).search(/[^.!?\n]*$/);
  const end = text.slice(at).search(/[.!?\n]/);
  return text.slice(before, end < 0 ? undefined : at + end);
}

function checkNames(text: string, add: (message: string) => void) {
  for (const [, label] of text.matchAll(/\*\*([^*\n]+?)\s*\([^()\n]+\)\s*\*\*/g)) {
    if (matchLabel(label) || isBrandAndTrim(label)) continue;
    const car = [...ALIASES.entries()].filter(([alias]) => label.startsWith(`${alias} `) || label === alias).sort((a, b) => b[0].length - a[0].length)[0];
    if (car) {
      add(`Our data doesn't have that trim of the ${car[1].make} ${car[1].model}. Its trims are the ${joinNames(car[1].trims.map((t) => t.name))}.`);
    } else if (MAKES.some((make) => label.startsWith(`${make} `)) || OTHER_BRANDS.some((b) => label.startsWith(`${b} `))) {
      add(`The ${label.trim()} isn't in our dataset, so we can't confirm its details.`);
    }
  }
  // Bold recommendation lines were handled above.
  const plain = text.replace(/\*\*[^*\n]+?\s*\([^()\n]+\)\s*\*\*/g, "").replace(/\*\*/g, "");
  for (const m of plain.matchAll(OTHER_BRAND_PATTERN)) {
    if (!ALREADY_SAID_MISSING.test(sentenceAround(plain, m.index))) add(`The ${m[0]} isn't in our dataset, so we can't confirm its details.`);
  }
  for (const m of plain.matchAll(MAKE_THEN_NAME)) {
    const [, make, rest] = m;
    if (NOT_MODELS.test(rest) || ALREADY_SAID_MISSING.test(sentenceAround(plain, m.index))) continue;
    const first = rest.split(" ")[0];
    const full = `${make} ${rest}`;
    // A brand can be followed by a model or by a trim: "BMW M340i" is a 3 Series.
    const known =
      [...ALIASES.keys()].some((alias) => full === alias || full.startsWith(`${alias} `) || alias.startsWith(`${make} ${first}`)) ||
      CARS.some((car) => car.make === make && car.trims.some((t) => t.name === rest || t.name.startsWith(`${first} `) || t.name === first));
    if (!known) add(`The ${make} ${first} isn't in our dataset, so we can't confirm its details.`);
  }
}

/** Corrections for a reply. `previousReply` tells it which cars "both" or "none of them" refer to. */
export function verifyReply(reply: string, previousReply = ""): string[] {
  const corrections = new Set<string>();
  const add = (message: string) => corrections.add(message);
  checkNames(reply, add);

  const inReply = recommended(reply);
  const group = inReply.length > 0 ? inReply : recommended(previousReply);

  for (const paragraph of reply.split(/\n{2,}/)) {
    let focus = null as Subject | null;
    let lastCheck = null as Check | null;
    const sentences = paragraph
      .replace(/\*\*/g, "")
      .split(/\n+/)
      .flatMap((line) => line.replace(/^\s*[-*] /, "").split(/(?<=[.!?])\s+(?=[A-Z"(])/));

    for (const sentence of sentences) {
      const subjects = findSubjects(sentence, focus?.car ?? null);
      const occurrences = findOccurrences(sentence);
      const question = sentence.trim().endsWith("?");
      const sentenceUnsure = UNSURE.test(sentence);
      const asking = ASKING.test(sentence);
      let previous = null as { occurrence: Occurrence; negative: boolean } | null;

      for (const occurrence of occurrences) {
        const window = sentence.slice(clauseStart(sentence, occurrence.start), occurrence.start);
        const afterwards = sentence.slice(occurrence.end).split(CLAUSE_BREAK)[0];
        const joined = previous !== null && /^[\s,]*(?:or|nor|and)?[\s,]*(?:an?|the)?\s*$/i.test(sentence.slice(previous.occurrence.end, occurrence.start));
        const negative: boolean =
          (NEGATION.test(window) && !/\bnot only\b/i.test(window)) ||
          /^\s*(?:is|are)(?:n['’]t| not)\b/i.test(afterwards) ||
          DENIED_LATER.test(sentence.slice(occurrence.end)) ||
          (joined && previous !== null && previous.negative);
        previous = { occurrence, negative };
        lastCheck = occurrence;
        // "Has a camera, but leather isn't listed" hedges only the second claim.
        const clause = sentence.slice(clauseStart(sentence, occurrence.start), occurrence.end) + afterwards;
        if (question || UNSURE.test(clause)) continue;

        if (GROUP.test(sentence) && subjects.length === 0) {
          for (const member of group) {
            const message = correctionFor(member, occurrence, !GROUP_NEGATIVE.test(sentence) && !negative);
            if (message) add(message);
          }
          continue;
        }
        const named = subjectFor(occurrence, subjects, sentence);
        const subject = named ?? (asking ? null : focus);
        if (!subject) continue;
        const message = correctionFor(subject, occurrence, !negative);
        if (message) add(message);
      }

      // "If you want one, the XSE includes it" refers to the last feature mentioned.
      if (occurrences.length === 0 && lastCheck && !question && !sentenceUnsure) {
        const pronoun = sentence.match(PRONOUN_CLAIM);
        if (pronoun) {
          const at = pronoun.index ?? 0;
          const before = subjects.filter((s) => s.start < at).at(-1) ?? (asking ? null : focus);
          const window = sentence.slice(clauseStart(sentence, at), at + pronoun[0].length);
          if (before) {
            const message = correctionFor(before, lastCheck, !NEGATION.test(window));
            if (message) add(message);
          }
        }
      }

      const last = subjects.at(-1);
      if (last) focus = !last.trim && focus?.car === last.car ? { ...last, trim: focus.trim } : last;
    }
  }
  return [...corrections].slice(0, MAX_CORRECTIONS);
}
