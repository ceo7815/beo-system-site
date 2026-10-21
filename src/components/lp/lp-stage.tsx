import Image from "next/image";
import type { LpPage } from "@/lib/lp";

function RealEstatePoster() {
  return (
    <div className="lp-poster" aria-hidden>
      <span className="lp-slot-tag">מקום שמור</span>
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

function AgentPoster() {
  return (
    <div className="lp-chat" aria-hidden>
      <p className="lp-bubble lp-bubble-in">יש פרויקט לקדם</p>
      <p className="lp-bubble lp-bubble-out">מה הצורך, ומתי?</p>
      <p className="lp-lead-chip">ליד לשיחה</p>
    </div>
  );
}

function AutoPoster() {
  return (
    <div className="lp-flow" aria-hidden>
      <span className="lp-flow-line" />
      <span className="lp-flow-dot" />
      <span>פנייה</span>
      <span>מערכת</span>
      <span>צוות</span>
    </div>
  );
}

function captionFor(page: LpPage) {
  if (page.video) return "מסטילס לתנועה";
  if (page.id === "ai-agent") return "עונה. מסנן. מעביר.";
  return "תהליך אחד. רץ לבד.";
}

export function LpStage({ page }: { page: LpPage }) {
  const video = page.video;
  const ready = Boolean(video?.src);

  return (
    <figure className="lp-stage">
      <div className="lp-stage-glow" aria-hidden />
      <div className="lp-bezel">
        <span className="lp-bezel-cam" aria-hidden />
        <div
          className="lp-screen"
          data-video-slot={video ? (ready ? "ready" : "placeholder") : undefined}
        >
          {ready ? (
            <video
              src={video?.src}
              poster={video?.poster || undefined}
              controls
              playsInline
              preload="metadata"
            />
          ) : video?.poster ? (
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(max-width: 960px) 92vw, 46vw"
              className="lp-screen-still"
            />
          ) : video ? (
            <RealEstatePoster />
          ) : page.id === "ai-agent" ? (
            <AgentPoster />
          ) : (
            <AutoPoster />
          )}
          {!ready ? <div className="lp-sweep" aria-hidden /> : null}
          {!ready ? (
            <div className="lp-play" aria-hidden>
              <span />
            </div>
          ) : null}
          <div className="lp-screen-glass" aria-hidden />
        </div>
      </div>
      <figcaption className="lp-stage-caption">{captionFor(page)}</figcaption>
    </figure>
  );
}
