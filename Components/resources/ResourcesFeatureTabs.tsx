"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import {
  FeaturePointList,
  type FeaturePoint,
} from "@/Components/home/feature-pillars/FeaturePointList";
import {
  BlogPostMockup,
  GuidesListMockup,
  IntegrationsTilesMockup,
} from "@/Components/resources/ResourcesMockups";
import { Button } from "@/Components/ui/Button";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";
import { cn } from "@/lib/utils";

type ResourceId = "guides" | "integrations" | "blog";

type ResourcePillar = {
  id: ResourceId;
  icon: LucideIcon;
  iconClass: string;
  iconWrapClass: string;
  title: string;
  points: readonly FeaturePoint[];
  cta: string;
  href: string;
  cardClass: string;
  Mockup: ComponentType<{ className?: string }>;
};

const RESOURCES: readonly ResourcePillar[] = [
  {
    id: "guides",
    icon: BookOpen,
    iconClass: "text-success",
    iconWrapClass: "bg-success/15",
    title: "Guides",
    points: [
      {
        title: "Step-by-step how-tos",
        body: "Clean a CSV list, verify a single email or integrate the API with clear, task-based walkthroughs.",
      },
      {
        title: "Organized by product",
        body: "Browse guides for the Email Validator, Bulk Verifier, API, Email Finder, Lead Finder and Data Enrichment.",
      },
      {
        title: "Deliverability best practices",
        body: "Lower bounce rates and handle catch-all, role and disposable addresses.",
      },
    ],
    cta: "Browse guides",
    href: "/guides",
    cardClass: "bg-success-soft",
    Mockup: GuidesListMockup,
  },
  {
    id: "integrations",
    icon: Blocks,
    iconClass: "text-primary",
    iconWrapClass: "bg-primary/15",
    title: "Integrations",
    points: [
      {
        title: "Import from where your data lives",
        body: "Google Drive, OneDrive, HubSpot and Salesforce.",
      },
      {
        title: "Verify inside your tools",
        body: "Connect Google Sheets and use the API in any app that can make an HTTP request.",
      },
      {
        title: "Same credits everywhere",
        body: "One balance that never expires across every integration.",
      },
    ],
    cta: "View all integrations",
    href: "/integrations",
    cardClass: "bg-lavender-soft",
    Mockup: IntegrationsTilesMockup,
  },
  {
    id: "blog",
    icon: Newspaper,
    iconClass: "text-primary-deep",
    iconWrapClass: "bg-primary-deep/10",
    title: "Blog",
    points: [
      {
        title: "Product updates",
        body: "New features and releases as they ship.",
      },
      {
        title: "Email tips",
        body: "Practical advice for cold outreach, list hygiene and sender reputation.",
      },
      {
        title: "Deliverability insights",
        body: "Benchmarks, comparisons and buyer guides, such as the 2026 email verifier comparison.",
      },
    ],
    cta: "Read the blog",
    href: "/blog",
    cardClass: "bg-teal-soft",
    Mockup: BlogPostMockup,
  },
];

