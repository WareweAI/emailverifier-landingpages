"use client";

import { useMemo, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/Button";
import CheckSvg from "../assets/CheckSvg";
import BlissSvg from "../assets/BlissSvg";
import DiamondSvg from "../assets/DiamondSvg";
import TargetWithArrowSvg from "../assets/TargetWithArrowSvg";
import Link from "next/link";

const formatNumber = (num: number) => num.toLocaleString("en-US");

const ratePerThousand = 1.8; // $1.80 per 1000 emails
// const usdToInr = 87.94;

const calculatePrice = (emails: number) => {
    const priceUSD = (emails / 1000) * ratePerThousand;
    // const priceINR = priceUSD * usdToInr; return { usd: priceUSD.toFixed(2), inr: priceINR.toFixed(2) };
    return { usd: priceUSD.toFixed(2) };
};

const PRESETS = [10000, 25000, 50000, 100000, 500000, 1000000, 5000000, 10000000];

export default function PricingCalculator() {
    const [volume, setVolume] = useState(10000);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setVolume(Number(e.target.value));

    const decrease = () => setVolume((v) => Math.max(1000, v - 1000));
    const increase = () => setVolume((v) => Math.min(10000000, v + 1000));

    const price = useMemo(() => calculatePrice(volume), [volume]);

    const pricingCardRef = useRef<HTMLDivElement>(null);

    const handleScrollToPricingCard = () => {
        pricingCardRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
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

                    <button onClick={handleScrollToPricingCard}
                        className="w-full sm:w-auto sm:flex-1 ml-0 sm:ml-10 
                            bg-linear-to-r from-blue-600 to-blue-800 hover:shadow-lg text-white font-medium 
                            px-5 py-3 rounded-md transition text-center inline-block focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                        aria-label="Scroll to see calculated pricing details">
                        Calculate
                    </button>
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
                    aria-valuenow={volume}
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
                    {PRESETS.map((p) => (
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
            <div ref={pricingCardRef} id="pricing-card" className="bg-white 
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
                            <Link href="https://app.emailverifier.io/signin" target="_blank"
                                rel="noopener noreferrer" aria-label="Buy credits at Email Verifier">Buy Credits →</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
