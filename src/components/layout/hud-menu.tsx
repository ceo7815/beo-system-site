"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { nav } from "@/lib/site";
import { scrollToId } from "@/lib/lenis";
import { useI18n } from "@/components/providers/i18n-provider";

export function HudMenu() {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const labels = {
    home: t.navHome,
    about: t.navAbout,
    blog: t.navBlog,
    contact: t.navContact,
  } as const;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.dataset.menuOpen = open ? "1" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.dataset.menuOpen = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function onContact(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    document.body.dataset.menuOpen = "";

    const go = () => {
      if (pathname === "/") {
        scrollToId("contact");
        window.history.replaceState(null, "", "/#contact");
        return;
      }
      router.push("/#contact");
    };

    window.setTimeout(go, 80);
  }

  const panel = (
    <div className={`hud-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="hud-menu-glow" aria-hidden />
      <nav className="hud-menu-nav" aria-label={t.menu}>
        {nav.map((item, i) => {
          const label = labels[item.id];
          const active =
            item.href === "/"
              ? pathname === "/"
              : item.href !== "/#contact" && pathname === item.href;
          const className = `hud-menu-link${active ? " is-on" : ""}`;
          const index = String(i + 1).padStart(2, "0");
          const style = { "--i": i } as CSSProperties;

          if (item.id === "contact") {
            return (
                <a key={item.id} href={item.href} className={className} style={style} onClick={onContact}>
                <span className="hud-menu-n">{index}</span>
                <span className="hud-menu-txt">{label}</span>
              </a>
            );
          }

          return (
            <Link key={item.id} href={item.href} className={className} style={style} onClick={() => setOpen(false)}>
              <span className="hud-menu-n">{index}</span>
              <span className="hud-menu-txt">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={`hud-burger${open ? " is-open" : ""}`}
        aria-label={t.menu}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="hud-btn-scan" aria-hidden />
        <span className="hud-burger-lines" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </button>
      {mounted ? createPortal(panel, document.body) : null}
    </>
  );
}
