"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/Components/ui/Button";

const REGISTER_URL = "https://app.emailverifier.io/register";

/** Staggered pixel-block rows for the dark engineered backdrop */
const PIXEL_ROWS = [
  [0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1],
] as const;

/**
 * Mid-page free email verifier band.
 * Verify redirects to signup only after an email is entered.
 */
export default function FreeEmailVerifierSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter an email address to continue.");
      return;
    }
    setError(null);
    const url = new URL(REGISTER_URL);
    url.searchParams.set("email", trimmed);
    window.location.assign(url.toString());
  }

  return (
    <section
      className="relative isolate overflow-hidden bg-gray-900"
      aria-labelledby="free-email-verifier-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
        aria-hidden
      >
        <div className="mx-auto grid w-[140%] max-w-none -translate-x-[14%] gap-0 sm:w-full sm:translate-x-0 [grid-template-columns:repeat(24,minmax(0,1fr))]">
          {PIXEL_ROWS.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={
                  cell
                    ? rowIndex % 2 === 0
                      ? "aspect-square bg-gray-800"
                      : "aspect-square bg-gray-950"
                    : "aspect-square bg-transparent"
                }
              />
            ))
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-gray-900 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
        <h2
          id="free-email-verifier-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Free Email Verifier
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-300 sm:text-lg">
          Enter an email address below to instantly verify if it is valid and
          safe to send to.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-xl border border-gray-700 bg-gray-800/80 p-3 shadow-lg backdrop-blur-sm sm:mt-10 sm:flex-row sm:items-stretch sm:gap-2 sm:p-2"
        >
          <label htmlFor="free-verifier-email" className="sr-only">
            Email
          </label>
          <input
            id="free-verifier-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "free-verifier-email-error" : undefined}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(null);
            }}
            className="h-12 w-full flex-1 rounded-lg border border-gray-600 bg-gray-900 px-4 text-base text-white placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 sm:border-0 sm:bg-transparent sm:focus:ring-0"
          />
          <Button
            type="submit"
            size="md"
            className="h-12 shrink-0 rounded-lg bg-blue-600 px-8 text-base font-semibold text-white hover:bg-blue-700"
          >
            Verify
          </Button>
        </form>
        {error ? (
          <p
            id="free-verifier-email-error"
            role="alert"
            className="mx-auto mt-3 max-w-xl text-sm text-red-400"
          >
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}
