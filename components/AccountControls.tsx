import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";

/** Header controls: "Log in" for visitors, the account menu for signed-in shoppers. */
export default function AccountControls() {
  return (
    <>
      <Show when="signed-out">
        <Link href="/sign-in" className="nav-login">
          Log in
        </Link>
      </Show>
      <Show when="signed-in">
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link label="Your account" labelIcon={<span aria-hidden="true">◎</span>} href="/account" />
          </UserButton.MenuItems>
        </UserButton>
      </Show>
    </>
  );
}
