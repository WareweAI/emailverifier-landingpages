"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionShell } from "@/Components/ui/SectionShell";
import { HOMEPAGE_FAQS } from "@/lib/homepage-faq";
import { cn } from "@/lib/utils";

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell
      id="faqs"
      className="bg-surface-muted"
      ariaLabelledBy="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="faq-heading"
          className="text-center font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
        >
          Frequently asked questions
        </h2>
        <div className="mt-10 space-y-3">
          {HOMEPAGE_FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-ink"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-ev-event="faq_open"
                >
                  {faq.question}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-ink-muted transition-transform",
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
                    "grid transition-[grid-template-rows] duration-200",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-ink-muted">{faq.answer}</p>
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
