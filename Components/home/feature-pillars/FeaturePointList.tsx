"use client";

import { Minus, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FeaturePoint = {
  title: string;
  body: ReactNode;
};

export function FeaturePointList({
  points,
  idPrefix,
}: {
  points: readonly FeaturePoint[];
  idPrefix: string;
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ul className="mt-6 border-t border-ink/10">
      {points.map((point, index) => {
        const isOpen = openIndex === index;
        const panelId = `${idPrefix}-point-${index}`;
        const buttonId = `${panelId}-button`;

        return (
          <li key={point.title} className="border-b border-ink/10">
            <button
              id={buttonId}
              type="button"
              className="flex min-h-11 w-full items-center justify-between gap-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="text-base font-semibold text-ink">
                {point.title}
              </span>
              {isOpen ? (
                <Minus className="h-4 w-4 shrink-0 text-ink" aria-hidden />
              ) : (
                <Plus className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
              )}
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-sm leading-relaxed text-ink-muted">
                  {point.body}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
