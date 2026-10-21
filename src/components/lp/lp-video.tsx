export function LpVideo({ src, poster }: { src: string; poster: string }) {
  const ready = Boolean(src);

  return (
    <section className="lp-film" aria-label="סרטון הפרויקט">
      <div className="lp-film-frame" data-video-slot={ready ? "ready" : "placeholder"}>
        {ready ? (
          <video
            src={src}
            poster={poster || undefined}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="lp-film-slot">
            <span className="hud-btn-scan" aria-hidden />
            <span className="lp-film-slot-tag">מקום שמור</span>
            <span className="lp-play" aria-hidden>
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M8.2 5.8v12.4L18.4 12 8.2 5.8Z" />
              </svg>
            </span>
            <p className="lp-film-badge">סרטון</p>
            <p className="lp-film-title">הסרטון של הפרויקט יופיע כאן</p>
            <p className="lp-film-note">הסרטון נכנס לכאן כשהוא מוכן.</p>
          </div>
        )}
      </div>
    </section>
  );
}
