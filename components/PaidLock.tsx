import Link from "next/link";

/** Shown in place of a paid AI feature for shoppers without a plan. */
export default function PaidLock({ feature, signedIn, returnTo }: { feature: string; signedIn: boolean; returnTo: string }) {
  const back = encodeURIComponent(`${returnTo}#plans`);
  return (
    <div className="advisor-locked">
      <h2>{feature} is part of a paid plan</h2>
      <p>
        Quick Search and Advanced Search stay free. Pick a plan below to use {feature.toLowerCase()}
        {signedIn ? "." : ", after you log in or create a free account."} One plan unlocks every AI feature.
      </p>
      {!signedIn && (
        <div className="account-actions">
          <Link href={`/sign-up?redirect_url=${back}`} className="button button-primary">
            Create a free account
          </Link>
          <Link href={`/sign-in?redirect_url=${back}`} className="button button-outline">
            Log in
          </Link>
        </div>
      )}
    </div>
  );
}
