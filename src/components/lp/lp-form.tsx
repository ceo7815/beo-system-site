"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { currentPagePath, trackEvent } from "@/lib/analytics";
import { lpContact, lpLeadText, lpThanksPath, lpWhatsappUrl, type LpPage } from "@/lib/lp";

export function LpForm({ page }: { page: LpPage }) {
  const router = useRouter();
  const [qualifier, setQualifier] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const sending = useRef(false);
  const fieldId = `lp-${page.id}`;

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
    if (sending.current) return;
    const form = e.currentTarget;
    const name = form.elements.namedItem("name");
    const phone = form.elements.namedItem("phone");
    const email = form.elements.namedItem("email");
    const qualifierInput = form.elements.namedItem("qualifier");
    if (
      !(name instanceof HTMLInputElement) ||
      !(phone instanceof HTMLInputElement) ||
      !(email instanceof HTMLInputElement) ||
      !(qualifierInput instanceof HTMLInputElement)
    ) {
      return;
    }

    name.setCustomValidity(name.value.trim().length < 2 ? "צריך שם" : "");
    const digits = phone.value.replace(/\D/g, "");
    phone.setCustomValidity(digits.length < 9 ? "צריך מספר טלפון" : "");
    if (email.validity.valueMissing) email.setCustomValidity("צריך אימייל");
    else if (email.validity.typeMismatch) email.setCustomValidity("האימייל לא נראה תקין");
    else email.setCustomValidity("");
    qualifierInput.setCustomValidity(qualifierInput.value ? "" : "צריך לבחור");

    if (!form.reportValidity()) return;

    sending.current = true;
    const fields = {
      name: name.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
      qualifier: qualifierInput.value,
    };
    window.open(lpWhatsappUrl(lpLeadText(page, fields)), "_blank", "noopener,noreferrer");
    trackEvent("generate_lead", {
      page_path: currentPagePath(),
      source: page.path,
    });
    router.push(`${lpThanksPath}?source=${encodeURIComponent(page.path)}`);
  }

  return (
    <section id="lp-lead" className="contact-stage lp-contact">
      <div className="contact-glow" aria-hidden />
      <div className="contact-shell">
        <div className="contact-copy">
          <p className="contact-kicker">צור קשר</p>
          <h2 className="contact-title">
            משאירים פנייה.
            <span> אנחנו חוזרים.</span>
          </h2>
          <p className="contact-lead">{page.formLead}</p>
          <ul className="contact-facts">
            <li>
              <span className="contact-fact-k">נייד</span>
              <a href={`tel:${lpContact.phoneTel}`} className="contact-phone" dir="ltr">
                <span className="contact-cc">{lpContact.phonePrefix}</span>
                <span>{lpContact.phoneLocal}</span>
              </a>
            </li>
            <li>
              <span className="contact-fact-k">אימייל</span>
              <a href={`mailto:${lpContact.email}`}>{lpContact.email}</a>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className={`contact-card${open ? " is-picking" : ""}`} noValidate>
          <label className="contact-label" htmlFor={`${fieldId}-name`}>
            שם
          </label>
          <input
            id={`${fieldId}-name`}
            required
            name="name"
            autoComplete="name"
            className="contact-input"
          />
          <label className="contact-label" htmlFor={`${fieldId}-phone`}>
            טלפון
          </label>
          <input
            id={`${fieldId}-phone`}
            required
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="contact-input"
          />
          <label className="contact-label" htmlFor={`${fieldId}-email`}>
            אימייל
          </label>
          <input
            id={`${fieldId}-email`}
            required
            name="email"
            type="email"
            autoComplete="email"
            className="contact-input"
            dir="ltr"
          />
          <label className="contact-label" id={`${fieldId}-qualifier-label`}>
            {page.qualifierLabel}
          </label>
          <div className={`contact-select${open ? " is-open" : ""}`} ref={box}>
            <button
              type="button"
              className="contact-select-btn"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-labelledby={`${fieldId}-qualifier-label`}
              onClick={() => setOpen((v) => !v)}
            >
              <span>{qualifier || page.qualifierPlaceholder}</span>
              <svg viewBox="0 0 12 8" aria-hidden>
                <path d="M1 1.5L6 6.5L11 1.5" />
              </svg>
            </button>
            <ul className="contact-select-list" role="listbox" hidden={!open}>
              {page.qualifierOptions.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={item === qualifier}
                    className={item === qualifier ? "is-on" : undefined}
                    onClick={() => {
                      setQualifier(item);
                      setOpen(false);
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <input
              className="lp-qualifier-input"
              name="qualifier"
              value={qualifier}
              required
              tabIndex={-1}
              aria-hidden
              onChange={(event) => setQualifier(event.target.value)}
            />
          </div>
          <button type="submit" className="hud-talk contact-submit">
            <span className="hud-btn-scan" aria-hidden />
            <span className="hud-talk-label">שליחה לוואטסאפ</span>
          </button>
        </form>
      </div>
    </section>
  );
}
