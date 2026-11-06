"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, Check, Minus, X } from "lucide-react";
import {
  formatUsd,
  type ComparisonCell as CellData,
} from "@/lib/competitor-comparison";
import { cn } from "@/lib/utils";

type ComparisonCellProps = {
  cell: CellData;
  footnoteLabels?: Record<string, string>;
  footnoteIndexById?: Record<string, string>;
  className?: string;
};

function Tip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const tipId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <span ref={rootRef} className="relative inline-flex align-middle">
      <button
        type="button"
        className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded px-1 text-[10px] font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-controls={tipId}
        onClick={() => setOpen((v) => !v)}
      >
        {children}
        <span className="sr-only">{label}</span>
      </button>
      {open ? (
        <span
          id={tipId}
          role="tooltip"
          className="absolute left-1/2 top-full z-30 mt-1 w-56 -translate-x-1/2 rounded-lg border border-line bg-surface p-2 text-left text-xs font-normal leading-snug text-ink shadow-[var(--shadow-card)]"
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}

export function ComparisonCellView({
  cell,
  footnoteLabels = {},
  footnoteIndexById = {},
  className,
}: ComparisonCellProps) {
  const low = cell.confidence === "low";
  const footnotes = cell.footnoteIds ?? [];

  let body: React.ReactNode;
  if (cell.kind === "yes") {
    body = (
      <span className="inline-flex items-center justify-center gap-1.5">
        <Check className="h-4 w-4 text-success" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">Included</span>
      </span>
    );
  } else if (cell.kind === "no") {
    body = (
      <span className="inline-flex items-center justify-center gap-1.5">
        <X className="h-4 w-4 text-danger" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">Not offered</span>
      </span>
    );
  } else if (cell.kind === "partial") {
    body = (
      <span className="inline-flex max-w-[12rem] flex-col items-center gap-1 text-center">
        <span className="inline-flex items-center gap-1">
          <AlertCircle className="h-4 w-4 text-warning" aria-hidden />
          <span className="sr-only">Partial</span>
        </span>
        <span className="text-xs leading-snug text-ink">{cell.value}</span>
      </span>
    );
  } else if (cell.kind === "unverified") {
    body = (
      <span className="inline-flex items-center gap-1 text-ink-muted">
        <Minus className="h-4 w-4" aria-hidden />
        <span className="sr-only">Not confirmed from public sources</span>
        <Tip label="Not confirmed from public sources">
          <span aria-hidden>~</span>
        </Tip>
      </span>
    );
  } else if (cell.kind === "price") {
    if (cell.value == null) {
      body = <span className="text-ink-muted">Not published</span>;
    } else {
      body = (
        <span className="inline-flex flex-col items-center gap-0.5">
          <span className={cn("font-semibold tabular-nums text-ink", low && "opacity-90")}>
            {low ? "~" : ""}
            {formatUsd(cell.value)}
          </span>
          {cell.note ? (
            <span className="text-xs text-ink-muted">{cell.note}</span>
          ) : null}
        </span>
      );
    }
  } else {
    body = (
      <span
        className={cn(
          "max-w-[14rem] text-sm leading-snug text-ink",
          low && "text-ink-muted"
        )}
      >
        {low ? `~ ${cell.value}` : cell.value}
        {cell.note ? (
          <span className="mt-0.5 block text-xs text-ink-muted">{cell.note}</span>
        ) : null}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex flex-col items-center gap-1", className)}>
      {body}
      {footnotes.length > 0 ? (
        <span className="inline-flex gap-0.5">
          {footnotes.map((id) => (
            <Tip key={id} label={footnoteLabels[id] ?? id}>
              <sup>{footnoteIndexById[id] ?? "*"}</sup>
            </Tip>
          ))}
        </span>
      ) : null}
    </span>
  );
}
