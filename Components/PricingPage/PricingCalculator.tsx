"use client";

import PricingSection from "@/Components/PricingSection";

/** @deprecated Prefer PricingSection variant="homepage" on /pricing. */
export default function PricingCalculator({
  initialCredits,
}: {
  initialCredits?: number;
}) {
  return (
    <PricingSection
      variant="homepage"
      initialCredits={initialCredits}
      headingAs="h1"
      heading="Transparent Pay-As-You-Go email verifier credits"
      lead="Start with 100 free credits for our email verifier. Buy more only when you need them — same credits for bulk and the email verification API, never expire."
    />
  );
}
