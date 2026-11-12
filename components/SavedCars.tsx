import Link from "next/link";
import CarPhoto from "@/components/CarPhoto";
import SaveCarButtons from "@/components/SaveCarButtons";
import { usd } from "@/lib/budget";
import { BODY_LABELS, CARS, carDetailsHref } from "@/lib/cars";
import { photoFor } from "@/lib/photos";
import { CONDITIONS, CONDITION_LABELS, type Condition } from "@/lib/pricing";
import type { SavedCar } from "@/lib/saved-cars";
import { SAVED_LISTS, type SavedList, type SavedState } from "@/lib/saved-lists";

/** The account page's saved cars: one section per list, newest first. */
export default function SavedCars({ saved }: { saved: SavedCar[] }) {
  const states: Record<string, SavedState> = {};
  for (const row of saved) {
    states[row.carId] ??= { favorite: false, interested: false };
    states[row.carId][row.list] = true;
  }

  return (
    <section className="saved-cars" aria-labelledby="saved-cars-heading">
      <h2 id="saved-cars-heading">Your saved cars</h2>
      <p className="muted">
        Tap {SAVED_LISTS.favorite.empty} Favorite or {SAVED_LISTS.interested.empty} Interested on any car to keep it here.
      </p>
      {(Object.keys(SAVED_LISTS) as SavedList[]).map((list) => {
        const rows = saved.filter((r) => r.list === list);
        return (
          <div key={list} className="saved-list">
            <h3>
              <span aria-hidden="true">{SAVED_LISTS[list].icon}</span> {SAVED_LISTS[list].heading}{" "}
              <span className="saved-count">({rows.length})</span>
            </h3>
            {rows.length === 0 ? (
              <p className="muted saved-empty">
                Nothing here yet.{" "}
                <Link href="/#search">Find cars to {list === "favorite" ? "favorite" : "consider"}</Link>.
              </p>
            ) : (
              <ul className="saved-grid">
                {rows.map((row) => (
                  <SavedCarCard key={row.carId} row={row} state={states[row.carId]} />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
}

function SavedCarCard({ row, state }: { row: SavedCar; state: SavedState }) {
  const car = CARS.find((c) => c.id === row.carId);
  if (!car) return null; // a car that's since left the catalog
  const trim = car.trims.find((t) => t.name === row.trim) ?? car.trims[0];
  const condition: Condition = CONDITIONS.find((c) => c === row.condition) ?? "new";
  const name = `${car.make} ${car.model}`;
  const href = carDetailsHref(car.id, trim.name, condition);
  return (
    <li className="saved-card">
      <Link href={href} className="saved-photo-link" aria-label={`View ${name}`}>
        <CarPhoto name={name} bodyLabel={BODY_LABELS[car.body]} photo={photoFor(car.id)} />
      </Link>
      <div className="saved-card-body">
        <h4>
          <Link href={href}>{name}</Link>
        </h4>
        <p className="muted">
          {trim.name} · {CONDITION_LABELS[condition]} · about {usd(trim.prices[condition])}
        </p>
        <SaveCarButtons
          carId={car.id}
          carName={name}
          trim={trim.name}
          condition={condition}
          initial={state}
          signedIn
          returnTo="/account"
        />
      </div>
    </li>
  );
}
