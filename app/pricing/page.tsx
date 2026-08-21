import FAQSection from "@/Components/FaqInPricing";
import CTA from "@/Components/CTA";
import PricingCalculator from "@/Components/PricingPage/PricingCalculator";
import { HeroWash } from "@/Components/ui/HeroWash";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Email Verifier Pricing — $1.80 per 1,000 Credits",
  description:
    "Email verifier pricing for bulk lists and the email verification API. $1.80 per 1,000 credits that never expire — buy only the volume you need.",
  path: "/pricing",
  imageAlt: "Email verifier pricing calculator for bulk and API credits",
});

export default function PricingPage() {
  return (
    <main
      className="relative isolate overflow-hidden bg-background text-ink"
      id="pricing-main-content"
      aria-labelledby="pricing-heading"
    >
      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <HeroWash />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-4 text-sm font-semibold text-ink">Pricing</p>
            <h1
              id="pricing-heading"
              className="mb-3 font-display text-3xl font-semibold tracking-tight text-ink lg:text-4xl"
            >
              Email verifier pricing that stays simple
            </h1>
            <p className="mx-auto max-w-2xl text-base text-ink-muted lg:text-lg">
              Pay for the volume you need with our bulk email verifier and email
              verification API — same credits, never expire. Or join the limited
              Unlimited plan for continuous verification when checkout is
              available.
            </p>
          </div>

          <PricingCalculator />
        </div>
      </section>

      <FAQSection />
      <CTA />
    </main>
  );
}
