"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { Reveal } from "@/Components/landing/Reveal";
import {
  INTEGRATION_FILTERS,
  filterIntegrations,
  type Integration,
  type IntegrationFilterId,
} from "@/lib/integrations";
import { cn } from "@/lib/utils";

function IntegrationCard({ item }: { item: Integration }) {
  const isExternal = Boolean(item.href?.startsWith("http"));
  const learnHref =
    item.href ??
    (item.category === "api" ? "/email-verification-api" : "/bulk-email-verifier");
  const learnLabel =
    item.status === "soon"
      ? "See bulk upload"
      : item.category === "api"
        ? "View API docs"
        : item.status === "on-request"
          ? "Learn more"
          : "How it works";

  const body = (
    <>
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-primary-soft">
        {item.logo ? (
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            unoptimized
          />
        ) : (
          <Code2 className="h-5 w-5 text-primary" strokeWidth={1.6} aria-hidden />
        )}
      </span>
      <p className="mt-4 font-semibold text-ink">{item.name}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {item.description}
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
        {item.howItWorks.map((step) => (
          <li key={step} className="flex gap-2">
            <span
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
              aria-hidden
            />
            <span>{step}</span>
          </li>
        ))}
      </ul>
      <span className="mt-4 inline-flex text-sm font-semibold text-primary group-hover:underline">
        {learnLabel}
      </span>
    </>
  );

  const cardClass = cn(
    "group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 text-left shadow-[var(--shadow-card)]",
    "transition-[transform,border-color] duration-200",
    "hover:-translate-y-0.5 hover:border-primary/35 motion-reduce:transform-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
  );

  return (
    <li data-integration-card className="h-full">
      <Link
        href={learnHref}
        className={cardClass}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-label={`${item.name}. ${learnLabel}`}
      >
        {body}
      </Link>
    </li>
  );
}

export function IntegrationsCatalog() {
  const [filter, setFilter] = useState<IntegrationFilterId>("all");
  const tablistId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const items = filterIntegrations(filter);

  const onChipKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = INTEGRATION_FILTERS.length - 1;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = last;
    } else {
      return;
    }
    const id = INTEGRATION_FILTERS[next]?.id;
    if (!id) return;
    setFilter(id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter integrations by category"
        id={tablistId}
        className="flex flex-wrap justify-center gap-2"
      >
        {INTEGRATION_FILTERS.map((chip, index) => {
          const selected = filter === chip.id;
          return (
            <button
              key={chip.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${tablistId}-${chip.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setFilter(chip.id)}
              onKeyDown={(event) => onChipKeyDown(event, index)}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-line bg-surface text-ink hover:border-primary/40"
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <Reveal className="mt-10" staggerSelector="[data-integration-card]">
        <ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-live="polite"
          aria-relevant="additions removals"
        >
          {items.map((item) => (
            <IntegrationCard key={item.id} item={item} />
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
