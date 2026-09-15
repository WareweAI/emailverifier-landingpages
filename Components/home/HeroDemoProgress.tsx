"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const VERIFY_STEPS = [
  "Checking syntax…",
  "Checking domain…",
  "Checking MX records…",
  "Checking mailbox…",
  "Scoring deliverability…",
] as const;

const FIND_STEPS = [
  "Looking up company domain…",
  "Generating email patterns…",
  "Checking candidate addresses…",
  "Ranking likely matches…",
] as const;

type HeroDemoProgressProps = {
  kind: "verify" | "find";
  className?: string;
};

export function HeroDemoProgress({ kind, className }: HeroDemoProgressProps) {
  const steps = kind === "verify" ? VERIFY_STEPS : FIND_STEPS;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setIndex(steps.length - 1);
      return;
    }

    setIndex(0);
    const id = window.setInterval(() => {
      setIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 550);

    return () => window.clearInterval(id);
  }, [steps.length]);

  const progress = ((index + 1) / steps.length) * 100;

  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface-muted/80 p-4",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={kind === "verify" ? "Verifying email" : "Finding email"}
    >
      <p className="text-sm font-medium text-ink">{steps[index]}</p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ol className="mt-3 space-y-1.5">
        {steps.map((step, i) => (
          <li
            key={step}
            className={cn(
              "text-sm transition-colors duration-200",
              i < index && "text-ink-muted line-through",
              i === index && "font-medium text-ink",
              i > index && "text-ink-muted/60"
            )}
          >
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
