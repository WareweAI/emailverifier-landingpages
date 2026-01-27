"use client";

import { validateEmail } from "@/lib/utils";
import { ArrowRight, CircleCheck, CircleX, Mail, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// for demo purpose only
const MAX_USE = 3;

export default function InputForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"valid" | "invalid" | null>(null);
    const [useCount, setUseCount] = useState(0);

    // replace with api call later
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        if (useCount >= MAX_USE) {
            setStatus(null);
            return;
        }
        
        const isValid = validateEmail(email);
        setStatus(isValid ? "valid" : "invalid");
        setUseCount(prev => prev + 1);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setStatus(null);
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

                    <button disabled={useCount >= MAX_USE} type="submit"
                        className={`py-2 px-6 rounded-sm bg-linear-to-r from-blue-600 to-blue-800 
                        text-white font-medium flex items-center gap-2 transition 
                        ${useCount >= MAX_USE ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'}`}>
                        Verify Email
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
            {/* STATUS MESSAGES */}

            {/* limit warning done */}
            {useCount >= MAX_USE && (
                <div className="mt-4 rounded-lg border border-yellow-300 
                    bg-yellow-50 px-4 py-3 text-base text-gray-600 text-left flex items-start gap-2">
                    <span className="text-yellow-500"><TriangleAlert size={18} /></span>
                    <p>
                        You&apos;ve reached the maximum number of trial limit. Please{" "}
                        <Link href="/signin" className="underline">sign in</Link> or{" "}
                        <Link href="/register" className="underline">create a free account</Link> to continue.
                    </p>
                </div>
            )}

            {/* invalid done */}
            {status === "invalid" && (
                <div className="mt-4 flex items-center justify-center gap-2 text-red-600 font-semibold">
                    <CircleX size={20} /> This email is invalid!
                </div>
            )}


            {/* VALID done*/}
            {status === "valid" && (
                <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-semibold">
                    <span><CircleCheck size={20} /></span> This email is Valid. OK to send!
                </div>
            )}
        </form>
    )
}
