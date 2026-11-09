import { currentUser } from "@clerk/nextjs/server";
import { createCheckout, getStripe, isOffer } from "@/lib/billing";
import { accessFrom } from "@/lib/plan";

export const dynamic = "force-dynamic";

const jsonError = (status: number, message: string) => Response.json({ error: message }, { status });

/** Starts a Stripe Checkout for the signed-in shopper. Body: { kind: "pass" | "monthly" }. */
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return jsonError(401, "Log in to buy a plan.");

  const stripe = getStripe();
  if (!stripe) return jsonError(503, "Payments aren't set up yet. Please check back soon.");

  const kind = ((await request.json().catch(() => null)) as { kind?: unknown } | null)?.kind;
  if (!isOffer(kind)) return jsonError(400, "Choose a plan.");

  const access = accessFrom(user.publicMetadata);
  if (access.plan === "monthly") return jsonError(409, "You already have the Monthly plan.");

  const origin = new URL(request.url).origin;
  try {
    const url = await createCheckout(
      stripe,
      kind,
      {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? null,
        stripeCustomerId: typeof user.privateMetadata.stripeCustomerId === "string" ? user.privateMetadata.stripeCustomerId : null,
      },
      origin,
    );
    return Response.json({ url });
  } catch (error) {
    console.error("checkout failed", error instanceof Error ? error.message : error);
    return jsonError(502, "Couldn't start checkout. Please try again.");
  }
}
