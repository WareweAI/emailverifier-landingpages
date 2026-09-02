import { cn } from "@/lib/utils";
import Image from "next/image";

type HappyUsersProps = {
  className?: string;
  compact?: boolean;
};

export default function HappyUsers({ className, compact = false }: HappyUsersProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 lg:justify-start",
        compact && "gap-1",
        className
      )}
    >
      <div className={cn("flex", compact ? "-space-x-1.5" : "-space-x-3")}>
        {(["1", "2", "3"] as const).map((id) => (
          <div
            key={id}
            className={cn(
              "relative overflow-hidden rounded-full border border-white",
              compact ? "h-5 w-5" : "h-8 w-8"
            )}
          >
            <Image
              src={`/users/${id}.png`}
              alt={`User ${id}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <span
        className={cn(
          "font-semibold text-ink-muted",
          compact ? "text-[11px]" : "text-sm"
        )}
      >
        <span className="text-ink">1000+</span> Happy Users
      </span>
    </div>
  );
}
