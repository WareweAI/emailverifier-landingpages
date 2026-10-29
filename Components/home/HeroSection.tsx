import HeroScene from "@/Components/home/HeroScene";
import HeroToolTabs from "@/Components/home/HeroToolTabs";
import HowItWorksVideo from "@/Components/home/HowItWorksVideo";
import { HeroAsSeenOn } from "@/Components/home/ProofBar";
import { Button } from "@/Components/ui/Button";
import { REGISTER_URL } from "@/lib/api-snippet";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <HeroScene>
      <section
        id="hero"
        className="relative pt-8 pb-16 md:pt-12 md:pb-20 lg:pb-24"
        aria-labelledby="hero-heading"
      >
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Copy first on small screens; left column on desktop */}
            <div data-hero-el className="order-2 w-full min-w-0">
              <HeroToolTabs />
            </div>

            <div className="order-1 flex w-full min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
              {/* 1-off: 3.25rem keeps this line on one row in the hero column */}
              <h1
                id="hero-heading"
                data-hero-el
                className="mt-0 w-full font-display text-4xl font-semibold leading-tight tracking-tight text-primary sm:text-5xl lg:text-[3.25rem]"
              >
                <span className="relative inline-block">
                  {/* 1-off: circle mark sized to this phrase only (not the line below) */}
                  <svg
                    width="503"
                    height="127"
                    viewBox="0 0 503 127"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[2.6em] w-[108%] max-w-none -translate-x-1/2 -translate-y-1/2"
                    aria-hidden
                    focusable="false"
                  >
                    <path
                      d="M497.259 30.427C436.753 13.6132 279.438 -12.9029 134.223 15.5427C-47.295 51.0997 -39.1915 108.983 150.43 121.386C340.052 133.79 524.809 99.8867 497.259 65.1569C469.71 30.427 367.606 28.773 323.847 24.6385"
                      stroke="var(--color-mark)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <span className="relative z-10">#1 Email Verification Tool</span>
                </span>
              </h1>
              <h2 className="mt-10 w-full font-display text-xl font-normal leading-tight tracking-tight text-ink sm:mt-12 sm:text-2xl lg:mt-14 lg:text-3xl">
                For Clean Lists and{" "}
                <span className="text-primary">Verified Leads</span>
              </h2>

              <p
                data-hero-el
                className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
              >
                Stop chasing invalid, fake disposable emails and spam traps that
                cost your sender reputation.
              </p>

              <div
                data-hero-el
                className="mt-8 flex w-full flex-col items-center gap-y-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-start lg:gap-x-6 lg:gap-y-3"
              >
                <Button
                  size="lg"
                  asChild
                  className="group h-14 min-h-14 w-full max-w-sm rounded-lg border border-primary bg-primary px-8 text-base text-primary-foreground hover:bg-primary-hover active:bg-primary-deep sm:w-auto"
                >
                  <Link
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ev-event="cta_register_click"
                    data-ev-loc="hero-tool-cta"
                  >
                    Verify Emails Free
                    <ArrowRight
                      className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </Link>
                </Button>
                <HowItWorksVideo />
              </div>

              <div data-hero-el className="mt-8 max-w-2xl">
                <HeroAsSeenOn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </HeroScene>
  );
}
