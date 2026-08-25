import { FileUp, FolderOpen } from "lucide-react";
import LogoMark from "@/Components/ui/LogoMark";
import { cn } from "@/lib/utils";

type EmptyStatePreviewProps = {
  className?: string;
};

/**
 * Post-signup empty dashboard — reduces friction by showing the exact next step.
 */
export function EmptyStatePreview({ className }: EmptyStatePreviewProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
      aria-hidden
    >
      <div className="flex min-h-[12rem] flex-col sm:flex-row">
        <aside className="flex shrink-0 items-center gap-2 border-b border-line bg-surface-muted px-3 py-2.5 sm:w-36 sm:flex-col sm:items-stretch sm:border-r sm:border-b-0 sm:p-3">
          <div className="flex items-center gap-2 sm:mb-3">
            <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden">
              <LogoMark />
            </span>
            <span className="hidden text-[10px] font-semibold text-ink sm:inline">
              EmailVerifier
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-2 py-1.5 text-[10px] font-medium text-primary-foreground">
            <FolderOpen className="h-3 w-3" />
            Projects
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col items-center justify-center p-5 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
            <FileUp className="h-5 w-5" aria-hidden />
          </span>
          <p className="mt-3 text-sm font-semibold text-ink">
            Upload your first CSV
          </p>
          <p className="mt-1 max-w-[14rem] text-xs text-ink-muted">
            After signup — drop a list here. 100 free credits, no card.
          </p>
          <span className="mt-4 inline-flex rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
            Choose file
          </span>
        </div>
      </div>
    </div>
  );
}
