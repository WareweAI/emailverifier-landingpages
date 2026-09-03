import Link from "next/link";
import Image from "next/image";
import HappyUsers from "@/Components/HappyUsers";
import { Button } from "@/Components/ui/Button";
import LogoMark from "@/Components/ui/LogoMark";
import { StarRating } from "@/Components/ui/StarRating";
import type { BlogPost } from "@/lib/wordpress/types";
import type { TocItem } from "@/lib/wordpress/types";
import { ArticleToc } from "./ArticleToc";
import { BlogCta } from "./BlogCta";
import { PostCard } from "./PostCard";
import { Prose } from "./Prose";
import { StickyRail } from "./StickyRail";

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
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div
        data-blog-article-grid
        className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[200px_minmax(0,1fr)_260px] xl:gap-8"
      >
        <aside className="hidden self-start lg:block">
          <ArticleToc items={toc} variant="desktop" />
        </aside>

        <article className="min-w-0" data-blog-article-main>
          <header>
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

            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
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

        <StickyRail className="hidden min-w-0 self-start xl:block">
            <LogoMark />
            <p className="mt-4 text-base font-bold text-ink">
              Try EmailVerifier
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Bulk email verifier + API. 100 free credits, no card.
            </p>
            <Button asChild size="md" className="mt-5 w-full">
              <Link href="/validate-email">Verify emails free</Link>
            </Button>
            <div
              className="mt-5 space-y-3 border-t border-line pt-5"
              aria-label="Capterra 4.8 rating from 1000+ happy users"
            >
              <div className="flex items-center gap-1.5">
                <Image
                  src="/assets/capterra.svg"
                  alt="Capterra logo"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
                <div className="flex flex-col leading-none text-left">
                  <span className="text-xs font-semibold text-ink">
                    Capterra
                  </span>
                  <div className="mt-0.5 flex items-center gap-0.5 text-[10px] text-ink-muted">
                    <span className="font-medium">4.8</span>
                    <StarRating rating={4.8} size={11} activeColor="#fdc700" />
                    <span>Rating</span>
                  </div>
                </div>
              </div>
              <HappyUsers className="justify-start" compact />
            </div>
        </StickyRail>
      </div>

      {related.length > 0 ? (
        <section className="mt-16 border-t border-line pt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">
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
