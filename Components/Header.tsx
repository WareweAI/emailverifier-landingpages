"use client";

import { useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import LogoMark from "./ui/LogoMark";
import { gsap, useGSAP, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const REGISTER_URL = "https://app.emailverifier.io/register";
const SIGNIN_URL = "https://app.emailverifier.io/signin";

const PRODUCT_LINKS = [
  { title: "Free email tool", href: "/validate-email", desc: "Check any address" },
  { title: "Bulk verifier", href: "/bulk-email-verifier", desc: "Clean CSV lists" },
  { title: "Email verification API", href: "/email-verification-api", desc: "Real-time signup checks" },
  { title: "How it works", href: "/#how-it-works", desc: "Three-step workflow" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuOpenRef = useRef(false);
  const productCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  menuOpenRef.current = isMenuOpen;

  const openProduct = () => {
    if (productCloseTimer.current) clearTimeout(productCloseTimer.current);
    setIsProductOpen(true);
  };

  const closeProduct = () => {
    if (productCloseTimer.current) clearTimeout(productCloseTimer.current);
    productCloseTimer.current = setTimeout(() => setIsProductOpen(false), 120);
  };

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let hidden = false;
        let lastY = 0;
        const delta = 8;

        const show = () => {
          if (!hidden) return;
          hidden = false;
          gsap.to(header, {
            yPercent: 0,
            y: 0,
            autoAlpha: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const hide = () => {
          if (hidden || menuOpenRef.current) return;
          hidden = true;
          gsap.to(header, {
            yPercent: -100,
            y: -24,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.in",
            overwrite: true,
          });
        };

        const scrollY = () =>
          ScrollSmoother.get()?.scrollTop() ?? window.scrollY;

        const pastHero = () => {
          const hero = document.getElementById("hero");
          if (hero) return hero.getBoundingClientRect().bottom <= 48;
          return scrollY() > 96;
        };

        ScrollTrigger.create({
          start: 0,
          end: "max",
          invalidateOnRefresh: true,
          onUpdate: () => {
            const y = scrollY();
            if (!pastHero()) {
              show();
              lastY = y;
              return;
            }
            if (menuOpenRef.current) {
              show();
              lastY = y;
              return;
            }
            if (Math.abs(y - lastY) < delta) return;
            if (y > lastY) hide();
            else show();
            lastY = y;
          },
        });
      });

      return () => mm.revert();
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8"
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
                Product
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
                  {PRODUCT_LINKS.map((item) => (
                    <li key={item.href} role="none">
                      <Link
                        href={item.href}
                        role="menuitem"
                        className="block rounded-lg px-3 py-2 hover:bg-surface-muted"
                        onClick={() => setIsProductOpen(false)}
                      >
                        <span className="block font-medium text-ink">
                          {item.title}
                        </span>
                        <span className="text-xs text-ink-muted">{item.desc}</span>
                      </Link>
                    </li>
                  ))}
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
              asChild
              className="rounded-full bg-ink text-primary-foreground transition hover:scale-105 hover:bg-ink hover:opacity-90 motion-reduce:hover:scale-100"
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
            className="flex min-h-11 min-w-11 items-center justify-center justify-self-end rounded-full md:hidden"
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
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 text-ink-muted hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
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
                  href={SIGNIN_URL}
                  className="block py-2 text-ink-muted hover:text-primary"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Button
                  className="w-full rounded-full bg-ink text-primary-foreground hover:bg-ink hover:opacity-90"
                  asChild
                >
                  <Link href={REGISTER_URL}>Get 100 free credits</Link>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
