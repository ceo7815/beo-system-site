"use client";

import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { LOGO_FOOTER_SIZES } from "@/lib/logo-mark";
import { site } from "@/lib/site";
import { useI18n } from "@/components/providers/i18n-provider";

/** Exact legal entity line for Meta Business verification. Hebrew on every page, including English. */
const LEGAL_ENTITY_LINE =
  'ב.א.א פתרונות דיגיטל מתקדמים בע"מ | ח.פ. 516846284 | חרושת 2, קריית ביאליק 2751019';

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
      <Link href="/" prefetch={false} className="site-footer-logo" aria-label={`${site.nameEn} — ${site.nameHe}`}>
        <LogoMark
          alt={`${site.nameEn} — ${site.nameHe}`}
          sizes={LOGO_FOOTER_SIZES}
          width={88}
          height={88}
        />
      </Link>
      <p className="site-footer-legal" dir="rtl">
        {LEGAL_ENTITY_LINE}
      </p>
    </footer>
  );
}
