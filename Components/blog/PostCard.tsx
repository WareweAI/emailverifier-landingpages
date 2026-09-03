import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/wordpress/types";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

type PostCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  const category = post.categories[0];
  const image = post.featuredImage;

  return (
    <article
      className={
        featured
          ? "flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] md:flex-row"
          : "flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]"
      }
    >
      {image ? (
        <Link
          href={`/blog/${post.slug}`}
          className={
            featured
              ? "relative block aspect-[16/10] shrink-0 md:w-1/2"
              : "relative block aspect-[16/10]"
          }
        >
          <Image
            src={image.url}
            alt={image.alt || post.title}
            fill
            className="object-cover"
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            unoptimized={image.url.endsWith(".svg")}
          />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          {category ? (
            <Link
              href={`/blog/category/${category.slug}`}
              className="font-medium text-primary hover:underline"
            >
              {category.name}
            </Link>
          ) : null}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        <h2
          className={
            featured
              ? "mt-3 font-display text-2xl font-semibold text-ink md:text-3xl"
              : "mt-3 font-display text-xl font-semibold text-ink"
          }
        >
          <Link
            href={`/blog/${post.slug}`}
            className="transition hover:text-primary"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-ink-muted">{post.excerpt}</p>

        <p className="mt-4 text-sm text-ink-muted">
          By{" "}
          <Link
            href={`/blog/author/${post.author.slug}`}
            className="font-medium text-ink hover:text-primary"
          >
            {post.author.name}
          </Link>
        </p>
      </div>
    </article>
  );
}
