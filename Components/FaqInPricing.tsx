
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
    {
        question: "Do my verification credits ever expire?",
        answer:
            "No. Pay As You Go one-time credits never expire. You can use them anytime — whether it's today, next month, or next year.",
    },
    {
        question: "What's the difference between Pay As You Go credits and Unlimited?",
        answer:
            "Pay As You Go is a one-time purchase for the volume you need — credits never expire. Unlimited is a $299/month plan with unlimited emails per month, available for a limited number of customers.",
    },
    {
        question: "Is there a subscription or recurring charge?",
        answer:
            "Only if you choose Unlimited at $299/month. Pay As You Go credits are a one-time purchase with no recurring fees.",
    },
    {
        question: "Can I buy more credits later or switch to Unlimited?",
        answer:
            "Yes. You can purchase additional Pay As You Go credits anytime. If Unlimited spots are still available, you can also start the monthly plan for continuous verification.",
    },
    {
        question: "What's included with either option?",
        answer:
            "Both include bulk and real-time verification, API access, CSV list cleaning, disposable email detection, and role-based filtering — at no extra cost.",
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
                            id={`faq-${i}`}
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
    id,
    question,
    answer,
    isOpen,
    onToggle,
}: {
    id: string;
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
                aria-controls={`${id}-panel`}
                aria-expanded={isOpen}
                id={`${id}-button`}
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
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-button`}
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
