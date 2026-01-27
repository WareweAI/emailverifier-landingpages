"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Is email verification accurate?",
        answer:
            "Yes. Email verification checks syntax, domain validity, MX records, and mailbox availability in real time to ensure high accuracy.",
    },
    {
        question: "Can I verify emails in bulk?",
        answer:
            "Absolutely. You can upload large email lists or use our API to verify emails in bulk quickly and efficiently.",
    },
    {
        question: "Does email verification improve deliverability?",
        answer:
            "Yes. Cleaning your list reduces bounce rates, improves inbox placement, and protects your sender reputation.",
    },
    {
        question: "Is Emailverifier.io GDPR compliant?",
        answer:
            "Yes. Emailverifier.io follows GDPR guidelines and processes data securely and responsibly.",
    },
];


export default function FAQInValidation() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-blue-200/30 py-20" aria-labelledby="faq-heading">
            <div className="mx-auto max-w-4xl px-6">
                <h2 id="faq-heading" className="text-center text-3xl sm:text-4xl font-semibold text-gray-900 mb-12">
                    Frequently asked questions
                </h2>

                {/* FAQ list */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div key={faq.question} className="rounded-xl bg-white shadow-sm">
                                <button type="button" aria-expanded={isOpen} aria-controls={`faq-panel-${index}`}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-medium text-gray-900 focus:outline-none rounded-xl"
                                >
                                    {faq.question}
                                    <Plus className={`text-blue-600 transition-transform duration-200 cursor-pointer
                                             ${isOpen ? "rotate-45" : "rotate-0"}`} />
                                </button>

                                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out
                                        ${isOpen ? "grid-rows-[1fr] opacity-100 *:pb-4" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden px-6 text-gray-600 text-sm leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
