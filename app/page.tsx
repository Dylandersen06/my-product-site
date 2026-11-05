import SearchForm from "@/components/SearchForm";
import Pricing from "@/components/Pricing";
import { CARS } from "@/lib/cars";

const BRAND_COUNT = new Set(CARS.map((car) => car.make)).size;

const STEPS = [
  { title: "Tell us what you need", body: "New, used or certified pre-owned, plus budget, seats, fuel type, body style, how you drive, and your must-haves." },
  { title: "We score every car", body: `Every trim of our ${CARS.length} models is checked against your needs, and each model gets a 0–100 score.` },
  { title: "See your best matches", body: "Ranked results with clear reasons and honest trade-offs for each car." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Car shopping, simplified</span>
          <h1>Find the car that actually fits your life.</h1>
          <p className="lead">
            CarMatch AI compares {CARS.length} models from {BRAND_COUNT} brands, new, used or certified pre-owned,
            against what you need. It ranks the best matches and recommends the right trim for each, with a match score,
            the reasons behind it, and how much you could save versus buying new.
          </p>
          <a href="#search" className="button button-primary button-lg">
            Start matching
          </a>
          <p className="creator">
            Created by <strong>Dylan Andersen</strong>
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container steps">
          {STEPS.map((step, i) => (
            <div key={step.title} className="step">
              <span className="step-num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p className="muted">{step.body}</p>
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
