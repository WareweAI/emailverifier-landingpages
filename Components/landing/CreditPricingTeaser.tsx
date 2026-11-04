import Link from "next/link";
import { Button } from "@/Components/ui/Button";
import { SectionShell } from "@/Components/ui/SectionShell";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

type CreditPricingTeaserProps = {
  headingId?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  eventLoc?: string;
};

export function CreditPricingTeaser({
  headingId = "pricing-teaser-heading",
  title = "Pay once. Credits never expire.",
  body = `Same credit balance for single checks, bulk lists, Find Emails, Find Leads, and the email verification API — from $${RATE_PER_THOUSAND.toFixed(2)} per 1,000. Start with 100 free credits. No card.`,
  primaryLabel = "Get 100 free credits",
  eventLoc = "pricing-teaser",
}: CreditPricingTeaserProps) {
  return (
    <SectionShell ariaLabelledBy={headingId}>
      <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-primary-soft px-6 py-10 text-center sm:px-10 md:py-12">
        <h2
          id={headingId}
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-ink-muted">{body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="transition-transform hover:scale-[1.02] active:scale-[0.99] motion-reduce:transform-none">
            <Link
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ev-event="cta_register_click"
              data-ev-loc={eventLoc}
            >
              {primaryLabel}
            </Link>
          </Button>
          <Button variant="secondary" asChild size="lg">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
