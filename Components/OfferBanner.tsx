"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { formatPresetLabel, getCreditPack } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** End of Halloween day, 31 Oct 2026, in UTC. */
const SALE_ENDS_AT = Date.parse("2026-11-01T00:00:00.000Z");
const DISMISS_KEY = "ev-halloween-sale-2026";

const DEAL = getCreditPack(100_000);
const OFFER_COPY = DEAL
  ? `${DEAL.savePct}% off ${formatPresetLabel(DEAL.credits)} credits`
  : null;
const OFFER_HREF = DEAL ? `/pricing?credits=${DEAL.credits}` : "/pricing";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function remaining(now: number): TimeLeft | null {
  const diff = SALE_ENDS_AT - now;
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function Divider({ className }: { className?: string }) {
  return (
    <span
      className={cn("h-3.5 w-px shrink-0 bg-primary-foreground/25", className)}
      aria-hidden="true"
    />
  );
}

function Tick({ value, unit }: { value: number; unit: string }) {
  return (
    <span className="inline-flex h-7 min-w-8 items-center justify-center gap-px rounded-md border border-primary-foreground/15 bg-primary-foreground/10 px-1 leading-none">
      <span className="text-sm font-semibold tabular-nums" suppressHydrationWarning>
        {pad(value)}
      </span>
      <span className="text-xs font-medium text-primary-foreground/75">{unit}</span>
    </span>
  );
}

export default function OfferBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    remaining(Date.now())
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      // sessionStorage can throw in private mode; keep the banner visible.
    }

    const tick = () => {
      const next = remaining(Date.now());
      setTimeLeft(next);
      return next === null;
    };

    if (tick()) return;

    const id = window.setInterval(() => {
      if (tick()) window.clearInterval(id);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  if (!OFFER_COPY || !timeLeft || dismissed) return null;

  const endsIn = `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes`;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Dismissal still hides the bar for this view.
    }
    document.documentElement.setAttribute("data-sale-dismissed", "1");
    setDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label={`Halloween sale. ${OFFER_COPY}. Ends in ${endsIn}.`}
      data-sale-banner=""
      className="relative z-50 bg-ink text-primary-foreground"
    >
      <div className="flex min-h-11 items-center justify-center py-1.5 pr-12 pl-3 sm:px-14 sm:py-0">
        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1.5 md:flex-nowrap md:gap-x-3.5">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-score-mid-low">
              <span className="text-base leading-none" aria-hidden="true">
                🎃
              </span>
              Halloween Sale
            </span>
            <Divider />
            <p className="text-sm font-semibold whitespace-nowrap">{OFFER_COPY}</p>
          </div>

          <Divider className="hidden md:block" />

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="flex items-center gap-1" aria-hidden="true">
              <Tick value={timeLeft.days} unit="d" />
              <Tick value={timeLeft.hours} unit="h" />
              <Tick value={timeLeft.minutes} unit="m" />
              <Tick value={timeLeft.seconds} unit="s" />
            </div>

            <Link
              href={OFFER_HREF}
              className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-score-mid-low px-3.5 text-sm font-semibold whitespace-nowrap text-ink transition-colors duration-200 hover:bg-score-mid-low/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-ink motion-reduce:transition-none"
            >
              Grab the deal
              <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss sale announcement"
        className="absolute top-1/2 right-1 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-primary-foreground/70 transition-colors duration-200 hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground motion-reduce:transition-none"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
