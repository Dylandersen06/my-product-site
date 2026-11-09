import { currentUser } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/billing";

export const dynamic = "force-dynamic";

/** Opens Stripe's page for managing or cancelling a subscription. */
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) return Response.json({ error: "Payments aren't set up yet." }, { status: 503 });
  const user = await currentUser();
  if (!user) return Response.json({ error: "Log in first." }, { status: 401 });
  const customer = user.privateMetadata.stripeCustomerId;
  if (typeof customer !== "string") return Response.json({ error: "No billing details on this account." }, { status: 404 });
  try {
    const session = await stripe.billingPortal.sessions.create({ customer, return_url: `${new URL(request.url).origin}/account` });
    return Response.json({ url: session.url });
  } catch (error) {
    console.error("billing portal failed", error instanceof Error ? error.message : error);
    return Response.json({ error: "Couldn't open billing. Please try again." }, { status: 502 });
  }
}
