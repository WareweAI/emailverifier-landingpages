"use client";

import { StatusChip } from "@/Components/ui/StatusChip";
import {
  DemoShell,
  DemoStatus,
  Ripple,
  all,
  el,
  press,
  ripple,
  sceneClass,
  setStatus,
  usePillarDemo,
  type DemoTimeline,
} from "@/Components/home/feature-pillars/demos/demo-kit";
import { cn } from "@/lib/utils";
import {
  Download,
  FolderOpen,
  Mail,
  RefreshCw,
  ShieldCheck,
  Upload,
} from "lucide-react";
import Image from "next/image";

const STEPS = [
  "Import or Upload contacts",
  "Emailverifier.io Run multi-layer verification",
  "Resolve catch-all further",
  "Segment spamtrap, role & disposable accounts",
  "One-click clean export",
] as const;

const COPY = {
  import: "Drop a CSV to verify",
  verifying: "Running multi-layer verification…",
  catchall: "Resolving catch-all domains…",
  segment: "Segmenting risk flags…",
  export: "List complete · 43% safe",
} as const;

const T = {
  holdImport: 1.5,
  verifying: 1.6,
  holdVerify: 1.1,
  holdCatchall: 1.4,
  holdSegment: 1.5,
  holdExport: 1.8,
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

function WorkflowSceneHeader({
  step,
  title,
}: {
  step: number;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
      <p className="min-w-0 truncate text-sm font-semibold text-ink">{title}</p>
      <ol
        className="flex shrink-0 items-center"
        aria-label={`Step ${step} of ${STEPS.length}`}
      >
        {STEPS.map((_, index) => {
          const n = index + 1;
          const active = n === step;
          return (
            <li key={n} className="flex items-center">
              <span
                aria-current={active ? "step" : undefined}
                className={cn(
                  "grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold tabular-nums text-primary-foreground",
                  active ? "bg-primary" : "bg-primary/30"
                )}
              >
                {n}
              </span>
              {index < STEPS.length - 1 ? (
                <span className="h-px w-2 bg-primary/30" aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function setActiveStep(root: HTMLDivElement, index: number) {
  root.querySelectorAll<HTMLElement>("[data-workflow-step]").forEach((node) => {
    const step = Number(node.dataset.workflowStep);
    const active = step === index;
    const done = step < index;
    node.dataset.state = active ? "active" : done ? "done" : "idle";
    if (active) node.setAttribute("aria-current", "step");
    else node.removeAttribute("aria-current");
  });
}

function build(tl: DemoTimeline, root: HTMLDivElement) {
  const importScene = el(root, '[data-scene="import"]');
  const verifyScene = el(root, '[data-scene="verify"]');
  const catchallScene = el(root, '[data-scene="catchall"]');
  const segmentScene = el(root, '[data-scene="segment"]');
  const exportScene = el(root, '[data-scene="export"]');
  const file = el(root, "[data-file]");
  const drop = el(root, "[data-dropzone]");
  const uploadBtn = el(root, "[data-upload-btn]");
  const progress = el(root, "[data-progress]");
  const progressBar = el(root, "[data-progress-bar]");
  const verifyBar = el(root, "[data-verify-bar]");
  const verifyChecks = all(root, "[data-verify-check]");
  const catchallScore = el(root, "[data-catchall-score]");
  const segmentRows = all(root, "[data-segment-row]");
  const resultBars = all(root, "[data-result-bar]");
  const status = el(root, "[data-status]");
  const dot = el(root, "[data-status-dot]");
  const uploadRipple = el(root, '[data-ripple="upload"]');

  const scenes = [
    importScene,
    verifyScene,
    catchallScene,
    segmentScene,
    exportScene,
  ];

  tl.set(scenes, { autoAlpha: 0, y: 12 }, 0)
    .set(importScene, { autoAlpha: 1, y: 0 }, 0)
    .set(file, { xPercent: -50, yPercent: -50, y: -16, autoAlpha: 0 }, 0)
    .set(progress, { autoAlpha: 0 }, 0)
    .set(progressBar, { scaleX: 0 }, 0)
    .set(verifyBar, { scaleX: 0 }, 0)
    .set(verifyChecks, { autoAlpha: 0, x: -6 }, 0)
    .set(catchallScore, { textContent: "0" }, 0)
    .set(segmentRows, { autoAlpha: 0, y: 8 }, 0)
    .set(resultBars, { scaleX: 0 }, 0)
    .call(() => setActiveStep(root, 0), [], 0)
    .call(() => {
      status.textContent = COPY.import;
      dot.dataset.tone = "";
    }, [], 0);

  // 1 — Import / upload
  tl.addLabel("import", 0.2);
  press(tl, uploadBtn, "import");
  ripple(tl, uploadRipple, "<");
  tl.to(
    file,
    { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
    "-=0.05"
  )
    .to(drop, { borderColor: "var(--color-primary)", duration: 0.2 }, "<")
    .to(progress, { autoAlpha: 1, duration: 0.2 }, "-=0.05")
    .to(progressBar, { scaleX: 1, duration: 0.7, ease: "power1.inOut" })
    .to({}, { duration: T.holdImport });

  // 2 — Multi-layer verification
  tl.addLabel("verify")
    .call(() => setActiveStep(root, 1))
    .to(importScene, { autoAlpha: 0, y: -10, duration: 0.28 }, "verify")
    .fromTo(
      verifyScene,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35 },
      "-=0.12"
    );
  setStatus(tl, status, dot, COPY.verifying, "busy", "<");
  tl.to(verifyBar, { scaleX: 1, duration: T.verifying, ease: "power1.inOut" });
  verifyChecks.forEach((check, i) => {
    tl.to(
      check,
      { autoAlpha: 1, x: 0, duration: 0.28 },
      `-=${T.verifying - i * 0.28}`
    );
  });
  tl.to({}, { duration: T.holdVerify });

  // 3 — Catch-all
  tl.addLabel("catchall")
    .call(() => setActiveStep(root, 2))
    .to(verifyScene, { autoAlpha: 0, y: -10, duration: 0.28 }, "catchall")
    .fromTo(
      catchallScene,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35 },
      "-=0.12"
    );
  setStatus(tl, status, dot, COPY.catchall, "warn", "<");
  const scoreProxy = { n: 0 };
  tl.to(scoreProxy, {
    n: 62,
    duration: 0.7,
    ease: "power1.out",
    onUpdate: () => {
      catchallScore.textContent = String(Math.round(scoreProxy.n));
    },
  }).to({}, { duration: T.holdCatchall });

  // 4 — Segment
  tl.addLabel("segment")
    .call(() => setActiveStep(root, 3))
    .to(catchallScene, { autoAlpha: 0, y: -10, duration: 0.28 }, "segment")
    .fromTo(
      segmentScene,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35 },
      "-=0.12"
    );
  setStatus(tl, status, dot, COPY.segment, "busy", "<");
  tl.to(segmentRows, {
    autoAlpha: 1,
    y: 0,
    duration: 0.3,
    stagger: 0.12,
  }).to({}, { duration: T.holdSegment });

  // 5 — Export
  tl.addLabel("export")
    .call(() => setActiveStep(root, 4))
    .to(segmentScene, { autoAlpha: 0, y: -10, duration: 0.28 }, "export")
    .fromTo(
      exportScene,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35 },
      "-=0.12"
    );
  setStatus(tl, status, dot, COPY.export, "ok", "<");
  tl.to(resultBars, {
    scaleX: 1,
    duration: 0.55,
    stagger: 0.08,
    ease: "power2.out",
  }).to({}, { duration: T.holdExport });
}

export default function MethodWorkflowDemo() {
  const scope = usePillarDemo(build);

  return (
    <div ref={scope} className="min-w-0">
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        How our email verification tool works
      </h3>

      <DemoShell className="mt-6">
        {/* 1 Import */}
        <div data-scene="import" data-reduced-hide className={cn(sceneClass)}>
          <WorkflowSceneHeader step={1} title={STEPS[0]} />
          <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
            <div
              data-dropzone
              className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-dashed border-line bg-surface-muted/60 px-4 py-4 text-center transition-colors duration-300"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Upload className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-ink">
                Drop a CSV of emails
              </p>
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
              <div
                data-progress
                className="invisible absolute inset-x-5 bottom-3"
              >
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
            </div>
          </div>
        </div>

        {/* 2 Verify */}
        <div
          data-scene="verify"
          data-reduced-hide
          className={cn(sceneClass, "invisible")}
        >
          <WorkflowSceneHeader step={2} title={STEPS[1]} />
          <div className="flex flex-1 flex-col justify-center gap-4 p-4">
            <div className="rounded-xl border border-line bg-surface px-4 py-4">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                <FolderOpen className="h-4 w-4 text-primary" />
                outreach-list.csv
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                <span
                  data-verify-bar
                  className="block h-full origin-left scale-x-0 bg-primary"
                />
              </div>
              <ul className="mt-4 space-y-2">
                {[
                  "Syntax & format",
                  "Domain & MX records",
                  "Mailbox SMTP probe",
                  "Disposable & role scan",
                ].map((label) => (
                  <li
                    key={label}
                    data-verify-check
                    className="flex items-center gap-2 rounded-lg bg-surface-muted px-3 py-2 text-xs font-medium text-ink"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-success-soft text-success">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3 Catch-all */}
        <div
          data-scene="catchall"
          data-reduced-hide
          className={cn(sceneClass, "invisible")}
        >
          <WorkflowSceneHeader step={3} title={STEPS[2]} />
          <div className="flex flex-1 flex-col justify-center p-4">
            <div className="rounded-xl border border-line bg-surface px-4 py-5">
              <p className="text-sm font-semibold text-ink">support@agency.io</p>
              <p className="mt-1 text-xs text-ink-muted">
                Catch-all domain detected
              </p>
              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-ink-muted uppercase">
                    Confidence
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold tabular-nums text-ink">
                    <span data-catchall-score>0</span>
                  </p>
                </div>
                <StatusChip
                  label="Risky · catch-all"
                  variant="warning"
                  className="px-2 py-0.5 text-[10px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Segment */}
        <div
          data-scene="segment"
          data-reduced-hide
          className={cn(sceneClass, "invisible")}
        >
          <WorkflowSceneHeader step={4} title={STEPS[3]} />
          <div className="flex flex-1 flex-col justify-center gap-3 p-4">
            <div className="flex flex-wrap gap-1.5">
              <StatusChip
                label="Spam trap"
                variant="danger"
                className="px-2 py-0.5 text-[10px]"
              />
              <StatusChip
                label="Role-based"
                variant="warning"
                className="px-2 py-0.5 text-[10px]"
              />
              <StatusChip
                label="Disposable"
                variant="warning"
                className="px-2 py-0.5 text-[10px]"
              />
              <StatusChip
                label="Deliverable"
                variant="success"
                className="px-2 py-0.5 text-[10px]"
              />
            </div>
            <ul className="space-y-2">
              {(
                [
                  ["info@brand.com", "Role", "warning"],
                  ["temp@guerrillamail.com", "Disposable", "warning"],
                  ["maya@acme.io", "Safe", "success"],
                ] as const
              ).map(([email, label, variant]) => (
                <li
                  key={email}
                  data-segment-row
                  className="flex items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3 py-2.5"
                >
                  <span className="truncate text-xs font-medium text-ink">
                    {email}
                  </span>
                  <StatusChip
                    label={label}
                    variant={variant}
                    showIcon={false}
                    className="px-2 py-0.5 text-[10px]"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5 Export */}
        <div
          data-scene="export"
          data-reduced-show
          className={cn(sceneClass, "invisible")}
        >
          <WorkflowSceneHeader step={5} title={STEPS[4]} />
          <div className="flex flex-1 flex-col justify-center p-4">
            <div className="overflow-hidden rounded-xl border border-line">
              <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-muted/50 px-3 py-2.5">
                <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <FolderOpen className="h-4 w-4 text-primary" />
                  Bulk Verify Tasks
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
                  <RefreshCw className="h-3 w-3" />
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
                  <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-[10px] font-semibold text-primary-foreground">
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

        <DemoStatus initial={COPY.import} settled={COPY.export} />
      </DemoShell>
    </div>
  );
}
