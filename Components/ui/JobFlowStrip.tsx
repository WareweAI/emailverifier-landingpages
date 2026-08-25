import { Download, FileUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    key: "upload",
    title: "Upload",
    caption: "Drop CSV, TXT, or XLSX",
    icon: FileUp,
    body: (
      <div className="rounded-xl border border-dashed border-primary/40 bg-primary-soft/50 px-3 py-6 text-center">
        <FileUp className="mx-auto h-6 w-6 text-primary" aria-hidden />
        <p className="mt-2 text-xs font-semibold text-ink">email_list.csv</p>
        <p className="mt-0.5 text-[10px] text-ink-muted">10,000 emails</p>
      </div>
    ),
  },
  {
    key: "progress",
    title: "Verify",
    caption: "Job running — example",
    icon: Loader2,
    body: (
      <div className="rounded-xl border border-line bg-surface-muted px-3 py-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-primary">Verifying list…</p>
          <span className="text-xs font-semibold tabular-nums text-primary">
            68%
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
          <div className="h-full w-[68%] rounded-full bg-primary" />
        </div>
        <p className="mt-2 text-[10px] text-ink-muted">
          Syntax · MX · Mailbox · Risk flags
        </p>
      </div>
    ),
  },
  {
    key: "download",
    title: "Download",
    caption: "Statuses ready",
    icon: Download,
    body: (
      <div className="rounded-xl border border-line bg-surface-muted px-3 py-4">
        <div className="flex h-1.5 overflow-hidden rounded-full">
          <div className="w-[74%] bg-success" />
          <div className="w-[12%] bg-warning" />
          <div className="w-[14%] bg-danger" />
        </div>
        <p className="mt-2 text-[10px] text-ink-muted">
          Valid 74% · Risky 12% · Invalid 14%
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-semibold text-ink">
          <Download className="h-3 w-3 text-primary" aria-hidden />
          Download results
        </span>
      </div>
    ),
  },
] as const;

type JobFlowStripProps = {
  className?: string;
};

/** Static 3-frame product cinema: upload → progress → download. */
export function JobFlowStrip({ className }: JobFlowStripProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
      aria-hidden
    >
      <div className="border-b border-line bg-surface-muted px-4 py-2.5">
        <p className="text-xs font-medium text-ink-muted">
          Bulk job flow · example
        </p>
      </div>
      <ol className="grid gap-0 sm:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <li
              key={step.key}
              className={cn(
                "p-4",
                i < STEPS.length - 1 && "border-b border-line sm:border-r sm:border-b-0"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {step.title}
                  </p>
                  <p className="text-[10px] text-ink-muted">{step.caption}</p>
                </div>
              </div>
              <div className="mt-3">{step.body}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
