import Link from "next/link";
import { Code2, CloudUpload, ShieldCheck, Upload } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { SectionEyebrow } from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { TrustStatsRow } from "@/Components/home/HomeStatsStrip";
import ProofBar from "@/Components/home/ProofBar";
import { Reveal } from "@/Components/landing/Reveal";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { LandingFinalCta } from "@/Components/landing/LandingFinalCta";
import { IntegrationsCatalog } from "@/Components/integrations/IntegrationsCatalog";
import { IntegrationsHowItWorks } from "@/Components/integrations/IntegrationsHowItWorks";
import { IntegrationsImportDemo } from "@/Components/integrations/IntegrationsImportDemo";
import { INTEGRATIONS_FAQS } from "@/lib/integrations-faq";
import { formatNameList, importSourceNames } from "@/lib/integrations";
import { REGISTER_URL } from "@/lib/api-snippet";

const availableNames = formatNameList(importSourceNames({ status: "available" }));

const CONNECT_PATHS = [
  {
    step: "01",
    title: "File upload",
    body: "Export from any tool, then upload CSV, TXT, or XLSX to the bulk email verifier.",
    href: "/bulk-email-verifier",
    cta: "Open bulk email verifier",
    icon: Upload,
  },
  {
    step: "02",
    title: "Cloud import",
    body: `Connect ${availableNames || "supported cloud sources"} when Available — Soon connectors use file export until they ship.`,
    href: "#cloud-imports",
    cta: "Browse import sources",
    icon: CloudUpload,
  },
  {
    step: "03",
    title: "Real-time API",
    body: "Email verify at signup with the same credits — curl or Node, no forced SDK.",
    href: "/email-verification-api",
    cta: "View API docs",
    icon: Code2,
  },
] as const;

export default function IntegrationsPage() {
  return (
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="integrations-heading"
    >
      <section
        className="relative pt-10 pb-12 md:pt-14 md:pb-16 lg:pb-20"
        aria-labelledby="integrations-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Resources" },
              { label: "Integrations" },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium text-ink-muted">Integrations</p>
            <h1
              id="integrations-heading"
              className="mt-5 text-balance font-display text-3xl font-semibold capitalize leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              Import lists into the{" "}
              <span className="text-primary">email verifier</span> you already
              use
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Connect Google Drive, OneDrive, Dropbox, Airtable and your CRM, or
              upload a CSV, TXT or XLSX.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button
                asChild
                size="lg"
                className="w-full transition-transform hover:scale-[1.02] active:scale-[0.99] motion-reduce:transform-none sm:w-auto"
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
              <Button
                variant="secondary"
                asChild
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/bulk-email-verifier">See bulk email verifier</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl md:mt-10">
            <DesktopMockup chromeLabel="Connect a source → verify → export statuses">
              <IntegrationsImportDemo />
            </DesktopMockup>
            <TrustStatsRow compact className="mt-8 w-full max-w-none" />
          </div>
        </div>
      </section>

      <ProofBar />

      <SectionShell
        id="cloud-imports"
        className="bg-background"
        ariaLabelledBy="import-sources-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow align="center">Cloud imports</SectionEyebrow>
          <h2
            id="import-sources-heading"
            className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Import from where your contacts live
          </h2>
          <p className="mt-3 text-ink-muted">
            Filter by category. Badges match the homepage: Available, Soon, or
            enabled on request — so status never disagrees across the site.
          </p>
        </div>
        <div className="mt-10">
          <IntegrationsCatalog />
        </div>
      </SectionShell>

      <SectionShell
        className="bg-background"
        ariaLabelledBy="integration-paths-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="integration-paths-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Three ways to{" "}
            <span className="text-primary">email verify</span> from your stack
          </h2>
          <p className="mt-3 text-ink-muted">
            Upload a file, connect a cloud or CRM source, or call the email
            verification API — same credits either way.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <Reveal staggerSelector="[data-path]">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CONNECT_PATHS.map((path) => {
                const Icon = path.icon;
                return (
                  <li
                    key={path.step}
                    data-path
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/35"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-3xl font-bold tracking-tight text-primary">
                        {path.step}
                      </p>
                      <Icon
                        className="h-10 w-10 shrink-0 text-primary/20"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {path.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                      {path.body}
                    </p>
                    <Link
                      href={path.href}
                      className="mt-4 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {path.cta}
                    </Link>
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
                99.7%
              </span>
              Lower bounce rates, higher inbox placement, and a protected
              sender reputation — backed by our deliverability guarantee.
            </p>
          </div>
        </div>
      </SectionShell>

      <IntegrationsHowItWorks />

      <LandingFaq
        eyebrow="Integrations FAQ"
        title="Integrations questions"
        items={INTEGRATIONS_FAQS}
      />

      <LandingFinalCta
        title="Bring the list. Leave the bounces."
        body="Import from Drive when Available, or upload a CSV. Try it free: 100 verifications on us."
        primaryLabel="Try it free: 100 verifications on us"
        hideSecondary
        footnote="No credit card · Credits never expire · GDPR & CCPA compliant"
        eventLoc="integrations-final"
      />
    </main>
  );
}
