import type { Metadata } from "next";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ManageBillingButton } from "@/components/CheckoutButton";
import Pricing from "@/components/Pricing";
import { getStripe, grantFromCheckout } from "@/lib/billing";
import { OFFERS, accessFrom, formatPassEnd } from "@/lib/plan";

export const metadata: Metadata = { title: "Your account · CarMatch AI" };

const date = (ms: number | null) =>
  ms ? new Date(ms).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—";

/**
 * Back from Stripe Checkout: confirm the payment directly with Stripe, so access
 * starts at once even if the webhook hasn't arrived yet.
 */
async function confirmCheckout(sessionId: string, userId: string): Promise<"ok" | "pending" | null> {
  const stripe = getStripe();
  if (!stripe || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return (await grantFromCheckout(session, userId)) ? "ok" : "pending";
  } catch (error) {
    console.error("checkout confirm failed", error instanceof Error ? error.message : error);
    return "pending";
  }
}

export default async function AccountPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [initialUser, params] = await Promise.all([currentUser(), searchParams]);
  if (!initialUser) redirect("/sign-in");

  const checkoutId = typeof params.checkout === "string" ? params.checkout : null;
  const confirmed = checkoutId ? await confirmCheckout(checkoutId, initialUser.id) : null;
  // Re-read the account after a purchase so the new plan shows.
  const user = confirmed === "ok" ? ((await currentUser()) ?? initialUser) : initialUser;

  const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? "";
  const name = user.firstName || email.split("@")[0] || "there";
  const access = accessFrom(user.publicMetadata);
  const hasBilling = typeof user.privateMetadata.stripeCustomerId === "string";
  const planName = access.plan ? OFFERS[access.plan].name : "Free";

  return (
    <>
      <div className="container account-page">
        <span className="eyebrow">Your account</span>
        <h1>Welcome back, {name}.</h1>
        {confirmed === "ok" && <p className="plan-note plan-note-paid">Payment received. Thank you! The AI advisor is unlocked.</p>}
        {confirmed === "pending" && (
          <p className="plan-note">We&rsquo;re confirming your payment with Stripe. Refresh this page in a moment.</p>
        )}
        <dl className="account-facts">
          <div>
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>Plan</dt>
            <dd>{planName}</dd>
          </div>
          <div>
            <dt>Member since</dt>
            <dd>{date(user.createdAt)}</dd>
          </div>
          <div>
            <dt>Last logged in</dt>
            <dd>{date(user.lastSignInAt)}</dd>
          </div>
        </dl>
        <p className={`plan-note${access.advisor ? " plan-note-paid" : ""}`}>
          {access.plan === "monthly"
            ? "Full access: free searches plus unlimited AI advisor chats."
            : access.passUntil
              ? `Full access until ${formatPassEnd(access.passUntil)}: free searches plus unlimited AI advisor chats.`
              : "Searches are free. Pick a plan below to unlock the AI advisor."}
        </p>
        <div className="account-actions">
          <Link href="/#search" className="button button-primary button-lg">
            Start matching
          </Link>
          <Link href="/advisor" className="button button-outline button-lg">
            Ask the AI
          </Link>
          {access.plan === "monthly" && hasBilling && <ManageBillingButton className="button button-outline button-lg" />}
          <SignOutButton redirectUrl="/">
            <button type="button" className="button button-outline button-lg">
              Log out
            </button>
          </SignOutButton>
        </div>
        <p className="field-hint">
          To change your name, email or password, use the account menu (your picture or initial, top right).
        </p>
      </div>
      {access.plan !== "monthly" && <Pricing id="plans" heading={access.passUntil ? "Want more time?" : "Unlock the AI advisor"} />}
    </>
  );
}
