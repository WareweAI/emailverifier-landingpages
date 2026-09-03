import type {
  BlogAuthor,
  BlogCategory,
  BlogImage,
  BlogPost,
} from "./types";

type WpRendered = { rendered: string; protected?: boolean };

type WpEmbedded = {
  author?: Array<{
    id: number;
    name: string;
    slug: string;
    description?: string;
    avatar_urls?: Record<string, string>;
  }>;
  "wp:featuredmedia"?: Array<{
    source_url?: string;
    alt_text?: string;
    media_details?: { width?: number; height?: number };
  }>;
  "wp:term"?: Array<
    Array<{
      id: number;
      name: string;
      slug: string;
      description?: string;
      count?: number;
      taxonomy: string;
    }>
  >;
};

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: WpRendered;
  excerpt: WpRendered;
  content: WpRendered;
  _embedded?: WpEmbedded;
};

export type WpCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
};

export type WpUser = {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_urls?: Record<string, string>;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function pickAvatar(urls?: Record<string, string>): string | undefined {
  if (!urls) return undefined;
  return urls["96"] ?? urls["48"] ?? Object.values(urls)[0];
}

export function normalizeCategory(raw: WpCategory): BlogCategory {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description ?? "",
    count: raw.count ?? 0,
  };
}

export function normalizeAuthor(raw: WpUser): BlogAuthor {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description ?? "",
    avatarUrl: pickAvatar(raw.avatar_urls),
  };
}

function featuredImage(embedded?: WpEmbedded): BlogImage | undefined {
  const media = embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return undefined;
  return {
    url: media.source_url,
    alt: media.alt_text || "",
    width: media.media_details?.width,
    height: media.media_details?.height,
  };
}

function categoriesFromEmbed(embedded?: WpEmbedded): BlogCategory[] {
  const termGroups = embedded?.["wp:term"] ?? [];
  const cats: BlogCategory[] = [];
  for (const group of termGroups) {
    for (const term of group) {
      if (term.taxonomy === "category") {
        cats.push({
          id: term.id,
          name: term.name,
          slug: term.slug,
          description: term.description ?? "",
          count: term.count ?? 0,
        });
      }
    }
  }
  return cats;
}

function authorFromEmbed(embedded?: WpEmbedded): BlogAuthor {
  const a = embedded?.author?.[0];
  if (!a) {
    return {
      id: 0,
      name: "EmailVerifier.io",
      slug: "emailverifier",
      description: "",
    };
  }
  return {
    id: a.id,
    name: a.name,
    slug: a.slug,
    description: a.description ?? "",
    avatarUrl: pickAvatar(a.avatar_urls),
  };
}

export function normalizePost(raw: WpPost): BlogPost {
  return {
    id: raw.id,
    slug: raw.slug,
    title: stripHtml(raw.title?.rendered ?? ""),
    excerpt: stripHtml(raw.excerpt?.rendered ?? ""),
    contentHtml: raw.content?.rendered ?? "",
    date: raw.date,
    modified: raw.modified,
    featuredImage: featuredImage(raw._embedded),
    categories: categoriesFromEmbed(raw._embedded),
    author: authorFromEmbed(raw._embedded),
  };
}
