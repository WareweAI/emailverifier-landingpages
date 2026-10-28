"use client";

import PricingSection from "@/Components/PricingSection";

export default function PricingCalculator({
  initialCredits,
}: {
  initialCredits?: number;
}) {
  return (
    <PricingSection variant="embedded" initialCredits={initialCredits} />
  );
}
