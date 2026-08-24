import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/about-content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "מי אנחנו — ביו סיסטם",
  description:
    "ביו סיסטם (ביוסיסטם) — חברת פיתוח אפליקציות, אתרים ומערכות AI. ישראל (קריית ביאליק) ודובאי.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "מי אנחנו", path: "/about" }])} />
      <AboutContent />
    </>
  );
}
