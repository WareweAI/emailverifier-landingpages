"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import HappyUsers from "@/Components/HappyUsers";
import { StarRating } from "@/Components/ui/StarRating";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import {
  BUY_CREDITS_URL,
  CREDIT_PACKS,
  HOMEPAGE_PRESETS,
  SEASONAL_FEATURES,
  calculatePrice,
  formatNumber,
  formatPresetLabel,
  nearestCreditPack,
  stepCreditPack,
} from "@/lib/pricing";

type HomepagePricingCardProps = {
  volume: number;
  onVolumeChange: (volume: number) => void;
};

export default function HomepagePricingCard({
  volume,
  onVolumeChange,
}: HomepagePricingCardProps) {
  const scope = useRef<HTMLDivElement>(null);
  const pricePanelRef = useRef<HTMLDivElement>(null);

  const pack = nearestCreditPack(volume);
  const price = calculatePrice(pack.credits);
  const packIndex = Math.max(
    0,
    CREDIT_PACKS.findIndex((p) => p.credits === pack.credits)
  );
  const atMin = packIndex <= 0;
  const atMax = packIndex >= CREDIT_PACKS.length - 1;

  const priceBadge = useMemo(() => {
    if (pack.credits === 25_000) return "Most popular";
    if (pack.credits === 100_000) return "Most value";
    return null;
  }, [pack.credits]);

  const { contextSafe } = useGSAP({ scope });

  const animatePrice = contextSafe(() => {
    const el = pricePanelRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      el,
      { y: 10, autoAlpha: 0.6 },
      { y: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" }
    );
  });

  const setPack = (credits: number) => {
    onVolumeChange(nearestCreditPack(credits).credits);
    animatePrice();
  };

  const step = (direction: -1 | 1) => {
    setPack(stepCreditPack(pack.credits, direction));
  };

  return (
    <div ref={scope} className="relative">
      <div className="mx-auto max-w-2xl text-center">
        <p className="inline-flex items-center justify-center gap-2.5 text-sm font-medium text-ink-muted">
          <span
            className="h-1 w-5 shrink-0 rounded-full bg-ink-muted"
            aria-hidden
          />
          Pricing
        </p>
        <h2
          id="pricing-heading"
          className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-5xl"
        >
          Buy Credits
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink-muted">
          Outreach, or pay as you go.
        </p>
      </div>

      {/* Mirrors app.emailverifier.io/dashboard/billing Buy Credits card */}
      <article
        className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]"
        aria-labelledby="homepage-pricing-heading"
      >
        <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
          {/* Left: volume controls */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              Pay as you go
            </span>

            <div className="mt-5 flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label="Fewer credits"
                disabled={atMin}
                onClick={() => step(-1)}
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-primary hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>

              <div
                className="flex min-h-14 min-w-0 flex-1 items-center justify-center rounded-xl bg-surface-muted px-4"
                role="status"
                aria-live="polite"
              >
                <span className="text-center text-xl font-semibold tabular-nums tracking-tight text-ink sm:text-2xl">
                  {formatNumber(pack.credits)}{" "}
                  <span className="font-medium text-ink-muted">credits</span>
                </span>
              </div>

              <button
                type="button"
                aria-label="More credits"
                disabled={atMax}
                onClick={() => step(1)}
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-primary hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous credit pack"
                disabled={atMin}
                onClick={() => step(-1)}
                className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-primary hover:text-ink disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>

              <label className="sr-only" htmlFor="homepage-credits-slider">
                Credits
              </label>
              <input
                id="homepage-credits-slider"
                type="range"
                min={0}
                max={CREDIT_PACKS.length - 1}
                step={1}
                value={packIndex}
                onChange={(e) => {
                  const next = CREDIT_PACKS[Number(e.target.value)];
                  if (next) setPack(next.credits);
                }}
                aria-valuemin={CREDIT_PACKS[0].credits}
                aria-valuemax={CREDIT_PACKS[CREDIT_PACKS.length - 1].credits}
                aria-valuenow={pack.credits}
                aria-valuetext={`${formatNumber(pack.credits)} credits`}
                className="h-2 w-full cursor-pointer accent-primary"
              />

              <button
                type="button"
                aria-label="Next credit pack"
                disabled={atMax}
                onClick={() => step(1)}
                className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-primary hover:text-ink disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div
              className="mt-5 flex flex-wrap justify-center gap-2"
              role="radiogroup"
              aria-label="Credit packs"
            >
              {HOMEPAGE_PRESETS.map((preset) => {
                const selected = pack.credits === preset;
                const mostValue = preset === 100_000;
                return (
                  <button
                    key={preset}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPack(preset)}
                    className={cn(
                      "min-h-11 cursor-pointer rounded-xl border px-3.5 py-2 text-sm font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      selected
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-line bg-surface text-ink hover:border-primary/50 hover:bg-surface-muted",
                      mostValue &&
                        "inline-flex min-w-24 flex-col items-center gap-0.5 px-5 py-1.5"
                    )}
                  >
                    {formatPresetLabel(preset)}
                    {mostValue ? (
                      <span
                        className={cn(
                          "whitespace-nowrap text-[9px] font-bold uppercase tracking-wide",
                          selected ? "text-primary" : "text-primary/80"
                        )}
                      >
                        Most value
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: price + CTA */}
          <div
            ref={pricePanelRef}
            className="flex flex-col rounded-2xl border border-line bg-surface-muted/60 p-5 sm:p-6"
          >
            {priceBadge ? (
              <span className="mb-4 inline-flex w-fit rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                {priceBadge}
              </span>
            ) : null}

            <h3
              id="homepage-pricing-heading"
              className="font-display text-5xl font-bold tabular-nums tracking-tight text-ink"
            >
              <span
                key={`price-${price.usd}`}
                className="inline-block animate-price-in"
                role="status"
                aria-live="polite"
              >
                ${price.usd}
              </span>
            </h3>

            <p className="mt-2 text-sm text-ink-muted">
              <span className="line-through">${price.listUsdFormatted}</span>
              {" "}
              Save {price.savePct}% vs 10K packs
            </p>

            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              ${price.ratePerEmail.toFixed(4)} per email verification. Credits
              never expire.
            </p>

            <div className="mt-6">
              <Button
                className="h-12 w-full rounded-xl text-base"
                size="lg"
                variant="primary"
                asChild
              >
                <a
                  href={BUY_CREDITS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="pricing_buy_click"
                >
                  Buy for ${price.usd}
                </a>
              </Button>
              <p className="mt-2.5 text-center text-xs text-ink-muted">
                One-time payment · taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-line px-5 py-5 sm:px-6 lg:px-8">
          <ul
            className="grid gap-x-8 gap-y-3 sm:grid-cols-2"
            aria-label="Included with every pack"
          >
            {SEASONAL_FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm text-ink"
              >
                <Check
                  className="h-4 w-4 shrink-0 text-success"
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div
            className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-5"
            aria-label="Capterra 4.8 rating from 1000+ happy users"
          >
            <div className="flex items-center gap-1.5">
              <Image
                src="/assets/capterra.svg"
                alt="Capterra logo"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              <span className="text-sm font-semibold text-ink">Capterra</span>
              <div className="flex items-center gap-1 text-xs text-ink-muted">
                <span className="font-medium">4.8</span>
                <StarRating rating={4.8} size={12} activeColor="#fdc700" />
                <span>Rating</span>
              </div>
            </div>
            <HappyUsers className="justify-start" compact />
          </div>
        </div>
      </article>
    </div>
  );
}
