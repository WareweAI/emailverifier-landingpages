"use client";

import FindEmailsForm from "@/Components/home/FindEmailsForm";
import { Button } from "@/Components/ui/Button";
import VerifierDemo from "@/Components/VerifierDemo";
import { REGISTER_URL } from "@/lib/api-snippet";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useId, useState, type ReactNode } from "react";

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

type HeroToolTabsProps = {
  children?: ReactNode;
};

export default function HeroToolTabs({ children }: HeroToolTabsProps) {
  const [tab, setTab] = useState<ToolTab>("verify");
  const baseId = useId();
  const verifyPanelId = `${baseId}-verify`;
  const findPanelId = `${baseId}-find`;

  const selectTab = (next: ToolTab) => {
    setTab(next);
    pushEvent("hero_tool_tab", { tab: next });
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <div className="flex w-full rounded-full border border-line bg-surface-muted p-1 shadow-[var(--shadow-card)]">
        <div
          role="tablist"
          aria-label="Email tools"
          className="flex min-w-0 flex-[2]"
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
        <Link
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-ev-event="cta_register_click"
          data-ev-loc="hero-find-leads-tab"
          onClick={() =>
            pushEvent("hero_tool_tab", { tab: "find-leads", redirect: "register" })
          }
          className={cn(
            "inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-2 py-2 text-center text-xs leading-tight font-medium text-ink-muted sm:px-3 sm:text-sm",
            "transition-colors duration-200 hover:text-ink",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
        >
          Find Leads with AI
        </Link>
      </div>

      <div className="mt-6 w-full rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] ring-1 ring-line/60 sm:p-6 md:p-8">
        <div
          role="tabpanel"
          id={verifyPanelId}
          aria-labelledby={`${baseId}-tab-verify`}
          hidden={tab !== "verify"}
        >
          <p className="mb-3 text-center text-sm font-medium text-ink text-left">Enter an email address to check its deliverability</p>
          <VerifierDemo variant="hero" location="hero" />
        </div>
        <div
          role="tabpanel"
          id={findPanelId}
          aria-labelledby={`${baseId}-tab-find`}
          hidden={tab !== "find"}
        >
          <p className="mb-3 text-center text-sm font-medium text-ink text-left">
            Work email
          </p>
          <FindEmailsForm location="hero" />
        </div>
      </div>

      <Button
        size="lg"
        asChild
        className="mt-6 h-14 min-h-14 w-full rounded-full bg-cta px-8 text-base text-cta-foreground hover:bg-cta-hover active:bg-cta-hover"
      >
        <Link
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-ev-event="cta_register_click"
          data-ev-loc="hero-tool-cta"
        >
          Get 100 free credits
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </Button>
      <p className="mt-2 text-center text-sm text-ink-muted">
      No setup, No credit card, No stress.
      </p>
      {children}
    </div>
  );
}
