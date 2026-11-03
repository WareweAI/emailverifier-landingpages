import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import LogoMark from "./ui/LogoMark";

/** Footer nav mirrors Header mega menus (Products / Solutions / Resources). */
const productLinks = [
  { href: "/validate-email", label: "Email Validator" },
  { href: "/bulk-email-verifier", label: "Bulk Email Verifier" },
  { href: "/email-verification-api", label: "Email Validation API" },
  { href: "/find-emails", label: "Email Finder" },
  { href: "/find-leads", label: "Lead Finder" },
  { href: "/find-emails#bulk-find", label: "Data Enrichment" },
];

const solutionLinks = [
  { href: "/bulk-email-verifier", label: "Cold Outreach List Cleaning" },
  { href: "/email-verification-api", label: "Signup Form Validation" },
  { href: "/find-leads", label: "Prospecting" },
  { href: "/validate-email", label: "Blacklist Avoidance" },
];

const resourceLinks = [
  { href: "/blog", label: "Guides" },
  { href: "/#features", label: "Integrations" },
  { href: "/blog", label: "Blog" },
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

function FooterNavList({
  label,
  links,
}: {
  label: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <nav aria-label={label}>
      <ul className="grid grid-cols-1 gap-x-4">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <FooterLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-background">
      <div className="site-container py-16">
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
          Professional email verification trusted by thousands worldwide.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-6">
          <FooterCard title="Products">
            <FooterNavList label="Footer — Products" links={productLinks} />
          </FooterCard>

          <FooterCard title="Solutions">
            <FooterNavList label="Footer — Solutions" links={solutionLinks} />
          </FooterCard>

          <FooterCard title="Resources">
            <FooterNavList label="Footer — Resources" links={resourceLinks} />
          </FooterCard>

          <FooterCard title="Legal">
            <FooterNavList label="Footer — Legal" links={legalLinks} />
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
