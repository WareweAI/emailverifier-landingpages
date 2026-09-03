import type { TocItem } from "./types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/**
 * Extract H2/H3 headings for TOC. Ensures each heading has an id
 * (adds one if missing) and returns updated HTML + toc items.
 */
export function extractToc(html: string): { html: string; items: TocItem[] } {
  const items: TocItem[] = [];
  const used = new Set<string>();

  const nextId = (raw: string) => {
    let base = slugify(raw) || "section";
    let id = base;
    let n = 2;
    while (used.has(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    used.add(id);
    return id;
  };

  const htmlWithIds = html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (_match, levelStr: string, attrs = "", inner: string) => {
      const level = Number(levelStr) as 2 | 3;
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return _match;

      const idMatch = attrs.match(/\sid=["']([^"']+)["']/i);
      const id = idMatch?.[1] ?? nextId(text);
      if (!idMatch) used.add(id);

      items.push({ id, text, level });

      if (idMatch) {
        return `<h${level}${attrs}>${inner}</h${level}>`;
      }
      const cleaned = attrs.replace(/\s+/g, " ").trim();
      const attrStr = cleaned ? ` ${cleaned}` : "";
      return `<h${level}${attrStr} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: htmlWithIds, items };
}
