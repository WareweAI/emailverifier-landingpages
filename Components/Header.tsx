"use client";

import { useRef, useState, type ComponentType, type ReactNode } from "react";
import {
  ArrowRight,
  Ban,
  Blocks,
  BookOpen,
  ChevronDown,
  Code2,
  Database,
  FileCheck,
  FileSpreadsheet,
  MailCheck,
  Menu,
  Newspaper,
  Search,
  ShieldCheck,
  UserSearch,
  X,
  type LucideProps,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";
import LogoMark from "./ui/LogoMark";
import { StatusChip } from "./ui/StatusChip";
import { cn } from "@/lib/utils";

const REGISTER_URL = "https://app.emailverifier.io/register";

const IMPORT_SOURCES = [
  { id: "gdrive", label: "Google Drive", src: "/logos/integrations/google-drive.svg" },
  { id: "onedrive", label: "OneDrive", src: "/logos/integrations/onedrive.svg" },
  { id: "hubspot", label: "HubSpot", src: "/logos/integrations/hubspot.svg" },
  {
    id: "salesforce",
    label: "Salesforce",
    src: "/logos/integrations/salesforce.svg",
  },
] as const;

const EXAMPLE_FLAGS = ["Syntax", "MX", "Mailbox", "Not disposable"] as const;

const SIGNIN_URL = "https://app.emailverifier.io/signin";

const REGISTER_CTA_CLASS =
  "h-11 min-h-11 rounded-lg border border-primary bg-primary px-4 text-primary-foreground hover:bg-primary-hover active:bg-primary-deep motion-reduce:transition-none";

type ProductLink = {
  title: string;
  href: string;
  desc: string;
  icon: ComponentType<LucideProps>;
  external?: boolean;
};

type ProductGroup = {
  id: string;
  label: string;
  items: ProductLink[];
};

const PRODUCT_GROUPS: ProductGroup[] = [
  {
    id: "email-verification",
    label: "Email Verification",
    items: [
      {
        title: "Email Validator",
        href: "/validate-email",
        desc: "Verify any email address for free in seconds before you send.",
        icon: MailCheck,
      },
      {
        title: "Bulk Email Verifier",
        href: "/bulk-email-verifier",
        desc: "Clean CSV lists or import directly from your Drive and CRM.",
        icon: FileSpreadsheet,
      },
      {
        title: "Email Validation API",
        href: "/email-verification-api",
        desc: "Real-time checks for signups, forms, CRMs, and other applications.",
        icon: Code2,
      },
    ],
  },
  {
    id: "lead-generation",
    label: "Lead Generation",
    items: [
      {
        title: "Email Finder",
        href: "/find-emails",
        desc: "Find verified emails by name, company, or LinkedIn profile.",
        icon: Search,
      },
      {
        title: "Lead Finder",
        href: "/find-leads",
        desc: "Discover enriched B2B leads tailored to your ICP with AI.",
        icon: UserSearch,
      },
      {
        title: "Data Enrichment",
        href: "/find-emails#bulk-find",
        desc: "Enrich lists in bulk with verified emails, roles, and company data.",
        icon: Database,
      },
    ],
  },
];

const SOLUTION_LINKS: ProductLink[] = [
  {
    title: "Cold Outreach List Cleaning",
    href: "/bulk-email-verifier",
    desc: "Clean cold lists before you send so bounces don’t hurt deliverability.",
    icon: FileCheck,
  },
  {
    title: "Signup Form Validation",
    href: "/email-verification-api",
    desc: "Block disposable and invalid emails in real time at signup.",
    icon: ShieldCheck,
  },
  {
    title: "Prospecting",
    href: "/find-leads",
    desc: "Find B2B leads matched to your ICP, then verify before outreach.",
    icon: Search,
  },
  {
    title: "Blacklist Avoidance",
    href: "/validate-email",
    desc: "Catch risky and spam-trap addresses before they damage reputation.",
    icon: Ban,
  },
];

const RESOURCE_LINKS: ProductLink[] = [
  {
    title: "Guides",
    href: "/blog",
    desc: "How-to articles on list cleaning, verification, and deliverability.",
    icon: BookOpen,
  },
  {
    title: "Integrations",
    href: "/#features",
    desc: "Import from Drive, HubSpot, Salesforce, and other tools you use.",
    icon: Blocks,
  },
  {
    title: "Blog",
    href: "/blog",
    desc: "Product updates, email tips, and deliverability insights.",
    icon: Newspaper,
  },
];

function MenuItemLink({
  item,
  onNavigate,
}: {
  item: ProductLink;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      role="menuitem"
      className="group flex items-start gap-3 rounded-lg p-2 transition hover:bg-primary-soft focus-visible:bg-primary-soft"
      onClick={onNavigate}
      {...(item.external
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className="block text-sm font-semibold text-ink">{item.title}</span>
        <span className="mt-1 block max-w-xs text-xs leading-relaxed text-ink-muted">
          {item.desc}
        </span>
      </span>
    </Link>
  );
}

function ProductMenuPromo({ onNavigate }: { onNavigate: () => void }) {
  return (
    <aside className="rounded-xl border border-line bg-primary-soft p-4">
      <div className="rounded-lg border border-line bg-surface p-3">
        <p className="text-xs font-medium text-ink-muted">Example result</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="min-w-0 truncate text-sm font-semibold text-ink">
            lead@example.com
          </p>
          <StatusChip
            label="Deliverable"
            variant="success"
            className="shrink-0 px-2 py-0.5"
          />
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Example checks">
          {EXAMPLE_FLAGS.map((flag) => (
            <li
              key={flag}
              className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success"
            >
              {flag}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">
        100 free credits on signup
      </p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
        No credit card. Clean a list or call the email verification API with
        the same credits.
      </p>
      <Link
        href={REGISTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-soft"
      >
        Start free verification
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </aside>
  );
}

function ImportStrip({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 md:flex-row md:items-center">
      <p className="shrink-0 text-xs font-semibold tracking-wide text-ink-muted uppercase">
        Import from
      </p>
      <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        {IMPORT_SOURCES.map((source) => (
          <li
            key={source.id}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-3 text-sm text-ink"
          >
            <Image
              src={source.src}
              alt=""
              width={16}
              height={16}
              unoptimized
              className="h-4 w-4 object-contain"
            />
            <span>{source.label}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/#features"
        onClick={onNavigate}
        className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:ml-auto"
      >
        All integrations
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}

function LinkMegaPanel({
  id,
  items,
  open,
  onNavigate,
  columns = 4,
}: {
  id: string;
  items: ProductLink[];
  open: boolean;
  onNavigate: () => void;
  columns?: 3 | 4;
}) {
  return (
    <div
      id={id}
      className={cn(
        /* -mt-px overlaps the bar border so the open panel reads as one card */
        "absolute inset-x-0 top-full z-60 -mt-px transition",
        open
          ? "visible opacity-100"
          : "invisible pointer-events-none opacity-0"
      )}
    >
      <div className="rounded-b-[1.25rem] border border-line border-t-line/60 bg-surface px-4 py-6 shadow-[var(--shadow-card)] sm:px-6 lg:px-8 lg:py-8">
        <ul
          role="menu"
          className={cn(
            "grid gap-2 sm:grid-cols-2 lg:gap-0",
            columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          )}
        >
          {items.map((item, index) => (
            <li
              key={item.title}
              role="none"
              className={cn(
                "lg:px-4",
                index === 0 && "lg:pl-2",
                index === items.length - 1 && "lg:pr-2",
                index > 0 && "lg:border-l lg:border-line"
              )}
            >
              <MenuItemLink item={item} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MegaMenuPanel({
  id,
  groups,
  open,
  onNavigate,
  columns = 2,
  promo = null,
  showImportStrip = false,
}: {
  id: string;
  groups: ProductGroup[];
  open: boolean;
  onNavigate: () => void;
  columns?: 2 | 3;
  promo?: ReactNode;
  showImportStrip?: boolean;
}) {
  const showPromo = promo != null;
  return (
    <div
      id={id}
      className={cn(
        /* -mt-px overlaps the bar border so the open panel reads as one card */
        "absolute inset-x-0 top-full z-60 -mt-px transition",
        open
          ? "visible opacity-100"
          : "invisible pointer-events-none opacity-0"
      )}
    >
      <div
        className={cn(
          "rounded-b-[1.25rem] border border-line border-t-line/60 bg-surface px-4 shadow-[var(--shadow-card)] sm:px-6 lg:px-8",
          showPromo ? "py-6 lg:py-8" : "py-8 lg:py-10"
        )}
      >
        <div
          className={cn(
            showPromo && "lg:grid lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start lg:gap-8"
          )}
        >
          <div
            role="menu"
            className={cn(
              "grid w-full gap-8 lg:gap-0",
              !showPromo && "mx-auto max-w-3xl",
              !showPromo && columns === 3 && "max-w-5xl lg:grid-cols-3",
              !showPromo && columns !== 3 && "lg:grid-cols-2",
              showPromo && "md:grid-cols-2"
            )}
          >
            {groups.map((group, index) => (
              <div
                key={group.id}
                role="group"
                aria-label={group.label}
                className={cn(
                  "lg:px-8",
                  index === 0 && "lg:pl-2",
                  index === groups.length - 1 && !showPromo && "lg:pr-2",
                  index > 0 && "lg:border-l lg:border-line"
                )}
              >
                <p className="mb-5 text-sm font-medium text-ink-muted">
                  {group.label}
                </p>
                <ul className="grid gap-4">
                  {group.items.map((item) => (
                    <li key={`${group.id}-${item.title}`} role="none">
                      <MenuItemLink item={item} onNavigate={onNavigate} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {promo}
        </div>
        {showImportStrip ? <ImportStrip onNavigate={onNavigate} /> : null}
      </div>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const productCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const featuresCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resourcesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProduct = () => {
    if (productCloseTimer.current) clearTimeout(productCloseTimer.current);
    setIsFeaturesOpen(false);
    setIsResourcesOpen(false);
    setIsProductOpen(true);
  };

  const closeProduct = () => {
    if (productCloseTimer.current) clearTimeout(productCloseTimer.current);
    productCloseTimer.current = setTimeout(() => setIsProductOpen(false), 120);
  };

  const openFeatures = () => {
    if (featuresCloseTimer.current) clearTimeout(featuresCloseTimer.current);
    setIsProductOpen(false);
    setIsResourcesOpen(false);
    setIsFeaturesOpen(true);
  };

  const closeFeatures = () => {
    if (featuresCloseTimer.current) clearTimeout(featuresCloseTimer.current);
    featuresCloseTimer.current = setTimeout(() => setIsFeaturesOpen(false), 120);
  };

  const openResources = () => {
    if (resourcesCloseTimer.current) clearTimeout(resourcesCloseTimer.current);
    setIsProductOpen(false);
    setIsFeaturesOpen(false);
    setIsResourcesOpen(true);
  };

  const closeResources = () => {
    if (resourcesCloseTimer.current) clearTimeout(resourcesCloseTimer.current);
    resourcesCloseTimer.current = setTimeout(
      () => setIsResourcesOpen(false),
      120
    );
  };

  const closeDesktopMenus = () => {
    setIsProductOpen(false);
    setIsFeaturesOpen(false);
    setIsResourcesOpen(false);
  };

  const desktopMenuOpen =
    isProductOpen || isFeaturesOpen || isResourcesOpen;

  return (
    <header className="relative z-50 pt-4">
      {/* 1-off: floating nav shell — ~20px radius, detached from viewport edges */}
      <div
        className="site-container relative"
        onMouseLeave={() => {
          closeProduct();
          closeFeatures();
          closeResources();
        }}
      >
        {/* Positioning context matches the bar's outer width — not the padded site column */}
        <div className="relative">
        <div
          className={cn(
            "border border-line/70 bg-surface shadow-[var(--shadow-card)] backdrop-blur-md",
            desktopMenuOpen
              ? "rounded-t-[1.25rem] border-b-transparent"
              : "rounded-[1.25rem]"
          )}
        >
          <div className="grid h-16 grid-cols-[1fr_auto] items-center px-4 sm:px-5 md:grid-cols-[1fr_auto_1fr] md:px-6">
            <Link
              className="flex items-center gap-2 justify-self-start"
              href="/"
              aria-label="EmailVerifier.io — Home"
            >
              <LogoMark />
              <span className="font-display whitespace-nowrap text-lg font-semibold text-ink">
                EmailVerifier.io
              </span>
            </Link>

            <nav
              className="hidden items-center gap-6 md:flex lg:gap-8"
              aria-label="Primary"
            >
              <button
                type="button"
                className={cn(
                  "flex min-h-11 items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-ink transition hover:bg-primary-soft hover:text-primary focus-visible:bg-primary-soft focus-visible:text-primary",
                  isProductOpen && "bg-primary-soft text-primary"
                )}
                aria-haspopup="true"
                aria-expanded={isProductOpen}
                aria-controls="product-menu"
                onMouseEnter={openProduct}
                onFocus={openProduct}
                onClick={() => {
                  if (!isProductOpen) openProduct();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsProductOpen(false);
                }}
              >
                Products
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isProductOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>

              <button
                type="button"
                className={cn(
                  "flex min-h-11 items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-ink transition hover:bg-primary-soft hover:text-primary focus-visible:bg-primary-soft focus-visible:text-primary",
                  isFeaturesOpen && "bg-primary-soft text-primary"
                )}
                aria-haspopup="true"
                aria-expanded={isFeaturesOpen}
                aria-controls="solutions-menu"
                onMouseEnter={openFeatures}
                onFocus={openFeatures}
                onClick={() => {
                  if (!isFeaturesOpen) openFeatures();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsFeaturesOpen(false);
                }}
              >
                Solutions
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isFeaturesOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>

              <Link
                href="/pricing"
                className="text-sm font-medium text-ink hover:text-primary"
                onMouseEnter={closeDesktopMenus}
              >
                Pricing
              </Link>

              <button
                type="button"
                className={cn(
                  "flex min-h-11 items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-ink transition hover:bg-primary-soft hover:text-primary focus-visible:bg-primary-soft focus-visible:text-primary",
                  isResourcesOpen && "bg-primary-soft text-primary"
                )}
                aria-haspopup="true"
                aria-expanded={isResourcesOpen}
                aria-controls="resources-menu"
                onMouseEnter={openResources}
                onFocus={openResources}
                onClick={() => {
                  if (!isResourcesOpen) openResources();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsResourcesOpen(false);
                }}
              >
                Resources
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isResourcesOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
            </nav>

            <div className="hidden items-center gap-3 justify-self-end md:flex">
              <Link
                href={SIGNIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              className="inline-flex h-11 min-h-11 items-center rounded-lg border border-line px-4 text-sm font-medium text-ink transition hover:border-primary hover:text-primary"
            >
              Log in
            </Link>
            <Button
              size="md"
              variant="ghost"
              asChild
              className={REGISTER_CTA_CLASS}
            >
                <Link
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ev-event="cta_register_click"
                >
                  Get 100 free credits
                </Link>
              </Button>
            </div>

            <button
              type="button"
              className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center justify-self-end rounded-lg md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

          <div
            className="hidden md:block"
            onMouseEnter={openProduct}
            onMouseLeave={closeProduct}
          >
            <MegaMenuPanel
              id="product-menu"
              groups={PRODUCT_GROUPS}
              open={isProductOpen}
              onNavigate={() => setIsProductOpen(false)}
              promo={
                <ProductMenuPromo onNavigate={() => setIsProductOpen(false)} />
              }
              showImportStrip
            />
          </div>

          <div
            className="hidden md:block"
            onMouseEnter={openFeatures}
            onMouseLeave={closeFeatures}
          >
            <LinkMegaPanel
              id="solutions-menu"
              items={SOLUTION_LINKS}
              open={isFeaturesOpen}
              onNavigate={() => setIsFeaturesOpen(false)}
              columns={4}
            />
          </div>

          <div
            className="hidden md:block"
            onMouseEnter={openResources}
            onMouseLeave={closeResources}
          >
            <LinkMegaPanel
              id="resources-menu"
              items={RESOURCE_LINKS}
              open={isResourcesOpen}
              onNavigate={() => setIsResourcesOpen(false)}
              columns={3}
            />
          </div>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-60 mt-3 rounded-[1.25rem] border border-line bg-surface p-4 shadow-[var(--shadow-card)] md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-5">
              {PRODUCT_GROUPS.map((group) => (
                <li key={group.id}>
                  <p className="text-sm font-medium text-ink-muted">
                    {group.label}
                  </p>
                  <ul className="mt-2 grid gap-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={`${group.id}-${item.title}`}>
                          <Link
                            href={item.href}
                            className="flex min-h-11 items-start gap-3 rounded-lg py-2 text-ink hover:bg-primary-soft focus-visible:bg-primary-soft"
                            onClick={() => setIsMenuOpen(false)}
                            {...(item.external
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                          >
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                              <Icon
                                className="h-5 w-5"
                                strokeWidth={1.6}
                                aria-hidden
                              />
                            </span>
                            <span className="min-w-0 pt-0.5">
                              <span className="block text-sm font-semibold">
                                {item.title}
                              </span>
                              <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                                {item.desc}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
              <li>
                <p className="text-sm font-medium text-ink-muted">Solutions</p>
                <ul className="mt-2 grid gap-1">
                  {SOLUTION_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="flex min-h-11 items-start gap-3 rounded-lg py-2 text-ink hover:bg-primary-soft focus-visible:bg-primary-soft"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                            <Icon
                              className="h-5 w-5"
                              strokeWidth={1.6}
                              aria-hidden
                            />
                          </span>
                          <span className="min-w-0 pt-0.5">
                            <span className="block text-sm font-semibold">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                              {item.desc}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="block py-2 text-sm font-medium text-ink hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <p className="text-sm font-medium text-ink-muted">Resources</p>
                <ul className="mt-2 grid gap-1">
                  {RESOURCE_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="flex min-h-11 items-start gap-3 rounded-lg py-2 text-ink hover:bg-primary-soft focus-visible:bg-primary-soft"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                            <Icon
                              className="h-5 w-5"
                              strokeWidth={1.6}
                              aria-hidden
                            />
                          </span>
                          <span className="min-w-0 pt-0.5">
                            <span className="block text-sm font-semibold">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                              {item.desc}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <Link
                  href={SIGNIN_URL}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-line px-4 text-sm font-medium text-ink"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={cn("w-full", REGISTER_CTA_CLASS)}
                  asChild
                >
                  <Link
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ev-event="cta_register_click"
                  >
                    Get 100 free credits
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
