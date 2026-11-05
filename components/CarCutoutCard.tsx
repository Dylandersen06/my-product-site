import Link from "next/link";
import type { ReactNode } from "react";
import { usd } from "@/lib/budget";
import { BODY_LABELS, FUEL_LABELS, carDetailsHref, towingText, type Car, type Trim } from "@/lib/cars";
import { DEFAULT_MILES_PER_YEAR, costToOwn } from "@/lib/ownership";
import { photoFor } from "@/lib/photos";
import { CONDITIONS, CONDITION_LABELS, type Condition } from "@/lib/pricing";

/**
 * A car's photo in a cream frame, with no text until it's pressed, which opens
 * its specs and prices. Uses a native details element, so it works with a
 * keyboard and without JavaScript.
 */
export default function CarCutoutCard({
  car,
  trim,
  condition = "new",
  children,
}: {
  car: Car;
  trim: Trim;
  condition?: Condition;
  /** Extra content at the top or bottom of the opened panel. */
  children?: ReactNode;
}) {
  const name = `${car.make} ${car.model}`;
  const photo = photoFor(car.id);
  const cost = costToOwn(car, trim, condition, DEFAULT_MILES_PER_YEAR);

  return (
    <div className="cutout-card">
      <details className="cutout-details">
        <summary className="cutout-summary">
          {/* Plain img: photos stay hosted on Wikimedia Commons, with no optimization proxy. */}
          {photo ? (
            <img className="cutout-img" src={photo.url} alt={name} loading="lazy" decoding="async" />
          ) : (
            <span className="cutout-img cutout-missing">{name}</span>
          )}
          <span className="cutout-hint">
            <span className="sr-only">Show specs and prices for the {name}</span>
            <span aria-hidden="true" className="cutout-hint-icon" />
          </span>
        </summary>
        <div className="cutout-panel">
          <h3>{name}</h3>
          <p className="recommended-trim">
            Trim: <strong>{trim.name}</strong>
          </p>
          <ul className="cutout-prices" aria-label="Price by condition">
            {CONDITIONS.map((c) => (
              <li key={c} className={c === condition ? "selected" : undefined}>
                <span>
                  {CONDITION_LABELS[c]}
                  {c !== "new" && " (est.)"}
                </span>
                <strong>{usd(trim.prices[c])}</strong>
              </li>
            ))}
          </ul>
          <dl className="cutout-specs">
            <div>
              <dt>Type</dt>
              <dd>
                {BODY_LABELS[car.body]}, {FUEL_LABELS[car.fuel].toLowerCase()}, {car.seats} seats
              </dd>
            </div>
            <div>
              <dt>Engine</dt>
              <dd>
                {trim.engine}, {trim.hp} hp
              </dd>
            </div>
            <div>
              <dt>0–60 mph</dt>
              <dd>{trim.zero60}s</dd>
            </div>
            <div>
              <dt>MPG / range</dt>
              <dd>{trim.economy}</dd>
            </div>
            <div>
              <dt>Drivetrain</dt>
              <dd>{trim.drivetrain}</dd>
            </div>
            <div>
              <dt>Towing</dt>
              <dd>{towingText(trim.towingLbs)}</dd>
            </div>
            <div>
              <dt>5-year cost (est.)</dt>
              <dd>
                {usd(cost.total)}, {CONDITION_LABELS[condition].toLowerCase()}
              </dd>
            </div>
          </dl>
          <Link href={carDetailsHref(car.id, trim.name, condition)} className="button button-outline cutout-link">
            View details
          </Link>
          {children}
        </div>
      </details>
      {photo && (
        <p className="photo-credit cutout-credit">
          Photo:{" "}
          <a href={photo.source} target="_blank" rel="noopener noreferrer">
            {photo.artist}
          </a>{" "}
          ·{" "}
          {photo.licenseUrl ? (
            <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer license">
              {photo.license}
            </a>
          ) : (
            photo.license
          )}{" "}
          · Wikimedia Commons. Year and trim may differ.
        </p>
      )}
    </div>
  );
}
