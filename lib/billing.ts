import "server-only";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { OFFERS, type PlanKey } from "./plan";

// Stripe Checkout takes the payment, then a webhook (and, as a backup, the
// return page) records what was bought on the shopper's Clerk account. Every
// grant is idempotent, so running it twice for one payment changes nothing.

const PASS_HOURS = 24;

let stripe: Stripe | null = null;

/** The Stripe client, or null when payments aren't set up yet. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  stripe ??= new Stripe(key, { maxNetworkRetries: 1, timeout: 20_000 });
  return stripe;
}

export const isOffer = (value: unknown): value is PlanKey => value === "pass" || value === "monthly";

/** A Stripe Checkout page for one of the offers. */
export async function createCheckout(
  stripe: Stripe,
  kind: PlanKey,
  user: { id: string; email: string | null; stripeCustomerId: string | null },
  origin: string,
): Promise<string> {
  const offer = OFFERS[kind];
  const session = await stripe.checkout.sessions.create({
    mode: kind === "monthly" ? "subscription" : "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: offer.cents,
          product_data: { name: `CarMatch AI ${offer.name}` },
          ...(kind === "monthly" ? { recurring: { interval: "month" as const } } : {}),
        },
      },
    ],
    client_reference_id: user.id,
    metadata: { userId: user.id, kind },
    ...(kind === "monthly" ? { subscription_data: { metadata: { userId: user.id } } } : {}),
    ...(user.stripeCustomerId
      ? { customer: user.stripeCustomerId }
      : { customer_email: user.email ?? undefined, ...(kind === "pass" ? { customer_creation: "always" as const } : {}) }),
    success_url: `${origin}/account?checkout={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/advisor?checkout=cancelled`,
  });
  if (!session.url) throw new Error("Stripe didn't return a checkout URL.");
  return session.url;
}

const idOf = (value: string | { id: string } | null | undefined) =>
  typeof value === "string" ? value : (value?.id ?? null);

/**
 * Records a completed checkout on the buyer's account. Returns what was granted,
 * or null if the session isn't a paid CarMatch purchase for that user.
 */
export async function grantFromCheckout(session: Stripe.Checkout.Session, expectedUserId?: string): Promise<PlanKey | null> {
  const userId = session.metadata?.userId ?? session.client_reference_id;
  const kind = session.metadata?.kind;
  if (!userId || !isOffer(kind)) return null;
  if (expectedUserId && userId !== expectedUserId) return null;
  const paid = session.status === "complete" && (session.payment_status === "paid" || session.payment_status === "no_payment_required");
  if (!paid) return null;

  const clerk = await clerkClient();
  const customerId = idOf(session.customer);
  const privateMetadata = {
    ...(customerId ? { stripeCustomerId: customerId } : {}),
    ...(kind === "monthly" ? { stripeSubscriptionId: idOf(session.subscription) } : {}),
  };

  if (kind === "monthly") {
    await clerk.users.updateUserMetadata(userId, { publicMetadata: { plan: "monthly" }, privateMetadata });
    return "monthly";
  }

  // A pass runs 24 hours from purchase. Keyed to the purchase time, so applying
  // the same payment again gives the same end time.
  const user = await clerk.users.getUser(userId);
  const fromThisPurchase = new Date(session.created * 1000 + PASS_HOURS * 3600 * 1000);
  const current = typeof user.publicMetadata.passUntil === "string" ? new Date(user.publicMetadata.passUntil) : null;
  const passUntil = current && current > fromThisPurchase ? current : fromThisPurchase;
  await clerk.users.updateUserMetadata(userId, { publicMetadata: { passUntil: passUntil.toISOString() }, privateMetadata });
  return "pass";
}

/** Keeps the monthly plan in step with the Stripe subscription. */
export async function syncSubscription(subscription: Stripe.Subscription): Promise<void> {
  const userId = subscription.metadata?.userId;
  if (!userId) return;
  const active = subscription.status === "active" || subscription.status === "trialing" || subscription.status === "past_due";
  const clerk = await clerkClient();
  await clerk.users.updateUserMetadata(userId, {
    // null removes the key in Clerk's metadata merge.
    publicMetadata: { plan: active ? "monthly" : null },
    privateMetadata: { stripeSubscriptionId: active ? subscription.id : null },
  });
}
