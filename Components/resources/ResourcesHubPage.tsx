import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Blocks,
  Newspaper,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import CTA from "@/Components/CTA";
import { TrustStatsRow } from "@/Components/home/HomeStatsStrip";
import { HeroAsSeenOn } from "@/Components/home/ProofBar";
import { Reveal } from "@/Components/landing/Reveal";
import ResourcesFeatureTabs from "@/Components/resources/ResourcesFeatureTabs";
import ResourcesHeroVisual from "@/Components/resources/ResourcesHeroVisual";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { SectionShell } from "@/Components/ui/SectionShell";

type StarterCard = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  resourceLabel: string;
};

const STARTERS: readonly StarterCard[] = [
  {
    title: "Learn to clean a list",
    href: "/guides",
    description:
      "Follow a step-by-step walkthrough to remove invalid, disposable and catch-all emails.",
    icon: BookOpen,
    resourceLabel: "Guides",
  },
  {
    title: "Connect your tools",
    href: "/integrations",
    description:
      "Import lists from Drive, HubSpot or Salesforce without juggling downloads.",
    icon: Blocks,
    resourceLabel: "Integrations",
  },
  {
    title: "Compare verifiers",
    href: "/blog/best-email-verification-tools-2026",
    description:
      "See how bulk cleaning and API pricing stack up in 2026.",
    icon: Newspaper,
    resourceLabel: "Blog",
  },
  {
    title: "Stay on top of deliverability",
    href: "/blog",
    description:
      "Product updates and tips to keep bounce rates under 2%.",
    icon: ShieldCheck,
    resourceLabel: "Blog",
  },
];

export default function ResourcesHubPage() {
  return (
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="resources-heading"
    >
      <section
        className="relative pt-10 pb-6 md:pt-14 md:pb-8 lg:pb-8"
        aria-labelledby="resources-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="order-1 flex w-full min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
              <PageBreadcrumb
                className="mb-6 w-full"
                items={[
                  { label: "Home", href: "/" },
                  { label: "Resources" },
                ]}
              />
              <h1
                id="resources-heading"
                className="text-balance font-display text-3xl font-semibold leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
              >
                Everything you need to learn, connect and stay ahead with{" "}
                <span className="text-primary">email verification</span>
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-muted">
                Guides, integrations and insights to clean lists, protect
                deliverability and get more from your credits.
              </p>
              <HeroAsSeenOn className="mt-8 max-w-2xl [&_ul]:justify-center lg:[&_ul]:justify-start" />
            </div>

            <div className="order-2 w-full min-w-0">
              <ResourcesHeroVisual />
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <div
              className="h-px bg-linear-to-r from-transparent via-line to-transparent"
              aria-hidden
            />
            <div className="pt-8 pb-2 md:pt-10 md:pb-3">
              <TrustStatsRow />
            </div>
          </div>
        </div>
      </section>

      <ResourcesFeatureTabs />

      <SectionShell
        className="bg-background"
        ariaLabelledBy="resources-starters-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="resources-starters-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Not sure where to start?
          </h2>
          <p className="mt-3 text-ink-muted">
            Pick the job, open the resource, then email verify before you send.
          </p>
        </div>
        <Reveal className="mt-10" staggerSelector="[data-starter]">
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {STARTERS.map((starter) => {
              const Icon = starter.icon;
              return (
                <li key={starter.title} className="min-w-0">
                  <Link
                    href={starter.href}
                    data-starter
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {starter.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                      {starter.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      {starter.resourceLabel}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </SectionShell>

      <CTA />
    </main>
  );
}
