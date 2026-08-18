import { ScrollFilm } from "@/components/film/scroll-film";
import { Contact } from "@/components/sections/contact";
import { pageMetadata, seo } from "@/lib/seo";

export const metadata = pageMetadata({
  title: seo.title,
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
