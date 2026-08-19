import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";
import { SectionShell } from "./ui/SectionShell";

const REGISTER_URL = "https://app.emailverifier.io/register";

function CtaDecor() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 960 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMaxYMin slice"
    >
      <path
        d="M640 0V72C640 96 660 116 684 116H960"
        stroke="color-mix(in srgb, var(--color-primary-foreground) 22%, transparent)"
        strokeWidth="1.25"
      />
      <path
        d="M820 0V48C820 64 832 76 848 76H960"
        stroke="color-mix(in srgb, var(--color-primary-foreground) 16%, transparent)"
        strokeWidth="1.25"
      />
      <path
        d="M0 348H96C120 348 140 368 140 392V420"
        stroke="color-mix(in srgb, var(--color-primary-foreground) 18%, transparent)"
        strokeWidth="1.25"
      />
      <path
        d="M240 420V360C240 336 260 316 284 316H420"
        stroke="color-mix(in srgb, var(--color-primary-foreground) 14%, transparent)"
        strokeWidth="1.25"
      />
      <circle cx="684" cy="116" r="5" stroke="var(--color-primary)" strokeWidth="1.5" />
      <circle cx="848" cy="76" r="4" stroke="var(--color-primary)" strokeWidth="1.25" />
      <circle cx="140" cy="392" r="4" stroke="var(--color-primary)" strokeWidth="1.25" />
      <circle cx="284" cy="316" r="4.5" fill="var(--color-primary-foreground)" />
      <circle
        cx="284"
        cy="316"
        r="9"
        fill="color-mix(in srgb, var(--color-primary) 35%, transparent)"
      />
    </svg>
  );
}

export default function CTA() {
  return (
    <SectionShell
      id="cta"
      className="bg-surface-muted py-12 md:py-16"
      innerClassName="max-w-6xl"
      ariaLabelledBy="cta-heading"
    >
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24"
        /* 1-off: dark CTA panel — ink to primary-deep, brand navy not status green */
        style={{
          backgroundImage:
            "linear-gradient(to top right, var(--color-ink) 28%, var(--color-primary-deep) 100%)",
        }}
      >
        <CtaDecor />

        <div className="relative mx-auto max-w-2xl text-center">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-primary-foreground/80">
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary-foreground" aria-hidden />
              No setup
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary-foreground" aria-hidden />
              No credit card
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary-foreground" aria-hidden />
              Credits never expire
            </li>
          </ul>

          <h2
            id="cta-heading"
            className="mt-5 font-display text-3xl font-semibold tracking-tight text-primary-foreground lg:text-4xl"
          >
            Ready to clean your list?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Start with 100 free verifications — no credit card required.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              asChild
              className="rounded-full bg-surface text-ink hover:bg-surface-muted"
            >
              <Link
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ev-event="cta_register_click"
              >
                Try it free — 100 verifications on us
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="rounded-full border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
