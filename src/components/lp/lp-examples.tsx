"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { lpExampleEmbed, type LpExample } from "@/lib/lp";

function ExamplePoster({ variant }: { variant: "a" | "b" }) {
  return (
    <div className={variant === "b" ? "lp-poster lp-ex-b" : "lp-poster"} aria-hidden>
      <div className="lp-sky" />
      <div className="lp-moon" />
      <div className="lp-city">
        <div className="lp-tower t1">
          <span />
          <span />
          <span />
        </div>
        <div className="lp-tower t2">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="lp-tower t3">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="lp-tower t4">
          <span />
          <span />
        </div>
      </div>
      <div className="lp-ground" />
      <div className="lp-letterbox" />
    </div>
  );
}

function LpExampleCard({ item, variant }: { item: LpExample; variant: "a" | "b" }) {
  const file = item.src.trim();
  const embed = file ? null : lpExampleEmbed(item.embedUrl ?? "");
  const playable = Boolean(file || embed);
  const [live, setLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function start() {
    if (file) {
      setLive(true);
      void videoRef.current?.play();
      return;
    }
    if (embed) setLive(true);
  }

  return (
    <figure className="lp-stage lp-example">
      <div className="lp-stage-glow" aria-hidden />
      <div className="lp-bezel">
        <span className="lp-bezel-cam" aria-hidden />
        <div className="lp-screen" data-video-slot={live ? "ready" : "placeholder"}>
          {file ? (
            <video
              ref={videoRef}
              src={file}
              poster={item.poster || undefined}
              controls={live}
              playsInline
              muted
              preload="none"
              aria-label={item.title}
            />
          ) : null}
          {embed && live ? (
            <iframe
              src={embed}
              title={item.title}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : null}
          {!live && item.poster && !file ? (
            <Image
              src={item.poster}
              alt=""
              fill
              sizes="(max-width: 768px) 92vw, 40vw"
              className="lp-screen-still"
            />
          ) : null}
          {!live && !item.poster ? <ExamplePoster variant={variant} /> : null}
          {!live && !playable ? <div className="lp-sweep" aria-hidden /> : null}
          {!live && !playable ? <span className="lp-slot-tag">מקום שמור</span> : null}
          {!live && playable ? (
            <button type="button" className="lp-example-hit" aria-label={`ניגון: ${item.title}`} onClick={start}>
              <span className="lp-play">
                <span />
              </span>
            </button>
          ) : null}
          {!live && !playable ? (
            <div className="lp-play" aria-hidden>
              <span />
            </div>
          ) : null}
          {!live ? <div className="lp-screen-glass" aria-hidden /> : null}
        </div>
      </div>
      <figcaption className="lp-stage-caption">{item.title}</figcaption>
    </figure>
  );
}

export function LpExamples({
  kicker,
  title,
  lead,
  items,
}: {
  kicker: string;
  title: string;
  lead?: string;
  items: readonly LpExample[];
}) {
  return (
    <section className="lp-section lp-examples" data-lp-block>
      <header className="lp-section-head">
        <p data-lp className="lp-kicker">
          {kicker}
        </p>
        <h2 data-lp className="lp-section-title">
          {title}
        </h2>
        {lead ? (
          <p data-lp className="lp-examples-lead">
            {lead}
          </p>
        ) : null}
      </header>
      <ul className="lp-example-grid">
        {items.map((item, index) => (
          <li key={`${item.title}-${index}`} data-lp>
            <LpExampleCard item={item} variant={index % 2 === 0 ? "a" : "b"} />
          </li>
        ))}
      </ul>
    </section>
  );
}
