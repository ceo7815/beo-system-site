"use client";

import { useI18n } from "@/components/providers/i18n-provider";

export function LangToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div className="hud-lang" role="group" aria-label="Language">
      <button
        type="button"
        onClick={() => setLang("he")}
        className={lang === "he" ? "is-on" : ""}
        aria-pressed={lang === "he"}
      >
        <span className="hud-btn-scan" aria-hidden />
        <span className="hud-btn-txt">He</span>
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={lang === "en" ? "is-on" : ""}
        aria-pressed={lang === "en"}
      >
        <span className="hud-btn-scan" aria-hidden />
        <span className="hud-btn-txt">En</span>
      </button>
    </div>
  );
}
