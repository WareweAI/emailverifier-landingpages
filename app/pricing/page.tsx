"use client";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

import DiamondSvg from "@/Components/assets/DiamondSvg";
import TargetWithArrowSvg from "@/Components/assets/TargetWithArrowSvg";
import BlissSvg from "@/Components/assets/BlissSvg";
import CheckSvg from "@/Components/assets/CheckSvg";
import { Button } from "@/Components/ui/Button";
import FAQSection from "@/Components/FaqInPricing";

export default function PricingPage() {
    const [volume, setVolume] = useState(10000);
    const presets = [10000, 25000, 50000, 100000, 500000, 1000000, 5000000, 10000000];
    const ratePerThousand = 1.8; // $1.80 per 1000 emails
    const usdToInr = 87.94;



    const formatNumber = (num: number) => num.toLocaleString("en-US");

    const calculatePrice = (emails: number) => {
        const priceUSD = (emails / 1000) * ratePerThousand;
        const priceINR = priceUSD * usdToInr;
        return { usd: priceUSD.toFixed(2), inr: priceINR.toFixed(2) };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setVolume(Number(e.target.value));

    const decrease = () => setVolume((v) => Math.max(1000, v - 1000));
    const increase = () => setVolume((v) => Math.min(10000000, v + 1000));

    const price = calculatePrice(volume);

    return (
        <main className="relative bg-white text-gray-800 overflow-hidden isolate"
            id="pricing-main-content" aria-labelledby="pricing-heading" role="main">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -left-40 w-125 h-125 rounded-full 
                 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)] -z-10"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-40 -right-40 w-125 h-125 rounded-full 
                bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)] -z-10"
            />


            <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-8">
                    <p
                        className="text-sm text-black font-semibold mb-4 relative
                        before:absolute before:inset-0 before:top-1/2 before:-translate-y-0.75 
                        before:left-[39%] sm:before:left-[43.5%] md:before:left-[45.5%] lg:before:left-[46.5%]
                        before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#1F5DD8]"
                    >
                        Pricing
                    </p>
                    <h2 id="faqs-heading" className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
                        Simple, Honest Pricing
                    </h2>
                    <p className="text-black text-sm lg:text-base">
                        Pick your volume. See your price instantly. No hidden fees ever.
                    </p>
                </div>

                {/* Calculator */}
                <div className="bg-white p-5 sm:p-8 sm:px-12 rounded-xl 
                shadow-[0_8px_32px_rgba(0,0,0,0.05),0_-1px_5px_rgba(0,0,0,0.08)]
                 w-full max-w-4xl 2xl:max-w-6xl mb-12 mx-auto">
                    <label htmlFor="email-volume-number"
                        className="block text-gray-800 font-medium mb-3 text-center sm:text-left">
                        Email Volume
                    </label>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                        <button
                            type="button"
                            aria-label="Decrease email volume by 1,000"
                            onClick={decrease}
                            className="h-12 w-12 border border-gray-300 rounded-md 
                            grid place-items-center hover:bg-gray-100 active:scale-95 transition">
                            <MinusIcon className="w-4 h-4" aria-hidden="true" />
                        </button>

                        <input
                            id="email-volume-number"
                            name="email-volume-number"
                            inputMode="numeric"
                            type="text"
                            value={formatNumber(volume)}
                            readOnly
                            aria-label="Email volume"
                            aria-describedby="volume-scale"
                            className="text-center w-36 sm:w-56 border border-gray-300 rounded-md 
                            py-2 text-lg font-medium focus:outline-none
                            flex-3"/>

                        <button
                            type="button"
                            aria-label="Increase email volume by 1,000"
                            onClick={increase}
                            className="h-12 w-12 border border-gray-300 rounded-md 
                            grid place-items-center hover:bg-gray-100 active:scale-95 transition" >
                            <PlusIcon className="w-4 h-4" aria-hidden="true" />
                        </button>

                        <a href="#pricing-card"
                            className="w-full sm:w-auto sm:flex-1 ml-0 sm:ml-10 
                            bg-linear-to-r from-blue-600 to-blue-800 hover:shadow-lg text-white font-medium 
                            px-5 py-3 rounded-md transition text-center inline-block focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                            aria-label="Scroll to see calculated pricing details">
                            Calculate
                        </a>
                    </div>

                    {/* Slider */}
                    <input
                        aria-label="Email volume slider"
                        aria-describedby="volume-scale"
                        id="email-volume-slider"
                        type="range"
                        min="1000"
                        max="10000000"
                        step="1000"
                        value={volume}
                        onChange={handleChange}
                        className="w-full accent-blue-600 mb-4 cursor-pointer custom-slider"
                        role="slider"
                        aria-valuemin={1000}
                        aria-valuemax={10000000}
                        aria-valuenow={1000}
                    />

                    {/* Scale */}
                    <div id="volume-scale" className="flex justify-between text-xs sm:text-sm text-gray-900 mb-4">
                        <span>1K</span>
                        <span>100K</span>
                        <span>1M</span>
                        <span>10M</span>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Volume presets">
                        {presets.map((p) => (
                            <button
                                key={p}
                                onClick={() => setVolume(p)}
                                aria-pressed={p === volume}
                                className={`px-3 py-1.5 rounded-md border text-sm font-medium transition ${p === volume
                                    ? "bg-blue-100 text-black border-blue-600"
                                    : "bg-white border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {p >= 1000000 ? `${p / 1000000}M` : `${p / 1000}K`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pricing Card */}
                <div id="pricing-card" className="bg-white 
                shadow-[0_8px_32px_rgba(0,0,0,0.05),0_-1px_5px_rgba(0,0,0,0.08)]
                w-full max-w-xl overflow-hidden mx-auto"
                    role="region" aria-labelledby="pricing-card-heading">

                    <div className="border-b shadow-sm border-gray-200 px-8 pt-10 pb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                         bg-blue-100 text-blue-800 px-2 py-1 rounded-full uppercase tracking-wide" aria-hidden="true">
                            <DiamondSvg aria-hidden="true" /> <span>One-Time Purchase</span>
                        </span>
                        <div className="flex flex-col gap-4 my-3">
                            <div className="h-8 w-8 bg-blue-100 rounded-full grid place-items-center shrink-0" aria-hidden="true">
                                <TargetWithArrowSvg aria-hidden="true" />
                            </div>
                            <div>
                                <h3 id="pricing-card-heading"
                                    className="lg:text-xl font-bold text-gray-800">{formatNumber(volume)} verification credits that never expire.</h3>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 pb-8 pt-2">
                        <div className="bg-linear-to-r from-blue-100 to-purple-100 
                            rounded-md text-center py-4 my-6">
                            <p>Pay once, Use Forever</p>
                            <div role="status" aria-live="polite" aria-atomic="true" className="mt-2">
                                <span className="sr-only">Current total price:</span>
                                <p className="text-3xl font-bold text-gray-800 my-2">${price.usd}</p>
                                <p className="text-sm text-gray-600 mt-1">${ratePerThousand.toFixed(2)} per 1,000 emails</p>
                            </div>
                        </div>

                        <p className="text-lg font-medium text-black mb-3 inline-flex gap-2 items-center">
                            <BlissSvg aria-hidden="true" /> What&apos;s Included</p>

                        <ul className="space-y-2 text-gray-900 text-md" aria-label="Included features">
                            {[
                                "Bulk & Real-Time Verification",
                                "API Access",
                                "CSV List Cleaning",
                                "Disposable Email Detection",
                                "Role-based Filtering",
                                "No Expiration",
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckSvg aria-hidden="true" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-3 mt-12">
                            <Button className="w-full bg-linear-to-r from-blue-600 to-blue-800 text-white 
                            font-medium rounded-md py-3 hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transition duration-300" asChild>
                                <a href="https://app.emailverifier.io/signin" target="_blank"
                                    rel="noopener noreferrer" aria-label="Buy credits at Email Verifier">Buy Credits →</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>


            {/* faq section */}
            <FAQSection />

            {/* Contact section */}
            <section className="bg-gray-900 text-center text-white py-6 px-6">
                <h2 className="text-sm lg:text-base mb-2">Need help with billing or pricing?</h2>
                <p className="text-2xl lg:text-3xl font-semibold mb-6">
                    Ask us anything about Email Verifier
                </p>
                <a
                    href="mailto:support@emailverifier.io"
                    className="text-blue-700 text-2xl lg:text-3xl font-medium hover:underline 
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                    support@emailverifier.io
                </a>
                <p className="text-gray-400 mt-2 text-xs lg:text-sm">
                    Our team will get back to you within 24 hours.
                </p>
            </section>

        </main >
    );
}
