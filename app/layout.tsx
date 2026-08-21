import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SmoothScroll from "@/Components/SmoothScroll";
import { Inter } from "next/font/google";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://emailverifier.io"),
  openGraph: {
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Email verifier — bulk list cleaning and real-time API",
      },
    ],
    type: "website",
    siteName: "EmailVerifier.io",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
    site: "@emailverifier",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth scroll-pt-28 ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', 'GTM-KFKDF433');
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KFKDF433"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Link
          href="#main-page"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-70 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </Link>

        <SmoothScroll header={<Header />}>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
