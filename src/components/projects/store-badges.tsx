export function StoreBadges({
  apple,
  google,
  download,
}: {
  apple?: string;
  google?: string;
  download: string;
}) {
  if (!apple && !google) return null;

  return (
    <div className="store-badges">
      {apple ? (
        <a className="store-badge" href={apple} target="_blank" rel="noreferrer">
          <span className="store-badge-mark" aria-hidden>
            <AppleMark />
          </span>
          <span className="store-badge-copy">
            <span className="store-badge-kicker">{download}</span>
            <span className="store-badge-name">App Store</span>
          </span>
        </a>
      ) : null}
      {google ? (
        <a className="store-badge" href={google} target="_blank" rel="noreferrer">
          <span className="store-badge-mark" aria-hidden>
            <PlayMark />
          </span>
          <span className="store-badge-copy">
            <span className="store-badge-kicker">{download}</span>
            <span className="store-badge-name">Google Play</span>
          </span>
        </a>
      ) : null}
    </div>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.37 12.64c.03 3.43 3.01 4.57 3.04 4.58-.03.08-.47 1.62-1.56 3.2-.94 1.37-1.91 2.73-3.44 2.76-1.5.03-1.98-.89-3.7-.89-1.73 0-2.26.86-3.69.92-1.48.06-2.61-1.48-3.56-2.84-1.95-2.78-3.44-7.85-1.44-11.27.99-1.7 2.77-2.77 4.7-2.8 1.47-.03 2.85 1 3.7 1 .84 0 2.42-1.23 4.08-1.05.69.03 2.64.28 3.89 2.12-.1.06-2.32 1.36-2.02 4.07ZM13.9 5.18c.8-.96 1.33-2.3 1.18-3.63-1.14.05-2.52.76-3.34 1.72-.73.85-1.37 2.22-1.2 3.52 1.27.1 2.57-.64 3.36-1.61Z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24">
      <path fill="#EA4335" d="M3.2 2.4c-.3.2-.5.6-.5 1.1v16.9c0 .5.2.9.5 1.1l9.6-9.55L3.2 2.4Z" />
      <path fill="#FBBC04" d="m13.5 12.95 2.4-2.4-9.9-5.7 7.5 8.1Z" />
      <path fill="#4285F4" d="M20.4 10.7c.8.45.8 1.65 0 2.1l-3.3 1.9-2.5-2.45 2.4-2.4 3.4.85Z" />
      <path fill="#34A853" d="m3.2 21.55 10.3-8.6 2.5 2.45-9.9 5.7c-.5.3-1.1.2-2.9.45Z" />
    </svg>
  );
}
