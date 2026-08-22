import type { Metadata } from "next";
import { ProjectsContent } from "@/components/pages/projects-content";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "פרויקטים — אפליקציות, אתרים ו-AI",
  description:
    "פרויקטים של ביו סיסטם (ביוסיסטם): פיתוח אפליקציות, אתרים, סוכני AI ומערכות ניהול — מהרעיון עד למסך.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "פרוייקטים", path: "/projects" }])} />
      <ProjectsContent />
      <Contact />
    </main>
  );
}
