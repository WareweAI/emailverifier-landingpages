"use client";

import { useState } from "react";
import SeasonalPricingCard from "./SeasonalPricingCard";
import UnlimitedPricingCard from "./UnlimitedPricingCard";
import HomepagePricingCard from "./HomepagePricingCard";
import { DEFAULT_VOLUME, nearestCreditPack } from "@/lib/pricing";
import { SectionShell } from "@/Components/ui/SectionShell";

export type PricingSectionProps = {
  /** Full homepage section vs embedded grid on /pricing */
  variant?: "section" | "embedded" | "homepage";
};

export default function PricingSection({
  variant = "section",
}: PricingSectionProps) {
  const [volume, setVolume] = useState(
    () => nearestCreditPack(DEFAULT_VOLUME).credits
  );

  if (variant === "homepage") {
    return (
      <SectionShell
        id="pricing"
        ariaLabelledBy="pricing-heading"
        className="bg-background pt-8 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20"
      >
        <HomepagePricingCard volume={volume} onVolumeChange={setVolume} />
      </SectionShell>
    );
  }

  const grid = (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      <SeasonalPricingCard volume={volume} onVolumeChange={setVolume} />
      <UnlimitedPricingCard />
    </div>
  );

  if (variant === "embedded") {
    return (
      <div className="w-full mx-auto" data-pricing-layout="embedded">
        {grid}
      </div>
    );
  }

  return (
    <section
      id="pricing"
      className="flex w-full flex-col items-center bg-primary-soft px-4 py-14 sm:px-6 sm:py-20 lg:px-20"
      aria-labelledby="pricing-heading"
      role="region"
    >
      <div className="mb-10 max-w-3xl text-center">
        <h2
          id="pricing-heading"
          className="mb-2 text-2xl font-semibold text-ink sm:text-3xl"
        >
          Simple, Honest Pricing
        </h2>
        <p className="text-sm text-ink-muted sm:text-base">
          Pay for the volume you need — or choose Unlimited for continuous
          verification.
        </p>
      </div>

      <div className="w-full">{grid}</div>
    </section>
  );
}
