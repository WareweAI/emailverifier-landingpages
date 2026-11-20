import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Database,
  FileSpreadsheet,
  MailCheck,
  Search,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import CTA from "@/Components/CTA";
import { Reveal } from "@/Components/landing/Reveal";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/Components/ui/SectionHeading";
import { SectionShell } from "@/Components/ui/SectionShell";

type ProductCard = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

type ProductCategory = {
  id: string;
  eyebrow: string;
  label: string;
  description: string;
  products: readonly ProductCard[];
};

const CATEGORIES: readonly ProductCategory[] = [
  {
    id: "email-verification",
    eyebrow: "Verification",
    label: "Email verifier tools",
    description:
      "Single checks, bulk cleaning, and a real-time email verification API - same credits that never expire.",
    products: [
      {
        title: "Email Validator",
        href: "/validate-email",
        description:
          "Verify any email address for free in seconds before you send - without delivering a message.",
        icon: MailCheck,
      },
      {
        title: "Bulk Email Verifier",
        href: "/bulk-email-verifier",
        description:
          "Clean CSV lists or import from Drive and CRM - valid, invalid, catch-all, role, and disposable out.",
        icon: FileSpreadsheet,
      },
      {
        title: "Email Validation API",
        href: "/email-verification-api",
        description:
          "Real-time checks for signups, forms, and apps on the same credits as bulk.",
        icon: Code2,
      },
    ],
  },
  {
    id: "lead-generation",
    eyebrow: "Lead generation",
    label: "Lead generation tools",
    description:
      "Find and enrich B2B contacts, then email verify before outreach on one credit balance.",
    products: [
      {
        title: "Email Finder",
        href: "/email-finder",
        description:
          "Find verified emails by name, company, or LinkedIn profile - free if no email is found.",
        icon: Search,
      },
      {
        title: "Lead Finder",
        href: "/find-leads",
        description:
          "Discover enriched B2B leads tailored to your ICP with AI - then verify before you send.",
        icon: UserSearch,
      },
      {
        title: "Data Enrichment",
        href: "/data-enrichment",
        description:
          "Enrich lists in bulk with verified emails, roles, and company data.",
        icon: Database,
      },
    ],
  },
];

export default function ProductsHubPage() {
  return (
    <main
      className="flex-1 bg-background text-ink"
      id="main-page"
      role="main"
      aria-labelledby="products-heading"
    >
      <section
        className="relative pt-10 pb-6 md:pt-14 md:pb-8"
        aria-labelledby="products-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Products" },
            ]}
          />
          <h1
            id="products-heading"
            className="max-w-3xl text-balance font-display text-3xl font-semibold leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Products
          </h1>
        </div>
      </section>

      {CATEGORIES.map((category) => (
        <SectionShell
          key={category.id}
          id={category.id}
          className="bg-background py-12 md:py-16 lg:py-20"
          ariaLabelledBy={`${category.id}-heading`}
        >
          <SectionEyebrow>{category.eyebrow}</SectionEyebrow>
          <SectionHeading id={`${category.id}-heading`} withEyebrow>
            {category.label}
          </SectionHeading>
          <SectionLead className="max-w-2xl">
            {category.description}
          </SectionLead>

          <Reveal className="mt-8" staggerSelector="[data-product-card]">
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((product) => {
                const Icon = product.icon;
                return (
                  <li key={product.href} className="min-w-0">
                    <Link
                      href={product.href}
                      data-product-card
                      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-md bg-primary-soft text-primary">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.6}
                          aria-hidden
                        />
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-ink">
                        {product.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                        {product.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        View product
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </SectionShell>
      ))}

      <CTA />
    </main>
  );
}
