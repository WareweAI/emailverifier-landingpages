import FinderHeroPanel from "@/Components/find/FinderHeroPanel";
import PatternVerificationSection from "@/Components/find/PatternVerificationSection";
import ProspectingFeatures from "@/Components/find/ProspectingFeatures";
import { TrustStatsRow } from "@/Components/home/HomeStatsStrip";
import ProofBar from "@/Components/home/ProofBar";
import CTA from "@/Components/CTA";
import { LandingFaq } from "@/Components/landing/LandingFaq";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { FIND_EMAILS_FAQS } from "@/lib/find-emails-faq";

export default function FindEmailsPage() {
  return (
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="find-emails-heading"
    >
      <section
        className="relative pt-10 pb-12 md:pt-14 md:pb-16 lg:pb-20"
        aria-labelledby="find-emails-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Email Finder" },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium text-ink-muted">
              Free Email Finder Tool
            </p>
            <h1
              id="find-emails-heading"
              className="mt-5 text-balance font-display text-3xl font-semibold capitalize leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              <span className="text-primary">
                Most Accurate Email Finder Tool
              </span>{" "}
              to Find Verified Business Emails in Seconds
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Find verified business emails in seconds by name, company, or
              LinkedIn profile. This email verifier checks each match before you
              export.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl md:mt-10">
            <DesktopMockup chromeLabel="Enter a name and company to find work emails">
              <FinderHeroPanel variant="tool-page" />
            </DesktopMockup>
            <TrustStatsRow compact className="mt-8 w-full max-w-none" />
          </div>
        </div>
      </section>

      <ProofBar />

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
