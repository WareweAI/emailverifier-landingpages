"use client";

import VerifierDemo from "@/Components/VerifierDemo";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TOOL_LINK_CLASS =
  "inline-flex min-h-11 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-full px-2 py-2 text-center text-xs font-medium leading-tight text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-3 sm:text-sm";

function pushEvent(event: string, detail?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...detail });
  }
}

export default function HeroToolTabs() {
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="flex w-full rounded-full border border-line bg-surface-muted p-1 shadow-[var(--shadow-card)]"
        aria-label="Email tools"
      >
        <span
          className={cn(
            "inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-2 py-2 text-center text-xs leading-tight sm:px-3 sm:text-sm",
            "bg-ink font-semibold text-primary-foreground shadow-[var(--shadow-card)]"
          )}
          aria-current="page"
        >
          Verify Email
        </span>
        <Link
          href="/find-emails"
          className={TOOL_LINK_CLASS}
          data-ev-event="hero_tool_link"
          data-ev-loc="hero-find-emails"
          onClick={() =>
            pushEvent("hero_tool_link", { tool: "find-emails", loc: "hero" })
          }
        >
          Find Emails
        </Link>
        <Link
          href="/find-leads"
          className={TOOL_LINK_CLASS}
          data-ev-event="hero_tool_link"
          data-ev-loc="hero-find-leads"
          onClick={() =>
            pushEvent("hero_tool_link", { tool: "find-leads", loc: "hero" })
          }
        >
          Find Leads
        </Link>
      </div>

      <div className="mt-4 w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] ring-1 ring-line/60 sm:mt-5">
        <p className="bg-ink px-4 py-2.5 text-center text-sm leading-snug text-primary-foreground">
          Verify Single Email Address or List instantly with EmailVerifier.io
        </p>
        <div className="p-4 sm:p-5 md:p-6">
          <VerifierDemo variant="hero" location="hero" />
        </div>
      </div>
    </div>
  );
}
