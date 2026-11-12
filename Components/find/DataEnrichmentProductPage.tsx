import Link from "next/link";
import {
  Download,
  FileSpreadsheet,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { BulkFindDemo } from "@/Components/find/BulkFindDemo";
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
import { DATA_ENRICHMENT_FAQS } from "@/lib/data-enrichment-faq";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const STEPS = [
  {
    step: "01",
    title: "Upload names and domains",
    body: "Drop a CSV of people you already know — name, company domain, optional role fields.",
    icon: Upload,
  },
  {
    step: "02",
    title: "Choose enrichment fields",
    body: "Optional enrichment stays off until you need it, so you only pay for what you use.",
    icon: SlidersHorizontal,
  },
  {
    step: "03",
    title: "Email verify matches",
    body: "Each found address is checked by the email verifier before it lands in your export.",
    icon: FileSpreadsheet,
  },
  {
    step: "04",
    title: "Download completed rows",
    body: "Keep matched, verified rows. Empty matches are not charged on the shared credit balance.",
    icon: Download,
  },
] as const satisfies ReadonlyArray<{
  step: string;
  title: string;
  body: string;
  icon: LucideIcon;
}>;

const OUTPUT_GUIDE = [
  {
    status: "email found",
    variant: "success" as const,
    means: "A verified work address was attached to the row.",
    handling: "Keep for outreach after your own send rules.",
  },
  {
    status: "no match",
    variant: "neutral" as const,
    means: "Nothing returned for that name and domain.",
    handling: "Not charged. Drop or retry with better inputs.",
  },
  {
    status: "optional fields",
    variant: "warning" as const,
    means: "Extra enrichment columns stay optional in the job.",
    handling: "Enable only the fields you need before running.",
  },
] as const;

const WHY_ROWS = [
  {
    feature: "CSV enrichment + email verifier on one balance",
    ours: "yes" as const,
    others: "partial" as const,
  },
  {
    feature: "Not charged when nothing is found",
    ours: "yes" as const,
    others: "no" as const,
  },
  {
    feature: "Optional enrichment fields",
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

export default function DataEnrichmentProductPage() {
  return (
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="data-enrichment-heading"
    >
      <section
        className="relative pt-10 pb-12 md:pt-14 md:pb-16 lg:pb-20"
        aria-labelledby="data-enrichment-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Products" },
              { label: "Data Enrichment" },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium text-ink-muted">Data Enrichment</p>
            <h1
              id="data-enrichment-heading"
              className="mt-5 text-balance font-display text-3xl font-semibold capitalize leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              <span className="text-primary">Enrich lists</span>
              {" "}
              with an email verifier built in
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Upload a CSV of names and domains. No match means no charge.
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
                  data-ev-loc="data-enrichment-hero"
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
            <DesktopMockup chromeLabel="Bulk find — enrich a CSV of names and domains">
              <BulkFindDemo />
            </DesktopMockup>
            <TrustStatsRow compact className="mt-8 w-full max-w-none" />
          </div>
        </div>
      </section>

      <ProofBar />

      <SectionShell
        className="bg-background"
        ariaLabelledBy="enrichment-steps-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="enrichment-steps-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            How{" "}
            <span className="text-primary">data enrichment</span> works
          </h2>
          <p className="mt-3 text-ink-muted">
            Attach verified emails to rows you already have — then email verify
            before you export.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <Reveal staggerSelector="[data-enrich-step]">
            <ul className="grid gap-4 sm:grid-cols-2">
              {STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.step}
                    data-enrich-step
                    className="relative overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/35"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-3xl font-bold tracking-tight text-primary">
                        {item.step}
                      </p>
                      <Icon
                        className="h-10 w-10 shrink-0 text-primary/20"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.body}
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
              Credits for empty matches — enrichment and the email verifier share
              one balance so empty rows never inflate the bill.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        className="bg-background"
        ariaLabelledBy="enrichment-outputs-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="enrichment-outputs-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              Enrichment outputs you can act on
            </h2>
            <p className="mt-4 text-ink-muted">
              Every row maps to a clear outcome so you know what to keep,
              skip, or re-run.
            </p>
          </div>
          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
              <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Data enrichment result meanings and practical handling
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
                  {OUTPUT_GUIDE.map((row) => (
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
        lead={`Data enrichment uses the same credits as the email verifier — from $${RATE_PER_THOUSAND.toFixed(2)} per 1,000. Credits never expire.`}
      />

      <WhyUsTable
        className="bg-surface-muted"
        title="Why enrich lists here"
        intro="Bulk find, verify, and export on one honest credit pool."
        rows={[...WHY_ROWS]}
      />

      <LandingFaq
        className="bg-background"
        title="Data enrichment questions"
        items={DATA_ENRICHMENT_FAQS}
      />

      <CTA />
    </main>
  );
}
