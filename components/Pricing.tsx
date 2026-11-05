import Link from "next/link";

const PLANS = [
  {
    name: "Pay per search",
    price: "$1.50",
    period: "per search",
    blurb: "Perfect when you just need one answer.",
    perks: ["One full ranked results list", "Match score for every car", "Clear reasons and trade-offs"],
    featured: false,
  },
  {
    name: "Monthly",
    price: "$0.50",
    period: "per month",
    blurb: "Best value for comparing options over time.",
    perks: ["Unlimited searches", "Match score for every car", "Clear reasons and trade-offs"],
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <h2 className="section-title">Simple pricing</h2>
        <p className="section-sub">Pick what works for you. No hidden fees.</p>
        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <article key={plan.name} className={`price-card${plan.featured ? " featured" : ""}`}>
              {plan.featured && <span className="badge">Best value</span>}
              <h3>{plan.name}</h3>
              <p className="price">
                {plan.price} <span>{plan.period}</span>
              </p>
              <p className="muted">{plan.blurb}</p>
              <ul>
                {plan.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <Link href="/#search" className={`button ${plan.featured ? "button-primary" : "button-outline"}`}>
                Get started
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
