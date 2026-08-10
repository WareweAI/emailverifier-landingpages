"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/Button";
import CheckSvg from "../assets/CheckSvg";
import {
  UNLIMITED_FEATURES,
  UNLIMITED_PRICE_MONTHLY,
  UNLIMITED_TOTAL_SPOTS,
  getUnlimitedOfferEndsAt,
  getUnlimitedSpotsLeft,
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
  const spotsLeft = useMemo(() => getUnlimitedSpotsLeft(), []);
  const offerEndsAt = useMemo(() => getUnlimitedOfferEndsAt(), []);
  const soldOut = spotsLeft <= 0;

  const getTimeLeft = useCallback((): TimeLeft => {
    return computeFromDiff(offerEndsAt.getTime() - Date.now());
  }, [offerEndsAt]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());
  const [offerActive, setOfferActive] = useState(
    () => Date.now() < offerEndsAt.getTime() && !soldOut
  );

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
      className="flex h-full flex-col rounded-xl border border-blue-200 bg-blue-50/40 p-5 sm:p-7
        shadow-md ring-1 ring-blue-100 transition-[box-shadow,border-color] duration-300
        hover:border-blue-300 hover:shadow-lg"
      aria-labelledby="unlimited-pricing-heading"
    >
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
        <p className="flex flex-wrap items-baseline justify-center gap-1 sm:justify-start">
          <span className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            ${UNLIMITED_PRICE_MONTHLY}
          </span>
          <span className="text-lg font-medium text-gray-600">/month</span>
        </p>
        <p className="mt-2 text-sm font-semibold text-blue-700">
          Unlimited emails/month
        </p>
      </div>

      <ul
        className="mt-8 space-y-2 text-sm text-gray-800 sm:text-base"
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
