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
            // Fixed light colors in both light and dark mode. Clerk can't reliably use the
            // site's dark-mode tokens, and without an explicit input text color, typed text
            // came out white on white in dark mode.
            variables: {
              colorPrimary: "#0b4f30",
              colorPrimaryForeground: "#fffaeb",
              colorBackground: "#fffaeb",
              colorForeground: "#17231c",
              colorMutedForeground: "#4c5a50",
              colorInput: "#ffffff",
              colorInputForeground: "#17231c",
              colorBorder: "#ded6bf",
              colorNeutral: "#17231c",
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
