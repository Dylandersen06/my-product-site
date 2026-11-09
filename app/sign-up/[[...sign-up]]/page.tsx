import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = { title: "Create an account · CarMatch AI" };

export default function SignUpPage() {
  return (
    <div className="container auth-page">
      <SignUp />
    </div>
  );
}
