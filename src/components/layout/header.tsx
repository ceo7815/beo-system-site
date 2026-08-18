import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { LangToggle } from "@/components/layout/lang-toggle";
import { TalkButton } from "@/components/layout/talk-button";
import { SocialRail } from "@/components/layout/social-rail";
import { HudMenu } from "@/components/layout/hud-menu";
import { ScrollProgress } from "@/components/layout/scroll-progress";

export function Header() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50">
        <ScrollProgress />
        <div className="hud-chrome relative z-20 flex items-start justify-between px-5 pt-3 md:px-8 md:pt-4 pointer-events-none">
          <Link
            href="/"
            aria-label={`${site.nameEn} — ${site.nameHe}`}
            className="hud-logo pointer-events-auto shrink-0"
          >
            <Image
              src="/brand/logo-mark.png"
              alt={`${site.nameEn} — ${site.nameHe}`}
              width={320}
              height={320}
              priority
              className="h-24 w-24 object-contain md:h-52 md:w-52 lg:h-64 lg:w-64"
            />
          </Link>
          <div className="hud-slate pointer-events-auto">
            <TalkButton />
            <LangToggle />
            <HudMenu />
          </div>
        </div>
      </div>
      <SocialRail />
    </>
  );
}
