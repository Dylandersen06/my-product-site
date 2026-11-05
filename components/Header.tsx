import Link from "next/link";

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
        <nav className="nav-links">
          <Link href="/#search">Find a car</Link>
          <Link href="/#pricing">Pricing</Link>
        </nav>
      </div>
    </header>
  );
}
