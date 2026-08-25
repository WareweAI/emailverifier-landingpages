"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { StarRating } from "@/Components/ui/StarRating";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import {
  BUY_CREDITS_URL,
  HOMEPAGE_PRESETS,
  RATE_PER_THOUSAND,
  SEASONAL_FEATURES,
  SEASONAL_MAX,
  VOLUME_MIN,
  VOLUME_STEP,
  calculatePrice,
  clampSeasonalVolume,
  formatNumber,
  formatPresetLabel,
} from "@/lib/pricing";

const TIER_BLURBS: Record<number, string> = {
  10_000: "A first list",
  25_000: "Typical campaigns",
  50_000: "Larger lists",
  100_000: "Seasonal max",
};

type HomepagePricingCardProps = {
  volume: number;
  onVolumeChange: (volume: number) => void;
};

export default function HomepagePricingCard({
  volume,
  onVolumeChange,
}: HomepagePricingCardProps) {
  const scope = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const price = calculatePrice(volume);
  const presetLabel = formatPresetLabel(volume);

  const { contextSafe } = useGSAP({ scope });

  const animateDetail = contextSafe(() => {
    const el = copyRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      el,
      { y: 14, autoAlpha: 0.55 },
      { y: 0, autoAlpha: 1, duration: 0.42, ease: "power2.out", overwrite: "auto" }
    );
  });

  const selectPreset = (next: number) => {
    onVolumeChange(next);
    animateDetail();
  };

  return (
    <div ref={scope} className="relative">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-full w-screen -translate-x-1/2 overflow-hidden"
        aria-hidden
      >
        <div className="absolute top-1/4 left-1/3 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-56 w-56 rounded-full bg-success/20 blur-3xl" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <div className="flex flex-col lg:col-span-5">
          <h2
            id="pricing-heading"
            className="font-display text-3xl font-semibold tracking-tight text-primary-foreground lg:text-4xl"
          >
            Bulk email verifier pricing
          </h2>
          <p className="mt-3 max-w-sm text-primary-foreground/70">
            Pay only for the volume you need. Same credits for lists and the
            email verification API — no subscription required.
          </p>

          <div
            className="mt-8 rounded-2xl bg-primary-foreground/5 p-1"
            role="radiogroup"
            aria-label="Credit volume"
          >
            {HOMEPAGE_PRESETS.map((preset) => {
              const selected = volume === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => selectPreset(preset)}
                  className={cn(
                    "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                    selected
                      ? "bg-primary-foreground/12 text-primary-foreground"
                      : "text-primary-foreground/75 hover:bg-primary-foreground/8"
                  )}
                >
                  <span>
                    <span className="block font-semibold">
                      {formatPresetLabel(preset)} credits
                    </span>
                    <span className="mt-0.5 block text-sm text-primary-foreground/55">
                      {TIER_BLURBS[preset]}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-opacity duration-200",
                      selected
                        ? "bg-surface text-ink opacity-100"
                        : "opacity-0"
                    )}
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <label
              htmlFor="homepage-volume-slider"
              className="sr-only"
            >
              Email volume
            </label>
            <input
              id="homepage-volume-slider"
              type="range"
              min={VOLUME_MIN}
              max={SEASONAL_MAX}
              step={VOLUME_STEP}
              value={volume}
              onChange={(e) =>
                onVolumeChange(clampSeasonalVolume(Number(e.target.value)))
              }
              aria-valuemin={VOLUME_MIN}
              aria-valuemax={SEASONAL_MAX}
              aria-valuenow={volume}
              aria-label="Email volume slider"
              className="w-full cursor-pointer accent-primary"
            />
            <div className="mt-2 flex justify-between text-xs text-primary-foreground/50">
              <span>1K</span>
              <span>50K</span>
              <span>100K max</span>
            </div>
          </div>

        </div>

        <article
          className="rounded-3xl border border-primary-foreground/10 bg-primary-foreground/8 p-5 shadow-[var(--shadow-card)] sm:p-6 lg:sticky lg:top-28 lg:col-span-7 lg:max-h-[calc(100dvh-8rem)] lg:p-7"
          aria-labelledby="homepage-pricing-heading"
        >
          <span className="inline-flex rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground/80">
            Credits never expire
          </span>

          <div className="mt-5 flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground">
              <BadgeCheck className="h-5 w-5" aria-hidden />
            </span>
            <div ref={copyRef}>
              <p className="text-sm font-medium text-primary-foreground/70">
                {presetLabel} credits
              </p>
              <h3
                id="homepage-pricing-heading"
                className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-primary-foreground sm:text-4xl"
              >
                <span
                  key={`price-${price.usd}`}
                  className="inline-block animate-price-in"
                  role="status"
                  aria-live="polite"
                >
                  ${price.usd}
                </span>
                <span className="text-lg font-medium text-primary-foreground/55">
                  {" "}
                  once
                </span>
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            ${RATE_PER_THOUSAND.toFixed(2)} per 1,000 emails. Credits never
            expire. {formatNumber(volume)} verification credits, pay once.
          </p>

          <div className="mt-6">
            <Button
              className="h-12 w-full justify-between rounded-full border-transparent px-2 pl-6"
              size="lg"
              variant="secondary"
              asChild
            >
              <a
                href={BUY_CREDITS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ev-event="pricing_buy_click"
              >
                Buy credits
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-primary-foreground">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </a>
            </Button>
          </div>

          <ul
            className="mt-6 grid gap-2.5 sm:grid-cols-2"
            aria-label="Included features"
          >
            {SEASONAL_FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-primary-foreground/80"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground"
                  aria-hidden
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-primary-foreground/55">
            Need more than 100K?{" "}
            <Link
              href="mailto:support@emailverifier.io"
              className="font-medium text-primary-foreground hover:underline"
            >
              Contact us
            </Link>
          </p>

          <div className="mt-6">
            <SocialProof />
          </div>
        </article>
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary-foreground/70">
      <span className="flex items-center gap-2">
        <StarRating
          rating={4.1}
          size={14}
          variant="trustpilot"
        />
        <span className="font-medium text-primary-foreground">Trustpilot 4.1</span>
      </span>
      <span>1,000+ users</span>
    </div>
  );
}
