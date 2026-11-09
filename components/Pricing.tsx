import { CheckoutButton } from "@/components/CheckoutButton";
import { OFFERS, type PlanKey } from "@/lib/plan";

const ORDER: PlanKey[] = ["pass", "monthly"];

/** Plans for the AI advisor. Searches are free, so only the advisor is paid. */
export default function Pricing({ id = "pricing", heading = "Simple pricing" }: { id?: string; heading?: string }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="section-title">{heading}</h2>
        <p className="section-sub">
          Quick Search and Advanced Search are free. A plan unlocks the AI advisor. Payments are handled securely by
          Stripe.
        </p>
        <div className="pricing-grid">
          {ORDER.map((kind) => {
            const plan = OFFERS[kind];
            const featured = kind === "monthly";
            return (
              <article key={kind} className={`price-card${featured ? " featured" : ""}`}>
                {featured && <span className="badge">Best value</span>}
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
                <CheckoutButton kind={kind} className={`button ${featured ? "button-primary" : "button-outline"}`}>
                  {kind === "monthly" ? "Subscribe" : "Buy a 24-hour pass"}
                </CheckoutButton>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
