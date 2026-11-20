import Link from "next/link";
import { ArrowRight, Blocks, Newspaper } from "lucide-react";
import { SectionEyebrow } from "@/Components/ui/SectionHeading";

const RESOURCES = [
  {
    href: "/integrations",
    title: "Integrations",
    description:
      "Import lists from Drive, HubSpot, Salesforce, and other tools you already use.",
    icon: Blocks,
  },
  {
    href: "/blog",
    title: "Blog",
    description:
      "Product updates, email tips, and deliverability insights - newsletter-style.",
    icon: Newspaper,
  },
] as const;

export function RelatedResources() {
  return (
    <section aria-labelledby="related-resources-heading">
      <SectionEyebrow>Resources</SectionEyebrow>
      <h2
        id="related-resources-heading"
        className="mt-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Related resources
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {RESOURCES.map((resource) => {
          const Icon = resource.icon;
          return (
            <li key={resource.href}>
              <Link
                href={resource.href}
                className="flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/40 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 font-display text-lg font-semibold text-ink">
                    {resource.title}
                    <ArrowRight className="h-4 w-4 text-primary" aria-hidden />
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {resource.description}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
