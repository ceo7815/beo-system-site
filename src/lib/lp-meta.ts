import type { Metadata } from "next";
import type { LpPage } from "@/lib/lp";
import { ogImage } from "@/lib/seo";
import { absUrl, site } from "@/lib/site";

export function lpPageMetadata(page: Pick<LpPage, "metaTitle" | "metaDescription" | "path">): Metadata {
  const title = `${page.metaTitle} | ${site.nameEn}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.path },
    openGraph: {
      title,
      description: page.metaDescription,
      url: absUrl(page.path),
      siteName: site.nameEn,
      locale: "he_IL",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.metaDescription,
      images: [ogImage.url],
    },
  };
}
