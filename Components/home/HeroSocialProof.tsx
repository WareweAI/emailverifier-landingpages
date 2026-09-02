import HappyUsers from "@/Components/HappyUsers";
import { StarRating } from "@/Components/ui/StarRating";
import { cn } from "@/lib/utils";
import Image from "next/image";

type HeroSocialProofProps = {
  className?: string;
};

export default function HeroSocialProof({ className }: HeroSocialProofProps) {
  return (
    <div
      data-hero-el
      className={cn(
        "mb-4 flex flex-row flex-wrap items-center justify-center gap-y-1.5 md:mb-5",
        className
      )}
      aria-label="Capterra 4.8 rating from 1000+ happy users"
    >
      <div className="flex items-center gap-1.5">
        <Image
          src="/assets/capterra.svg"
          alt="Capterra logo"
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
          priority
        />
        <div className="flex flex-col leading-none text-left">
          <span className="text-xs font-semibold text-ink">
            Capterra
          </span>
          <div className="mt-0.5 flex items-center gap-0.5 text-[10px] text-ink-muted">
            <span className="font-medium">4.8</span>
            <StarRating rating={4.8} size={11} activeColor="#fdc700" />
            <span>Rating</span>
          </div>
        </div>
      </div>

      <div
        className="mx-2.5 h-7 w-0.5 shrink-0 rounded-full bg-ink-muted/45"
        role="separator"
        aria-orientation="vertical"
      />

      <HappyUsers className="justify-center" compact />
    </div>
  );
}
