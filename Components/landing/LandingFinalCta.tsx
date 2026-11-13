import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { SectionShell } from "@/Components/ui/SectionShell";
import { REGISTER_URL } from "@/lib/api-snippet";

type LandingFinalCtaProps = {
  headingId?: string;
  title: string;
  body: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Trust line under the CTAs. */
  footnote?: string;
  eventLoc?: string;
  /** Hide secondary button when a nearby section already covers that path. */
  hideSecondary?: boolean;
};

export function LandingFinalCta({
  headingId = "final-cta-heading",
  title,
  body,
  primaryLabel = "Get 100 free credits",
  secondaryHref = "/pricing",
  secondaryLabel = "See pricing",
  footnote = "No credit card · Credits never expire · GDPR & CCPA compliant",
  eventLoc = "final-cta",
  hideSecondary = false,
}: LandingFinalCtaProps) {
  return (
    <SectionShell
      id="cta"
      className="bg-background pt-6 md:pt-8 lg:pt-10 pb-12 md:pb-16"
      ariaLabelledBy={headingId}
    >
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 md:py-16 lg:px-16"
        /* 1-off: dark CTA panel — matches site CTA treatment */
        style={{
          backgroundImage:
            "linear-gradient(to top right, var(--color-ink) 28%, var(--color-primary-deep) 100%)",
        }}
      >
        <div className="relative mx-auto max-w-3xl text-center">
          <h2
            id={headingId}
            className="font-display text-3xl font-semibold leading-tight tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            {body}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="group h-14 min-h-14 rounded-lg border border-primary bg-primary px-8 text-base text-primary-foreground transition-transform hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.99] motion-reduce:transform-none"
            >
              <Link
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ev-event="cta_register_click"
                data-ev-loc={eventLoc}
              >
                {primaryLabel}
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </Link>
            </Button>
            {hideSecondary ? null : (
              <Button
                size="lg"
                variant="onDeep"
                asChild
                className="h-14 min-h-14 px-8 text-base"
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            )}
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">{footnote}</p>
        </div>
      </div>
    </SectionShell>
  );
}
