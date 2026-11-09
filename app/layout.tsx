import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarMatch AI by Dylan Andersen",
  description:
    "Tell CarMatch AI what you need in a car and get the best-matching models, ranked with a match score and clear reasons. Built by Dylan Andersen.",
  authors: [{ name: "Dylan Andersen" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInFallbackRedirectUrl="/account"
          signUpFallbackRedirectUrl="/account"
          afterSignOutUrl="/"
          appearance={{
            variables: {
              colorPrimary: "#0b4f30",
              colorBackground: "#fffaeb",
              colorForeground: "#17231c",
              colorInput: "#ffffff",
              borderRadius: "10px",
              fontFamily: "inherit",
            },
          }}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
