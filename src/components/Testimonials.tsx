import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "SaaS Yogi",
    image: "/assets/sarah.webp",
    rating: 5,
    content:
      "EmailVerifier.io helped us cut our bounce rate from 15% to under 2%. Total game changer.",
  },
  {
    name: "Michael Chen",
    title: "Founder",
    company: "Paperbot AI",
    image: "/assets/michael.webp",
    rating: 5,
    content: "The API was super easy to set up, and the accuracy blew us away.",
  },
  {
    name: "Emily Rodriguez",
    title: "Email Marketing Manager",
    company: "Redserp",
    image: "/assets/emily.webp",
    rating: 5,
    content: "We clean thousands of emails daily. It's fast, reliable, and just works.",
  },
];

export default function Testimonials(): JSX.Element {
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


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:max-w-7xl mx-auto" role="list" aria-label="Customer testimonials">
          {testimonials.map((t, idx) => {
            const idBase = `testimonial-${idx}`;
            return (
              <article
                key={t.name + idx}
                role="listitem"
                tabIndex={0}
                aria-labelledby={`${idBase}-title`}
                aria-describedby={`${idBase}-content`}
                className=" rounded-xl"
              >
                <Card className="bg-white rounded-xl shadow-[0_0_10px_rgba(0,100,255,0.2)] h-full">
                  <CardContent className="p-5 pt-5 flex flex-col h-full">

                    <div className="flex-shrink-0 mb-4" aria-hidden="true">
                      <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                        <Quote className="w-5 h-5 text-blue-100 scale-x-[-1]" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-900 font-medium leading-relaxed mb-3 flex-grow">
                      <p id={`${idBase}-content`}>"{t.content}"</p>
                    </blockquote>


                    <footer className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <img
                          src={t.image}
                          alt={`Photo of ${t.name}, ${t.title} at ${t.company}`}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                          loading="lazy"
                          width={48}
                          height={48}
                        />
                        <cite className="leading-tight flex flex-col not-italic" id={`${idBase}-title`}>
                          <span  className="font-semibold text-gray-900">
                            {t.name}
                          </span>
                          <span className="text-xs text-gray-600">{t.title}</span>
                          <span className="text-sm text-blue-600 font-medium">{t.company}</span>
                        </cite>
                      </div>


                      <div
                        className="flex items-center"
                        aria-label={`Rated ${t.rating} out of 5`}
                        role="img"
                      >
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                        ))}
                      </div>
                    </footer>
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
