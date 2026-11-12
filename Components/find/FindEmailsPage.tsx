import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FinderHeroPanel from "@/Components/find/FinderHeroPanel";
import PatternVerificationSection from "@/Components/find/PatternVerificationSection";
import ProspectingFeatures from "@/Components/find/ProspectingFeatures";
import HeroScene from "@/Components/home/HeroScene";
import { TrustStatsRow } from "@/Components/home/HomeStatsStrip";
import HowItWorksVideo from "@/Components/home/HowItWorksVideo";
import { HeroAsSeenOn } from "@/Components/home/ProofBar";
import CTA from "@/Components/CTA";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { Button } from "@/Components/ui/Button";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { FIND_EMAILS_FAQS } from "@/lib/find-emails-faq";
import { REGISTER_URL } from "@/lib/api-snippet";

export default function FindEmailsPage() {
  return (
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="find-emails-heading"
    >
      <section
        className="relative"
        aria-labelledby="find-emails-heading"
      >
        <HeroScene>
          <div className="site-container relative z-10 pt-10 pb-16 md:pt-14 md:pb-20 lg:pb-24">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div data-hero-el className="order-2 w-full min-w-0">
                <FinderHeroPanel />
              </div>

              <div className="order-1 flex w-full min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
                <PageBreadcrumb
                  className="mb-8 w-full"
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Products" },
                    { label: "Email Finder" },
                  ]}
                />
                <h1
                  id="find-emails-heading"
                  data-hero-el
                  className="mt-0 w-full whitespace-nowrap font-display text-[clamp(1.35rem,2.55vw,2.7rem)] font-semibold leading-tight tracking-tight text-primary"
                >
                  <span className="relative inline-block">
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
                    <span className="relative z-10">
                      Most Accurate Email Finder Tool
                    </span>
                  </span>
                </h1>
                <h2 className="mt-10 w-full font-display text-xl font-normal leading-tight tracking-tight text-ink sm:mt-12 sm:text-2xl lg:mt-14 lg:text-3xl">
                  to Find Verified Business Emails{" "}
                  <span className="text-primary">in Seconds</span>
                </h2>

                <p
                  data-hero-el
                  className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
                >
                  Find verified business emails in seconds by name, company, or
                  LinkedIn profile. This email verifier checks each match
                  before you export.
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
                      data-ev-loc="find-emails-hero"
                    >
                      Find Emails Free
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
        </HeroScene>

        <div className="relative bg-surface" aria-label="Email verification stats">
          <div
            className="h-px bg-linear-to-r from-transparent via-line to-transparent"
            aria-hidden
          />
          <div className="site-container py-8 md:py-10">
            <TrustStatsRow />
          </div>
        </div>
      </section>

      <ProspectingFeatures />

      <PatternVerificationSection />

      <LandingFaq
        className="bg-background pt-8 md:pt-10 lg:pt-12"
        eyebrow="Email Finder FAQ"
        title="Frequently Asked Questions About Finding Business Emails"
        items={FIND_EMAILS_FAQS}
      />

      <CTA />
    </main>
  );
}
