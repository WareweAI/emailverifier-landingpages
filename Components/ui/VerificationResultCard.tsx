import { StatusChip, type StatusVariant } from "./StatusChip";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const SCORE_MARKS = [0, 25, 50, 75, 100] as const;

function clampScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  const normalized = score > 0 && score <= 1 ? score * 100 : score;
  return Math.min(100, Math.max(0, Math.round(normalized)));
}

type VerificationResultCardProps = {
  email: string;
  statusLabel: string;
  variant: StatusVariant;
  score: number;
  catchAll?: boolean;
  disposable?: boolean;
  roleBased?: boolean;
  /** When set, replaces the avatar + email row title. */
  headline?: string;
  /** Replaces the Catch-all / Disposable / Role-based flags block when set. */
  flagsSlot?: ReactNode;
  footer?: ReactNode;
};

export function VerificationResultCard({
  email,
  statusLabel,
  variant,
  score,
  catchAll = false,
  disposable = false,
  roleBased = false,
  headline,
  flagsSlot,
  footer,
}: VerificationResultCardProps) {
  const value = clampScore(score);
  const initial = (email.trim().charAt(0) || "?").toUpperCase();
  const mailboxVerified = variant === "success" && !catchAll && !disposable;
  const tintedSuccess = variant === "success";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-[var(--shadow-card)]",
        tintedSuccess
          ? "border-success/20 bg-success-soft"
          : "border-line bg-surface"
      )}
      role="status"
      aria-live="polite"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            {!headline && (
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  variant === "success" &&
                    "bg-primary text-primary-foreground",
                  variant === "warning" && "bg-warning-soft text-warning",
                  variant === "danger" && "bg-danger-soft text-danger",
                  variant === "neutral" && "bg-unknown-soft text-unknown"
                )}
                aria-hidden
              >
                {initial}
              </span>
            )}
            <div className="min-w-0">
              <p
                className={cn(
                  "font-semibold text-ink",
                  !headline && "truncate"
                )}
              >
                {headline ?? email}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <StatusChip
                  label={statusLabel}
                  variant={variant}
                  className={
                    tintedSuccess
                      ? "bg-surface text-success ring-1 ring-success/25"
                      : undefined
                  }
                />
                {mailboxVerified && (
                  <StatusChip
                    label="Mailbox verified"
                    variant="neutral"
                    showIcon={false}
                    className={cn(
                      "uppercase tracking-wide",
                      tintedSuccess && "bg-surface ring-1 ring-line"
                    )}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="font-display text-3xl font-semibold tabular-nums leading-none text-ink">
              {value}
            </p>
            <p className="mt-1 text-sm text-ink-muted">Score</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs tabular-nums text-ink-muted">
            {SCORE_MARKS.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
          <div className="relative h-2.5">
            <div className="flex h-2.5 overflow-hidden rounded-full">
              <div className="w-1/4 bg-score-low" />
              <div className="w-1/4 bg-score-mid-low" />
              <div className="w-1/4 bg-score-mid-high" />
              <div className="w-1/4 bg-score-high" />
            </div>
            <span
              className={cn(
                "absolute top-1/2 h-4 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-[var(--shadow-card)]",
                tintedSuccess ? "border-success-soft" : "border-surface",
                value < 25 && "bg-score-low",
                value >= 25 && value < 50 && "bg-score-mid-low",
                value >= 50 && value < 75 && "bg-score-mid-high",
                value >= 75 && "bg-score-high"
              )}
              style={{ left: `${value}%` }}
              aria-hidden
            />
          </div>
        </div>

        {flagsSlot === undefined && (
          <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 rounded-xl border border-line bg-surface/80 p-4">
            <div>
              <dt className="text-sm text-ink-muted">Catch-all</dt>
              <dd className="mt-0.5 font-semibold text-ink">
                {catchAll ? "Yes" : "No"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Disposable</dt>
              <dd className="mt-0.5 font-semibold text-ink">
                {disposable ? "Yes" : "No"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Role-based</dt>
              <dd className="mt-0.5 font-semibold text-ink">
                {roleBased ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        )}
      </div>

      {flagsSlot !== undefined && (
        <div className="border-t border-line/70 bg-surface px-4 pt-3 pb-4">
          {flagsSlot}
        </div>
      )}

      {footer}
    </div>
  );
}
