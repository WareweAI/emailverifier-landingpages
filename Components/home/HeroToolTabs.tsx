"use client";

import FindEmailsForm from "@/Components/home/FindEmailsForm";
import VerifierDemo from "@/Components/VerifierDemo";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";

function pushEvent(event: string, detail?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...detail });
  }
}

type ToolTab = "verify" | "find";

const TABS: { id: ToolTab; label: string }[] = [
  { id: "verify", label: "Verify Email" },
  { id: "find", label: "Find Emails" },
];

export default function HeroToolTabs() {
  const [tab, setTab] = useState<ToolTab>("verify");
  const baseId = useId();
  const verifyPanelId = `${baseId}-verify`;
  const findPanelId = `${baseId}-find`;

  const selectTab = (next: ToolTab) => {
    setTab(next);
    pushEvent("hero_tool_tab", { tab: next });
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        role="tablist"
        aria-label="Email tools"
        className="flex w-full rounded-full border border-line bg-surface-muted p-1 shadow-[var(--shadow-card)]"
      >
        {TABS.map(({ id, label }) => {
          const selected = tab === id;
          const panelId = id === "verify" ? verifyPanelId : findPanelId;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${id}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
                  return;
                }
                event.preventDefault();
                const currentIndex = TABS.findIndex((item) => item.id === tab);
                const delta = event.key === "ArrowRight" ? 1 : -1;
                const next =
                  TABS[(currentIndex + delta + TABS.length) % TABS.length];
                selectTab(next.id);
                document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
              }}
              className={cn(
                "min-h-11 min-w-0 flex-1 cursor-pointer rounded-full px-2 py-2 text-center text-xs leading-tight transition-colors duration-200 sm:px-3 sm:text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                selected
                  ? "bg-surface font-semibold text-ink shadow-[var(--shadow-card)] ring-1 ring-line"
                  : "font-medium text-ink-muted hover:text-ink"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 w-full rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] ring-1 ring-line/60 sm:mt-5 sm:p-5 md:p-6">
        <div
          role="tabpanel"
          id={verifyPanelId}
          aria-labelledby={`${baseId}-tab-verify`}
          hidden={tab !== "verify"}
        >
          <VerifierDemo variant="hero" location="hero" />
        </div>
        <div
          role="tabpanel"
          id={findPanelId}
          aria-labelledby={`${baseId}-tab-find`}
          hidden={tab !== "find"}
        >
          <FindEmailsForm location="hero" />
        </div>
      </div>
    </div>
  );
}
