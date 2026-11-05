import type { Metadata } from "next";
import AdvancedForm from "@/components/AdvancedForm";
import ResultsView from "@/components/ResultsView";
import type { RawParams } from "@/lib/loosen";
import { hasSearch, parsePreferences, parseSort } from "@/lib/params";

export const metadata: Metadata = {
  title: "Advanced Search | CarMatch AI by Dylan Andersen",
  description:
    "Filter cars by horsepower, 0–60, MPG or EV range, drivetrain, towing, cargo, brand and features, then compare up to 3 side by side.",
};

export default async function AdvancedPage({ searchParams }: { searchParams: Promise<RawParams> }) {
  const params = await searchParams;
  const prefs = parsePreferences(params, "advanced");
  const sort = parseSort(params);
  const searched = hasSearch(params);
  // Remounts the form after each search so its fields match the URL.
  const formKey = JSON.stringify(params);

  return (
    <div className="container results-page">
      {!searched && (
        <div className="advanced-intro">
          <h1 className="results-title">Advanced Search</h1>
          <p className="muted">
            Pick your must-haves. Every filter you set is a requirement: a trim must pass them all to appear. Leave anything on Any to skip it.
          </p>
        </div>
      )}

      <details className="filters-panel" open={!searched} key={formKey}>
        <summary>{searched ? "Edit filters" : "Filters"}</summary>
        <div className="filters-panel-body">
          <AdvancedForm initial={prefs} filters={prefs.filters!} sort={sort} />
        </div>
      </details>

      {searched && (
        <section className="advanced-results">
          <ResultsView params={params} prefs={prefs} sort={sort} basePath="/advanced" />
        </section>
      )}
    </div>
  );
}
