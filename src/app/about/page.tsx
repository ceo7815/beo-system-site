import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/about-content";
import { SmoothScrollLite } from "@/components/providers/smooth-scroll-lite";
import { FromTheBlog } from "@/components/sections/from-the-blog";
import { JsonLd } from "@/components/seo/json-ld";
import { aboutFaqJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ביו סיסטם – סוכני AI, וואטסאפ ואוטומציה לעסקים",
  description:
    "ביו סיסטם (Beo System) היא חברה ישראלית שבונה סוכני AI, בוטים לוואטסאפ וניהול לידים לעסקים. קריית ביאליק ודובאי. דברו איתנו בוואטסאפ.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SmoothScrollLite>
      <JsonLd data={breadcrumbJsonLd([{ name: "מי אנחנו", path: "/about" }])} />
      <JsonLd data={aboutFaqJsonLd()} />
      <AboutContent />
      <FromTheBlog />
    </SmoothScrollLite>
  );
}
