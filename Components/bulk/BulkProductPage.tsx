import Link from "next/link";
import { Button } from "@/Components/ui/Button";
import { AppChromePreview } from "@/Components/ui/AppChromePreview";
import { ListCleanVisual } from "@/Components/ui/ListCleanVisual";
import { JobFlowStrip } from "@/Components/ui/JobFlowStrip";
import { EmptyStatePreview } from "@/Components/ui/EmptyStatePreview";
import { HeroWash } from "@/Components/ui/HeroWash";
import { SectionShell } from "@/Components/ui/SectionShell";
import { REGISTER_URL } from "@/lib/api-snippet";
import { CheckCircle2 } from "lucide-react";

export default function BulkProductPage() {
  return (
    <main className="relative flex-1">
      <section
        className="relative px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-20"
        aria-labelledby="bulk-hero-heading"
      >
        <HeroWash />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <h1
              id="bulk-hero-heading"
              className="font-display text-4xl font-semibold tracking-tight text-ink lg:text-5xl"
            >
              Bulk email verifier for CSV lists
            </h1>
            <p className="mt-4 text-lg text-ink-muted">
              Upload a list, get deliverability statuses for every address, and
              download a clean file — without sending mail. Same $1.80 per 1,000
              credits as the email verification API; credits never expire.
            </p>
            <p className="mt-3 rounded-xl bg-primary-soft px-4 py-3 text-sm text-ink lg:inline-block">
              10,000 emails = <strong>$18.00</strong> · Example mix shown below
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button asChild size="lg">
                <Link
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="cta_register_click"
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

      <SectionShell
        className="bg-surface-muted"
        ariaLabelledBy="bulk-before-after-heading"
      >
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

      <SectionShell ariaLabelledBy="bulk-how-heading">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2
              id="bulk-how-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
            >
              How to email verify a full list
            </h2>
            <ol className="mt-6 space-y-5">
              {(
                [
                  {
                    step: "1",
                    title: "Export",
                    body: "Pull emails from your CRM or spreadsheet.",
                  },
                  {
                    step: "2",
                    title: "Upload",
                    body: "Drop CSV, TXT, or XLSX in the dashboard.",
                  },
                  {
                    step: "3",
                    title: "Download",
                    body: "Get deliverable, risky, and undeliverable results.",
                  },
                ] as const
              ).map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-ink-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="cta_register_click"
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
    </main>
  );
}
