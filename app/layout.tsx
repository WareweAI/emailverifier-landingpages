import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Inter } from "next/font/google"
// import OfferBanner from "@/Components/OfferBanner";

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
        alt: "Email Verifier",
      },
    ],
    type: "website",
    siteName: "Email Verifier",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
    site: "@emailverifier",
  },
};

const InterFont = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
  display: 'swap',
})


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
      <body className={`antialiased ${InterFont.variable} font-sans flex flex-col min-h-screen`}>
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
