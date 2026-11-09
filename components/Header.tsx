import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import StartMatchingButton from "@/components/StartMatchingButton";

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
        <StartMatchingButton />
      </div>
    </header>
  );
}
