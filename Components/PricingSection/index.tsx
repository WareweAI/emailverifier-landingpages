"use client";

import { useState } from "react";
import SeasonalPricingCard from "./SeasonalPricingCard";
import UnlimitedPricingCard from "./UnlimitedPricingCard";
import { DEFAULT_VOLUME } from "@/lib/pricing";

export type PricingSectionProps = {
  /** Full homepage section vs embedded grid on /pricing */
  variant?: "section" | "embedded";
};

export default function PricingSection({
  variant = "section",
}: PricingSectionProps) {
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  const grid = (
    <div
      className="grid w-full grid-cols-1 gap-6 pt-3 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto] lg:gap-x-8 lg:gap-y-0"
    >
      <SeasonalPricingCard volume={volume} onVolumeChange={setVolume} />
      <UnlimitedPricingCard />
    </div>
  );

  if (variant === "embedded") {
    return (
      <div className="w-full max-w-6xl mx-auto" data-pricing-layout="embedded">
        {grid}
      </div>
    );
  }

  return (
    <section
      id="pricing"
      className="w-full bg-blue-50 py-14 sm:py-20 flex flex-col items-center px-4"
      aria-labelledby="pricing-heading"
      role="region"
    >
      <div className="max-w-3xl text-center mb-10">
        <h2
          id="pricing-heading"
          className="text-2xl font-semibold text-gray-900 mb-2 sm:text-3xl"
        >
          Simple, Honest Pricing
        </h2>
        <p className="text-gray-700 text-sm sm:text-base">
          Pay for the volume you need — or choose Unlimited for continuous verification.
        </p>
      </div>

      <div className="w-full max-w-6xl">{grid}</div>
    </section>
  );
}
