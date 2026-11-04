import { Reveal } from "@/Components/landing/Reveal";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";

export type HowStep = {
  step: string;
  title: string;
  body: string;
};

type HowStepsProps = {
  headingId?: string;
  title: string;
  intro?: string;
  steps: readonly HowStep[];
  className?: string;
  /** Alternate layout: horizontal on large screens */
  variant?: "stack" | "rail";
};

export function HowSteps({
  headingId = "how-steps-heading",
  title,
  intro,
  steps,
  className,
  variant = "rail",
}: HowStepsProps) {
  return (
    <SectionShell
      className={className}
      ariaLabelledBy={headingId}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id={headingId}
          className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
        >
          {title}
        </h2>
        {intro ? <p className="mt-3 text-ink-muted">{intro}</p> : null}
      </div>

      <Reveal
        className="mt-10"
        staggerSelector="[data-step]"
      >
        <ol
          className={cn(
            variant === "rail"
              ? "grid gap-4 md:grid-cols-2 lg:grid-cols-4"
              : "mx-auto max-w-2xl space-y-5"
          )}
        >
          {steps.map((item) => (
            <li
              key={item.step}
              data-step
              className={cn(
                "rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/35 motion-reduce:transform-none",
                variant === "stack" && "flex gap-4"
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {item.step}
              </span>
              <div className={cn(variant === "rail" && "mt-4")}>
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </SectionShell>
  );
}
