import SearchForm from "@/components/SearchForm";
import Pricing from "@/components/Pricing";
import { CARS } from "@/lib/cars";

const BRAND_COUNT = new Set(CARS.map((car) => car.make)).size;
const prices = CARS.map((car) => car.price);
const CHEAPEST_K = Math.floor(Math.min(...prices) / 1000);
const PRICIEST_K = Math.floor(Math.max(...prices) / 1000);

const STEPS = [
  { title: "Tell us what you need", body: "Budget, seats, fuel type, body style, how you drive, and your must-haves." },
  { title: "We score every car", body: `Each of our ${CARS.length} models is scored from 0–100 against your needs.` },
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
            CarMatch AI compares {CARS.length} new cars from {BRAND_COUNT} brands, from {`$${CHEAPEST_K}k`} commuters
            to {`$${PRICIEST_K}k`} supercars, against what you need and ranks the best matches, each with a match score and the reasons
            behind it.
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
