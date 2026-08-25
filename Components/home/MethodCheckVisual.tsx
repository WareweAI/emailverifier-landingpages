"use client";

import { useRef } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Globe,
  Inbox,
  Loader2,
  Server,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { StatusChip } from "@/Components/ui/StatusChip";

export type MethodCheckId =
  | "syntax"
  | "mx"
  | "mailbox"
  | "disposable"
  | "role-spam"
  | "risk";

const RING_R = 16;
const RING_C = 2 * Math.PI * RING_R;

function MockFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full min-h-44 overflow-hidden rounded-xl border border-line bg-surface-muted p-4",
        className
      )}
    >
      {children}
    </div>
  );
}

function SyntaxMock() {
  return (
    <MockFrame>
      <div
        data-syntax-field
        className="flex h-11 items-center rounded-lg border border-line bg-surface px-3 text-sm text-ink shadow-[var(--shadow-card)]"
      >
        <span data-syntax-text>name@comp</span>
        <span
          data-syntax-caret
          className="ml-px inline-block h-4 w-px bg-primary"
        />
      </div>
      <div className="relative mt-3 h-6">
        <div
          data-syntax-ok
          className="absolute inset-0 flex items-center gap-2 text-sm font-medium text-success"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
          Valid format
        </div>
        <div
          data-syntax-bad
          className="absolute inset-0 flex items-center gap-2 text-sm font-medium text-danger"
        >
          <XCircle className="h-4 w-4 shrink-0" aria-hidden />
          Invalid format
        </div>
      </div>
    </MockFrame>
  );
}

function MxMock() {
  return (
    <MockFrame className="relative">
      <p
        data-mx-domain
        className="text-center text-sm font-semibold text-ink"
      >
        company.com
      </p>
      <div
        data-mx-lookup
        className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-muted"
      >
        <Loader2 className="h-3.5 w-3.5 text-primary" data-mx-spin aria-hidden />
        Looking up…
      </div>
      <div
        data-mx-result
        className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl border border-line bg-surface p-3 shadow-[var(--shadow-card)]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-soft text-success">
          <Globe className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">MX found</p>
          <p data-mx-host className="text-xs text-ink-muted">
            mail.company.com
          </p>
        </div>
      </div>
    </MockFrame>
  );
}

function MailboxMock() {
  return (
    <MockFrame>
      <p data-smtp-email className="truncate text-sm font-medium text-ink">
        name@company.com
      </p>
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Inbox className="h-4 w-4" aria-hidden />
        </span>
        <div className="flex flex-1 items-center gap-1">
          <span data-smtp-dot className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span data-smtp-dot className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span data-smtp-dot className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-px flex-1 bg-line" />
        </div>
        <span
          data-smtp-server
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink-muted"
        >
          <Server className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <div
        data-smtp-result
        className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm font-medium text-success shadow-[var(--shadow-card)]"
      >
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        Inbox exists
      </div>
    </MockFrame>
  );
}

function DisposableMock() {
  return (
    <MockFrame>
      <p
        data-disp-email
        className="truncate text-sm font-medium text-ink"
      >
        temp123@mailinator.com
      </p>
      <div data-disp-badge className="mt-3">
        <StatusChip label="Disposable" variant="danger" />
      </div>
      <div
        data-disp-blocked
        className="mt-4 rounded-xl border border-danger/30 bg-danger-soft px-3 py-2 text-sm font-semibold text-danger"
      >
        Blocked
      </div>
    </MockFrame>
  );
}

function RoleMock() {
  const roles = ["info@", "admin@", "support@"];

  return (
    <MockFrame className="flex flex-col justify-center gap-2">
      {roles.map((role) => (
        <div
          key={role}
          data-role-row
          className="flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-1.5 shadow-[var(--shadow-card)]"
        >
          <span className="text-sm font-medium text-ink">{role}</span>
          <StatusChip label="Role" variant="warning" />
        </div>
      ))}
    </MockFrame>
  );
}

