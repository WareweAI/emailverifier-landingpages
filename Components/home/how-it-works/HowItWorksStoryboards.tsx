import {
  Download,
  FolderOpen,
  Mail,
  MoreVertical,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { cn } from "@/lib/utils";

const DEMO_EMAIL = "jacob.schmidt@gmail.com";

const VERIFY_STEPS = [
  { label: "Initializing verification...", status: "done" as const },
  { label: "Checking domain reputation...", status: "active" as const },
  { label: "Analyzing mailbox existence...", status: "pending" as const },
  { label: "Detecting catch-all behavior...", status: "pending" as const },
  { label: "Evaluating deliverability risk...", status: "pending" as const },
  { label: "Running final validation...", status: "pending" as const },
  { label: "Finalizing result...", status: "pending" as const },
];

const RESULT_BREAKDOWN = [
  { label: "Valid", pct: 11, color: "bg-success" },
  { label: "Invalid", pct: 56, color: "bg-danger" },
  { label: "Risky", pct: 11, color: "bg-warning" },
  { label: "Unknown", pct: 22, color: "bg-rating" },
] as const;

function StoryboardShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface",
        className
      )}
      aria-hidden
    >
      {children}
    </div>
  );
}

function TabSwitcher({ active }: { active: "single" | "bulk" }) {
  return (
    <div className="grid grid-cols-2 border-b border-line">
      <div
        className={cn(
          "px-4 py-3 text-center text-sm font-semibold",
          active === "single"
            ? "bg-primary text-primary-foreground"
            : "bg-surface text-ink-muted"
        )}
      >
        Single Email
      </div>
      <div
        className={cn(
          "px-4 py-3 text-center text-sm font-semibold",
          active === "bulk"
            ? "bg-primary text-primary-foreground"
            : "bg-surface text-ink-muted"
        )}
      >
        Bulk Upload
      </div>
    </div>
  );
}

export function AddEmailsStoryboard() {
  return (
    <StoryboardShell>
      <TabSwitcher active="single" />
      <div className="space-y-4 p-5 sm:p-6">
        <p className="font-semibold text-ink">Single Email Verification</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            readOnly
            tabIndex={-1}
            value=""
            placeholder="Enter email address..."
            className="pointer-events-none h-11 text-sm"
          />
          <Button
            type="button"
            tabIndex={-1}
            className="pointer-events-none h-11 shrink-0 sm:px-6"
          >
            Verify Email
          </Button>
        </div>
      </div>
    </StoryboardShell>
  );
}

export function VerifyStoryboard() {
  return (
    <StoryboardShell>
      <TabSwitcher active="single" />
      <div className="space-y-4 p-5 sm:p-6">
        <p className="font-semibold text-ink">Single Email Verification</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            readOnly
            tabIndex={-1}
            value={DEMO_EMAIL}
            className="pointer-events-none h-11 text-sm"
          />
          <Button
            type="button"
            tabIndex={-1}
            variant="secondary"
            className="pointer-events-none h-11 shrink-0 bg-primary-soft text-primary sm:px-6"
          >
            Verifying...
          </Button>
        </div>

        <div className="rounded-xl border border-line bg-primary-soft/40 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-primary">Verification in progress</p>
                <p
                  className="text-sm text-primary"
                  data-hiw-progress-label
                >
                  Checking domain reputation...
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className="font-display text-2xl font-semibold tabular-nums text-primary"
                data-hiw-progress-pct
              >
                32%
              </p>
              <p className="text-xs text-ink-muted">Live check</p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
            <div
              data-hiw-progress-bar
              className="h-full w-[32%] rounded-full bg-linear-to-r from-primary to-success"
            />
          </div>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {VERIFY_STEPS.map((step) => (
              <li
                key={step.label}
                className={cn(
                  "flex items-center gap-2 text-xs",
                  step.status === "done" && "text-success",
                  step.status === "active" && "font-semibold text-primary",
                  step.status === "pending" && "text-ink-muted"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full",
                    step.status === "done" && "bg-success",
                    step.status === "active" && "bg-primary",
                    step.status === "pending" && "bg-line"
                  )}
                  aria-hidden
                />
                {step.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StoryboardShell>
  );
}

export function ProjectsStoryboard() {
  return (
    <StoryboardShell className="overflow-visible">
      <div className="border-b border-success/20 bg-success-soft px-4 py-2.5 text-center text-sm font-medium text-success">
        Uploaded! 18 unique emails queued for verification.
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" aria-hidden />
            <p className="font-semibold text-ink">Projects</p>
          </div>
          <Button
            type="button"
            tabIndex={-1}
            variant="outline"
            size="sm"
            className="pointer-events-none gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            Refresh
          </Button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-muted text-xs text-ink-muted">
                <th className="px-3 py-2 font-medium">Project</th>
                <th className="px-3 py-2 font-medium">Email Count</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-primary" aria-hidden />
                    <span className="font-medium text-ink">email_list.csv</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5 text-ink">
                    <Mail className="h-4 w-4 text-primary" aria-hidden />
                    <span>18 emails</span>
                  </div>
                  <div className="mt-2 flex h-1.5 overflow-hidden rounded-full">
                    {RESULT_BREAKDOWN.map((segment) => (
                      <div
                        key={segment.label}
                        className={cn(segment.color)}
                        style={{ width: `${segment.pct}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-2 text-[10px] text-ink-muted">
                    {RESULT_BREAKDOWN.map((segment) => (
                      <span key={segment.label} className="inline-flex items-center gap-1">
                        <span
                          className={cn("h-1.5 w-1.5 rounded-full", segment.color)}
                          aria-hidden
                        />
                        {segment.label} {segment.pct}%
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" className="gap-1.5 text-xs">
                      <a href="/email_list.xlsx" download="email_list.xlsx">
                        <Download className="h-3.5 w-3.5" aria-hidden />
                        Download Results
                      </a>
                    </Button>
                    <MoreVertical className="h-4 w-4 text-ink-muted" aria-hidden />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          Click &quot;Download Results&quot; to get the sample <span className="font-mono">email_list.xlsx</span> for checking.
        </p>
      </div>
    </StoryboardShell>
  );
}
