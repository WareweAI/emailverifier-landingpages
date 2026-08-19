import { StatusChip, type StatusVariant } from "./StatusChip";
import { cn } from "@/lib/utils";

const SCORE_MARKS = [0, 40, 70, 100] as const;

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
  footer?: React.ReactNode;
};

export function VerificationResultCard({
  email,
  statusLabel,
  variant,
  score,
  catchAll = false,
  disposable = false,
  roleBased = false,
  footer,
}: VerificationResultCardProps) {
  const value = clampScore(score);
  const initial = (email.trim().charAt(0) || "?").toUpperCase();
  const mailboxVerified = variant === "success" && !catchAll && !disposable;

  return (
    <div
      className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)]"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
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
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">{email}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <StatusChip label={statusLabel} variant={variant} />
              {mailboxVerified && (
                <StatusChip
                  label="Mailbox verified"
                  variant="neutral"
                  showIcon={false}
                  className="uppercase tracking-wide"
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
        <div className="relative h-2">
          <div className="flex h-2 overflow-hidden rounded-full">
            <div className="w-2/5 bg-linear-to-r from-danger to-danger-soft" />
            <div className="w-[30%] bg-warning-soft" />
            <div className="w-[30%] bg-success" />
          </div>
          <span
            className="absolute top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
            style={{ left: `${value}%` }}
            aria-hidden
          />
        </div>
        <div className="mt-1 flex justify-between text-xs tabular-nums text-ink-muted">
          {SCORE_MARKS.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <dt className="text-sm text-ink-muted">Catch-all</dt>
          <dd className="mt-0.5 font-semibold text-ink">{catchAll ? "Yes" : "No"}</dd>
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

      {footer}
    </div>
  );
}
