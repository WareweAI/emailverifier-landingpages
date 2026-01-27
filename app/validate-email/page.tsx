
import CTA from "@/Components/CTA"
import FAQInValidation from "@/Components/FreeValidationPage/FAQInValidation"
import Features from "@/Components/FreeValidationPage/Features"
import InputForm from "@/Components/FreeValidationPage/InputForm"
import UseCaseSection from "@/Components/FreeValidationPage/UseCaseSection"
import WhyChoose from "@/Components/FreeValidationPage/WhyChoose"
import LeadingBrand from "@/Components/LeadingBrand"
import Testimonials from "@/Components/Testimonials"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Free Email Validator and Checker | Emailverifier.io",
    description: "Free email verifier tool you can trust for accurate email validation. Instantly check email validity, reduce bounces, and protect sender reputation.",
}



export default function ValidateEmailPage() {
    return (
        <main className="relative bg-white text-gray-800 overflow-hidden isolate grow"
            id="pricing-main-content" aria-labelledby="validate-email-heading">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -left-40 w-125 h-125 rounded-full 
                 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_70%)] -z-10"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-10 -right-60 w-125 h-125 rounded-full 
                bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_70%)] -z-10"
            />

            <div className="relative">
                {/* dotted background */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(209,226,255,1) 2px, transparent 2px), linear-gradient(180deg, rgba(59,130,246,0.03), rgba(99,102,241,0.01))",
                        backgroundSize: "50px 50px, 100% 100%",
                    }}
                />

                <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
                    {/* Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center rounded-full bg-white
                    px-4 py-1 text-sm font-medium text-blue-600 shadow-xs">
                            #1 Email Verification Tool
                        </span>
                    </div>

                    <h1
                        id="validate-email-heading"
                        className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-4"
                    >
                        Free Email Verifier Tool You Can Trust the most for{" "}
                        <span className="text-blue-600">accurate Email Validation</span>
                    </h1>

                    <p className="text-gray-500 mb-10">
                        Enter an email address to check its deliverability
                    </p>

                    <div className="mx-auto max-w-xl space-y-3">
                        {/* Input Card */}
                        <InputForm />
                    </div>

                    {/* Trust line */}
                    <p className="mt-4 text-sm text-blue-900 font-medium">
                        Trusted by 1000+ businesses across 100+ countries
                    </p>
                </section>

            </div>

            <LeadingBrand />

            {/* features section */}
            <Features />

            {/* Why choose us section */}
            <WhyChoose />

            {/* faq section */}
            <FAQInValidation />

            {/* use cases section */}
            <UseCaseSection />

            {/* testiominals */}
            <Testimonials />

            {/* cta section */}
            <CTA />
        </main>
    )
}
