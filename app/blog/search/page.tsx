import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "@/Components/blog/BlogCta";
import { CategoryNav } from "@/Components/blog/CategoryNav";
import { Pagination } from "@/Components/blog/Pagination";
import { PostGrid } from "@/Components/blog/PostGrid";
import { SearchForm } from "@/Components/blog/SearchForm";
import JsonLd, {
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { getCategories, searchPosts } from "@/lib/wordpress";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  return buildMetadata({
    title: q
      ? `Search: ${q} — Email Verifier Blog`
      : "Search — Email Verifier Blog",
    description: q
      ? `Search results for “${q}” on the EmailVerifier.io email verifier blog.`
      : "Search EmailVerifier.io guides on list cleaning, bulk email verifier tips, and the email verification API.",
    path: q ? `/blog/search?q=${encodeURIComponent(q)}` : "/blog/search",
    imageAlt: "Search the email verifier blog",
  });
}

export default async function BlogSearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const page = Math.max(1, Number(sp.page) || 1);

  const [categories, result] = await Promise.all([
    getCategories(),
    searchPosts(q, { page, perPage: 9 }),
  ]);

  return (
    <main id="main-page">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: "Search", path: "/blog/search" },
        ])}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-primary">
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>{" "}
            / Search
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {q ? `Results for “${q}”` : "Search the blog"}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Find email verifier guides, bulk list-cleaning tips, and email
            verification API notes.
          </p>
        </header>

        <div className="mt-8 max-w-xl">
          <SearchForm initialQuery={q} />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          <aside>
            <CategoryNav categories={categories} />
          </aside>
          <div>
            {!q ? (
              <p className="rounded-2xl border border-line bg-surface p-8 text-center text-ink-muted">
                Enter a search term to find articles.
              </p>
            ) : (
              <>
                <p className="mb-4 text-sm text-ink-muted">
                  {result.total}{" "}
                  {result.total === 1 ? "result" : "results"}
                </p>
                <PostGrid
                  posts={result.items}
                  emptyMessage={`No articles matched “${q}”.`}
                />
                <Pagination
                  page={result.page}
                  totalPages={result.totalPages}
                  basePath="/blog/search"
                  searchParams={{ q }}
                />
              </>
            )}
            <BlogCta />
          </div>
        </div>
      </div>
    </main>
  );
}
