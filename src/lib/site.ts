export const site = {
  nameHe: "ביו סיסטם",
  nameEn: "Beo System",
  url: "https://beosystem.com",
  email: "ceo@beosystem.co.il",
  phone: "+33 6 32 51 90 53",
  phonePrefix: "+33",
  phoneLocal: "6 32 51 90 53",
  phoneTel: "+33632519053",
  whatsapp: "33632519053",
  domain: "beosystem.com",
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
    instagram: "https://www.instagram.com/beosystems/",
    tiktok: "https://www.tiktok.com/@beosystems",
    facebook: "https://www.facebook.com/share/1C7z7hqUTS/?mibextid=wwXIfr",
  },
} as const;

/** Disambiguates Beo System from BEO Software GmbH (beo-software.de). */
export const aboutAffiliationFaq = {
  he: {
    q: "האם ביו סיסטם קשורה ל־BEO Software?",
    a: "לא. BEO Software (beo-software.de) היא חברת תוכנה למכס ולוגיסטיקה בגרמניה. ביו סיסטם (Beo System) היא חברה ישראלית מקריית ביאליק ודובאי, שבונה סוכני AI, בוטים לוואטסאפ ואוטומציה לעסקים.",
  },
  en: {
    q: "Is Beo System affiliated with BEO Software?",
    a: "No. BEO Software (beo-software.de) is a customs and logistics software company in Germany. Beo System (ביו סיסטם) is an Israeli company from Kiryat Bialik and Dubai that builds AI agents, WhatsApp bots and business automation.",
  },
} as const;

/** Visible FAQ on /about (lead-intent questions). Also used for FAQPage JSON-LD. */
export const aboutFaq = {
  he: [
    {
      q: "מה ביו סיסטם עושה לעסקים?",
      a: "ביו סיסטם בונה סוכני AI, בוטים לוואטסאפ, סוכן AI טלפוני, מערכות לניהול לידים ואוטומציה לעסקים. המערכת מחוברת לכלים שכבר יש בעסק.",
    },
    {
      q: "איך מתחילים לעבוד עם ביו סיסטם?",
      a: "שולחים הודעה בוואטסאפ או ממלאים את טופס יצירת הקשר. בשיחה קצרה בוחרים תהליך אחד, ואז מקבלים הצעה לגרסה ראשונה.",
    },
    {
      q: "כמה עולה מערכת או סוכן AI?",
      a: "המחיר תלוי בתהליך, בערוצים ובחיבורים למערכות. אחרי שיחה קצרה אנחנו נותנים הצעה כתובה. בבלוג יש מאמר שמסביר ממה המחיר מורכב.",
    },
    {
      q: "למי זה מתאים?",
      a: "לעסק שמקבל פניות בוואטסאפ, בטלפון או מהאתר, ורוצה שאף ליד לא ילך לאיבוד. גם לעסק שעושה עבודה ידנית שחוזרת כל יום.",
    },
    {
      q: "איפה ביו סיסטם יושבת ובאילו שפות אתם עובדים?",
      a: "בישראל (החרושת 10, קריית ביאליק) ובדובאי (Business Bay). עובדים בעברית ובאנגלית.",
    },
    {
      q: "מה ההבדל בין צ׳אטבוט לסוכן AI?",
      a: "צ׳אט עונה. סוכן פועל: קורא נתונים, כותב למערכת, פותח משימה, ומעביר לאדם כשצריך.",
    },
    aboutAffiliationFaq.he,
  ],
  en: [
    {
      q: "What does Beo System do for businesses?",
      a: "Beo System builds AI agents, WhatsApp bots, an AI phone agent, lead management systems and business automation. The system connects to the tools the business already uses.",
    },
    {
      q: "How do we start working with Beo System?",
      a: "Send a WhatsApp message or fill in the contact form. In a short call we pick one process, and then you get a proposal for a first version.",
    },
    {
      q: "How much does a system or AI agent cost?",
      a: "The price depends on the process, the channels and the system integrations. After a short call we send a written proposal. Our blog has an article on what the price is made of.",
    },
    {
      q: "Who is it for?",
      a: "For a business that gets inquiries on WhatsApp, by phone or from the website, and wants no lead to get lost. Also for a business with manual work that repeats every day.",
    },
    {
      q: "Where is Beo System based, and which languages do you work in?",
      a: "Israel (10 HaHaroshet, Kiryat Bialik) and Dubai (Business Bay). We work in Hebrew and English.",
    },
    {
      q: "What is the difference between a chatbot and an AI agent?",
      a: "A chatbot answers. An agent acts: it reads data, writes to the system, opens a task, and hands over to a person when needed.",
    },
    aboutAffiliationFaq.en,
  ],
} as const;

export const nav = [
  { href: "/", id: "home" },
  { href: "/about", id: "about" },
  { href: "/projects", id: "projects" },
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
