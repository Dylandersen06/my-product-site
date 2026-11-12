import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AffordCheck from "@/components/AffordCheck";
import BackLink from "@/components/BackLink";
import CarPhoto from "@/components/CarPhoto";
import CostToOwnCard from "@/components/CostToOwnCard";
import MilesControl from "@/components/MilesControl";
import CarColors from "@/components/CarColors";
import OfficialData from "@/components/OfficialData";
import PriceComparison from "@/components/PriceComparison";
import SaveCarButtons from "@/components/SaveCarButtons";
import SpecStrip from "@/components/SpecStrip";
import TrimList from "@/components/TrimList";
import { BODY_LABELS, CARS, FUEL_LABELS, carDetailsHref } from "@/lib/cars";
import type { RawParams } from "@/lib/loosen";
import { DOC_FEE, SALES_TAX, YEARS, costToOwn } from "@/lib/ownership";
import { parsePreferences } from "@/lib/params";
import { photoFor } from "@/lib/photos";
import { CONDITIONS, CONDITION_LABELS, type Condition } from "@/lib/pricing";
import { viewerSaved } from "@/lib/saved-cars";

const findCar = (id: string) => CARS.find((car) => car.id === id);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const car = findCar((await params).id);
  return { title: `${car ? `${car.make} ${car.model}` : "Car not found"} | CarMatch AI by Dylan Andersen` };
}

export default async function CarPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<RawParams>;
}) {
  const { id } = await params;
  const car = findCar(id);
  if (!car) notFound();

  const query = await searchParams;
  const trim = car.trims.find((t) => t.name === query.trim) ?? car.trims[0];
  const condition: Condition = CONDITIONS.find((c) => c === query.condition) ?? "new";
  const { milesPerYear } = parsePreferences(query);
  const match = { car, trim, condition, ownership: costToOwn(car, trim, condition, milesPerYear) };
  const name = `${car.make} ${car.model}`;
  const saved = await viewerSaved();

  return (
    <div className="container results-page">
      <BackLink />
      <article className="result-card car-detail">
        <div className="result-media">
          <CarPhoto name={name} bodyLabel={BODY_LABELS[car.body]} photo={photoFor(car.id)} />
        </div>
        <div className="result-body">
          <h1 className="car-detail-title">{name}</h1>
          <p className="recommended-trim">
            Trim: <strong>{trim.name}</strong>
          </p>
          <p className="result-specs">
            {BODY_LABELS[car.body]} · {FUEL_LABELS[car.fuel]} · {car.seats} seats · {trim.cargoCuFt} cu ft cargo
          </p>
          <p className="result-specs">
            {trim.engine} · {trim.drivetrain} · {trim.transmission}
          </p>
          <SpecStrip trim={trim} />
          {saved && (
            <SaveCarButtons
              carId={car.id}
              carName={name}
              trim={trim.name}
              condition={condition}
              initial={saved.states[car.id]}
              signedIn={saved.signedIn}
              returnTo={carDetailsHref(car.id, trim.name, condition)}
            />
          )}
        </div>
        <div className="result-foot">
          <PriceComparison match={match} conditions={[condition]} />
          <MilesControl params={query} basePath={`/cars/${car.id}`} miles={milesPerYear} />
          <div className="disclosures">
            <CostToOwnCard match={match} milesPerYear={milesPerYear} open />
            <TrimList match={match} conditions={[condition]} open />
          </div>
          <AffordCheck
            carName={name}
            trimName={trim.name}
            conditionLabel={CONDITION_LABELS[condition]}
            price={trim.prices[condition]}
            runningMonthly={
              (match.ownership.fuel + match.ownership.insurance + match.ownership.maintenance) / (YEARS * 12)
            }
            salesTax={SALES_TAX}
            docFee={DOC_FEE}
          />
          <p className="estimate-note">
            <strong>Used and certified pre-owned prices and all cost figures are estimates</strong>, not live listings or
            quotes. Check local listings and confirm details with a dealer.
          </p>
          <CarColors car={car} />
          <OfficialData car={car} />
        </div>
      </article>
    </div>
  );
}
