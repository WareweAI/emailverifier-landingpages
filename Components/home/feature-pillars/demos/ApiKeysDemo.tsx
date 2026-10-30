"use client";

import { StatusChip } from "@/Components/ui/StatusChip";
import {
  Caret,
  DemoHeader,
  DemoShell,
  DemoStatus,
  Ripple,
  all,
  countTo,
  el,
  press,
  ripple,
  sceneClass,
  setStatus,
  typeText,
  usePillarDemo,
  type DemoTimeline,
} from "@/Components/home/feature-pillars/demos/demo-kit";
import { Check, Copy, Plus } from "lucide-react";

/**
 * API — looping product demo.
 *
 * Flow: copy a key → type an address → Try it → request → response fields → reset.
 * Response fields match the live single-email verifier. Edit COPY and T (seconds).
 */

const COPY = {
  idle: "Key ready",
  copied: "Key copied",
  email: "user@example.com",
  emailPh: "Email to try",
  sending: "Verifying…",
  done: "200 · safe to send",
} as const;

/** Seconds. Copy → type → request → JSON → reset. */
const T = {
  idle: 0.45,
  type: 1.2,
  wait: 0.85,
  hold: 1.8,
} as const;

const focusRing = ["border-primary", "ring-2", "ring-primary"] as const;

function build(tl: DemoTimeline, root: HTMLDivElement) {
  const email = el(root, "[data-email]");
  const placeholder = el(root, "[data-email-ph]");
  const box = el(root, "[data-email-box]");
  const copyIcon = el(root, "[data-copy-icon]");
  const copiedIcon = el(root, "[data-copied-icon]");
  const lines = all(root, "[data-line]");
  const score = el(root, "[data-score]");
  const status = el(root, "[data-status]");
  const dot = el(root, "[data-status-dot]");

  const clearEmail = () => {
    email.textContent = "";
    focusRing.forEach((token) => box.classList.remove(token));
    score.textContent = "100";
  };

  tl.set(lines, { autoAlpha: 0, y: 6 }, 0)
    .set(copiedIcon, { autoAlpha: 0 }, 0)
    .set(copyIcon, { autoAlpha: 1 }, 0)
    .set(placeholder, { autoAlpha: 1 }, 0)
    .call(clearEmail, [], 0);

  tl.addLabel("copy", `+=${T.idle}`);
  press(tl, el(root, "[data-copy]"), "copy");
  tl.to(copyIcon, { autoAlpha: 0, duration: 0.12 }, "copy");
  tl.to(copiedIcon, { autoAlpha: 1, scale: 1, duration: 0.18 }, "copy+=0.08");
  setStatus(tl, status, dot, COPY.copied, "ok", "copy+=0.05");

  tl.addLabel("type", "copy+=0.7");
  tl.to(copiedIcon, { autoAlpha: 0, duration: 0.12 }, "type");
  tl.to(copyIcon, { autoAlpha: 1, duration: 0.12 }, "type");
  tl.set(placeholder, { autoAlpha: 0 }, "type");
  tl.call(() => {
    focusRing.forEach((token) => box.classList.add(token));
  }, [], "type");
  typeText(tl, email, COPY.email, T.type, "type");

  tl.addLabel("try", `type+=${T.type + 0.12}`);
  tl.call(() => {
    focusRing.forEach((token) => box.classList.remove(token));
  }, [], "try");
  press(tl, el(root, "[data-try]"), "try");
  ripple(tl, el(root, '[data-ripple="try"]'), "try");
  setStatus(tl, status, dot, COPY.sending, "busy", "try+=0.12");
  tl.call(() => {
    score.textContent = "0";
  }, [], "try+=0.12");

  tl.addLabel("json", `try+=${T.wait}`);
  setStatus(tl, status, dot, COPY.done, "ok", "json");
  tl.to(lines, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.07 }, "json");
  countTo(tl, score, 100, 0.7, "json+=0.25");

  tl.addLabel("reset", `+=${T.hold}`);
  tl.to(lines, { autoAlpha: 0, y: 4, duration: 0.25 }, "reset");
  tl.set(placeholder, { autoAlpha: 1 }, "reset");
  tl.call(clearEmail, [], "reset");
  setStatus(tl, status, dot, COPY.idle, "idle", "reset+=0.08");
}

export function ApiKeysDemo({ className }: { className?: string }) {
  const scope = usePillarDemo(build);

  return (
    <DemoShell scopeRef={scope} className={className}>
      <div className={sceneClass}>
        <DemoHeader title="API keys">
          <span
            data-hit
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            New key
          </span>
        </DemoHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                Sample API Key
                <StatusChip
                  label="Active"
                  variant="success"
                  showIcon={false}
                  className="px-2 py-0.5 text-[10px] uppercase tracking-wide"
                />
              </p>
              <p className="mt-0.5 truncate font-mono text-xs text-ink-muted">
                ev_9bd63••••••••••••
              </p>
            </div>
            <span
              data-copy
              data-hit
              className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-surface text-ink"
            >
              <Copy data-copy-icon className="h-3.5 w-3.5" />
              <Check
                data-copied-icon
                className="invisible absolute inset-0 m-auto h-3.5 w-3.5 text-success"
              />
            </span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div
              data-email-box
              className="relative flex h-10 min-w-0 flex-1 items-center rounded-lg border border-line bg-surface px-3 text-sm"
            >
              <span
                data-email-ph
                data-motion-only
                className="pointer-events-none absolute left-3 text-ink-muted"
              >
                {COPY.emailPh}
              </span>
              <span data-reduced-copy className="hidden text-ink">
                {COPY.email}
              </span>
              <span data-email data-motion-only className="text-ink" />
              <Caret id="email" />
            </div>
            <span
              data-try
              data-hit
              className="relative inline-flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground"
            >
              <Ripple id="try" />
              Try it
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden rounded-xl bg-ink p-2.5 font-mono text-[10px] leading-4 text-primary-foreground/85">
            <p>
              <span className="text-success">POST</span>
              <span className="text-primary-foreground/70"> /api/v1/verify</span>
            </p>
            <p className="mt-1.5 text-[10px] font-semibold tracking-wide text-primary-foreground/45">
              EXAMPLE RESPONSE
            </p>
            <div className="mt-1">
              <p data-line data-reduced-show className="invisible">
                {"{"}
              </p>
              <p data-line data-reduced-show className="invisible">
                {'  "email": "'}
                {COPY.email}
                {'",'}
              </p>
              <p data-line data-reduced-show className="invisible">
                {'  "result": '}
                <span className="text-success">&quot;safe&quot;</span>,
              </p>
              <p data-line data-reduced-show className="invisible">
                {'  "status": '}
                <span className="text-success">&quot;valid&quot;</span>,
              </p>
              <p data-line data-reduced-show className="invisible">
                {'  "score": '}
                <span data-score className="text-success">
                  100
                </span>
                ,
              </p>
              <p data-line data-reduced-show className="invisible">
                {'  "is_safe_to_send": '}
                <span className="text-success">true</span>
              </p>
              <p data-line data-reduced-show className="invisible">
                {"}"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <DemoStatus initial={COPY.idle} settled={COPY.done} />
    </DemoShell>
  );
}

export const ApiKeysMockup = ApiKeysDemo;
