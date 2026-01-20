

import Image from "next/image";
import { Card, CardContent } from "./ui/card";

const testimonials = [
    {
        name: "Lilly Daniels",
        title: "Affordable and Reliable Service",
        location: "GB",
        image: "/assets/LDProfile.webp",
        rating: 5,
        content:
            "Their pricing is fair, and the results are always consistent. EmailVerifier.io has become a must-have tool in my marketing toolkit.",
    },
    {
        name: "tenker",
        title: "Fast and Easy to Use",
        location: "US",
        image: "/assets/FaceProfile.webp",
        rating: 5,
        content: "The dashboard is super simple. I uploaded my list, and in less than 5 minutes, everything was verified. Perfect tool for email marketers like me.",
    },
    {
        name: "Isa Hamilton",
        title: "Highly Accurate Results!",
        location: "US",
        image: "/assets/IHProfile.webp",
        rating: 5,
        content: "I used EmailVerifier.io for cleaning my email list, and the accuracy was amazing. It removed all fake and invalid emails in minutes. Totally worth it!",
    },
];

export default function Testimonials() {
    return (
        <section
            className="py-20 bg-blue-50"
            role="region"
            aria-labelledby="testimonials-heading"
            id="testimonials"
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 id="testimonials-heading" className="text-2xl lg:text-3xl font-bold text-black mb-4">
                        Loved by Thousands of Businesses
                    </h2>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        See what our customers have to say about their experience with Email Verifier.
                    </p>
                </div>


                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:max-w-7xl mx-auto" aria-label="Customer testimonials">
                    {testimonials.map((t, idx) => {
                        const idBase = `testimonial-${idx}`;
                        return (
                            <li key={t.name + idx}>
                                <article
                                    aria-labelledby={`${idBase}-title`}
                                    aria-describedby={`${idBase}-content`}
                                    className="rounded-xl h-full"
                                >
                                    <Card className="bg-white rounded-xl shadow-[0_0_10px_rgba(0,100,255,0.2)] h-full">
                                        <CardContent className="px-4 py-4 pt-4 flex flex-col h-full">

                                            <header className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center">
                                                    <Image
                                                        src={t.image}
                                                        alt={`Photo of ${t.name}, ${t.title} at ${t.location}`}
                                                        className="w-10 h-10 rounded-full object-cover mr-4"
                                                        loading="lazy"
                                                        width={48}
                                                        height={48}
                                                    />
                                                    <cite className="leading-tight flex flex-col not-italic" id={`${idBase}-title`}>
                                                        <span className="font-semibold text-gray-900">
                                                            {t.name}
                                                        </span>
                                                        <span className="text-sm text-gray-500 font-medium">{t.location}</span>
                                                    </cite>
                                                </div>
                                            </header>

                                            <div
                                                className="flex items-center mt-4 gap-0.5"
                                                aria-label={`Rated ${t.rating} out of 5`}
                                                role="img"
                                            >
                                                {[...Array(t.rating)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="w-5 h-5 fill-yellow-400"
                                                        viewBox="0 0 20 20"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className=" text-gray-900 font-semibold mt-3">{t.title}</span>
                                            {/* Quote */}
                                            <blockquote className="text-gray-900 grow mt-2">
                                                <p id={`${idBase}-content`}>{t.content}</p>
                                            </blockquote>
                                        </CardContent>
                                    </Card>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
