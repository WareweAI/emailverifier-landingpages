import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "@/Components/blog/BlogCta";
import { CategoryNav } from "@/Components/blog/CategoryNav";
import { Pagination } from "@/Components/blog/Pagination";
import { PostCard } from "@/Components/blog/PostCard";
import { PostGrid } from "@/Components/blog/PostGrid";
import { SearchForm } from "@/Components/blog/SearchForm";
import JsonLd, {
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { getCategories, getPosts } from "@/lib/wordpress";

export const metadata: Metadata = buildMetadata({
  title: "Email Verifier Blog — List Cleaning & API Guides",
  description:
    "Practical guides from EmailVerifier.io: how to use an email verifier, run a bulk email verifier, and integrate the email verification API.",
  path: "/blog",
  imageAlt: "Email verifier blog — list cleaning and API guides",
});

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const [categories, result] = await Promise.all([
    getCategories(),
    getPosts({ page, perPage: 9 }),
  ]);

  const featured = page === 1 ? result.items[0] : undefined;
  const gridPosts = page === 1 ? result.items.slice(1) : result.items;

  return (
    <main id="main-page">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-primary">Blog</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Email verifier guides for cleaner lists
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Learn how to email verify single addresses, run a bulk email
            verifier on CSV lists, and ship with the email verification API —
            without inventing accuracy claims. Same credits for bulk and API;
            100 free on signup.
          </p>
        </header>

        <div className="mt-8 max-w-xl">
          <SearchForm />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          <aside>
            <CategoryNav categories={categories} />
          </aside>

          <div>
            {featured ? (
              <div className="mb-10">
                <p className="mb-4 text-sm font-semibold text-ink">
                  Must read
                </p>
                <PostCard post={featured} featured />
              </div>
            ) : null}

            {gridPosts.length > 0 ? (
              <>
                <p className="mb-4 text-sm font-semibold text-ink">
                  {page === 1 ? "Latest articles" : `Page ${page}`}
                </p>
                <PostGrid posts={gridPosts} />
              </>
            ) : !featured ? (
              <PostGrid
                posts={[]}
                emptyMessage="No articles yet. Check back soon."
              />
            ) : null}

            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              basePath="/blog"
            />

            <BlogCta />
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-ink-muted">
          Prefer to try first?{" "}
          <Link href="/validate-email" className="text-primary hover:underline">
            Free email verifier
          </Link>
        </p>
      </div>
    </main>
  );
}
