import type { Metadata, Viewport } from "next";
import { Rubik, Varela_Round } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { A11yProvider } from "@/components/providers/a11y-provider";
import { A11ySkip, A11yWidget } from "@/components/layout/a11y-widget";
import { CookieBar } from "@/components/layout/cookie-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { ogImage, organizationGraph, seo } from "@/lib/seo";
import { absUrl, site } from "@/lib/site";
import "./globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
});

const varela = Varela_Round({
  weight: "400",
  subsets: ["hebrew", "latin"],
  variable: "--font-round",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s | ${site.nameHe}`,
  },
  description: seo.description,
  applicationName: site.nameEn,
  authors: [{ name: site.nameEn, url: site.url }],
  creator: site.nameEn,
  publisher: site.nameEn,
  keywords: [...seo.keywords],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "he-IL": "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: [{ url: "/brand/logo-mark.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/brand/logo-mark.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/brand/logo-mark.png"],
  },
  appleWebApp: {
    capable: true,
    title: site.nameEn,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: seo.titleEn,
    description: seo.ogDescription,
    url: site.url,
    siteName: site.nameEn,
    locale: "he_IL",
    alternateLocale: ["en_US"],
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.titleEn,
    description: seo.ogDescription,
    images: [ogImage.url],
  },
  other: {
    "og:logo": absUrl("/brand/logo-mark.png"),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#06040a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${varela.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg font-sans text-fg">
        <JsonLd data={organizationGraph()} />
        <I18nProvider>
          <A11yProvider>
            <A11ySkip />
            <div className="site-root">
              <div className="grain" />
              <Header />
              <div id="main-content">
                <SmoothScroll>{children}</SmoothScroll>
              </div>
              <Footer />
            </div>
            <A11yWidget />
            <CookieBar />
          </A11yProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
