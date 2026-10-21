import type { Metadata } from "next";
import { LpThanks } from "@/components/lp/lp-thanks";
import { lpPageMetadata } from "@/lib/lp-meta";
import { lpThanksPath } from "@/lib/lp";

export const metadata: Metadata = lpPageMetadata({
  metaTitle: "קיבלנו",
  metaDescription: "הפנייה נשלחה. ביו סיסטם חוזרים.",
  path: lpThanksPath,
});

export default function ThanksPage() {
  return <LpThanks />;
}
