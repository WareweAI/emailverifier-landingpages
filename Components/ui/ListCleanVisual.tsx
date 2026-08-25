import { ArrowRight, FileSpreadsheet } from "lucide-react";
import { StatusChip } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";

const BEFORE_ROWS = [
  "maya@studio.co",
  "info@agency.io",
  "temp@mailinator.com",
  "bounce@old.host",
  "jordan@acme.io",
  "alex@catch-all.co",
] as const;

const AFTER_ROWS = [
  { email: "maya@studio.co", label: "Valid", variant: "success" as const },
  { email: "info@agency.io", label: "Role", variant: "warning" as const },
  { email: "temp@mailinator.com", label: "Disposable", variant: "danger" as const },
  { email: "bounce@old.host", label: "Invalid", variant: "danger" as const },
  { email: "jordan@acme.io", label: "Valid", variant: "success" as const },
  { email: "alex@catch-all.co", label: "Risky", variant: "warning" as const },
] as const;

const BREAKDOWN = [
  { label: "Valid", pct: 74, color: "bg-success", count: "7,420" },
  { label: "Risky", pct: 12, color: "bg-warning", count: "1,180" },
  { label: "Invalid", pct: 14, color: "bg-danger", count: "1,400" },
] as const;

type ListCleanVisualProps = {
  className?: string;
};

/**
 * Product-led before → after: raw list becomes status-coded results.
 * Counts are illustrative (labeled as example).
 */
export function ListCleanVisual({ className }: ListCleanVisualProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-muted px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <FileSpreadsheet className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate text-sm font-semibold text-ink">
            Dirty list → clean results
          </span>
        </div>
        <span className="text-xs text-ink-muted">Example · 10,000 emails</span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <div className="border-b border-line p-4 md:border-r md:border-b-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Before
          </p>
          <p className="mt-1 text-sm font-medium text-ink">Unverified CSV</p>
          <ul className="mt-3 space-y-2">
            {BEFORE_ROWS.map((email) => (
              <li
                key={email}
                className="truncate rounded-lg border border-line bg-surface-muted px-3 py-2 text-sm text-ink-muted"
              >
                {email}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-muted">+ 9,994 more rows…</p>
        </div>

        <div className="flex items-center justify-center border-b border-line bg-primary-soft/40 px-3 py-2 md:border-r md:border-b-0 md:px-2">
          <ArrowRight
            className="h-5 w-5 rotate-90 text-primary md:rotate-0"
            aria-hidden
          />
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            After
          </p>
          <p className="mt-1 text-sm font-medium text-ink">Statuses ready</p>

          <div className="mt-3 flex h-2 overflow-hidden rounded-full">
            {BREAKDOWN.map((segment) => (
              <div
                key={segment.label}
                className={segment.color}
                style={{ width: `${segment.pct}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {BREAKDOWN.map((segment) => (
              <span
                key={segment.label}
                className="inline-flex items-center gap-1.5 text-xs text-ink-muted"
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", segment.color)}
                />
                {segment.label}{" "}
                <span className="font-semibold tabular-nums text-ink">
                  {segment.count}
                </span>
              </span>
            ))}
          </div>

          <ul className="mt-4 space-y-2">
            {AFTER_ROWS.map((row) => (
              <li
                key={row.email}
                className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface-muted px-3 py-2"
              >
                <span className="min-w-0 truncate text-sm text-ink">
                  {row.email}
                </span>
                <StatusChip label={row.label} variant={row.variant} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
