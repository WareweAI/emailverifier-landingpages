import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getGuideProduct,
  type Guide,
} from "@/lib/guides";

type GuideCardProps = {
  guide: Guide;
  featured?: boolean;
};

export function GuideCard({ guide, featured = false }: GuideCardProps) {
  const product = getGuideProduct(guide.product);
  const href = `/guides/${guide.slug}`;

  return (
    <article
      className={
        featured
          ? "flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] md:flex-row"
          : "flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition hover:border-primary/40 focus-within:border-primary/40"
      }
    >
      <Link
        href={href}
        className={
          featured
            ? "relative block aspect-[16/10] shrink-0 md:w-1/2"
            : "relative block aspect-[16/10]"
        }
      >
        <Image
          src={guide.image.url}
          alt={guide.image.alt}
          fill
          className="object-cover"
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          unoptimized={guide.image.url.endsWith(".svg")}
        />
      </Link>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          <span className="font-medium text-primary">{product.name}</span>
          <span aria-hidden>·</span>
          <span>{guide.readTimeMinutes} min read</span>
        </div>

        <h2
          className={
            featured
              ? "mt-3 font-display text-2xl font-semibold text-ink md:text-3xl"
              : "mt-3 font-display text-xl font-semibold text-ink"
          }
        >
          <Link
            href={href}
            className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {guide.title}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-ink-muted">{guide.excerpt}</p>

        <Link
          href={href}
          className="mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Read guide
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
