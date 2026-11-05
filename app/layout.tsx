import type { Metadata } from "next";
import AskAiButton from "@/components/AskAiButton";
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
        <Header />
        <main>{children}</main>
        <Footer />
        <AskAiButton />
      </body>
    </html>
  );
}
