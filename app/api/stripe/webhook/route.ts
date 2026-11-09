import type Stripe from "stripe";
import { getStripe, grantFromCheckout, syncSubscription } from "@/lib/billing";

export const dynamic = "force-dynamic";

/** Stripe calls this after payments and subscription changes. Every event is signature-checked. */
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return new Response("Payments aren't set up.", { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature.", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return new Response("Bad signature.", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await grantFromCheckout(event.data.object);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await syncSubscription(event.data.object);
        break;
    }
  } catch (error) {
    // A 500 makes Stripe retry later.
    console.error("webhook failed", event.type, error instanceof Error ? error.message : error);
    return new Response("Couldn't process the event.", { status: 500 });
  }
  return Response.json({ received: true });
}
