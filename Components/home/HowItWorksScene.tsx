"use client";

import { useRef, type ComponentType } from "react";
import {
  AddEmailsStoryboard,
  ProjectsStoryboard,
  VerifyStoryboard,
} from "@/Components/home/how-it-works/HowItWorksStoryboards";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Download, Mail, ShieldCheck, type LucideProps } from "lucide-react";

const STEPS = [
  {
    title: "Add Emails",
    desc: "Paste one address, upload a CSV, or call the API.",
    icon: Mail,
  },
  {
    title: "We Verify",
    desc: "Syntax, MX, mailbox, and risk flags — no inbox mail sent.",
    icon: ShieldCheck,
  },
  {
    title: "Download or Act",
    desc: "Get statuses in a file or block bad signups in your app.",
    icon: Download,
  },
] as const;

const STORYBOARDS = [
  AddEmailsStoryboard,
  VerifyStoryboard,
  ProjectsStoryboard,
] as const;

/** Aligns with the floating header: top-4 + h-16, plus a small gap. */
const PIN_TOP_PX = 112;

/**
 * Incoming cards start just below the stack (percentage of their own height).
 * 100% sits flush under the visible card; a little extra gives a short runway.
 */
const ENTER_Y_PERCENT = 110;

/** Scale of a card once the next one has fully covered it. */
const STACKED_SCALE = 0.97;

function StoryboardCard({
  step,
  index,
  children,
  fill = false,
}: {
  step: (typeof STEPS)[number];
  index: number;
  children: React.ReactNode;
  fill?: boolean;
}) {
  const Icon = step.icon as ComponentType<LucideProps>;
  const badge = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border border-line bg-surface p-5 pb-10 sm:p-6",
        fill
          ? "h-full"
          : "shadow-[var(--shadow-card)]"
      )}
    >
      <div className="flex items-start gap-3 pr-10">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h3 className="font-semibold text-ink lg:text-lg">{step.title}</h3>
          <p className="mt-1 text-sm text-ink-muted">{step.desc}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
      <span className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-xs font-medium tabular-nums text-ink-muted">
        {badge}
      </span>
    </article>
  );
}

export default function HowItWorksScene() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      /*
       * Desktop (lg+): pin the two-column row so the left copy stays put.
       * Cards are absolutely stacked. Card 0 is in place; cards 1 and 2 start
       * below (yPercent) at full opacity and scrub upward to cover the stack.
       * No autoAlpha / cross-fade — only transform.
       */
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pinEl = root.querySelector<HTMLElement>("[data-hiw-pin]");
          const stack = root.querySelector<HTMLElement>("[data-hiw-stack]");
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-hiw-state]",
            root
          );
          const progressBar = stack?.querySelector<HTMLElement>(
            "[data-hiw-progress-bar]"
          );

          if (!pinEl || cards.length === 0) return;

          cards.forEach((card, i) => {
            gsap.set(card, {
              zIndex: i + 1,
              autoAlpha: 1,
              yPercent: i === 0 ? 0 : ENTER_Y_PERCENT,
              scale: 1,
              transformOrigin: "50% 0%",
              force3D: true,
            });
          });

          if (progressBar) {
            gsap.set(progressBar, { width: "8%" });
          }

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pinEl,
              start: () => `top ${PIN_TOP_PX}px`,
              end: () => `+=${Math.round(window.innerHeight * 2.2)}`,
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          for (let i = 1; i < cards.length; i++) {
            // Slide the next card up over the stack (still fully opaque).
            tl.to(cards[i], { yPercent: 0, duration: 1 }, i - 1);
            // Recede the card underneath so the deck reads as layered.
            tl.to(
              cards[i - 1],
              { scale: STACKED_SCALE, duration: 1 },
              "<"
            );
            if (i > 1) {
              tl.to(
                cards[i - 2],
                { scale: STACKED_SCALE - 0.02, duration: 1 },
                "<"
              );
            }
          }

          // Verify mock: progress fills while card 02 is sliding into place.
          if (progressBar) {
            tl.to(progressBar, { width: "32%", duration: 1 }, 0);
          }
        }
      );

      /*
       * Tablet + mobile: no pin. Cards are a normal vertical list; each
       * slides up once as it enters the viewport.
       */
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const mobileCards = gsap.utils.toArray<HTMLElement>(
            "[data-hiw-mobile-card]",
            root
          );

          mobileCards.forEach((card) => {
            gsap.from(card, {
              y: 24,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            });
          });
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div ref={scope}>
      <div
        data-hiw-pin
        className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-16"
      >
        <div className="lg:col-span-5 lg:self-start">
          <p className="relative inline-flex min-h-8 items-center py-0.5 pl-0.5 pr-9 text-xs font-semibold text-primary">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 136 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              preserveAspectRatio="none"
            >
              <path
                d="M5 16C5 10 9.5 5.5 15.5 5.5H92C99.5 5.5 105 9 107.5 14.5C110 20 105.5 26 98 26H15.5C9.5 26 5 21.5 5 16Z"
                fill="var(--color-primary-soft)"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                opacity="0.95"
              />
              <path
                d="M107 15C111 15.5 116 17.5 119 20.5C121.5 18 125 16 129 15.5"
                stroke="var(--color-primary)"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <path
                d="M124 13.5L131 15.5L124 17.8"
                stroke="var(--color-primary)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="relative z-10 px-3.5">How It Works</span>
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink lg:text-4xl"
          >
            From list to clean results
          </h2>
          <p className="mt-3 text-ink-muted">
            Three steps. No platform subscription required.
          </p>
        </div>

        {/* Desktop: overlapping stack. Incoming cards clip in from below. */}
        <div className="hidden lg:col-span-7 lg:block">
          <div
            data-hiw-stack
            className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)] motion-reduce:hidden"
          >
            {STORYBOARDS.map((Storyboard, i) => (
              <div
                key={STEPS[i].title}
                data-hiw-state
                className="absolute inset-x-0 top-0 h-full will-change-transform"
              >
                <StoryboardCard step={STEPS[i]} index={i} fill>
                  <Storyboard />
                </StoryboardCard>
              </div>
            ))}
            <div className="invisible pointer-events-none" aria-hidden>
              <StoryboardCard step={STEPS[2]} index={2}>
                <ProjectsStoryboard />
              </StoryboardCard>
            </div>
          </div>

          <div className="hidden flex-col gap-6 motion-reduce:flex">
            {STORYBOARDS.map((Storyboard, i) => (
              <StoryboardCard key={STEPS[i].title} step={STEPS[i]} index={i}>
                <Storyboard />
              </StoryboardCard>
            ))}
          </div>
        </div>

        {/* Tablet + mobile: sequential cards, no pin */}
        <div className="flex flex-col gap-6 lg:hidden">
          {STEPS.map((step, i) => {
            const Storyboard = STORYBOARDS[i];
            return (
              <div key={step.title} data-hiw-mobile-card>
                <StoryboardCard step={step} index={i}>
                  <Storyboard />
                </StoryboardCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
