import Link from "next/link";
import CarPhoto from "@/components/CarPhoto";
import ResultsView from "@/components/ResultsView";
import ScoreRing from "@/components/ScoreRing";
import SearchForm from "@/components/SearchForm";
import Pricing from "@/components/Pricing";
import { usd } from "@/lib/budget";
import { BODY_LABELS, CARS, type BodyStyle } from "@/lib/cars";
import type { RawParams } from "@/lib/loosen";
import { DEFAULT_SORT, rankCars } from "@/lib/match";
import { hasSearch, parsePreferences, parseSort } from "@/lib/params";
import { photoFor } from "@/lib/photos";
import { CONDITION_LABELS, CONDITIONS } from "@/lib/pricing";

const BRAND_COUNT = new Set(CARS.map((car) => car.make)).size;

const STEPS = [
  { title: "Tell us what you need", body: "New, used or certified pre-owned, plus budget, seats, fuel type, body style, and how you drive." },
  { title: "We score every car", body: `Every trim of our ${CARS.length} models is checked against your needs, and each model gets a 0–100 score.` },
  { title: "See your best matches", body: "Ranked results with clear reasons and honest trade-offs for each car." },
];

/** A real search, so the hero shows what the site actually returns for it. */
const EXAMPLE_SEARCH = { condition: ["used", "new"], range: "30-60", seats: "5", usage: "family" };
const EXAMPLE_HREF = "/?condition=used&condition=new&range=30-60&seats=5&usage=family";

/** One car per tile, each linking to everything in that body style. The order is alphabetical by label. */
const BODY_TILES: { body: BodyStyle; carId: string; plural: string }[] = [
  { body: "coupe", carId: "ford-mustang", plural: "Coupes and sports cars" },
  { body: "truck", carId: "ford-f-150", plural: "Pickup trucks" },
  { body: "sedan", carId: "honda-accord", plural: "Sedans" },
  { body: "suv", carId: "toyota-rav4-hybrid", plural: "SUVs" },
];

function HeroExample() {
  const example = rankCars(parsePreferences(EXAMPLE_SEARCH), DEFAULT_SORT).matches[0];
  if (!example) return null;
  const name = `${example.car.make} ${example.car.model}`;
  return (
    <aside className="hero-example" aria-label="Example result">
      <CarPhoto name={name} bodyLabel={BODY_LABELS[example.car.body]} photo={photoFor(example.car.id)} rank={1} />
      <div className="hero-example-body">
        <div className="result-top">
          <div className="result-heading">
            <p className="hero-example-label">Real example: family of 5, $30–60k, used or new</p>
            <h2>{name}</h2>
            <p className="recommended-trim">
              Recommended trim: <strong>{example.trim.name}</strong>
            </p>
            <p className="hero-example-price">
              {usd(example.price)}
              {example.condition !== "new" && <span className="price-est">est.</span>}{" "}
              <span className="price-base">{CONDITION_LABELS[example.condition]}</span>
            </p>
          </div>
          <ScoreRing score={example.score} />
        </div>
        <Link href={EXAMPLE_HREF} className="hero-example-link">
          See this full results list →
        </Link>
      </div>
    </aside>
  );
}

function BodyStrip() {
  return (
    <section className="section section-tight" aria-labelledby="body-strip-title">
      <div className="container">
        <h2 id="body-strip-title" className="section-title">
          Start with the kind of car you picture
        </h2>
        <p className="section-sub">Then narrow it down to what you need.</p>
        <ul className="body-strip">
          {BODY_TILES.map(({ body, carId, plural }) => {
            const car = CARS.find((c) => c.id === carId);
            if (!car) return null;
            const name = `${car.make} ${car.model}`;
            return (
              <li key={body} className="body-tile">
                <Link
                  href={`/advanced?condition=used&condition=cpo&condition=new&range=any&seats=1&usage=any&body=${body}`}
                  className="body-tile-link"
                >
                  {plural} →
                </Link>
                <p className="body-tile-car">Shown: {name}</p>
                <CarPhoto name={name} bodyLabel={BODY_LABELS[body]} photo={photoFor(carId)} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function YourCarYourRules() {
  return (
    <section className="section section-tight" aria-labelledby="unbiased-title">
      <div className="container unbiased">
        <div className="unbiased-claim">
          <h2 id="unbiased-title">An unbiased car search, built around you.</h2>
          <p>No sponsored rankings. No dealer or manufacturer pays for placement. Your needs decide the order.</p>
        </div>
        <div className="personal-ways">
          <Link href="/advanced" className="personal-way">
            <h3>Pick your must-haves</h3>
            <p className="muted">
              Check the features you won&rsquo;t give up, then set limits for horsepower, towing, cargo, MPG and more.
            </p>
            <span className="personal-way-cta">Open Advanced Search →</span>
          </Link>
          <Link href="/advisor" className="personal-way">
            <h3>Tell us what matters</h3>
            <p className="muted">
              Describe your life in your own words: the commute, the kids, the dog, the weekend trips. The AI Advisor
              suggests cars that fit and explains why.
            </p>
            <span className="personal-way-cta">Talk to the AI Advisor →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function Home({ searchParams }: { searchParams: Promise<RawParams> }) {
  const params = await searchParams;

  if (hasSearch(params)) {
    const prefs = parsePreferences(params);
    const sort = parseSort(params);
    return (
      <>
        <div className="container results-page">
          <ResultsView params={params} prefs={prefs} sort={sort} basePath="/" />
          <section className="section">
            <div className="narrow">
              <h2 className="section-title">Refine your search</h2>
              <div className="card">
                {/* Remounts the form after each search so its fields match the URL. */}
                <SearchForm key={JSON.stringify(params)} initial={prefs} sort={sort} />
              </div>
            </div>
          </section>
        </div>
        <Pricing />
      </>
    );
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Unbiased car matching</span>
            <h1>
              Find <em>your perfect car</em>, ranked by what matters to you.
            </h1>
            <p className="lead">
              Tell us what you need, new, used or certified pre-owned. CarMatch AI ranks the best matches and recommends
              the right trim for each, with a match score, the reasons behind it, and how much you could save versus
              buying new.
            </p>
            <a href="#search" className="button button-signal button-lg">
              Start matching
            </a>
            <p className="hero-promise">No sponsored rankings. Your needs decide the order.</p>
            <dl className="hero-stats">
              <div>
                <dd>{CARS.length}</dd>
                <dt>models</dt>
              </div>
              <div>
                <dd>{BRAND_COUNT}</dd>
                <dt>brands</dt>
              </div>
              <div>
                <dd>{CONDITIONS.length}</dd>
                <dt>conditions</dt>
              </div>
            </dl>
            <p className="creator">
              Created by <strong>Dylan Andersen</strong>
            </p>
          </div>
          <HeroExample />
        </div>
      </section>

      <BodyStrip />
      <YourCarYourRules />

      <section className="section section-tight">
        <div className="container steps">
          {STEPS.map((step, i) => (
            <div key={step.title} className="step">
              <span className="step-num">{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p className="muted">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="search" className="section">
        <div className="container narrow">
          <h2 className="section-title">What do you need in a car?</h2>
          <p className="section-sub">Answer a few questions. It takes under a minute.</p>
          <div className="card">
            <SearchForm />
          </div>
        </div>
      </section>

      <Pricing />
    </>
  );
}
