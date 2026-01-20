import Image from "next/image";

const logos = [
    { src: "/logos/google.webp", alt: "Google" },
    { src: "/logos/microsoft.webp", alt: "Microsoft" },
    { src: "/logos/slack.webp", alt: "Slack" },
    { src: "/logos/deepmind.webp", alt: "DeepMind" },
    { src: "/logos/zoho.webp", alt: "Zoho" },
    { src: "/logos/google.webp", alt: "Google" },
    { src: "/logos/microsoft.webp", alt: "Microsoft" },
    { src: "/logos/slack.webp", alt: "Slack" },
    { src: "/logos/deepmind.webp", alt: "DeepMind" },
    { src: "/logos/zoho.webp", alt: "Zoho" },
];

export default function LogoCloud() {
    return (
        <section className="py-12 md:py-20 bg-gray-50 overflow-hidden relative" aria-labelledby="integration-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <h2 id="integration-heading" className="text-3xl lg:text-4xl font-semibold text-gray-900">
                    Integrate with Trusted Platforms
                </h2>
            </div>

            <div role="presentation" aria-label="Scrolling logos of trusted platform partners"
                className="relative w-full flex overflow-hidden py-4 mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]">
                <ul aria-label="List of integrated platforms"
                    className="flex items-center justify-center md:justify-start [&_li]:mx-2
                    [&_img]:max-w-none animate-infinite-scroll group-hover:animation-pause list-none">
                    {logos.map((logo, index) => (
                        <li key={index}>
                            <Image src={logo.src} alt={logo.alt} width={140} height={40} loading="eager"
                                decoding="async" className="h-10 mx-8 object-contain" />
                        </li>
                    ))}
                </ul>
                <ul aria-hidden="true"
                    className="flex items-center justify-center [&_li]:mx-2 [&_img]:max-w-none 
                    animate-infinite-scroll group-hover:animation-pause list-none">
                    {logos.map((logo, index) => (
                        <li key={index + logos.length}>
                            <Image src={logo.src} alt={logo.alt} width={140} height={40} loading="eager"
                                decoding="async" className="h-10 mx-8 object-contain" />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}