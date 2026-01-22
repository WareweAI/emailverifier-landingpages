import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react"; 

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
};

export function StarRating({
  rating,
  max = 5,
  size = 24,
  activeColor = "#8134af",
  inactiveColor = "#d3d3d3",
  className,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = max - Math.ceil(rating);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <StarIcon
          key={`full-${index}`}
          width={size}
          height={size}
          className="shrink-0"
          style={{ fill: activeColor, color: activeColor }}
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div
          className="relative shrink-0"
          style={{ width: size, height: size }}
        >
          <StarIcon
            width={size}
            height={size}
            style={{ fill: inactiveColor, color: inactiveColor }}
          />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: size / 2, height: size }}
          >
            <StarIcon
              width={size}
              height={size}
              style={{ fill: activeColor, color: activeColor }}
            />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <StarIcon
          key={`empty-${index}`}
          width={size}
          height={size}
          className="shrink-0"
          style={{ fill: inactiveColor, color: inactiveColor }}
        />
      ))}
    </div>
  );
}
