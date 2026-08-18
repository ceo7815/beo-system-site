import { ScrollFilm } from "@/components/film/scroll-film";
import { Contact } from "@/components/sections/contact";
import { pageMetadata, seo } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: site.nameEn,
  description: seo.description,
  socialDescription: seo.ogDescription,
  path: "/",
});

export default function Home() {
  return (
    <main>
      <ScrollFilm />
      <Contact />
    </main>
  );
}
