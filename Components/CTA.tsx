import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import { SectionShell } from "./ui/SectionShell";
import { StarRating } from "./ui/StarRating";

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
      className="bg-background pt-6 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-16"
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

        <div className="relative mx-auto max-w-4xl text-center">
          <h2
            id="cta-heading"
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-primary-foreground sm:text-5xl lg:whitespace-nowrap lg:text-6xl"
          >
            Ready to Clean Your List?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Join thousands of marketers keeping their email lists healthy and
            their emails reaching inboxes.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <Button
              size="lg"
              asChild
              className="group h-14 min-h-14 rounded-lg border border-primary bg-primary px-8 text-base text-primary-foreground hover:bg-primary-hover active:bg-primary-deep"
            >
              <Link
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ev-event="cta_register_click"
              >
                Try it Free — 100 Verification on us
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </Link>
            </Button>
            <p className="text-sm text-primary-foreground/80">
              No setup, No credit card, No stress — Just results.
            </p>
            <div
              className="flex items-center gap-2 text-sm text-primary-foreground/80"
              aria-label="Capterra 4.8 rating"
            >
              <Image
                src="/assets/capterra.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              <span className="font-semibold text-primary-foreground">
                Capterra
              </span>
              <span className="font-semibold text-primary-foreground">4.8</span>
              <StarRating
                rating={4.8}
                size={14}
                activeColor="var(--color-score-mid-high)"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
