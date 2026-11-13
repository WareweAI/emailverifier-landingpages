import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, AtSign, Building2, Linkedin, Search, type LucideIcon } from "lucide-react";
import {
  FeaturePointList,
  type FeaturePoint,
} from "@/Components/home/feature-pillars/FeaturePointList";
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

type FinderFeatureCard = {
  id: string;
  icon: LucideIcon;
  iconClass: string;
  iconWrapClass: string;
  title: string;
  points: readonly FeaturePoint[];
  cta: string;
  cardClass: string;
  Mockup: ComponentType<{ className?: string }>;
};

const FEATURE_CARDS: FinderFeatureCard[] = [
  {
    id: "person",
    icon: Search,
    iconClass: "text-success",
    iconWrapClass: "bg-success/15",
    title: "Lookup by Person & Company",
    points: [
      {
        title: "Lookup by Person & Company",
        body: "Targeting a specific buyer, founder, or hiring manager? Use our real-time lookup tool to find email by person name and company name or website URL in seconds.",
      },
    ],
    cta: "Find email by person name",
    cardClass: "bg-success-soft",
    Mockup: PersonPreview,
  },
  {
    id: "domain",
    icon: Building2,
    iconClass: "text-primary",
    iconWrapClass: "bg-primary/15",
    title: "Company Domain Search",
    points: [
      {
        title: "Company Domain Search",
        body: "Mapping an entire target account for ABM or outbound sales? Enter any corporate URL to find emails by company domain, uncover department contacts, and export verified decision-makers at scale.",
      },
    ],
    cta: "Find emails by company domain",
    cardClass: "bg-lavender-soft",
    Mockup: DomainPreview,
  },
  {
    id: "linkedin",
    icon: Linkedin,
    iconClass: "text-primary-deep",
    iconWrapClass: "bg-primary-deep/10",
    title: "LinkedIn Email Finder",
    points: [
      {
        title:
          "Find Verified Business Emails from LinkedIn Profiles in Seconds",
        body: "Found your ideal prospect on LinkedIn but can't find their email address? Simply paste their LinkedIn profile URL into our LinkedIn Email Finder to find verified business email addresses in seconds. Connect with decision-makers, recruiters, and potential clients without guessing email formats.",
      },
    ],
    cta: "Find Email by LinkedIn Profile",
    cardClass: "bg-teal-soft",
    Mockup: LinkedInPreview,
  },
];

export default function ProspectingFeatures() {
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

      <ol className="mt-12 list-none space-y-0 p-0 lg:mt-16">
        {FEATURE_CARDS.map((card, index) => {
          const imageFirst = index % 2 === 1;

          return (
            <li
              key={card.id}
              className={cn(
                "relative",
                index > 0 && "-mt-4 sm:-mt-5 lg:-mt-6"
              )}
              style={{ zIndex: index + 1 }}
            >
              <article
                className={cn(
                  /* 1-off: 5px white edge so stacked pastel cards separate cleanly */
                  "grid items-center gap-8 rounded-3xl border-[5px] border-surface p-6 shadow-[var(--shadow-card)] sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10",
                  card.cardClass
                )}
              >
                <div className={cn("min-w-0", imageFirst && "lg:order-2")}>
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14",
                      card.iconWrapClass
                    )}
                    aria-hidden
                  >
                    <card.icon
                      className={cn("h-7 w-7 sm:h-8 sm:w-8", card.iconClass)}
                      strokeWidth={1.75}
                    />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                    {card.title}
                  </h3>
                  <FeaturePointList
                    points={card.points}
                    idPrefix={`finder-feature-${card.id}`}
                  />
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
                      data-ev-loc={`prospecting-${card.id}`}
                    >
                      {card.cta}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                        aria-hidden
                      />
                    </Link>
                  </Button>
                </div>

                <div
                  className={cn(
                    "min-w-0",
                    imageFirst ? "lg:order-1 lg:pr-2" : "lg:pl-2"
                  )}
                  aria-hidden
                >
                  <card.Mockup />
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </SectionShell>
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

function PersonPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">Find Email</p>
      </div>
      <div className="p-4 sm:p-5">
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
      </div>
    </div>
  );
}

function DomainPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">Company domain</p>
      </div>
      <div className="p-4 sm:p-5">
        <Field icon={<AtSign className="h-4 w-4" />} value="acme.com" />
        <ResultList
          rows={[
            ["alex.morgan@acme.com", "Sales"],
            ["priya.shah@acme.com", "Marketing"],
          ]}
        />
      </div>
    </div>
  );
}

function LinkedInPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">LinkedIn profile</p>
      </div>
      <div className="p-4 sm:p-5">
        <Field
          icon={<Linkedin className="h-4 w-4" />}
          value="linkedin.com/in/alex-morgan"
        />
        <ResultList rows={[["alex.morgan@acme.com", "Best"]]} />
      </div>
    </div>
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
