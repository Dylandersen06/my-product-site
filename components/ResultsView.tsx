import Link from "next/link";
import { CompareProvider, type CompareItem } from "@/components/Compare";
import MilesControl from "@/components/MilesControl";
import ResultCard from "@/components/ResultCard";
import { budgetLabel, usd } from "@/lib/budget";
import { BODY_LABELS, FEATURE_LABELS, FUEL_LABELS, USAGE_LABELS, hasFeature, towingText, type Feature } from "@/lib/cars";
import { filterChips } from "@/lib/filters";
import { hrefWith, suggestLoosening, type RawParams, type Suggestion } from "@/lib/loosen";
import { SORT_LABELS, rankCars, type Match, type Preferences, type SortKey } from "@/lib/match";
import { epaSummary, officialFor, overallStars } from "@/lib/official";
import { photoFor } from "@/lib/photos";
import { CONDITIONS, CONDITION_LABELS } from "@/lib/pricing";

const COMPARE_FEATURES: Feature[] = [
  "awd",
  "carplay",
  "adaptiveCruise",
  "blindSpot",
  "heatedSeats",
  "sunroof",
  "thirdRow",
  "camera360",
];

function compareItem(m: Match, prefs: Preferences): CompareItem {
  const { car, trim } = m;
  const yesNo = (f: Feature) => (hasFeature(car, trim, f) ? "Yes" : "—");
  const stars = overallStars(car.id);
  const recalls = officialFor(car.id)?.recalls;
  return {
    id: car.id,
    name: `${car.make} ${car.model}`,
    photoUrl: photoFor(car.id)?.url ?? null,
    rows: {
      "Recommended trim": trim.name,
      "Match score": String(m.score),
      [`Best fit (${prefs.conditions.map((c) => CONDITION_LABELS[c]).join(" / ")})`]: `${usd(m.price)} ${CONDITION_LABELS[m.condition]}`,
      ...Object.fromEntries(
        CONDITIONS.map((c) => [`${CONDITION_LABELS[c]}${c === "new" ? "" : " (est.)"}`, usd(trim.prices[c])]),
      ),
      "5-year cost (est.)": usd(m.ownership.total),
      "Monthly cost (est.)": `${usd(m.ownership.monthly)}/mo`,
      Horsepower: `${trim.hp} hp`,
      "0–60 mph": `${trim.zero60}s`,
      "MPG / range": trim.economy,
      "EPA MPG / range (official)": epaSummary(car.id) ?? "Not listed",
      "NHTSA crash rating (official)": stars !== null ? `${stars}★ overall` : "Not rated",
      "NHTSA recalls (official)": recalls ? `${recalls.count} (${recalls.year} models)` : "Not matched",
      Engine: trim.engine,
      Drivetrain: trim.drivetrain,
      Transmission: trim.transmission,
      Towing: towingText(trim.towingLbs),
      "Cargo space": `${trim.cargoCuFt} cu ft`,
      Seats: String(car.seats),
      "Body style": BODY_LABELS[car.body],
      Fuel: FUEL_LABELS[trim.fuel],
      ...Object.fromEntries(COMPARE_FEATURES.map((f) => [FEATURE_LABELS[f], yesNo(f)])),
    },
    numbers: {
      "Match score": { value: m.score, better: "high" },
      ...Object.fromEntries(
        CONDITIONS.map((c) => [
          `${CONDITION_LABELS[c]}${c === "new" ? "" : " (est.)"}`,
          { value: trim.prices[c], better: "low" as const },
        ]),
      ),
      "5-year cost (est.)": { value: m.ownership.total, better: "low" },
      "Monthly cost (est.)": { value: m.ownership.monthly, better: "low" },
      Horsepower: { value: trim.hp, better: "high" },
      "0–60 mph": { value: trim.zero60, better: "low" },
      Towing: { value: trim.towingLbs, better: "high" },
      "Cargo space": { value: trim.cargoCuFt, better: "high" },
      ...(stars !== null ? { "NHTSA crash rating (official)": { value: stars, better: "high" as const } } : {}),
    },
  };
}

