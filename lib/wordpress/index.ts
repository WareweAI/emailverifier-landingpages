import { wpFetch } from "./client";
import {
  MOCK_AUTHORS,
  MOCK_CATEGORIES,
  MOCK_POSTS,
} from "./mock";
import {
  normalizeAuthor,
  normalizeCategory,
  normalizePost,
  type WpCategory,
  type WpPost,
  type WpUser,
} from "./normalize";
import type {
  BlogAuthor,
  BlogCategory,
  BlogPost,
  PaginatedResult,
} from "./types";

const DEFAULT_PER_PAGE = 9;

function paginate<T>(
  items: T[],
  page: number,
  perPage: number,
): PaginatedResult<T> {
  const safePage = Math.max(1, page);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    perPage,
    total,
    totalPages,
  };
}

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function mockPostsFiltered(opts: {
  categoryId?: number;
  authorId?: number;
  search?: string;
}): BlogPost[] {
  let posts = sortByDateDesc(MOCK_POSTS);
  if (opts.categoryId !== undefined) {
    posts = posts.filter((p) =>
      p.categories.some((c) => c.id === opts.categoryId),
    );
  }
  if (opts.authorId !== undefined) {
    posts = posts.filter((p) => p.author.id === opts.authorId);
  }
  if (opts.search?.trim()) {
    const q = opts.search.trim().toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.contentHtml.toLowerCase().includes(q),
    );
  }
  return posts;
}

export async function getPosts(options?: {
  page?: number;
  perPage?: number;
}): Promise<PaginatedResult<BlogPost>> {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? DEFAULT_PER_PAGE;

  const result = await wpFetch<WpPost[]>("posts", {
    _embed: "1",
    page,
    per_page: perPage,
    status: "publish",
  });

  if (!result.ok) {
    return paginate(sortByDateDesc(MOCK_POSTS), page, perPage);
  }

  return {
    items: result.data.map(normalizePost),
    page,
    perPage,
    total: result.total ?? result.data.length,
    totalPages: result.totalPages ?? 1,
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const result = await wpFetch<WpPost[]>("posts", {
    slug,
    _embed: "1",
    status: "publish",
  });

  if (!result.ok) {
    return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
  }

  const first = result.data[0];
  return first ? normalizePost(first) : null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const result = await wpFetch<WpPost[]>("posts", {
    per_page: 100,
    status: "publish",
    _fields: "slug",
  });

  if (!result.ok) {
    return MOCK_POSTS.map((p) => p.slug);
  }

  return result.data.map((p) => p.slug);
}

export async function getCategories(): Promise<BlogCategory[]> {
  const result = await wpFetch<WpCategory[]>("categories", {
    per_page: 100,
    hide_empty: "true",
  });

  if (!result.ok) {
    return MOCK_CATEGORIES;
  }

  return result.data
    .filter((c) => c.slug !== "uncategorized")
    .map(normalizeCategory);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<BlogCategory | null> {
  const result = await wpFetch<WpCategory[]>("categories", {
    slug,
  });

  if (!result.ok) {
    return MOCK_CATEGORIES.find((c) => c.slug === slug) ?? null;
  }

  const first = result.data[0];
  return first ? normalizeCategory(first) : null;
}

export async function getPostsByCategory(
  categoryId: number,
  options?: { page?: number; perPage?: number },
): Promise<PaginatedResult<BlogPost>> {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? DEFAULT_PER_PAGE;

  const result = await wpFetch<WpPost[]>("posts", {
    categories: categoryId,
    _embed: "1",
    page,
    per_page: perPage,
    status: "publish",
  });

  if (!result.ok) {
    return paginate(
      mockPostsFiltered({ categoryId }),
      page,
      perPage,
    );
  }

  return {
    items: result.data.map(normalizePost),
    page,
    perPage,
    total: result.total ?? result.data.length,
    totalPages: result.totalPages ?? 1,
  };
}

export async function getAuthorBySlug(
  slug: string,
): Promise<BlogAuthor | null> {
  const result = await wpFetch<WpUser[]>("users", {
    slug,
  });

  if (!result.ok) {
    return MOCK_AUTHORS.find((a) => a.slug === slug) ?? null;
  }

  const first = result.data[0];
  return first ? normalizeAuthor(first) : null;
}

export async function getAllAuthorSlugs(): Promise<string[]> {
  const result = await wpFetch<WpUser[]>("users", {
    per_page: 100,
    who: "authors",
  });

  if (!result.ok) {
    return MOCK_AUTHORS.map((a) => a.slug);
  }

  return result.data.map((u) => u.slug);
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const cats = await getCategories();
  return cats.map((c) => c.slug);
}

export async function getPostsByAuthor(
  authorId: number,
  options?: { page?: number; perPage?: number },
): Promise<PaginatedResult<BlogPost>> {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? DEFAULT_PER_PAGE;

  const result = await wpFetch<WpPost[]>("posts", {
    author: authorId,
    _embed: "1",
    page,
    per_page: perPage,
    status: "publish",
  });

  if (!result.ok) {
    return paginate(mockPostsFiltered({ authorId }), page, perPage);
  }

  return {
    items: result.data.map(normalizePost),
    page,
    perPage,
    total: result.total ?? result.data.length,
    totalPages: result.totalPages ?? 1,
  };
}

export async function searchPosts(
  query: string,
  options?: { page?: number; perPage?: number },
): Promise<PaginatedResult<BlogPost>> {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? DEFAULT_PER_PAGE;
  const q = query.trim();

  if (!q) {
    return { items: [], page, perPage, total: 0, totalPages: 0 };
  }

  const result = await wpFetch<WpPost[]>("posts", {
    search: q,
    _embed: "1",
    page,
    per_page: perPage,
    status: "publish",
  });

  if (!result.ok) {
    return paginate(mockPostsFiltered({ search: q }), page, perPage);
  }

  return {
    items: result.data.map(normalizePost),
    page,
    perPage,
    total: result.total ?? result.data.length,
    totalPages: result.totalPages ?? 1,
  };
}

export async function getRelatedPosts(
  post: BlogPost,
  limit = 3,
): Promise<BlogPost[]> {
  const categoryId = post.categories[0]?.id;
  const result = await getPosts({ page: 1, perPage: 12 });
  return result.items
    .filter((p) => p.id !== post.id)
    .filter((p) =>
      categoryId
        ? p.categories.some((c) => c.id === categoryId)
        : true,
    )
    .slice(0, limit);
}

export async function getAllPostsForSitemap(): Promise<BlogPost[]> {
  const result = await wpFetch<WpPost[]>("posts", {
    per_page: 100,
    status: "publish",
    _embed: "1",
  });

  if (!result.ok) {
    return sortByDateDesc(MOCK_POSTS);
  }

  return result.data.map(normalizePost);
}
