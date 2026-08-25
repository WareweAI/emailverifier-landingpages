"use client";

import { Button } from "../ui/Button";
import CheckSvg from "../assets/CheckSvg";
import VolumeSelector from "./VolumeSelector";
import {
  BUY_CREDITS_URL,
  RATE_PER_THOUSAND,
  SEASONAL_FEATURES,
  calculatePrice,
  formatNumber,
} from "@/lib/pricing";

type SeasonalPricingCardProps = {
  volume: number;
  onVolumeChange: (volume: number) => void;
};

export default function SeasonalPricingCard({
  volume,
  onVolumeChange,
}: SeasonalPricingCardProps) {
  const price = calculatePrice(volume);

  return (
    <article
      id="seasonal-pricing"
      className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 sm:p-7 shadow-sm
        transition-[box-shadow,border-color] duration-300 hover:border-gray-300 hover:shadow-md
        lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-0"
      aria-labelledby="seasonal-pricing-heading"
    >
      <div>
        <span
          className="inline-flex w-fit items-center rounded-full bg-blue-50 px-2.5 py-1
            text-[11px] font-semibold uppercase tracking-wide text-blue-700"
        >
          Pay As You Go
        </span>

        <h3
          id="seasonal-pricing-heading"
          className="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl"
        >
          Pay Only for What You Need
        </h3>
        <p className="mt-1.5 text-sm text-gray-600 sm:text-base">
          Choose your email volume and see your price instantly.
        </p>

        <div className="mt-6">
          <VolumeSelector volume={volume} onVolumeChange={onVolumeChange} />
        </div>

        <div
          className="mt-6 rounded-md bg-linear-to-r from-blue-100 to-purple-100 px-4 py-5 text-center"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm font-medium text-gray-700">
            <span className="sr-only">Selected volume: </span>
            <span key={`vol-${volume}`} className="inline-block animate-price-in">
              {formatNumber(volume)}
            </span>{" "}
            verification credits
          </p>
          <p
            key={`price-${price.usd}`}
            className="mt-2 text-3xl font-bold text-gray-900 animate-price-in sm:text-4xl"
          >
            <span className="sr-only">Current total price: </span>${price.usd}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            ${RATE_PER_THOUSAND.toFixed(2)} per 1,000 emails
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-900">What&apos;s included</h4>
        <ul
          className="mt-3 space-y-2 text-sm text-gray-800 sm:text-base"
          aria-label="Pay As You Go plan features"
        >
          {SEASONAL_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="shrink-0" aria-hidden="true">
                <CheckSvg />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <Button
          className="w-full bg-linear-to-r from-blue-600 to-blue-800 py-3 text-white font-medium
            hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transition duration-300"
          asChild
        >
          <a
            href={BUY_CREDITS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy credits at Email Verifier"
          >
            Buy Credits →
          </a>
        </Button>
        <p className="mt-2.5 text-center text-xs text-gray-500 sm:text-sm">
          One-time purchase • Credits never expire
        </p>
      </div>
    </article>
  );
}
