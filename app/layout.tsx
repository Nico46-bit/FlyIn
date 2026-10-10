import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlyIn — Workforce Compliance Marketplace",
  description:
    "Verified field crews, compliant contracts, deployed fly-in ready. Connect with Australia's tier-one resources, clean energy and infrastructure projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
