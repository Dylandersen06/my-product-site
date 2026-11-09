import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = { title: "Log in · CarMatch AI" };

export default function SignInPage() {
  return (
    <div className="container auth-page">
      <SignIn />
    </div>
  );
}
