"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers/i18n-provider";
import {
  cookieDefaults,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from "@/lib/cookies";

export function CookieBar() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookieConsent>(cookieDefaults);

  useEffect(() => {
    if (!readCookieConsent()) setVisible(true);
  }, []);

  function finish(next: CookieConsent) {
    writeCookieConsent(next);
    setVisible(false);
  }

  if (!visible) return null;

  const rows = [
    {
      key: "necessary" as const,
      title: t.cookieNecessary,
      hint: t.cookieNecessaryHint,
      locked: true,
      on: true,
    },
    {
      key: "preferences" as const,
      title: t.cookiePrefsKind,
      hint: t.cookiePrefsHint,
      locked: false,
      on: prefs.preferences,
    },
    {
      key: "analytics" as const,
      title: t.cookieAnalytics,
      hint: t.cookieAnalyticsHint,
      locked: false,
      on: prefs.analytics,
    },
    {
      key: "marketing" as const,
      title: t.cookieMarketing,
      hint: t.cookieMarketingHint,
      locked: false,
      on: prefs.marketing,
    },
  ];

  return (
    <div className={`cookie-bar${open ? " is-open" : ""}`} role="dialog" aria-label={t.cookieText}>
      <div className="cookie-bar-top">
        <p className="cookie-bar-text">
          {t.cookieText}{" "}
          <Link href="/privacy">{t.privacy}</Link>
        </p>
        <div className="cookie-bar-actions">
          <button
            type="button"
            className={`cookie-bar-reject${open ? " is-on" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {t.cookieCustomize}
          </button>
          <button
            type="button"
            className="cookie-bar-reject"
            onClick={() =>
              finish({ necessary: true, preferences: false, analytics: false, marketing: false })
            }
          >
            {t.cookieReject}
          </button>
          <button type="button" className="cookie-bar-save" onClick={() => finish(prefs)}>
            {t.cookieSave}
          </button>
          <button
            type="button"
            className="cookie-bar-accept"
            onClick={() =>
              finish({ necessary: true, preferences: true, analytics: true, marketing: true })
            }
          >
            {t.cookieAccept}
          </button>
        </div>
      </div>

      {open ? (
        <ul className="cookie-prefs">
          {rows.map((row) => (
            <li key={row.key}>
              <div>
                <p className="cookie-pref-title">{row.title}</p>
                <p className="cookie-pref-hint">{row.hint}</p>
              </div>
              <button
                type="button"
                className={`cookie-switch${row.on ? " is-on" : ""}`}
                disabled={row.locked}
                aria-pressed={row.on}
                aria-label={row.title}
                onClick={() => {
                  if (row.locked) return;
                  setPrefs((prev) => ({ ...prev, [row.key]: !prev[row.key] }));
                }}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
