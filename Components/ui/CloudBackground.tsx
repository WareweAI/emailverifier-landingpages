import { cn } from "@/lib/utils";

type CloudBackgroundProps = {
  className?: string;
};

function FluffyCloud({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 720"
      preserveAspectRatio="xMinYMax meet"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
    >
      {/* Soft blue volume — fills the tall side column */}
      <g fill="var(--color-primary-soft)" opacity="0.85">
        <ellipse cx="80" cy="640" rx="160" ry="90" />
        <ellipse cx="200" cy="600" rx="170" ry="110" />
        <ellipse cx="90" cy="520" rx="150" ry="100" />
        <ellipse cx="220" cy="470" rx="160" ry="115" />
        <ellipse cx="70" cy="390" rx="140" ry="95" />
        <ellipse cx="200" cy="330" rx="155" ry="110" />
        <ellipse cx="95" cy="250" rx="130" ry="90" />
        <ellipse cx="210" cy="190" rx="140" ry="100" />
        <ellipse cx="80" cy="120" rx="110" ry="80" />
        <ellipse cx="190" cy="70" rx="120" ry="85" />
      </g>
      {/* White cumulus stacked from the bottom edge */}
      <g fill="var(--color-surface)">
        <ellipse cx="60" cy="660" rx="150" ry="78" />
        <ellipse cx="190" cy="620" rx="155" ry="95" />
        <ellipse cx="320" cy="650" rx="110" ry="70" />
        <ellipse cx="70" cy="540" rx="140" ry="88" />
        <ellipse cx="210" cy="490" rx="150" ry="100" />
        <ellipse cx="50" cy="410" rx="130" ry="82" />
        <ellipse cx="185" cy="350" rx="145" ry="96" />
        <ellipse cx="310" cy="390" rx="95" ry="70" />
        <ellipse cx="80" cy="270" rx="125" ry="80" />
        <ellipse cx="200" cy="215" rx="135" ry="90" />
        <ellipse cx="70" cy="140" rx="105" ry="72" />
        <ellipse cx="185" cy="95" rx="115" ry="78" />
        <ellipse cx="130" cy="40" rx="80" ry="48" />
      </g>
    </svg>
  );
}

/** 1-off: side column beside the mockup + Deliverable badge, not over the card. */
const SIDE_CLOUD_BOX =
  "h-[82%] w-[min(32rem,max(0px,calc((100vw-54rem)/2)))]" as const;

/**
 * Tall fluffy white clouds filling the left and right of the hero
 * from the bottom edge up, stopping before the centered mockup.
 */
export function CloudBackground({ className }: CloudBackgroundProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      aria-hidden
    >
      <FluffyCloud
        className={cn("absolute bottom-0 left-0", SIDE_CLOUD_BOX)}
      />
      <FluffyCloud
        className={cn(
          "absolute bottom-0 right-0 scale-x-[-1]",
          SIDE_CLOUD_BOX
        )}
      />
    </div>
  );
}
