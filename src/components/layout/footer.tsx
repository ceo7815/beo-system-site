"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { useI18n } from "@/components/providers/i18n-provider";

export function Footer() {
  const { lang, t } = useI18n();

  return (
    <footer className="site-footer" dir="ltr">
      <p className="site-footer-copy" dir="ltr">
        {t.footerRights}
      </p>
      <nav className="site-footer-links" dir={lang} aria-label={`${t.privacy}, ${t.accessibility}`}>
        <Link href="/privacy">{t.privacy}</Link>
        <Link href="/accessibility">{t.accessibility}</Link>
      </nav>
      <Link href="/" className="site-footer-logo" aria-label={`${site.nameEn} — ${site.nameHe}`}>
        <Image
          src="/brand/logo-mark.png"
          alt={`${site.nameEn} — ${site.nameHe}`}
          width={88}
          height={88}
        />
      </Link>
    </footer>
  );
}
