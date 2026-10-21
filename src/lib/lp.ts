/**
 * Campaign landing pages — one place for contact details and the real-estate examples.
 *
 * TODO: phone, WhatsApp, and email are not decided yet.
 * Defaults match what the live site shows today:
 *   +33 6 32 51 90 53  and  ceo@beosystem.co.il
 * Change them here only. Every LP reads this file.
 *
 * These routes stay out of `src/lib/seo.ts` sitemapEntries() and out of `nav`.
 */

export const lpContact = {
  /** TODO: confirm the campaign phone. */
  phoneDisplay: "+33 6 32 51 90 53",
  /** TODO: confirm the campaign phone prefix shown beside the local number. */
  phonePrefix: "+33",
  /** TODO: confirm the campaign local number. */
  phoneLocal: "6 32 51 90 53",
  /** TODO: confirm the campaign tel: href (digits, leading +). */
  phoneTel: "+33632519053",
  /** TODO: confirm the campaign WhatsApp number (digits only, no +). */
  whatsapp: "33632519053",
  /** TODO: confirm the campaign email. */
  email: "ceo@beosystem.co.il",
} as const;

/**
 * Two example films on the real-estate page.
 * TODO: for each slot, set ONE source. Leave both empty to keep the cinematic placeholder.
 * - `src`: a file in /public, e.g. "/lp/example-project.mp4"
 * - `embedUrl`: a YouTube or Vimeo page URL, used only when `src` is empty
 * - `poster`: optional still, e.g. "/lp/example-project.webp"
 * Titles stay generic. Do not put client names, project names, or logos here.
 */
export const lpRealEstateExamples = [
  {
    src: "",
    poster: "",
    title: "סרטון לפרויקט",
    embedUrl: "",
  },
  {
    src: "",
    poster: "",
    title: "גרסה למודעה",
    embedUrl: "",
  },
] as const;

export type LpExample = {
  src: string;
  poster: string;
  title: string;
  embedUrl?: string;
};

/** YouTube or Vimeo only. Returns a muted embed URL, or null. */
export function lpExampleEmbed(url: string) {
  const raw = url.trim();
  if (!raw) return null;
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
  if (
    host === "youtu.be" ||
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "youtube-nocookie.com"
  ) {
    const parts = parsed.pathname.split("/").filter(Boolean);
    let id = "";
    if (host === "youtu.be") id = parts[0] ?? "";
    else if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") id = parts[1] ?? "";
    else id = parsed.searchParams.get("v") ?? "";
    if (!/^[\w-]{6,20}$/.test(id)) return null;
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1`;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = parsed.pathname.split("/").filter((part) => /^\d{6,12}$/.test(part)).pop();
    if (!id) return null;
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&title=0&byline=0&portrait=0&dnt=1`;
  }
  return null;
}

export type LpPage = {
  id: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  line: string;
  lead: string;
  cta: string;
  audiences?: readonly string[];
  video?: { src: string; poster: string };
  examplesKicker?: string;
  examplesTitle?: string;
  examplesLead?: string;
  examples?: readonly LpExample[];
  benefitsKicker: string;
  benefitsTitle: string;
  benefits: readonly { n: string; title: string; body: string }[];
  stepsKicker: string;
  stepsTitle: string;
  steps: readonly { n: string; title: string; body: string }[];
  faqKicker: string;
  faqTitle: string;
  faq: readonly { q: string; a: string }[];
  formLead: string;
  qualifierLabel: string;
  qualifierPlaceholder: string;
  qualifierOptions: readonly string[];
  waIntro: string;
};

