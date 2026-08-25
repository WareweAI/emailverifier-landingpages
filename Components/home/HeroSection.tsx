import VerifierDemo from "@/Components/VerifierDemo";
import HeroScene from "@/Components/home/HeroScene";
import HeroSocialProof from "@/Components/home/HeroSocialProof";
import { AppChromePreview } from "@/Components/ui/AppChromePreview";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <HeroScene>
      <section
        id="hero"
        className="relative pt-8 pb-16 md:pt-12 md:pb-20 lg:pb-24"
        aria-labelledby="hero-heading"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <HeroSocialProof />
            <h1
              id="hero-heading"
              data-hero-el
              className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink lg:text-5xl"
            >
              Email Verification Tool
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

          {/* Stacked product visuals: live verify on top, dashboard mock below */}
          <div data-hero-el className="mx-auto mt-10 flex max-w-3xl flex-col md:mt-12">
            <div className="relative mx-auto w-full max-w-2xl rounded-2xl">
              {/* Decorative mesh — peeks on all four edges behind inset verify mockup */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl bg-surface-muted"
                aria-hidden
              >
                <div className="absolute inset-0 bg-primary-soft/70" />
                <div className="absolute -left-6 -top-6 h-36 w-40 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -right-6 -top-4 h-32 w-36 rounded-full bg-success/15 blur-2xl" />
                <div className="absolute -bottom-6 -left-4 h-32 w-36 rounded-full bg-warning/12 blur-2xl" />
                <div className="absolute -bottom-4 -right-6 h-28 w-32 rounded-full bg-primary/15 blur-2xl" />
                <div className="absolute inset-0 hiw-storyboard-dots opacity-70" />
              </div>
              <div className="relative m-3">
                <DesktopMockup chromeLabel="Enter an email address to check its deliverability">
                  <VerifierDemo variant="hero" location="hero" />
                </DesktopMockup>
              </div>
            </div>

            <AppChromePreview focus="projects" className="w-full -mt-3" />

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-muted md:mt-8">
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
        </div>
      </section>
    </HeroScene>
  );
}
