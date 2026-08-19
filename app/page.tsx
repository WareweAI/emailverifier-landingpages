import HeroSection from "@/Components/home/HeroSection";
import ProofBar from "@/Components/home/ProofBar";
import HowItWorks from "@/Components/HowItWorks";
import MethodSection from "@/Components/home/MethodSection";
import Pricing from "@/Components/Pricing";
import ApiSection from "@/Components/home/ApiSection";
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
    "Verify emails in seconds. $1.80 per 1,000 credits that never expire. Try 3 free verifications on the page, 100 more on signup. Bulk CSV cleaning and real-time API.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(HOMEPAGE_FAQS)} />

      <main className="min-h-screen flex-1" id="main-page" role="main">
        <HeroSection />
        <ProofBar />
        <HowItWorks />
        <MethodSection />
        <Pricing />
        <ApiSection />
        <Testimonials />
        <HomeFaqSection />
        <CTA />
      </main>
    </>
  );
}
