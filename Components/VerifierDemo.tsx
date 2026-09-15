"use client";

import { validateEmail } from "@/lib/utils";
import { Loader2, Mail, Upload } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { statusToVariant } from "./ui/StatusChip";
import { VerificationResultCard } from "./ui/VerificationResultCard";
import { PostVerifyUpsell } from "./ui/PostVerifyUpsell";
import { VerificationProgress } from "./FreeValidationPage/VerificationProgress";
import { ToolResultPanel } from "./FreeValidationPage/ToolResultPanel";
import { HeroDemoProgress } from "./home/HeroDemoProgress";
import { HeroDemoSignupGate } from "./home/HeroDemoSignupGate";
import { cn } from "@/lib/utils";

const MAX_VERIFICATIONS = 3;
const STORAGE_KEY = "email-verifier-use-count";
const HERO_DEMO_DURATION_MS = 2800;
const HERO_DEMO_EMAIL = "jacob.schmidt@gmail.com";
const HERO_UPLOAD_ACCEPT =
  ".csv,.txt,.xlsx,.xls,text/csv,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

type VerificationDetails = {
  score: number;
  status: string;
  catch_all: boolean;
  disposable: boolean;
  role_based: boolean;
};

const HERO_EXAMPLE_RESULT: VerificationDetails = {
  score: 98,
  status: "Deliverable",
  catch_all: false,
  disposable: false,
  role_based: false,
};

function getStoredCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const n = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  } catch {
    return 0;
  }
}

function setStoredCount(count: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(Math.min(count, MAX_VERIFICATIONS)));
  } catch {
    // ignore
  }
}

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

type VerifierDemoProps = {
  variant?: "hero" | "tool-page";
  location?: string;
  className?: string;
};

