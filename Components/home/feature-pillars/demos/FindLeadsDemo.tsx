"use client";

import {
  Caret,
  DemoHeader,
  DemoShell,
  DemoStatus,
  Ripple,
  Segmented,
  all,
  el,
  press,
  ripple,
  setStatus,
  typeText,
  usePillarDemo,
  type DemoTimeline,
} from "@/Components/home/feature-pillars/demos/demo-kit";
import { cn } from "@/lib/utils";
import { ArrowUp, Copy, Sparkles } from "lucide-react";

/**
 * Find Leads — looping product demo.
 *
 * Flow: pick a suggested brief → type it → searching skeletons → leads stagger in → reset.
 * Edit COPY, LEADS, and T (seconds). Person search is the live workflow; Local stays Soon.
 */

const COPY = {
  idle: "Describe who you want",
  placeholder: "Describe who you're looking for — e.g. Heads of Sales at SaaS companies in London",
  query: "VPs of Engineering at companies with 50-200 employees",
  searching: "Searching leads…",
  found: "Found 3 leads",
} as const;

const SUGGESTIONS = [
  COPY.query,
  "Heads of Sales at SaaS companies in London",
  "CTOs at fintech companies",
] as const;

/** Illustrative people — same preview set the page already used. */
const LEADS = [
  {
    name: "Jordan Hale",
    role: "VP of Engineering, Data and AI · Northpeak",
    email: "jordan.hale@northpeak.io",
  },
  {
    name: "Priya Nair",
    role: "VP of Engineering · Brightlane",
    email: "p.nair@brightlane.co",
  },
  {
    name: "Elena Vargas",
    role: "VP Engineering · Harbor Labs",
    email: null,
  },
] as const;

/** Seconds. Chip → type → search → rows → reset. */
const T = {
  idle: 0.7,
  type: 1.7,
  search: 1.05,
  hold: 1.8,
} as const;

const focusRing = ["border-primary", "ring-2", "ring-primary"] as const;

function build(tl: DemoTimeline, root: HTMLDivElement) {
  const suggestions = el(root, "[data-suggestions]");
  const results = el(root, '[data-scene="results"]');
  const skeletons = el(root, "[data-skeletons]");
  const rows = all(root, "[data-lead]");
  const typed = el(root, "[data-typed]");
  const placeholder = el(root, "[data-placeholder]");
  const composer = el(root, "[data-composer]");
  const chip = el(root, '[data-chip="pick"]');
  const status = el(root, "[data-status]");
  const dot = el(root, "[data-status-dot]");

  const clearQuery = () => {
    typed.textContent = "";
    focusRing.forEach((token) => composer.classList.remove(token));
  };

  tl.set(results, { autoAlpha: 0, y: 12 }, 0)
    .set(suggestions, { autoAlpha: 1, y: 0 }, 0)
    .set(skeletons, { autoAlpha: 1 }, 0)
    .set(rows, { autoAlpha: 0, y: 8 }, 0)
    .set(placeholder, { autoAlpha: 1 }, 0)
    .call(clearQuery, [], 0);

  tl.addLabel("pick", `+=${T.idle}`);
  press(tl, chip, "pick");

  tl.addLabel("type", "pick+=0.2");
  tl.set(placeholder, { autoAlpha: 0 }, "type");
  tl.call(() => {
    focusRing.forEach((token) => composer.classList.add(token));
  }, [], "type");
  typeText(tl, typed, COPY.query, T.type, "type");

  tl.addLabel("send", `type+=${T.type + 0.12}`);
  press(tl, el(root, "[data-send]"), "send");
  ripple(tl, el(root, '[data-ripple="send"]'), "send");
  tl.call(() => {
    focusRing.forEach((token) => composer.classList.remove(token));
  }, [], "send+=0.2");

  tl.addLabel("search", "send+=0.28");
  setStatus(tl, status, dot, COPY.searching, "busy", "search");
  tl.to(suggestions, { autoAlpha: 0, y: -8, duration: 0.25 }, "search");
  tl.to(results, { autoAlpha: 1, y: 0, duration: 0.3 }, "search");

  tl.addLabel("found", `search+=${T.search}`);
  setStatus(tl, status, dot, COPY.found, "ok", "found");
  tl.to(skeletons, { autoAlpha: 0, duration: 0.22 }, "found");
  tl.to(
    rows,
    { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.14 },
    "found",
  );

  tl.addLabel("reset", `+=${T.hold}`);
  tl.call(clearQuery, [], "reset");
  tl.set(placeholder, { autoAlpha: 1 }, "reset");
  tl.to(results, { autoAlpha: 0, duration: 0.3 }, "reset");
  tl.to(suggestions, { autoAlpha: 1, y: 0, duration: 0.35 }, "reset");
  tl.set(skeletons, { autoAlpha: 1 }, "reset+=0.32");
  tl.set(rows, { autoAlpha: 0, y: 8 }, "reset+=0.32");
  setStatus(tl, status, dot, COPY.idle, "idle", "reset+=0.08");
}

