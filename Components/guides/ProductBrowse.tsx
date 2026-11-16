import Link from "next/link";
import {
  Code2,
  Database,
  FileSpreadsheet,
  MailCheck,
  Search,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import {
  GUIDE_PRODUCTS,
  buildGuidesHref,
  getGuideCountByProduct,
  type GuideProductSlug,
} from "@/lib/guides";

const PRODUCT_ICONS: Record<GuideProductSlug, LucideIcon> = {
  "email-validator": MailCheck,
  "bulk-email-verifier": FileSpreadsheet,
  "email-validation-api": Code2,
  "email-finder": Search,
  "lead-finder": UserSearch,
  "data-enrichment": Database,
};

type ProductBrowseProps = {
  activeProduct?: string;
};

export function ProductBrowse({ activeProduct }: ProductBrowseProps) {
  return (
    <section aria-labelledby="browse-by-product-heading">
      <h2
        id="browse-by-product-heading"
        className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Browse email verifier guides by product
      </h2>
      <p className="mt-2 max-w-2xl text-ink-muted">
        Task-based how-tos organized around the tool you are using — from a
        bulk email verifier to the email verification API.
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDE_PRODUCTS.map((product) => {
          const Icon = PRODUCT_ICONS[product.slug];
          const count = getGuideCountByProduct(product.slug);
          const active = activeProduct === product.slug;

          return (
            <li key={product.slug}>
              <Link
                href={buildGuidesHref({ product: product.slug })}
                className={
                  active
                    ? "flex h-full flex-col rounded-2xl border border-primary bg-primary-soft p-5 shadow-[var(--shadow-card)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    : "flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:border-primary/40 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                }
                aria-current={active ? "page" : undefined}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="mt-4 font-display text-lg font-semibold text-ink">
                  {product.name}
                </span>
                <span className="mt-1 text-sm text-ink-muted">
                  {product.description}
                </span>
                <span className="mt-4 text-sm font-medium text-primary">
                  {count} {count === 1 ? "guide" : "guides"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
