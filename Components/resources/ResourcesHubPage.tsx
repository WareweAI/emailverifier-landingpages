import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import CTA from "@/Components/CTA";
import { Reveal } from "@/Components/landing/Reveal";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import {
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";

type ResourceCard = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

type ResourceCategory = {
  id: string;
  label: string;
  description: string;
  resources: readonly ResourceCard[];
};

const CATEGORIES: readonly ResourceCategory[] = [
  {
    id: "library",
    label: "Guides, integrations & blog",
    description:
      "Learn list cleaning, connect your tools, and follow deliverability tips so you can email verify with confidence before you send.",
    resources: [
      {
        title: "Guides",
        href: "/guides",
        description:
          "Step-by-step how-tos for cleaning lists, verifying a single email, and using the email verification API.",
        icon: BookOpen,
      },
      {
        title: "Integrations",
        href: "/integrations",
        description:
          "Import from Google Drive, OneDrive, HubSpot, and Salesforce on the same credits that never expire.",
        icon: Blocks,
      },
      {
        title: "Blog",
        href: "/blog",
        description:
          "Product updates, outreach tips, and benchmarks for teams that rely on a bulk email verifier.",
        icon: Newspaper,
      },
    ],
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
        className="relative pt-10 pb-6 md:pt-14 md:pb-8"
        aria-labelledby="resources-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Resources" },
            ]}
          />
          <h1
            id="resources-heading"
            className="max-w-3xl text-balance font-display text-3xl font-semibold leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Resources
          </h1>
        </div>
      </section>

      {CATEGORIES.map((category) => (
        <SectionShell
          key={category.id}
          id={category.id}
          className="bg-background py-12 md:py-16 lg:py-20"
          ariaLabelledBy={`${category.id}-heading`}
        >
          <SectionHeading id={`${category.id}-heading`} withEyebrow>
            {category.label}
          </SectionHeading>
          <SectionLead className="max-w-2xl">
            {category.description}
          </SectionLead>

          <Reveal className="mt-8" staggerSelector="[data-resource-card]">
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {category.resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <li key={resource.href} className="min-w-0">
                    <Link
                      href={resource.href}
                      data-resource-card
                      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-md bg-primary-soft text-primary">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.6}
                          aria-hidden
                        />
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-ink">
                        {resource.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                        {resource.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        View resource
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
      ))}

      <CTA />
    </main>
  );
}
