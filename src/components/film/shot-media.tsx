"use client";

import { useEffect, useRef, useState } from "react";

export function ShotMedia({
  index,
  src,
  srcMobile,
  still,
}: {
  index: number;
  src: string;
  srcMobile: string;
  still: string;
  label: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, [src, srcMobile]);

  return (
    <div data-shot={index} className="absolute inset-0 overflow-hidden bg-[#0c0814]">
      <picture>
        <source media="(max-width: 767px)" srcSet={srcMobile} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          data-shot-img={index}
          src={src}
          alt=""
          draggable={false}
          decoding="async"
          fetchPriority={index === 0 ? "high" : "low"}
          onError={(e) => {
            const el = e.currentTarget;
            if (srcMobile && el.currentSrc.includes("/film/m/")) {
              el.src = src;
              return;
            }
            setFailed(true);
          }}
          className={`film-still film-still--${still} absolute inset-0 h-full w-full object-cover`}
          style={{ display: failed ? "none" : "block" }}
        />
      </picture>
    </div>
  );
}
