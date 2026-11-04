import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, FileSpreadsheet, Linkedin, Search } from "lucide-react";
import { FindEmailsMockup } from "@/Components/home/feature-pillars/PillarMockups";
import { FinderChecks, FinderCtas } from "@/Components/find/FinderPageParts";
import { HeroWash } from "@/Components/ui/HeroWash";
import { SectionShell } from "@/Components/ui/SectionShell";
import { Button } from "@/Components/ui/Button";
import { Reveal } from "@/Components/landing/Reveal";
import { MetricStrip } from "@/Components/landing/MetricStrip";
import { HowSteps } from "@/Components/landing/HowSteps";
import { WhyUsTable } from "@/Components/landing/WhyUsTable";
import { CreditPricingTeaser } from "@/Components/landing/CreditPricingTeaser";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { LandingFinalCta } from "@/Components/landing/LandingFinalCta";
import { FIND_EMAILS_FAQS } from "@/lib/find-emails-faq";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const METRICS = [
  {
    id: "modes",
    value: "3 ways",
    label: "Name+company · LinkedIn · CSV",
  },
  {
    id: "charge",
    value: "0",
    countTo: 0,
    label: "Credits when nothing is found",
  },
  {
    id: "rate",
    value: `$${RATE_PER_THOUSAND.toFixed(2)}`,
    label: "Per 1,000 on the shared balance",
  },
  {
    id: "free",
    value: "100",
    countTo: 100,
    label: "Free credits on signup",
  },
] as const;

const LOOKUP_MODES = [
  {
    title: "Name and company",
    body: "Enter a person and domain. Keep the work address only after the email verifier checks it.",
    icon: Search,
  },
  {
    title: "LinkedIn profile",
    body: "Paste a profile URL when that is what you have. Same credit rules — no charge when nothing is found.",
    icon: Linkedin,
  },
  {
    title: "CSV bulk find",
    body: "Upload names and domains. Download matched rows. Optional enrichment stays off until you need it.",
    icon: FileSpreadsheet,
  },
] as const;

const STEPS = [
  {
    step: "1",
    title: "Look up one person",
    body: "Enter a name and company domain, or use the LinkedIn tab when you already have a profile.",
  },
  {
    step: "2",
    title: "Or upload a CSV",
    body: "Bulk find takes a file of names and domains and returns the rows that matched.",
  },
  {
    step: "3",
    title: "Email verify the match",
    body: "Each address is checked before you download it — syntax, mailbox, and risk flags.",
  },
  {
    step: "4",
    title: "Keep what verifies",
    body: "A row with no email is not charged. Export only what you will use in outreach.",
  },
] as const;

const WHY_ROWS = [
  {
    feature: "Finder + verifier on one credit pool",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "Not charged when nothing is found",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "LinkedIn + name/company + CSV",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "Credits that never expire",
    ours: "yes" as const,
    others: "no" as const,
  },
] as const;

