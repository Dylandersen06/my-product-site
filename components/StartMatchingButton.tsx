import Link from "next/link";

/** The header's main button: jumps to the manual search form on the home page. */
export default function StartMatchingButton() {
  return (
    <Link href="/#search" className="ask-ai">
      Start matching
    </Link>
  );
}
