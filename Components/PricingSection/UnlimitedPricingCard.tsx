"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import CheckSvg from "../assets/CheckSvg";
import {
  DEFAULT_UNLIMITED_VOLUME,
  UNLIMITED_FEATURES,
  UNLIMITED_TOTAL_SPOTS,
  UNLIMITED_VOLUME_TIERS,
  formatPresetLabel,
  getUnlimitedMonthlyPrice,
  getUnlimitedOfferEndsAt,
  getUnlimitedSpotsLeft,
  isUnlimitedVolume,
  type UnlimitedVolume,
} from "@/lib/pricing";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function computeFromDiff(diffMs: number): TimeLeft {
  if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function isExpired(tl: TimeLeft): boolean {
  return (
    tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0
  );
}

export default function UnlimitedPricingCard() {
  const volumeSelectId = useId();
  const spotsLeft = useMemo(() => getUnlimitedSpotsLeft(), []);
  const offerEndsAt = useMemo(() => getUnlimitedOfferEndsAt(), []);
  const soldOut = spotsLeft <= 0;

  const getTimeLeft = useCallback((): TimeLeft => {
    return computeFromDiff(offerEndsAt.getTime() - Date.now());
  }, [offerEndsAt]);

  const [volume, setVolume] = useState<UnlimitedVolume>(DEFAULT_UNLIMITED_VOLUME);
  const monthlyPrice = getUnlimitedMonthlyPrice(volume);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());
  const [offerActive, setOfferActive] = useState(
    () => Date.now() < offerEndsAt.getTime() && !soldOut
  );

  const handleVolumeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = Number(e.target.value);
    if (isUnlimitedVolume(next)) setVolume(next);
  };

  useEffect(() => {
    if (soldOut) {
      setOfferActive(false);
      return;
    }

    const tick = (): boolean => {
      const tl = getTimeLeft();
      setTimeLeft(tl);

      if (isExpired(tl)) {
        setOfferActive(false);
        return true;
      }

      setOfferActive(true);
      return false;
    };

    if (tick()) return;

    const timer = setInterval(() => {
      if (tick()) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [getTimeLeft, soldOut]);

  return (
    <article
      id="unlimited-plan"
      className="relative flex h-full flex-col rounded-xl border border-blue-200 bg-blue-50/40 p-5 sm:p-7
        shadow-md ring-1 ring-blue-100 transition-[box-shadow,border-color] duration-300
        hover:border-blue-300 hover:shadow-lg
        lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-0"
      aria-labelledby="unlimited-pricing-heading"
    >
      <div>
        <span
          className="absolute -top-3 right-4 z-10 inline-flex items-center rounded-full
            bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm"
        >
          Most popular
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex w-fit items-center rounded-full bg-blue-100 px-2.5 py-1
              text-[11px] font-semibold uppercase tracking-wide text-blue-800"
          >
            Unlimited
          </span>
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-600 px-2.5 py-1
              text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm
              ring-2 ring-blue-300/80"
          >
            Coming Soon
            <span className="inline-flex items-center gap-0.5" aria-hidden="true">
              <span className="coming-soon-dot" />
              <span className="coming-soon-dot" />
              <span className="coming-soon-dot" />
            </span>
          </span>
        </div>

        <h3
          id="unlimited-pricing-heading"
          className="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl"
        >
          Unlimited Verification
        </h3>
        <p className="mt-1.5 text-sm text-gray-600 sm:text-base">
          For teams that verify emails continuously.
        </p>

        <div className="mt-6 rounded-md border border-blue-100 bg-white/80 px-4 py-3">
          <p
            className="text-sm font-semibold text-blue-800"
            aria-live="polite"
          >
            {soldOut
              ? "All 100 spots are taken"
              : `${spotsLeft} of ${UNLIMITED_TOTAL_SPOTS} spots left`}
          </p>

          {offerActive && !soldOut ? (
            <div
              className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-700"
              aria-label="Offer countdown"
            >
              <span className="font-medium text-gray-600">Offer ends in:</span>
              <CountdownUnit value={timeLeft.days} label="D" />
              <span aria-hidden="true" className="text-gray-400">
                :
              </span>
              <CountdownUnit value={timeLeft.hours} label="H" />
              <span aria-hidden="true" className="text-gray-400">
                :
              </span>
              <CountdownUnit value={timeLeft.minutes} label="M" />
              <span aria-hidden="true" className="text-gray-400">
                :
              </span>
              <CountdownUnit value={timeLeft.seconds} label="S" />
            </div>
          ) : (
            !soldOut && (
              <p className="mt-2 text-sm text-gray-600" role="status">
                This limited offer has ended.
              </p>
            )
          )}
        </div>

        <div className="mt-8 text-center sm:text-left">
          <p
            className="flex flex-wrap items-baseline justify-center gap-1 sm:justify-start"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-4xl font-bold tracking-tight tabular-nums text-gray-900 sm:text-5xl">
              ${monthlyPrice.toLocaleString("en-US")}
            </span>
            <span className="text-lg font-medium text-gray-600">/month</span>
          </p>

          <div className="mt-4 max-w-xs mx-auto sm:mx-0">
            <label
              htmlFor={volumeSelectId}
              className="mb-1.5 block text-left text-sm font-medium text-gray-800"
            >
              Email volume
            </label>
            <div className="relative">
              <select
                id={volumeSelectId}
                name="unlimited-email-volume"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full appearance-none rounded-md border border-blue-200 bg-white
                  py-2.5 pl-3 pr-10 text-sm font-semibold text-gray-900 shadow-sm
                  focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-describedby={`${volumeSelectId}-hint`}
              >
                {UNLIMITED_VOLUME_TIERS.map((tier) => (
                  <option key={tier.volume} value={tier.volume}>
                    {formatPresetLabel(tier.volume)}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-blue-700"
                aria-hidden="true"
              />
            </div>
            <p
              id={`${volumeSelectId}-hint`}
              className="mt-1.5 text-left text-sm font-semibold text-blue-700"
            >
              {formatPresetLabel(volume)} emails/month
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-900">
          Everything in Pay As You Go, Plus:
        </h4>
        <ul
          className="mt-3 space-y-2 text-sm text-gray-800 sm:text-base"
          aria-label="Unlimited plan features"
        >
          {UNLIMITED_FEATURES.map((feature) => (
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
          className="w-full bg-blue-100 py-3 text-blue-800 font-medium cursor-not-allowed
            border border-blue-200"
          disabled
          aria-label="Unlimited plan coming soon"
        >
          Coming Soon
          <span className="ml-1.5 inline-flex items-center gap-0.5" aria-hidden="true">
            <span className="coming-soon-dot" />
            <span className="coming-soon-dot" />
            <span className="coming-soon-dot" />
          </span>
        </Button>
      </div>
    </article>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <span
      className="inline-flex min-w-10 items-center justify-center rounded-md border border-blue-100
        bg-blue-50 px-2 py-1 font-semibold tabular-nums text-gray-900"
      aria-live="polite"
      aria-atomic="true"
    >
      {String(value).padStart(2, "0")}
      <span className="ml-0.5 text-[10px] font-medium text-gray-500">
        {label}
      </span>
    </span>
  );
}
