import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Email Verifier",
  description: "Simple, honest email verification pricing. $1.80 per 1,000 emails. No hidden fees.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
