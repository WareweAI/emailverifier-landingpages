import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { AppChromePreview } from "@/Components/ui/AppChromePreview";
import { ListCleanVisual } from "@/Components/ui/ListCleanVisual";
import { JobFlowStrip } from "@/Components/ui/JobFlowStrip";
import { EmptyStatePreview } from "@/Components/ui/EmptyStatePreview";
import { HeroWash } from "@/Components/ui/HeroWash";
import { SectionShell } from "@/Components/ui/SectionShell";
import { Reveal } from "@/Components/landing/Reveal";
import { MetricStrip } from "@/Components/landing/MetricStrip";
import { HowSteps } from "@/Components/landing/HowSteps";
import { WhyUsTable } from "@/Components/landing/WhyUsTable";
import { CreditPricingTeaser } from "@/Components/landing/CreditPricingTeaser";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { LandingFinalCta } from "@/Components/landing/LandingFinalCta";
import { BULK_PAGE_FAQS } from "@/lib/bulk-page-faq";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const METRICS = [
  {
    id: "rate",
    value: `$${RATE_PER_THOUSAND.toFixed(2)}`,
    label: "Per 1,000 at the 25K pack",
  },
  {
    id: "pack",
    value: "25K",
    label: "Emails for $45 (example)",
  },
  {
    id: "free",
    value: "100",
    countTo: 100,
    label: "Free credits on signup",
  },
  {
    id: "delete",
    value: "30 days",
    label: "File deletion after processing",
  },
] as const;

const PAIN_POINTS = [
  {
    title: "Cold lists go stale",
    body: "Purchased or scraped lists carry bounces, traps, and dead domains. Sending first is expensive.",
  },
  {
    title: "CRMs fill with junk",
    body: "Imports from events and forms drag in disposable and role inboxes that never reply.",
  },
  {
    title: "Reputation compounds",
    body: "Hard bounces and spam traps train providers to distrust your domain — not just that campaign.",
  },
] as const;

const STEPS = [
  {
    step: "1",
    title: "Export or import",
    body: "Pull emails from your CRM or spreadsheet — or import from Drive, OneDrive, Dropbox, or Airtable.",
  },
  {
    step: "2",
    title: "Upload the list",
    body: "Drop CSV, TXT, or XLSX into the bulk email verifier and start the job.",
  },
  {
    step: "3",
    title: "Review statuses",
    body: "See valid, risky, and invalid counts plus disposable, catch-all, and role flags.",
  },
  {
    step: "4",
    title: "Download clean rows",
    body: "Export what you will send. Same credits power the email verification API if you need live checks next.",
  },
] as const;

const WHY_ROWS = [
  {
    feature: "Honest public rate ($1.80/1K entry)",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Credits that never expire",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Bulk + API on one balance",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "Risk flags (disposable, catch-all, role)",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "No mail sent to verify",
    ours: "yes" as const,
    others: "yes" as const,
  },
] as const;

export default function BulkProductPage() {
  return (
    <main id="main-page" className="relative flex-1">
      <section
        className="relative pt-12 pb-16 lg:pt-16 lg:pb-20"
        aria-labelledby="bulk-hero-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10 min-w-0">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <p className="text-sm font-medium text-ink-muted">
              Bulk email verifier
            </p>
            <h1
              id="bulk-hero-heading"
              className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink lg:text-5xl"
            >
              Bulk email verifier for cold lists and CRM exports
            </h1>
            <p className="mt-4 text-lg text-ink-muted">
              Upload a CSV, get deliverability statuses for every address, and
              download a send-ready file — without sending mail. This email
              verifier uses the same ${RATE_PER_THOUSAND.toFixed(2)} per 1,000
              credits as the API; credits never expire.
            </p>
            <p className="mt-3 rounded-xl bg-primary-soft px-4 py-3 text-sm text-ink lg:inline-block">
              25,000 emails = <strong>$45</strong> · Example mix shown below
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button
                asChild
                size="lg"
                className="transition-transform hover:scale-[1.02] active:scale-[0.99] motion-reduce:transform-none"
              >
                <Link
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="cta_register_click"
                  data-ev-loc="bulk-hero"
                >
                  Get 100 free credits
                </Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-ink-muted lg:justify-start">
              {(
                [
                  "CSV, TXT, or XLSX",
                  "Valid / Risky / Invalid",
                  "No credit card",
                ] as const
              ).map((label) => (
                <li key={label} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 space-y-6 lg:mt-12">
            <JobFlowStrip />
            <AppChromePreview focus="projects" />
          </div>
        </div>
      </section>

      <MetricStrip items={[...METRICS]} eyebrow="Bulk email verifier facts" />

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="bulk-problem-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="bulk-problem-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Dirty lists punish outreach before you write the email
          </h2>
          <p className="mt-3 text-ink-muted">
            Cold outreach list cleaning is not optional if you care about inbox
            placement. A bulk email verifier removes the worst rows before the
            sequence starts.
          </p>
        </div>
        <Reveal className="mt-10" staggerSelector="[data-pain]">
          <ul className="grid gap-4 md:grid-cols-3">
            {PAIN_POINTS.map((item) => (
              <li
                key={item.title}
                data-pain
                className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/35"
              >
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </SectionShell>

      <SectionShell ariaLabelledBy="bulk-before-after-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="bulk-before-after-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            See a dirty list become send-ready
          </h2>
          <p className="mt-3 text-ink-muted">
            Your bulk email verifier maps every row to a status — so you know
            what to keep, review, or remove before the next campaign.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <ListCleanVisual />
        </div>
      </SectionShell>

      <HowSteps
        className="bg-surface-muted"
        title="How to email verify a full list"
        intro="Four steps from export to download — the same workflow marketers use in the dashboard."
        steps={[...STEPS]}
      />

      <SectionShell ariaLabelledBy="bulk-roi-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="bulk-roi-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Concrete cost for a 25K clean
            </h2>
            <p className="mt-4 text-ink-muted">
              At the entry pack, 25,000 verifications cost $45. That is less than
              many suites charge for a fraction of the volume — and unused
              credits stay on your balance indefinitely.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="cta_register_click"
                  data-ev-loc="bulk-roi"
                >
                  Get 100 free credits
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/email-verification-api">
                  Prefer the email verification API?
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-ink-muted">
              After signup — upload your first list
            </p>
            <EmptyStatePreview />
          </div>
        </div>
      </SectionShell>

      <WhyUsTable
        className="bg-surface-muted"
        title="Why this bulk email verifier"
        intro="One honest rate. One credit pool. No suite lock-in for list cleaning."
        rows={[...WHY_ROWS]}
      />

      <CreditPricingTeaser
        title="Clean the list. Keep the credits."
        eventLoc="bulk-pricing-teaser"
      />

      <LandingFaq title="Bulk email verifier questions" items={BULK_PAGE_FAQS} />

      <LandingFinalCta
        title="Ready to clean the next cold list?"
        body="Upload a CSV with 100 free credits. Same email verifier balance as the API — credits never expire."
        eventLoc="bulk-final-cta"
      />
    </main>
  );
}
