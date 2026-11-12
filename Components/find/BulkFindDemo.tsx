import Image from "next/image";

const ROWS = [
  ["Rows submitted", "500"],
  ["Emails found", "312"],
  ["Not charged (no match)", "188"],
  ["Credits used", "312"],
] as const;

/** Static bulk-find task preview for the Data Enrichment product hero. */
export function BulkFindDemo() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="border-b border-line bg-surface-muted px-4 py-3">
        <p className="text-sm font-semibold text-ink">Bulk find task · example</p>
        <p className="text-xs text-ink-muted">
          Illustrative progress — not a live job
        </p>
      </div>
      <div className="space-y-3 p-4">
        {ROWS.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-background px-3 py-2.5 text-sm"
          >
            <span className="text-ink-muted">{label}</span>
            <span className="font-semibold tabular-nums text-ink">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-line px-4 py-3">
        <Image
          src="/logos/integrations/google-drive.svg"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5"
          unoptimized
        />
        <p className="text-xs text-ink-muted">
          Import sources available in-app after signup
        </p>
      </div>
    </div>
  );
}
