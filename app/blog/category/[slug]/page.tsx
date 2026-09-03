import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import {
  getAllCategorySlugs,
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/lib/wordpress";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return buildMetadata({
      title: "Category not found",
      description: "This blog category could not be found.",
      path: `/blog/category/${slug}`,
    });
  }

  return buildMetadata({
    title: `${category.name} — Email Verifier Blog`,
    description:
      category.description ||
      `Articles about ${category.name} from the EmailVerifier.io email verifier blog.`,
    path: `/blog/category/${category.slug}`,
    imageAlt: `${category.name} — email verifier guides`,
  });
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [categories, result] = await Promise.all([
    getCategories(),
    getPostsByCategory(category.id, { page, perPage: 9 }),
  ]);

  return (
    <main id="main-page">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          {
            name: category.name,
            path: `/blog/category/${category.slug}`,
          },
        ])}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-primary">
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>{" "}
            / Category
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {category.name}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            {category.description ||
              `Guides and notes on ${category.name} for teams using an email verifier.`}
          </p>
        </header>

        <div className="mt-8 max-w-xl">
          <SearchForm />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          <aside>
            <CategoryNav categories={categories} activeSlug={category.slug} />
          </aside>
          <div>
            <PostGrid
              posts={result.items}
              emptyMessage="No articles in this category yet."
            />
            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              basePath={`/blog/category/${category.slug}`}
            />
            <BlogCta />
          </div>
        </div>
      </div>
    </main>
  );
}
