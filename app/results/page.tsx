import type { Metadata } from "next";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import { budgetLabel, usd } from "@/lib/budget";
import { BODY_LABELS, FEATURE_LABELS, FUEL_LABELS, USAGE_LABELS } from "@/lib/cars";
import { rankCars } from "@/lib/match";
import { parsePreferences } from "@/lib/params";

export const metadata: Metadata = {
  title: "Your matches | CarMatch AI by Dylan Andersen",
};

function scoreTone(score: number) {
  if (score >= 85) return "great";
  if (score >= 65) return "good";
  return "fair";
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const prefs = parsePreferences(await searchParams);
  const { matches, excludedCount, fallback } = rankCars(prefs);

  const summary = [
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
              starts more than 20% above it. Here are the most affordable options so you can see how close you can
              get.
            </div>
          )}
          <ol className="results-list">
            {matches.map((m, i) => (
              <li key={m.car.id} className="result-card">
                <div className="result-rank">#{i + 1}</div>
                <div className="result-body">
                  <div className="result-top">
                    <div>
                      <h2>
                        {m.car.year} {m.car.make} {m.car.model}
                      </h2>
                      <p className="result-specs">
                        From ~{usd(m.car.price)} · {BODY_LABELS[m.car.body]} · {FUEL_LABELS[m.car.fuel]} ·{" "}
                        {m.car.seats} seats · {m.car.efficiency}
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
                </div>
              </li>
            ))}
          </ol>
          {!fallback && excludedCount > 0 && (
            <p className="muted center">
              {excludedCount} car{excludedCount === 1 ? " was" : "s were"} left out for having too few seats or
              costing more than 20% over your budget.
            </p>
          )}
        </>
      )}

      <section className="section">
        <div className="narrow">
          <h2 className="section-title">Refine your search</h2>
          <div className="card">
            <SearchForm initial={prefs} />
          </div>
        </div>
      </section>
    </div>
  );
}
