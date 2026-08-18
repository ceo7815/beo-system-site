"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { site, whatsappUrl } from "@/lib/site";
import { useI18n } from "@/components/providers/i18n-provider";

export function Contact() {
  const { lang, t } = useI18n();
  const [sent, setSent] = useState(false);
  const [need, setNeed] = useState(t.needs[0]);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNeed(t.needs[0]);
    setOpen(false);
  }, [lang, t.needs]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const company = String(data.get("company") || "").trim();
    const text = [t.waPrefill, name, phone, company, need].filter(Boolean).join("\n");
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section id="contact" className="contact-stage">
      <div className="contact-glow" aria-hidden />
      <div className="contact-shell">
        <div className="contact-copy">
          <p className="contact-kicker">{t.contactKicker}</p>
          <h2 className="contact-title">
            {t.contactTitle}
            <span>{t.contactRest}</span>
          </h2>
          <p className="contact-lead">{t.contactLead}</p>
          <ul className="contact-facts">
            <li>
              <span className="contact-fact-k">{t.factMobile}</span>
              <a href={`tel:${site.phoneTel}`} className="contact-phone" dir="ltr">
                <span className="contact-cc">{site.phonePrefix}</span>
                <span>{site.phoneLocal}</span>
              </a>
            </li>
            <li>
              <span className="contact-fact-k">{t.factEmail}</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            {site.places.map((place) => (
              <li key={place.maps}>
                <span className="contact-fact-k">{t.factAddress}</span>
                <a href={place.maps} target="_blank" rel="noreferrer">
                  {place[lang]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className={`contact-card${open ? " is-picking" : ""}`}>
          <label className="contact-label" htmlFor="contact-name">
            {t.name}
          </label>
          <input
            id="contact-name"
            required
            name="name"
            autoComplete="name"
            className="contact-input"
          />
          <label className="contact-label" htmlFor="contact-phone">
            {t.phone}
          </label>
          <input
            id="contact-phone"
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            className="contact-input"
          />
          <label className="contact-label" htmlFor="contact-company">
            {t.company}
          </label>
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            className="contact-input"
          />
          <label className="contact-label" id="contact-need-label">
            {t.need}
          </label>
          <div className={`contact-select${open ? " is-open" : ""}`} ref={box}>
            <button
              type="button"
              className="contact-select-btn"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-labelledby="contact-need-label"
              onClick={() => setOpen((v) => !v)}
            >
              <span>{need}</span>
              <svg viewBox="0 0 12 8" aria-hidden>
                <path d="M1 1.5L6 6.5L11 1.5" />
              </svg>
            </button>
            <ul className="contact-select-list" role="listbox" hidden={!open}>
              {t.needs.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={item === need}
                    className={item === need ? "is-on" : undefined}
                    onClick={() => {
                      setNeed(item);
                      setOpen(false);
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="hud-talk contact-submit">
            <span className="hud-btn-scan" aria-hidden />
            <span className="hud-talk-label">{sent ? t.sent : t.send}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
