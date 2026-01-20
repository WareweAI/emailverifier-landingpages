
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
    {
        question: "Do my verification credits ever expire?",
        answer:
            "No, your credits never expire. You can use them anytime — whether it's today, next month, or next year.",
    },
    {
        question: "Is there a subscription or recurring charge?",
        answer:
            "No. You pay only once for the credits you buy. There are no hidden or recurring fees - it's a one-time purchase.",
    },
    {
        question: "Can I upgrade or buy more credits later?",
        answer:
            "Absolutely! You can purchase additional credits anytime as you verifications needs grow - no need to change plans.",
    },
    {
        question: "What's included with the credits I purchase?",
        answer:
            "Every plan includes real-time verrification, API access, CSV list cleaning, disposable email detection, and role-based filtering - at no extra cost.",
    },
    {
        question: "Do you offer refunds if I'm not satisfied?",
        answer:
            "Yes, if you experience any technical issue or incorrect results, you can contact our support team within 7 days for review and possible refund.",
    },
];

export default function FAQSection() {

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            aria-labelledby="faq-heading"
            className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8"
            id="faqs"
        >
            <div className="max-w-3xl mx-auto">
                <h2
                    id="faq-heading"
                    className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10"
                >
                    Frequently asked questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <FaqItem
                            key={i}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FaqItem({
    question,
    answer,
    isOpen,
    onToggle,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        if (ref.current) {
            requestAnimationFrame(() => {
                setHeight(isOpen ? ref.current!.scrollHeight : 0);
            });
        }
    }, [isOpen]);

    return (
        <article
            className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition p-5"
        >
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between text-left text-base sm:text-lg font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-controls={`faq-answer-${question}`}
                aria-expanded={isOpen}
            >
                {question}
                <span
                    className={`ml-4 text-blue-600 border rounded-full p-1.5 inline-flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 bg-blue-50" : ""
                        }`}
                >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
            </button>

            <div
                ref={ref}
                id={`faq-answer-${question}`}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: height }}
            >
                <p className="mt-2 text-gray-600 leading-relaxed text-sm sm:text-base">
                    {answer}
                </p>
            </div>

        </article>
    );
}
