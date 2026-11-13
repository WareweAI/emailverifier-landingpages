"use client";

import { HeroDemoProgress } from "@/Components/home/HeroDemoProgress";
import { HeroDemoSignupGate } from "@/Components/home/HeroDemoSignupGate";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { StatusChip } from "@/Components/ui/StatusChip";
import { cn } from "@/lib/utils";
import { AtSign, Linkedin, Loader2, Search, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

const TOOL_LINK_CLASS =
  "inline-flex min-h-11 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-full px-2 py-2 text-center text-xs font-medium leading-tight text-ink-muted transition-colors duration-200 hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-3 sm:text-sm";

const DEMO_MS = 2800;

function pushEvent(event: string, detail?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...detail });
  }
}

function mockCandidates(fullName: string, company: string): string[] {
  const cleanedCompany = company.replace(/^@\s*/, "").trim().toLowerCase();
  const domain = cleanedCompany.includes(".")
    ? cleanedCompany.replace(/\s+/g, "")
    : `${cleanedCompany.replace(/[^a-z0-9]+/g, "") || "company"}.com`;
  const parts = fullName
    .trim()
    .toLowerCase()
    .replace(/\./g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0] ?? "name";
  const last = parts.length > 1 ? parts[parts.length - 1] : first;
  return Array.from(
    new Set([
      `${first}.${last}@${domain}`,
      `${first[0] ?? "n"}${last}@${domain}`,
    ])
  );
}

