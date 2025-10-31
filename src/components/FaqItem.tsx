import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";



interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

export default function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setHeight(isOpen ? ref.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <article
            className="border border-gray-500 rounded-3xl bg-white shadow-sm hover:shadow-md transition p-5"
            aria-expanded={isOpen}
        >
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between text-left text-md font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
                {question}
                <span
                    className={`ml-4 text-blue-600 border rounded-full p-1.5 inline-flex items-center justify-center
                         transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
            </button>
            <div
                ref={ref}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: height }}
            >
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{answer}</p>
            </div>
        </article>
    );
}