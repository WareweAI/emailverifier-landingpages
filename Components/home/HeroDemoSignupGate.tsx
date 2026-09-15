import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { REGISTER_URL } from "@/lib/api-snippet";
import { cn } from "@/lib/utils";

type HeroDemoSignupGateProps = {
  title?: string;
  description?: string;
  location: string;
  className?: string;
};

export function HeroDemoSignupGate({
  title = "Sign up to check results",
  description = "Create a free account to unlock this result — 100 free credits, no card.",
  location,
  className,
}: HeroDemoSignupGateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-line bg-surface/90 p-5 text-center shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-6",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <p className="text-base font-semibold text-ink">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
      <Button
        size="lg"
        asChild
        className="mt-4 min-h-12 w-full max-w-xs rounded-full border border-ink bg-cta text-cta-foreground hover:bg-cta-hover active:bg-cta-hover sm:w-auto"
      >
        <Link
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-ev-event="cta_register_click"
          data-ev-loc={location}
        >
          Get 100 free credits
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Button>
    </div>
  );
}
