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
  title: "Email Verifier: Instant Email Verification Tool & Checker",
  description:
    "Verify email addresses, find verified work emails, and build targeted B2B lead lists. Start with 100 free credits. No credit card required.",
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
