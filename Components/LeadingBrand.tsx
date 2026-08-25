import Image from "next/image";
import { cn } from "@/lib/utils";

const PRESS_LOGOS = [
  {
    src: "/logos/press/business-insider.png",
    alt: "Business Insider",
    width: 140,
    height: 28,
  },
  {
    src: "/logos/press/yahoo-finance.svg",
    alt: "Yahoo Finance",
    width: 150,
    height: 28,
  },
  {
    src: "/logos/press/financial-post.png",
    alt: "Financial Post",
    width: 180,
    height: 36,
    /* 1-off: wordmark reads thinner — bump height to match peers */
    className: "h-8 max-w-[11rem] sm:h-9",
  },
  {
    src: "/logos/press/national-post.svg",
    alt: "National Post",
    width: 140,
    height: 28,
  },
  {
    src: "/logos/press/ottawa-citizen.png",
    alt: "Ottawa Citizen",
    width: 150,
    height: 28,
  },
  {
    src: "/logos/press/vancouver-sun.png",
    alt: "Vancouver Sun",
    width: 140,
    height: 28,
  },
] as const;

export default function LeadingBrand() {
  return (
    <div className="my-10 bg-white px-4 py-8 sm:px-6">
      <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
        As seen on
      </p>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-12 lg:gap-x-14">
        {PRESS_LOGOS.map((logo) => (
          <li key={logo.src} className="flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              unoptimized={logo.src.endsWith(".svg")}
              className={cn(
                "h-6 w-auto max-w-[9rem] object-contain opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0 sm:h-7",
                "className" in logo ? logo.className : undefined
              )}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
