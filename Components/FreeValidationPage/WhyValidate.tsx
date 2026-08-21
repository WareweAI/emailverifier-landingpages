"use client";

import { useState } from "react";
import { StatusChip } from "@/Components/ui/StatusChip";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";

const REASONS = [
  {
    title: "Fewer invalid addresses",
    desc: "Remove addresses that will bounce before they hurt your campaigns.",
    mockup: "invalid" as const,
  },
  {
    title: "Better list quality",
    desc: "Keep deliverable contacts and spot risky or disposable inboxes.",
    mockup: "list" as const,
  },
  {
    title: "Smarter sending",
    desc: "Avoid wasted sends and protect sender reputation with cleaner data.",
    mockup: "sending" as const,
  },
];

function MockupShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pb-4 pt-1" aria-hidden>
      <div className="rounded-xl border border-line bg-surface p-3">{children}</div>
    </div>
  );
}

function InvalidMockup() {
  return (
    <MockupShell>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            bounce@old-domain.example
          </p>
          <div className="mt-2">
            <StatusChip label="Undeliverable" variant="danger" />
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-2xl font-semibold tabular-nums leading-none text-danger">
            12
          </p>
          <p className="mt-1 text-xs text-ink-muted">Score</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-danger/20 bg-danger-soft px-2.5 py-2">
        <span className="text-xs font-medium text-danger">Bounce risk</span>
        <span className="text-xs font-semibold tabular-nums text-danger">
          High
        </span>
      </div>
    </MockupShell>
  );
}

function ListQualityMockup() {
  const rows = [
    {
      email: "alex@acme.com",
      label: "Deliverable",
      variant: "success" as const,
    },
    {
      email: "temp@mail-drop.io",
      label: "Disposable",
      variant: "danger" as const,
    },
    {
      email: "info@shop.co",
      label: "Risky",
      variant: "warning" as const,
    },
  ];

  return (
    <MockupShell>
      <div className="overflow-hidden rounded-lg border border-line">
        <div className="flex items-center justify-between border-b border-line px-3 py-2">
          <span className="text-xs font-medium text-ink-muted">List hygiene</span>
          <span className="text-xs tabular-nums text-ink-muted">3 rows</span>
        </div>
        <ul className="divide-y divide-line">
          {rows.map((row) => (
            <li
              key={row.email}
              className="flex items-center justify-between gap-3 px-3 py-2.5"
            >
              <span className="truncate text-xs font-medium text-ink">
                {row.email}
              </span>
              <StatusChip
                label={row.label}
                variant={row.variant}
                className="shrink-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </MockupShell>
  );
}

function SendingMockup() {
  const bars = [
    { label: "Clean", value: 86, tone: "bg-success" },
    { label: "Risky", value: 9, tone: "bg-warning" },
    { label: "Invalid", value: 5, tone: "bg-danger" },
  ];

  return (
    <MockupShell>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-ink">Send readiness</span>
        <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">
          Protected
        </span>
      </div>
      <dl className="mt-3 space-y-2.5">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <dt className="text-ink-muted">{bar.label}</dt>
              <dd className="font-semibold tabular-nums text-ink">
                {bar.value}%
              </dd>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <div
                className={cn("h-full rounded-full", bar.tone)}
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </dl>
    </MockupShell>
  );
}

function BenefitMockup({
  kind,
}: {
  kind: (typeof REASONS)[number]["mockup"];
}) {
  if (kind === "invalid") return <InvalidMockup />;
  if (kind === "list") return <ListQualityMockup />;
  return <SendingMockup />;
}

export default function WhyValidate() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SectionShell className="bg-surface" ariaLabelledBy="why-validate-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
        <div>
          <h2
            id="why-validate-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Why validate an email address?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            One check tells you whether an address is worth sending to — before
            you burn credits, risk bounces, or pollute a signup list.
          </p>
        </div>

        <ul className="space-y-4" onMouseLeave={() => setActiveIndex(0)}>
          {REASONS.map((reason, index) => {
            const isExpanded = activeIndex === index;

            return (
              <li
                key={reason.title}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <article
                  className={cn(
                    "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
                    "transition-transform duration-200 ease-out",
                    isExpanded && "-translate-y-0.5",
                    "motion-reduce:transition-none motion-reduce:translate-y-0"
                  )}
                >
                  <div className="px-4 py-4 sm:px-5">
                    <h3 className="font-semibold text-ink">{reason.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {reason.desc}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      "motion-reduce:transition-none"
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        className={cn(
                          "origin-top transition-[opacity,transform] duration-300 ease-out",
                          isExpanded
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0",
                          "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
                        )}
                      >
                        <BenefitMockup kind={reason.mockup} />
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