function Suggestions({
  suggestions,
  basePath,
  params,
}: {
  suggestions: Suggestion[];
  basePath: string;
  params: RawParams;
}) {
  if (suggestions.length === 0) return null;
  return (
    <ul className="loosen-list">
      {suggestions.map((s) => (
        <li key={s.label}>
          <Link href={hrefWith(basePath, params, s.change)} className="loosen-link">
            <span>{s.label}</span>
            <span className="loosen-count">
              {s.count} car{s.count === 1 ? "" : "s"} →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ResultsView({
  params,
  prefs,
  sort,
  basePath,
}: {
  params: RawParams;
  prefs: Preferences;
  sort: SortKey;
  basePath: string;
}) {
  const { matches, excludedCount, totalMatches, fallback } = rankCars(prefs, sort);
  const advanced = prefs.filters !== null;
  const newOnly = prefs.conditions.length === 1 && prefs.conditions[0] === "new";
  const suggestions = matches.length === 0 || fallback ? suggestLoosening(prefs) : [];

  const summary = [
    prefs.conditions.map((c) => CONDITION_LABELS[c]).join(" + "),
    budgetLabel(prefs.budget),
    prefs.seats > 1 ? `${prefs.seats}+ seats` : "Any seats",
    prefs.fuel === "any" ? "Any fuel" : FUEL_LABELS[prefs.fuel],
    prefs.body === "any" ? "Any body style" : BODY_LABELS[prefs.body],
    prefs.usage === "any" ? "Any use" : USAGE_LABELS[prefs.usage],
    ...(prefs.filters ? filterChips(prefs.filters) : []),
    ...prefs.features.map((f) => FEATURE_LABELS[f]),
  ];

  const list = (
    <ol className="results-list">
      {matches.map((m, i) => (
        <ResultCard
          key={m.car.id}
          match={m}
          rank={i + 1}
          conditions={prefs.conditions}
          advanced={advanced}
          milesPerYear={prefs.milesPerYear}
        />
      ))}
    </ol>
  );

  return (
    <>
      <div className="results-head">
        <div>
          <h1 className="results-title">Your best matches</h1>
          <ul className="chips">
            {summary.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="results-promise">Ranked by what you told us. No sponsored rankings.</p>
        </div>
        <Link href={basePath} className="button button-outline">
          New search
        </Link>
      </div>

      {matches.length === 0 ? (
        <div className="card empty">
          <h2>No cars match all of that</h2>
          {suggestions.length > 0 ? (
            <>
              <p className="muted">
                {suggestions[0].label.includes(" + ")
                  ? "No one change is enough. Loosening these together would bring cars back:"
                  : "Loosening one of these would bring cars back:"}
              </p>
              <Suggestions suggestions={suggestions} basePath={basePath} params={params} />
            </>
          ) : (
            <p className="muted">
              No one change is enough, because several filters rule out every car. Try removing a few at once.
            </p>
          )}
          {advanced && (
            <a href="/advanced" className="button button-outline loosen-reset">
              Reset filters
            </a>
          )}
        </div>
      ) : (
        <>
          {fallback && (
            <div className="notice">
              <strong>Nothing fits a {usd(prefs.budget.max)} budget yet.</strong> Every car with {prefs.seats}+ seats
              costs more than 20% above it in the condition you picked. Here are the most affordable options so you can
              see how close you can get.
              <Suggestions suggestions={suggestions} basePath={basePath} params={params} />
            </div>
          )}

          <p className="estimate-note">
            <strong>Used and certified pre-owned prices are estimates</strong>, not live listings. Check local listings
            for actual prices and availability.
          </p>

          <div className="results-tools">
            <nav className="sort-bar" aria-label="Sort results">
              <span className="sort-label">Sort by</span>
              <div className="sort-options">
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <Link
                    key={key}
                    href={hrefWith(basePath, params, key === "best" ? { remove: ["sort"] } : { set: { sort: key } })}
                    scroll={false}
                    className={`sort-option${key === sort ? " active" : ""}`}
                    aria-current={key === sort ? "true" : undefined}
                  >
                    {SORT_LABELS[key]}
                  </Link>
                ))}
              </div>
            </nav>
            <MilesControl params={params} basePath={basePath} miles={prefs.milesPerYear} />
            <p className="sort-hint">
              Cost-to-own figures are estimates for the recommended trim and condition. They exclude loan interest.
            </p>
            {sort === "savings" && newOnly && (
              <p className="sort-hint">You&rsquo;re searching New only, so this shows what buying used could save.</p>
            )}
            {advanced && (
              <p className="sort-hint">
                {totalMatches} car{totalMatches === 1 ? "" : "s"} match your filters
                {totalMatches > matches.length ? `, showing the top ${matches.length}` : ""}. Tick Compare on up to 3 to
                see them side by side.
              </p>
            )}
          </div>

          {advanced ? <CompareProvider items={matches.map((m) => compareItem(m, prefs))}>{list}</CompareProvider> : list}

          {!advanced && !fallback && excludedCount > 0 && (
            <p className="muted center">
              {excludedCount} car{excludedCount === 1 ? " was" : "s were"} left out for having too few seats or costing
              more than 20% over your budget in the condition you picked.
            </p>
          )}
        </>
      )}
    </>
  );
}
