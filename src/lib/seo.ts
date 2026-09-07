import type { Metadata } from "next";
import { absUrl, services, site } from "@/lib/site";
import { posts, type BlogPost } from "@/lib/blog";

export const ogSize = { width: 1200, height: 630 } as const;

export const seo = {
  title: "ביו סיסטם | פיתוח אפליקציות, אתרים ובינה מלאכותית",
  titleEn: "Beo System — Apps, websites, and AI",
  description:
    "ביו סיסטם (ביוסיסטם, Beo System) — חברת פיתוח אפליקציות, אתרים ומערכות AI. סוכני בינה מלאכותית, צ׳אטבוטים, אוטומציות ו-CRM לישראל ולדובאי.",
  descriptionEn:
    "Beo System (ביו סיסטם) — apps, websites, and AI systems. Agents, chatbots, automations, and CRM for Israel and Dubai.",
  ogDescription:
    "ביו סיסטם — פיתוח אפליקציות, אתרים ובינה מלאכותית. מבינים תוכנה. מבינים AI.",
  keywords: [
    "ביו סיסטם",
    "ביוסיסטם",
    "Beo System",
    "Beo Systems",
    "beosystem",
    "פיתוח אפליקציות",
    "פיתוח אתרים",
    "פיתוח תוכנה",
    "בינה מלאכותית",
    "חברת פיתוח תוכנה",
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
  const ogTitle = path === "/" ? seo.title : `${title} | ${site.nameEn}`;
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
        alternateName: [site.nameHe, "ביוסיסטם", "Beo Systems", "Beo-system", "beosystem"],
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
        knowsAbout: [
          "פיתוח אפליקציות",
          "פיתוח אתרים",
          "בינה מלאכותית",
          "סוכני AI",
          "CRM",
        ],
        description: seo.description,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "שירותי ביו סיסטם",
          itemListElement: services.map((item, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: item.title,
              description: item.body,
              provider: { "@id": orgId },
              areaServed: ["IL", "AE"],
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: site.url,
        name: site.nameEn,
        alternateName: [site.nameHe, "ביוסיסטם"],
        inLanguage: "he-IL",
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
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        inLanguage: "he-IL",
        mainEntity: [
          {
            "@type": "Question",
            name: "מה זה ביו סיסטם / ביוסיסטם?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ביו סיסטם (ביוסיסטם, Beo System) היא חברת פיתוח אפליקציות, אתרים ומערכות AI. סוכני בינה מלאכותית, צ׳אטבוטים, אוטומציות ו-CRM — לישראל ולדובאי.",
            },
          },
          {
            "@type": "Question",
            name: "האם ביו סיסטם מפתחת אפליקציות ואתרים?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "כן. פיתוח אפליקציות מובייל, אתרי תדמית ומערכות ווב בהתאמה, עם חיבור לתהליך העסקי — לא דף שנשאר מצגת.",
            },
          },
          {
            "@type": "Question",
            name: "מה ההבדל בין צ׳אטבוט לסוכן AI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "צ׳אט עונה. סוכן פועל: קורא נתונים, כותב למערכת, פותח משימה, ומעביר לאדם כשצריך. בלי חיבור ל-CRM ולמערכות — זה עדיין בוט תשובות.",
            },
          },
          {
            "@type": "Question",
            name: "איפה ביו סיסטם יושבת?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ישראל: החרושת 10, קריית ביאליק. דובאי: Business Bay.",
            },
          },
        ],
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
    { path: "/projects", lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
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
