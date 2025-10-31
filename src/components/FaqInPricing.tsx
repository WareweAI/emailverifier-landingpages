import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "Do my verification credits ever expire?",
      answer:
        "No, your credits never expire. You can use them anytime — whether it's today, next month, or next year.",
    },
    {
      question: "Is there a subscription or recurring charge?",
      answer:
        "No, there's no recurring charge. You only pay for the credits you buy.",
    },
    {
      question: "Can I upgrade or buy more credits later?",
      answer:
        "Yes! You can purchase more credits anytime from your dashboard.",
    },
    {
      question: "What's included with the credits I purchase?",
      answer:
        "Each credit lets you verify one email address with real-time validation and detailed status results.",
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer:
        "Yes, we offer refunds under fair-use terms if there's an issue with your purchase.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-white py-16 px-4 sm:px-6 lg:px-8"
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

  useEffect(() => {
    if (ref.current) {
      setHeight(isOpen ? ref.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <article
      className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition p-5"
      aria-expanded={isOpen}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left text-base sm:text-lg font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        aria-controls={`faq-answer-${question}`}
        aria-expanded={isOpen}
      >
        {question}
        <span
          className={`ml-4 text-blue-600 border rounded-full p-1.5 inline-flex items-center justify-center transition-transform duration-300 ${
            isOpen ? "rotate-180 bg-blue-50" : ""
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
