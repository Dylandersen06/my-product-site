import Link from "next/link";
import { Suspense } from "react";
import AccountControls from "@/components/AccountControls";
import NavLinks from "@/components/NavLinks";
import StartMatchingButton from "@/components/StartMatchingButton";
import UserSync from "@/components/UserSync";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">
            CarMatch <span className="accent">AI</span>
          </span>
          <span className="brand-by">by Dylan Andersen</span>
        </Link>
        <NavLinks />
        <div className="nav-actions">
          <StartMatchingButton />
          <Suspense fallback={null}>
            <AccountControls />
            <UserSync />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
