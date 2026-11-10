import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import AdvisorChat from "@/components/AdvisorChat";
import PaidLock from "@/components/PaidLock";
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
          <>
            {params.checkout === "cancelled" && (
              <p className="plan-note">Checkout was cancelled, so you haven&rsquo;t been charged.</p>
            )}
            <PaidLock feature="The AI advisor" signedIn={!!user} returnTo="/advisor" />
          </>
        )}
      </div>
      {!access?.advisor && <Pricing id="plans" heading="Unlock the AI advisor and Snap a car" />}
    </>
  );
}
