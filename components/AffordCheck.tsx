"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

// "Can I afford it?" for one car. The common 20/4/10 guideline says total car
// costs (loan, insurance, fuel, upkeep) should stay under about 10% of gross
// income. Estimates for planning only, not financial advice.

const usd = (n: number) => `$${Math.round(Math.max(0, n)).toLocaleString("en-US")}`;
const TERMS = [36, 48, 60, 72];
const COMFORTABLE = 0.1;
const STRETCH = 0.15;
const STORAGE_KEY = "carmatch-afford";

interface Inputs {
  income: string;
  down: string;
  term: number;
  apr: string;
}

/** Monthly payment on a loan, by the standard amortization formula. */
function payment(principal: number, aprPercent: number, months: number): number {
  if (principal <= 0) return 0;
  const r = aprPercent / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - (1 + r) ** -months);
}

/** The loan a monthly payment can cover: the formula above, solved for principal. */
function principalFor(monthly: number, aprPercent: number, months: number): number {
  if (monthly <= 0) return 0;
  const r = aprPercent / 100 / 12;
  if (r === 0) return monthly * months;
  return (monthly * (1 - (1 + r) ** -months)) / r;
}

export default function AffordCheck({
  carName,
  trimName,
  conditionLabel,
  price,
  runningMonthly,
  salesTax,
  docFee,
}: {
  carName: string;
  trimName: string;
  conditionLabel: string;
  price: number;
  /** Fuel or charging, maintenance, insurance and registration, per month. */
  runningMonthly: number;
  salesTax: number;
  docFee: number;
}) {
  const fieldId = useId();
  const [inputs, setInputs] = useState<Inputs>({ income: "", down: String(Math.round((price * 0.2) / 500) * 500), term: 60, apr: "7" });

  // Remember income, term and rate across car pages, on this device only.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<Inputs> | null;
      if (saved) setInputs((current) => ({ ...current, income: saved.income ?? "", term: saved.term ?? current.term, apr: saved.apr ?? current.apr }));
    } catch {
      // Storage can be unavailable (private mode). The calculator still works.
    }
  }, []);
  const update = (patch: Partial<Inputs>) =>
    setInputs((current) => {
      const next = { ...current, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ income: next.income, term: next.term, apr: next.apr }));
      } catch {
        // Ignore: remembering inputs is only a convenience.
      }
      return next;
    });

  const income = Number(inputs.income.replace(/[^0-9.]/g, "")) || 0;
  const down = Math.min(Number(inputs.down.replace(/[^0-9.]/g, "")) || 0, price * 2);
  const apr = Math.min(Math.max(Number(inputs.apr) || 0, 0), 40);
  const outTheDoor = price * (1 + salesTax) + docFee;
  const financed = Math.max(0, outTheDoor - down);
  const loan = payment(financed, apr, inputs.term);
  const total = loan + runningMonthly;
  const monthlyIncome = income / 12;
  const share = monthlyIncome > 0 ? total / monthlyIncome : null;

  // The most car that fits 10% at these settings.
  const loanRoom = monthlyIncome * COMFORTABLE - runningMonthly;
  const maxPrice = loanRoom > 0 ? (principalFor(loanRoom, apr, inputs.term) + down - docFee) / (1 + salesTax) : 0;
  // Used and certified pre-owned too: that's where most cars at a tighter budget are.
  const budgetLink = `/advanced?range=any&budget=${Math.max(5000, Math.floor(maxPrice / 500) * 500)}&condition=used&condition=cpo&condition=new`;

  const verdict =
    share === null
      ? null
      : share <= COMFORTABLE
        ? { tone: "good", title: "Comfortable", text: "This fits within the common guideline of keeping car costs under 10% of income." }
        : share <= STRETCH
          ? { tone: "fair", title: "A stretch", text: "Doable, but above the 10% guideline. A bigger down payment or a used example would help." }
          : { tone: "warn", title: "Hard to afford", text: "Well above the 10% guideline. Consider a cheaper trim, used, or a different car." };

  return (
    <section className="afford" aria-labelledby={`${fieldId}-title`}>
      <h2 id={`${fieldId}-title`}>Can I afford it?</h2>
      <p className="field-hint">
        For the {carName.endsWith(trimName) ? carName : `${carName} ${trimName}`}, {conditionLabel.toLowerCase()}, at{" "}
        {usd(price)}. Your answers stay on this device.
      </p>
      <div className="form-grid afford-inputs">
        <label className="field">
          <span className="field-label">Yearly income, before tax</span>
          <input
            inputMode="numeric"
            placeholder="e.g. 65,000"
            value={inputs.income}
            onChange={(e) => update({ income: e.target.value })}
          />
        </label>
        <label className="field">
          <span className="field-label">Down payment</span>
          <input inputMode="numeric" value={inputs.down} onChange={(e) => update({ down: e.target.value })} />
        </label>
        <label className="field">
          <span className="field-label">Loan length</span>
          <select value={inputs.term} onChange={(e) => update({ term: Number(e.target.value) })}>
            {TERMS.map((months) => (
              <option key={months} value={months}>
                {months / 12} years
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field-label">Interest rate (APR %)</span>
          <input inputMode="decimal" value={inputs.apr} onChange={(e) => update({ apr: e.target.value })} />
        </label>
      </div>

      <dl className="afford-breakdown">
        <div>
          <dt>Price with tax and fees</dt>
          <dd>{usd(outTheDoor)}</dd>
        </div>
        <div>
          <dt>Loan payment</dt>
          <dd>{usd(loan)}/mo</dd>
        </div>
        <div>
          <dt>Fuel, insurance and upkeep</dt>
          <dd>{usd(runningMonthly)}/mo</dd>
        </div>
        <div className="afford-total">
          <dt>Total car cost</dt>
          <dd>{usd(total)}/mo</dd>
        </div>
      </dl>

      {verdict && share !== null ? (
        <div className={`afford-verdict afford-${verdict.tone}`} role="status">
          <strong>
            {verdict.title}: {(Math.round(share * 1000) / 10).toLocaleString("en-US")}% of your income
          </strong>
          <p>{verdict.text}</p>
          {share > COMFORTABLE &&
            (maxPrice >= 5000 ? (
              <p>
                With these settings, a car around <strong>{usd(maxPrice)}</strong> fits the 10% guideline.{" "}
                <Link href={budgetLink}>See cars under {usd(Math.floor(maxPrice / 500) * 500)} →</Link>
              </p>
            ) : (
              <p>At this income, running costs alone take most of the 10% guideline, so a lower-cost used car is the safest bet.</p>
            ))}
        </div>
      ) : (
        <p className="muted">Enter your yearly income to see how this car fits your budget.</p>
      )}
      <p className="field-hint">
        Estimates for planning, not financial advice. Your real rate depends on your credit, and tax and fees vary by
        state.
      </p>
    </section>
  );
}
