import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCta } from "@/Components/blog/BlogCta";
import { Pagination } from "@/Components/blog/Pagination";
import { PostGrid } from "@/Components/blog/PostGrid";
import JsonLd, {
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import {
  getAllAuthorSlugs,
  getAuthorBySlug,
  getPostsByAuthor,
} from "@/lib/wordpress";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) {
    return buildMetadata({
      title: "Author not found",
      description: "This author could not be found.",
      path: `/blog/author/${slug}`,
    });
  }

  return buildMetadata({
    title: `${author.name} — Email Verifier Blog`,
    description:
      author.description ||
      `Articles by ${author.name} on the EmailVerifier.io email verifier blog.`,
    path: `/blog/author/${author.slug}`,
    imageAlt: `${author.name} — email verifier blog author`,
  });
}

export default async function BlogAuthorPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const result = await getPostsByAuthor(author.id, { page, perPage: 9 });

  return (
    <main id="main-page">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: author.name, path: `/blog/author/${author.slug}` },
        ])}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-start">
          {author.avatarUrl ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line bg-surface-muted">
              <Image
                src={author.avatarUrl}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
                unoptimized={author.avatarUrl.endsWith(".svg")}
              />
            </div>
          ) : null}
          <div>
            <p className="text-sm font-medium text-primary">
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>{" "}
              / Author
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {author.name}
            </h1>
            {author.description ? (
              <p className="mt-4 text-lg text-ink-muted">
                {author.description}
              </p>
            ) : null}
          </div>
        </header>

        <div className="mt-12">
          <PostGrid
            posts={result.items}
            emptyMessage="No articles from this author yet."
          />
          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            basePath={`/blog/author/${author.slug}`}
          />
          <BlogCta />
        </div>
      </div>
    </main>
  );
}
