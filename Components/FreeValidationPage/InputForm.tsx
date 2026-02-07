"use client";

import { validateEmail } from "@/lib/utils";
import { ArrowRight, CircleCheck, CircleX, Loader2, Mail, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MAX_VERIFICATIONS = 3;
const STORAGE_KEY = "email-verifier-use-count";

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

type VerificationDetails = {
    score: number;
    status: string;
    catch_all: boolean;
    disposable: boolean;
    role_based: boolean;
};

export default function InputForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"valid" | "invalid" | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [details, setDetails] = useState<VerificationDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [useCount, setUseCount] = useState(0);

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

        if (atLimit) {
            setStatus(null);
            return;
        }

        if (!validateEmail(email)) {
            setStatus("invalid");
            setStatusMessage("Invalid email format.");
            incrementUseCount();
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

            const isDeliverable = data?.is_deliverable === true || data?.is_safe_to_send === true;
            const apiStatus = (data?.status ?? "").toString().trim();

            setStatus(isDeliverable ? "valid" : "invalid");
            setStatusMessage(apiStatus ? apiStatus.charAt(0).toUpperCase() + apiStatus.slice(1) : (isDeliverable ? "Deliverable" : "Undeliverable"));
            setDetails({
                score: typeof data?.overall_score === "number" ? data.overall_score : 0,
                status: apiStatus ? apiStatus.charAt(0).toUpperCase() + apiStatus.slice(1) : "—",
                catch_all: Boolean(data?.is_catch_all),
                disposable: Boolean(data?.is_disposable),
                role_based: Boolean(data?.is_role_account),
            });
            incrementUseCount();
        } catch {
            setError("Verification request failed. Please try again.");
            setStatus(null);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setStatus(null);
        setStatusMessage(null);
        setDetails(null);
        setError(null);
    }

    return (
        <form
            onSubmit={handleSubmit}>
            <div className="py-2 px-3 shadow-[0px_13px_20px_-3px_rgba(0,0,0,0.1)] bg-white rounded-2xl">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 flex-1 bg-blue-100/25 p-2 rounded-sm">
                        <span className="text-gray-400">
                            <Mail />
                        </span>
                        <input
                            type="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter email address (e.g. name@company.com)"
                            required
                            className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>

                    <button
                        disabled={atLimit || loading}
                        type="submit"
                        className={`py-2 px-6 rounded-sm bg-linear-to-r from-blue-600 to-blue-800 
                        text-white font-medium flex items-center gap-2 transition 
                        ${atLimit || loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'}`}>
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Verifying…
                            </>
                        ) : (
                            <>
                                Verify Email
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </div>
            {/* STATUS MESSAGES */}

            {error && (
                <div className="mt-4 flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <CircleX size={20} /> {error}
                </div>
            )}

            {!atLimit && (
                <p className="mt-3 text-sm text-gray-500">
                    {remaining} verification{remaining !== 1 ? "s" : ""} remaining
                </p>
            )}

            {/* limit warning */}
            {atLimit && (
                <div className="mt-4 rounded-lg border border-yellow-300 
                    bg-yellow-50 px-4 py-3 text-base text-gray-600 text-left flex items-start gap-2">
                    <span className="text-yellow-500"><TriangleAlert size={18} /></span>
                    <p>
                        You&apos;ve used all {MAX_VERIFICATIONS} free verifications. Please{" "}
                        <Link href="https://app.emailverifier.io/signin" className="underline" target="_blank" rel="noopener noreferrer">sign in</Link> or{" "}
                        <Link href="https://app.emailverifier.io/register" className="underline" target="_blank" rel="noopener noreferrer">create a free account</Link> to continue.
                    </p>
                </div>
            )}

            {/* invalid done */}
            {status === "invalid" && (
                <div className="mt-4 flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <CircleX size={20} />
                    {statusMessage ? `This email is ${statusMessage}.` : "This email is invalid!"}
                </div>
            )}

            {/* VALID done*/}
            {status === "valid" && (
                <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-semibold">
                    <span><CircleCheck size={20} /></span>
                    {statusMessage ? `This email is valid (${statusMessage}). OK to send!` : "This email is valid. OK to send!"}
                </div>
            )}

            {/* Verification details */}
            {details && (
                <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50/80 text-left">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Verification details</p>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between sm:block gap-2">
                            <dt className="text-gray-500">Score</dt>
                            <dd className="font-medium text-gray-900">{details.score}</dd>
                        </div>
                        <div className="flex justify-between sm:block gap-2">
                            <dt className="text-gray-500">Status</dt>
                            <dd className="font-medium text-gray-900 capitalize">{details.status}</dd>
                        </div>
                        <div className="flex justify-between sm:block gap-2">
                            <dt className="text-gray-500">Catch-all</dt>
                            <dd className="font-medium text-gray-900">{details.catch_all ? "Yes" : "No"}</dd>
                        </div>
                        <div className="flex justify-between sm:block gap-2">
                            <dt className="text-gray-500">Disposable</dt>
                            <dd className="font-medium text-gray-900">{details.disposable ? "Yes" : "No"}</dd>
                        </div>
                        <div className="flex justify-between sm:block gap-2 sm:col-span-2">
                            <dt className="text-gray-500">Role-based</dt>
                            <dd className="font-medium text-gray-900">{details.role_based ? "Yes" : "No"}</dd>
                        </div>
                    </dl>
                </div>
            )}
        </form>
    )
}
