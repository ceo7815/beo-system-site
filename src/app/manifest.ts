import type { MetadataRoute } from "next";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.nameEn} | ${site.nameHe}`,
    short_name: "Beo System",
    description: seo.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#06040a",
    theme_color: "#06040a",
    lang: "he",
    dir: "rtl",
    categories: ["business", "productivity", "developer"],
    icons: [
      {
        src: "/brand/logo-mark.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/logo-mark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
