import FaqItem from "@/components/FaqItem";
import { useState } from "react";


// FAQ data
const generalData = [
    {
        question: "What is an Email Verifier?",
        answer:
            "An email verifier checks whether an email address is valid, active, and safe to send messages to, reducing bounces and improving deliverability.",
    },
    {
        question: "Who can use this tool?",
        answer:
            "Anyone who sends emails - marketers, sales teams, recruiters, and developers, can use it to clean and verify their email lists.",
    },
    {
        question: "Do I need any technical skills to use it?",
        answer:
            "Not at all! You can simply upload your list and get results within minutes. Developers can also integrate our API if they prefer automation.",
    },
    {
        question: "How accurate are your verification results?",
        answer:
            "Our system uses multiple real-time checks to ensure over 98% accuracy, including syntax, domain, MX record, and SMTP validations.",
    },
    {
        question: "Why should I verify my email list?",
        answer:
            "Verifying your email list ensures that your campaigns reach real users. It prevents high bounce rates, protects your sender reputation, and increases your overall campaign performance.",
    },
    {
        question: "Is there a limit on how many emails I can verify?",
        answer:
            "You can verify single emails or upload bulk lists depending on your plan.",
    },
];

export default function FaqPage() {
    const [currentTab, setCurrentTab] = useState("General");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <main className="relative bg-white text-gray-800 overflow-hidden"
        id="faqs-main-content" role="main" aria-labelledby="faqs-heading">
            {/* Radial background gradients */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -left-40 w-[500px] h-[500px] rounded-full 
                 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-40 -right-40 w-[500px] h-[500px] rounded-full 
                bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)]"
            />

            <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                {/* heading */}
                <div className="text-center mb-8">
                    <p
                        className="text-sm text-black font-semibold mb-4 relative
                        before:absolute before:inset-0 before:top-1/2 before:-translate-y-[3px] 
                        before:left-[42%] sm:before:left-[45%] md:before:left-[47%] lg:before:left-[47.5%]
                        before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#1F5DD8]"
                    >
                        FAQ
                    </p>
                    <h2 id="faqs-heading" className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-black text-sm lg:text-base">
                        All the things you need to know about UI Wiki
                    </p>
                </div>

                {/* Tabs */}
                <nav
                    aria-label="FAQ Categories"
                    className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-8 p-1
                    bg-gray-50/50  backdrop-blur-md
                    rounded-md lg:rounded-full lg:w-max mx-auto shadow-sm"
                >
                    {[
                        "General",
                        "Verification Process",
                        "Billing & Account",
                        "Data & Security",
                    ].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setCurrentTab(tab)}
                            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-md lg:rounded-full text-sm sm:text-base font-medium
                                 transition-all duration-200 ${currentTab === tab
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-800 hover:bg-blue-50 active:bg-blue-100"
                                }`}
                            aria-current={currentTab === tab ? "page" : undefined}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* FAQ grid */}
                <section
                    aria-labelledby="general-heading"
                    className="grid md:grid-cols-2 gap-3 lg:gap-6 items-start"
                >
                    <h3 id="general-heading" className="sr-only">
                        General FAQs
                    </h3>
                    {generalData.map((faq, i) => (
                        <FaqItem
                            key={i}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </section>
            </section>

            {/* Contact section */}
            <section className="bg-gray-900 text-center text-white py-6 px-6">
                <h2 className="text-sm lg:text-base mb-2">Still have questions?</h2>
                <p className="text-2xl lg:text-3xl font-semibold mb-6">
                    Ask us anything about Email Verifier
                </p>
                <a
                    href="mailto:support@emailverifier.io"
                    className="text-blue-700 text-2xl lg:text-3xl font-medium hover:underline 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                    support@emailverifier.io
                </a>
                <p className="text-gray-400 mt-2 text-xs lg:text-sm">
                    Our team will get back to you within 24 hours.
                </p>
            </section>
        </main>
    );
}
