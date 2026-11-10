import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import PaidLock from "@/components/PaidLock";
import Pricing from "@/components/Pricing";
import SnapCar from "@/components/SnapCar";
import { accessFrom } from "@/lib/plan";

export const metadata: Metadata = {
  title: "Snap a Car | CarMatch AI by Dylan Andersen",
  description: "Photograph a car you like and see what it is, what it costs and whether you can afford it.",
};

export default async function SnapPage() {
  const user = await currentUser();
  const access = user ? accessFrom(user.publicMetadata) : null;
  return (
    <>
      <div className="container results-page">
        <h1 className="results-title">Snap a Car</h1>
        <p className="muted advisor-intro">
          Saw a car you like? Take a photo. The AI identifies it, then shows its prices, safety rating and whether you
          can afford it, plus similar cars worth a look.
        </p>
        {access?.advisor ? <SnapCar /> : <PaidLock feature="Snap a car" signedIn={!!user} returnTo="/snap" />}
      </div>
      {!access?.advisor && <Pricing id="plans" heading="Unlock Snap a car and the AI advisor" />}
    </>
  );
}
