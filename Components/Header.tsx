"use client";

import { useRef, useState, type ComponentType } from "react";
import {
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
  Users,
  X,
  type LucideProps,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import LogoMark from "./ui/LogoMark";
import { cn } from "@/lib/utils";

const REGISTER_URL = "https://app.emailverifier.io/register";
const SIGNIN_URL = "https://app.emailverifier.io/signin";
const FIND_EMAILS_URL = "https://app.emailverifier.io";

const REGISTER_CTA_CLASS =
  "rounded-full bg-ink text-primary-foreground hover:bg-ink-muted active:bg-ink motion-reduce:transition-none";

type ProductLink = {
  title: string;
  href: string;
  desc: string;
  icon: ComponentType<LucideProps>;
  external?: boolean;
};

const PRODUCT_LINKS: ProductLink[] = [
  {
    title: "Free email verifier tool",
    href: "/validate-email",
    desc: "Check any address",
    icon: MailCheck,
  },
  {
    title: "Bulk verifier",
    href: "/bulk-email-verifier",
    desc: "Clean CSV lists",
    icon: FileSpreadsheet,
  },
  {
    title: "Email verification API",
    href: "/email-verification-api",
    desc: "Real-time signup checks",
    icon: Code2,
  },
  {
    title: "Find Emails",
    href: FIND_EMAILS_URL,
    desc: "Discover email addresses",
    icon: Search,
    external: true,
  },
];

const FEATURE_LINKS: ProductLink[] = [
  {
    title: "Advanced Syntax Validation",
    href: "/#syntax-check",
    desc: "Catch malformed addresses",
    icon: Braces,
  },
  {
    title: "Domain & MX Record Checks",
    href: "/#mx-check",
    desc: "Confirm the domain can receive mail",
    icon: Globe,
  },
  {
    title: "Real-Time SMTP Verification",
    href: "/#mailbox-check",
    desc: "Verify the mailbox without sending",
    icon: ShieldCheck,
  },
  {
    title: "Disposable Email Detection",
    href: "/#disposable-check",
    desc: "Filter throwaway inboxes",
    icon: Trash2,
  },
  {
    title: "Role-Based Email Detection",
    href: "/#role-based-filtering",
    desc: "Spot info@, admin@, and support@",
    icon: Users,
  },
  {
    title: "Smart Risk Scoring",
    href: "/#risk-check",
    desc: "Classify deliverable vs risky",
    icon: Gauge,
  },
];

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


  return (
    <header
      className="relative z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* 1-off: pill header columns — logo | nav | actions */}
        <div className="grid h-16 grid-cols-[1fr_auto] items-center rounded-full border border-line bg-surface px-4 shadow-[var(--shadow-card)] md:grid-cols-[1fr_auto_1fr] md:px-6">
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
            className="hidden items-center gap-4 lg:gap-6 md:flex"
            aria-label="Primary"
          >
            <div
              className="relative"
              onMouseEnter={openProduct}
              onMouseLeave={closeProduct}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setIsProductOpen(false);
                }
              }}
            >
              <button
                type="button"
                className="flex min-h-11 items-center gap-1 text-sm font-medium text-ink-muted transition hover:text-primary"
                aria-haspopup="true"
                aria-expanded={isProductOpen}
                aria-controls="product-menu"
                onClick={() =>
                  isProductOpen ? setIsProductOpen(false) : openProduct()
                }
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
              {/* pt-2 is a hover bridge so the cursor can reach the panel */}
              <div
                id="product-menu"
                className={cn(
                  "absolute left-0 top-full z-60 pt-2 transition",
                  isProductOpen
                    ? "visible opacity-100"
                    : "invisible pointer-events-none opacity-0"
                )}
              >
                <ul
                  role="menu"
                  className="grid w-80 gap-1 rounded-2xl border border-line bg-surface p-3 shadow-[var(--shadow-card)]"
                >
                  {PRODUCT_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.href} role="none">
                        <Link
                          href={item.href}
                          role="menuitem"
                          className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-surface-muted"
                          onClick={() => setIsProductOpen(false)}
                          {...(item.external
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                        >
                          <Icon
                            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                          <span>
                            <span className="block text-xs font-medium text-ink">
                              {item.title}
                            </span>
                            <span className="text-xs leading-snug text-ink-muted">
                              {item.desc}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div
              className="relative"
              onMouseEnter={openFeatures}
              onMouseLeave={closeFeatures}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setIsFeaturesOpen(false);
                }
              }}
            >
              <button
                type="button"
                className="flex min-h-11 items-center gap-1 text-sm font-medium text-ink-muted transition hover:text-primary"
                aria-haspopup="true"
                aria-expanded={isFeaturesOpen}
                aria-controls="features-menu"
                onClick={() =>
                  isFeaturesOpen ? setIsFeaturesOpen(false) : openFeatures()
                }
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
              <div
                id="features-menu"
                className={cn(
                  "absolute left-0 top-full z-60 pt-2 transition",
                  isFeaturesOpen
                    ? "visible opacity-100"
                    : "invisible pointer-events-none opacity-0"
                )}
              >
                <ul
                  role="menu"
                  className="grid w-[36rem] grid-cols-2 gap-1 rounded-2xl border border-line bg-surface p-3 shadow-[var(--shadow-card)]"
                >
                  {FEATURE_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.href} role="none">
                        <Link
                          href={item.href}
                          role="menuitem"
                          className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-surface-muted"
                          onClick={() => setIsFeaturesOpen(false)}
                        >
                          <Icon
                            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                          <span>
                            <span className="block text-xs font-medium text-ink">
                              {item.title}
                            </span>
                            <span className="text-xs leading-snug text-ink-muted">
                              {item.desc}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <Link
              href="/validate-email"
              className="text-sm font-medium text-ink-muted hover:text-primary"
            >
              Free tool
            </Link>
            <Link
              href="/bulk-email-verifier"
              className="text-sm font-medium text-ink-muted hover:text-primary"
            >
              Bulk
            </Link>
            <Link
              href="/email-verification-api"
              className="text-sm font-medium text-ink-muted hover:text-primary"
            >
              API
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-ink-muted hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-ink-muted hover:text-primary"
            >
              Blog
            </Link>
          </nav>

          <div className="hidden items-center gap-3 justify-self-end md:flex">
            <Link
              href={SIGNIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ink-muted hover:text-primary"
            >
              Log in
            </Link>
            <Button
              size="sm"
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
            className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center justify-self-end rounded-full md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-60 mt-3 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)] md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-11 items-center gap-3 py-2 text-ink-muted hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                      {...(item.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-primary"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
              {FEATURE_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-11 items-center gap-3 py-2 text-ink-muted hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-primary"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/pricing"
                  className="block py-2 text-ink-muted hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block py-2 text-ink-muted hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href={SIGNIN_URL}
                  className="block py-2 text-ink-muted hover:text-primary"
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
