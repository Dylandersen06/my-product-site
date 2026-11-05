import type { Metadata } from "next";
import AdvisorChat from "@/components/AdvisorChat";
import { CARS } from "@/lib/cars";

export const metadata: Metadata = {
  title: "AI Car Advisor | CarMatch AI by Dylan Andersen",
  description: "Describe your lifestyle and get car recommendations with the best trim and condition, explained.",
};

export default function AdvisorPage() {
  return (
    <div className="container results-page">
      <h1 className="results-title">AI Car Advisor</h1>
      <p className="muted advisor-intro">
        Describe your lifestyle and what you want. The advisor recommends cars from our {CARS.length} models with the
        best trim and condition (Used, Certified Pre-Owned or New), explains why, and answers your follow-up questions. We&rsquo;re independently funded, with no outside bias.
      </p>
      <AdvisorChat />
    </div>
  );
}
