import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
// import OfferBanner from "@/Components/OfferBanner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Email Verifier: Free, Bulk & API Email Validation",
  description: "Reduce bounce rates by up to 98% with our advanced email validation service. 99.9% accuracy guaranteed.",
  alternates: {
    canonical: "https://emailverifier.io/",
  },
  openGraph: {
    title: "Email Verifier: Free, Bulk & API Email Validation",
    description: "Reduce bounce rates by up to 98% with our advanced email validation service. 99.9% accuracy guaranteed.",
    url: "https://emailverifier.io/",
    images: [
      {
        url: "https://emailverifier.io/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Email Verifier",
      },
    ],
    type: "website",
    siteName: "Email Verifier",
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Verifier: Free, Bulk & API Email Validation",
    description: "Reduce bounce rates by up to 98% with our advanced email validation service. 99.9% accuracy guaranteed.",
    images: ["https://emailverifier.io/og-image.jpg"],
    site: "@emailverifier",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
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
      <body className={'antialiased'}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KFKDF433"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Header />
        {/* <OfferBanner /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
