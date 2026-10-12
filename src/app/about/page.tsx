import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/about-content";
import { SmoothScrollLite } from "@/components/providers/smooth-scroll-lite";
import { FromTheBlog } from "@/components/sections/from-the-blog";
import { JsonLd } from "@/components/seo/json-ld";
import { brandFaqJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "מי אנחנו — ביו סיסטם",
  description:
    "ביו סיסטם (ביוסיסטם) — חברת פיתוח אפליקציות, אתרים ומערכות AI. ישראל (קריית ביאליק) ודובאי.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SmoothScrollLite>
      <JsonLd data={breadcrumbJsonLd([{ name: "מי אנחנו", path: "/about" }])} />
      <JsonLd data={brandFaqJsonLd()} />
      <AboutContent />
      <FromTheBlog />
    </SmoothScrollLite>
  );
}
