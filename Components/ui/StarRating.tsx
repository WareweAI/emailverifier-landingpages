import { cn } from "@/lib/utils";

/** Official Trustpilot star tile colors */
const TP_GREEN = "#00B67A";
const TP_GREY = "#DCDCE6";

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  /** Trustpilot square tiles with white stars (brand green / grey). */
  variant?: "default" | "trustpilot";
};

function TrustpilotStarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <path
        d="M12 1.5L9.16 10.17L0 10.16L7.42 15.84L4.58 25L12 19.34L19.42 25L16.59 15.84L24 10.17L14.84 10.17L12 1.5Z"
        fill="currentColor"
      />
      <path
        d="M17.25 18.03L16.6 15.82L12 19.34L17.25 18.03Z"
        fill="currentColor"
        opacity={0.35}
      />
    </svg>
  );
}

function TrustpilotTile({
  size,
  fill,
  clipPercent,
}: {
  size: number;
  fill: "full" | "empty" | "partial";
  clipPercent?: number;
}) {
  if (fill === "partial" && clipPercent != null && clipPercent > 0) {
    return (
      <span
        className="relative shrink-0 overflow-hidden"
        style={{ width: size, height: size }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: TP_GREY }}
        >
          <TrustpilotStarGlyph className="h-[62%] w-[62%] text-white" />
        </span>
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${clipPercent}%` }}
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: size,
              height: size,
              backgroundColor: TP_GREEN,
            }}
          >
            <TrustpilotStarGlyph className="h-[62%] w-[62%] text-white" />
          </span>
        </span>
      </span>
    );
  }

  return (
    <span
      className="flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
        backgroundColor: fill === "empty" ? TP_GREY : TP_GREEN,
      }}
    >
      <TrustpilotStarGlyph className="h-[62%] w-[62%] text-white" />
    </span>
  );
}

export function StarRating({
  rating,
  max = 5,
  size = 24,
  activeColor = "var(--color-rating)",
  inactiveColor = "var(--color-line)",
  className,
  variant = "default",
}: StarRatingProps) {
  const clamped = Math.min(max, Math.max(0, rating));

  // Trustpilot widgets round to nearest half-star (4.1 → 4.0 → four green + one grey)
  const display =
    variant === "trustpilot" ? Math.round(clamped * 2) / 2 : clamped;

  const fullStars = Math.floor(display);
  const fraction = display - fullStars;
  const hasPartial = fraction >= 0.25 && fullStars < max;
  const emptyStars = max - fullStars - (hasPartial ? 1 : 0);

  if (variant === "trustpilot") {
    return (
      <div
        className={cn("inline-flex items-center gap-0.5", className)}
        role="img"
        aria-label={`${clamped} out of ${max} stars on Trustpilot`}
      >
        {Array.from({ length: fullStars }).map((_, i) => (
          <TrustpilotTile key={`full-${i}`} size={size} fill="full" />
        ))}
        {hasPartial ? (
          <TrustpilotTile
            key="partial"
            size={size}
            fill="partial"
            clipPercent={50}
          />
        ) : null}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <TrustpilotTile key={`empty-${i}`} size={size} fill="empty" />
        ))}
      </div>
    );
  }

  const defaultFull = Math.floor(clamped);
  const defaultFraction = clamped - defaultFull;
  const defaultPartial = defaultFraction > 0.05 && defaultFull < max;
  const defaultEmpty = max - defaultFull - (defaultPartial ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {Array.from({ length: defaultFull }).map((_, index) => (
        <svg
          key={`full-${index}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className="shrink-0"
          aria-hidden
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={activeColor}
          />
        </svg>
      ))}

      {defaultPartial && (
        <div
          className="relative shrink-0"
          style={{ width: size, height: size }}
        >
          <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={inactiveColor}
            />
          </svg>
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${defaultFraction * 100}%`, height: size }}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={activeColor}
              />
            </svg>
          </div>
        </div>
      )}

      {Array.from({ length: defaultEmpty }).map((_, index) => (
        <svg
          key={`empty-${index}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className="shrink-0"
          aria-hidden
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={inactiveColor}
          />
        </svg>
      ))}
    </div>
  );
}
