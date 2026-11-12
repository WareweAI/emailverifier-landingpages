import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Code2, FileSpreadsheet, Upload } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { SectionShell } from "@/Components/ui/SectionShell";
import ApiSnippet from "@/Components/ui/ApiSnippet";
import { Reveal } from "@/Components/landing/Reveal";
import { MetricStrip } from "@/Components/landing/MetricStrip";
import { HowSteps } from "@/Components/landing/HowSteps";
import { CreditPricingTeaser } from "@/Components/landing/CreditPricingTeaser";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { LandingFinalCta } from "@/Components/landing/LandingFinalCta";
import { INTEGRATIONS_FAQS } from "@/lib/integrations-faq";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

const IMPORT_SOURCES = [
  {
    id: "gdrive",
    label: "Google Drive",
    src: "/logos/integrations/google-drive.svg",
    body: "Pull spreadsheets from Drive into the bulk email verifier.",
  },
  {
    id: "onedrive",
    label: "OneDrive",
    src: "/logos/integrations/onedrive.svg",
    body: "Import lists stored in OneDrive without a local download first.",
  },
  {
    id: "dropbox",
    label: "Dropbox",
    src: "/logos/integrations/dropbox.svg",
    body: "Connect Dropbox folders when your team already shares CSVs there.",
  },
  {
    id: "airtable",
    label: "Airtable",
    src: "/logos/integrations/airtable.svg",
    body: "Bring Airtable bases into a verification job when the table holds emails.",
  },
] as const;

const CRM_SOURCES = [
  {
    id: "hubspot",
    label: "HubSpot",
    src: "/logos/integrations/hubspot.svg",
    body: "Available as a connected import path in the product UI when enabled for your account.",
  },
  {
    id: "salesforce",
    label: "Salesforce",
    src: "/logos/integrations/salesforce.svg",
    body: "Available as a connected import path in the product UI when enabled for your account.",
  },
] as const;

const METRICS = [
  {
    id: "imports",
    value: "4+",
    label: "Cloud import sources",
  },
  {
    id: "files",
    value: "CSV · TXT · XLSX",
    label: "Direct upload formats",
  },
  {
    id: "api",
    value: "HTTPS",
    label: "Real-time email verification API",
  },
  {
    id: "rate",
    value: `$${RATE_PER_THOUSAND.toFixed(2)}`,
    label: "Per 1,000 shared credits",
  },
] as const;

const STEPS = [
  {
    step: "1",
    title: "Connect or upload",
    body: "Link Drive, OneDrive, Dropbox, or Airtable — or drop a CSV, TXT, or XLSX.",
  },
  {
    step: "2",
    title: "Run the email verifier",
    body: "Bulk-clean the list or call the email verification API for live form checks.",
  },
  {
    step: "3",
    title: "Export statuses",
    body: "Download deliverable, risky, and invalid rows with the same flags as the dashboard.",
  },
  {
    step: "4",
    title: "Send with confidence",
    body: "Keep clean contacts in your CRM or sequence tool — credits never expire for the next import.",
  },
] as const;

const PATHS: {
  title: string;
  body: string;
  href: string;
  cta: string;
  icon: typeof Upload;
  external?: boolean;
}[] = [
  {
    title: "File upload",
    body: "Fastest path: export from any tool, upload CSV/TXT/XLSX, download statuses.",
    href: "/bulk-email-verifier",
    cta: "Bulk email verifier",
    icon: Upload,
  },
  {
    title: "Cloud import",
    body: "Pull lists from Drive, OneDrive, Dropbox, or Airtable inside the dashboard.",
    href: REGISTER_URL,
    cta: "Open dashboard",
    icon: FileSpreadsheet,
    external: true,
  },
  {
    title: "Real-time API",
    body: "Email verify at signup with the same credits — curl or Node, no forced SDK.",
    href: "/email-verification-api",
    cta: "Email verification API",
    icon: Code2,
  },
];

