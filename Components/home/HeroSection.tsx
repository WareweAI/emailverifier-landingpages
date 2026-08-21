import VerifierDemo from "@/Components/VerifierDemo";
import HeroScene from "@/Components/home/HeroScene";
import PaperPlaneAnimation from "@/Components/home/PaperPlaneAnimation";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { StarRating } from "@/Components/ui/StarRating";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <HeroScene>
      <section
        id="hero"
        className="relative pt-8 pb-16 md:pt-12 md:pb-24 lg:pb-28"
        aria-labelledby="hero-heading"
      >
        <PaperPlaneAnimation />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div
              data-hero-el
              className="mb-4 flex items-center justify-center gap-2 text-sm text-ink-muted"
            >
              <StarRating rating={4.8} size={18} />
              <span>Capterra 4.8</span>
            </div>
            <h1
              id="hero-heading"
              data-hero-el
              className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink lg:text-5xl"
            >
              <span className="relative inline-block pb-1">
                Email Verification Tool
                <svg
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-3 w-full text-primary"
                  viewBox="0 0 220 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 8.5C28 4.2 52 11.8 78 7.4C104 3 128 11.2 156 6.8C178 3.6 198 9.4 217 5.2"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              that works in seconds.
            </h1>
            <p
              data-hero-el
              className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted"
            >
              This email verifier shows if an address is real, deliverable, and
              safe to send — without sending mail. Then clean a full list or
              check signups through the API.
            </p>
          </div>

          <div
            data-hero-el
            className="relative z-10 mx-auto mt-10 max-w-3xl md:mt-12"
          >
            <DesktopMockup chromeLabel="Enter an email address to check its deliverability">
              <VerifierDemo variant="hero" location="hero" />
            </DesktopMockup>
          </div>
          <ul
              data-hero-el
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-muted"
            >
              {(
                [
                  "GDPR-ready",
                  "30-day deletion",
                  "Credits never expire",
                ] as const
              ).map((label) => (
                <li key={label} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
        </div>
      </section>
    </HeroScene>
  );
}
