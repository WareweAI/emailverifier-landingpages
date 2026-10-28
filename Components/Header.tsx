"use client";

import { useRef, useState, type ComponentType, type ReactNode } from "react";
import {
  ArrowRight,
  Braces,
  ChevronDown,
  Code2,
  FileSpreadsheet,
  Gauge,
  Globe,
  MailCheck,
  Menu,
  Search,
  ShieldCheck,
  Trash2,
  UserSearch,
  Users,
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

/** Same import sources as the homepage bulk mockup. Soon marks are not live yet. */
const IMPORT_SOURCES = [
  { id: "gdrive", label: "Google Drive", src: "/logos/integrations/google-drive.svg" },
  {
    id: "onedrive",
    label: "OneDrive",
    src: "/logos/integrations/onedrive.svg",
    soon: true,
  },
  {
    id: "dropbox",
    label: "Dropbox",
    src: "/logos/integrations/dropbox.svg",
    soon: true,
  },
  {
    id: "airtable",
    label: "Airtable",
    src: "/logos/integrations/airtable.svg",
    soon: true,
  },
] as const;

const EXAMPLE_FLAGS = ["Syntax", "MX", "Mailbox", "Not disposable"] as const;

const SOLUTION_CHECKS = [
  { label: "Syntax", result: "Pass", tone: "success" },
  { label: "MX", result: "Pass", tone: "success" },
  { label: "Role", result: "Flagged", tone: "warning" },
] as const;
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
        desc: "Verify any email address in seconds before you send.",
        icon: MailCheck,
      },
      {
        title: "Bulk Email Verifier",
        href: "/bulk-email-verifier",
        desc: "Clean CSV lists and remove invalid, disposable, and risky emails.",
        icon: FileSpreadsheet,
      },
      {
        title: "Email Verification API",
        href: "/email-verification-api",
        desc: "Real-time checks for signups, forms, and your product stack.",
        icon: Code2,
      },
    ],
  },
  {
    id: "email-finder",
    label: "Email Finder",
    items: [
      {
        title: "Email Finder",
        href: "/find-emails",
        desc: "Find verified work emails from a name, company, or LinkedIn.",
        icon: Search,
      },
      {
        title: "Bulk Email Finder",
        href: "/find-emails#bulk-find",
        desc: "Upload a CSV of names and domains to find emails at scale.",
        icon: FileSpreadsheet,
      },
      {
        title: "Find Leads",
        href: "/find-leads",
        desc: "Turn a plain-language brief into people or companies to pursue.",
        icon: UserSearch,
      },
    ],
  },
];

const FEATURE_LINKS: ProductLink[] = [
  {
    title: "Advanced Syntax Validation",
    href: "/#syntax-check",
    desc: "Catch malformed and invalid addresses before deeper checks.",
    icon: Braces,
  },
  {
    title: "Domain & MX Record Checks",
    href: "/#mx-check",
    desc: "Confirm the domain exists and can receive mail.",
    icon: Globe,
  },
  {
    title: "Real-Time SMTP Verification",
    href: "/#mailbox-check",
    desc: "Verify the mailbox without sending a message.",
    icon: ShieldCheck,
  },
  {
    title: "Disposable Email Detection",
    href: "/#disposable-check",
    desc: "Filter throwaway and temporary inboxes from your lists.",
    icon: Trash2,
  },
  {
    title: "Role-Based Email Detection",
    href: "/#role-based-filtering",
    desc: "Spot info@, admin@, support@, and other shared inboxes.",
    icon: Users,
  },
  {
    title: "Smart Risk Scoring",
    href: "/#risk-check",
    desc: "Classify deliverable vs risky so you know what is safe to send.",
    icon: Gauge,
  },
];

const FEATURE_GROUPS: ProductGroup[] = [
  {
    id: "verification-checks",
    label: "Verification Checks",
    items: FEATURE_LINKS.slice(0, 3),
  },
  {
    id: "risk-filters",
    label: "Risk & Filters",
    items: FEATURE_LINKS.slice(3),
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

function SolutionsMenuPromo({ onNavigate }: { onNavigate: () => void }) {
  return (
    <aside className="rounded-xl border border-line bg-primary-soft p-4">
      <div className="rounded-lg border border-line bg-surface p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-ink-muted">Example check</p>
          <StatusChip
            label="Risky"
            variant="warning"
            className="shrink-0 px-2 py-0.5"
          />
        </div>
        <p className="mt-2 truncate text-sm font-semibold text-ink">
          info@example.com
        </p>
        <ul className="mt-3 grid gap-1.5" aria-label="Example check results">
          {SOLUTION_CHECKS.map((check) => (
            <li
              key={check.label}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <span className="text-ink">{check.label}</span>
              <span
                className={
                  check.tone === "success"
                    ? "font-medium text-success"
                    : "font-medium text-warning"
                }
              >
                {check.result}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">
        See what is safe to send
      </p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
        Role, disposable, and mailbox checks run on every address. 100 free
        credits, no card.
      </p>
      <Link
        href={REGISTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-soft"
      >
        Run a free check
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
            {"soon" in source && source.soon ? (
              <span className="text-xs font-medium text-ink-muted">Soon</span>
            ) : null}
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
        /* -mt-px seals the seam so the panel reads as one floating card with the bar */
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
  const productCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const featuresCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProduct = () => {
    if (productCloseTimer.current) clearTimeout(productCloseTimer.current);
    setIsFeaturesOpen(false);
    setIsProductOpen(true);
  };

  const closeProduct = () => {
    if (productCloseTimer.current) clearTimeout(productCloseTimer.current);
    productCloseTimer.current = setTimeout(() => setIsProductOpen(false), 120);
  };

  const openFeatures = () => {
    if (featuresCloseTimer.current) clearTimeout(featuresCloseTimer.current);
    setIsProductOpen(false);
    setIsFeaturesOpen(true);
  };

  const closeFeatures = () => {
    if (featuresCloseTimer.current) clearTimeout(featuresCloseTimer.current);
    featuresCloseTimer.current = setTimeout(() => setIsFeaturesOpen(false), 120);
  };

  const closeDesktopMenus = () => {
    setIsProductOpen(false);
    setIsFeaturesOpen(false);
  };

  const desktopMenuOpen = isProductOpen || isFeaturesOpen;

  return (
    <header className="relative z-50 px-4 pt-4 sm:px-6 lg:px-20">
      {/* 1-off: floating nav shell — ~20px radius, detached from viewport edges */}
      <div
        className="relative mx-auto"
        onMouseLeave={() => {
          closeProduct();
          closeFeatures();
        }}
      >
        <div
          className={cn(
            "relative border border-line/70 bg-surface shadow-[var(--shadow-card)] backdrop-blur-md",
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
                aria-controls="features-menu"
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
          <MegaMenuPanel
            id="features-menu"
            groups={FEATURE_GROUPS}
            open={isFeaturesOpen}
            onNavigate={() => setIsFeaturesOpen(false)}
            promo={
              <SolutionsMenuPromo onNavigate={() => setIsFeaturesOpen(false)} />
            }
          />
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
                  {FEATURE_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
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