const realEstate: LpPage = {
  id: "ai-video-realestate",
  path: "/lp/ai-video-realestate",
  metaTitle: "סרטוני AI לנדל״ן",
  metaDescription:
    "סרטון קולנועי לפרויקט נדל״ן מתוכנית מכר וכמה הדמיות. ליזמים, לקבלנים, למנהלי שיווק, למשרדי פרסום ולמתווכים. בימים, לא בחודשים.",
  kicker: "נדל״ן",
  title: "סרטון קולנועי לפרויקט –\nמתוכנית מכר וכמה הדמיות",
  line: "בימים, לא בחודשים.",
  lead: "זה כל מה שצריך מאיתכם. הסרטון יוצא לאתר, למודעה, ולוואטסאפ ללקוח.",
  cta: "דברו איתנו",
  examplesKicker: "דוגמאות",
  examplesTitle: "דוגמאות מהעבודה.",
  examples: lpRealEstateExamples,
  benefitsKicker: "למה סרטון",
  benefitsTitle: "הדמיה שעומדת במקום לא מוכרת.",
  benefits: [
    {
      n: "01",
      title: "תנועה במקום סטילס",
      body: "הדמיה שזזה מרגישה כמו סיור בפרויקט, לא כמו שקף במצגת.",
    },
    {
      n: "02",
      title: "ימים, לא חודשים",
      body: "בלי הפקה ארוכה ובלי לחכות שהאתר יהיה מוכן ליום צילום.",
    },
    {
      n: "03",
      title: "חומר שאפשר לפרסם",
      body: "סרטון אחד שעובד באתר, בסטורי ובמודעה. אותו פרויקט, כמה אורכים.",
    },
    {
      n: "04",
      title: "בלי לרדוף אחרי צילום",
      body: "מספיקות תוכנית מכר וכמה הדמיות. בלי יום צילום.",
    },
  ],
  stepsKicker: "איך זה עובד",
  stepsTitle: "מחומר קיים לסרטון שאפשר להעלות.",
  steps: [
    {
      n: "01",
      title: "שולחים חומר",
      body: "תוכנית מכר וכמה הדמיות. זה מה שצריך כדי להתחיל.",
    },
    {
      n: "02",
      title: "סוגרים כיוון",
      body: "אורך, קצב, ואיפה הסרטון עולה. בלי סבב תיקונים אינסופי.",
    },
    {
      n: "03",
      title: "מייצרים",
      body: "סרטון לפרויקט, מוכן לפרסום. לא מצגת על תהליך.",
    },
    {
      n: "04",
      title: "עולים לאוויר",
      body: "אתר, קמפיין, וואטסאפ ללקוח. הסרטון יוצא לעבודה.",
    },
  ],
  faqKicker: "שאלות",
  faqTitle: "לפני ששולחים חומר.",
  faq: [
    {
      q: "הסרטון מחליף צילום בשטח?",
      a: "כשהפרויקט עוד לא בנוי, או כשיש הדמיות חזקות, כן. כשיש בניין גמור ואפשר לצלם, אפשר גם לשלב.",
    },
    {
      q: "כמה זמן עד שיש סרטון?",
      a: "ימים, לא חודשי הפקה. תלוי בחומר שמגיע ובאורך שצריך.",
    },
    {
      q: "למי זה מתאים?",
      a: "יזם, קבלן, מנהל שיווק אצל יזם, משרד פרסום, ומתווך עם פרויקט לקדם.",
    },
    {
      q: "מה צריך לשלוח?",
      a: "תוכנית מכר וכמה הדמיות. לא צריך להגיע לאתר.",
    },
    {
      q: "אפשר גם גרסה קצרה למודעה?",
      a: "כן. מתחילים מאורך אחד, וחותכים ממנו גרסה קצרה.",
    },
  ],
  formLead: "ספרו מי אתם. חוזרים עם כיוון לסרטון.",
  qualifierLabel: "מה מתאר אותך?",
  qualifierPlaceholder: "בחרו",
  qualifierOptions: ["יזם", "קבלן", "מנהל שיווק", "משרד פרסום", "מתווך"],
  waIntro: "היי, אשמח לסרטון לפרויקט נדל״ן",
};

