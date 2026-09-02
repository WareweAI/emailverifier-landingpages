"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  LayoutDashboard,
  MailCheck,
  Search,
  Shield,
  XCircle,
} from "lucide-react";
import LogoMark from "@/Components/ui/LogoMark";
import { StatusChip } from "@/Components/ui/StatusChip";
import { SectionShell } from "@/Components/ui/SectionShell";
import { Button } from "@/Components/ui/Button";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const DEMO_EMAIL = "jacob.schmidt@gmail.com";
const SCORE = 95;
const SCORE_MARKS = [0, 40, 70, 100] as const;

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Verify Emails", icon: MailCheck, active: true },
  { label: "Find Emails", icon: Search },
] as const;

const VERIFY_STEPS = [
  "Initializing verification...",
  "Checking domain reputation...",
  "Analyzing mailbox existence...",
  "Detecting catch-all behavior...",
  "Evaluating deliverability risk...",
  "Running final validation...",
  "Finalizing result...",
] as const;

const PROGRESS_MARKS = [10, 22, 36, 48, 61, 74, 88, 100] as const;

type Phase = "idle" | "running" | "result";

function pointIn(container: HTMLElement, el: HTMLElement) {
  const c = container.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return {
    x: r.left + r.width / 2 - c.left,
    y: r.top + r.height / 2 - c.top,
  };
}

function AttrValue({
  value,
  tone = "default",
}: {
  value: string;
  tone?: "default" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold",
        tone === "default" && "text-ink",
        tone === "success" && "text-success",
        tone === "warning" && "text-warning",
        tone === "danger" && "text-danger"
      )}
    >
      {tone === "success" && (
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
      )}
      {tone === "danger" && (
        <XCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
      )}
      {value}
    </span>
  );
}

