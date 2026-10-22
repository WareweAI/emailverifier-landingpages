import HeroScene from "@/Components/home/HeroScene";
import HeroSocialProof from "@/Components/home/HeroSocialProof";
import HeroToolTabs from "@/Components/home/HeroToolTabs";
import { Button } from "@/Components/ui/Button";
import { REGISTER_URL } from "@/lib/api-snippet";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <HeroScene>
      <section
        id="hero"
        className="relative pt-8 pb-16 md:pt-12 md:pb-20 lg:pb-24"
        aria-labelledby="hero-heading"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Tools first on mobile (form-first); left column on desktop */}
            <div
              data-hero-el
              className="order-1 w-full min-w-0 lg:order-2"
            >
              <HeroToolTabs />
            </div>

            <div className="order-2 flex w-full min-w-0 flex-col items-start text-left lg:order-1">
              <HeroSocialProof className="mt-0 justify-start md:mt-0" />

              <h1
                id="hero-heading"
                data-hero-el
                className="mt-8 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-4xl xl:text-5xl"
              >
                <span className="relative mr-2 inline-block align-middle pb-2 text-primary">
                  #1
                  <svg
                    className="absolute -bottom-0.5 left-0 w-10 lg:w-14.75"
                    width="59"
                    height="8"
                    viewBox="0 0 59 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                    focusable="false"
                  >
                    <path
                      d="M1.66382 6.88859C1.99342 6.76873 2.32302 6.64887 4.47793 6.01781C6.63284 5.38675 10.6031 4.24812 15.9893 3.36192C21.3756 2.47571 28.0575 1.87643 34.234 1.72502C40.4104 1.57361 45.8788 1.88824 49.6023 2.28253C53.3258 2.67683 55.1386 3.14127 56.2148 3.44046C57.291 3.73965 57.5756 3.8595 57.8689 4.02839"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-primary">Email verifier</span> that gets
                more{" "}
                <span className="whitespace-nowrap text-primary">
                  valid emails
                </span>{" "}
                <span className="whitespace-nowrap">from your lists</span>
              </h1>

              <ul
                data-hero-el
                className="mt-8 mb-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-ink-muted"
              >
                {(
                  [
                    { id: "gdpr", lines: ["GDPR", "COMPLIANT"] },
                    {
                      id: "deliverability",
                      lines: ["99.9% DELIVERABILITY", "GUARANTEE"],
                    },
                  ] as const
                ).map((item) => (
                  <li key={item.id} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
                    <span className="text-sm font-medium uppercase tracking-wide">
                      {item.lines[0]} {item.lines[1]}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                asChild
                data-hero-el
                className="group h-14 min-h-14 w-full max-w-sm rounded-full border border-primary bg-primary px-8 text-base text-primary-foreground hover:bg-primary-hover active:bg-primary-deep sm:w-auto"
              >
                <Link
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="cta_register_click"
                  data-ev-loc="hero-tool-cta"
                >
                  Get 100 Free Credits
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden
                  />
                </Link>
              </Button>

              <p data-hero-el className="mt-4 text-sm text-ink-muted">
                No setup, No credit card, No stress.
              </p>
            </div>
          </div>
        </div>
      </section>
    </HeroScene>
  );
}
