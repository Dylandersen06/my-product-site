import type { Metadata } from "next";
import Pricing from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Pricing | CarMatch AI by Dylan Andersen",
  description: "Searches are free. A 24-hour pass or monthly plan unlocks the AI advisor and Snap a car.",
};

export default function PricingPage() {
  return <Pricing heading="Pricing" pageTitle />;
}
