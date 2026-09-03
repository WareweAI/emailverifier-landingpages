"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

type SearchFormProps = {
  initialQuery?: string;
  className?: string;
};

export function SearchForm({
  initialQuery = "",
  className = "",
}: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      router.push("/blog");
      return;
    }
    router.push(`/blog/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={`flex gap-2 ${className}`}
    >
      <label htmlFor="blog-search" className="sr-only">
        Search blog posts
      </label>
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
          aria-hidden
        />
        <input
          id="blog-search"
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          className="min-h-11 w-full rounded-[var(--radius-control)] border border-line bg-surface py-2 pr-3 pl-10 text-ink outline-none transition placeholder:text-ink-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <button
        type="submit"
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
      >
        Search
      </button>
    </form>
  );
}
