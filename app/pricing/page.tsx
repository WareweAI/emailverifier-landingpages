import FAQSection from "@/Components/FaqInPricing";
import CTA from "@/Components/CTA";
import PricingSection from "@/Components/PricingSection";
import CompetitorComparisonSection from "@/Components/pricing-comparison/CompetitorComparisonSection";
import JsonLd, {
  faqPageJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/Components/seo/JsonLd";
import { PRICING_PAGE_FAQS } from "@/lib/pricing-page-faq";
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
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(PRICING_PAGE_FAQS)} />

      <main
        className="min-h-screen flex-1 bg-background text-ink"
        id="pricing-main-content"
      >
        <PricingSection
          variant="homepage"
          initialCredits={initialCredits}
          headingAs="h1"
          heading="Transparent Pay-As-You-Go email verifier credits"
          lead="Start with 100 free credits for our email verifier. Buy more only when you need them — same credits for bulk and the email verification API, never expire."
        />
        <CompetitorComparisonSection />
        <FAQSection />
        <CTA />
      </main>
    </>
  );
}
