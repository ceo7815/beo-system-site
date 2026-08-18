import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/legal-content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "הצהרת נגישות",
  description: 'הצהרת הנגישות של אתר Beo System לפי ת"י 5568, תקנות 2013 ו-WCAG 2.2 AA.',
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "הצהרת נגישות", path: "/accessibility" }])}
      />
      <LegalContent kind="accessibility" />
    </>
  );
}
