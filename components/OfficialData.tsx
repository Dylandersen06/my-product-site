import type { Car } from "@/lib/cars";
import {
  NHTSA_RATINGS_URL,
  NHTSA_RECALLS_URL,
  OFFICIAL_FETCHED_ON,
  epaSummary,
  fuelEconomyUrl,
  officialFor,
  overallStars,
} from "@/lib/official";

const stars = (value: string | null) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? `${n} of 5 stars` : "Not rated";
};

/** Compact official facts for a result card. Shows only what's known. */
export function OfficialBadges({ car }: { car: Car }) {
  const rating = overallStars(car.id);
  const epa = epaSummary(car.id);
  const recalls = officialFor(car.id)?.recalls;
  if (rating === null && !epa && !recalls) return null;
  return (
    <ul className="official-badges" aria-label="Official government data">
      {rating !== null && <li>NHTSA {rating}★ overall</li>}
      {epa && <li>EPA {epa}</li>}
      {recalls && (
        <li>
          {recalls.count} recall{recalls.count === 1 ? "" : "s"} ({recalls.year})
        </li>
      )}
    </ul>
  );
}

/** The full official section for a car's details page. */
export default function OfficialData({ car }: { car: Car }) {
  const data = officialFor(car.id);
  if (!data) return null;
  const { epa, safety, recalls } = data;
  const name = `${car.make} ${car.model}`;

  return (
    <section className="official" aria-labelledby="official-title">
      <h2 id="official-title">Official government data</h2>
      <p className="field-hint">
        From the U.S. EPA (FuelEconomy.gov) and NHTSA, fetched {OFFICIAL_FETCHED_ON}. These aren&rsquo;t the
        site&rsquo;s estimates.
      </p>

      <h3>Fuel economy (EPA{epa ? `, ${epa.year}` : ""})</h3>
      {epa ? (
        <div className="official-scroll">
          <table className="official-table">
            <thead>
              <tr>
                <th scope="col">Version</th>
                <th scope="col">Engine</th>
                <th scope="col">Drive</th>
                <th scope="col">{car.fuel === "electric" ? "Range" : "City / hwy / combined"}</th>
              </tr>
            </thead>
            <tbody>
              {epa.configs.map((c) => (
                <tr key={c.epaId}>
                  <td>
                    <a href={fuelEconomyUrl(c.epaId)} target="_blank" rel="noopener noreferrer">
                      {c.name}
                    </a>
                  </td>
                  <td>
                    {c.engine}, {c.transmission}
                  </td>
                  <td>{c.drive}</td>
                  <td>
                    {c.mpg
                      ? `${c.mpg.city} / ${c.mpg.highway} / ${c.mpg.combined} mpg`
                      : `${c.rangeMi ?? "?"} mi, ${c.mpge ?? "?"} MPGe`}
                    {c.electricRangeMi ? `, ${c.electricRangeMi} mi electric` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="muted">{data.epaNote ?? "No EPA record found for this model."}</p>
      )}

      <h3>Crash-test ratings (NHTSA{safety ? `, ${safety.year}` : ""})</h3>
      {safety ? (
        <dl className="official-stars">
          <div>
            <dt>Overall</dt>
            <dd>{stars(safety.overall)}</dd>
          </div>
          <div>
            <dt>Frontal crash</dt>
            <dd>{stars(safety.frontal)}</dd>
          </div>
          <div>
            <dt>Side crash</dt>
            <dd>{stars(safety.side)}</dd>
          </div>
          <div>
            <dt>Rollover</dt>
            <dd>{stars(safety.rollover)}</dd>
          </div>
        </dl>
      ) : (
        <p className="muted">
          NHTSA hasn&rsquo;t published crash ratings we could match for the {name}. Many low-volume and luxury models
          aren&rsquo;t tested.
        </p>
      )}
      {safety?.description && <p className="field-hint">Tested version: {safety.description}.</p>}

      <h3>Safety recalls (NHTSA{recalls ? `, ${recalls.year} models` : ""})</h3>
      {recalls ? (
        recalls.count === 0 ? (
          <p className="muted">No recalls listed for {recalls.year} models.</p>
        ) : (
          <ul className="official-recalls">
            {recalls.items.map((r) => (
              <li key={r.campaign ?? r.summary}>
                <strong>{r.component}</strong>
                {r.date && <span className="field-hint"> · reported {r.date}</span>}
                <p>{/[.!?]$/.test(r.summary.trim()) ? r.summary : `${r.summary.trim()}…`}</p>
              </li>
            ))}
            {recalls.count > recalls.items.length && (
              <li className="field-hint">And {recalls.count - recalls.items.length} more.</li>
            )}
          </ul>
        )
      ) : (
        <p className="muted">We couldn&rsquo;t match this model in NHTSA&rsquo;s recall records.</p>
      )}
      <p className="field-hint">
        A recall applies only to specific vehicles. Check a car&rsquo;s VIN at{" "}
        <a href={NHTSA_RECALLS_URL} target="_blank" rel="noopener noreferrer">
          nhtsa.gov/recalls
        </a>
        , and see all crash ratings at{" "}
        <a href={NHTSA_RATINGS_URL} target="_blank" rel="noopener noreferrer">
          nhtsa.gov/ratings
        </a>
        .
      </p>
    </section>
  );
}
