"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { ProjectKind } from "@/lib/projects";

export function DeviceStage({
  kind,
  poster,
  video,
  videoWebm,
  active,
  armed,
  title,
}: {
  kind: ProjectKind;
  poster: string;
  video?: string;
  videoWebm?: string;
  active: boolean;
  armed: boolean;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) {
      const play = el.play();
      if (play) play.catch(() => undefined);
      return;
    }
    el.pause();
  }, [active, armed]);

  return (
    <div className={`device device--${kind}${active ? " is-on" : ""}`}>
      <div className="device-glow" aria-hidden />
      <div className="device-tilt">
        {kind === "web" ? (
          <div className="device-laptop">
            <div className="device-lid">
              <span className="device-camera" aria-hidden />
              <div className="device-screen device-screen--wide">
                <Screen
                  poster={poster}
                  video={video}
                  videoWebm={videoWebm}
                  title={title}
                  videoRef={videoRef}
                  fit="contain"
                  armed={armed}
                />
              </div>
            </div>
            <div className="device-hinge" aria-hidden />
            <div className="device-base" aria-hidden>
              <span className="device-deck" />
            </div>
          </div>
        ) : (
          <div className="device-phone">
            <span className="device-notch" aria-hidden />
            <div className="device-screen">
              <Screen
                poster={poster}
                video={video}
                videoWebm={videoWebm}
                title={title}
                videoRef={videoRef}
                fit="cover"
                armed={armed}
              />
            </div>
            <span className="device-bar" aria-hidden />
          </div>
        )}
      </div>
    </div>
  );
}

function Screen({
  poster,
  video,
  videoWebm,
  title,
  videoRef,
  fit,
  armed,
}: {
  poster: string;
  video?: string;
  videoWebm?: string;
  title: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  fit: "contain" | "cover";
  armed: boolean;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className={`device-poster device-fit-${fit}`} decoding="async" />
      {armed && (video || videoWebm) ? (
        <video
          ref={videoRef}
          className={`device-video device-fit-${fit}`}
          poster={poster}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label={title}
        >
          {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
          {video ? <source src={video} type="video/mp4" /> : null}
        </video>
      ) : null}
      <span className="device-glass" aria-hidden />
    </>
  );
}