function RiskMock() {
  return (
    <MockFrame className="flex flex-col items-center justify-center">
      <p data-risk-email className="text-sm font-medium text-ink">
        name@company.com
      </p>
      <div className="relative mt-3 h-16 w-16">
        <svg className="h-16 w-16 -rotate-90" viewBox="0 0 40 40" aria-hidden>
          <circle
            cx="20"
            cy="20"
            r={RING_R}
            fill="none"
            className="stroke-line"
            strokeWidth="3"
          />
          <circle
            data-risk-ring
            cx="20"
            cy="20"
            r={RING_R}
            fill="none"
            stroke="var(--color-success)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C}
          />
        </svg>
      </div>
      <p
        data-risk-status
        className="mt-2 text-sm font-semibold text-success"
      >
        Deliverable
      </p>
    </MockFrame>
  );
}

function bindVisibility(tl: gsap.core.Timeline, trigger: Element) {
  ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onEnter: () => tl.play(),
    onEnterBack: () => tl.play(),
    onLeave: () => tl.pause(),
    onLeaveBack: () => tl.pause(),
  });
}

function buildSyntax(root: HTMLElement, trigger: Element) {
  const text = root.querySelector<HTMLElement>("[data-syntax-text]");
  const field = root.querySelector<HTMLElement>("[data-syntax-field]");
  const caret = root.querySelector<HTMLElement>("[data-syntax-caret]");
  const ok = root.querySelector<HTMLElement>("[data-syntax-ok]");
  const bad = root.querySelector<HTMLElement>("[data-syntax-bad]");
  if (!text || !field || !caret || !ok || !bad) return;

  const valid = "name@company.com";
  const invalid = "name@@company..com";
  const typed = { n: 8 };

  gsap.set([ok, bad], { autoAlpha: 0, y: 6 });
  gsap.set(caret, { autoAlpha: 1 });

  const blink = gsap.to(caret, {
    autoAlpha: 0,
    duration: 0.45,
    repeat: -1,
    yoyo: true,
    ease: "none",
    paused: true,
  });

  const tl = gsap.timeline({
    paused: true,
    repeat: -1,
    defaults: { ease: "power2.out" },
    onStart: () => blink.play(),
    onRepeat: () => {
      typed.n = 8;
      text.textContent = "name@comp";
      field.classList.remove("border-danger", "border-success");
      gsap.set(field, { x: 0 });
    },
  });

  tl.to(typed, {
    n: valid.length,
    duration: 1.35,
    ease: "none",
    onUpdate: () => {
      text.textContent = valid.slice(0, Math.round(typed.n));
    },
  })
    .to(ok, { autoAlpha: 1, y: 0, duration: 0.28 }, "+=0.12")
    .to(field, { borderColor: "var(--color-success)", duration: 0.2 }, "<")
    .to(ok, { autoAlpha: 0, y: -4, duration: 0.2 }, "+=0.55")
    .add(() => {
      text.textContent = invalid;
      field.classList.add("border-danger");
    })
    .fromTo(
      field,
      { x: 0 },
      { x: 5, duration: 0.06, yoyo: true, repeat: 7, ease: "none" }
    )
    .to(bad, { autoAlpha: 1, y: 0, duration: 0.28 }, "<")
    .to(bad, { autoAlpha: 0, duration: 0.25 }, "+=0.7")
    .add(() => {
      field.classList.remove("border-danger");
      text.textContent = "name@comp";
      typed.n = 8;
    });

  bindVisibility(tl, trigger);
  ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      if (self.isActive) blink.play();
      else blink.pause();
    },
  });
}

