import Link from "next/link";
import {
  Building2,
  Filter,
  ListPlus,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { FindLeadsMockup } from "@/Components/home/feature-pillars/PillarMockups";
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
import { FIND_LEADS_FAQS } from "@/lib/find-leads-faq";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const CAPABILITIES = [
  {
    step: "01",
    title: "Plain-language brief",
    body: "Describe role, company type, and size. Get people or companies back — no filter maze to start.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Person or company",
    body: "Switch between people and company search. Local search stays marked Soon until it ships.",
    icon: Building2,
  },
  {
    step: "03",
    title: "Saveable lead lists",
    body: "Filter results, save the list, and keep only the contacts you want to email.",
    icon: ListPlus,
  },
  {
    step: "04",
    title: "Verify before outreach",
    body: "When a row includes an email, email verify it on the same credits. No email found = not charged.",
    icon: Filter,
  },
] as const satisfies ReadonlyArray<{
  step: string;
  title: string;
  body: string;
  icon: LucideIcon;
}>;

const RESULT_GUIDE = [
  {
    status: "email attached",
    variant: "success" as const,
    means: "The lead includes a work address ready for the email verifier.",
    handling: "Verify, then keep for outreach if statuses pass.",
  },
  {
    status: "no email found",
    variant: "neutral" as const,
    means: "The person or company matched, but no address came back.",
    handling: "Not charged for that row. Save the lead or drop it.",
  },
  {
    status: "soon: local",
    variant: "warning" as const,
    means: "Local search is listed in the product UI but is not live yet.",
    handling: "Use person or company search until local ships.",
  },
] as const;

const WHY_ROWS = [
  {
    feature: "Prospecting + verification in one product",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "Not charged when no email is found",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Honest credit pricing (never expire)",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Clear about what is Soon vs live",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Transparent $1.80/1K entry rate",
    ours: "yes" as const,
    others: "no" as const,
  },
] as const;

export default function FindLeadsPage() {
  return (
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="find-leads-heading"
    >
      <section
        className="relative pt-10 pb-12 md:pt-14 md:pb-16 lg:pb-20"
        aria-labelledby="find-leads-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Lead Finder" },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium text-ink-muted">Lead Finder</p>
            <h1
              id="find-leads-heading"
              className="mt-5 text-balance font-display text-3xl font-semibold capitalize leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              <span className="text-primary">Find B2B leads</span>
              {" "}
              the email verifier can keep
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Write a brief and get people or companies back.
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
                  data-ev-loc="find-leads-hero"
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
            <DesktopMockup chromeLabel="Describe who you want — people or companies">
              <FindLeadsMockup className="h-[26rem] rounded-xl border-0 shadow-none" />
            </DesktopMockup>
            <TrustStatsRow compact className="mt-8 w-full max-w-none" />
          </div>
        </div>
      </section>

      <ProofBar />

      <SectionShell
        className="bg-background"
        ariaLabelledBy="find-leads-caps-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="find-leads-caps-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Built for prospecting next to the{" "}
            <span className="text-primary">email verifier</span>
          </h2>
          <p className="mt-3 text-ink-muted">
            Capabilities that match the dashboard — including what is still Soon.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <Reveal staggerSelector="[data-cap]">
            <ul className="grid gap-4 sm:grid-cols-2">
              {CAPABILITIES.map((cap) => {
                const Icon = cap.icon;
                return (
                  <li
                    key={cap.step}
                    data-cap
                    className="relative overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/35"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-3xl font-bold tracking-tight text-primary">
                        {cap.step}
                      </p>
                      <Icon
                        className="h-10 w-10 shrink-0 text-primary/20"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {cap.body}
                    </p>
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
              Credits when no email is found — discovery and list quality share
              one honest balance with the email verifier.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        className="bg-background"
        ariaLabelledBy="find-leads-result-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="find-leads-result-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Lead results you can act on
            </h2>
            <p className="mt-4 text-ink-muted">
              Prospecting without verification is half a workflow. Read each row
              before the sequence goes out.
            </p>
          </div>
          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
              <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Lead finder result meanings and practical handling
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
        lead={`Find Leads uses the same credits as the email verifier — from $${RATE_PER_THOUSAND.toFixed(2)} per 1,000. Credits never expire.`}
      />

      <WhyUsTable
        className="bg-surface-muted"
        title="Why Find Leads here"
        intro="Prospect, save lists, and email verify without juggling another suite seat."
        rows={[...WHY_ROWS]}
      />

      <LandingFaq
        className="bg-background"
        title="Lead Finder questions"
        items={FIND_LEADS_FAQS}
      />

      <CTA />

      <p className="sr-only">
        Prefer cleaning addresses you already have? Use the{" "}
        <Link href="/bulk-email-verifier">bulk email verifier</Link>. Already
        have a name?{" "}
        <Link href="/email-finder">Find Emails</Link>.
      </p>
    </main>
  );
}
