import Link from "next/link";
import { ArrowRight, ScanSearch } from "lucide-react";
import { VerificationFooter } from "@/Components/find/VerificationFooter";
import { FeaturePointList } from "@/Components/home/feature-pillars/FeaturePointList";
import { Button } from "@/Components/ui/Button";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { StatusChip } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";

const POINTS = [
  {
    title: "Email Pattern Detection Engine",
    body: "Our engine analyzes active domain signals to pinpoint exact corporate naming conventions — such as first.last@company.com, flast@company.com, first_last@company.com and 50 more — eliminating blind permutation guessing.",
  },
  {
    title: "Pre-Checked via Silent SMTP Handshake",
    body: (
      <>
        Every candidate email passes syntax checks, DNS/MX record lookups,
        disposable and role-account filtering, and a live SMTP mailbox check
        without sending an email to the prospect. Dive deeper into our guide
        on{" "}
        <Link
          href="/blog"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          how email validation works
        </Link>{" "}
        to see every verification layer.
      </>
    ),
  },
  {
    title: "0–100 Confidence Scoring",
    body: "When a target company operates an accept-all mail server (catch-all), our smart risk model assigns a transparent 0–100 Confidence Score based on domain pattern certainty and live server behavior so your sales team never gambles with sender reputation.",
  },
] as const;

const PATTERNS = [
  {
    pattern: "{first}.{last}@stripe.com",
    label: "94% Domain Match",
    width: "94%",
    highlighted: true,
  },
  {
    pattern: "{f}{last}@stripe.com",
    label: "4% Match",
    width: "4%",
    highlighted: false,
  },
  {
    pattern: "{first}@stripe.com",
    label: "2% Match",
    width: "2%",
    highlighted: false,
  },
] as const;

export default function PatternVerificationSection() {
  return (
    <SectionShell
      className="bg-background py-8 md:py-10 lg:py-12"
      ariaLabelledBy="find-emails-result-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow align="center">
          Verification-First Discovery
        </SectionEyebrow>
        <SectionHeading id="find-emails-result-heading" withEyebrow>
          Corporate Pattern Matching Backed by Live SMTP Verification
        </SectionHeading>
        <SectionLead className="mx-auto max-w-3xl">
          Standalone email finders guess corporate naming patterns and leave
          you with high bounce rates. Because EmailVerifier.io is built on an
          enterprise validation engine, every found address is verified live
          before it reaches your CRM.
        </SectionLead>
      </div>

      <article className="mt-12 grid items-center gap-8 rounded-3xl border-[5px] border-surface bg-lavender-soft p-6 shadow-[var(--shadow-card)] sm:p-8 lg:mt-16 lg:grid-cols-2 lg:gap-10 lg:p-10">
        <div className="min-w-0">
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 sm:h-14 sm:w-14"
            aria-hidden
          >
            <ScanSearch
              className="h-7 w-7 text-primary sm:h-8 sm:w-8"
              strokeWidth={1.75}
            />
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
            Email Pattern Detection Engine & Live SMTP Pre-Verification
          </h3>
          <FeaturePointList points={POINTS} idPrefix="pattern-verification" />
          <Button
            size="lg"
            asChild
            className="group mt-6 rounded-lg border border-ink bg-ink text-primary-foreground hover:bg-ink/90 active:bg-ink"
          >
            <Link href="/blog" data-ev-event="finder_validation_guide_click">
              How email validation works
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
          </Button>
        </div>

        <div className="min-w-0 lg:pl-2">
          <PatternAnalysisCard />
        </div>
      </article>
    </SectionShell>
  );
}

function PatternAnalysisCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">
          Domain Pattern Analysis — stripe.com
        </p>
        <StatusChip
          label="Example"
          variant="neutral"
          showIcon={false}
          className="bg-surface uppercase tracking-wide ring-1 ring-line"
        />
      </div>

      <ul className="space-y-4 p-4 sm:p-5">
        {PATTERNS.map((row) => (
          <li key={row.pattern}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="truncate text-sm font-medium text-ink">{row.pattern}</p>
              <p
                className={cn(
                  "shrink-0 text-xs font-semibold",
                  row.highlighted ? "text-success" : "text-ink-muted"
                )}
              >
                {row.label}
              </p>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted"
              aria-hidden
            >
              <div
                className={cn(
                  "h-full rounded-full",
                  row.highlighted ? "bg-success" : "bg-ink-muted/35"
                )}
                style={{ width: row.width }}
              />
            </div>
          </li>
        ))}
      </ul>

      <VerificationFooter />
    </div>
  );
}
