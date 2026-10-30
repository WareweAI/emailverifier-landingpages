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
import { Download, FolderOpen, Mail, RefreshCw, Upload } from "lucide-react";
import Image from "next/image";

/**
 * Verify Emails — looping product demo.
 *
 * Flow: drop a CSV → verifying bar → bulk task result → single-address check → reset.
 * Edit COPY for labels and T for pacing (seconds). Colors are semantic tokens.
 */

const COPY = {
  idle: "Drop a CSV to verify",
  verifying: "Verifying 7 emails…",
  bulkDone: "List complete · 43% safe",
  singleReady: "Or check one address",
  singleEmail: "satyanadella@microsoft.com",
  singlePlaceholder: "name@company.com",
  checking: "Verifying…",
  singleDone: "Valid · safe to send",
} as const;

/** Seconds. Idle → drop → verify → result → single check → reset. */
const T = {
  idle: 0.65,
  fileIn: 0.48,
  verifying: 1.45,
  holdResults: 1.55,
  typeEmail: 1.7,
  holdSingle: 1.65,
} as const;

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

const focusRing = ["border-primary", "ring-2", "ring-primary"] as const;

function build(tl: DemoTimeline, root: HTMLDivElement) {
  const upload = el(root, '[data-scene="upload"]');
  const results = el(root, '[data-scene="results"]');
  const single = el(root, '[data-scene="single"]');
  const file = el(root, "[data-file]");
  const drop = el(root, "[data-dropzone]");
  const uploadBtn = el(root, "[data-upload-btn]");
  const progress = el(root, "[data-progress]");
  const progressBar = el(root, "[data-progress-bar]");
  const bars = all(root, "[data-result-bar]");
  const email = el(root, "[data-single-email]");
  const placeholder = el(root, "[data-single-ph]");
  const singleBox = el(root, "[data-single-box]");
  const singleBtn = el(root, "[data-single-btn]");
  const singleResult = el(root, "[data-single-result]");
  const refresh = el(root, "[data-refresh]");
  const status = el(root, "[data-status]");
  const dot = el(root, "[data-status-dot]");

  const clearSingle = () => {
    email.textContent = "";
    focusRing.forEach((name) => {
      drop.classList.remove(name);
      singleBox.classList.remove(name);
    });
    drop.classList.remove("border-primary");
  };

  tl.set(file, { xPercent: -50, yPercent: -50, y: -16, autoAlpha: 0 }, 0)
    .set(progress, { autoAlpha: 0 }, 0)
    .set(progressBar, { scaleX: 0 }, 0)
    .set(results, { autoAlpha: 0, y: 14 }, 0)
    .set(single, { autoAlpha: 0, y: 14 }, 0)
    .set(singleResult, { autoAlpha: 0, y: 10 }, 0)
    .set(bars, { scaleX: 0 }, 0)
    .set(placeholder, { autoAlpha: 1 }, 0)
    .set(upload, { autoAlpha: 1, y: 0 }, 0)
    .call(clearSingle, [], 0);

  tl.addLabel("drop", `+=${T.idle}`);
  tl.to(
    file,
    { y: 0, autoAlpha: 1, duration: T.fileIn, ease: "back.out(1.6)" },
    "drop",
  );
  tl.call(() => drop.classList.add("border-primary"), [], "drop+=0.15");

  tl.addLabel("press", `drop+=${T.fileIn}`);
  press(tl, uploadBtn, "press");
  ripple(tl, el(root, '[data-ripple="upload"]'), "press");

  tl.addLabel("verify", "press+=0.22");
  setStatus(tl, status, dot, COPY.verifying, "busy", "verify");
  tl.set(progress, { autoAlpha: 1 }, "verify");
  tl.to(
    progressBar,
    { scaleX: 1, duration: T.verifying, ease: "power1.inOut" },
    "verify",
  );

  tl.addLabel("results", `verify+=${T.verifying}`);
  setStatus(tl, status, dot, COPY.bulkDone, "ok", "results");
  tl.to(results, { autoAlpha: 1, y: 0, duration: 0.42 }, "results");
  tl.to(upload, { autoAlpha: 0, y: -8, duration: 0.3 }, "results");
  tl.to(refresh, { rotation: 360, duration: 0.55, ease: "power1.inOut" }, "results");
  tl.to(
    bars,
    { scaleX: 1, duration: 0.6, stagger: 0.12, ease: "power2.out" },
    "results+=0.12",
  );

  tl.addLabel("single", `+=${T.holdResults}`);
  setStatus(tl, status, dot, COPY.singleReady, "idle", "single");
  tl.set(single, { y: 14 }, "single");
  tl.to(single, { autoAlpha: 1, y: 0, duration: 0.4 }, "single");
  tl.to(results, { autoAlpha: 0, duration: 0.28 }, "single");

  tl.addLabel("type", "single+=0.28");
  tl.set(placeholder, { autoAlpha: 0 }, "type");
  tl.call(() => {
    focusRing.forEach((name) => singleBox.classList.add(name));
  }, [], "type");
  typeText(tl, email, COPY.singleEmail, T.typeEmail, "type");

  tl.addLabel("check", `type+=${T.typeEmail + 0.12}`);
  press(tl, singleBtn, "check");
  ripple(tl, el(root, '[data-ripple="single"]'), "check");
  setStatus(tl, status, dot, COPY.checking, "busy", "check+=0.12");

  tl.addLabel("singleDone", "check+=0.85");
  tl.call(() => {
    focusRing.forEach((name) => singleBox.classList.remove(name));
  }, [], "singleDone");
  setStatus(tl, status, dot, COPY.singleDone, "ok", "singleDone");
  tl.to(singleResult, { autoAlpha: 1, y: 0, duration: 0.4 }, "singleDone");

  tl.addLabel("reset", `+=${T.holdSingle}`);
  tl.to(single, { autoAlpha: 0, duration: 0.35 }, "reset");
  tl.set(upload, { autoAlpha: 1, y: 0 }, "reset");
  tl.set(results, { autoAlpha: 0, y: 14 }, "reset");
  tl.set(file, { autoAlpha: 0, y: -16 }, "reset");
  tl.set(progress, { autoAlpha: 0 }, "reset");
  tl.set(progressBar, { scaleX: 0 }, "reset");
  tl.set(bars, { scaleX: 0 }, "reset");
  tl.set(singleResult, { autoAlpha: 0, y: 10 }, "reset");
  tl.set(refresh, { rotation: 0 }, "reset");
  tl.set(placeholder, { autoAlpha: 1 }, "reset");
  tl.call(clearSingle, [], "reset");
  setStatus(tl, status, dot, COPY.idle, "idle", "reset+=0.08");
}

