import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/legal-content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "מדיניות פרטיות",
  description: "איך Beo System אוספת, שומרת ומשתמשת במידע שמוסרים באתר.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "מדיניות פרטיות", path: "/privacy" }])} />
      <LegalContent kind="privacy" />
    </>
  );
}
