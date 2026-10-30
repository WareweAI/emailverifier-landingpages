"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Shared stage for the homepage feature demos.
 *
 * Each demo builds one paused GSAP timeline and plays it only while the
 * card is on screen. Edit pacing inside the demo file's `T` object.
 * Colors stay on semantic tokens (`bg-primary`, `text-ink`, …).
 *
 * Reduced motion skips the timeline. CSS shows the `[data-reduced-show]`
 * frame and hides `[data-reduced-hide]`.
 */

export type DemoTone = "idle" | "busy" | "ok" | "warn";
export type DemoTimeline = gsap.core.Timeline;

type Build = (tl: gsap.core.Timeline, root: HTMLDivElement) => void;

export function usePillarDemo(build: Build) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.9,
          paused: true,
          defaults: { ease: "power2.out" },
        });

        try {
          build(tl, root);
        } catch (error) {
          console.error("Pillar demo failed to start", error);
          tl.kill();
          return;
        }

        const play = () => {
          if (!document.hidden) tl.play();
        };
        const pause = () => {
          tl.pause();
        };

        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 92%",
          end: "bottom 8%",
          onToggle: (self) => {
            if (self.isActive) play();
            else pause();
          },
        });

        const onVis = () => {
          if (document.hidden) pause();
          else if (st.isActive) play();
        };
        document.addEventListener("visibilitychange", onVis);

        const kick = gsap.delayedCall(0.2, () => {
          if (st.isActive) play();
        });

        return () => {
          document.removeEventListener("visibilitychange", onVis);
          kick.kill();
          st.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope },
  );

  return scope;
}

export function el<T extends HTMLElement = HTMLElement>(
  root: ParentNode,
  selector: string,
): T {
  const node = root.querySelector<T>(selector);
  if (!node) {
    throw new Error(`Pillar demo is missing ${selector}`);
  }
  return node;
}

export function all<T extends HTMLElement = HTMLElement>(
  root: ParentNode,
  selector: string,
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

/** Scripted button press. Clears the inline scale so CSS hover still works. */
export function press(
  tl: gsap.core.Timeline,
  node: HTMLElement,
  position?: gsap.Position,
) {
  tl.to(node, { scale: 0.96, duration: 0.1, ease: "power1.in" }, position).to(
    node,
    { scale: 1, duration: 0.16, ease: "power2.out", clearProps: "transform" },
  );
}

/** Click ripple. The node should be centered with left/top 50%. */
export function ripple(
  tl: gsap.core.Timeline,
  node: HTMLElement,
  position?: gsap.Position,
) {
  tl.fromTo(
    node,
    { xPercent: -50, yPercent: -50, scale: 0.2, autoAlpha: 0.5 },
    {
      xPercent: -50,
      yPercent: -50,
      scale: 2.5,
      autoAlpha: 0,
      duration: 0.45,
      ease: "power2.out",
      immediateRender: false,
    },
    position,
  );
}

/** Types `text` into `node` by updating textContent (no React re-render). */
export function typeText(
  tl: gsap.core.Timeline,
  node: HTMLElement,
  text: string,
  duration: number,
  position?: gsap.Position,
) {
  const proxy = { n: 0 };
  tl.to(
    proxy,
    {
      n: text.length,
      duration,
      ease: "none",
      onUpdate: () => {
        node.textContent = text.slice(0, Math.round(proxy.n));
      },
    },
    position,
  );
}

export function countTo(
  tl: gsap.core.Timeline,
  node: HTMLElement,
  to: number,
  duration: number,
  position?: gsap.Position,
) {
  const proxy = { n: 0 };
  tl.to(
    proxy,
    {
      n: to,
      duration,
      ease: "power1.out",
      onUpdate: () => {
        node.textContent = String(Math.round(proxy.n));
      },
    },
    position,
  );
}

export function setStatus(
  tl: gsap.core.Timeline,
  label: HTMLElement,
  dot: HTMLElement,
  text: string,
  tone: DemoTone,
  position?: gsap.Position,
) {
  tl.to(
    label,
    { autoAlpha: 0, y: -3, duration: 0.12, overwrite: "auto" },
    position,
  )
    .call(() => {
      label.textContent = text;
      dot.dataset.tone = tone === "idle" ? "" : tone;
    })
    .to(label, { autoAlpha: 1, y: 0, duration: 0.16, overwrite: "auto" });
}

export function DemoShell({
  scopeRef,
  className,
  children,
}: {
  scopeRef: RefObject<HTMLDivElement | null>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      ref={scopeRef}
      aria-hidden
      className={cn(
        /* 1-off: fixed stage so crossfades do not change page height */
        "pillar-demo relative h-[28rem] min-w-0 select-none overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Absolutely fills the shell above the status bar. Opaque so crossfades don't show the other scene through empty space. */
export const sceneClass =
  "absolute inset-x-0 top-0 bottom-9 flex flex-col bg-surface";

export function DemoHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
      <p className="text-sm font-semibold text-ink">{title}</p>
      {children}
    </div>
  );
}

export function Segmented({
  items,
  tone = "surface",
  className,
}: {
  items: { label: string; active?: boolean; soon?: boolean }[];
  tone?: "surface" | "ink";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex rounded-full bg-surface-muted p-0.5 text-[10px] font-semibold",
        className,
      )}
    >
      {items.map((item) => (
        <span
          key={item.label}
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1",
            item.active && tone === "surface" &&
              "bg-surface text-ink shadow-[var(--shadow-card)]",
            item.active && tone === "ink" && "bg-ink text-primary-foreground",
            !item.active && "text-ink-muted",
          )}
        >
          {item.label}
          {item.soon ? (
            <span className="rounded-full bg-line px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-ink-muted">
              Soon
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export function DemoStatus({
  initial,
  settled,
}: {
  initial: string;
  /** Shown instead of the live status when the visitor prefers reduced motion. */
  settled: string;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-9 items-center gap-2 border-t border-line bg-surface px-4">
      <span
        data-status-dot
        className="h-1.5 w-1.5 shrink-0 rounded-full"
      />
      <span
        data-status
        data-motion-only
        className="truncate text-xs font-medium text-ink-muted"
      >
        {initial}
      </span>
      <span
        data-reduced-copy
        className="hidden truncate text-xs font-medium text-ink-muted"
      >
        {settled}
      </span>
    </div>
  );
}

export function Caret({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  return (
    <span
      data-caret={id}
      className={cn(
        "pillar-caret ml-px inline-block h-4 w-px bg-primary align-middle",
        className,
      )}
    />
  );
}

export function Ripple({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  return (
    <span
      data-ripple={id}
      className={cn(
        "pointer-events-none absolute top-1/2 left-1/2 h-8 w-8 rounded-full bg-white/50 opacity-0",
        className,
      )}
    />
  );
}
