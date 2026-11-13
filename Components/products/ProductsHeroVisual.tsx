"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LeadCategoryDemo,
  VerifyCategoryDemo,
} from "@/Components/products/ProductsCategoryDemos";
import { DesktopMockup } from "@/Components/ui/DesktopMockup";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    id: "verify",
    label: "Email Verification",
    chromeLabel: "emailverifier.io/validate-email",
    products: [
      { title: "Email Validator", href: "/validate-email" },
      { title: "Bulk Email Verifier", href: "/bulk-email-verifier" },
      { title: "Email Validation API", href: "/email-verification-api" },
    ],
  },
  {
    id: "leads",
    label: "Lead Generation",
    chromeLabel: "emailverifier.io/email-finder",
    products: [
      { title: "Email Finder", href: "/email-finder" },
      { title: "Lead Finder", href: "/find-leads" },
      { title: "Data Enrichment", href: "/data-enrichment" },
    ],
  },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

export default function ProductsHeroVisual() {
  const [active, setActive] = useState<CategoryId>("verify");
  const category = CATEGORIES.find((item) => item.id === active) ?? CATEGORIES[0];

  return (
    <article
      className="flex h-full flex-col rounded-3xl border-[5px] border-surface bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6"
      aria-label="Product categories"
    >
      <div
        className="flex rounded-full border border-line bg-surface-muted p-1"
        role="tablist"
        aria-label="Product category"
      >
        {CATEGORIES.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(
                "min-h-11 flex-1 rounded-full px-3 text-center text-xs font-semibold transition sm:text-sm",
                isActive
                  ? "bg-surface text-ink shadow-[var(--shadow-card)] ring-1 ring-line"
                  : "text-ink-muted hover:text-ink",
              )}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
        {category.products.map((product) => (
          <li key={product.href}>
            <Link
              href={product.href}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface-muted px-3 text-sm font-medium text-ink transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {product.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-5 min-w-0">
        <DesktopMockup chromeLabel={category.chromeLabel} compact>
          {active === "verify" ? (
            <VerifyCategoryDemo key="verify" />
          ) : (
            <LeadCategoryDemo key="leads" />
          )}
        </DesktopMockup>
      </div>
    </article>
  );
}