export function VerifyEmailsDemo({ className }: { className?: string }) {
  const scope = usePillarDemo(build);

  return (
    <DemoShell scopeRef={scope} className={className}>
      <div data-scene="upload" data-reduced-hide className={sceneClass}>
        <DemoHeader title="Bulk Verify">
          <Segmented
            items={[
              { label: "Bulk Verify", active: true },
              { label: "Single Email" },
            ]}
          />
        </DemoHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          <div
            data-dropzone
            className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-dashed border-line bg-surface-muted/60 px-4 py-4 text-center transition-colors duration-300"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <Upload className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold text-ink">Drop a CSV of emails</p>
            <p className="text-xs text-ink-muted">
              CSV, XLS, or XLSX · 1 credit each
            </p>
            <span
              data-upload-btn
              data-hit
              className="relative mt-1 inline-flex h-9 items-center overflow-hidden rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground"
            >
              <Ripple id="upload" />
              Upload list
            </span>
            <div
              data-file
              className="invisible absolute top-1/2 left-1/2 flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 shadow-[var(--shadow-card)]"
            >
              <FolderOpen className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-left">
                <span className="block text-xs font-semibold text-ink">
                  outreach-list.csv
                </span>
                <span className="block text-[10px] text-ink-muted">
                  7 emails · CSV
                </span>
              </span>
            </div>
            <div data-progress className="invisible absolute inset-x-5 bottom-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-line">
                <span
                  data-progress-bar
                  className="block h-full origin-left scale-x-0 bg-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-ink-muted">Import from</p>
            <ul className="mt-2 grid grid-cols-4 gap-1.5">
              {IMPORT_SOURCES.map((source) => (
                <li
                  key={source.id}
                  data-hit
                  className="relative flex flex-col items-center gap-1 rounded-xl border border-line bg-surface-muted/70 px-1 py-2 text-center"
                >
                  {"soon" in source && source.soon ? (
                    <span className="absolute top-1 right-1 rounded-full bg-line px-1 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-ink-muted">
                      Soon
                    </span>
                  ) : null}
                  <Image
                    src={source.src}
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                    className="h-6 w-6 object-contain"
                  />
                  <span className="text-[9px] font-medium leading-tight text-ink">
                    {source.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
              <Download className="h-3.5 w-3.5" />
              Template
            </p>
          </div>
        </div>
      </div>

      <div
        data-scene="results"
        data-reduced-show
        className={cn(sceneClass, "invisible")}
      >
        <DemoHeader title="Bulk Verify">
          <Segmented
            items={[
              { label: "Bulk Verify", active: true },
              { label: "Single Email" },
            ]}
          />
        </DemoHeader>
        <div className="flex flex-1 flex-col justify-center p-4">
          <div className="overflow-hidden rounded-xl border border-line">
            <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-muted/50 px-3 py-2.5">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                <FolderOpen className="h-4 w-4 text-primary" />
                Bulk Verify Tasks
              </p>
              <span
                data-hit
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink"
              >
                <RefreshCw data-refresh className="h-3 w-3" />
                Refresh
              </span>
            </div>
            <div className="grid gap-3 px-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 truncate text-sm font-medium text-ink">
                  <FolderOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
                  outreach-list.csv
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-ink">
                  <Mail className="h-3.5 w-3.5 text-ink-muted" />
                  7 emails
                </p>
                <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full bg-line">
                  <span
                    data-result-bar
                    className="h-full origin-left bg-success motion-safe:scale-x-0"
                    style={{ width: "43%" }}
                  />
                  <span
                    data-result-bar
                    className="h-full origin-left bg-danger motion-safe:scale-x-0"
                    style={{ width: "57%" }}
                  />
                </div>
                <p className="mt-1.5 flex flex-wrap gap-x-2 text-[10px] text-ink-muted">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    43% Safe
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                    57% Invalid
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip
                  label="Completed"
                  variant="success"
                  className="px-2 py-0.5 text-[10px]"
                />
                <span
                  data-hit
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-[10px] font-semibold text-primary-foreground"
                >
                  <Download className="h-3 w-3" />
                  Download
                </span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-ink-muted">
            Oct 19, 2026, 01:42 PM
          </p>
        </div>
      </div>

      <div
        data-scene="single"
        data-reduced-hide
        className={cn(sceneClass, "invisible")}
      >
        <DemoHeader title="Single Email">
          <Segmented
            items={[
              { label: "Bulk Verify" },
              { label: "Single Email", active: true },
            ]}
          />
        </DemoHeader>
        <div className="flex flex-1 flex-col justify-center gap-3 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div
              data-single-box
              className="relative flex h-11 min-w-0 flex-1 items-center rounded-lg border border-line bg-surface px-3 text-sm"
            >
              <span
                data-single-ph
                className="pointer-events-none absolute left-3 text-ink-muted"
              >
                {COPY.singlePlaceholder}
              </span>
              <span data-single-email className="min-w-0 truncate text-ink" />
              <Caret id="single" />
            </div>
            <span
              data-single-btn
              data-hit
              className="relative inline-flex h-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground"
            >
              <Ripple id="single" />
              Verify
            </span>
          </div>
          <div
            data-single-result
            className="invisible rounded-xl border border-success/30 bg-success-soft p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              Example
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-ink">
              {COPY.singleEmail}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <StatusChip
                label="Valid"
                variant="success"
                className="px-2 py-0.5 text-[10px]"
              />
              <StatusChip
                label="Not disposable"
                variant="neutral"
                showIcon={false}
                className="px-2 py-0.5 text-[10px]"
              />
              <StatusChip
                label="Not a role"
                variant="neutral"
                showIcon={false}
                className="px-2 py-0.5 text-[10px]"
              />
            </div>
          </div>
        </div>
      </div>

      <DemoStatus initial={COPY.idle} settled={COPY.bulkDone} />
    </DemoShell>
  );
}

export const VerifyEmailsMockup = VerifyEmailsDemo;