export default function VerifierDemo({
  variant = "hero",
  location = "hero",
  className,
}: VerifierDemoProps) {
  const inputId = useId();
  const fileInputId = useId();
  const demoTimerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isHeroDemo = variant === "hero";
  const [email, setEmail] = useState(isHeroDemo ? HERO_DEMO_EMAIL : "");
  const [status, setStatus] = useState<"valid" | "invalid" | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [details, setDetails] = useState<VerificationDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useCount, setUseCount] = useState(0);
  const [invalidInput, setInvalidInput] = useState(false);
  const [heroPhase, setHeroPhase] = useState<"idle" | "progress" | "gated">(
    "idle"
  );

  const isToolPage = variant === "tool-page";

  useEffect(() => {
    if (isHeroDemo) return;
    setUseCount(getStoredCount());
  }, [isHeroDemo]);

  useEffect(() => {
    return () => {
      if (demoTimerRef.current !== null) {
        window.clearTimeout(demoTimerRef.current);
      }
    };
  }, []);

  const incrementUseCount = () => {
    setUseCount((prev) => {
      const next = Math.min(prev + 1, MAX_VERIFICATIONS);
      setStoredCount(next);
      return next;
    });
  };

  const atLimit = !isHeroDemo && useCount >= MAX_VERIFICATIONS;
  const remaining = Math.max(0, MAX_VERIFICATIONS - useCount);

  const startHeroDemo = (
    nextEmail: string,
    source: "verify" | "upload" = "verify"
  ) => {
    if (demoTimerRef.current !== null) {
      window.clearTimeout(demoTimerRef.current);
    }

    setHeroPhase("progress");
    setLoading(true);
    setStatus(null);
    setStatusMessage(null);
    setError(null);
    setInvalidInput(false);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hero-verify-start", {
          detail: { email: nextEmail, source },
        })
      );
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    demoTimerRef.current = window.setTimeout(
      () => {
        setLoading(false);
        setHeroPhase("gated");
        pushEvent("hero_verify_demo_gate", { location, source });
      },
      reduced ? 400 : HERO_DEMO_DURATION_MS
    );
  };

  const handleUploadClick = () => {
    if (loading) return;
    fileInputRef.current?.click();
  };

  const handleUploadFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    pushEvent("hero_upload_list_select", {
      location,
      fileName: file.name,
    });
    startHeroDemo(email.trim() || HERO_DEMO_EMAIL, "upload");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    pushEvent("hero_verify_submit", { location });

    if (atLimit) {
      setStatus(null);
      return;
    }

    if (!validateEmail(email)) {
      setInvalidInput(true);
      setStatus("invalid");
      setStatusMessage("Invalid email format.");
      if (!isHeroDemo) {
        setDetails(null);
        incrementUseCount();
      } else {
        setHeroPhase("idle");
      }
      return;
    }

    setInvalidInput(false);

    if (isHeroDemo) {
      startHeroDemo(email.trim());
      return;
    }

    setError(null);
    setStatus(null);
    setStatusMessage(null);
    setDetails(null);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/verify-email?email=${encodeURIComponent(email.trim())}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Verification failed. Please try again.");
        setStatus(null);
        return;
      }

      const isDeliverable =
        data?.is_deliverable === true || data?.is_safe_to_send === true;
      const apiStatus = (data?.status ?? "").toString().trim().toLowerCase();
      const displayStatus = isDeliverable
        ? "Deliverable"
        : apiStatus === "invalid" || apiStatus === "undeliverable"
          ? "Undeliverable"
          : apiStatus
            ? apiStatus.charAt(0).toUpperCase() + apiStatus.slice(1)
            : "Undeliverable";

      setStatus(isDeliverable ? "valid" : "invalid");
      setStatusMessage(displayStatus);
      setDetails({
        score: typeof data?.overall_score === "number" ? data.overall_score : 0,
        status: displayStatus,
        catch_all: Boolean(data?.is_catch_all),
        disposable: Boolean(data?.is_disposable),
        role_based: Boolean(data?.is_role_account),
      });
      incrementUseCount();
      pushEvent("hero_verify_result", {
        location,
        status: displayStatus,
      });
    } catch {
      setError("Verification request failed. Please try again.");
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
    setInvalidInput(false);
    if (isHeroDemo) {
      setStatus(null);
      setStatusMessage(null);
      setHeroPhase("idle");
      setLoading(false);
      if (demoTimerRef.current !== null) {
        window.clearTimeout(demoTimerRef.current);
        demoTimerRef.current = null;
      }
      return;
    }
    setStatus(null);
    setStatusMessage(null);
    setDetails(null);
  };

  const previewEmail = email.trim() || HERO_DEMO_EMAIL;
  const heroExampleVariant = statusToVariant(HERO_EXAMPLE_RESULT.status, true);

  const mainVariant = details
    ? statusToVariant(details.status, status === "valid")
    : status === "invalid"
      ? "danger"
      : "neutral";

  const showLiveResult =
    !isHeroDemo && (Boolean(details) || status === "invalid");
  const showHeroPreview =
    isHeroDemo && (heroPhase === "idle" || heroPhase === "gated");
  const showHeroGate = isHeroDemo && heroPhase === "gated";
  const showHeroInvalid =
    isHeroDemo && status === "invalid" && heroPhase === "idle";

  return (
    <div className={cn("w-full", className)} data-ev-loc={location}>
      <form onSubmit={handleSubmit} className="space-y-3">
        {isToolPage && (
          <label htmlFor={inputId} className="sr-only">
            Enter an email address to check its deliverability
          </label>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <Input
              id={isToolPage ? inputId : undefined}
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="you@company.com"
              required
              disabled={atLimit || loading}
              aria-invalid={invalidInput}
              aria-describedby={
                isHeroDemo ? undefined : `${location}-remaining`
              }
              className="pl-11"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={atLimit || loading}
            className="min-h-12 w-full shrink-0 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Verifying…
              </>
            ) : (
              "Verify Emails Free"
            )}
          </Button>
        </div>

        {!isHeroDemo && !atLimit && (
          <p id={`${location}-remaining`} className="text-sm text-ink-muted">
            {useCount === 0 ? (
              <>
                {remaining} free check{remaining !== 1 ? "s" : ""}.
              </>
            ) : (
              <>
                {remaining} free check{remaining !== 1 ? "s" : ""} left.
              </>
            )}
          </p>
        )}

        {error && (
          <p className="text-sm font-medium text-danger" role="alert">
            {error}
          </p>
        )}

        {atLimit && <PostVerifyUpsell mode="at-limit" />}

        {isToolPage && <VerificationProgress active={loading} />}

        {isHeroDemo && heroPhase === "progress" && (
          <HeroDemoProgress kind="verify" />
        )}

        {showHeroInvalid && (
          <p className="text-sm font-medium text-danger" role="alert">
            {statusMessage ?? "Invalid email format."}
          </p>
        )}

        {showHeroPreview && (
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative">
              <div
                className={cn(
                  showHeroGate &&
                    "pointer-events-none select-none opacity-70 blur-[5px]"
                )}
                aria-hidden={showHeroGate || undefined}
              >
                <VerificationResultCard
                  email={previewEmail}
                  headline="This email address is valid"
                  statusLabel={HERO_EXAMPLE_RESULT.status}
                  variant={heroExampleVariant}
                  score={HERO_EXAMPLE_RESULT.score}
                  catchAll={HERO_EXAMPLE_RESULT.catch_all}
                  disposable={HERO_EXAMPLE_RESULT.disposable}
                  roleBased={HERO_EXAMPLE_RESULT.role_based}
                  flagsSlot={
                    <div className="space-y-3">
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
                      <input
                        ref={fileInputRef}
                        id={fileInputId}
                        type="file"
                        accept={HERO_UPLOAD_ACCEPT}
                        className="sr-only"
                        tabIndex={-1}
                        onChange={handleUploadFileChange}
                      />
                      <Button
                        type="button"
                        size="lg"
                        variant="secondary"
                        disabled={loading}
                        onClick={handleUploadClick}
                        data-ev-event="hero_upload_list_click"
                        data-ev-loc={`${location}-upload-list`}
                        className="min-h-12 w-full border border-line bg-line text-ink hover:bg-line/80 hover:border-line active:bg-line/80"
                      >
                        <Upload className="h-4 w-4" aria-hidden />
                        Upload a list
                      </Button>
                    </div>
                  }
                />
              </div>
              {showHeroGate && (
                <div className="absolute inset-0 flex items-center justify-center bg-surface/40 p-3 backdrop-blur-[1px] sm:p-4">
                  <HeroDemoSignupGate
                    location={`${location}-verify-gate`}
                    className="w-full max-w-md"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {showLiveResult &&
          (isToolPage ? (
            <>
              <ToolResultPanel
                email={email}
                statusLabel={
                  statusMessage ??
                  (status === "invalid" ? "Invalid" : "Unknown")
                }
                variant={mainVariant}
                score={details?.score ?? 0}
                catchAll={details?.catch_all}
                disposable={details?.disposable}
                roleBased={details?.role_based}
              />
              {!atLimit && (
                <PostVerifyUpsell mode="after-result" className="mt-3" />
              )}
            </>
          ) : (
            <VerificationResultCard
              email={email}
              statusLabel={
                statusMessage ??
                (status === "invalid" ? "Invalid" : "Unknown")
              }
              variant={mainVariant}
              score={details?.score ?? 0}
              catchAll={details?.catch_all}
              disposable={details?.disposable}
              roleBased={details?.role_based}
            />
          ))}
      </form>
    </div>
  );
}
