import { ArrowRight, CircleDashed } from "lucide-react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { StarRating } from "./ui/StarRating";
import Link from "next/link";
import HappyUsers from "./HappyUsers";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white isolate" aria-labelledby="hero-heading" role="region">
            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-2 items-center lg:justify-center 
            relative px-4 lg:px-10 2xl:px-44 py-10 xl:pb-20 xl:pt-10 2xl:py-24">
                {/* dotted background */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(209,226,255,1) 2px, transparent 2px), linear-gradient(180deg, rgba(59,130,246,0.03), rgba(99,102,241,0.01))",
                        backgroundSize: "50px 50px, 100% 100%",
                    }}
                />

                {/* LEFT: heading and CTAs */}
                <div className="flex-1 max-w-2xl">

                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                        {/* Logo */}
                        <Image
                            src="/assets/capterra.svg"
                            alt="capterra-logo"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                            priority
                        />

                        <div className="flex flex-col leading-tight">
                            <span className="text-base sm:text-lg font-semibold text-gray-900">
                                Capterra
                            </span>

                            {/* Rating row */}
                            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500">
                                <span className="font-medium text-gray-600">4.8</span>
                                <StarRating rating={4.8} size={14} activeColor="#fdc700" />
                                <span>Rating</span>
                            </div>
                        </div>
                    </div>


                    {/* main heading */}
                    <h1 id="hero-heading" className="text-2xl lg:text-5xl font-bold text-gray-900 leading-tight mt-4 text-center lg:text-left">
                        <span className="inline-block mt-1 lg:mt-0 mr-3 text-blue-600 align-middle relative " style={{ paddingBottom: 8 }}>
                            #1
                            <svg
                                className="absolute left-0 -bottom-1 w-10 lg:w-14.75"
                                width="59"
                                height="8"
                                viewBox="0 0 59 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false"
                                style={{ display: "block" }}
                            >
                                <path
                                    d="M1.66382 6.88859C1.99342 6.76873 2.32302 6.64887 4.47793 6.01781C6.63284 5.38675 10.6031 4.24812 15.9893 3.36192C21.3756 2.47571 28.0575 1.87643 34.234 1.72502C40.4104 1.57361 45.8788 1.88824 49.6023 2.28253C53.3258 2.67683 55.1386 3.14127 56.2148 3.44046C57.291 3.73965 57.5756 3.8595 57.8689 4.02839"
                                    stroke="#FFE100"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>

                        <span className="align-middle">Email Verification Tool</span>
                    </h1>

                    {/* subtext */}
                    <p className="text-md lg:text-xl text-gray-600 max-w-xl mt-3 text-center lg:text-left">
                        Clean your email lists in seconds with our email checker and prevent bounces, spam traps, and invalid emails.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col lg:flex-row gap-4 mt-8">
                        <Button
                            size="lg"
                            className="inline-flex items-center gap-3 bg-linear-to-r from-blue-700 to-blue-900 text-white 
                            px-6 lg:px-16 py-3 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                            asChild
                        >
                            <Link href="https://app.emailverifier.io/register"
                                target="_blank" rel="noopener noreferrer"
                                aria-label="Try Email Verifier free — registers at app.emailverifier.io">
                                Verify Emails Free
                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>
                        </Button>

                        <HappyUsers />
                    </div>

                    {/* micro-features row */}
                    <div className="text-xs lg:text-md text-blue-800 mt-5 text-center lg:text-left">
                        Get
                        <span className="font-semibold">&nbsp;100 free verifications</span> - no setup, no credit card, no stress.
                    </div>

                    <div className="mt-3 flex items-center justify-center lg:justify-start gap-2 text-blue-800">
                        {/* GDPR */}
                        <div className="flex items-center gap-1">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
                                <span className="text-xs tracking-widest border border-blue-800/20 rounded-full p-1.5 bg-blue-800/10">
                                    <CircleDashed size={20} />
                                </span>
                            </div>
                            <span className="text-xs font-medium tracking-wide">
                                GDPR<br />COMPLIANT
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="h-10 w-px bg-white/30" />

                        {/* Deliverability */}
                        <div className="flex items-center gap-1">
                            <div className="flex h-12 w-12 items-center justify-center">
                                <div className="border border-blue-800/20 rounded-full p-1.5
                             bg-blue-800/10 text-xs font-semibold">
                                    <span className="w-5 h-5 flex items-center justify-center">99%</span>
                                </div>
                            </div>
                            <span className="text-xs font-medium tracking-wide">
                                DELIVERABILITY<br />GUARANTEE
                            </span>
                        </div>
                    </div>

                </div>

                {/* RIGHT */}
                <div className="flex-1 flex justify-end max-w-lg 2xl:max-w-2xl">
                    <Image
                        src="/assets/heroImage_800w.webp"
                        alt="Email Verifier dashboard showing list cleaning and verification results"
                        width={800}
                        height={600}
                        className="w-full h-auto max-w-130 2xl:max-w-2xl object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>

            {/* Brands row */}
            <div className="my-10 border-t border-transparent">
                <p className="text-xl lg:text-2xl text-center font-semibold">
                    Leading Brands and Agencies Using Emailverifier.io
                </p>

                <div className="mt-6 flex justify-center items-center gap-10 flex-wrap" aria-hidden={false}>
                    <Image
                        src="/logos/wareweeLogo.webp"
                        alt="Warewee"
                        width="144"
                        height="48"
                        className="w-36 h-auto object-contain"
                        loading="lazy"
                    />
                    <Image
                        src="/logos/redserpLogo.webp"
                        alt="RedSerp"
                        width="144"
                        height="48"
                        className="w-36 h-auto object-contain"
                        loading="lazy"
                    />
                    <Image
                        src="/logos/paperboatLogo.webp"
                        alt="Paperbot AI"
                        width="144"
                        height="48"
                        className="w-36 h-auto object-contain"
                        loading="lazy"
                    />
                    <Image
                        src="/logos/saasyogiLogo.webp"
                        alt="SaaS Yogi"
                        width="144"
                        height="48"
                        className="w-36 h-auto object-contain"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
