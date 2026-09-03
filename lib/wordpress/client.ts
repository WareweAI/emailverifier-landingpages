export function getWordpressApiUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.trim();
  return url || undefined;
}

export function isWordpressConfigured(): boolean {
  return Boolean(getWordpressApiUrl());
}

type WpFetchResult<T> =
  | { ok: true; data: T; total?: number; totalPages?: number }
  | { ok: false; error: string };

export async function wpFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
): Promise<WpFetchResult<T>> {
  const base = getWordpressApiUrl();
  if (!base) {
    return { ok: false, error: "WORDPRESS_API_URL_UNSET" };
  }

  const url = new URL(
    path.replace(/^\//, ""),
    base.endsWith("/") ? base : `${base}/`,
  );

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return { ok: false, error: `WP_HTTP_${res.status}` };
    }

    const data = (await res.json()) as T;
    const total = Number(res.headers.get("X-WP-Total") ?? NaN);
    const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? NaN);

    return {
      ok: true,
      data,
      total: Number.isFinite(total) ? total : undefined,
      totalPages: Number.isFinite(totalPages) ? totalPages : undefined,
    };
  } catch {
    return { ok: false, error: "WP_FETCH_FAILED" };
  }
}
