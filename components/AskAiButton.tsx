"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Floating link to the AI Advisor, on every page except the advisor itself. */
export default function AskAiButton() {
  if (usePathname() === "/advisor") return null;
  return (
    <Link href="/advisor" className="ask-ai">
      Ask the AI
    </Link>
  );
}
