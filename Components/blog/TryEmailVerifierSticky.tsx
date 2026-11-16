import Image from "next/image";
import Link from "next/link";
import { Button } from "@/Components/ui/Button";
import LogoMark from "@/Components/ui/LogoMark";
import { StarRating } from "@/Components/ui/StarRating";
import { StickyRail } from "./StickyRail";

const REVIEW_PLATFORMS = [
  {
    id: "trustpilot",
    src: "/assets/trustpilot-icon.svg",
    alt: "Trustpilot",
  },
  {
    id: "capterra",
    src: "/assets/capterra.svg",
    alt: "Capterra",
  },
  {
    id: "g2",
    src: "/assets/g2.png",
    alt: "G2",
  },
  {
    id: "reddit",
    src: "/assets/reddit.svg",
    alt: "Reddit",
  },
] as const;

type TryEmailVerifierStickyProps = {
  className?: string;
};

/** Right-rail product CTA — shared by blog articles and guide detail pages. */
export function TryEmailVerifierSticky({
  className = "hidden min-w-0 self-start xl:block",
}: TryEmailVerifierStickyProps) {
  return (
    <StickyRail className={className}>
      <LogoMark />
      <p className="mt-4 text-base font-bold text-ink">Try EmailVerifier</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Bulk email verifier + API. 100 free credits, no card.
      </p>
      <Button asChild size="md" className="mt-5 w-full">
        <Link href="/validate-email">Verify emails free</Link>
      </Button>
      <div
        className="mt-5 border-t border-line pt-5"
        aria-label="4.8 out of 5 on Trustpilot, Capterra, G2, and Reddit"
      >
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            4.8
          </span>
          {/* 1-off: review gold for yellow rating stars */}
          <StarRating rating={4.8} size={14} activeColor="#e4b200" />
        </div>
        <ul
          className="mt-2 flex flex-wrap items-center gap-2.5"
          aria-label="Rated on Trustpilot, Capterra, G2, and Reddit"
        >
          {REVIEW_PLATFORMS.map((platform) => (
            <li key={platform.id} className="shrink-0">
              <Image
                src={platform.src}
                alt={platform.alt}
                width={20}
                height={20}
                unoptimized={platform.src.endsWith(".svg")}
                className="h-5 w-5 object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </StickyRail>
  );
}
