"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";

export type MetricItem = {
  id: string;
  value: string;
  /** Optional numeric target for soft counter (integers only). */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

type MetricStripProps = {
  headingId?: string;
  eyebrow?: string;
  items: readonly MetricItem[];
  className?: string;
};

function formatCount(n: number) {
  return n.toLocaleString("en-US");
}

export function MetricStrip({
  headingId = "metric-strip-heading",
  eyebrow = "At a glance",
  items,
  className,
}: MetricStripProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const nodes = root.querySelectorAll<HTMLElement>("[data-count-to]");
        nodes.forEach((el) => {
          const target = Number(el.dataset.countTo);
          if (!Number.isFinite(target)) return;
          const prefix = el.dataset.prefix ?? "";
          const suffix = el.dataset.suffix ?? "";
          const obj = { n: 0 };
          gsap.to(obj, {
            n: target,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
            onUpdate: () => {
              el.textContent = `${prefix}${formatCount(Math.round(obj.n))}${suffix}`;
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [items] }
  );

  return (
    <SectionShell
      className={cn("bg-surface py-10 md:py-12 lg:py-14", className)}
      ariaLabelledBy={headingId}
    >
      <p
        id={headingId}
        className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-muted"
      >
        {eyebrow}
      </p>
      <div
        ref={ref}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-line bg-background px-5 py-6 text-center shadow-[var(--shadow-card)] transition hover:border-primary/40"
          >
            <p
              className="font-display text-2xl font-semibold tabular-nums tracking-tight text-ink lg:text-3xl"
              {...(typeof item.countTo === "number"
                ? {
                    "data-count-to": String(item.countTo),
                    "data-prefix": item.prefix ?? "",
                    "data-suffix": item.suffix ?? "",
                  }
                : {})}
            >
              {item.value}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
