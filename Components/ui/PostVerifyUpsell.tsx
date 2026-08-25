import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { REGISTER_URL } from "@/lib/api-snippet";
import { cn } from "@/lib/utils";

type PostVerifyUpsellProps = {
  mode?: "after-result" | "at-limit";
  className?: string;
};

/**
 * Conversion panel after verify: signup CTA for full-list credits.
 */
export function PostVerifyUpsell({
  mode = "after-result",
  className,
}: PostVerifyUpsellProps) {
  const atLimit = mode === "at-limit";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface-muted/80 p-4",
        atLimit && "border-warning/30 bg-warning-soft/50",
        className
      )}
      role={atLimit ? "alert" : undefined}
    >
      <p className="text-sm font-semibold text-ink">
        {atLimit
          ? "You've used all 3 free checks"
          : "Clean a full list next"}
      </p>
      <p className="mt-1 text-sm text-ink-muted">
        {atLimit
          ? "Sign up for 100 free credits — your next screen is upload a CSV."
          : "Sign up and land on Projects — upload CSV, get Valid / Risky / Invalid. No card."}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-ev-event="cta_register_click"
          className="text-sm font-semibold text-primary hover:underline"
        >
          {atLimit
            ? "Get 100 free credits"
            : "Clean a full list — 100 free"}
        </Link>
        <Link
          href={atLimit ? "/pricing" : "/bulk-email-verifier"}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-primary"
        >
          {atLimit ? "See pricing" : "See bulk verifier"}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
