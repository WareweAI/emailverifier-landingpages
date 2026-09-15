"use client";

import { cn } from "@/lib/utils";
import { AtSign, Loader2, Search, User } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { StatusChip } from "@/Components/ui/StatusChip";
import { HeroDemoProgress } from "@/Components/home/HeroDemoProgress";
import { HeroDemoSignupGate } from "@/Components/home/HeroDemoSignupGate";

const HERO_DEMO_DURATION_MS = 2800;
const HERO_DEMO_NAME = "jacob.schmidt";
const HERO_DEMO_COMPANY = "warewe";

function pushEvent(event: string, detail?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...detail });
  }
}

type FindEmailsFormProps = {
  location?: string;
  className?: string;
};

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
  const unique = Array.from(
    new Set([
      `${first}.${last}@${domain}`,
      `${first[0]}${last}@${domain}`,
      `${first}@${domain}`,
    ])
  );
  return unique;
}

export default function FindEmailsForm({
  location = "hero",
  className,
}: FindEmailsFormProps) {
  const nameId = useId();
  const companyId = useId();
  const demoTimerRef = useRef<number | null>(null);
  const [fullName, setFullName] = useState(HERO_DEMO_NAME);
  const [company, setCompany] = useState(HERO_DEMO_COMPANY);
  const [phase, setPhase] = useState<"idle" | "progress" | "gated">("idle");

  const candidates = useMemo(
    () =>
      mockCandidates(
        fullName.trim() || HERO_DEMO_NAME,
        company.trim() || HERO_DEMO_COMPANY
      ),
    [fullName, company]
  );

  useEffect(() => {
    return () => {
      if (demoTimerRef.current !== null) {
        window.clearTimeout(demoTimerRef.current);
      }
    };
  }, []);

  const clearDemoTimer = () => {
    if (demoTimerRef.current !== null) {
      window.clearTimeout(demoTimerRef.current);
      demoTimerRef.current = null;
    }
  };

  const loading = phase === "progress";
  const showPreview = phase === "idle" || phase === "gated";
  const showGate = phase === "gated";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !company.trim()) return;

    pushEvent("hero_find_email_submit", { location });
    clearDemoTimer();
    setPhase("progress");

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    demoTimerRef.current = window.setTimeout(
      () => {
        setPhase("gated");
        pushEvent("hero_find_email_demo_gate", { location });
      },
      reduced ? 400 : HERO_DEMO_DURATION_MS
    );
  };

  const resetPhase = () => {
    clearDemoTimer();
    setPhase("idle");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full space-y-3", className)}
      data-ev-loc={location}
    >
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
            required
            disabled={loading}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
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
            placeholder="@ Company domain or name"
            required
            disabled={loading}
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              resetPhase();
            }}
            className="pl-11"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="min-h-12 w-full shrink-0 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Finding…
            </>
          ) : (
            <>
              <Search className="h-4 w-4" aria-hidden />
              Find Email
            </>
          )}
        </Button>
      </div>

      {phase === "progress" && <HeroDemoProgress kind="find" />}

      {showPreview && (
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative">
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
                          label="Pattern match"
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
                </div>
              </div>
            </div>
            {showGate && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface/40 p-3 backdrop-blur-[1px] sm:p-4">
                <HeroDemoSignupGate
                  title="Sign up to check results"
                  description="Create a free account to unlock matching work emails — 100 free credits, no card."
                  location={`${location}-find-gate`}
                  className="w-full max-w-md"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
