import type { Metadata } from "next";
import { BlogContent } from "@/components/pages/blog-content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "בלוג",
  description: "מאמרים על פיתוח, מערכות ובינה מלאכותית — כל מה שצריך לדעת.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${site.nameHe} — בלוג`,
          description: metadata.description,
          url: `${site.url}/blog`,
          inLanguage: ["he-IL", "en"],
          publisher: { "@type": "Organization", name: site.nameEn, url: site.url },
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "בלוג", path: "/blog" }])} />
      <BlogContent />
    </>
  );
}
