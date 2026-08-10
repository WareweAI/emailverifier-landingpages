import FAQSection from "@/Components/FaqInPricing";
import CTA from "@/Components/CTA";
import PricingCalculator from "@/Components/PricingPage/PricingCalculator";
import type { Metadata } from "next";

const title = "Pricing | Emailverifier.io";
const description =
    "Simple, transparent email verification pricing. Buy seasonal credits up to 100K, or join the limited Unlimited plan — 100K emails/month for $180.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/pricing" },
    openGraph: {
        title,
        description,
        url: "/pricing",
    },
    twitter: {
        title,
        description,
    },
};

export default function PricingPage() {
    return (
        <main className="relative bg-white text-gray-800 overflow-hidden isolate"
            id="pricing-main-content" aria-labelledby="pricing-heading">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -left-40 w-125 h-125 rounded-full 
                 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)] -z-10"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-40 -right-40 w-125 h-125 rounded-full 
                bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)] -z-10"
            />


            <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-10">
                    <p
                        className="text-sm text-black font-semibold mb-4 relative
                        before:absolute before:inset-0 before:top-1/2 before:-translate-y-0.75 
                        before:left-[39%] sm:before:left-[43.5%] md:before:left-[45.5%] lg:before:left-[46.5%]
                        before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#1F5DD8]"
                    >
                        Pricing
                    </p>
                    <h1 id="pricing-heading" className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
                        Simple, Honest Pricing
                    </h1>
                    <p className="text-black text-sm lg:text-base">
                        Pay for the volume you need — or go Unlimited for continuous verification.
                    </p>
                </div>

                <PricingCalculator />

            </section>


            {/* faq section */}
            <FAQSection />

            {/* Contact section */}
            <CTA />

        </main >
    );
}
