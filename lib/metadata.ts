import type { Metadata } from "next";

const SITE_NAME = "EmailVerifier.io";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  imageAlt?: string;
  /** Override default OG/Twitter image (e.g. WordPress featured media). */
  ogImage?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  imageAlt = "Email verifier — bulk list cleaning and real-time API",
  ogImage,
}: BuildMetadataOptions): Metadata {
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;

  const imageUrl = ogImage || DEFAULT_OG_IMAGE;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
