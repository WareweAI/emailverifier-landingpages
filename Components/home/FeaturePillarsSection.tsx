import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
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

type Pillar = {
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

const PILLARS: Pillar[] = [
  {
    id: "verify",
    icon: MailCheck,
    iconClass: "text-success",
    iconWrapClass: "bg-success/15",
    title: "Email Verifier",
    points: [
      {
        title: "Verify a single email or a list",
        body: "Check individual email addresses in seconds, or upload bulk CSV/XLS lists — or import directly from Google Drive, OneDrive, and your CRM to clean thousands of contacts at once.",
      },
      {
        title: "Deliverability score",
        body: "Get an instant 0–100 confidence score and catch-all status for every address so you know exactly which emails are safe to send and which to suppress.",
      },
      {
        title: "Accurate and most reliable verifier",
        body: "Prevent bounce rates and protect your sender reputation with multi-step verification across syntax, DNS/MX records, disposable providers, spam traps, and real-time SMTP server responses.",
      },
    ],
    cta: "Verify Emails Free",
    href: "https://app.emailverifier.io/dashboard/verify",
    cardClass: "bg-success-soft",
    Mockup: VerifyEmailsMockup,
  },
  {
    id: "find",
    icon: Search,
    iconClass: "text-primary",
    iconWrapClass: "bg-primary/15",
    title: "Email Finder",
    points: [
      {
        title: "Find an email by name and company",
        body: "Enter any prospect's full name and company name or domain to uncover their verified professional email address in real time.",
      },
      {
        title: "Find by LinkedIn profile",
        body: "Turn LinkedIn profiles into reachable decision-makers with pre-verified work emails that pass strict deliverability checks before export.",
      },
      {
        title: "Enrich data in bulk",
        body: "Upload contact lists in bulk and automatically append verified emails, job titles, seniority, LinkedIn URLs, and company metadata.",
      },
    ],
    cta: "Find Verified Emails",
    href: "https://app.emailverifier.io/dashboard/find",
    cardClass: "bg-lavender-soft",
    Mockup: FindEmailsMockup,
  },
  {
    id: "leads",
    icon: UserSearch,
    iconClass: "text-primary-deep",
    iconWrapClass: "bg-primary-deep/10",
    title: "Lead Finder",
    points: [
      {
        title: "Find leads with AI from an ICP",
        body: "Describe your Ideal Customer Profile in plain English and let AI instantly build a targeted list of high-fit companies and decision-makers.",
      },
      {
        title: "Find leads by person, company, and location",
        body: "Filter millions of B2B contacts by job title, seniority, industry, company headcount, tech stack, and local or global geography.",
      },
      {
        title: "Signal-based outreach",
        body: "Identify accounts showing active buying intent — such as recent funding, leadership changes, or hiring surges — so you reach out at the right moment.",
      },
    ],
    cta: "Find Leads with AI",
    href: "https://app.emailverifier.io/dashboard/leads",
    cardClass: "bg-teal-soft",
    Mockup: FindLeadsMockup,
  },
];

export default function FeaturePillarsSection() {
  return (
    <SectionShell
      id="features"
      className="bg-background pb-8 md:pb-12 lg:pb-16"
      ariaLabelledBy="feature-pillars-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow align="center">Features</SectionEyebrow>
        <SectionHeading id="feature-pillars-heading">
          EmailVerifier.io Standout Features to Ensure 99.7% Deliverability
        </SectionHeading>
        <SectionLead>
          Your must have tool in your email outreach that saves sender
          reputation, prevents bounces and enrich fresh leads with valid emails.
        </SectionLead>
      </div>

      <ol className="mt-12 list-none space-y-0 p-0 lg:mt-16">
        {PILLARS.map((pillar, index) => {
          const imageFirst = index % 2 === 1;

          return (
            <li
              key={pillar.id}
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
                  pillar.cardClass
                )}
              >
                <div className={cn("min-w-0", imageFirst && "lg:order-2")}>
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14",
                      pillar.iconWrapClass
                    )}
                    aria-hidden
                  >
                    <pillar.icon
                      className={cn("h-7 w-7 sm:h-8 sm:w-8", pillar.iconClass)}
                      strokeWidth={1.75}
                    />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {pillar.title}
                  </h3>
                  <FeaturePointList
                    points={pillar.points}
                    idPrefix={`pillar-${pillar.id}`}
                  />
                  <Button
                    size="lg"
                    asChild
                    className="group mt-6 rounded-lg border border-ink bg-ink text-primary-foreground hover:bg-ink/90 active:bg-ink"
                  >
                    <Link
                      href={pillar.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ev-event="feature_pillar_cta"
                      data-ev-loc={`pillar-${pillar.id}`}
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
                    imageFirst ? "lg:order-1 lg:pr-2" : "lg:pl-2"
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
    </SectionShell>
  );
}
