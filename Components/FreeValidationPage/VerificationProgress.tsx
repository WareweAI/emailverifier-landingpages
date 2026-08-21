"use client";

import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const STEPS = ["Syntax", "Domain", "Mail server", "Risk"] as const;

type VerificationProgressProps = {
  active: boolean;
  className?: string;
};

export function VerificationProgress({
  active,
  className,
}: VerificationProgressProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !active) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
        const markers = gsap.utils.toArray<HTMLElement>(
          "[data-step-marker]",
          root
        );
        const checks = gsap.utils.toArray<HTMLElement>(
          "[data-step-check]",
          root
        );
        const bar = root.querySelector<HTMLElement>("[data-progress-bar]");

        const reset = () => {
          gsap.set(steps, { autoAlpha: 0.4 });
          gsap.set(checks, { autoAlpha: 0, scale: 0.6 });
          gsap.set(markers, { backgroundColor: "var(--color-line)" });
          if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        };

        reset();

        const tl = gsap.timeline({ repeat: -1 });

        steps.forEach((step, i) => {
          tl.to(
            step,
            { autoAlpha: 1, duration: 0.2, ease: "power1.out" },
            i === 0 ? 0 : "+=0.05"
          );
          if (markers[i]) {
            tl.to(
              markers[i],
              {
                backgroundColor: "var(--color-primary)",
                duration: 0.2,
              },
              "<"
            );
          }
          if (checks[i]) {
            tl.to(
              checks[i],
              { autoAlpha: 1, scale: 1, duration: 0.25, ease: "back.out(1.4)" },
              "<0.05"
            );
          }
          if (bar) {
            tl.to(
              bar,
              {
                scaleX: (i + 1) / STEPS.length,
                duration: 0.35,
                ease: "power1.inOut",
              },
              "<"
            );
          }
        });

        tl.to({}, { duration: 0.35 });
        tl.add(reset);

        return () => {
          tl.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
        const checks = gsap.utils.toArray<HTMLElement>(
          "[data-step-check]",
          root
        );
        const markers = gsap.utils.toArray<HTMLElement>(
          "[data-step-marker]",
          root
        );
        const bar = root.querySelector<HTMLElement>("[data-progress-bar]");
        gsap.set(steps, { autoAlpha: 1 });
        gsap.set(checks, { autoAlpha: 1, scale: 1 });
        gsap.set(markers, { backgroundColor: "var(--color-primary)" });
        if (bar) gsap.set(bar, { scaleX: 1, transformOrigin: "left center" });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [active] }
  );

  if (!active) return null;

  return (
    <div
      ref={scope}
      className={cn(
        "rounded-2xl border border-line bg-surface-muted/80 p-4",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Verifying email"
    >
      <p className="text-sm font-medium text-ink">Checking address…</p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
        <div
          data-progress-bar
          className="h-full w-full origin-left scale-x-0 rounded-full bg-primary"
        />
      </div>
      <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STEPS.map((label) => (
          <li
            key={label}
            data-step
            className="flex items-center gap-2 text-sm text-ink opacity-40"
          >
            <span
              data-step-marker
              className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-line"
              aria-hidden
            >
              <CheckCircle2
                data-step-check
                className="h-3.5 w-3.5 text-primary-foreground opacity-0"
              />
            </span>
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}
