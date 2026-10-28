import { StatusChip } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";
import {
  AtSign,
  Copy,
  Download,
  FileUp,
  FolderOpen,
  MoreHorizontal,
  RefreshCw,
  Search,
  Upload,
} from "lucide-react";
import Image from "next/image";

/** Decorative dashboard previews — aria-hidden by parent. */

const IMPORT_SOURCES = [
  {
    id: "gdrive",
    label: "Google Drive",
    src: "/logos/integrations/google-drive.svg",
  },
  {
    id: "onedrive",
    label: "Microsoft OneDrive",
    src: "/logos/integrations/onedrive.svg",
    soon: true,
  },
  {
    id: "dropbox",
    label: "Dropbox",
    src: "/logos/integrations/dropbox.svg",
    soon: true,
  },
  {
    id: "airtable",
    label: "Airtable",
    src: "/logos/integrations/airtable.svg",
    soon: true,
  },
] as const;

export function VerifyEmailsMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">Bulk Verify</p>
        <div className="flex rounded-full bg-surface-muted p-0.5 text-[10px] font-semibold">
          <span className="rounded-full bg-ink px-2.5 py-1 text-primary-foreground">
            Bulk Verify
          </span>
          <span className="px-2.5 py-1 text-ink-muted">Single Email</span>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface-muted/60 px-4 py-6 text-center">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
            <Upload className="h-5 w-5" aria-hidden />
          </span>
          <p className="text-sm font-semibold text-ink">Drop a CSV of emails</p>
          <p className="text-xs text-ink-muted">CSV, XLS, or XLSX · 1 credit each</p>
          <span className="mt-1 inline-flex h-9 items-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground">
            Upload list
          </span>
        </div>

        <div>
          <p className="text-xs font-medium text-ink-muted">Import from</p>
          <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {IMPORT_SOURCES.map((source) => (
              <li
                key={source.id}
                className="relative flex flex-col items-center gap-1.5 rounded-xl border border-line bg-surface-muted/70 px-2 py-3 text-center"
              >
                {"soon" in source && source.soon ? (
                  <span className="absolute top-1.5 right-1.5 rounded-full bg-line px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">
                    Soon
                  </span>
                ) : null}
                <Image
                  src={source.src}
                  alt=""
                  width={28}
                  height={28}
                  unoptimized
                  className="h-7 w-7 object-contain"
                />
                <span className="text-[10px] font-medium leading-tight text-ink sm:text-xs">
                  {source.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
            <Download className="h-3.5 w-3.5" aria-hidden />
            Template
          </p>
        </div>
      </div>
    </div>
  );
}

export function FindEmailsMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">Find Email</p>
        <div className="flex rounded-full bg-surface-muted p-0.5 text-[10px] font-semibold">
          <span className="rounded-full bg-ink px-2.5 py-1 text-primary-foreground">
            Name and company
          </span>
          <span className="px-2.5 py-1 text-ink-muted">LinkedIn</span>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <div className="rounded-lg border border-line bg-surface py-2.5 pr-3 pl-9 text-sm text-ink-muted">
              Satya Nadella
            </div>
          </div>
          <AtSign className="mx-auto hidden h-4 w-4 text-ink-muted sm:block" aria-hidden />
          <div className="relative min-w-0 flex-1">
            <div className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink-muted">
              microsoft.com
            </div>
          </div>
          <span className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground">
            Find email
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-muted/50 px-3 py-2.5">
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
              <FolderOpen className="h-4 w-4 text-primary" aria-hidden />
              Bulk Find Email Tasks
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
              <RefreshCw className="h-3 w-3" aria-hidden />
              Refresh
            </span>
          </div>
          <ul className="divide-y divide-line">
            {(
              [
                {
                  file: "bulk_find_emails.csv",
                  found: "6 of 9 found",
                  safe: 67,
                  risky: 33,
                  created: "Oct 21, 2026, 04:13 PM",
                  showBar: true,
                },
                {
                  file: "bulk_find_emails_test.csv",
                  found: "0 of 10 found",
                  safe: 0,
                  risky: 0,
                  created: "Oct 21, 2026, 01:49 PM",
                  showBar: false,
                },
              ] as const
            ).map((task) => (
              <li
                key={task.file}
                className="grid gap-3 px-3 py-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] sm:items-center"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 truncate text-sm font-medium text-ink">
                    <FolderOpen
                      className="h-3.5 w-3.5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="truncate">{task.file}</span>
                  </p>
                  <p className="mt-1 text-xs text-ink-muted sm:hidden">
                    {task.created}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink">{task.found}</p>
                  {task.showBar ? (
                    <>
                      <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full bg-line">
                        <span
                          className="bg-success"
                          style={{ width: `${task.safe}%` }}
                        />
                        <span
                          className="bg-warning"
                          style={{ width: `${task.risky}%` }}
                        />
                      </div>
                      <p className="mt-1 flex flex-wrap gap-x-2 text-[10px] text-ink-muted">
                        <span className="inline-flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-success" />
                          {task.safe}% Safe to send
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                          {task.risky}% Risky to send
                        </span>
                      </p>
                    </>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusChip label="Completed" variant="success" />
                  <span className="hidden text-[10px] text-ink-muted lg:inline">
                    {task.created}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
                    <Download className="h-3 w-3" aria-hidden />
                    Download
                  </span>
                  <MoreHorizontal
                    className="h-4 w-4 text-ink-muted"
                    aria-hidden
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FindLeadsMockup({ className }: { className?: string }) {
  const leads = [
    {
      name: "Jordan Hale",
      role: "VP of Engineering, Data and AI · Northpeak",
      email: "jordan.hale@northpeak.io",
    },
    {
      name: "Priya Nair",
      role: "VP of Engineering · Brightlane",
      email: "p.nair@brightlane.co",
    },
    {
      name: "Marcus Chen",
      role: "VP of Engineering · Cloudspan AI",
      email: "marcus.chen@cloudspan.ai",
    },
    {
      name: "Elena Vargas",
      role: "VP Engineering · Harbor Labs",
      email: null,
    },
    {
      name: "Noah Patel",
      role: "VP of Engineering · Stackwell",
      email: "noah@stackwell.com",
    },
  ] as const;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">Find Prospects with AI</p>
        <div className="flex rounded-full bg-surface-muted p-0.5 text-[10px] font-semibold">
          <span className="rounded-full bg-ink px-2.5 py-1 text-primary-foreground">
            Person
          </span>
          <span className="px-2.5 py-1 text-ink-muted">Company</span>
          <span className="relative inline-flex items-center gap-1 px-2.5 py-1 text-ink-muted">
            Local
            <span className="rounded-full bg-line px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-ink-muted">
              Soon
            </span>
          </span>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="rounded-xl border border-line bg-surface-muted/50 p-3">
          <p className="text-sm leading-relaxed text-ink-muted">
            VPs of Engineering at companies with 50-200 employees
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <div className="hidden grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-2 border-b border-line bg-surface-muted/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-ink-muted sm:grid">
            <span>#</span>
            <span>Name</span>
            <span>Experiences</span>
            <span>Email</span>
          </div>
          <ul className="divide-y divide-line">
            {leads.map((lead, index) => (
              <li
                key={lead.name}
                className="grid gap-1 px-3 py-2.5 sm:grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] sm:items-center sm:gap-2"
              >
                <span className="hidden text-xs tabular-nums text-ink-muted sm:block">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {lead.name}
                  </p>
                  <p className="truncate text-xs text-ink-muted sm:hidden">
                    {lead.role}
                  </p>
                </div>
                <p className="hidden truncate text-xs text-ink-muted sm:block">
                  {lead.role}
                </p>
                <div className="min-w-0">
                  {lead.email ? (
                    <p className="flex items-center gap-1.5 truncate text-xs font-medium text-ink">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                      <span className="truncate">{lead.email}</span>
                      <Copy
                        className="h-3 w-3 shrink-0 text-ink-muted"
                        aria-hidden
                      />
                    </p>
                  ) : (
                    <p className="text-xs text-ink-muted">
                      No email found · not charged
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ApiKeysMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">API keys</p>
        <span className="inline-flex h-8 items-center rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground">
          + New key
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="rounded-xl border border-line px-3 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-ink">Production key</p>
            <StatusChip label="Active" variant="success" />
          </div>
          <p className="mt-1 font-mono text-xs text-ink-muted">
            ev_9bd63••••••••••••
          </p>
        </div>
        <div className="rounded-xl border border-line bg-ink p-4 font-mono text-[11px] leading-relaxed text-primary-foreground">
          <p className="text-primary-soft/80"># Single email verifier</p>
          <p className="mt-1 break-all">
            <span className="text-success">POST</span>{" "}
            /api/v1/verify
          </p>
          <pre className="mt-3 overflow-x-auto text-primary-soft/90">{`{
  "email": "user@company.com",
  "result": "safe",
  "score": 98
}`}</pre>
        </div>
        <p className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
          <FileUp className="h-3.5 w-3.5" aria-hidden />
          Same credits as bulk · curl, Node, Python in the dashboard
        </p>
      </div>
    </div>
  );
}