const agent: LpPage = {
  id: "ai-agent",
  path: "/lp/ai-agent",
  metaTitle: "סוכן AI ובוט לוואטסאפ",
  metaDescription:
    "סוכן AI ובוט לוואטסאפ שעונים ללקוחות, שואלים את השאלות, ומעבירים ליד מסונן. מענה גם כשהצוות באמצע שיחה.",
  kicker: "סוכן AI",
  title: "עונים ללקוח. מסננים את הליד.",
  line: "בוט לוואטסאפ שעובד גם כשאתם באמצע שיחה.",
  lead: "הסוכן עונה בעברית, שואל מה שצריך, ומעביר אליכם רק פנייה ששווה זמן.",
  cta: "דברו איתנו",
  benefitsKicker: "מה זה סוגר",
  benefitsTitle: "הלקוח לא מחכה שתתפנו.",
  benefits: [
    {
      n: "01",
      title: "מענה מיידי",
      body: "פנייה שנכנסת בערב, בשיחה, או בין לקוחות — מקבלת תשובה עכשיו.",
    },
    {
      n: "02",
      title: "סינון לפני השיחה",
      body: "מגיעים אליכם עם שם, צורך, ורמת דחיפות. לא עם «היי» ריק.",
    },
    {
      n: "03",
      title: "בטון של העסק",
      body: "עונה כמו שאתם מדברים. לא בוט גנרי עם תפריט של כפתורים.",
    },
    {
      n: "04",
      title: "לא הולך לאיבוד",
      body: "כל פנייה נשמרת. לא נעלמת בצ׳אט, ולא מחכה שמישהו יזכור.",
    },
  ],
  stepsKicker: "איך זה עובד",
  stepsTitle: "מערוץ אחד לליד שמגיע מוכן.",
  steps: [
    {
      n: "01",
      title: "מחברים וואטסאפ",
      body: "המספר של העסק. בלי להחליף את הצוות ביום הראשון.",
    },
    {
      n: "02",
      title: "קובעים גבול",
      body: "מה מותר לענות, מה לשאול, ומה חייב לעבור לאדם.",
    },
    {
      n: "03",
      title: "הסוכן מסנן",
      body: "שואל, מסווג, ומסמן ליד ששווה שיחה.",
    },
    {
      n: "04",
      title: "אתם נכנסים",
      body: "בן אדם נכנס רק איפה שהגדרתם. השאר כבר טופל.",
    },
  ],
  faqKicker: "שאלות",
  faqTitle: "לפני שמחברים מספר.",
  faq: [
    {
      q: "זה צ׳אטבוט של שאלות ותשובות?",
      a: "לא רק. הוא עונה, שואל שאלות המשך, ומעביר ליד מסונן. בלי זה הוא סתם תפריט.",
    },
    {
      q: "הוא מחליף את הצוות?",
      a: "לא. הוא סוגר את השעות שאף אחד לא עונה, ומכין את השיחה למי שכן.",
    },
    {
      q: "עובד בעברית?",
      a: "כן. כולל ניסוח חופשי, לא רק מילות מפתח.",
    },
    {
      q: "אפשר להתחיל רק מוואטסאפ?",
      a: "כן. ערוץ אחד קודם. אתר או טלפון מצטרפים אחר כך, אם צריך.",
    },
    {
      q: "מה קורה בפנייה רגישה?",
      a: "עוברת לאדם. הסוכן לא סוגר החלטות שלא הגדרתם לו.",
    },
  ],
  formLead: "ספרו איפה הלקוחות פונים היום. חוזרים עם כיוון.",
  qualifierLabel: "איפה הלקוחות פונים היום?",
  qualifierPlaceholder: "בחרו",
  qualifierOptions: ["וואטסאפ", "אתר", "טלפון", "כמה ערוצים יחד"],
  waIntro: "היי, אשמח לסוכן AI ובוט לוואטסאפ",
};

