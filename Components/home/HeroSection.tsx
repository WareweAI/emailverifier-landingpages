import dynamic from "next/dynamic";
import HeroDemoWithFloats from "@/Components/home/HeroFeatureFloats";
import HeroScene from "@/Components/home/HeroScene";
import HeroSocialProof from "@/Components/home/HeroSocialProof";
import { CheckCircle2 } from "lucide-react";

const DashboardVerifyDemo = dynamic(
  () => import("@/Components/FreeValidationPage/DashboardVerifyDemo"),
  {
    loading: () => (
      <div
        className="h-[34rem] w-full animate-pulse rounded-2xl border border-line bg-surface-muted md:h-[40rem]"
        aria-busy="true"
        aria-label="Loading product demo"
      />
    ),
  }
);

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
                    stroke="#FFE100"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              Email Verification Tool
            </h1>
            <p
              data-hero-el
              className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted"
            >
              Clean your email lists in seconds with our email checker and prevent bounces, spam traps, and invalid emails.
            </p>
          </div>

          <div data-hero-el className="mt-10 flex w-full flex-col md:mt-12">
            <HeroDemoWithFloats>
              <DashboardVerifyDemo variant="embedded" />
            </HeroDemoWithFloats>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-ink-muted md:mt-8">
              {(
                [
                  { id: "gdpr", lines: ["GDPR", "COMPLIANT"] },
                  { id: "deliverability", lines: ["DELIVERABILITY", "GUARANTEE"] },
                ] as const
              ).map((item) => (
                <li key={item.id} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {item.lines[0]}{" "}{item.lines[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </HeroScene>
  );
}
