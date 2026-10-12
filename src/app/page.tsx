import { ScrollFilm } from "@/components/film/scroll-film";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Contact } from "@/components/sections/contact";
import { FromTheBlog } from "@/components/sections/from-the-blog";
import { JsonLd } from "@/components/seo/json-ld";
import { brandFaqJsonLd, pageMetadata, seo } from "@/lib/seo";

export const metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  socialDescription: seo.ogDescription,
  path: "/",
});

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <JsonLd data={brandFaqJsonLd()} />
        <h1 className="sr-only">
          ביו סיסטם — פיתוח אפליקציות, אתרים ובינה מלאכותית
        </h1>
        <ScrollFilm />
        <FromTheBlog />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
