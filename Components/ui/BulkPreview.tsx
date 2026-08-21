import { FileSpreadsheet } from "lucide-react";
import { StatusChip } from "@/Components/ui/StatusChip";

const EXAMPLE_ROWS = [
  { email: "maya@studio.co", label: "Valid", variant: "success" as const },
  { email: "info@agency.io", label: "Role", variant: "warning" as const },
  { email: "bounce@old.host", label: "Invalid", variant: "danger" as const },
];

export function BulkPreview({ className }: { className?: string }) {
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
          <span className="text-xs text-ink-muted">Example mix</span>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 px-4 py-3">
          <StatusChip label="Valid" variant="success" />
          <StatusChip label="Risky" variant="warning" />
          <StatusChip label="Invalid" variant="danger" />
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-t border-line bg-surface-muted text-xs text-ink-muted">
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLE_ROWS.map((row) => (
              <tr key={row.email} className="border-t border-line">
                <td className="px-4 py-2.5 text-ink">{row.email}</td>
                <td className="px-4 py-2.5">
                  <StatusChip label={row.label} variant={row.variant} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
