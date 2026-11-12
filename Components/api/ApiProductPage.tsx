import Link from "next/link";
import ApiDocsExplorer from "@/Components/api/ApiDocsExplorer";
import { Button } from "@/Components/ui/Button";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import CTA from "@/Components/CTA";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { API_PAGE_FAQS } from "@/lib/api-page-faq";
import { REGISTER_URL } from "@/lib/api-snippet";
import { RATE_PER_THOUSAND } from "@/lib/pricing";

export default function ApiProductPage() {
  return (
    <main id="main-page" className="relative flex-1">
      <section
        className="relative pt-12 pb-16 lg:pt-16 lg:pb-20"
        aria-labelledby="api-hero-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Products" },
              { label: "Email Verification API" },
            ]}
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-ink-muted">
              Email verification API
            </p>
            <h1
              id="api-hero-heading"
              className="mt-3 text-balance font-display capitalize text-4xl font-semibold tracking-tight text-ink lg:text-5xl"
            >
              <span className="text-primary">
                Real-time email verifier
              </span>{" "}
              for signups and apps
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Stop disposable, catch-all, and invalid addresses at signup. Same
              credits as bulk — from ${RATE_PER_THOUSAND.toFixed(2)} per 1,000,
              never expire.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="transition-transform hover:scale-[1.02] active:scale-[0.99] motion-reduce:transform-none"
              >
                <Link
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="cta_register_click"
                  data-ev-loc="api-hero"
                >
                  Get API key
                </Link>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <Link href="#api-example" data-ev-event="api_docs_click">
                  View API example
                </Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-6xl">
            <ApiDocsExplorer />
          </div>
        </div>
      </section>

      <LandingFaq
        title="Email verification API questions"
        items={API_PAGE_FAQS}
        /* Soft join: hero wash ends at surface → muted FAQ */
        className="bg-transparent bg-linear-to-b from-surface via-surface-muted via-24 to-surface-muted"
      />

      <CTA />
    </main>
  );
}