function buildMx(root: HTMLElement, trigger: Element) {
  const domain = root.querySelector<HTMLElement>("[data-mx-domain]");
  const lookup = root.querySelector<HTMLElement>("[data-mx-lookup]");
  const spin = root.querySelector<HTMLElement>("[data-mx-spin]");
  const result = root.querySelector<HTMLElement>("[data-mx-result]");
  const host = root.querySelector<HTMLElement>("[data-mx-host]");
  if (!domain || !lookup || !spin || !result || !host) return;

  const cycle = [
    { domain: "company.com", host: "mail.company.com" },
    { domain: "agency.io", host: "mx.agency.io" },
  ];
  let i = 0;

  gsap.set(result, { y: 16, autoAlpha: 0 });
  const spinTw = gsap.to(spin, {
    rotation: 360,
    transformOrigin: "50% 50%",
    duration: 0.9,
    ease: "none",
    repeat: -1,
    paused: true,
  });

  const tl = gsap.timeline({ paused: true, repeat: -1 });
  tl.add(() => {
    domain.textContent = cycle[i].domain;
    host.textContent = cycle[i].host;
    gsap.set(result, { y: 16, autoAlpha: 0, scale: 1 });
    gsap.set(lookup, { autoAlpha: 1 });
  })
    .to(domain, { autoAlpha: 1, duration: 0.3 })
    .to(lookup, { autoAlpha: 1, duration: 0.2 }, "<")
    .to({}, { duration: 0.85 })
    .to(lookup, { autoAlpha: 0, duration: 0.2 })
    .to(result, { y: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" })
    .to(result, { scale: 1.03, duration: 0.22, yoyo: true, repeat: 1 })
    .to({}, { duration: 0.7 })
    .to([result, domain], { autoAlpha: 0, duration: 0.25 })
    .add(() => {
      i = (i + 1) % cycle.length;
    });

  bindVisibility(tl, trigger);
  ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      if (self.isActive) spinTw.play();
      else spinTw.pause();
    },
  });
}

function buildMailbox(root: HTMLElement, trigger: Element) {
  const dots = gsap.utils.toArray<HTMLElement>("[data-smtp-dot]", root);
  const server = root.querySelector<HTMLElement>("[data-smtp-server]");
  const result = root.querySelector<HTMLElement>("[data-smtp-result]");
  if (!server || !result) return;

  gsap.set(result, { autoAlpha: 0, scale: 0.96, y: 8 });
  gsap.set(dots, { autoAlpha: 0.25 });

  const tl = gsap.timeline({ paused: true, repeat: -1 });
  tl.set(result, { autoAlpha: 0, scale: 0.96, y: 8 })
    .to(dots, {
      autoAlpha: 1,
      duration: 0.22,
      stagger: 0.14,
      ease: "power1.out",
    })
    .to(server, {
      backgroundColor: "var(--color-success-soft)",
      color: "var(--color-success)",
      duration: 0.25,
    })
    .to(result, { autoAlpha: 1, scale: 1, y: 0, duration: 0.35 }, "-=0.05")
    .to(result, { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1 })
    .to({}, { duration: 0.7 })
    .to(result, { autoAlpha: 0, duration: 0.25 })
    .to(server, {
      backgroundColor: "var(--color-surface)",
      color: "var(--color-ink-muted)",
      duration: 0.2,
    })
    .set(dots, { autoAlpha: 0.25 });

  bindVisibility(tl, trigger);
}

