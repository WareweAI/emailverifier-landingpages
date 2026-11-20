import Link from "next/link";
import Image from "next/image";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { SectionEyebrow } from "@/Components/ui/SectionHeading";
import type { BlogPost } from "@/lib/wordpress/types";
import type { TocItem } from "@/lib/wordpress/types";
import { ArticleToc } from "./ArticleToc";
import { BlogCta } from "./BlogCta";
import { PostCard } from "./PostCard";
import { Prose } from "./Prose";
import { TryEmailVerifierSticky } from "./TryEmailVerifierSticky";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

type ArticleLayoutProps = {
  post: BlogPost;
  contentHtml: string;
  toc: TocItem[];
  related: BlogPost[];
};

export function ArticleLayout({
  post,
  contentHtml,
  toc,
  related,
}: ArticleLayoutProps) {
  const category = post.categories[0];
  const image = post.featuredImage;

  return (
    <div className="site-container py-12 lg:py-16">
      <div
        data-blog-article-grid
        className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[200px_minmax(0,1fr)_260px] xl:gap-8"
      >
        <aside className="hidden self-start lg:block">
          <ArticleToc items={toc} variant="desktop" />
        </aside>

        <article className="min-w-0" data-blog-article-main>
          <header>
            <PageBreadcrumb
              className="mb-4"
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                ...(category
                  ? [
                      {
                        label: category.name,
                        href: `/blog/category/${category.slug}`,
                      },
                    ]
                  : []),
                { label: post.title },
              ]}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
              {category ? (
                <Link
                  href={`/blog/category/${category.slug}`}
                  className="font-medium text-primary hover:underline"
                >
                  {category.name}
                </Link>
              ) : null}
              <time dateTime={post.modified || post.date}>
                Updated {formatDate(post.modified || post.date)}
              </time>
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold capitalize tracking-tight text-ink md:text-4xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-ink-muted">{post.excerpt}</p>

            <p className="mt-6 text-sm text-ink-muted">
              Written by{" "}
              <Link
                href={`/blog/author/${post.author.slug}`}
                className="font-medium text-ink hover:text-primary"
              >
                {post.author.name}
              </Link>
            </p>
          </header>

          {image ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface-muted">
              <Image
                src={image.url}
                alt={image.alt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
                unoptimized={image.url.endsWith(".svg")}
              />
            </div>
          ) : null}

          <div className="mt-6 lg:hidden">
            <ArticleToc items={toc} variant="mobile" />
          </div>

          <Prose html={contentHtml} className="mt-10" />

          <BlogCta variant="inline" />

          {post.categories.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-8">
              {post.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-3 text-sm text-ink-muted transition hover:border-primary hover:text-primary"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          ) : null}
        </article>

        <TryEmailVerifierSticky />
      </div>

      {related.length > 0 ? (
        <section className="mt-16 border-t border-line pt-12">
          <SectionEyebrow>Related</SectionEyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
