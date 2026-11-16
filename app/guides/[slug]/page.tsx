import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TryEmailVerifierSticky } from "@/Components/blog/TryEmailVerifierSticky";
import CTA from "@/Components/CTA";
import { Button } from "@/Components/ui/Button";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import JsonLd, {
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { REGISTER_URL } from "@/lib/api-snippet";
import {
  GUIDES,
  getGuideBySlug,
  getGuideProduct,
} from "@/lib/guides";
import { buildMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return buildMetadata({
      title: "Guide not found",
      description: "This email verifier guide could not be found.",
      path: `/guides/${slug}`,
    });
  }

  return buildMetadata({
    title: `${guide.title} | EmailVerifier.io`,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
    imageAlt: guide.image.alt,
  });
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const product = getGuideProduct(guide.product);

  return (
    <main id="main-page">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ])}
      />

      <div className="site-container py-12 lg:py-16">
        <div
          data-blog-article-grid
          className="xl:grid xl:grid-cols-[minmax(0,1fr)_260px] xl:gap-8"
        >
          <article className="min-w-0" data-blog-article-main>
            <PageBreadcrumb
              className="mb-6"
              items={[
                { label: "Home", href: "/" },
                { label: "Resources" },
                { label: "Guides", href: "/guides" },
                { label: guide.title },
              ]}
            />

            <header className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
                <Link
                  href={`/guides?product=${product.slug}`}
                  className="font-medium text-primary hover:underline"
                >
                  {product.name}
                </Link>
                <span aria-hidden>·</span>
                <span>{guide.readTimeMinutes} min read</span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {guide.title}
              </h1>
              <p className="mt-4 text-lg text-ink-muted">{guide.excerpt}</p>
            </header>

            <div className="relative mt-8 aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
              <Image
                src={guide.image.url}
                alt={guide.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 768px"
                unoptimized={guide.image.url.endsWith(".svg")}
                priority
              />
            </div>

            <div className="mt-10 max-w-3xl space-y-8">
              <p className="text-ink">
                This email verifier how-to keeps claims aligned with
                EmailVerifier.io: 100 free credits on signup (no card), $1.80
                per 1,000 thereafter, credits that never expire, and a 99.7%
                deliverability guarantee (terms apply). Same wallet for bulk and
                the email verification API.
              </p>

              {guide.steps.map((step, index) => (
                <section key={step.heading}>
                  <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    <span className="mr-2 text-primary">{index + 1}.</span>
                    {step.heading}
                  </h2>
                  <p className="mt-3 text-ink-muted">{step.body}</p>
                </section>
              ))}

              <aside className="rounded-2xl border border-line bg-primary-soft p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold text-ink">
                  Ready to email verify?
                </h2>
                <p className="mt-2 text-ink-muted">
                  Get 100 free credits — no credit card. Or open{" "}
                  {product.name.toLowerCase()} and try the workflow from this
                  guide.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={REGISTER_URL}>Get 100 Free Credits</a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href={product.href}>Open {product.name}</Link>
                  </Button>
                </div>
              </aside>

              <p className="text-sm text-ink-muted">
                <Link href="/guides" className="text-primary hover:underline">
                  ← All guides
                </Link>
              </p>
            </div>
          </article>

          <TryEmailVerifierSticky />
        </div>
      </div>

      <CTA />
    </main>
  );
}