function buildDisposable(root: HTMLElement, trigger: Element) {
  const email = root.querySelector<HTMLElement>("[data-disp-email]");
  const badge = root.querySelector<HTMLElement>("[data-disp-badge]");
  const blocked = root.querySelector<HTMLElement>("[data-disp-blocked]");
  if (!email || !badge || !blocked) return;

  gsap.set(badge, { x: 12, autoAlpha: 0 });
  gsap.set(blocked, { autoAlpha: 0, y: 8 });

  const tl = gsap.timeline({ paused: true, repeat: -1 });
  tl.set(email, { opacity: 1, textDecoration: "none" })
    .set(badge, { x: 12, autoAlpha: 0 })
    .set(blocked, { autoAlpha: 0, y: 8 })
    .to(badge, { x: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" }, 0.35)
    .to(email, { opacity: 0.45, duration: 0.3 }, "+=0.15")
    .add(() => {
      email.style.textDecoration = "line-through";
    })
    .to(blocked, { autoAlpha: 1, y: 0, duration: 0.3 })
    .to({}, { duration: 0.8 })
    .to([badge, blocked], { autoAlpha: 0, duration: 0.25 })
    .add(() => {
      email.style.textDecoration = "none";
    })
    .to(email, { opacity: 1, duration: 0.2 });

  bindVisibility(tl, trigger);
}

function buildRole(root: HTMLElement, trigger: Element) {
  const rows = gsap.utils.toArray<HTMLElement>("[data-role-row]", root);
  if (rows.length === 0) return;

  gsap.set(rows, { autoAlpha: 0, y: 10 });

  const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.45 });
  tl.set(rows, { autoAlpha: 0, y: 10, scale: 1 })
    .to(rows, {
      autoAlpha: 1,
      y: 0,
      duration: 0.35,
      stagger: 0.18,
      ease: "power2.out",
    })
    .to(rows, {
      scale: 1.02,
      duration: 0.18,
      stagger: 0.12,
      yoyo: true,
      repeat: 1,
    })
    .to({}, { duration: 0.7 })
    .to(rows, { autoAlpha: 0, y: -6, duration: 0.28, stagger: 0.08 });

  bindVisibility(tl, trigger);
}

function buildRisk(root: HTMLElement, trigger: Element) {
  const ring = root.querySelector<SVGCircleElement>("[data-risk-ring]");
  const status = root.querySelector<HTMLElement>("[data-risk-status]");
  const email = root.querySelector<HTMLElement>("[data-risk-email]");
  if (!ring || !status || !email) return;

  const beats = [
    {
      email: "name@company.com",
      label: "Deliverable",
      color: "var(--color-success)",
      progress: 0.86,
    },
    {
      email: "catch@agency.io",
      label: "Risky",
      color: "var(--color-warning)",
      progress: 0.48,
    },
    {
      email: "gone@oldmail.net",
      label: "Undeliverable",
      color: "var(--color-danger)",
      progress: 0.18,
    },
  ];

  const tl = gsap.timeline({ paused: true, repeat: -1 });
  beats.forEach((beat) => {
    tl.add(() => {
      email.textContent = beat.email;
      status.textContent = beat.label;
      status.style.color = beat.color;
      ring.style.stroke = beat.color;
    })
      .fromTo(
        ring,
        { strokeDashoffset: RING_C },
        {
          strokeDashoffset: RING_C * (1 - beat.progress),
          duration: 0.9,
          ease: "power2.out",
        }
      )
      .fromTo(status, { autoAlpha: 0, y: 4 }, { autoAlpha: 1, y: 0, duration: 0.25 }, "<0.4")
      .to({}, { duration: 0.75 })
      .to(status, { autoAlpha: 0, duration: 0.2 });
  });

  bindVisibility(tl, trigger);
}

const MOCKS = {
  syntax: SyntaxMock,
  mx: MxMock,
  mailbox: MailboxMock,
  disposable: DisposableMock,
  "role-spam": RoleMock,
  risk: RiskMock,
} as const;

const BUILDERS = {
  syntax: buildSyntax,
  mx: buildMx,
  mailbox: buildMailbox,
  disposable: buildDisposable,
  "role-spam": buildRole,
  risk: buildRisk,
} as const;

type MethodCheckVisualProps = {
  checkId: MethodCheckId;
  className?: string;
};

export function MethodCheckVisual({
  checkId,
  className,
}: MethodCheckVisualProps) {
  const scope = useRef<HTMLDivElement>(null);
  const Mock = MOCKS[checkId];

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.closest("section") ?? root;
        BUILDERS[checkId](root, section);
      });

      return () => mm.revert();
    },
    { scope, dependencies: [checkId] }
  );

  return (
    <div ref={scope} className={cn("h-full min-h-0", className)} aria-hidden>
      <Mock />
    </div>
  );
}
