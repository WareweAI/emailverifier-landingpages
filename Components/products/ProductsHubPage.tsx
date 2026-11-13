import Link from "next/link";
import {
  ArrowRight,
  Ban,
  FileCheck,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import CTA from "@/Components/CTA";
import { TrustStatsRow } from "@/Components/home/HomeStatsStrip";
import { HeroAsSeenOn } from "@/Components/home/ProofBar";
import { Reveal } from "@/Components/landing/Reveal";
import ProductsFeatureTabs from "@/Components/products/ProductsFeatureTabs";
import ProductsHeroVisual from "@/Components/products/ProductsHeroVisual";
import { HeroWash } from "@/Components/ui/HeroWash";
import { PageBreadcrumb } from "@/Components/ui/PageBreadcrumb";
import { SectionShell } from "@/Components/ui/SectionShell";

type UseCaseCard = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  productLabel: string;
};

const USE_CASES: readonly UseCaseCard[] = [
  {
    title: "Cold Outreach List Cleaning",
    href: "/bulk-email-verifier",
    description:
      "Run the bulk email verifier before sequences so bounces never tank deliverability.",
    icon: FileCheck,
    productLabel: "Bulk Email Verifier",
  },
  {
    title: "Signup Form Validation",
    href: "/email-verification-api",
    description:
      "Call the email verification API at signup to block disposable and invalid inboxes.",
    icon: ShieldCheck,
    productLabel: "Email Validation API",
  },
  {
    title: "Prospecting",
    href: "/find-leads",
    description:
      "Build ICP-fit B2B lists with Lead Finder, then email verify before outreach.",
    icon: Search,
    productLabel: "Lead Finder",
  },
  {
    title: "Blacklist Avoidance",
    href: "/validate-email",
    description:
      "Spot-check risky addresses with the free email verifier before you add them.",
    icon: Ban,
    productLabel: "Email Validator",
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
        className="relative pt-10 pb-6 md:pt-14 md:pb-8 lg:pb-8"
        aria-labelledby="products-heading"
      >
        <HeroWash />
        <div className="site-container relative z-10">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="order-1 flex w-full min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
              <PageBreadcrumb
                className="mb-6 w-full"
                items={[
                  { label: "Home", href: "/" },
                  { label: "Products" },
                ]}
              />
              <h1
                id="products-heading"
                className="text-balance font-display text-3xl font-semibold leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl"
              >
                Everything you need from an{" "}
                <span className="text-primary">email verifier</span> to find
                verified leads
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-muted">
                Clean lists, email verify in real time, and build B2B leads on
                one credit balance that never expires.
              </p>
              <HeroAsSeenOn className="mt-8 max-w-2xl [&_ul]:justify-center lg:[&_ul]:justify-start" />
            </div>

            <div className="order-2 w-full min-w-0">
              <ProductsHeroVisual />
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <div
              className="h-px bg-linear-to-r from-transparent via-line to-transparent"
              aria-hidden
            />
            <div className="pt-8 pb-2 md:pt-10 md:pb-3">
              <TrustStatsRow />
            </div>
          </div>
        </div>
      </section>

      <ProductsFeatureTabs />

      <SectionShell
        className="bg-background"
        ariaLabelledBy="products-use-cases-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="products-use-cases-heading"
            className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl"
          >
            Not sure where to start?
          </h2>
          <p className="mt-3 text-ink-muted">
            Pick the job, open the product, then email verify before you send.
          </p>
        </div>
        <Reveal className="mt-10" staggerSelector="[data-use-case]">
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <li key={useCase.title} className="min-w-0">
                  <Link
                    href={useCase.href}
                    data-use-case
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {useCase.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                      {useCase.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      {useCase.productLabel}
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

      <CTA />
    </main>
  );
}
