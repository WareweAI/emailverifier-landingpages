import type { Metadata } from "next";
import Link from "next/link";
import CTA from "@/Components/CTA";
import { GoalChips } from "@/Components/guides/GoalChips";
import { GuideCard } from "@/Components/guides/GuideCard";
import { GuideGrid } from "@/Components/guides/GuideGrid";
import { GuidesSearchForm } from "@/Components/guides/GuidesSearchForm";
import { ProductBrowse } from "@/Components/guides/ProductBrowse";
import { QuickStarts } from "@/Components/guides/QuickStarts";
import { RelatedResources } from "@/Components/guides/RelatedResources";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import JsonLd, {
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import {
  GUIDE_GOALS,
  GUIDE_PRODUCTS,
  filterGuides,
  getFeaturedGuide,
  type GuideFilters,
} from "@/lib/guides";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title:
    "Email Verification Guides — How-Tos for List Cleaning & API | EmailVerifier.io",
  description:
    "Step-by-step email verifier guides: clean lists with a bulk email verifier, email verify single addresses, and integrate the email verification API. 100 free credits.",
  path: "/guides",
  imageAlt:
    "Email verifier guides for list cleaning, bulk verification, and API how-tos",
});

type PageProps = {
  searchParams: Promise<{ product?: string; goal?: string; q?: string }>;
};

function isKnownProduct(value: string | undefined): value is string {
  return Boolean(value && GUIDE_PRODUCTS.some((p) => p.slug === value));
}

function isKnownGoal(value: string | undefined): value is string {
  return Boolean(value && GUIDE_GOALS.some((g) => g.slug === value));
}

export default async function GuidesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters: GuideFilters = {
    product: isKnownProduct(params.product) ? params.product : undefined,
    goal: isKnownGoal(params.goal) ? params.goal : undefined,
    q: params.q?.trim() || undefined,
  };

  const filtered = filterGuides(filters);
  const hasActiveFilters = Boolean(filters.product || filters.goal || filters.q);
  const featured = !hasActiveFilters
    ? getFeaturedGuide()
    : filtered.find((g) => g.featured) ?? filtered[0];
  const gridGuides = featured
    ? filtered.filter((g) => g.slug !== featured.slug)
    : filtered;

  const activeProductName = filters.product
    ? GUIDE_PRODUCTS.find((p) => p.slug === filters.product)?.name
    : undefined;

  return (
    <main id="main-page">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources" },
          { name: "Guides", path: "/guides" },
        ])}
      />

      <div className="site-container py-12 lg:py-16">
        <PageBreadcrumb
          className="mb-6"
          items={[
            { label: "Home", href: "/" },
            { label: "Resources" },
            { label: "Guides" },
          ]}
        />

        <header className="max-w-3xl">
          <p className="text-sm font-medium text-primary">Guides</p>
          <h1 className="mt-2 font-display text-3xl font-semibold capitalize tracking-tight text-ink md:text-4xl">
            Email verification guides
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Step-by-step how-tos for cleaning lists, finding leads and
            integrating the API. Use this email verifier library when you need
            evergreen tasks — not product news. Start free with 100 credits
            (no card); packs are $1.80 per 1,000 and never expire.
          </p>
        </header>

        <div className="mt-8 max-w-xl">
          <GuidesSearchForm
            initialQuery={filters.q ?? ""}
            product={filters.product}
            goal={filters.goal}
          />
        </div>

        <div className="mt-14">
          <ProductBrowse activeProduct={filters.product} />
        </div>

        <div className="mt-12">
          <GoalChips filters={filters} />
        </div>

        {featured ? (
          <div className="mt-12">
            <p className="mb-4 text-sm font-semibold text-ink">
              {hasActiveFilters ? "Top match" : "Featured guide"}
            </p>
            <GuideCard guide={featured} featured />
          </div>
        ) : null}

        <div className="mt-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <p className="text-sm font-semibold text-ink">
              {activeProductName
                ? `${activeProductName} guides`
                : hasActiveFilters
                  ? "Matching guides"
                  : "All guides"}
            </p>
            {hasActiveFilters ? (
              <Link
                href="/guides"
                className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Clear filters
              </Link>
            ) : null}
          </div>
          {filtered.length === 0 ? (
            <GuideGrid
              guides={[]}
              emptyMessage="No guides match these filters. Clear filters or try another search."
            />
          ) : gridGuides.length > 0 ? (
            <GuideGrid guides={gridGuides} />
          ) : null}
        </div>

        {!hasActiveFilters ? (
          <div className="mt-14">
            <QuickStarts />
          </div>
        ) : null}

        <div className="mt-14">
          <RelatedResources />
        </div>

        <p className="mt-10 text-center text-sm text-ink-muted">
          Prefer to try first?{" "}
          <Link href="/validate-email" className="text-primary hover:underline">
            Free email verifier
          </Link>
        </p>
      </div>

      <CTA />
    </main>
  );
}
