"use client";

import { useState } from "react";
import {
  AddEmailsStoryboard,
  ProjectsStoryboard,
  VerifyStoryboard,
} from "@/Components/home/how-it-works/HowItWorksStoryboards";
import { Download, Mail, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Upload Your List",
    desc: "Drop in your file, connect your app, or use our API - whatever works for you.",
    icon: Mail,
    Storyboard: AddEmailsStoryboard,
  },
  {
    title: "Real-time Verification",
    desc: "We check every address using smart, multi-layer validation.",
    icon: ShieldCheck,
    Storyboard: VerifyStoryboard,
  },
  {
    title: "Download Your Clean List",
    desc: "Export your verified list and send your next campaign with confidence.",
    icon: Download,
    Storyboard: ProjectsStoryboard,
  },
] as const;

/**
 * Compact how-it-works band. On large screens, cards expand on hover to reveal
 * the product mockup; first card is expanded by default.
 */
export default function HowItWorksCompact() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">
          How it works
        </p>
        <h2
          id="how-it-works-heading"
          className="mt-2 font-display text-2xl font-semibold tracking-tight text-primary-foreground lg:text-3xl"
        >
          How Emailverifier.io Works
        </h2>
        <p className="mt-3 text-primary-foreground/75">
          Emailverifier.io is an email verification and validation tool that
          checks whether an email address is real, deliverable, and safe to send
          without sending an email
        </p>
      </div>

      <ol
        className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3"
        onMouseLeave={() => setActive(0)}
      >
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const Storyboard = step.Storyboard;
          const expanded = active === i;

          return (
            <li
              key={step.title}
              className={cn(
                "min-w-0 transition-[flex] duration-500 ease-out motion-reduce:transition-none",
                expanded ? "lg:flex-[3.2_1_0%]" : "lg:flex-[1_1_0%]"
              )}
              onMouseEnter={() => setActive(i)}
              onFocusCapture={() => setActive(i)}
            >
              <article
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-2xl border border-primary-foreground/15 bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5",
                  "lg:flex-row lg:items-stretch lg:gap-0 lg:p-6",
                  expanded && "border-primary/40 lg:gap-5"
                )}
                aria-expanded={expanded}
              >
                <div
                  className={cn(
                    "flex shrink-0 flex-col self-stretch transition-[width] duration-500 ease-out motion-reduce:transition-none",
                    expanded ? "lg:w-40" : "lg:w-full"
                  )}
                >
                  <div className="flex h-full min-h-0 flex-col justify-between gap-3 max-lg:flex-row max-lg:items-start max-lg:justify-start">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold tabular-nums text-primary lg:h-auto lg:w-auto lg:justify-start lg:rounded-none lg:bg-transparent lg:text-base lg:font-medium lg:text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="flex items-center gap-1.5 font-semibold text-ink">
                        <Icon
                          className="h-4 w-4 shrink-0 text-primary lg:hidden"
                          aria-hidden
                        />
                        {step.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-ink-muted lg:mt-2 lg:leading-snug">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "min-w-0 overflow-hidden transition-[opacity,max-width,margin] duration-500 ease-out motion-reduce:transition-none",
                    "mt-4",
                    expanded
                      ? "lg:mt-0 lg:max-w-[40rem] lg:flex-1 lg:opacity-100"
                      : "lg:pointer-events-none lg:mt-0 lg:max-w-0 lg:flex-none lg:opacity-0"
                  )}
                  aria-hidden={!expanded}
                >
                  {/* 1-off: shared mockup frame height so expand cards stay balanced */}
                  <div className="h-80 min-w-[16rem] overflow-visible rounded-xl">
                    <Storyboard />
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
