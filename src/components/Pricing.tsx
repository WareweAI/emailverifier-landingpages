import { useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import DiamondSvg from "@/assets/DiamondSvg";
import TargetWithArrowSvg from "@/assets/TargetWithArrowSvg";
import BlissSvg from "@/assets/BlissSvg";
import CheckSvg from "@/assets/CheckSvg";
import { Button } from "./ui/button";

export default function Pricing() {
  const [volume, setVolume] = useState(10000);
  const presets = [10000, 25000, 50000, 100000, 500000, 1000000, 5000000, 10000000];
  const ratePerThousand = 1.8; // $1.80 per 1000 emails
  const usdToInr = 87.94;
  const pricingCardRef = useRef<HTMLDivElement | null>(null);


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
    <section id="pricing" className="w-full bg-blue-50 py-14 sm:py-20 flex flex-col items-center px-4">
      <div className="max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Simple, Honest Pricing
        </h2>
        <p className="text-gray-900 mb-8 text-sm sm:text-base">
          Pick your volume. See your price instantly. No hidden fees - ever.
        </p>
      </div>

      {/* Calculator */}
      <div className="bg-white p-5 sm:p-8 sm:px-12 rounded-xl shadow-sm w-full max-w-4xl 2xl:max-w-6xl mb-12">
        <label className="block text-gray-800 font-medium mb-3 text-center sm:text-left">
          Email Volume
        </label>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <button
            onClick={decrease}
            className="h-12 w-12 border border-gray-300 rounded-md 
            grid place-items-center hover:bg-gray-100 active:scale-95 transition"
          >
            <MinusIcon className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={formatNumber(volume)}
            readOnly
            className="text-center w-36 sm:w-56 border border-gray-300 rounded-md 
            py-2 text-lg font-medium focus:outline-none
            flex-[3]"
          />

          <button
            onClick={increase}
            className="h-12 w-12 border border-gray-300 rounded-md 
            grid place-items-center hover:bg-gray-100 active:scale-95 transition"
          >
            <PlusIcon className="w-4 h-4" />
          </button>

          <button className="w-full sm:w-auto sm:flex-1 ml-0 sm:ml-10 
          bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-lg text-white font-medium 
          px-5 py-3 rounded-md transition"
            onClick={() => {
              pricingCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}>
            Calculate
          </button>
        </div>

        {/* Slider */}
        <input
          type="range"
          min="1000"
          max="10000000"
          step="1000"
          value={volume}
          onChange={handleChange}
          className="w-full accent-blue-600 mb-4 cursor-pointer custom-slider"
        />

        {/* Scale */}
        <div className="flex justify-between text-xs sm:text-sm text-gray-900 mb-4">
          <span>1K</span>
          <span>100K</span>
          <span>1M</span>
          <span>10M</span>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 justify-center">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setVolume(p)}
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
      <div ref={pricingCardRef} className="bg-white shadow-sm w-full max-w-xl overflow-hidden">

        <div className="border-b shadow-sm border-gray-200 px-8 pt-10 pb-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold
           bg-blue-100 text-blue-600 px-2 py-1 rounded-full uppercase tracking-wide">
            <DiamondSvg /> One-Time Purchase
          </span>
          <div className="flex flex-col gap-4 my-3">
            <div className="h-8 w-8 bg-blue-100 rounded-full grid place-items-center shrink-0">
              <TargetWithArrowSvg />
            </div>
            <div>
              <h3 className="lg:text-xl font-bold text-gray-800">{formatNumber(volume)} verification credits that never expire.</h3>

            </div>
          </div>
        </div>

        <div className="px-8 pb-8 pt-2">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 
          rounded-md text-center py-4 my-6">
            <p>Pay once, Use Forever</p>
            <p className="text-3xl font-bold text-gray-800 my-2">${price.usd}</p>
            {/* <p className="text-sm text-gray-500">≈ ₹{price.inr}</p> */}
            <p className="text-sm text-gray-600 mt-1">${ratePerThousand}0 per 1,000 emails</p>
          </div>

          <p className="text-lg font-medium text-black mb-3 inline-flex gap-2 items-center">
            <BlissSvg /> What's Included</p>
          <ul className="space-y-2 text-gray-900 text-md">
            {[
              "Bulk & Real-Time Verification",
              "API Access",
              "CSV List Cleaning",
              "Disposable Email Detection",
              "Role-based Filtering",
              "No Expiration",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckSvg />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mt-12">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white 
            font-medium rounded-md py-3 hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transition duration-300" asChild>
              <a href="https://app.emailverifier.io/signin">Buy Credits →</a>
          </Button>
        </div>
      </div>
    </div>
    </section >
  );
}
