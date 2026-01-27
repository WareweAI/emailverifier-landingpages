import { ArrowRight, Cpu, Database } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const useCases = [
    {
        id: "bulk-email",
        title: "Bulk Email Verifier",
        description:
            "Our bulk email verifier is designed for marketers, sales teams, and SaaS companies that need fast, accurate list cleaning at scale.",
        cta: "Explore the Bulk Email Verifier",
        href: "/bulk-email-verifier",
        image: "/assets/featuresCard/FeatureBulk.svg",
        reverse: false,
        icon: Database
    },
    {
        id: "email-api",
        title: "Email Verification API",
        description:
            "Our email verification API lets you validate email addresses in real time directly inside your product, website, or signup flow.",
        cta: "Explore the Email Verification API",
        href: "/email-verification-api",
        image: "/assets/featuresCard/FeatureApi.svg",
        reverse: true,
        icon: Cpu
    },
];


export default function UseCaseSection() {
    return (
        <section className="py-20 bg-white" aria-labelledby="usecases-heading" >
            <div className="mx-auto max-w-5xl px-6">
                <h2 id="usecases-heading"
                    className="text-center text-3xl font-semibold text-gray-900 mb-16">
                    Email Validation for Every Use Case
                </h2>

                <div className="space-y-16">
                    {useCases.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.id} className={`flex flex-col items-center gap-10
                            ${item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
                                {/* Preview card */}
                                <figure className="lg:w-[55%] flex justify-center">
                                    <Image
                                        src={item.image}
                                        alt={`${item.title} feature illustration`}
                                        className="w-full h-auto"
                                        loading='lazy'
                                        width={800}
                                        height={500}
                                    />
                                    <figcaption className="sr-only">{item.title} illustration</figcaption>
                                </figure>

                                {/* Content */}
                                <article className="flex-1 flex items-start gap-4  px-2" aria-labelledby={`${item.id}-title`}
                                    aria-describedby={`${item.id}-desc`}>
                                    <div className="flex items-center justify-center lg:justify-start mb-4">
                                        <span className="p-4 bg-blue-100 rounded-lg text-blue-900" aria-hidden="true">
                                            <Icon className="w-6 h-6" aria-hidden="true" focusable="false" />
                                        </span>
                                    </div>

                                    <div>
                                        <h3 id={`${item.id}-title`} className="text-2xl font-semibold text-gray-900 mb-3">
                                            {item.title}
                                        </h3>
                                        <p id={`${item.id}-desc`} className="text-gray-600 text-lg leading-relaxed  mb-3">
                                            {item.description}
                                        </p>
                                        <Link href={item.href}
                                            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
                                            {item.cta}
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </article>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
