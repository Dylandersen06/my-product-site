import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import AdvisorChat from "@/components/AdvisorChat";
import Pricing from "@/components/Pricing";
import { CARS } from "@/lib/cars";
import { accessFrom, formatPassEnd } from "@/lib/plan";

export const metadata: Metadata = {
  title: "AI Car Advisor | CarMatch AI by Dylan Andersen",
  description: "Describe your lifestyle and get car recommendations with the best trim and condition, explained.",
};

export default async function AdvisorPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [user, params] = await Promise.all([currentUser(), searchParams]);
  const access = user ? accessFrom(user.publicMetadata) : null;

  return (
    <>
      <div className="container results-page">
        <h1 className="results-title">AI Car Advisor</h1>
        <p className="muted advisor-intro">
          Describe your lifestyle and what you want. The advisor recommends cars from our {CARS.length} models with the
          best trim and condition (Used, Certified Pre-Owned or New), explains why, and answers your follow-up questions.
          We&rsquo;re independently funded, with no outside bias.
        </p>
        {access?.advisor ? (
          <>
            {access.passUntil && (
              <p className="plan-note plan-note-paid">Your 24-hour pass is active until {formatPassEnd(access.passUntil)}.</p>
            )}
            <AdvisorChat />
          </>
        ) : (
          <div className="advisor-locked">
            {params.checkout === "cancelled" && (
              <p className="plan-note">Checkout was cancelled, so you haven&rsquo;t been charged.</p>
            )}
            <h2>The AI advisor is part of a paid plan</h2>
            <p>
              Quick Search and Advanced Search stay free. Pick a plan below to chat with the advisor
              {user ? "." : ", after you log in or create a free account."}
            </p>
            {!user && (
              <div className="account-actions">
                <Link href="/sign-up?redirect_url=%2Fadvisor%23plans" className="button button-primary">
                  Create a free account
                </Link>
                <Link href="/sign-in?redirect_url=%2Fadvisor%23plans" className="button button-outline">
                  Log in
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {!access?.advisor && <Pricing id="plans" heading="Unlock the AI advisor" />}
    </>
  );
}
