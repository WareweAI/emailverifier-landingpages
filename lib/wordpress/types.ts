export type BlogImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
};

export type BlogAuthor = {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatarUrl?: string;
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  date: string;
  modified: string;
  featuredImage?: BlogImage;
  categories: BlogCategory[];
  author: BlogAuthor;
};

export type PaginatedResult<T> = {
  items: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};
