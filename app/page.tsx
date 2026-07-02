import Hero from "@/Components/Hero";
import LogoCloud from "@/Components/LogoCloud";
import Features from "@/Components/Features";
import HowItWorks from "@/Components/HowItWorks";
import Testimonials from "@/Components/Testimonials";
import Pricing from "@/Components/Pricing";
import CTA from "@/Components/CTA";
import type { Metadata } from "next";

const title = "Email Verifier: Free, Bulk & API Email Validation";
const description =
  "Reduce bounce rates by up to 98% with our advanced email validation service. 99.9% accuracy guaranteed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
  },
  twitter: {
    title,
    description,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen" id="main-page" role="main">
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <LogoCloud />
      <Testimonials />
      <CTA />
    </main>
  );
}