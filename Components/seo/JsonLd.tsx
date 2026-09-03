type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EmailVerifier.io",
    url: "https://emailverifier.io",
    logo: "https://emailverifier.io/og-image.jpg",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@emailverifier.io",
      contactType: "customer support",
    },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EmailVerifier.io",
    alternateName: "Email Verifier",
    description:
      "Email verifier for bulk CSV cleaning and real-time API checks.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "1.80",
      priceCurrency: "USD",
      description: "Per 1,000 email verifications",
    },
    url: "https://emailverifier.io",
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://emailverifier.io${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
  featuredImage?: { url: string };
  author: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "EmailVerifier.io",
      logo: {
        "@type": "ImageObject",
        url: "https://emailverifier.io/og-image.jpg",
      },
    },
    image: post.featuredImage?.url
      ? post.featuredImage.url.startsWith("http")
        ? post.featuredImage.url
        : `https://emailverifier.io${post.featuredImage.url}`
      : "https://emailverifier.io/og-image.jpg",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://emailverifier.io/blog/${post.slug}`,
    },
  };
}