function linkedinHandle(url: string): string {
  const match = url.trim().match(/linkedin\.com\/in\/([^/?#]+)/i);
  const slug = (match?.[1] ?? "profile")
    .replace(/-/g, " ")
    .replace(/[^a-z0-9 ]/gi, "")
    .trim();
  return slug || "profile";
}

type FinderHeroPanelProps = {
  variant?: "hero" | "tool-page";
};

export default function FinderHeroPanel({
  variant = "hero",
}: FinderHeroPanelProps) {
  const isToolPage = variant === "tool-page";
  const nameId = useId();
  const companyId = useId();
  const linkedinId = useId();
  const timerRef = useRef<number | null>(null);
  const [fullName, setFullName] = useState("Alex Morgan");
  const [company, setCompany] = useState("acme.com");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [phase, setPhase] = useState<"idle" | "progress" | "gated">("idle");
  const [source, setSource] = useState<"person" | "linkedin">("person");

  const candidates = useMemo(() => {
    if (source === "linkedin" && linkedinUrl.trim()) {
      return mockCandidates(linkedinHandle(linkedinUrl), "company.com");
    }
    return mockCandidates(
      fullName.trim() || "Alex Morgan",
      company.trim() || "acme.com"
    );
  }, [company, fullName, linkedinUrl, source]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const loading = phase === "progress";
  const showPreview = phase === "idle" || phase === "gated";
  const showGate = phase === "gated";

  const resetPhase = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPhase("idle");
  };

  const runDemo = (nextSource: "person" | "linkedin") => {
    setSource(nextSource);
    setPhase("progress");
    pushEvent("hero_find_email_submit", {
      location: "email-finder",
      source: nextSource,
    });
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timerRef.current = window.setTimeout(
      () => {
        setPhase("gated");
        pushEvent("hero_find_email_demo_gate", { location: "email-finder" });
      },
      reduced ? 400 : DEMO_MS
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;
    const linkedinActive =
      typeof document !== "undefined" &&
      document.activeElement?.id === linkedinId;
    if (
      linkedinUrl.trim() &&
      (linkedinActive || !fullName.trim() || !company.trim())
    ) {
      runDemo("linkedin");
      return;
    }
    if (!fullName.trim() || !company.trim()) return;
    runDemo("person");
  };

  const form = (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <label htmlFor={nameId} className="sr-only">
            Full name
          </label>
          <User
            className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <Input
            id={nameId}
            type="text"
            autoComplete="name"
            placeholder="Full name"
            disabled={loading}
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
              resetPhase();
            }}
            className="pl-11"
          />
        </div>
        <div className="relative min-w-0 flex-1">
          <label htmlFor={companyId} className="sr-only">
            Company domain or name
          </label>
          <AtSign
            className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <Input
            id={companyId}
            type="text"
            autoComplete="organization"
            placeholder="Company domain"
            disabled={loading}
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
              resetPhase();
            }}
            className="pl-11"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          variant={isToolPage ? "primary" : "outline"}
          disabled={loading}
          className={cn(
            "min-h-12 w-full shrink-0 sm:w-auto",
            !isToolPage &&
              "border-primary bg-transparent text-primary hover:border-primary hover:bg-primary-soft active:bg-primary-soft"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Finding…
            </>
          ) : (
            <>
              {!isToolPage && <Search className="h-4 w-4" aria-hidden />}
              Find Emails Free
            </>
          )}
        </Button>
      </div>

      {phase === "progress" && <HeroDemoProgress kind="find" />}

      {showPreview && (
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className={cn(
              showGate &&
                "pointer-events-none select-none opacity-70 blur-[5px]"
            )}
            aria-hidden={showGate || undefined}
          >
            <div
              className="overflow-hidden rounded-2xl border border-success/20 bg-success-soft shadow-[var(--shadow-card)]"
              role="status"
              aria-live="polite"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">
                      Matching work emails found
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <StatusChip
                        label="Likely"
                        variant="success"
                        className="bg-surface text-success ring-1 ring-success/25"
                      />
                      <StatusChip
                        label="Example"
                        variant="neutral"
                        showIcon={false}
                        className="bg-surface uppercase tracking-wide ring-1 ring-line"
                      />
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-3xl font-semibold tabular-nums leading-none text-ink">
                      {candidates.length}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">Matches</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {candidates.map((candidate, index) => (
                    <li
                      key={candidate}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface/80 px-3 py-2.5"
                    >
                      <span className="truncate text-sm font-medium text-ink">
                        {candidate}
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-success">
                        {index === 0 ? "Best" : "Likely"}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-3">
                  <div
                    className="flex items-center gap-3"
                    role="separator"
                    aria-label="or instead"
                  >
                    <span className="h-px flex-1 bg-line" aria-hidden />
                    <span className="shrink-0 text-sm text-ink-muted">
                      or Instead
                    </span>
                    <span className="h-px flex-1 bg-line" aria-hidden />
                  </div>
                  <div className="relative">
                    <label htmlFor={linkedinId} className="sr-only">
                      LinkedIn profile URL
                    </label>
                    <Linkedin
                      className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-muted"
                      aria-hidden
                    />
                    <Input
                      id={linkedinId}
                      type="url"
                      inputMode="url"
                      placeholder="LinkedIn profile URL"
                      disabled={loading}
                      value={linkedinUrl}
                      onChange={(event) => {
                        setLinkedinUrl(event.target.value);
                        resetPhase();
                      }}
                      className="pl-11"
                    />
                  </div>
                  <p className="text-center text-xs leading-relaxed text-ink-muted">
                    Get{" "}
                    <span className="font-semibold text-primary">
                      100 free credits
                    </span>
                    . No setup, no credit card, no stress.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showGate && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/40 p-3 backdrop-blur-[1px] sm:p-4">
              <HeroDemoSignupGate
                title="Sign up to check results"
                description="Create a free account to unlock matching work emails — 100 free credits, no card."
                location="email-finder-gate"
                className="w-full max-w-md"
              />
            </div>
          )}
        </div>
      )}
    </form>
  );

  if (isToolPage) {
    return <div className="w-full">{form}</div>;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="flex w-full rounded-full border border-line bg-surface-muted p-1"
        aria-label="Email tools"
      >
        <span
          className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full bg-surface px-2 py-2 text-center text-xs font-semibold leading-tight text-ink ring-1 ring-line sm:px-3 sm:text-sm"
          aria-current="page"
        >
          Find Email
        </span>
        <Link
          href="/validate-email"
          className={TOOL_LINK_CLASS}
          data-ev-event="hero_tool_link"
          data-ev-loc="finder-hero-verify"
          onClick={() =>
            pushEvent("hero_tool_link", {
              tool: "verify-email",
              loc: "finder-hero",
            })
          }
        >
          Verify Email
        </Link>
        <Link
          href="/find-leads"
          className={TOOL_LINK_CLASS}
          data-ev-event="hero_tool_link"
          data-ev-loc="finder-hero-find-leads"
          onClick={() =>
            pushEvent("hero_tool_link", {
              tool: "find-leads",
              loc: "finder-hero",
            })
          }
        >
          Find Leads
        </Link>
      </div>

      <div className="mt-4 w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] ring-1 ring-line/60 sm:mt-5">
        <p className="border-b border-line bg-surface-muted px-4 py-2.5 text-center text-sm leading-snug text-ink-muted">
          Free Email Finder Tool
        </p>
        <div className="p-4 sm:p-5 md:p-6">{form}</div>
      </div>
    </div>
  );
}
