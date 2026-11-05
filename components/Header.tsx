import Link from "next/link";
import NavLinks from "@/components/NavLinks";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand">
          <span className="brand-name">
            CarMatch <span className="accent">AI</span>
          </span>
          <span className="brand-by">by Dylan Andersen</span>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
