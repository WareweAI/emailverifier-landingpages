"use client";

import { validateEmail } from "@/lib/utils";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { statusToVariant } from "./ui/StatusChip";
import { VerificationResultCard } from "./ui/VerificationResultCard";
import { VerificationProgress } from "./FreeValidationPage/VerificationProgress";
import { ToolResultPanel } from "./FreeValidationPage/ToolResultPanel";
import { API_DOCS_PATH } from "@/lib/api-snippet";
import { cn } from "@/lib/utils";

const MAX_VERIFICATIONS = 3;
const STORAGE_KEY = "email-verifier-use-count";
const REGISTER_URL = "https://app.emailverifier.io/register";

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

type VerificationDetails = {
  score: number;
  status: string;
  catch_all: boolean;
  disposable: boolean;
  role_based: boolean;
};

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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"valid" | "invalid" | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [details, setDetails] = useState<VerificationDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useCount, setUseCount] = useState(0);
  const [invalidInput, setInvalidInput] = useState(false);

  const isToolPage = variant === "tool-page";

  useEffect(() => {
    setUseCount(getStoredCount());
  }, []);

  const incrementUseCount = () => {
    setUseCount((prev) => {
      const next = Math.min(prev + 1, MAX_VERIFICATIONS);
      setStoredCount(next);
      return next;
    });
  };

  const atLimit = useCount >= MAX_VERIFICATIONS;
  const remaining = Math.max(0, MAX_VERIFICATIONS - useCount);

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
      setDetails(null);
      incrementUseCount();
      return;
    }

    setInvalidInput(false);
    setError(null);
    setStatus(null);
    setStatusMessage(null);
    setDetails(null);
    setLoading(true);

    if (location === "hero" && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hero-verify-start", {
          detail: { email: email.trim() },
        })
      );
    }

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
    setStatus(null);
    setStatusMessage(null);
    setDetails(null);
    setError(null);
    setInvalidInput(false);
  };

  const mainVariant = details
    ? statusToVariant(details.status, status === "valid")
    : status === "invalid"
      ? "danger"
      : "neutral";

  const showResult = Boolean(details) || status === "invalid";

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
              aria-describedby={`${location}-remaining`}
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

        {!atLimit && (
          <p id={`${location}-remaining`} className="text-sm text-ink-muted">
            {useCount === 0 ? (
              <>
                {remaining} free check{remaining !== 1 ? "s" : ""}. 100 more when
                you sign up. No credit card.
              </>
            ) : (
              <>
                {remaining} free check{remaining !== 1 ? "s" : ""} left. 100 more
                when you sign up. No credit card.
              </>
            )}
          </p>
        )}

        {error && (
          <p className="text-sm font-medium text-danger" role="alert">
            {error}
          </p>
        )}

        {atLimit && (
          <div
            className="rounded-2xl border border-warning/30 bg-warning-soft px-4 py-3 text-sm text-ink"
            role="alert"
          >
            You&apos;ve used all {MAX_VERIFICATIONS} free verifications.{" "}
            <Link
              href={REGISTER_URL}
              className="font-semibold text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
              data-ev-event="cta_register_click"
            >
              Get 100 free credits
            </Link>{" "}
            or{" "}
            <Link href="/pricing" className="font-semibold text-primary underline">
              see pricing
            </Link>
            .
          </div>
        )}

        {isToolPage && <VerificationProgress active={loading} />}

        {showResult &&
          (isToolPage ? (
            <ToolResultPanel
              email={email}
              statusLabel={
                statusMessage ?? (status === "invalid" ? "Invalid" : "Unknown")
              }
              variant={mainVariant}
              score={details?.score ?? 0}
              catchAll={details?.catch_all}
              disposable={details?.disposable}
              roleBased={details?.role_based}
            />
          ) : (
            <VerificationResultCard
              email={email}
              statusLabel={
                statusMessage ?? (status === "invalid" ? "Invalid" : "Unknown")
              }
              variant={mainVariant}
              score={details?.score ?? 0}
              catchAll={details?.catch_all}
              disposable={details?.disposable}
              roleBased={details?.role_based}
              footer={
                <p className="mt-3 text-sm">
                  <Link
                    href={API_DOCS_PATH}
                    className="font-medium text-primary hover:underline"
                    data-ev-event="api_docs_click"
                  >
                    View API Docs
                  </Link>
                  {" · "}
                  <Link
                    href={REGISTER_URL}
                    className="font-medium text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Clean a full list — 100 free
                  </Link>
                </p>
              }
            />
          ))}
      </form>
    </div>
  );
}
