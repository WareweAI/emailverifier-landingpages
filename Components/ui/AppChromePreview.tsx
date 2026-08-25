import {
  CheckCircle2,
  Download,
  FolderOpen,
  LayoutDashboard,
  MailCheck,
  Search,
} from "lucide-react";
import LogoMark from "@/Components/ui/LogoMark";
import { StatusChip } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Verify Emails", icon: MailCheck, active: true },
  { label: "Find Emails", icon: Search },
] as const;

const BREAKDOWN = [
  { label: "Valid", pct: 74, color: "bg-success" },
  { label: "Risky", pct: 12, color: "bg-warning" },
  { label: "Invalid", pct: 14, color: "bg-danger" },
] as const;

type AppChromePreviewProps = {
  className?: string;
  /** Emphasize projects/results panel (bulk story). */
  focus?: "verify" | "projects";
};

/**
 * Static high-fidelity app chrome — same product language as the live app,
 * without the heavy GSAP demo. Decorative / aria-hidden.
 */
export function AppChromePreview({
  className,
  focus = "verify",
}: AppChromePreviewProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
      aria-hidden
    >
      <div className="flex min-h-[20rem] flex-col sm:min-h-[22rem] sm:flex-row">
        <aside className="flex shrink-0 flex-row gap-1 border-b border-line bg-surface-muted p-3 sm:w-44 sm:flex-col sm:border-r sm:border-b-0 sm:p-4">
          <div className="mb-0 flex items-center gap-2 sm:mb-4">
            <span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden">
              <LogoMark />
            </span>
            <span className="hidden text-xs font-semibold text-ink sm:inline">
              EmailVerifier
            </span>
          </div>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active =
              focus === "projects"
                ? item.label === "Dashboard"
                : "active" in item && item.active;
            return (
              <div
                key={item.label}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-ink-muted"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </div>
            );
          })}
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          {focus === "projects" ? (
            <ProjectsPanel />
          ) : (
            <VerifyPanel />
          )}
        </div>
      </div>
    </div>
  );
}

function VerifyPanel() {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">Verify Emails</p>
          <p className="mt-0.5 text-xs text-ink-muted">
            Single check · example result
          </p>
        </div>
        <StatusChip label="Deliverable" variant="success" />
      </div>

      <div className="mt-4 rounded-xl border border-line bg-surface-muted/60 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              J
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                jacob.schmidt@gmail.com
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <StatusChip label="Mailbox verified" variant="neutral" />
              </div>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-2xl font-semibold tabular-nums text-ink">
              95
            </p>
            <p className="text-xs text-ink-muted">Score</p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
          {(
            [
              ["Catch-all", "No"],
              ["Disposable", "No"],
              ["Role-based", "No"],
              ["MX", "Yes"],
            ] as const
          ).map(([k, v]) => (
            <div key={k}>
              <dt className="text-ink-muted">{k}</dt>
              <dd className="mt-0.5 font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-success">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Ready to send — same credits for bulk &amp; API
      </p>
    </>
  );
}

function ProjectsPanel() {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-ink">Projects</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
          <Download className="h-3 w-3 text-primary" />
          Download
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-line">
        <div className="flex items-center gap-2 border-b border-line bg-surface-muted px-3 py-2.5">
          <FileName />
          <span className="text-xs text-ink-muted">10,000 emails</span>
        </div>
        <div className="p-3">
          <div className="flex h-2 overflow-hidden rounded-full">
            {BREAKDOWN.map((s) => (
              <div
                key={s.label}
                className={s.color}
                style={{ width: `${s.pct}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-ink-muted">
            {BREAKDOWN.map((s) => (
              <span key={s.label} className="inline-flex items-center gap-1.5">
                <span className={cn("h-1.5 w-1.5 rounded-full", s.color)} />
                {s.label} {s.pct}%
              </span>
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {(
          [
            { email: "maya@studio.co", label: "Valid", variant: "success" as const },
            { email: "info@agency.io", label: "Role", variant: "warning" as const },
            { email: "bounce@old.host", label: "Invalid", variant: "danger" as const },
          ]
        ).map((row) => (
          <li
            key={row.email}
            className="flex items-center justify-between gap-2 rounded-lg border border-line px-3 py-2 text-sm"
          >
            <span className="truncate text-ink">{row.email}</span>
            <StatusChip label={row.label} variant={row.variant} />
          </li>
        ))}
      </ul>
    </>
  );
}

function FileName() {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-1.5 text-sm font-medium text-ink">
      <FolderOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
      <span className="truncate">email_list.csv</span>
    </span>
  );
}
