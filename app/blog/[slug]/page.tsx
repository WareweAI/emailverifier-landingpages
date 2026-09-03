import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/Components/blog/ArticleLayout";
import JsonLd, {
  articleJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/Components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/wordpress";
import { sanitizeHtml } from "@/lib/wordpress/sanitize";
import { extractToc } from "@/lib/wordpress/toc";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return buildMetadata({
      title: "Article not found",
      description: "This blog post could not be found.",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt.slice(0, 160),
    path: `/blog/${post.slug}`,
    imageAlt: post.featuredImage?.alt || post.title,
    ogImage: post.featuredImage?.url,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);
  const { html, items: toc } = extractToc(post.contentHtml);
  const contentHtml = sanitizeHtml(html);

  const category = post.categories[0];

  return (
    <main id="main-page">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          ...(category
            ? [
                {
                  name: category.name,
                  path: `/blog/category/${category.slug}`,
                },
              ]
            : []),
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd data={articleJsonLd(post)} />
      <ArticleLayout
        post={post}
        contentHtml={contentHtml}
        toc={toc}
        related={related}
      />
    </main>
  );
}
