"use client";

import { Button } from "@/Components/ui/Button";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { REGISTER_URL } from "@/lib/api-snippet";
import { ComparisonTable } from "./ComparisonTable";

export default function CompetitorComparisonSection() {
  return (
    <SectionShell
      id="competitor-comparison"
      className="bg-background pt-10 pb-12 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20"
      ariaLabelledBy="competitor-comparison-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow align="center">Compare</SectionEyebrow>
        <SectionHeading id="competitor-comparison-heading" withEyebrow>
          How EmailVerifier.io compares
        </SectionHeading>
        <SectionLead className="mx-auto max-w-3xl">
          Pay-as-you-go credits that never expire, with finding and lead search
          included. Here is how the benefits stack up against other popular
          email verifiers.
        </SectionLead>
      </div>

      <div className="mx-auto mt-10 max-w-6xl">
        <ComparisonTable />
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Button asChild size="lg">
          <a href={REGISTER_URL}>Get 100 free credits</a>
        </Button>
        <a
          href="#pricing"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-ink underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          See pay-as-you-go pricing
        </a>
      </div>
    </SectionShell>
  );
}
