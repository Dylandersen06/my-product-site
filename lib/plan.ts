// What a shopper has paid for. Kept on their Clerk account as public metadata,
// which only the server can write, so a shopper can't grant themselves access:
//   { "plan": "monthly" }               an active $4.99/month subscription
//   { "passUntil": "2026-11-10T..." }   a $1.50 24-hour pass, until that time
// The demo account has { "plan": "monthly" }, set by hand in the Clerk dashboard.
//
// Searches are free for everyone. A plan unlocks the AI advisor.

export type PlanKey = "monthly" | "pass";

export const OFFERS = {
  pass: {
    name: "24-hour pass",
    price: "$1.50",
    period: "one time",
    cents: 150,
    blurb: "Try the AI advisor for a day. No subscription.",
    perks: ["Unlimited AI advisor chats for 24 hours", "Snap a car: identify any car from a photo", "Searches stay free"],
  },
  monthly: {
    name: "Monthly",
    price: "$4.99",
    period: "per month",
    cents: 499,
    blurb: "Best value while you shop around. Cancel anytime.",
    perks: ["Unlimited AI advisor chats", "Snap a car: identify any car from a photo", "Cancel anytime from your account"],
  },
} as const;

export interface Access {
  /** True when the shopper can use the AI advisor. */
  advisor: boolean;
  plan: PlanKey | null;
  /** When a 24-hour pass ends, if the shopper has one running. */
  passUntil: Date | null;
}

interface PlanMetadata {
  plan?: unknown;
  passUntil?: unknown;
}

export function accessFrom(metadata: unknown, now = new Date()): Access {
  const m = (metadata ?? {}) as PlanMetadata;
  if (m.plan === "monthly") return { advisor: true, plan: "monthly", passUntil: null };
  const until = typeof m.passUntil === "string" ? new Date(m.passUntil) : null;
  if (until && !Number.isNaN(until.getTime()) && until > now) return { advisor: true, plan: "pass", passUntil: until };
  return { advisor: false, plan: null, passUntil: null };
}

export const formatPassEnd = (date: Date) =>
  date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
