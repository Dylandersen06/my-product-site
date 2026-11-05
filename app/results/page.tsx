import type { Metadata } from "next";
import Link from "next/link";
import CarPhoto from "@/components/CarPhoto";
import PriceComparison from "@/components/PriceComparison";
import TrimList from "@/components/TrimList";
import SearchForm from "@/components/SearchForm";
import { budgetLabel, usd } from "@/lib/budget";
import { BODY_LABELS, FEATURE_LABELS, FUEL_LABELS, USAGE_LABELS } from "@/lib/cars";
import { DEFAULT_SORT, SORT_LABELS, rankCars, type SortKey } from "@/lib/match";
import { parsePreferences, parseSort } from "@/lib/params";
import { photoFor } from "@/lib/photos";
import { CONDITION_LABELS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Your matches | CarMatch AI by Dylan Andersen",
};

type RawParams = Record<string, string | string[] | undefined>;

/** The current results URL with a different sort, keeping everything else. */
function sortHref(params: RawParams, sort: SortKey) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === "sort" || value === undefined) continue;
    for (const v of Array.isArray(value) ? value : [value]) query.append(key, v);
  }
  if (sort !== DEFAULT_SORT) query.set("sort", sort);
  return `/results?${query}`;
}

function scoreTone(score: number) {
  if (score >= 85) return "great";
  if (score >= 65) return "good";
  return "fair";
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const params = await searchParams;
  const prefs = parsePreferences(params);
  const sort = parseSort(params);
  const { matches, excludedCount, fallback } = rankCars(prefs, sort);
  const newOnly = prefs.conditions.length === 1 && prefs.conditions[0] === "new";

  const summary = [
    prefs.conditions.map((c) => CONDITION_LABELS[c]).join(" + "),
    budgetLabel(prefs.budget),
    `${prefs.seats}+ seats`,
    prefs.fuel === "any" ? "Any fuel" : FUEL_LABELS[prefs.fuel],
    prefs.body === "any" ? "Any body style" : BODY_LABELS[prefs.body],
    USAGE_LABELS[prefs.usage],
    ...prefs.features.map((f) => FEATURE_LABELS[f]),
  ];

  return (
    <div className="container results-page">
      <div className="results-head">
        <div>
          <h1 className="results-title">Your best matches</h1>
          <ul className="chips">
            {summary.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <Link href="/#search" className="button button-outline">
          New search
        </Link>
      </div>

      {matches.length === 0 ? (
        <div className="card empty">
          <h2>No cars matched those needs</h2>
          <p className="muted">
            No car in our list has {prefs.seats} or more seats. Try lowering the seat count.
          </p>
        </div>
      ) : (
        <>
          {fallback && (
            <div className="notice">
              <strong>Nothing fits a {usd(prefs.budget.max)} budget yet.</strong> Every car with {prefs.seats}+ seats
              costs more than 20% above it in the condition you picked. Here are the most affordable options so you
              can see how close you can get.
            </div>
          )}

          <p className="estimate-note">
            <strong>Used and certified pre-owned prices are estimates</strong>, not live listings. Check local listings
            for actual prices and availability.
          </p>

          <nav className="sort-bar" aria-label="Sort results">
            <span className="sort-label">Sort by</span>
            <div className="sort-options">
              {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                <Link
                  key={key}
                  href={sortHref(params, key)}
                  scroll={false}
                  className={`sort-option${key === sort ? " active" : ""}`}
                  aria-current={key === sort ? "true" : undefined}
                >
                  {SORT_LABELS[key]}
                </Link>
              ))}
            </div>
          </nav>
          {sort === "savings" && newOnly && (
            <p className="sort-hint">You&rsquo;re searching New only, so this shows what buying used could save.</p>
          )}

          <ol className="results-list">
            {matches.map((m, i) => (
              <li key={m.car.id} className="result-card">
                <CarPhoto
                  name={`${m.car.make} ${m.car.model}`}
                  bodyLabel={BODY_LABELS[m.car.body]}
                  photo={photoFor(m.car.id)}
                  rank={i + 1}
                />
                <div className="result-body">
                  <div className="result-top">
                    <div>
                      <h2>
                        {m.car.make} {m.car.model}
                      </h2>
                      <p className="recommended-trim">
                        {m.car.trims.length > 1 ? "Recommended trim: " : "Trim: "}
                        <strong>{m.trim.name}</strong>
                      </p>
                      <p className="result-specs">
                        {BODY_LABELS[m.car.body]} · {FUEL_LABELS[m.car.fuel]} · {m.car.seats} seats
                      </p>
                      <p className="result-specs">
                        {m.trim.engine} · {m.trim.hp} hp · {m.trim.economy} · {m.trim.drivetrain}
                      </p>
                    </div>
                    <div className={`score score-${scoreTone(m.score)}`}>
                      <span className="score-num">{m.score}</span>
                      <span className="score-label">match</span>
                    </div>
                  </div>
                  <div className="meter" aria-hidden="true">
                    <div className={`meter-fill score-${scoreTone(m.score)}`} style={{ width: `${m.score}%` }} />
                  </div>
                  <PriceComparison match={m} conditions={prefs.conditions} />
                  <ul className="reasons">
                    {m.reasons.map((r) => (
                      <li key={r} className="reason-good">
                        {r}
                      </li>
                    ))}
                    {m.caveats.map((c) => (
                      <li key={c} className="reason-warn">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <TrimList match={m} conditions={prefs.conditions} />
                </div>
              </li>
            ))}
          </ol>
          {!fallback && excludedCount > 0 && (
            <p className="muted center">
              {excludedCount} car{excludedCount === 1 ? " was" : "s were"} left out for having too few seats or
              costing more than 20% over your budget in the condition you picked.
            </p>
          )}
        </>
      )}

      <section className="section">
        <div className="narrow">
          <h2 className="section-title">Refine your search</h2>
          <div className="card">
            <SearchForm initial={prefs} sort={sort} />
          </div>
        </div>
      </section>
    </div>
  );
}
