import Link from "next/link";
import {
  FileSpreadsheet,
  Linkedin,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { FindEmailsMockup } from "@/Components/home/feature-pillars/PillarMockups";
import ProofBar from "@/Components/home/ProofBar";
import { TrustStatsRow } from "@/Components/home/HomeStatsStrip";
import CTA from "@/Components/CTA";
import PricingSection from "@/Components/PricingSection";
import { Reveal } from "@/Components/landing/Reveal";
import { WhyUsTable } from "@/Components/landing/WhyUsTable";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { Button } from "@/Components/ui/Button";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StatusChip } from "@/Components/ui/StatusChip";
import { FIND_EMAILS_FAQS } from "@/lib/find-emails-faq";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const LOOKUP_MODES = [
  {
    step: "01",
    title: "Name and company",
    body: "Enter a person and domain. Keep the work address only after the email verifier checks it.",
    icon: Search,
  },
  {
    step: "02",
    title: "LinkedIn profile",
    body: "Paste a profile URL when that is what you have. Same credit rules — no charge when nothing is found.",
    icon: Linkedin,
  },
  {
    step: "03",
    title: "CSV bulk find",
    body: "Upload names and domains for data enrichment. Download matched rows. Optional fields stay off until you need them.",
    icon: FileSpreadsheet,
    href: "/data-enrichment",
  },
] as const satisfies ReadonlyArray<{
  step: string;
  title: string;
  body: string;
  icon: LucideIcon;
  href?: string;
}>;

const RESULT_GUIDE = [
  {
    status: "found + verified",
    variant: "success" as const,
    means: "A work address matched and passed the email verifier checks.",
    handling: "Safe to keep for outreach, still subject to your sending rules.",
  },
  {
    status: "no email found",
    variant: "neutral" as const,
    means: "The lookup returned nothing for that person or row.",
    handling: "Not charged. Drop the row or try another signal later.",
  },
  {
    status: "risky / invalid",
    variant: "warning" as const,
    means: "A candidate came back but failed deliverability or risk checks.",
    handling: "Suppress or segment — do not treat as ready to mail.",
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
  {
    feature: "Transparent $1.80/1K entry rate",
    ours: "yes" as const,
    others: "no" as const,
  },
] as const;

export default function FindEmailsPage() {
  return (
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="find-emails-heading"
    >
      <section
        className="relative pt-10 pb-12 md:pt-14 md:pb-16 lg:pb-20"
        aria-labelledby="find-emails-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Email Finder" },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium text-ink-muted">Email Finder</p>
            <h1
              id="find-emails-heading"
              className="mt-5 text-balance font-display text-3xl font-semibold capitalize leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              <span className="text-primary">Find emails</span>
              {" "}
              the email verifier can keep
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Look up a work address from a name, company, or LinkedIn. No match
              means no charge.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
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
                  data-ev-loc="find-emails-hero"
                >
                  Get 100 free credits
                </Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href="#pricing">See pricing</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl md:mt-10">
            <DesktopMockup chromeLabel="Find a work email by name, company, or LinkedIn">
              <FindEmailsMockup className="h-[26rem] rounded-xl border-0 shadow-none" />
            </DesktopMockup>
            <TrustStatsRow compact className="mt-8 w-full max-w-none" />
          </div>
        </div>
      </section>

      <ProofBar />

      <SectionShell
        className="bg-background"
        ariaLabelledBy="find-emails-modes-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="find-emails-modes-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Three ways to{" "}
            <span className="text-primary">find emails</span>
          </h2>
          <p className="mt-3 text-ink-muted">
            Same credit balance whether you look up one person or run bulk data
            enrichment on a spreadsheet.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <Reveal staggerSelector="[data-mode]">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LOOKUP_MODES.map((mode) => {
                const Icon = mode.icon;
                const cardClassName =
                  "relative overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/35";
                const content = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-3xl font-bold tracking-tight text-primary">
                        {mode.step}
                      </p>
                      <Icon
                        className="h-10 w-10 shrink-0 text-primary/20"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {mode.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {mode.body}
                    </p>
                  </>
                );
                return (
                  <li key={mode.step} data-mode>
                    {"href" in mode && mode.href ? (
                      <Link
                        href={mode.href}
                        id={mode.step === "03" ? "bulk-find" : undefined}
                        className={`block ${cardClassName}`}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className={cardClassName}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl bg-primary px-5 py-5 text-primary-foreground shadow-[var(--shadow-card)] sm:px-7 sm:py-6">
          <ShieldCheck
            className="pointer-events-none absolute -right-6 -bottom-8 h-40 w-40 text-primary-foreground/15"
            aria-hidden
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
              <ShieldCheck className="h-6 w-6" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed sm:text-base">
              <span className="mr-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                0
              </span>
              Credits charged when nothing is found — so you can email verify
              matches without paying for empty rows.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        className="bg-background"
        ariaLabelledBy="find-emails-result-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="find-emails-result-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Finder results you can act on
            </h2>
            <p className="mt-4 text-ink-muted">
              Every lookup ends in a clear outcome — keep, skip, or suppress —
              so prospecting stays tied to the email verifier.
            </p>
          </div>
          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
              <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Email finder result meanings and practical handling
                </caption>
                <thead>
                  <tr className="border-b border-line bg-surface-muted">
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
                    >
                      Result
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
                    >
                      What it means
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
                    >
                      Handling
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RESULT_GUIDE.map((row) => (
                    <tr
                      key={row.status}
                      className="border-b border-line last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-4 py-3.5 align-top font-medium text-ink"
                      >
                        <StatusChip
                          label={row.status}
                          variant={row.variant}
                          className="font-mono"
                        />
                      </th>
                      <td className="px-4 py-3.5 align-top leading-relaxed text-ink-muted">
                        {row.means}
                      </td>
                      <td className="px-4 py-3.5 align-top leading-relaxed text-ink-muted">
                        {row.handling}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <PricingSection
        variant="homepage"
        heading="Pay-as-you-go and volume pricing"
        lead={`Find Emails uses the same credits as the bulk email verifier — from $${RATE_PER_THOUSAND.toFixed(2)} per 1,000. Credits never expire.`}
      />

      <WhyUsTable
        className="bg-surface-muted"
        title="Why Find Emails with this email verifier"
        intro="One credit pool for finding and verifying — no separate suite seat."
        rows={[...WHY_ROWS]}
      />

      <LandingFaq
        className="bg-background"
        title="Email Finder questions"
        items={FIND_EMAILS_FAQS}
      />

      <CTA />
    </main>
  );
}
