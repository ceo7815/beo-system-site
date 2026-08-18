export const site = {
  nameHe: "ביו סיסטם",
  nameEn: "Beo System",
  url: "https://beosystem.co.il",
  email: "ceo@beosystem.co.il",
  phone: "+33 6 32 51 90 53",
  phonePrefix: "+33",
  phoneLocal: "6 32 51 90 53",
  phoneTel: "+33632519053",
  whatsapp: "33632519053",
  domain: "beosystem.co.il",
  places: [
    {
      he: "ישראל: החרושת 10, קריית ביאליק",
      en: "Israel: 10 HaHaroshet, Kiryat Bialik",
      maps: "https://maps.google.com/?q=HaHaroshet+10+Kiryat+Bialik",
    },
    {
      he: "דובאי: Business Bay, Dubai",
      en: "Dubai: Business Bay, Dubai",
      maps: "https://maps.google.com/?q=Business+Bay+Dubai",
    },
  ],
  social: {
    instagram: "https://www.instagram.com/beosystem",
    tiktok: "https://www.tiktok.com/@beosystem",
    facebook: "https://www.facebook.com/beosystem",
  },
} as const;

export const nav = [
  { href: "/", id: "home" },
  { href: "/about", id: "about" },
  { href: "/blog", id: "blog" },
  { href: "/#contact", id: "contact" },
] as const;

export const services = [
  {
    n: "01",
    title: "בינה מלאכותית",
    body: "פיתוח AI שמחובר לנתונים, לתהליכים ולמערכות הקיימות — לא דמו, לא צ׳אט כללי.",
  },
  {
    n: "02",
    title: "סוכני AI",
    body: "סוכנים שפועלים בארגון: קוראים, מחליטים, כותבים למערכות, ומעבירים הלאה כשצריך אדם.",
  },
  {
    n: "03",
    title: "צ׳אטבוטים ואוטומציות",
    body: "מענה, לידים, תפעול ושגרות שרצות לבד. פחות וואטסאפ ידני, פחות חורים בתהליך.",
  },
  {
    n: "04",
    title: "תוכנה בהתאמה",
    body: "מערכות שנבנות לפי איך שהעסק באמת עובד — לא תבנית, לא מודול שלא מתאים.",
  },
  {
    n: "05",
    title: "CRM ומערכות ניהול",
    body: "לקוחות, מכירות, תפעול, הרשאות ודוחות במקום אחד. במקום אקסל, קבוצות ובלגן.",
  },
  {
    n: "06",
    title: "אפליקציות",
    body: "מוצרים דיגיטליים לצוות, ללקוחות או לשטח. ממשק ברור, יציב, שאפשר לגדול איתו.",
  },
  {
    n: "07",
    title: "אתרים",
    body: "אתרים שנראים כמו החברה שבניתם, נטענים מהר, וממירים. זה האתר שלנו — זה הסטנדרט.",
  },
] as const;

export const work = [
  {
    tag: "סוכן AI",
    title: "סוכן שעובד מול הלקוחות והמערכות",
    body: "לא בוט תשובות. סוכן שמסווג, עונה, ופותח משימות במערכת הקיימת.",
  },
  {
    tag: "מערכת",
    title: "CRM ותפעול בהתאמה לעסק",
    body: "תהליך המכירה והשירות במסך אחד — בלי לעבוד מסביב לתוכנה.",
  },
  {
    tag: "מוצר דיגיטלי",
    title: "אתר ואפליקציה ברמת פרודקשן",
    body: "חזית שנראית כמו המוצר, ומאחוריה מערכת שאפשר להמשיך לפתח.",
  },
] as const;

export const method = [
  {
    n: "01",
    title: "הבנה",
    body: "מה באמת קורה בעסק, איפה הזמן נשרף, ואיזו מערכת או סוכן יזוזו את המחט.",
  },
  {
    n: "02",
    title: "בנייה",
    body: "פיתוח בספרינטים קצרים. רואים תוצר אמיתי, לא מצגות. AI רק איפה שהוא מחובר לעבודה.",
  },
  {
    n: "03",
    title: "השקה",
    body: "עלייה לאוויר עם הרשאות, ניטור והדרכה. לא נעלמים אחרי הדמו.",
  },
  {
    n: "04",
    title: "המשך",
    body: "שיפור, סוכנים נוספים, מודולים חדשים. המערכת גדלה עם החברה.",
  },
] as const;

export const ticker = [
  "פיתוח תוכנה",
  "בינה מלאכותית",
  "סוכני AI",
  "צ׳אטבוטים",
  "אוטומציות",
  "CRM",
  "מערכות בהתאמה",
  "אפליקציות",
  "אתרים",
] as const;

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function absUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized === "/" ? "" : normalized}` || site.url;
}
