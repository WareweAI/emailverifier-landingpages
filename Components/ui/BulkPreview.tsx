import { Download, FileSpreadsheet } from "lucide-react";
import { StatusChip, type StatusVariant } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";

type Row = {
  email: string;
  label: string;
  variant: StatusVariant;
};

const EXAMPLE_ROWS: Row[] = [
  { email: "maya@studio.co", label: "Valid", variant: "success" },
  { email: "jordan@acme.io", label: "Valid", variant: "success" },
  { email: "info@agency.io", label: "Role", variant: "warning" },
  { email: "sam@newsletter.tech", label: "Valid", variant: "success" },
  { email: "temp@mailinator.com", label: "Disposable", variant: "danger" },
  { email: "bounce@old.host", label: "Invalid", variant: "danger" },
  { email: "alex@catch-all.co", label: "Risky", variant: "warning" },
  { email: "priya@product.dev", label: "Valid", variant: "success" },
  { email: "support@vendor.net", label: "Role", variant: "warning" },
  { email: "gone@defunct.biz", label: "Invalid", variant: "danger" },
];

const SUMMARY = [
  { label: "Valid", count: "7,420", variant: "success" as const },
  { label: "Risky", count: "1,180", variant: "warning" as const },
  { label: "Invalid", count: "1,400", variant: "danger" as const },
] as const;

type BulkPreviewProps = {
  className?: string;
  /** Fewer rows for tight cards (e.g. NextPaths). */
  compact?: boolean;
};

export function BulkPreview({ className, compact = false }: BulkPreviewProps) {
  const rows = compact ? EXAMPLE_ROWS.slice(0, 5) : EXAMPLE_ROWS;

  return (
    <div
      className={
        className ??
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]"
      }
      aria-hidden
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-surface-muted px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate text-sm font-semibold text-ink">
              email_list.csv
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs text-ink-muted">Example · 10K</span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-2 py-1 text-xs font-semibold text-ink">
              <Download className="h-3 w-3 text-primary" />
              Download
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 border-b border-line px-4 py-3">
          {SUMMARY.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-muted px-2.5 py-1 text-xs"
            >
              <StatusChip label={item.label} variant={item.variant} />
              <span className="font-semibold tabular-nums text-ink">
                {item.count}
              </span>
            </span>
          ))}
        </div>

        <div className={cn("min-h-0 flex-1", compact && "overflow-hidden")}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-surface-muted text-xs text-ink-muted">
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.email} className="border-t border-line">
                  <td className="truncate px-4 py-2.5 text-ink">{row.email}</td>
                  <td className="px-4 py-2.5">
                    <StatusChip label={row.label} variant={row.variant} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
