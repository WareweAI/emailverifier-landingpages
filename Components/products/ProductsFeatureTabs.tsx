"use client";

import { useId, useState, type ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Database,
  FileSpreadsheet,
  MailCheck,
  Search,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import {
  FeaturePointList,
  type FeaturePoint,
} from "@/Components/home/feature-pillars/FeaturePointList";
import {
  ApiKeysMockup,
  FindEmailsMockup,
  FindLeadsMockup,
  VerifyEmailsMockup,
} from "@/Components/home/feature-pillars/PillarMockups";
import { Button } from "@/Components/ui/Button";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";

type ProductPillar = {
  id: string;
  icon: LucideIcon;
  iconClass: string;
  iconWrapClass: string;
  title: string;
  points: readonly FeaturePoint[];
  cta: string;
  href: string;
  cardClass: string;
  Mockup: ComponentType<{ className?: string }>;
};

type CategoryTab = {
  id: "verify" | "leads";
  label: string;
  pillars: readonly ProductPillar[];
};

const CATEGORIES: readonly CategoryTab[] = [
  {
    id: "verify",
    label: "Email Verification",
    pillars: [
      {
        id: "validator",
        icon: MailCheck,
        iconClass: "text-success",
        iconWrapClass: "bg-success/15",
        title: "Email Validator",
        points: [
          {
            title: "Syntax, MX and mailbox checks",
            body: "Verify any email address for free in seconds before you send — without delivering a message to the inbox.",
          },
          {
            title: "Instant 0–100 deliverability score",
            body: "See confidence and catch-all signals so you know which addresses are safe to mail and which to suppress.",
          },
          {
            title: "Free on-page checks, no sign-up",
            body: "Try the email verifier on the marketing site first, then unlock 100 free credits when you register.",
          },
        ],
        cta: "Verify Emails Free",
        href: "/validate-email",
        cardClass: "bg-success-soft",
        Mockup: VerifyEmailsMockup,
      },
      {
        id: "bulk",
        icon: FileSpreadsheet,
        iconClass: "text-primary",
        iconWrapClass: "bg-primary/15",
        title: "Bulk Email Verifier",
        points: [
          {
            title: "Upload CSV, XLS or XLSX",
            body: "Clean CSV lists or import directly from your Drive and CRM — valid, invalid, catch-all, role, and disposable statuses out.",
          },
          {
            title: "Import from Google Drive and CRMs",
            body: "Bring lists from Google Drive, OneDrive, HubSpot, and Salesforce without juggling downloads.",
          },
          {
            title: "One-click clean export",
            body: "Download a cleaned list ready for outreach — credits never expire for the next upload.",
          },
        ],
        cta: "Clean a list",
        href: "/bulk-email-verifier",
        cardClass: "bg-lavender-soft",
        Mockup: VerifyEmailsMockup,
      },
      {
        id: "api",
        icon: Code2,
        iconClass: "text-primary-deep",
        iconWrapClass: "bg-primary-deep/10",
        title: "Email Validation API",
        points: [
          {
            title: "Block disposable and invalid emails at signup",
            body: "Real-time checks for signups, forms, CRMs, and other applications on the same credits as bulk.",
          },
          {
            title: "Unlimited API keys",
            body: "Issue keys for each environment after you register — no SDK lock-in required.",
          },
          {
            title: "Works with any HTTP client",
            body: "Docs-lite email verification API with curl and Node examples using real field names.",
          },
        ],
        cta: "View API Docs",
        href: "/email-verification-api",
        cardClass: "bg-teal-soft",
        Mockup: ApiKeysMockup,
      },
    ],
  },
  {
    id: "leads",
    label: "Lead Generation",
    pillars: [
      {
        id: "finder",
        icon: Search,
        iconClass: "text-success",
        iconWrapClass: "bg-success/15",
        title: "Email Finder",
        points: [
          {
            title: "Name + company or domain lookup",
            body: "Find verified emails by name, company, or LinkedIn profile — free if no email is found.",
          },
          {
            title: "LinkedIn profile lookup",
            body: "Paste a profile URL and get pre-checked work emails ready for outreach.",
          },
          {
            title: "Free if no email is found",
            body: "Only pay when the email finder returns a match — same credits as the email verifier.",
          },
        ],
        cta: "Find Verified Emails",
        href: "/email-finder",
        cardClass: "bg-success-soft",
        Mockup: FindEmailsMockup,
      },
      {
        id: "lead-finder",
        icon: UserSearch,
        iconClass: "text-primary",
        iconWrapClass: "bg-primary/15",
        title: "Lead Finder",
        points: [
          {
            title: "Describe your ICP in plain English",
            body: "Discover enriched B2B leads tailored to your ICP with AI — then verify before you send.",
          },
          {
            title: "Filter by title, industry, headcount and location",
            body: "Narrow millions of contacts to the buyers who match your outbound criteria.",
          },
          {
            title: "Signal-based prospecting",
            body: "Prioritize accounts with buying intent so outreach lands at the right moment.",
          },
        ],
        cta: "Find Leads with AI",
        href: "/find-leads",
        cardClass: "bg-lavender-soft",
        Mockup: FindLeadsMockup,
      },
      {
        id: "enrichment",
        icon: Database,
        iconClass: "text-primary-deep",
        iconWrapClass: "bg-primary-deep/10",
        title: "Data Enrichment",
        points: [
          {
            title: "Append emails, titles, seniority",
            body: "Enrich lists in bulk with verified emails, roles, and company data on one credit balance.",
          },
          {
            title: "LinkedIn URLs and company metadata",
            body: "Fill gaps in your CRM export so reps work from complete, verified records.",
          },
          {
            title: "Bulk upload",
            body: "Upload a CSV of names and domains — no match means no charge.",
          },
        ],
        cta: "Enrich a list",
        href: "/data-enrichment",
        cardClass: "bg-teal-soft",
        Mockup: FindEmailsMockup,
      },
    ],
  },
];

export default function ProductsFeatureTabs() {
  const tabsId = useId();
  const [activeId, setActiveId] = useState<CategoryTab["id"]>("verify");
  const active =
    CATEGORIES.find((category) => category.id === activeId) ?? CATEGORIES[0];

  return (
    <SectionShell
      id="products-features"
      className="bg-background pb-8 md:pb-12 lg:pb-16"
      ariaLabelledBy="products-features-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow align="center">Features</SectionEyebrow>
        <SectionHeading id="products-features-heading" withEyebrow>
          EmailVerifier.io products to verify emails and find verified leads
        </SectionHeading>
        <SectionLead className="mx-auto max-w-3xl">
          Switch between email verification and lead generation — one credit
          balance that never expires.
        </SectionLead>
      </div>

      <div
        className="mx-auto mt-8 flex max-w-lg rounded-full border border-line bg-surface-muted p-1"
        role="tablist"
        aria-label="Product categories"
      >
        {CATEGORIES.map((category) => {
          const selected = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={`${tabsId}-${category.id}`}
              aria-selected={selected}
              aria-controls={`${tabsId}-panel`}
              className={cn(
                "min-h-11 flex-1 rounded-full px-3 text-center text-sm font-semibold transition",
                selected
                  ? "bg-surface text-ink shadow-[var(--shadow-card)] ring-1 ring-line"
                  : "text-ink-muted hover:text-ink",
              )}
              onClick={() => setActiveId(category.id)}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${tabsId}-panel`}
        aria-labelledby={`${tabsId}-${active.id}`}
        className="mt-10 lg:mt-12"
      >
        <ol className="list-none space-y-0 p-0">
          {active.pillars.map((pillar, index) => {
            const imageFirst = index % 2 === 1;
            const Icon = pillar.icon;

            return (
              <li
                key={`${active.id}-${pillar.id}`}
                className={cn(
                  "relative",
                  index > 0 && "-mt-4 sm:-mt-5 lg:-mt-6",
                )}
                style={{ zIndex: index + 1 }}
              >
                <article
                  className={cn(
                    /* 1-off: 5px white edge so stacked pastel cards separate cleanly */
                    "grid items-center gap-8 rounded-3xl border-[5px] border-surface p-6 shadow-[var(--shadow-card)] sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10",
                    pillar.cardClass,
                  )}
                >
                  <div className={cn("min-w-0", imageFirst && "lg:order-2")}>
                    <span
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14",
                        pillar.iconWrapClass,
                      )}
                      aria-hidden
                    >
                      <Icon
                        className={cn(
                          "h-7 w-7 sm:h-8 sm:w-8",
                          pillar.iconClass,
                        )}
                        strokeWidth={1.75}
                      />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                      {pillar.title}
                    </h3>
                    <FeaturePointList
                      points={pillar.points}
                      idPrefix={`products-${active.id}-${pillar.id}`}
                    />
                    <Button
                      size="lg"
                      asChild
                      className="group mt-6 rounded-lg border border-ink bg-ink text-primary-foreground hover:bg-ink/90 active:bg-ink"
                    >
                      <Link
                        href={pillar.href}
                        data-ev-event="products_feature_cta"
                        data-ev-loc={`products-${pillar.id}`}
                      >
                        {pillar.cta}
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
                      imageFirst ? "lg:order-1 lg:pr-2" : "lg:pl-2",
                    )}
                    aria-hidden
                  >
                    <pillar.Mockup />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
}