function ResultPanel() {
  return (
    <div
      data-demo-result
      className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            aria-hidden
          >
            J
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">{DEMO_EMAIL}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <StatusChip label="Deliverable" variant="success" />
              <StatusChip
                label="Mailbox verified"
                variant="neutral"
                showIcon={false}
                className="uppercase tracking-wide"
              />
            </div>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-3xl font-semibold tabular-nums leading-none text-ink">
            {SCORE}
          </p>
          <p className="mt-1 text-sm text-ink-muted">Score</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative h-2">
          <div className="flex h-2 overflow-hidden rounded-full">
            <div className="w-2/5 bg-linear-to-r from-danger to-danger-soft" />
            <div className="w-[30%] bg-warning-soft" />
            <div className="w-[30%] bg-success" />
          </div>
          <span
            className="absolute top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
            style={{ left: `${SCORE}%` }}
            aria-hidden
          />
        </div>
        <div className="mt-1 flex justify-between text-xs tabular-nums text-ink-muted">
          {SCORE_MARKS.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface-muted/60 p-4">
          <h4 className="text-sm font-semibold text-ink">General</h4>
          <dl className="mt-3 space-y-2.5 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-ink-muted">State</dt>
              <dd>
                <AttrValue value="Deliverable" tone="success" />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-ink-muted">Reason</dt>
              <dd className="font-semibold uppercase tracking-wide text-ink">
                Mailbox verified
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-ink-muted">Domain</dt>
              <dd className="font-semibold text-ink">gmail.com</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-ink-muted">Username</dt>
              <dd className="font-semibold text-ink">jacob.schmidt</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-line bg-surface-muted/60 p-4">
          <h4 className="text-sm font-semibold text-ink">Attributes</h4>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-ink-muted">Free</dt>
              <dd>
                <AttrValue value="Yes" tone="warning" />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-ink-muted">Role</dt>
              <dd className="font-semibold text-ink">No</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-ink-muted">Disposable</dt>
              <dd className="font-semibold text-ink">No</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-ink-muted">Accept-All</dt>
              <dd className="font-semibold text-ink">No</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-ink-muted">Tag</dt>
              <dd className="font-semibold text-ink">No</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-ink-muted">No Reply</dt>
              <dd className="font-semibold text-ink">No</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-surface-muted/60 p-4">
        <h4 className="text-sm font-semibold text-ink">Mail Server</h4>
        <dl className="mt-3 grid gap-2.5 text-sm sm:grid-cols-2">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-ink-muted">SMTP Provider</dt>
            <dd className="font-semibold text-ink">Google</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-ink-muted">SPF</dt>
            <dd className="font-semibold text-success">Yes</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-ink-muted">DMARC</dt>
            <dd className="font-semibold text-success">Yes</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-ink-muted">DKIM</dt>
            <dd className="font-semibold text-ink">No</dd>
          </div>
          <div className="flex items-center justify-between gap-3 sm:col-span-2">
            <dt className="shrink-0 text-ink-muted">MX Record</dt>
            <dd className="truncate text-right text-ink">
              gmail-smtp-in.l.google.com
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 sm:col-span-2">
            <dt className="text-ink-muted">MX Accepts Mail</dt>
            <dd className="font-semibold text-ink">Yes</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function HandCursor({ className }: { className?: string }) {
  return (
    <div
      data-demo-cursor
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-30 will-change-transform",
        className
      )}
      aria-hidden
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-[var(--shadow-card)]"
      >
        <path
          d="M5.5 3.21V19.5c0 .55.45 1 1 1h.09c.28 0 .55-.12.74-.33l3.4-3.79 2.02 5.07c.2.5.74.75 1.23.55l1.9-.76c.5-.2.75-.74.55-1.23L13.5 15.5h4.79c.83 0 1.25-1.01.66-1.6L6.66 2.55A1 1 0 0 0 5.5 3.21Z"
          fill="var(--color-surface)"
          stroke="var(--color-ink)"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function DashboardVerifyDemo({
  variant = "section",
}: {
  variant?: "section" | "embedded";
}) {
  const embedded = variant === "embedded";
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const buildDemoRef = useRef<(() => gsap.core.Timeline | void) | null>(null);
  const loopActiveRef = useRef(false);
  const loopDelayRef = useRef<gsap.core.Tween | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [emailValue, setEmailValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [showProgress, setShowProgress] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const root = scope.current;
      if (!stage || !root) return;

      const cursor = stage.querySelector<HTMLElement>("[data-demo-cursor]");
      const ripple = stage.querySelector<HTMLElement>("[data-demo-ripple]");
      const input = stage.querySelector<HTMLElement>("[data-demo-input]");
      const button = stage.querySelector<HTMLElement>("[data-demo-verify]");

      if (!cursor || !ripple || !input || !button) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setEmailValue(DEMO_EMAIL);
        setProgress(100);
        setActiveStep(VERIFY_STEPS.length - 1);
        setShowProgress(false);
        setShowResult(true);
        setPhase("result");
        setInputFocused(true);
        setIsVerifying(false);
        gsap.set(cursor, { autoAlpha: 0 });
        gsap.set(ripple, { autoAlpha: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cursor, { autoAlpha: 0, x: 40, y: 120, scale: 1 });
        gsap.set(ripple, {
          autoAlpha: 0,
          scale: 0.2,
          xPercent: -50,
          yPercent: -50,
        });

        const playClick = (target: HTMLElement) => {
          const pos = pointIn(stage, target);
          const clickTl = gsap.timeline();
          clickTl.set(ripple, { left: pos.x, top: pos.y });
          clickTl.to(cursor, { scale: 0.88, duration: 0.08, ease: "power1.in" });
          clickTl.fromTo(
            ripple,
            { scale: 0.25, autoAlpha: 0.5 },
            { scale: 2.4, autoAlpha: 0, duration: 0.38, ease: "power2.out" },
            "<"
          );
          clickTl.to(
            cursor,
            { scale: 1, duration: 0.12, ease: "power1.out" },
            "<0.06"
          );
          return clickTl;
        };

        const buildTimeline = () => {
          timelineRef.current?.kill();

          setPhase("running");
          setEmailValue("");
          setProgress(0);
          setActiveStep(-1);
          setShowProgress(false);
          setShowResult(false);
          setInputFocused(false);
          setButtonPressed(false);
          setIsVerifying(false);

          const mainPane = stage.querySelector<HTMLElement>("[data-demo-main]");
          if (mainPane) mainPane.scrollTop = 0;

          const inputPos = pointIn(stage, input);
          const buttonPos = pointIn(stage, button);
          const proxy = { pct: 0 };

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => {
              setPhase("result");
              setIsVerifying(false);
              gsap.to(cursor, { autoAlpha: 0, duration: 0.25 });
              if (embedded && loopActiveRef.current) {
                loopDelayRef.current?.kill();
                loopDelayRef.current = gsap.delayedCall(2, () => {
                  if (loopActiveRef.current) {
                    buildTimeline();
                  }
                });
              }
            },
          });
          timelineRef.current = tl;

          tl.to({}, { duration: 0.45 });
          tl.set(cursor, { x: inputPos.x - 80, y: inputPos.y + 60, scale: 1 });
          tl.to(cursor, { autoAlpha: 1, duration: 0.2 });
          tl.to(cursor, {
            x: inputPos.x + 8,
            y: inputPos.y + 4,
            duration: 0.7,
            ease: "power2.inOut",
          });
          tl.add(playClick(input));
          tl.add(() => {
            setInputFocused(true);
          });

          for (let i = 1; i <= DEMO_EMAIL.length; i += 1) {
            const ch = DEMO_EMAIL[i - 1];
            const pause =
              ch === "@" || ch === "."
                ? 0.14
                : gsap.utils.random(0.035, 0.075);
            tl.add(() => setEmailValue(DEMO_EMAIL.slice(0, i)));
            tl.to({}, { duration: pause });
          }

          tl.to({}, { duration: 0.28 });
          tl.to(cursor, {
            x: buttonPos.x + 6,
            y: buttonPos.y + 4,
            duration: 0.65,
            ease: "power2.inOut",
          });
          tl.add(() => setButtonPressed(true));
          tl.add(playClick(button));
          tl.add(() => {
            setButtonPressed(false);
            setIsVerifying(true);
          });

          // Progress only after Verify click finishes
          tl.to({}, { duration: 0.15 });
          tl.add(() => {
            setShowProgress(true);
          });
          // Wait for React commit before animating the mounted progress card
          tl.add(() => {
            gsap.delayedCall(0, () => {
              const progressCard = stage.querySelector<HTMLElement>(
                "[data-demo-progress]"
              );
              const bar = stage.querySelector<HTMLElement>("[data-demo-bar]");
              if (progressCard) {
                gsap.fromTo(
                  progressCard,
                  { autoAlpha: 0, y: 10 },
                  { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }
                );
              }
              if (bar) {
                gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
              }
            });
          });

          tl.to(cursor, { autoAlpha: 0, duration: 0.2 }, "<");

          PROGRESS_MARKS.forEach((mark, i) => {
            const stepIndex = Math.min(i, VERIFY_STEPS.length - 1);
            tl.to(proxy, {
              pct: mark,
              duration: 0.3,
              ease: "power1.inOut",
              onStart: () => setActiveStep(stepIndex),
              onUpdate: () => {
                const value = Math.round(proxy.pct);
                setProgress(value);
                const percentEl = stage.querySelector<HTMLElement>(
                  "[data-demo-percent]"
                );
                if (percentEl) percentEl.textContent = `${value}%`;
                const bar = stage.querySelector<HTMLElement>("[data-demo-bar]");
                if (bar) gsap.set(bar, { scaleX: value / 100 });
              },
            });
          });

          tl.to({}, { duration: 0.2 });
          tl.add(() => {
            const progressCard = stage.querySelector<HTMLElement>(
              "[data-demo-progress]"
            );
            if (progressCard) {
              gsap.to(progressCard, {
                autoAlpha: 0,
                y: -6,
                duration: 0.2,
                ease: "power1.in",
                onComplete: () => setShowProgress(false),
              });
            } else {
              setShowProgress(false);
            }
          });

          tl.add(() => {
            setShowResult(true);
            setIsVerifying(false);
            gsap.delayedCall(0, () => {
              const resultCard = stage.querySelector<HTMLElement>(
                "[data-demo-result]"
              );
              const main = stage.querySelector<HTMLElement>("[data-demo-main]");
              if (resultCard) {
                gsap.fromTo(
                  resultCard,
                  { autoAlpha: 0, y: 14 },
                  { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
              }
              if (main && resultCard) {
                requestAnimationFrame(() => {
                  const top =
                    resultCard.getBoundingClientRect().top -
                    main.getBoundingClientRect().top +
                    main.scrollTop -
                    12;
                  gsap.to(main, {
                    scrollTop: Math.max(0, top),
                    duration: 0.65,
                    ease: "power2.inOut",
                  });
                });
              }
            });
          }, "+=0.08");

          return tl;
        };

        buildDemoRef.current = buildTimeline;

        const startDemo = () => {
          if (embedded && !loopActiveRef.current) return;
          gsap.delayedCall(0, () => buildTimeline());
        };

        const stopDemo = () => {
          loopDelayRef.current?.kill();
          loopDelayRef.current = null;
          timelineRef.current?.kill();
          timelineRef.current = null;
        };

        if (embedded) {
          const hero = document.getElementById("hero");
          if (!hero) return;

          const observer = new IntersectionObserver(
            ([entry]) => {
              const visible = entry?.isIntersecting ?? false;
              loopActiveRef.current = visible;
              if (visible) {
                if (!timelineRef.current?.isActive()) {
                  startDemo();
                }
              } else {
                stopDemo();
              }
            },
            { threshold: 0.15 }
          );

          observer.observe(hero);

          return () => {
            observer.disconnect();
            loopActiveRef.current = false;
            stopDemo();
            buildDemoRef.current = null;
          };
        }

        ScrollTrigger.create({
          trigger: root,
          start: "top 72%",
          once: true,
          onEnter: startDemo,
        });

        return () => {
          stopDemo();
          buildDemoRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope, dependencies: [embedded] }
  );

  const buttonLabel = isVerifying ? "Verifying..." : "Verify Email";

  const demoStage = (
    <div
      ref={scope}
      className={cn(embedded ? "w-full" : "mx-auto max-w-5xl", !embedded && "mt-10")}
    >
        <div
          ref={stageRef}
          className="relative h-[34rem] overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] md:h-[40rem]"
        >
          <span
            data-demo-ripple
            className="pointer-events-none absolute top-0 left-0 z-20 h-6 w-6 rounded-full bg-primary/35"
            aria-hidden
          />
          <HandCursor />

          <div className="flex h-full">
            {!embedded ? (
              <aside className="hidden w-52 shrink-0 flex-col border-r border-line bg-surface p-4 lg:flex">
                <div className="flex items-center gap-2 px-1">
                  <LogoMark />
                  <span className="text-sm font-semibold text-ink">
                    Email Verifier
                  </span>
                </div>
                <nav className="mt-6 space-y-1" aria-label="Demo dashboard">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const active = "active" in item && item.active;
                    return (
                      <span
                        key={item.label}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                          active
                            ? "bg-primary-soft font-medium text-primary"
                            : "text-ink-muted"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden />
                        {item.label}
                      </span>
                    );
                  })}
                </nav>
              </aside>
            ) : null}

            <div className="flex min-w-0 flex-1 flex-col">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
                <p className="text-sm text-ink-muted">
                  Available Credits:{" "}
                  <span className="font-semibold tabular-nums text-ink">
                    100
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    tabIndex={-1}
                  >
                    Buy Credits
                  </Button>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-deep text-xs font-semibold text-primary-foreground"
                    aria-hidden
                  >
                    JS
                  </span>
                </div>
              </header>

              <div
                data-demo-main
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-background p-4 sm:p-5 lg:p-6"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    Email Verification
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    Verify single emails or upload bulk lists for processing.
                  </p>
                </div>

                <div
                  className="mt-4 inline-flex rounded-lg border border-line bg-surface p-1"
                  role="tablist"
                  aria-label="Verification mode"
                >
                  <span
                    role="tab"
                    aria-selected
                    className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                  >
                    Single Email
                  </span>
                  <span
                    role="tab"
                    aria-selected={false}
                    className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-muted"
                  >
                    Bulk Upload
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5">
                    <h4 className="font-semibold text-ink">
                      Single Email Verification
                    </h4>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <label className="sr-only" htmlFor="demo-email-input">
                        Email address
                      </label>
                      <input
                        id="demo-email-input"
                        data-demo-input
                        type="email"
                        readOnly
                        tabIndex={-1}
                        value={emailValue}
                        placeholder="Enter email address..."
                        className={cn(
                          "h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-muted",
                          inputFocused && "border-primary"
                        )}
                        aria-readonly="true"
                      />
                      <Button
                        type="button"
                        size="md"
                        data-demo-verify
                        tabIndex={-1}
                        disabled={isVerifying}
                        onClick={() => {
                          if (embedded || phase !== "result") return;
                          if (timelineRef.current?.isActive()) return;
                          buildDemoRef.current?.();
                        }}
                        className={cn(
                          buttonPressed && "scale-[0.97]",
                          "transition-transform duration-100"
                        )}
                      >
                        {buttonLabel}
                      </Button>
                    </div>
                  </div>

                  {showProgress ? (
                    <div
                      data-demo-progress
                      className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5"
                      role="status"
                      aria-live="polite"
                      aria-label="Verification in progress"
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" aria-hidden />
                        <p className="text-sm font-semibold text-ink">
                          Verification in progress
                        </p>
                        <span
                          data-demo-percent
                          className="ml-auto text-sm font-semibold tabular-nums text-primary"
                        >
                          {progress}%
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
                        <div
                          data-demo-bar
                          className="h-full w-full origin-left scale-x-0 rounded-full bg-primary"
                        />
                      </div>
                      <ol className="mt-4 space-y-2">
                        {VERIFY_STEPS.map((step, i) => {
                          const done = i <= activeStep;
                          return (
                            <li
                              key={step}
                              className={cn(
                                "flex items-center gap-2 text-sm transition-colors duration-200",
                                done ? "text-ink" : "text-ink-muted/50"
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                                  done ? "bg-primary" : "bg-line"
                                )}
                                aria-hidden
                              >
                                {done && (
                                  <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                                )}
                              </span>
                              {step}
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  ) : null}

                  {showResult ? <ResultPanel /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <p className="text-center text-xs text-ink-muted sm:text-sm">
            {embedded
              ? "Get 100 free verifications - no setup, no credit card, no stress."
              : "Example email verifier flow."}
          </p>
          {!embedded ? (
            <button
              type="button"
              data-demo-replay
              disabled={phase === "running"}
              onClick={() => {
                if (timelineRef.current?.isActive()) return;
                buildDemoRef.current?.();
              }}
              className={cn(
                "text-xs font-semibold text-primary hover:text-primary-hover disabled:pointer-events-none cursor-pointer disabled:opacity-40",
                phase !== "result" && "invisible"
              )}
            >
              Play again
            </button>
          ) : null}
        </div>
      </div>
  );

  if (embedded) {
    return demoStage;
  }

  return (
    <SectionShell
      className="bg-linear-to-t from-primary-soft via-primary-soft via-55% to-surface"
      ariaLabelledBy="dashboard-demo-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="dashboard-demo-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          See the email verifier in action
        </h2>
        <p className="mt-3 text-ink-muted">
          Watch a single-check flow play automatically.
        </p>
      </div>

      {demoStage}
    </SectionShell>
  );
}
