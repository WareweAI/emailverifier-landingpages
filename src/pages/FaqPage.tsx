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

const verificationProcessData = [
    {
        question: "How does the email verification process work?",
        answer:
            "Our system checks each email through multiple layers — syntax validation, domain check, MX record lookup, and real-time SMTP ping — to confirm if the mailbox can receive emails.",
    },
    {
        question: "How long does it take to verify an email list?",
        answer:
            "For small lists, results are almost instant. Larger bulk lists may take a few minutes depending on size and network response times.",
    },
    {
        question: "Can I verify emails in bulk?",
        answer:
            "Yes. You can upload a CSV file or integrate via API for automated bulk verification.",
    },
    {
        question: "Do you store the verified emails?",
        answer:
            "No. We only process the data temporarily for verification and do not retain any email addresses afterward.",
    },
    {
        question: "Can I verify role-based or generic emails (like info@)?",
        answer:
            "Yes, but results for role-based addresses may vary since some mail servers block verification for shared inboxes.",
    },
];

const billingAccountData = [
    {
        question: "What payment methods do you support?",
        answer:
            "We accept major credit and debit cards, as well as PayPal for international users.",
    },
    {
        question: "Can I upgrade or downgrade my plan anytime?",
        answer:
            "Absolutely! You can change your plan at any time from your account dashboard. Adjustments will be reflected in your next billing cycle.",
    },
    {
        question: "Do you offer refunds?",
        answer:
            "Yes, we provide refunds for unused credits within 7 days of purchase as per our refund policy.",
    },
    {
        question: "Is there a free trial available?",
        answer:
            "Yes. You can sign up and verify a limited number of emails for free before upgrading to a paid plan.",
    },
    {
        question: "Can multiple users share the same account?",
        answer:
            "Currently, accounts are individual. Team access will be supported in future updates.",
    },
];

const dataSecurityData = [
    {
        question: "Is my data safe with you?",
        answer:
            "Yes. We follow strict data protection protocols and never share or sell your information to third parties.",
    },
    {
        question: "Do you comply with GDPR and other privacy laws?",
        answer:
            "Absolutely. Our platform fully complies with GDPR and similar international data protection standards.",
    },
    {
        question: "How long is my data stored?",
        answer:
            "Email data uploaded for verification is stored only as long as necessary to complete the process, then permanently deleted.",
    },
    {
        question: "Do you encrypt my data?",
        answer:
            "Yes. All data transmissions are encrypted using HTTPS and stored securely in our servers.",
    },
    {
        question: "Can I delete my account and all associated data?",
        answer:
            "Yes. You can permanently delete your account and all stored data from your account settings or by contacting support.",
    },
];


export default function FaqPage() {
    const [currentTab, setCurrentTab] = useState("General");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const renderFaqItems = () => {
        const data =
            currentTab === "General"
                ? generalData
                : currentTab === "Verification Process"
                    ? verificationProcessData
                    : currentTab === "Billing & Account"
                        ? billingAccountData
                        : dataSecurityData;

        return data.map((faq, i) => (
            <FaqItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
        ));
    };

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
                    {renderFaqItems()}
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