const automation: LpPage = {
  id: "automation",
  path: "/lp/automation",
  metaTitle: "אוטומציה לעסק",
  metaDescription:
    "אוטומציה לעסק שמחברת פנייה, וואטסאפ ומערכת. תהליך אחד שרץ לבד, בלי לבנות את כל החברה מחדש.",
  kicker: "אוטומציה",
  title: "פחות העתקות. יותר עבודה שרצה.",
  line: "תהליך אחד שנגמר לבד, בלי לבנות את כל החברה מחדש.",
  lead: "פנייה, וואטסאפ ומערכת מדברים ביניהם. מפסיקים להעביר את אותו מידע ביד.",
  cta: "דברו איתנו",
  benefitsKicker: "מה זה סוגר",
  benefitsTitle: "העבודה שחוזרת על עצמה לא צריכה אתכם.",
  benefits: [
    {
      n: "01",
      title: "פנייה שלא נעלמת",
      body: "נכנסת למקום אחד, עם סטטוס. לא לשיחה, לא לאקסל, לא לראש של מישהו.",
    },
    {
      n: "02",
      title: "בלי תלות באדם אחד",
      body: "התהליך רץ גם כשמישהו בשיחה, בחופש, או פשוט לא ראה את ההודעה.",
    },
    {
      n: "03",
      title: "על מה שכבר יש",
      body: "מחברים כלים שכבר עובדים אצלכם. לא מחליפים הכול ביום אחד.",
    },
    {
      n: "04",
      title: "מתחילים קטן",
      body: "תהליך אחד. מרחיבים רק אחרי שזה רץ חלק על פניות אמיתיות.",
    },
  ],
  stepsKicker: "איך זה עובד",
  stepsTitle: "תהליך אחד. אחר כך עוד אחד.",
  steps: [
    {
      n: "01",
      title: "בוחרים תהליך",
      body: "המקום שבו הזמן נשרף היום. לא «כל העסק».",
    },
    {
      n: "02",
      title: "מחברים כלים",
      body: "האתר, הוואטסאפ, המערכת. מה שכבר בשימוש.",
    },
    {
      n: "03",
      title: "בודקים על אמת",
      body: "פניות אמיתיות, לא דמו. רואים אם זה באמת נסגר לבד.",
    },
    {
      n: "04",
      title: "מרחיבים",
      body: "עוד תהליך רק כשהראשון יציב. בלי פרויקט ענק מראש.",
    },
  ],
  faqKicker: "שאלות",
  faqTitle: "לפני שנוגעים בתהליך.",
  faq: [
    {
      q: "צריך להחליף את המערכת?",
      a: "לא. מתחילים מחיבור למה שכבר בשימוש.",
    },
    {
      q: "זה רק «אם־אז»?",
      a: "איפה שהקלט קבוע, כן. איפה שצריך להבין פנייה חופשית, נכנס סוכן. לא כופים את זה על תהליך פשוט.",
    },
    {
      q: "כמה זמן עד שרואים משהו רץ?",
      a: "ספרינט על תהליך אחד. לא פרויקט על כל החברה.",
    },
    {
      q: "מה לא נכנס לאוטומציה?",
      a: "החלטות שאתם רוצים שיישארו אצל אדם. שם נעצרים ומתריעים.",
    },
    {
      q: "אפשר לחבר אתר ווואטסאפ יחד?",
      a: "כן. חיבור נפוץ: טופס נפתח כרשומה, והודעה יוצאת לצוות.",
    },
  ],
  formLead: "ספרו מה שורף זמן. חוזרים עם תהליך אחד להתחיל ממנו.",
  qualifierLabel: "מה הכי מבזבז זמן?",
  qualifierPlaceholder: "בחרו",
  qualifierOptions: ["מענה לפניות", "מעקב אחרי לידים", "העברת מידע בין מערכות", "דיווחים ידניים"],
  waIntro: "היי, אשמח לאוטומציה לעסק",
};

export const lpPages = {
  realEstate,
  agent,
  automation,
} as const;

export const lpThanksPath = "/lp/thanks";

export function lpWhatsappUrl(text?: string) {
  const base = `https://wa.me/${lpContact.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function lpLeadText(
  page: Pick<LpPage, "path" | "waIntro" | "qualifierLabel">,
  fields: { name: string; phone: string; email: string; qualifier: string },
) {
  return [
    page.waIntro,
    `דף: ${page.path}`,
    `שם: ${fields.name}`,
    `טלפון: ${fields.phone}`,
    `אימייל: ${fields.email}`,
    `${page.qualifierLabel} ${fields.qualifier}`,
  ].join("\n");
}