export function FindLeadsDemo({ className }: { className?: string }) {
  const scope = usePillarDemo(build);

  return (
    <DemoShell scopeRef={scope} className={className}>
      <div className="absolute inset-x-0 top-0 bottom-9 flex flex-col">
        <DemoHeader title="Find Prospects with AI">
          <Segmented
            items={[
              { label: "Person", active: true },
              { label: "Company" },
              { label: "Local", soon: true },
            ]}
          />
        </DemoHeader>

        <div className="px-4 pt-4">
          <div
            data-composer
            className="relative rounded-xl border border-line bg-surface-muted/50 p-3 pr-12 transition-colors duration-300"
          >
            <p
              data-placeholder
              data-motion-only
              className="text-sm leading-snug text-ink-muted"
            >
              {COPY.placeholder}
            </p>
            <p data-reduced-copy className="hidden text-sm leading-snug text-ink">
              {COPY.query}
            </p>
            <p
              data-motion-only
              className="pointer-events-none absolute inset-3 right-12 text-sm leading-snug text-ink"
            >
              <span data-typed />
              <Caret id="query" />
            </p>
            <span
              data-send
              data-hit
              className="absolute right-2.5 bottom-2.5 grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-primary-soft text-primary"
            >
              <Ripple id="send" className="bg-primary/25" />
              <ArrowUp className="relative h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 px-4 pt-3 pb-3">
          <div
            data-suggestions
            data-reduced-hide
            className="absolute inset-x-4 top-3 bottom-3 flex flex-col"
          >
            <p className="text-xs font-medium text-ink-muted">Suggested</p>
            <ul className="mt-2 grid gap-2 sm:grid-cols-3">
              {SUGGESTIONS.map((item, index) => (
                <li key={item}>
                  <span
                    data-chip={index === 0 ? "pick" : undefined}
                    data-hit
                    className="flex h-full items-start gap-1.5 rounded-xl border border-line bg-surface px-2.5 py-2 text-left text-[11px] leading-snug text-ink"
                  >
                    <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-scene="results"
            data-reduced-show
            className="invisible absolute inset-x-4 top-3 bottom-3 flex flex-col bg-surface"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              Example matches
            </p>
            <div className="relative mt-2 min-h-0 flex-1">
              <ul className="divide-y divide-line">
                {LEADS.map((lead, index) => (
                  <li
                    key={lead.name}
                    data-lead
                    className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-2 py-1.5"
                  >
                    <span className="text-xs tabular-nums text-ink-muted">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {lead.name}
                      </p>
                      <p className="truncate text-[11px] text-ink-muted">
                        {lead.role}
                      </p>
                      {lead.email ? (
                        <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] font-medium text-ink">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                          <span className="truncate">{lead.email}</span>
                          <Copy className="h-3 w-3 shrink-0 text-ink-muted" />
                        </p>
                      ) : (
                        <p className="mt-0.5 text-[11px] text-ink-muted">
                          No email found · not charged
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div
                data-skeletons
                data-reduced-hide
                className="absolute inset-0 space-y-2 bg-surface"
              >
                {LEADS.map((lead) => (
                  <div
                    key={lead.name}
                    className="h-12 animate-pulse rounded-lg bg-surface-muted motion-reduce:animate-none"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DemoStatus initial={COPY.idle} settled={COPY.found} />
    </DemoShell>
  );
}

export const FindLeadsMockup = FindLeadsDemo;
