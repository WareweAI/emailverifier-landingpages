import FAQSection from "@/Components/FaqInPricing";
import CTA from "@/Components/CTA";
import PricingCalculator from "@/Components/PricingPage/PricingCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | Emailverifier.io",
    description: "Simple, transparent pricing for email verification. Validate bulk emails, reduce bounce rates, and improve deliverability with pay as you go plans - no hidden fees",
};

export default function PricingPage() {
    return (
        <main className="relative bg-white text-gray-800 overflow-hidden isolate"
            id="pricing-main-content" aria-labelledby="pricing-heading" role="main">

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


            <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-8">
                    <p
                        className="text-sm text-black font-semibold mb-4 relative
                        before:absolute before:inset-0 before:top-1/2 before:-translate-y-0.75 
                        before:left-[39%] sm:before:left-[43.5%] md:before:left-[45.5%] lg:before:left-[46.5%]
                        before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#1F5DD8]"
                    >
                        Pricing
                    </p>
                    <h2 id="faqs-heading" className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
                        Simple, Honest Pricing
                    </h2>
                    <p className="text-black text-sm lg:text-base">
                        Pick your volume. See your price instantly. No hidden fees ever.
                    </p>
                </div>


                {/* Pricing Calculator */}
                <PricingCalculator />

            </section>


            {/* faq section */}
            <FAQSection />

            {/* Contact section */}
            <CTA />

        </main >
    );
}
