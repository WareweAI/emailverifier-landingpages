"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  SectionEyebrow,
  SectionHeading,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { VALIDATE_EMAIL_FAQS } from "@/lib/validate-email-faq";
import { cn } from "@/lib/utils";

export default function ValidateEmailFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell
      id="faqs"
      className="bg-surface-muted"
      ariaLabelledBy="validate-faq-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow align="center">FAQ</SectionEyebrow>
        <SectionHeading id="validate-faq-heading" withEyebrow>
          FAQs
        </SectionHeading>
      </div>
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {VALIDATE_EMAIL_FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          const panelId = `validate-faq-panel-${i}`;
          const buttonId = `validate-faq-button-${i}`;

          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]"
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
    </SectionShell>
  );
}
