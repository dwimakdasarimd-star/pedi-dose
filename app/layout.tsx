import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PediDose — Pediatric Dose Calculator",
  description: "Clinical decision-support pediatric dose calculator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}