export default function FindEmailsPage() {
  return (
    <main id="main-page" className="relative flex-1">
      <section
        className="relative pt-12 pb-16 lg:pt-16 lg:pb-20"
        aria-labelledby="find-emails-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10 grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <p className="text-sm font-medium text-ink-muted">Find Emails</p>
            <h1
              id="find-emails-heading"
              className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink lg:text-5xl"
            >
              Find work emails the email verifier can keep
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Look up a work address from a name and company, a LinkedIn
              profile, or a CSV of names and domains — then email verify each
              match before you keep it. A row with no match is not charged.
              Lookups use the same credits as the bulk email verifier — $
              {RATE_PER_THOUSAND.toFixed(2)} per 1,000 at the 25K pack.
            </p>
            <FinderCtas loc="find-emails-hero" />
            <FinderChecks
              items={[
                "Name and company",
                "LinkedIn",
                "CSV bulk find",
                "Not charged when nothing is found",
              ]}
            />
          </div>
          <figure className="min-w-0">
            <figcaption className="mb-3 text-sm text-ink-muted">
              Example search and bulk task. Counts are illustrative.
            </figcaption>
            <FindEmailsMockup />
          </figure>
        </div>
      </section>

      <MetricStrip items={[...METRICS]} eyebrow="Find Emails facts" />

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="find-emails-problem-heading"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="find-emails-problem-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Guessing patterns burns sequences
            </h2>
            <p className="mt-4 text-ink-muted">
              first.last@guess.com feels fast until bounces pile up. Find Emails
              returns a candidate, then the email verifier checks deliverability
              and risk flags — so prospecting and list quality stay on the same
              tool.
            </p>
          </div>
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
              <p className="text-sm font-semibold text-ink">
                What a finished row looks like
              </p>
              <ul className="mt-4 divide-y divide-line text-sm">
                <li className="flex items-center justify-between gap-3 py-3">
                  <span className="min-w-0 truncate font-medium text-ink">
                    alex.morgan@northpeak.io
                  </span>
                  <span className="shrink-0 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-ink">
                    Safe to send
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3 py-3">
                  <span className="text-ink-muted">No email found</span>
                  <span className="shrink-0 text-xs font-medium text-ink-muted">
                    Not charged
                  </span>
                </li>
              </ul>
              <p className="mt-2 text-xs text-ink-muted">
                Example rows, not a live lookup.
              </p>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell ariaLabelledBy="find-emails-modes-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="find-emails-modes-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Three ways to find emails
          </h2>
          <p className="mt-3 text-ink-muted">
            Same credit balance whether you look up one person or enrich a
            spreadsheet.
          </p>
        </div>
        <Reveal className="mt-10" staggerSelector="[data-mode]">
          <ul className="grid gap-4 md:grid-cols-3">
            {LOOKUP_MODES.map((mode) => {
              const Icon = mode.icon;
              return (
                <li
                  key={mode.title}
                  data-mode
                  className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/35 motion-reduce:transform-none"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <p className="mt-4 font-semibold text-ink">{mode.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {mode.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </SectionShell>

      <HowSteps
        className="bg-surface-muted"
        title="How Find Emails works with the email verifier"
        steps={[...STEPS]}
      />

      {/* Stronger Data Enrichment / Bulk Find destination for header hash */}
      <SectionShell
        id="bulk-find"
        className="scroll-mt-28"
        ariaLabelledBy="bulk-find-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm font-medium text-ink-muted">Data enrichment</p>
            <h2
              id="bulk-find-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Bulk find: enrich a CSV of names and domains
            </h2>
            <p className="mt-4 text-ink-muted">
              Data enrichment here means attaching verified work emails to rows
              you already have — name, company domain, optional role or company
              fields — then downloading the completed task. You are not charged
              for rows that return nothing. Enrichment fields stay optional so
              you only pay for what you need.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-muted">
              {(
                [
                  "Upload CSV of names + domains",
                  "Optional enrichment fields",
                  "Download matched, verified rows",
                  "Same credits as single Find Emails",
                ] as const
              ).map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="transition-transform hover:scale-[1.02] motion-reduce:transform-none"
              >
                <Link
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="cta_register_click"
                  data-ev-loc="bulk-find"
                >
                  Start bulk find
                </Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href="/find-leads">Need people first?</Link>
              </Button>
            </div>
          </div>
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
              <div className="border-b border-line bg-surface-muted px-4 py-3">
                <p className="text-sm font-semibold text-ink">
                  Bulk find task · example
                </p>
                <p className="text-xs text-ink-muted">
                  Illustrative progress — not a live job
                </p>
              </div>
              <div className="space-y-3 p-4">
                {(
                  [
                    ["Rows submitted", "500"],
                    ["Emails found", "312"],
                    ["Not charged (no match)", "188"],
                    ["Credits used", "312"],
                  ] as const
                ).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line bg-background px-3 py-2.5 text-sm"
                  >
                    <span className="text-ink-muted">{k}</span>
                    <span className="font-semibold tabular-nums text-ink">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-line px-4 py-3">
                <Image
                  src="/logos/integrations/google-drive.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                  unoptimized
                />
                <p className="text-xs text-ink-muted">
                  Import sources available in-app after signup
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <WhyUsTable
        className="bg-surface-muted"
        title="Why Find Emails with this email verifier"
        rows={[...WHY_ROWS]}
      />

      <CreditPricingTeaser
        title="Find the address. Verify it. Same credits."
        eventLoc="find-emails-pricing"
      />

      <LandingFaq title="Find Emails questions" items={FIND_EMAILS_FAQS} />

      <LandingFinalCta
        title="Stop guessing inboxes"
        body="Find work emails, email verify the match, and keep only what you will send. 100 free credits — no card."
        secondaryHref="/bulk-email-verifier"
        secondaryLabel="Already have a list?"
        eventLoc="find-emails-final"
      />
    </main>
  );
}
