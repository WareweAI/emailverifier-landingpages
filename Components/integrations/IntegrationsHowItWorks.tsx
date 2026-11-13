import Link from "next/link";
import { ArrowRight, CloudUpload } from "lucide-react";
import {
  FeaturePointList,
  type FeaturePoint,
} from "@/Components/home/feature-pillars/FeaturePointList";
import MethodWorkflowDemo from "@/Components/home/MethodWorkflowDemo";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { Button } from "@/Components/ui/Button";

const HOW_POINTS: readonly FeaturePoint[] = [
  {
    title: "1. Connect or upload",
    body: "Link an Available cloud source, enable CRM import on request, or drop a CSV, TXT, or XLSX.",
  },
  {
    title: "2. Run multi-layer verification",
    body: "Syntax, MX, disposable, catch-all, role, and spam-trap checks — without sending mail.",
  },
  {
    title: "3. Export statuses",
    body: "Download deliverable, risky, and invalid rows with the same flags as the dashboard.",
  },
  {
    title: "4. Send with confidence",
    body: "Keep clean contacts in your CRM or sequence tool. Credits never expire for the next import.",
  },
];

export function IntegrationsHowItWorks() {
  return (
    <SectionShell
      ariaLabelledBy="integrations-how-heading"
      className="pb-6 md:pb-8 lg:pb-10"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow align="center">How it works</SectionEyebrow>
        <SectionHeading id="integrations-how-heading">
          From connected source to clean export
        </SectionHeading>
        <SectionLead className="mx-auto max-w-3xl">
          Import from Drive or upload a file, run the email verifier, then
          download statuses — same credits as the API.
        </SectionLead>
      </div>

      <article className="mt-12 grid items-center gap-8 rounded-3xl border-[5px] border-surface bg-success-soft p-6 shadow-[var(--shadow-card)] sm:p-8 lg:mt-16 lg:grid-cols-2 lg:gap-10 lg:p-10">
        <div className="min-w-0">
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-success/15 sm:h-14 sm:w-14"
            aria-hidden
          >
            <CloudUpload
              className="h-7 w-7 text-success sm:h-8 sm:w-8"
              strokeWidth={1.75}
            />
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
            Connect your list. Verify every row.
          </h3>
          <FeaturePointList points={HOW_POINTS} idPrefix="integrations-how" />
          <Button
            size="lg"
            asChild
            className="group mt-6 rounded-lg border border-ink bg-ink text-primary-foreground hover:bg-ink/90 active:bg-ink"
          >
            <Link href="/bulk-email-verifier">
              See bulk email verifier
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
          </Button>
        </div>

        <div className="min-w-0 lg:pl-2">
          <MethodWorkflowDemo />
        </div>
      </article>
    </SectionShell>
  );
}
