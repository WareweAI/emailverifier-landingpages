import { StarRating } from "@/Components/ui/StarRating";
import { cn } from "@/lib/utils";

type HeroSocialProofProps = {
  className?: string;
};

export default function HeroSocialProof({ className }: HeroSocialProofProps) {
  return (
    <div
      data-hero-el
      className={cn(
        "mb-4 flex flex-col items-center text-center",
        className
      )}
      aria-label="Trustpilot 4.1 rating from 1,000+ users"
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <StarRating rating={4.1} size={14} variant="trustpilot" />
        <span className="text-sm font-semibold text-ink-muted">Trustpilot 4.1</span>
      </div>
      <p className="text-sm text-ink-muted">1,000+ users</p>
    </div>
  );
}
