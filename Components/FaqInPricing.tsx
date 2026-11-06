"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { PRICING_PAGE_FAQS } from "@/lib/pricing-page-faq";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell
      id="faqs"
      className="bg-background pt-6 md:pt-8 lg:pt-10 pb-6 md:pb-8 lg:pb-10"
      ariaLabelledBy="faq-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionHeading id="faq-heading">
          Frequently asked questions
        </SectionHeading>
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <div className="space-y-3">
          {PRICING_PAGE_FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `pricing-faq-panel-${i}`;
            const buttonId = `pricing-faq-button-${i}`;

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
