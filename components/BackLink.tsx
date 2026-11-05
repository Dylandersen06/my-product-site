"use client";

import { useRouter } from "next/navigation";

/** Returns to wherever the shopper came from, or the home page on a direct visit. */
export default function BackLink() {
  const router = useRouter();
  return (
    <a
      href="/"
      className="back-link"
      onClick={(e) => {
        if (window.history.length > 1) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      ← Back
    </a>
  );
}
