"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { whatsappUrl } from "@/lib/site";

export function TalkButton({ href, className }: { href?: string; className?: string }) {
  const { t } = useI18n();
  const canvas = useRef<HTMLCanvasElement>(null);
  const hot = useRef(false);
  const to = href ?? whatsappUrl(t.waPrefill);
  const external = !to.startsWith("/") && !to.startsWith("#");

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = 260;
    const h = 56;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let id = 0;
    let t0 = 0;

    const draw = () => {
      t0 += hot.current ? 0.09 : 0.05;
      const amp = hot.current ? 12 : 7;
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const n = x / w;
        const y =
          h / 2 +
          Math.sin(n * 14 + t0 * 2.1) * amp +
          Math.sin(n * 32 + t0 * 3.4) * (amp * 0.28);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(167, 139, 250, 0.55)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      if (!reduce) id = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={["hud-talk", className].filter(Boolean).join(" ")}
      onPointerEnter={() => {
        hot.current = true;
      }}
      onPointerLeave={() => {
        hot.current = false;
      }}
    >
      <span className="hud-btn-scan" aria-hidden />
      <canvas ref={canvas} className="hud-scope" width={260} height={56} aria-hidden />
      <span className="hud-talk-label">{t.talk}</span>
      <span className="hud-click" aria-hidden>
        👆
      </span>
    </a>
  );
}
