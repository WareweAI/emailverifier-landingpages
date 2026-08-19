import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DesktopMockupProps = {
  children: ReactNode;
  className?: string;
  chromeLabel?: string;
};

export function DesktopMockup({
  children,
  className,
  chromeLabel = "emailverifier.io",
}: DesktopMockupProps) {
  return (
    <div className={cn(className)}>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 border-b border-line bg-surface-muted px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden />
          <span className="ml-2 flex-1 truncate rounded-full bg-background px-3 py-1 text-center text-xs text-ink-muted">
            {chromeLabel}
          </span>
        </div>
        <div className="min-h-48 bg-surface p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}

