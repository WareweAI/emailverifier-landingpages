import { SectionShell } from "@/Components/ui/SectionShell";

const STEPS = [
  {
    title: "Syntax",
    desc: "Detects malformed and invalid email addresses.",
  },
  {
    title: "Domain",
    desc: "Confirms the domain exists and has MX records.",
  },
  {
    title: "Mailbox",
    desc: "Checks mailbox availability without sending mail.",
  },
  {
    title: "Risk",
    desc: "Flags disposable, catch-all, and role-based addresses.",
  },
];

export default function WhatWeCheck() {
  return (
    <SectionShell
      className="bg-surface-muted"
      ariaLabelledBy="what-we-check-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="what-we-check-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          What this email verifier checks
        </h2>
        <p className="mt-3 text-ink-muted">
          Every free verification runs the same core checks as the full product.
        </p>
      </div>

      <ol className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative">
            {index < STEPS.length - 1 && (
              <span
                className="pointer-events-none absolute top-4 left-[calc(50%+1.25rem)] hidden h-px w-[calc(100%-1.5rem)] bg-line lg:block"
                aria-hidden
              />
            )}
            <div className="flex flex-col items-start lg:items-center lg:text-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold tabular-nums text-primary-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                {step.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
