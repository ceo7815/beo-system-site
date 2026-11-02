/** Server-rendered AEO brief. Sits below ScrollFilm — do not move into the film/HUD. */
export function WhoWhatHow() {
  return (
    <section id="who-what-how" className="beo-brief" aria-labelledby="beo-brief-title">
      <div className="beo-brief-shell">
        <h2 id="beo-brief-title" className="beo-brief-title">
          בקצרה
        </h2>
        <p className="beo-brief-line">
          מי: ביו סיסטם (Beo System) היא חברה ישראלית לפיתוח אתרים, אפליקציות ומערכות AI, מקריית ביאליק ודובאי.
        </p>
        <p className="beo-brief-line">
          מה: סוכני AI, בוטים לוואטסאפ, סוכן AI טלפוני, מערכות לניהול לידים ואוטומציה לעסקים.
        </p>
        <p className="beo-brief-line">
          איך: מתחילים מתהליך אחד, בודקים על פניות אמיתיות, ורק אז מרחיבים.
        </p>
      </div>
    </section>
  );
}
