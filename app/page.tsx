import Link from "next/link";
import { Show } from "@clerk/nextjs";
import CarCutoutCard, { PhotoCredits } from "@/components/CarCutoutCard";
import ResultsView from "@/components/ResultsView";
import SearchForm from "@/components/SearchForm";
import { CARS, type BodyStyle } from "@/lib/cars";
import type { RawParams } from "@/lib/loosen";
import { DEFAULT_SORT, rankCars } from "@/lib/match";
import { hasSearch, parsePreferences, parseSort } from "@/lib/params";
import { SAVED_LISTS } from "@/lib/saved-lists";

const BRAND_COUNT = new Set(CARS.map((car) => car.make)).size;

const STEPS = [
  { title: "Tell us what you need", body: "New, used or certified pre-owned, plus budget, seats, fuel type, body style, and how you drive." },
  { title: "We score every car", body: `Every trim of our ${CARS.length} models is checked against your needs, and each model gets a 0–100 score.` },
  { title: "See your best matches", body: "Ranked results with clear reasons and honest trade-offs for each car." },
];

/** A real search, so the hero shows what the site actually returns for it. */
const EXAMPLE_SEARCH = { condition: "new", budget: "150000", seats: "4", body: "coupe", usage: "performance" };
const EXAMPLE_HREF = "/?condition=new&budget=150000&seats=4&body=coupe&usage=performance";

/** One car per tile, each linking to everything in that body style. Each is a different brand, cheapest first. */
const BODY_TILES: { body: BodyStyle; carId: string; plural: string }[] = [
  { body: "truck", carId: "toyota-tacoma", plural: "pickup trucks" },
  { body: "suv", carId: "ford-explorer", plural: "SUVs" },
  { body: "coupe", carId: "bentley-continental-gt", plural: "coupes and sports cars" },
  { body: "sedan", carId: "rolls-royce-phantom", plural: "sedans" },
];

const heroExample = () => rankCars(parsePreferences(EXAMPLE_SEARCH), DEFAULT_SORT).matches[0];

/** Every car pictured on the homepage, for the photo credits. */
const homepageCars = () => [
  ...[heroExample()?.car].filter((c) => c !== undefined),
  ...BODY_TILES.flatMap(({ carId }) => CARS.filter((c) => c.id === carId)),
];

