"use client";

import { useState } from "react";
import {
  Braces,
  CheckCircle2,
  Gauge,
  Globe,
  ShieldCheck,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  MethodCheckVisual,
  type MethodCheckId,
} from "@/Components/home/MethodCheckVisual";
import { StatusChip } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";

type CheckItem = {
  id: MethodCheckId;
  anchorId: string;
  label: string;
  title: string;
  desc: string;
  example: string;
  chip: { label: string; variant: "success" | "warning" | "danger" | "neutral" };
  icon: LucideIcon;
  iconClass: string;
};

const CHECKS: CheckItem[] = [
  {
    id: "syntax",
    anchorId: "syntax-check",
    label: "Syntax",
    title: "Advanced Syntax Validation",
    desc: "Instantly detects malformed and invalid email addresses.",
    example: "user@@company..com",
    chip: { label: "Invalid", variant: "danger" },
    icon: Braces,
    iconClass: "bg-unknown-soft text-unknown",
  },
  {
    id: "mx",
    anchorId: "mx-check",
    label: "MX",
    title: "Domain & MX Record Checks",
    desc: "Confirms the domain exists and is configured to receive email.",
    example: "mail.company.com",
    chip: { label: "MX found", variant: "success" },
    icon: Globe,
    iconClass: "bg-primary-soft text-primary",
  },
  {
    id: "mailbox",
    anchorId: "mailbox-check",
    label: "Mailbox",
    title: "Real-Time SMTP Verification",
    desc: "Verifies mailbox availability without sending an email.",
    example: "name@company.com",
    chip: { label: "Inbox exists", variant: "success" },
    icon: ShieldCheck,
    iconClass: "bg-success-soft text-success",
  },
  {
    id: "disposable",
    anchorId: "disposable-check",
    label: "Disposable",
    title: "Disposable Email Detection",
    desc: "Filters out temporary and throwaway inboxes.",
    example: "temp123@mailinator.com",
    chip: { label: "Disposable", variant: "danger" },
    icon: Trash2,
    iconClass: "bg-danger-soft text-danger",
  },
  {
    id: "role-spam",
    anchorId: "role-based-filtering",
    label: "Role",
    title: "Role-Based Email Detection",
    desc: "Identifies risky addresses like info@, admin@, and support@.",
    example: "info@agency.io",
    chip: { label: "Role", variant: "warning" },
    icon: Users,
    iconClass: "bg-warning-soft text-warning",
  },
  {
    id: "risk",
    anchorId: "risk-check",
    label: "Score",
    title: "Smart Risk Scoring",
    desc: "Classifies emails as Deliverable, Risky, Undeliverable, or Unknown.",
    example: "name@company.com · 95",
    chip: { label: "Deliverable", variant: "success" },
    icon: Gauge,
    iconClass: "bg-primary-soft text-primary",
  },
];

export default function MethodSolutionsPanel() {
  const [activeId, setActiveId] = useState<MethodCheckId>("syntax");
  const active =
    CHECKS.find((check) => check.id === activeId) ?? CHECKS[0];

  return (
    <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-5">
      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-sm font-semibold text-ink">Verification checks</p>
          <span className="text-xs text-ink-muted">6 methods</span>
        </div>

        <ul
          className="flex flex-1 flex-col p-2"
          role="listbox"
          aria-label="Email verification methods"
        >
          {CHECKS.map((check) => {
            const Icon = check.icon;
            const selected = check.id === activeId;

            return (
              <li key={check.id} id={check.anchorId} className="scroll-mt-28">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setActiveId(check.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                    selected
                      ? "bg-warning-soft shadow-[var(--shadow-card)]"
                      : "hover:bg-surface-muted"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      check.iconClass
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {check.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ink-muted">
                      {check.desc}
                    </span>
                  </span>

                  {selected ? (
                    <span className="flex shrink-0 items-center gap-1.5">
                      <StatusChip
                        label={check.chip.label}
                        variant={check.chip.variant}
                        showIcon={false}
                        className="hidden px-2 py-0.5 text-[10px] sm:inline-flex"
                      />
                      <CheckCircle2
                        className="h-4 w-4 text-success"
                        aria-hidden
                      />
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <article
        className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]"
        aria-labelledby={`method-active-${active.id}`}
      >
        <div className="border-b border-line bg-surface-muted px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {active.label}
              </p>
              <h3
                id={`method-active-${active.id}`}
                className="mt-1 font-semibold tracking-tight text-ink lg:text-lg"
              >
                {active.title}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{active.desc}</p>
            </div>
            <StatusChip label={active.chip.label} variant={active.chip.variant} />
          </div>
          <p className="mt-3 truncate font-mono text-xs text-ink-muted">
            Example: {active.example}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
          <MethodCheckVisual
            key={active.id}
            checkId={active.id}
            className="min-h-0 flex-1"
          />
        </div>
      </article>
    </div>
  );
}
