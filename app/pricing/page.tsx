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

type PricingPageProps = {
  searchParams: Promise<{ credits?: string }>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams;
  const parsed = Number(params.credits);
  const initialCredits =
    Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;

  return (
    <main
      className="relative isolate overflow-hidden bg-background text-ink"
      id="pricing-main-content"
      aria-labelledby="pricing-heading"
    >
      <section className="relative z-10 py-16 lg:py-20">
        <HeroWash />
        <div className="site-container relative z-10 min-w-0">
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

          <PricingCalculator initialCredits={initialCredits} />
        </div>
      </section>

      <FAQSection />
      <CTA />
    </main>
  );
}
