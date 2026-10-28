import HeroSection from "@/Components/home/HeroSection";
import HomeStatsStrip from "@/Components/home/HomeStatsStrip";
import FeaturePillarsSection from "@/Components/home/FeaturePillarsSection";
import LogoCloud from "@/Components/LogoCloud";
import MethodSection from "@/Components/home/MethodSection";
import Pricing from "@/Components/Pricing";
import Testimonials from "@/Components/Testimonials";
import HomeFaqSection from "@/Components/home/HomeFaqSection";
import CTA from "@/Components/CTA";
import JsonLd, {
  faqPageJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { HOMEPAGE_FAQS } from "@/lib/homepage-faq";

export const metadata = buildMetadata({
  title: "Email Verifier — Bulk List Cleaning & API",
  description:
    "Email verifier for bulk lists and a real-time API. $1.80 per 1,000 credits that never expire. Try 3 free verifications on the page, 100 more on signup.",
  path: "/",
  imageAlt:
    "Email verifier dashboard showing list cleaning and verification results",
});

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(HOMEPAGE_FAQS)} />

      <main className="min-h-screen flex-1" id="main-page" role="main">
        <HeroSection />
        <HomeStatsStrip />
        <FeaturePillarsSection />
        <Testimonials />
        <Pricing />
        <LogoCloud />
        <MethodSection />
        <HomeFaqSection />
        <CTA />
      </main>
    </>
  );
}