export default function ResourcesFeatureTabs() {
  const tabsId = useId();
  const [activeId, setActiveId] = useState<ResourceId>("guides");
  const sectionRefs = useRef<Partial<Record<ResourceId, HTMLElement | null>>>(
    {},
  );
  const scrollingRef = useRef(false);

  const scrollToResource = useCallback((id: ResourceId) => {
    const node = sectionRefs.current[id];
    if (!node) return;
    scrollingRef.current = true;
    setActiveId(id);
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      scrollingRef.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    const nodes = RESOURCES.map((resource) => sectionRefs.current[resource.id]).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top) return;
        const id = (top.target as HTMLElement).dataset.resourceId as
          | ResourceId
          | undefined;
        if (id) setActiveId(id);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = RESOURCES.findIndex((resource) => resource.id === activeId);
    if (index < 0) return;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = RESOURCES[(index + 1) % RESOURCES.length];
      scrollToResource(next.id);
      document.getElementById(`${tabsId}-${next.id}`)?.focus();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev = RESOURCES[(index - 1 + RESOURCES.length) % RESOURCES.length];
      scrollToResource(prev.id);
      document.getElementById(`${tabsId}-${prev.id}`)?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToResource(RESOURCES[0].id);
      document.getElementById(`${tabsId}-${RESOURCES[0].id}`)?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      const last = RESOURCES[RESOURCES.length - 1];
      scrollToResource(last.id);
      document.getElementById(`${tabsId}-${last.id}`)?.focus();
    }
  }

  return (
    <SectionShell
      id="resources-features"
      className="bg-background pb-8 md:pb-12 lg:pb-16"
      ariaLabelledBy="resources-features-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow align="center">Resources</SectionEyebrow>
        <SectionHeading id="resources-features-heading" withEyebrow>
          EmailVerifier.io resources to verify emails with confidence
        </SectionHeading>
        <SectionLead className="mx-auto max-w-3xl">
          Learn the workflow, connect your tools and follow deliverability best
          practices.
        </SectionLead>
      </div>

      <div
        className="mx-auto mt-8 flex max-w-xl rounded-full border border-line bg-surface-muted p-1"
        role="tablist"
        aria-label="Resource types"
        onKeyDown={onTabKeyDown}
      >
        {RESOURCES.map((resource) => {
          const selected = resource.id === activeId;
          return (
            <button
              key={resource.id}
              type="button"
              role="tab"
              id={`${tabsId}-${resource.id}`}
              aria-selected={selected}
              aria-controls={`resource-${resource.id}`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "min-h-11 flex-1 rounded-full px-3 text-center text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                selected
                  ? "bg-surface text-ink shadow-[var(--shadow-card)] ring-1 ring-line"
                  : "text-ink-muted hover:text-ink",
              )}
              onClick={() => scrollToResource(resource.id)}
            >
              {resource.title}
            </button>
          );
        })}
      </div>

      <ol className="mt-10 list-none space-y-0 p-0 lg:mt-12">
        {RESOURCES.map((resource, index) => {
          const imageFirst = index % 2 === 1;
          const Icon = resource.icon;

          return (
            <li
              key={resource.id}
              id={`resource-${resource.id}`}
              data-resource-id={resource.id}
              ref={(node) => {
                sectionRefs.current[resource.id] = node;
              }}
              role="tabpanel"
              aria-labelledby={`${tabsId}-${resource.id}`}
              className={cn(
                "relative scroll-mt-36",
                index > 0 && "-mt-4 sm:-mt-5 lg:-mt-6",
              )}
              style={{ zIndex: index + 1 }}
            >
              <article
                className={cn(
                  /* 1-off: 5px white edge so stacked pastel cards separate cleanly */
                  "grid items-center gap-8 rounded-3xl border-[5px] border-surface p-6 shadow-[var(--shadow-card)] sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10",
                  resource.cardClass,
                )}
              >
                <div className={cn("min-w-0", imageFirst && "lg:order-2")}>
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14",
                      resource.iconWrapClass,
                    )}
                    aria-hidden
                  >
                    <Icon
                      className={cn(
                        "h-7 w-7 sm:h-8 sm:w-8",
                        resource.iconClass,
                      )}
                      strokeWidth={1.75}
                    />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                    {resource.title}
                  </h3>
                  <FeaturePointList
                    points={resource.points}
                    idPrefix={`resources-${resource.id}`}
                  />
                  <Button
                    size="lg"
                    asChild
                    className="group mt-6 rounded-lg border border-ink bg-ink text-primary-foreground hover:bg-ink/90 active:bg-ink"
                  >
                    <Link
                      href={resource.href}
                      data-ev-event="resources_feature_cta"
                      data-ev-loc={`resources-${resource.id}`}
                    >
                      {resource.cta}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                        aria-hidden
                      />
                    </Link>
                  </Button>
                </div>

                <div
                  className={cn(
                    "min-w-0",
                    imageFirst ? "lg:order-1 lg:pr-2" : "lg:pl-2",
                  )}
                  aria-hidden
                >
                  <resource.Mockup />
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
