"use client";

import { StatusChip } from "@/Components/ui/StatusChip";
import {
  Caret,
  DemoHeader,
  DemoShell,
  DemoStatus,
  Ripple,
  Segmented,
  all,
  el,
  press,
  ripple,
  sceneClass,
  setStatus,
  typeText,
  usePillarDemo,
  type DemoTimeline,
} from "@/Components/home/feature-pillars/demos/demo-kit";
import { cn } from "@/lib/utils";
import {
  AtSign,
  Download,
  FolderOpen,
  Mail,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";

/**
 * Find Emails — looping product demo.
 *
 * Flow: type name + company → finding → one verified match → bulk task bar → reset.
 * Edit COPY for the query and T for pacing (seconds).
 */

const COPY = {
  idle: "Find a work email",
  name: "Satya Nadella",
  company: "microsoft.com",
  namePh: "John Smith",
  companyPh: "Acme or acme.com",
  finding: "Finding email…",
  found: "Found 1 email · safe to send",
  bulk: "6 of 9 found",
} as const;

/** Seconds. Type → search → match → bulk task → reset. */
const T = {
  idle: 0.5,
  typeName: 1.05,
  typeCompany: 1.0,
  companyDelay: 0.4,
  finding: 1.05,
  holdFound: 1.4,
  holdBulk: 1.7,
} as const;

const focusRing = ["border-primary", "ring-2", "ring-primary"] as const;

function build(tl: DemoTimeline, root: HTMLDivElement) {
  const form = el(root, '[data-scene="form"]');
  const bulk = el(root, '[data-scene="bulk"]');
  const name = el(root, "[data-name]");
  const company = el(root, "[data-company]");
  const namePh = el(root, "[data-name-ph]");
  const companyPh = el(root, "[data-company-ph]");
  const nameBox = el(root, "[data-name-box]");
  const companyBox = el(root, "[data-company-box]");
  const nameCaret = el(root, '[data-caret="name"]');
  const companyCaret = el(root, '[data-caret="company"]');
  const findBtn = el(root, "[data-find-btn]");
  const skeleton = el(root, "[data-skeleton]");
  const found = el(root, "[data-found]");
  const bars = all(root, "[data-result-bar]");
  const refresh = el(root, "[data-refresh]");
  const status = el(root, "[data-status]");
  const dot = el(root, "[data-status-dot]");

  const clearFields = () => {
    name.textContent = "";
    company.textContent = "";
    focusRing.forEach((token) => {
      nameBox.classList.remove(token);
      companyBox.classList.remove(token);
    });
    companyCaret.classList.add("invisible");
    nameCaret.classList.remove("invisible");
  };

  tl.set(found, { autoAlpha: 0, y: 10 }, 0)
    .set(skeleton, { autoAlpha: 0 }, 0)
    .set(bulk, { autoAlpha: 0, y: 14 }, 0)
    .set(bars, { scaleX: 0 }, 0)
    .set(findBtn, { opacity: 0.45 }, 0)
    .set(namePh, { autoAlpha: 1 }, 0)
    .set(companyPh, { autoAlpha: 1 }, 0)
    .set(form, { autoAlpha: 1, y: 0 }, 0)
    .call(clearFields, [], 0);

  const typeEnd = Math.max(T.typeName, T.companyDelay + T.typeCompany);

  tl.addLabel("type", `+=${T.idle}`);
  tl.call(() => {
    focusRing.forEach((token) => nameBox.classList.add(token));
  }, [], "type");
  tl.set(namePh, { autoAlpha: 0 }, "type");
  typeText(tl, name, COPY.name, T.typeName, "type");

  tl.addLabel("company", `type+=${T.companyDelay}`);
  tl.call(() => {
    focusRing.forEach((token) => {
      nameBox.classList.remove(token);
      companyBox.classList.add(token);
    });
    nameCaret.classList.add("invisible");
    companyCaret.classList.remove("invisible");
  }, [], "company");
  tl.set(companyPh, { autoAlpha: 0 }, "company");
  typeText(tl, company, COPY.company, T.typeCompany, "company");

  tl.addLabel("ready", `type+=${typeEnd + 0.08}`);
  tl.call(() => {
    focusRing.forEach((token) => companyBox.classList.remove(token));
    companyCaret.classList.add("invisible");
  }, [], "ready");
  tl.to(findBtn, { opacity: 1, duration: 0.2 }, "ready");

  tl.addLabel("search", "ready+=0.28");
  press(tl, findBtn, "search");
  ripple(tl, el(root, '[data-ripple="find"]'), "search");
  setStatus(tl, status, dot, COPY.finding, "busy", "search+=0.1");
  tl.set(skeleton, { autoAlpha: 1 }, "search+=0.15");

  tl.addLabel("found", `search+=${T.finding}`);
  setStatus(tl, status, dot, COPY.found, "ok", "found");
  tl.to(skeleton, { autoAlpha: 0, duration: 0.15 }, "found");
  tl.to(found, { autoAlpha: 1, y: 0, duration: 0.4 }, "found+=0.08");

  tl.addLabel("bulk", `+=${T.holdFound}`);
  setStatus(tl, status, dot, COPY.bulk, "ok", "bulk");
  tl.set(bulk, { y: 14 }, "bulk");
  tl.to(bulk, { autoAlpha: 1, y: 0, duration: 0.4 }, "bulk");
  tl.to(form, { autoAlpha: 0, duration: 0.28 }, "bulk");
  tl.to(refresh, { rotation: 360, duration: 0.55 }, "bulk");
  tl.to(
    bars,
    { scaleX: 1, duration: 0.65, stagger: 0.14, ease: "power2.out" },
    "bulk+=0.15",
  );

  tl.addLabel("reset", `+=${T.holdBulk}`);
  tl.to(bulk, { autoAlpha: 0, duration: 0.32 }, "reset");
  tl.set(form, { autoAlpha: 1, y: 0 }, "reset");
  tl.set(found, { autoAlpha: 0, y: 10 }, "reset");
  tl.set(skeleton, { autoAlpha: 0 }, "reset");
  tl.set(bars, { scaleX: 0 }, "reset");
  tl.set(findBtn, { opacity: 0.45 }, "reset");
  tl.set(namePh, { autoAlpha: 1 }, "reset");
  tl.set(companyPh, { autoAlpha: 1 }, "reset");
  tl.set(refresh, { rotation: 0 }, "reset");
  tl.call(clearFields, [], "reset");
  setStatus(tl, status, dot, COPY.idle, "idle", "reset+=0.08");
}

export function FindEmailsDemo({ className }: { className?: string }) {
  const scope = usePillarDemo(build);

  return (
    <DemoShell scopeRef={scope} className={className}>
      <div data-scene="form" data-reduced-hide className={sceneClass}>
        <DemoHeader title="Find Email">
          <Segmented
            items={[{ label: "Find Email", active: true }, { label: "Bulk Find" }]}
          />
        </DemoHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          <Segmented
            tone="ink"
            className="self-start"
            items={[
              { label: "Name and company", active: true },
              { label: "LinkedIn" },
            ]}
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div
              data-name-box
              className="relative flex h-10 min-w-0 flex-1 items-center rounded-lg border border-line bg-surface px-3 text-sm"
            >
              <span
                data-name-ph
                className="pointer-events-none absolute left-3 text-ink-muted"
              >
                {COPY.namePh}
              </span>
              <span data-name className="truncate text-ink" />
              <Caret id="name" />
            </div>
            <AtSign className="mx-auto hidden h-4 w-4 shrink-0 text-ink-muted sm:block" />
            <div
              data-company-box
              className="relative flex h-10 min-w-0 flex-1 items-center rounded-lg border border-line bg-surface px-3 text-sm"
            >
              <span
                data-company-ph
                className="pointer-events-none absolute left-3 text-ink-muted"
              >
                {COPY.companyPh}
              </span>
              <span data-company className="truncate text-ink" />
              <Caret id="company" className="invisible" />
            </div>
            <span
              data-find-btn
              data-hit
              className="relative inline-flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground"
            >
              <Ripple id="find" />
              Find email
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-muted">
            <span>Include enriched details · 5 credits</span>
            <span>Free if no email is found</span>
          </div>

          <div className="relative min-h-0 flex-1">
            <div data-skeleton className="invisible space-y-2 pt-1">
              <div className="h-3 w-1/3 animate-pulse rounded bg-line motion-reduce:animate-none" />
              <div className="h-14 animate-pulse rounded-xl bg-surface-muted motion-reduce:animate-none" />
            </div>
            <div
              data-found
              className="invisible absolute inset-x-0 top-0 rounded-xl border border-success/25 bg-success-soft p-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                Example
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{COPY.name}</p>
              <p className="text-xs text-ink-muted">{COPY.company}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                s•••••@microsoft.com
              </p>
              <div className="mt-2">
                <StatusChip
                  label="Safe to send"
                  variant="success"
                  className="px-2 py-0.5 text-[10px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        data-scene="bulk"
        data-reduced-show
        className={cn(sceneClass, "invisible")}
      >
        <DemoHeader title="Bulk Find">
          <Segmented
            items={[{ label: "Find Email" }, { label: "Bulk Find", active: true }]}
          />
        </DemoHeader>
        <div className="flex flex-1 flex-col justify-center p-4">
          <div className="overflow-hidden rounded-xl border border-line">
            <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-muted/50 px-3 py-2.5">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                <FolderOpen className="h-4 w-4 text-primary" />
                Bulk Find Email Tasks
              </p>
              <span
                data-hit
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink"
              >
                <RefreshCw data-refresh className="h-3 w-3" />
                Refresh
              </span>
            </div>
            <div className="grid gap-3 px-3 py-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:items-center">
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 truncate text-sm font-medium text-ink">
                  <FolderOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
                  names-and-domains.csv
                </p>
                <p className="mt-1 text-[10px] text-ink-muted">
                  Oct 21, 2026, 04:13 PM
                </p>
              </div>
              <div className="min-w-0">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink">
                  <Mail className="h-3.5 w-3.5 text-ink-muted" />
                  6 of 9 found
                </p>
                <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full bg-line">
                  <span
                    data-result-bar
                    className="h-full origin-left bg-success motion-safe:scale-x-0"
                    style={{ width: "67%" }}
                  />
                  <span
                    data-result-bar
                    className="h-full origin-left bg-warning motion-safe:scale-x-0"
                    style={{ width: "33%" }}
                  />
                </div>
                <p className="mt-1.5 flex flex-wrap gap-x-2 text-[10px] text-ink-muted">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    67% Safe to send
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                    33% Risky
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-line px-3 py-2.5">
              <StatusChip
                label="Completed"
                variant="success"
                className="px-2 py-0.5 text-[10px]"
              />
              <span className="inline-flex items-center gap-2">
                <span
                  data-hit
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-[10px] font-semibold text-primary-foreground"
                >
                  <Download className="h-3 w-3" />
                  Download
                </span>
                <MoreHorizontal className="h-4 w-4 text-ink-muted" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <DemoStatus initial={COPY.idle} settled={COPY.bulk} />
    </DemoShell>
  );
}

export const FindEmailsMockup = FindEmailsDemo;
