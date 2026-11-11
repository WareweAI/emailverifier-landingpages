"use client";

import { useRef, useState } from "react";
import {
  FileSpreadsheet,
  FileUp,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { HeroDemoSignupGate } from "@/Components/home/HeroDemoSignupGate";
import { cn } from "@/lib/utils";

const UPLOAD_ACCEPT =
  ".csv,.txt,.xlsx,.xls,text/csv,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const FORMAT_CHIPS = [
  { label: "CSV", icon: FileSpreadsheet },
  { label: "TXT", icon: FileSpreadsheet },
  { label: "Excel", icon: FileSpreadsheet },
] as const satisfies ReadonlyArray<{
  label: string;
  icon: LucideIcon;
}>;

function pushEvent(event: string, detail?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...detail });
  }
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function BulkUploadDemo() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showGate, setShowGate] = useState(false);
  const [dragging, setDragging] = useState(false);

  const openGate = (source: "choose" | "drop" | "drag") => {
    setShowGate(true);
    pushEvent("bulk_upload_demo_gate", { location: "bulk-hero", source });
  };

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    pushEvent("bulk_upload_demo_select", {
      location: "bulk-hero",
      fileName: file.name,
    });
    openGate("choose");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      pushEvent("bulk_upload_demo_select", {
        location: "bulk-hero",
        fileName: file.name,
        source: "drop",
      });
    }
    openGate("drop");
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className={cn(
          "flex flex-col items-center justify-center px-2 py-6 text-center sm:py-10",
          showGate && "pointer-events-none select-none opacity-70 blur-[5px]",
          dragging && !showGate && "rounded-xl bg-primary-soft/40 ring-2 ring-primary/30"
        )}
        aria-hidden={showGate || undefined}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <FileUp className="h-7 w-7" aria-hidden />
        </span>
        <p className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
          Drag and drop your list
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
          Drop a CSV, TXT, or Excel file to email verify every row — or choose a
          file from your computer.
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {FORMAT_CHIPS.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-muted px-3 py-1.5 text-xs font-medium text-ink"
              >
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                {item.label}
              </li>
            );
          })}
        </ul>

        <input
          ref={fileInputRef}
          type="file"
          accept={UPLOAD_ACCEPT}
          className="sr-only"
          tabIndex={-1}
          onChange={handleFileChange}
        />
        <Button
          type="button"
          size="lg"
          className="mt-6 min-h-11"
          onClick={handleChooseClick}
          data-ev-event="bulk_upload_choose_click"
          data-ev-loc="bulk-hero"
        >
          Choose file
        </Button>
      </div>

      {showGate ? (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/40 p-3 backdrop-blur-[1px] sm:p-4">
          <HeroDemoSignupGate
            title="Sign up to check results"
            description="Create a free account to unlock this result — 100 free credits, no card."
            location="bulk-hero-upload-gate"
            className="w-full max-w-md"
          />
        </div>
      ) : null}
    </div>
  );
}
