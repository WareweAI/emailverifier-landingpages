import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import LogoMark from "./ui/LogoMark";

const productLinks = [
  { href: "/validate-email", label: "Free email tool" },
  { href: "/bulk-email-verifier", label: "Bulk verifier" },
  { href: "/email-verification-api", label: "Email verification API" },
  { href: "/pricing", label: "Pricing" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

function FooterCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-semibold text-ink">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-muted transition hover:text-primary"
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 font-display text-xl font-semibold text-ink"
          >
            <LogoMark />
            EmailVerifier.io
          </Link>
          <div className="hidden h-px flex-1 bg-line sm:block" aria-hidden />
          <Link
            href="mailto:support@emailverifier.io"
            aria-label="Email support"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink shadow-[var(--shadow-card)] hover:text-primary"
          >
            <Mail className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
          Bulk, single-check, and API email verification at $1.80 per 1,000.
          Credits never expire.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <FooterCard title="Product">
            <nav aria-label="Footer — Product">
              <ul className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          </FooterCard>

          <FooterCard title="Legal">
            <nav aria-label="Footer — Legal">
              <ul className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          </FooterCard>

          <FooterCard title="Contact">
            <div className="space-y-3 text-sm text-ink-muted">
              <Link
                href="mailto:support@emailverifier.io"
                className="flex min-h-11 items-center gap-2 hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                support@emailverifier.io
              </Link>
              <address className="not-italic">
                <span className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    1111B S Governors Ave STE 25016
                    <br />
                    Dover, DE 19904 US
                  </span>
                </span>
              </address>
            </div>
          </FooterCard>
        </div>

        <p className="mt-10 text-center text-sm text-ink-muted lg:text-left">
          © {new Date().getFullYear()} EmailVerifier.io. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
