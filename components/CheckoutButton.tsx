"use client";

import { useState } from "react";
import type { PlanKey } from "@/lib/plan";

/** Sends the shopper to Stripe Checkout, or to log in first. */
export function CheckoutButton({ kind, className, children }: { kind: PlanKey; className: string; children: React.ReactNode }) {
  return (
    <PostButton endpoint="/api/checkout" body={{ kind }} className={className}>
      {children}
    </PostButton>
  );
}

/** Opens Stripe's page for managing a subscription. */
export function ManageBillingButton({ className }: { className: string }) {
  return (
    <PostButton endpoint="/api/billing-portal" body={{}} className={className}>
      Manage or cancel subscription
    </PostButton>
  );
}

function PostButton({
  endpoint,
  body,
  className,
  children,
}: {
  endpoint: string;
  body: object;
  className: string;
  children: React.ReactNode;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status === 401) {
        window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.pathname + window.location.hash)}`;
        return;
      }
      const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!response.ok || !data?.url) throw new Error(data?.error ?? "Something went wrong. Please try again.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <span className="post-button">
      <button type="button" className={className} onClick={go} disabled={busy} aria-busy={busy}>
        {busy ? "Opening secure checkout…" : children}
      </button>
      {error && (
        <span className="form-error" role="alert">
          {error}
        </span>
      )}
    </span>
  );
}
