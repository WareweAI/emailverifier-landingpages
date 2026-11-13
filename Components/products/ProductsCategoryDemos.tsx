"use client";

import {
  all,
  el,
  press,
  setStatus,
  typeText,
  usePillarDemo,
  type DemoTimeline,
} from "@/Components/home/feature-pillars/demos/demo-kit";
import { StatusChip } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";
import { AtSign, Loader2, Mail, Search, User } from "lucide-react";

const FLAGS = ["Syntax", "MX", "Mailbox", "Not disposable"] as const;

function buildVerify(tl: DemoTimeline, root: HTMLDivElement) {
  const email = el(root, "[data-verify-email]");
  const ph = el(root, "[data-verify-ph]");
  const btn = el(root, "[data-verify-btn]");
  const busy = el(root, "[data-verify-busy]");
  const result = el(root, "[data-verify-result]");
  const flags = all(root, "[data-verify-flag]");
  const status = el(root, "[data-status]");
  const dot = el(root, "[data-status-dot]");

  tl.set(result, { autoAlpha: 0, y: 10 }, 0)
    .set(flags, { autoAlpha: 0, y: 6 }, 0)
    .set(busy, { autoAlpha: 0 }, 0)
    .set(ph, { autoAlpha: 1 }, 0)
    .call(() => {
      email.textContent = "";
    }, [], 0);

  setStatus(tl, status, dot, "Ready to email verify", "idle", 0);

  tl.addLabel("type", "+=0.45")
    .to(ph, { autoAlpha: 0, duration: 0.12 }, "type")
    .add(() => {}, "type");

  typeText(tl, email, "lead@example.com", 1.05, "type");
  press(tl, btn, "+=0.15");
  setStatus(tl, status, dot, "Checking deliverability…", "busy", "-=0.05");
  tl.to(busy, { autoAlpha: 1, duration: 0.2 }, "-=0.05")
    .to(busy, { autoAlpha: 0, duration: 0.18 }, "+=0.85")
    .to(result, { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.05")
    .to(
      flags,
      { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.08 },
      "-=0.15",
    );
  setStatus(tl, status, dot, "Deliverable · example result", "ok", "-=0.2");
  tl.to({}, { duration: 1.35 });
}

function buildLeads(tl: DemoTimeline, root: HTMLDivElement) {
  const name = el(root, "[data-lead-name]");
  const company = el(root, "[data-lead-company]");
  const namePh = el(root, "[data-lead-name-ph]");
  const companyPh = el(root, "[data-lead-company-ph]");
  const btn = el(root, "[data-lead-btn]");
  const busy = el(root, "[data-lead-busy]");
  const result = el(root, "[data-lead-result]");
  const rows = all(root, "[data-lead-row]");
  const status = el(root, "[data-status]");
  const dot = el(root, "[data-status-dot]");

  tl.set(result, { autoAlpha: 0, y: 10 }, 0)
    .set(rows, { autoAlpha: 0, x: -8 }, 0)
    .set(busy, { autoAlpha: 0 }, 0)
    .set([namePh, companyPh], { autoAlpha: 1 }, 0)
    .call(() => {
      name.textContent = "";
      company.textContent = "";
    }, [], 0);

  setStatus(tl, status, dot, "Find a verified work email", "idle", 0);

  tl.addLabel("typeName", "+=0.4")
    .to(namePh, { autoAlpha: 0, duration: 0.1 }, "typeName");
  typeText(tl, name, "Alex Morgan", 0.85, "typeName");

  tl.addLabel("typeCompany", "+=0.2")
    .to(companyPh, { autoAlpha: 0, duration: 0.1 }, "typeCompany");
  typeText(tl, company, "acme.com", 0.7, "typeCompany");

  press(tl, btn, "+=0.12");
  setStatus(tl, status, dot, "Matching patterns…", "busy", "-=0.05");
  tl.to(busy, { autoAlpha: 1, duration: 0.2 }, "-=0.05")
    .to(busy, { autoAlpha: 0, duration: 0.18 }, "+=0.75")
    .to(result, { autoAlpha: 1, y: 0, duration: 0.32 }, "-=0.05")
    .to(
      rows,
      { autoAlpha: 1, x: 0, duration: 0.28, stagger: 0.1 },
      "-=0.12",
    );
  setStatus(tl, status, dot, "2 matches · pre-checked", "ok", "-=0.15");
  tl.to({}, { duration: 1.35 });
}

function DemoStatusBar({
  initial,
  settled,
}: {
  initial: string;
  settled: string;
}) {
  return (
    <div className="flex h-9 items-center gap-2 border-t border-line bg-surface px-3">
      <span
        data-status-dot
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-muted [[data-tone=busy]]:bg-warning [[data-tone=ok]]:bg-success [[data-tone=warn]]:bg-warning"
      />
      <span
        data-status
        className="truncate text-xs font-medium text-ink-muted motion-reduce:hidden"
      >
        {initial}
      </span>
      <span className="hidden truncate text-xs font-medium text-ink-muted motion-reduce:inline">
        {settled}
      </span>
    </div>
  );
}

export function VerifyCategoryDemo({ className }: { className?: string }) {
  const scope = usePillarDemo(buildVerify);

  return (
    <div
      ref={scope}
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-xl bg-surface",
        className,
      )}
    >
      <div className="border-b border-line px-3 py-2.5">
        <p className="text-sm font-semibold text-ink">Email Verification</p>
        <p className="mt-0.5 text-xs text-ink-muted">
          Validator · Bulk · API
        </p>
      </div>
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <div className="flex h-11 items-center rounded-lg border border-line bg-surface-muted pl-9 pr-3 text-sm text-ink">
              <span data-verify-email className="truncate font-medium" />
              <span
                data-verify-ph
                className="absolute left-9 text-ink-muted motion-reduce:hidden"
              >
                you@company.com
              </span>
              <span className="hidden text-ink motion-reduce:inline">
                lead@example.com
              </span>
            </div>
          </div>
          <button
            type="button"
            tabIndex={-1}
            data-verify-btn
            className="relative inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            Verify
            <span
              data-verify-busy
              className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary opacity-0 motion-reduce:hidden"
            >
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            </span>
          </button>
        </div>

        <div
          data-verify-result
          className="rounded-xl border border-success/20 bg-success-soft p-3 motion-reduce:opacity-100!"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-semibold text-ink">
              lead@example.com
            </span>
            <StatusChip
              label="Deliverable"
              variant="success"
              className="shrink-0 px-2 py-0.5"
            />
          </div>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {FLAGS.map((flag) => (
              <li
                key={flag}
                data-verify-flag
                className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-success ring-1 ring-success/20"
              >
                {flag}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DemoStatusBar
        initial="Ready to email verify"
        settled="Deliverable · example result"
      />
    </div>
  );
}

export function LeadCategoryDemo({ className }: { className?: string }) {
  const scope = usePillarDemo(buildLeads);

  return (
    <div
      ref={scope}
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-xl bg-surface",
        className,
      )}
    >
      <div className="border-b border-line px-3 py-2.5">
        <p className="text-sm font-semibold text-ink">Lead Generation</p>
        <p className="mt-0.5 text-xs text-ink-muted">
          Finder · Leads · Enrichment
        </p>
      </div>
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <User
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <div className="relative flex h-11 items-center rounded-lg border border-line bg-surface-muted pl-9 pr-3 text-sm text-ink">
              <span data-lead-name className="truncate font-medium" />
              <span
                data-lead-name-ph
                className="absolute left-9 text-ink-muted motion-reduce:hidden"
              >
                Full name
              </span>
              <span className="hidden text-ink motion-reduce:inline">
                Alex Morgan
              </span>
            </div>
          </div>
          <div className="relative min-w-0 flex-1">
            <AtSign
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <div className="relative flex h-11 items-center rounded-lg border border-line bg-surface-muted pl-9 pr-3 text-sm text-ink">
              <span data-lead-company className="truncate font-medium" />
              <span
                data-lead-company-ph
                className="absolute left-9 text-ink-muted motion-reduce:hidden"
              >
                Company domain
              </span>
              <span className="hidden text-ink motion-reduce:inline">
                acme.com
              </span>
            </div>
          </div>
          <button
            type="button"
            tabIndex={-1}
            data-lead-btn
            className="relative inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <Search className="h-4 w-4" aria-hidden />
            Find
            <span
              data-lead-busy
              className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary opacity-0 motion-reduce:hidden"
            >
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            </span>
          </button>
        </div>

        <div
          data-lead-result
          className="rounded-xl border border-success/20 bg-success-soft p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-ink">Matching work emails</p>
            <StatusChip
              label="Example"
              variant="neutral"
              showIcon={false}
              className="bg-surface uppercase tracking-wide ring-1 ring-line"
            />
          </div>
          <ul className="mt-2 space-y-2">
            {(
              [
                ["alex.morgan@acme.com", "Best"],
                ["amorgan@acme.com", "Likely"],
              ] as const
            ).map(([email, note]) => (
              <li
                key={email}
                data-lead-row
                className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface px-3 py-2"
              >
                <span className="truncate text-sm font-medium text-ink">
                  {email}
                </span>
                <span className="shrink-0 text-xs font-semibold text-success">
                  {note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DemoStatusBar
        initial="Find a verified work email"
        settled="2 matches · pre-checked"
      />
    </div>
  );
}
