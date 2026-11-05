import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CarPhoto from "@/components/CarPhoto";
import CostToOwnCard from "@/components/CostToOwnCard";
import MilesControl from "@/components/MilesControl";
import PriceComparison from "@/components/PriceComparison";
import SpecStrip from "@/components/SpecStrip";
import TrimList from "@/components/TrimList";
import { BODY_LABELS, CARS, FUEL_LABELS } from "@/lib/cars";
import type { RawParams } from "@/lib/loosen";
import { costToOwn } from "@/lib/ownership";
import { parsePreferences } from "@/lib/params";
import { photoFor } from "@/lib/photos";
import { CONDITIONS, type Condition } from "@/lib/pricing";

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

  return (
    <div className="container results-page">
      <Link href="/advisor" className="back-link">
        ← Back to the AI Advisor
      </Link>
      <article className="result-card car-detail">
        <CarPhoto name={name} bodyLabel={BODY_LABELS[car.body]} photo={photoFor(car.id)} />
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
          <PriceComparison match={match} conditions={[condition]} />
          <MilesControl params={query} basePath={`/cars/${car.id}`} miles={milesPerYear} />
          <CostToOwnCard match={match} milesPerYear={milesPerYear} />
          <p className="estimate-note">
            <strong>Used and certified pre-owned prices and all cost figures are estimates</strong>, not live listings or
            quotes. Check local listings and confirm details with a dealer.
          </p>
          <TrimList match={match} conditions={[condition]} open />
        </div>
      </article>
    </div>
  );
}
