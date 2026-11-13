import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StatusChip } from "@/Components/ui/StatusChip";
import { TrustStatsRow } from "@/Components/home/HomeStatsStrip";
import ProofBar from "@/Components/home/ProofBar";
import { Reveal } from "@/Components/landing/Reveal";
import { WhyUsTable } from "@/Components/landing/WhyUsTable";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import CTA from "@/Components/CTA";
import PricingSection from "@/Components/PricingSection";
import { BulkUploadDemo } from "@/Components/bulk/BulkUploadDemo";
import { BULK_PAGE_FAQS } from "@/lib/bulk-page-faq";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const OUTPUT_STATUSES = [
  {
    status: "valid",
    variant: "success" as const,
    means: "Mailbox accepted — safe to keep for outreach or nurture.",
  },
  {
    status: "invalid",
    variant: "danger" as const,
    means: "Hard failures: bad syntax, missing MX, or SMTP rejection.",
  },
  {
    status: "catch-all",
    variant: "warning" as const,
    means: "Domain accepts unknown recipients — treat as risky, not valid.",
  },
  {
    status: "role-based",
    variant: "warning" as const,
    means: "Shared inboxes like info@, admin@, or support@.",
  },
  {
    status: "disposable",
    variant: "danger" as const,
    means: "Temporary or throwaway providers — suppress before you send.",
  },
  {
    status: "syntax error",
    variant: "danger" as const,
    means: "Malformed addresses that fail basic format checks.",
  },
  {
    status: "spam traps",
    variant: "danger" as const,
    means: "Flagged trap patterns that can damage sender reputation.",
  },
] as const;

const INTEGRATIONS = [
  {
    id: "google-sheets",
    label: "Google Sheets",
    src: "/logos/integrations/google-sheets.svg",
    width: 40,
    height: 54,
    showLabel: true,
  },
  {
    id: "hubspot",
    label: "HubSpot",
    src: "/logos/integrations/hubspot-wordmark.png",
    width: 150,
    height: 42,
    showLabel: false,
  },
  {
    id: "salesforce",
    label: "Salesforce",
    src: "/logos/integrations/salesforce-wordmark.png",
    width: 120,
    height: 84,
    showLabel: false,
  },
  {
    id: "pipedrive",
    label: "Pipedrive",
    src: "/logos/integrations/pipedrive-wordmark.png",
    width: 160,
    height: 36,
    showLabel: false,
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
    feature: "Risk flags (disposable, catch-all, role, spam traps)",
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
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="bulk-hero-heading"
    >
      <section
        className="relative pt-10 pb-12 md:pt-14 md:pb-16 lg:pb-20"
        aria-labelledby="bulk-hero-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Bulk Email Verifier" },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium text-ink-muted">
              Bulk email verifier
            </p>
            <h1
              id="bulk-hero-heading"
              className="mt-5 text-balance font-display text-3xl font-semibold capitalize leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              <span className="text-primary">Bulk Email Verifier</span>
              {" "}
              & List Cleaning Service
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Drop a CSV, TXT, or Excel list into this email verifier. Get
              statuses for every row — same ${RATE_PER_THOUSAND.toFixed(2)}/1K
              credits as the API, never expire.
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
                  data-ev-loc="bulk-hero"
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
            <DesktopMockup chromeLabel="Drag and drop CSV / TXT / Excel to clean your list">
              <BulkUploadDemo />
            </DesktopMockup>
            <TrustStatsRow compact className="mt-8 w-full max-w-none" />
          </div>
        </div>
      </section>

      <ProofBar />

      <SectionShell
        className="bg-background"
        ariaLabelledBy="bulk-outputs-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="bulk-outputs-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Bulk cleaning outputs you can act on
            </h2>
            <p className="mt-4 text-ink-muted">
              Every row from your bulk email verifier maps to a clear status —
              so you know what to keep, segment, or suppress before the next
              campaign.
            </p>
          </div>
          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
              <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Bulk email verifier status meanings
                </caption>
                <thead>
                  <tr className="border-b border-line bg-surface-muted">
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
                    >
                      What it means
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {OUTPUT_STATUSES.map((row) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-2xl bg-primary px-5 py-5 text-primary-foreground shadow-[var(--shadow-card)] sm:px-7 sm:py-6">
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
                &lt;2%
              </span>
              Clean lists with this bulk email verifier to keep bounce rates
              under 2% and protect inbox placement — backed by our 99.7%
              deliverability standard.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="bulk-integrations-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="bulk-integrations-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Sync lists from the tools you already use
          </h2>
          <p className="mt-3 text-ink-muted">
            Connect Google Sheets, HubSpot, or Salesforce when enabled in your
            account — or export CSV from Pipedrive and other CRMs and drop the
            file into the bulk email verifier.
          </p>
        </div>
        <ul
          className="mx-auto mt-10 flex max-w-4xl list-none flex-wrap items-center justify-center gap-x-10 gap-y-6 p-0 sm:gap-x-14"
          aria-label="Bulk email verifier integrations"
        >
          {INTEGRATIONS.map((logo) => (
            <li key={logo.id} className="flex items-center gap-2.5">
              <Image
                src={logo.src}
                alt={logo.showLabel ? "" : logo.label}
                width={logo.width}
                height={logo.height}
                unoptimized
                className="h-9 w-auto object-contain sm:h-10"
                loading="lazy"
              />
              {logo.showLabel ? (
                <span className="text-base font-semibold tracking-tight text-ink sm:text-lg">
                  {logo.label}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" asChild>
            <Link href="/integrations">See all integrations</Link>
          </Button>
        </div>
      </SectionShell>

      <PricingSection
        variant="homepage"
        heading="Pay-as-you-go and volume pricing"
        lead={`Buy credits once for this bulk email verifier — from $${RATE_PER_THOUSAND.toFixed(2)} per 1,000. Larger packs lower the per-email rate. Credits never expire. Unlimited monthly plan listed as upcoming.`}
      />

      <WhyUsTable
        className="bg-surface-muted"
        title="Why this bulk email verifier"
        intro="One honest rate. One credit pool. No suite lock-in for list cleaning."
        rows={[...WHY_ROWS]}
      />

      <LandingFaq
        className="bg-background"
        title="Bulk email verifier questions"
        items={BULK_PAGE_FAQS}
      />

      <CTA />
    </main>
  );
}
