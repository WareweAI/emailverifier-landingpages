"use client";

import { Button } from "@/Components/ui/Button";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StatusChip } from "@/Components/ui/StatusChip";
import { REGISTER_URL } from "@/lib/api-snippet";
import { cn } from "@/lib/utils";
import { ArrowRight, AtSign, Linkedin, Minus, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

const FEATURES = [
  {
    id: "person",
    title: "Lookup by Person & Company",
    body: "Targeting a specific buyer, founder, or hiring manager? Use our real-time lookup tool to find email by person name and company name or website URL in seconds.",
    cta: "Find email by person name",
  },
  {
    id: "domain",
    title: "Company Domain Search",
    body: "Mapping an entire target account for ABM or outbound sales? Enter any corporate URL to find emails by company domain, uncover department contacts, and export verified decision-makers at scale.",
    cta: "Find emails by company domain",
  },
  {
    id: "linkedin",
    title: "Find Verified Business Emails from LinkedIn Profiles in Seconds",
    body: "Found your ideal prospect on LinkedIn but can't find their email address? Simply paste their LinkedIn profile URL into our LinkedIn Email Finder to find verified business email addresses in seconds. Connect with decision-makers, recruiters, and potential clients without guessing email formats.",
    cta: "Find Email by LinkedIn Profile",
  },
] as const;

export default function ProspectingFeatures() {
  const [openIndex, setOpenIndex] = useState(0);
  const active = openIndex >= 0 ? FEATURES[openIndex] : FEATURES[0];

  return (
    <SectionShell
      className="bg-background pb-8 md:pb-10 lg:pb-12"
      ariaLabelledBy="find-emails-modes-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow align="center">Prospecting Features</SectionEyebrow>
        <SectionHeading id="find-emails-modes-heading" withEyebrow>
          Find Decision-Makers Across Every Outbound Channel
        </SectionHeading>
        <SectionLead className="mx-auto max-w-3xl">
          Target individual executives, map entire buying committees, or enrich
          social media profiles with verified B2B contact data.
        </SectionLead>
      </div>

      <article className="mt-12 grid items-center gap-8 rounded-3xl border-[5px] border-surface bg-success-soft p-6 shadow-[var(--shadow-card)] sm:p-8 lg:mt-16 lg:grid-cols-2 lg:gap-10 lg:p-10">
        <div className="min-w-0">
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-success/15 sm:h-14 sm:w-14"
            aria-hidden
          >
            <Search
              className="h-7 w-7 text-success sm:h-8 sm:w-8"
              strokeWidth={1.75}
            />
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
            Email Finder
          </h3>

          <ul className="mt-6 border-t border-ink/10">
            {FEATURES.map((feature, index) => {
              const isOpen = openIndex === index;
              const panelId = `prospecting-${feature.id}`;
              const buttonId = `${panelId}-button`;

              return (
                <li key={feature.id} className="border-b border-ink/10">
                  <button
                    id={buttonId}
                    type="button"
                    className="flex min-h-11 w-full items-center justify-between gap-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="text-base font-semibold text-ink">
                      {feature.title}
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
                        {feature.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {openIndex >= 0 ? (
            <Button
              size="lg"
              asChild
              className="group mt-6 rounded-lg border border-ink bg-ink text-primary-foreground hover:bg-ink/90 active:bg-ink"
            >
              <Link
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ev-event="cta_register_click"
                data-ev-loc={`prospecting-${active.id}`}
              >
                {active.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="min-w-0 lg:pl-2" aria-hidden>
          <FinderPreview kind={active.id} />
        </div>
      </article>
    </SectionShell>
  );
}

function FinderPreview({ kind }: { kind: (typeof FEATURES)[number]["id"] }) {
  const title =
    kind === "person"
      ? "Find Email"
      : kind === "domain"
        ? "Company domain"
        : "LinkedIn profile";

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
      <div className="border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">{title}</p>
      </div>
      <div className="p-4 sm:p-5">
        {kind === "person" ? <PersonPreview /> : null}
        {kind === "domain" ? <DomainPreview /> : null}
        {kind === "linkedin" ? <LinkedInPreview /> : null}
      </div>
    </div>
  );
}

function ExampleResult({
  email,
  note,
}: {
  email: string;
  note: string;
}) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-3 py-2.5">
      <span className="truncate text-sm font-medium text-ink">{email}</span>
      <span className="shrink-0 text-xs font-semibold text-success">{note}</span>
    </li>
  );
}

function PersonPreview() {
  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Field icon={<Search className="h-4 w-4" />} value="Alex Morgan" />
        <Field icon={<AtSign className="h-4 w-4" />} value="acme.com" />
      </div>
      <ResultList
        rows={[
          ["alex.morgan@acme.com", "Best"],
          ["amorgan@acme.com", "Likely"],
        ]}
      />
    </>
  );
}

function DomainPreview() {
  return (
    <>
      <Field icon={<AtSign className="h-4 w-4" />} value="acme.com" />
      <ResultList
        rows={[
          ["alex.morgan@acme.com", "Sales"],
          ["priya.shah@acme.com", "Marketing"],
        ]}
      />
    </>
  );
}

function LinkedInPreview() {
  return (
    <>
      <Field
        icon={<Linkedin className="h-4 w-4" />}
        value="linkedin.com/in/alex-morgan"
      />
      <ResultList rows={[["alex.morgan@acme.com", "Best"]]} />
    </>
  );
}

function Field({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border border-line bg-surface-muted px-3 text-sm text-ink">
      <span className="shrink-0 text-ink-muted">{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

function ResultList({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    <div className="mt-4 rounded-xl border border-success/20 bg-success-soft p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">Matching work emails</p>
        <StatusChip
          label="Example"
          variant="neutral"
          showIcon={false}
          className="bg-surface uppercase tracking-wide ring-1 ring-line"
        />
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map(([email, note]) => (
          <ExampleResult key={email} email={email} note={note} />
        ))}
      </ul>
    </div>
  );
}
