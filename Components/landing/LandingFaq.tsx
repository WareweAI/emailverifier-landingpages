"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionEyebrow } from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";

export type LandingFaqItem = {
  question: string;
  answer: string;
};

type LandingFaqProps = {
  id?: string;
  headingId?: string;
  eyebrow?: string;
  title: string;
  items: readonly LandingFaqItem[];
  className?: string;
};

export function LandingFaq({
  id = "faqs",
  headingId = "landing-faq-heading",
  eyebrow,
  title,
  items,
  className,
}: LandingFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell
      id={id}
      className={cn("bg-surface-muted", className)}
      ariaLabelledBy={headingId}
    >
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <SectionEyebrow align="center">{eyebrow}</SectionEyebrow>
        ) : null}
        <h2
          id={headingId}
          className={cn(
            "font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl",
            eyebrow && "mt-3"
          )}
        >
          {title}
        </h2>
        <div className="mt-10 space-y-3 text-left">
          {items.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `${id}-panel-${i}`;
            const buttonId = `${id}-button-${i}`;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition hover:border-primary/30"
              >
                <button
                  id={buttonId}
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between gap-4 p-5 text-left font-semibold text-ink"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-ev-event="faq_open"
                >
                  {faq.question}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
