import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CloudGuardian AI — Intelligent Cloud Operations",
  description:
    "AI-powered cloud operations assistant that reduces costs, responds to incidents, and keeps your team informed in real time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
