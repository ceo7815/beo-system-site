import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/about-content";
import { CrawlCopy } from "@/components/seo/crawl-copy";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "מי אנחנו — ביו סיסטם",
  description:
    "ביו סיסטם (ביוסיסטם) — חברת פיתוח אפליקציות, אתרים ומערכות AI. ישראל (קריית ביאליק) ודובאי.",
  path: "/about",
});

const aboutCrawl = [
  "ביו סיסטם (ביוסיסטם, Beo System) היא חברת פיתוח אפליקציות, אתרים ומערכות AI — מערכות חכמות, אוטומציות וסוכנים שמחברים טכנולוגיה לצרכים האמיתיים של העסק.",
  "אנחנו לא מאמינים בפתרונות מדף. כל מערכת מתחילה בהבנת העסק, התהליכים והיעדים — ומשם אנחנו מתכננים ובונים פתרון מדויק שעובד עבורכם, חוסך זמן ומאפשר לעסק לצמוח.",
  "ההתמחות שלנו כוללת סוכני AI, מערכות ניהול ו-CRM, אוטומציות עסקיות, פיתוח מערכות Web, אפליקציות, פורטלים ודשבורדים, לצד אינטגרציות וחיבורים בין המערכות שכבר קיימות בעסק.",
  "אנחנו מלווים את הלקוח משלב הרעיון והאפיון, דרך הפיתוח וההטמעה ועד לתפעול, שיפור והרחבת המערכת לאורך זמן.",
  "עם פעילות בישראל (החרושת 10, קריית ביאליק) ובדובאי (Business Bay), אנחנו מביאים שילוב של חשיבה עסקית, פיתוח מתקדם ו-AI.",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "מי אנחנו", path: "/about" }])} />
      <CrawlCopy heading="ביו סיסטם — מי אנחנו" paragraphs={aboutCrawl} />
      <AboutContent />
    </>
  );
}