export default function IntegrationsPage() {
  return (
    <main id="main-page" className="relative flex-1">
      <section
        className="relative pt-12 pb-16 lg:pt-16 lg:pb-20"
        aria-labelledby="integrations-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Integrations" },
            ]}
          />
          <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-ink-muted">Integrations</p>
          <h1
            id="integrations-heading"
            className="mt-3 text-balance font-display text-4xl font-semibold capitalize tracking-tight text-ink lg:text-5xl"
          >
            Import lists into the email verifier you already use
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Connect Google Drive, OneDrive, Dropbox, or Airtable — or upload a
            CSV — then email verify every row with the same credits as the bulk
            email verifier and email verification API. From $
            {RATE_PER_THOUSAND.toFixed(2)} per 1,000. Credits never expire.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
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
                data-ev-loc="integrations-hero"
              >
                Get 100 free credits
              </Link>
            </Button>
            <Button variant="secondary" asChild size="lg">
              <Link href="/bulk-email-verifier">See bulk email verifier</Link>
            </Button>
          </div>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-ink-muted">
            {(
              [
                "Cloud imports",
                "CSV / TXT / XLSX",
                "Same credits as API",
              ] as const
            ).map((label) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      <MetricStrip items={[...METRICS]} eyebrow="Integration facts" />

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="import-sources-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="import-sources-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Cloud imports for the bulk email verifier
          </h2>
          <p className="mt-3 text-ink-muted">
            Product import marks that ship with list cleaning — bring the file to
            the email verifier without juggling downloads.
          </p>
        </div>
        <Reveal className="mt-10" staggerSelector="[data-source]">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMPORT_SOURCES.map((source) => (
              <li
                key={source.id}
                data-source
                className="flex flex-col items-start rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/35 motion-reduce:transform-none"
              >
                <Image
                  src={source.src}
                  alt={`${source.label} logo for email verifier import`}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                  unoptimized
                />
                <p className="mt-4 font-semibold text-ink">{source.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {source.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </SectionShell>

      <SectionShell ariaLabelledBy="crm-sources-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="crm-sources-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            CRM import paths
          </h2>
          <p className="mt-3 text-ink-muted">
            HubSpot and Salesforce appear in the product UI for connected
            workflows. Prefer a file? Export CSV and use the bulk email verifier.
          </p>
        </div>
        <Reveal className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {CRM_SOURCES.map((source) => (
            <div
              key={source.id}
              className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]"
            >
              <Image
                src={source.src}
                alt={`${source.label} integration mark`}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                unoptimized
              />
              <p className="mt-4 font-semibold text-ink">{source.label}</p>
              <p className="mt-2 text-sm text-ink-muted">{source.body}</p>
            </div>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="integration-paths-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="integration-paths-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Three ways to email verify from your stack
          </h2>
        </div>
        <Reveal className="mt-10" staggerSelector="[data-path]">
          <ul className="grid gap-4 lg:grid-cols-3">
            {PATHS.map((path) => {
              const Icon = path.icon;
              return (
                <li
                  key={path.title}
                  data-path
                  className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <p className="mt-4 font-semibold text-ink">{path.title}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {path.body}
                  </p>
                  <Link
                    href={path.href}
                    className="mt-4 text-sm font-semibold text-primary hover:underline"
                    {...(path.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    {path.cta}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </SectionShell>

      <HowSteps
        title="How integrations feed the email verifier"
        steps={[...STEPS]}
      />

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="integrations-api-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="integrations-api-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Prefer code? Use the email verification API
          </h2>
          <p className="mt-3 text-ink-muted">
            Same credits as imports and bulk. Block disposable and invalid
            addresses at signup.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <ApiSnippet />
        </div>
      </SectionShell>

      <CreditPricingTeaser
        title="Connect once. Verify on the same credits."
        eventLoc="integrations-pricing"
      />

      <LandingFaq title="Integrations questions" items={INTEGRATIONS_FAQS} />

      <LandingFinalCta
        title="Bring the list. Leave the bounces."
        body="Import from Drive or upload a CSV. 100 free credits — no card — same email verifier balance as the API."
        secondaryHref="/email-verification-api"
        secondaryLabel="View API docs"
        eventLoc="integrations-final"
      />
    </main>
  );
}
