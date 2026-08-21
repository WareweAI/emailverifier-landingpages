"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { StatusChip, type StatusVariant } from "@/Components/ui/StatusChip";
import { API_DOCS_PATH, REGISTER_URL } from "@/lib/api-snippet";
import { cn } from "@/lib/utils";

const SCORE_MARKS = [0, 40, 70, 100] as const;

function clampScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  const normalized = score > 0 && score <= 1 ? score * 100 : score;
  return Math.min(100, Math.max(0, Math.round(normalized)));
}

type ToolResultPanelProps = {
  email: string;
  statusLabel: string;
  variant: StatusVariant;
  score: number;
  catchAll?: boolean;
  disposable?: boolean;
  roleBased?: boolean;
};

export function ToolResultPanel({
  email,
  statusLabel,
  variant,
  score,
  catchAll = false,
  disposable = false,
  roleBased = false,
}: ToolResultPanelProps) {
  const scope = useRef<HTMLDivElement>(null);
  const value = clampScore(score);

  const rows = [
    { label: "Status", value: statusLabel, emphasize: true },
    { label: "Score", value: String(value) },
    { label: "Catch-all", value: catchAll ? "Yes" : "No" },
    { label: "Disposable", value: disposable ? "Yes" : "No" },
    { label: "Role-based", value: roleBased ? "Yes" : "No" },
  ];

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-result-row]", root);
        gsap.from(items, {
          autoAlpha: 0,
          y: 8,
          duration: 0.28,
          stagger: 0.06,
          ease: "power2.out",
        });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [email, statusLabel, score, catchAll, disposable, roleBased] }
  );

  return (
    <div
      ref={scope}
      className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-ink-muted">Email</p>
          <p className="mt-1 truncate font-semibold text-ink">{email}</p>
        </div>
        <StatusChip label={statusLabel} variant={variant} />
      </div>

      <div className="mt-5">
        <div className="relative h-2">
          <div className="flex h-2 overflow-hidden rounded-full">
            <div className="w-2/5 bg-linear-to-r from-danger to-danger-soft" />
            <div className="w-[30%] bg-warning-soft" />
            <div className="w-[30%] bg-success" />
          </div>
          <span
            className="absolute top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
            style={{ left: `${value}%` }}
            aria-hidden
          />
        </div>
        <div className="mt-1 flex justify-between text-xs tabular-nums text-ink-muted">
          {SCORE_MARKS.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      </div>

      <dl className="mt-5 divide-y divide-line border-t border-line">
        {rows.map((row) => (
          <div
            key={row.label}
            data-result-row
            className="flex items-center justify-between gap-4 py-3"
          >
            <dt className="text-sm text-ink-muted">{row.label}</dt>
            <dd
              className={cn(
                "text-sm font-semibold text-ink tabular-nums",
                row.emphasize && "uppercase tracking-wide"
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-sm text-ink-muted" data-result-row>
        <Link
          href={REGISTER_URL}
          className="font-medium text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          data-ev-event="cta_register_click"
        >
          Clean a full list — 100 free
        </Link>
        {" · "}
        <Link href="/pricing" className="font-medium text-primary hover:underline">
          See pricing
        </Link>
        {" · "}
        <Link
          href={API_DOCS_PATH}
          className="font-medium text-primary hover:underline"
          data-ev-event="api_docs_click"
        >
          View API Docs
        </Link>
      </p>
    </div>
  );
}
