import { ogSize } from "@/lib/seo";
import { shareCard } from "@/lib/og-card";
import { site } from "@/lib/site";

export const alt = site.nameEn;
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return shareCard();
}
