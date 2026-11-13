"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Quick Search", page: "/" },
  { href: "/advanced", label: "Advanced Search", page: "/advanced" },
  { href: "/advisor", label: "AI Advisor", page: "/advisor" },
  { href: "/pricing", label: "Pricing", page: "/pricing" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="nav-links" aria-label="Main">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={link.page === pathname ? "active" : undefined}
          aria-current={link.page === pathname ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
