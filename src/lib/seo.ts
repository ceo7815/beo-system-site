import type { Metadata } from "next";
import { absUrl, site } from "@/lib/site";
import { posts, type BlogPost } from "@/lib/blog";

export const ogSize = { width: 1200, height: 630 } as const;

export const seo = {
  title: "ביו סיסטם | פיתוח תוכנה ובינה מלאכותית",
  titleEn: "Beo System — Software. AI.",
  description:
    "ביו סיסטם — חברת פיתוח תוכנה עם AI. סוכני בינה מלאכותית, צ׳אטבוטים, אוטומציות, מערכות CRM, אפליקציות ואתרים.",
  descriptionEn:
    "Beo System — a software company with AI. Agents, chatbots, automations, CRM systems, apps and websites.",
  ogDescription:
    "מבינים תוכנה. מבינים AI. סוכנים, מערכות ואפליקציות שנבנים לעסק שלך.",
  keywords: [
    "ביו סיסטם",
    "Beo System",
    "Beo Systems",
    "פיתוח תוכנה",
    "בינה מלאכותית",
    "סוכני AI",
    "צ׳אטבוטים",
    "אוטומציות",
    "CRM",
    "אפליקציות",
    "אתרים",
    "קריית ביאליק",
    "דובאי",
  ],
} as const;

export const ogImage = {
  url: "/og.png",
  width: ogSize.width,
  height: ogSize.height,
  alt: site.nameEn,
  type: "image/png" as const,
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  images = [ogImage],
  publishedTime,
  socialDescription,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  images?: NonNullable<NonNullable<Metadata["openGraph"]>["images"]>;
  publishedTime?: string;
  socialDescription?: string;
}): Metadata {
  const url = absUrl(path);
  const ogTitle = path === "/" ? seo.titleEn : `${title} | ${site.nameEn}`;
  const share = socialDescription ?? description;
  const twitterImage =
    Array.isArray(images) && images.length
      ? typeof images[0] === "string"
        ? images[0]
        : "url" in images[0]
          ? images[0].url
          : ogImage.url
      : ogImage.url;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "he-IL": path,
        "x-default": path,
      },
    },
    openGraph: {
      title: ogTitle,
      description: share,
      url,
      siteName: site.nameEn,
      locale: "he_IL",
      alternateLocale: ["en_US"],
      type,
      images,
      ...(publishedTime ? { publishedTime, authors: [site.nameEn] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: share,
      images: [typeof twitterImage === "string" ? twitterImage : String(twitterImage)],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: site.nameHe,
        item: site.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: absUrl(item.path),
      })),
    ],
  };
}

export function organizationGraph() {
  const orgId = `${site.url}/#organization`;
  const siteId = `${site.url}/#website`;
  const logo = absUrl("/brand/logo-mark.png");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: site.nameEn,
        legalName: site.nameEn,
        alternateName: [site.nameHe, "Beo Systems", "Beo-system"],
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: logo,
          width: 512,
          height: 512,
        },
        image: absUrl("/og.png"),
        email: site.email,
        telephone: site.phoneTel,
        foundingLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: "החרושת 10",
            addressLocality: "קריית ביאליק",
            addressCountry: "IL",
          },
        },
        address: [
          {
            "@type": "PostalAddress",
            streetAddress: "החרושת 10",
            addressLocality: "קריית ביאליק",
            addressCountry: "IL",
          },
          {
            "@type": "PostalAddress",
            addressLocality: "Business Bay",
            addressRegion: "Dubai",
            addressCountry: "AE",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phoneTel,
          email: site.email,
          contactType: "sales",
          areaServed: ["IL", "AE"],
          availableLanguage: ["Hebrew", "English"],
        },
        sameAs: [site.social.instagram, site.social.tiktok, site.social.facebook].filter(Boolean),
        areaServed: [
          { "@type": "Country", name: "Israel" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
        knowsLanguage: ["he", "en"],
        description: seo.description,
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: site.url,
        name: site.nameEn,
        alternateName: site.nameHe,
        inLanguage: ["he-IL", "en"],
        publisher: { "@id": orgId },
        description: seo.description,
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: seo.title,
        description: seo.description,
        inLanguage: "he-IL",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        primaryImageOfPage: absUrl("/og.png"),
      },
    ],
  };
}

export function articleJsonLd(post: BlogPost, lang: "he" | "en" = "he") {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[lang],
    description: post.excerpt[lang],
    image: absUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang === "he" ? "he-IL" : "en",
    author: {
      "@type": "Organization",
      name: site.nameEn,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.nameEn,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: absUrl("/brand/logo-mark.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absUrl(`/blog/${post.slug}`),
    },
    isPartOf: {
      "@type": "Blog",
      name: `${site.nameHe} — בלוג`,
      url: absUrl("/blog"),
    },
  };
}

export function sitemapEntries() {
  const now = new Date();
  return [
    { path: "/", lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { path: "/about", lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/blog", lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T12:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { path: "/privacy", lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    {
      path: "/accessibility",
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
