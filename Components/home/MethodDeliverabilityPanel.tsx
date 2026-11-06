import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import {
  FeaturePointList,
  type FeaturePoint,
} from "@/Components/home/feature-pillars/FeaturePointList";
import MethodWorkflowDemo from "@/Components/home/MethodWorkflowDemo";
import { Button } from "@/Components/ui/Button";

const DELIVERABILITY_POINTS: readonly FeaturePoint[] = [
  {
    title: "Why Bounces Hurt",
    body: "A hard bounce happens when an address or domain doesn't exist, while a soft bounce is a temporary failure like a full mailbox. Mailbox providers closely monitor both — lists that bounce above 2% or hit spam traps signal poor data hygiene, pushing future campaigns into spam even for valid leads.",
  },
  {
    title: "How EmailVerifier.io Protects You",
    body: "EmailVerifier.io protects your sender reputation at the source. Invalid addresses are stripped before they hard bounce, spam traps and disposable emails are flagged automatically, and catch-all addresses are scored so you know exactly what is safe to send — backed by our 99.7% deliverability standard and 100% accuracy credit-refund guarantee.",
  },
  {
    title: "Real-Time Prevention",
    body: "To stop bad data from entering your CRM in the first place, connect our Email Validation API to your signup and lead forms to block mistyped, fake, and disposable emails while the user is still on the page.",
  },
];

export default function MethodDeliverabilityPanel() {
  return (
    <article
      className="mt-12 grid items-center gap-8 rounded-3xl border-[5px] border-surface bg-success-soft p-6 shadow-[var(--shadow-card)] sm:p-8 lg:mt-16 lg:grid-cols-2 lg:gap-10 lg:p-10"
    >
      <div className="min-w-0">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-success/15 sm:h-14 sm:w-14"
          aria-hidden
        >
          <TrendingDown
            className="h-7 w-7 text-success sm:h-8 sm:w-8"
            strokeWidth={1.75}
          />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
          Keep bounce rates low with an email verifier
        </h3>
        <FeaturePointList
          points={DELIVERABILITY_POINTS}
          idPrefix="deliverability"
        />
        <Button
          size="lg"
          asChild
          className="group mt-6 rounded-lg border border-ink bg-ink text-primary-foreground hover:bg-ink/90 active:bg-ink"
        >
          <Link href="/blog" data-ev-event="deliverability_guides_click">
            More Guides to Lower Bounce Rate
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
  );
}
