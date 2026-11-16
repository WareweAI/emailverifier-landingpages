import Link from "next/link";
import { ResourcesHeroPreview } from "@/Components/resources/ResourcesMockups";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";

const RESOURCES = [
  { title: "Guides", href: "/guides" },
  { title: "Integrations", href: "/integrations" },
  { title: "Blog", href: "/blog" },
] as const;

export default function ResourcesHeroVisual() {
  return (
    <article
      className="flex h-full flex-col rounded-3xl border-[5px] border-surface bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6"
      aria-label="Resource types"
    >
      <ul className="flex list-none flex-wrap gap-2 p-0">
        {RESOURCES.map((resource) => (
          <li key={resource.href}>
            <Link
              href={resource.href}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface-muted px-3 text-sm font-medium text-ink transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {resource.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-5 min-w-0">
        <DesktopMockup chromeLabel="emailverifier.io/resources" compact>
          <ResourcesHeroPreview />
        </DesktopMockup>
      </div>
    </article>
  );
}