function HeroExample() {
  const example = heroExample();
  if (!example) return null;
  return (
    <aside className="hero-example" aria-label="Example result">
      <CarCutoutCard car={example.car} trim={example.trim} condition={example.condition}>
        <p className="hero-example-label">
          Real example: new sports car for 4, up to $150,000. Match score: {example.score}.
        </p>
        <Link href={EXAMPLE_HREF} className="hero-example-link">
          See this full results list →
        </Link>
      </CarCutoutCard>
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
        <p className="section-sub">Tap a car for its specs and prices.</p>
        <ul className="body-strip">
          {BODY_TILES.map(({ body, carId, plural }) => {
            const car = CARS.find((c) => c.id === carId);
            if (!car) return null;
            return (
              <li key={body} className="body-tile">
                <CarCutoutCard car={car} trim={car.trims[0]}>
                  <Link
                    href={`/advanced?condition=used&condition=cpo&condition=new&range=any&seats=1&usage=any&body=${body}`}
                    className="body-tile-link"
                  >
                    See all {plural} →
                  </Link>
                </CarCutoutCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function SaveFavorites() {
  const fav = SAVED_LISTS.favorite;
  const maybe = SAVED_LISTS.interested;
  return (
    <section className="section section-tight" aria-labelledby="favorites-title">
      <div className="container">
        <div className="save-note">
          <h2 id="favorites-title" className="save-note-title">
            <span aria-hidden="true">{fav.icon}</span> Keep a shortlist
          </h2>
          <dl className="save-note-list">
            <div>
              <dt>
                {fav.empty} {fav.label}
              </dt>
              <dd>The cars you love. Tap the heart on any result or car page, and tap it again to take it off.</dd>
            </div>
            <div>
              <dt>
                {maybe.empty} {maybe.label}
              </dt>
              <dd>The maybes, while you compare.</dd>
            </div>
            <div>
              <dt>Where they go</dt>
              <dd>
                Your account, on any device. Log in first and you&rsquo;ll land right back on the car.{" "}
                <Link href="/account">See your saved cars</Link>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Right under the car photos: a sign-up button. Plans and prices live on the pricing page. */
function JoinCta() {
  return (
    <Show when="signed-out">
      <section className="section section-tight join-cta" aria-labelledby="join-title">
        <div className="container join-cta-inner">
          <h2 id="join-title" className="section-title">
            Save cars and unlock the AI advisor
          </h2>
          <p className="section-sub">
            Searching is free. An account lets you keep favorites and pick a plan.{" "}
            <Link href="/pricing">See plans</Link>
          </p>
          <Link href="/sign-up" className="button button-signal button-lg">
            Create an account
          </Link>
        </div>
      </section>
    </Show>
  );
}

function YourCarYourRules() {
  return (
    <section className="section section-tight" aria-labelledby="unbiased-title">
      <div className="container unbiased">
        <div className="unbiased-claim">
          <h2 id="unbiased-title">An unbiased car search, built around you.</h2>
          <p>No sponsored rankings. We&rsquo;re independently funded, with no outside bias. Your needs decide the order.</p>
        </div>
        <div className="personal-ways">
          <Link href="/advanced" className="personal-way">
            <h3>Pick your must-haves</h3>
            <p className="muted">
              Check the features you won&rsquo;t give up, then set limits for horsepower, towing, cargo, MPG and more.
            </p>
            <span className="personal-way-cta">Open Advanced Search</span>
          </Link>
          <Link href="/advisor" className="personal-way">
            <h3>Tell us what matters</h3>
            <p className="muted">
              Describe your life in your own words: the commute, the kids, the dog, the weekend trips. The AI Advisor
              suggests cars that fit and explains why.
            </p>
            <span className="personal-way-cta">Talk to the AI Advisor</span>
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
      </>
    );
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>The right car for how you actually drive.</h1>
            <p className="lead">
              Tell us your budget, your commute and who rides along. We&rsquo;ll go through {CARS.length} models from{" "}
              {BRAND_COUNT} brands, new, used or certified pre-owned, and show which trim makes sense and why.
            </p>
            <div className="hero-actions">
              <Link href="/advisor" className="button button-signal button-lg">
                Get matched by AI
              </Link>
              <Link href="/snap" className="button button-outline button-lg">
                Snap a car
              </Link>
            </div>
            <p className="hero-promise">No sponsored rankings. Nobody pays to be listed.</p>
          </div>
          <HeroExample />
        </div>
      </section>

      <BodyStrip />
      <JoinCta />
      <YourCarYourRules />
      <SaveFavorites />

      <section className="section section-tight" aria-labelledby="how-it-works-title">
        <div className="container">
          <h2 id="how-it-works-title" className="section-title">
            How it works
          </h2>
          <p className="section-sub">Three steps from what you need to your best matches.</p>
        </div>
        <div className="container steps">
          {STEPS.map((step, i) => (
            <div key={step.title} className="step">
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p className="muted">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-paper" aria-labelledby="about-title">
        <div className="container about">
          <h2 id="about-title" className="section-title">
            Our background
          </h2>
          <blockquote className="about-quote">The most honest car advice you&rsquo;ll find.</blockquote>
          <div className="about-body">
            <p>
              CarMatch was built by <strong>Dylan Andersen</strong>, a mechanical engineering student at PSU who loves
              cars and wants buying one to come with straight answers.
            </p>
            <p>
              No dealer, brand or sponsor pays us, so no car is ranked higher because someone paid for it. Every match
              shows its downsides next to its strengths, and if a cheaper car, a used one or a different brand suits you
              better, that&rsquo;s what we&rsquo;ll tell you.
            </p>
            <p>
              Most people buy a car only a few times in their life, usually with a salesperson doing the explaining.
              Prices and running costs here are clearly marked as estimates, and safety ratings and recalls come
              straight from the government&rsquo;s NHTSA data, so you know what&rsquo;s fact and what&rsquo;s our best
              guess before you walk in.
            </p>
            <p className="about-sign">Dylan Andersen &middot; Mechanical Engineering, PSU</p>
          </div>
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

      <PhotoCredits cars={homepageCars()} />
    </>
  );
}
