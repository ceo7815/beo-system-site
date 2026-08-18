export type BlogLang = "he" | "en";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string };

export type BlogPost = {
  slug: string;
  n: string;
  date: string;
  minutes: number;
  image: string;
  imageAlt: { he: string; en: string };
  title: { he: string; en: string };
  excerpt: { he: string; en: string };
  body: { he: BlogBlock[]; en: BlogBlock[] };
};

export const posts: BlogPost[] = [
  {
    slug: "ai-agents",
    n: "01",
    date: "2026-08-18",
    minutes: 6,
    image: "/blog/agents.png",
    imageAlt: {
      he: "סוכן בינה מלאכותית שעובד מול מערכות הארגון",
      en: "An AI agent working against organization systems",
    },
    title: {
      he: "סוכני בינה מלאכותית שנכנסים לארגון",
      en: "AI agents that actually enter the organization",
    },
    excerpt: {
      he: "סוכן טוב לא עונה יפה בצ׳אט. הוא קורא, מחליט, כותב למערכת, ומעביר לאדם רק כשצריך.",
      en: "A good agent doesn’t just chat well. It reads, decides, writes to the system, and hands off to a person only when needed.",
    },
    body: {
      he: [
        { type: "p", text: "רוב הדמואים של בינה מלאכותית נראים מצוין על שולחן. שואלים שאלה, מקבלים תשובה, כולם מחייכים. אחר כך מגיעים לנתונים האמיתיים, להרשאות, ל-CRM ולשגרה — והדמו נשאר דמו." },
        { type: "p", text: "ב-Beo System סוכן נמדד לפי מה שהוא עושה בתוך העסק: האם הוא מקצר זמן, סוגר חור בתהליך, ומחובר למערכות שכבר רצות." },
        { type: "h2", text: "מה ההבדל בין צ׳אט לסוכן" },
        { type: "p", text: "צ׳אט עונה. סוכן פועל. הוא מקבל פנייה, מבין הקשר, בודק במערכת, פותח משימה, מעדכן סטטוס, ויודע מתי לעצור ולבקש אדם." },
        { type: "p", text: "בלי חיבור לנתונים ולהרשאות, זה עדיין בוט תשובות. עם חיבור — זה עובד דיגיטלי שיושב בתהליך." },
        { type: "h2", text: "איך סוכן נכנס בלי לשבור את העסק" },
        { type: "p", text: "מתחילים מתהליך אחד צר: לידים, שירות, תיאום, או סיווג פניות. מגדירים מה מותר לסוכן לעשות, מה אסור, ואיפה אדם חייב לאשר." },
        { type: "p", text: "רק אחרי שרואים תוצאה אמיתית מרחיבים. ככה לא בונים «מחלקת AI» על מצגת, אלא שגרה שעובדת." },
        { type: "h2", text: "מה לבדוק לפני שמתחילים" },
        { type: "p", text: "איפה הזמן נשרף היום. איזו מערכת היא מקור האמת. מי מאשר. ומה קורה כשהסוכן טועה. אם אין תשובה לשלושת האחרונים — עדיין לא מוכנים לסוכן, וזה בסדר. אפשר להתחיל משם." },
      ],
      en: [
        { type: "p", text: "Most AI demos look great on a table. You ask, it answers, everyone smiles. Then you hit real data, permissions, the CRM, and daily work — and the demo stays a demo." },
        { type: "p", text: "At Beo System an agent is measured by what it does inside the business: does it cut time, close a hole in the process, and connect to systems that already run." },
        { type: "h2", text: "Chat vs agent" },
        { type: "p", text: "Chat answers. An agent acts. It takes a request, reads context, checks the system, opens a task, updates status, and knows when to stop and ask a person." },
        { type: "p", text: "Without data and permissions, it is still a reply bot. With a connection, it is a digital worker sitting in the process." },
        { type: "h2", text: "How an agent enters without breaking the business" },
        { type: "p", text: "Start with one narrow process: leads, service, scheduling, or classifying requests. Define what the agent may do, what it may not, and where a person must approve." },
        { type: "p", text: "Only after a real result do you expand. That is how you avoid an “AI department” on slides, and get a routine that works." },
        { type: "h2", text: "What to check first" },
        { type: "p", text: "Where time burns today. Which system is the source of truth. Who approves. And what happens when the agent is wrong. If the last three have no answer, you are not ready yet — and that is fine. Start there." },
      ],
    },
  },
  {
    slug: "custom-development",
    n: "02",
    date: "2026-08-18",
    minutes: 5,
    image: "/blog/custom.png",
    imageAlt: {
      he: "פיתוח מערכת ניהול בהתאמה לעסק",
      en: "Custom business system development",
    },
    title: {
      he: "פיתוח בהתאמה: מערכת לפי איך שהעסק עובד",
      en: "Custom development: a system around how the business works",
    },
    excerpt: {
      he: "CRM, ERP, פורטלים ודשבורדים לא צריכים להכריח את הצוות לעבוד מסביב לתוכנה. התוכנה צריכה לשבת על התהליך.",
      en: "CRM, ERP, portals and dashboards should not force the team to work around the software. The software should sit on the process.",
    },
    body: {
      he: [
        { type: "p", text: "תבנית טובה חוסכת זמן — עד שהעסק לא נכנס אליה. אז מתחילים וויתורים: עוד עמודה באקסל, עוד קבוצת וואטסאפ, עוד אדם ש«יודע איך באמת עושים את זה»." },
        { type: "p", text: "פיתוח בהתאמה אצלנו מתחיל מהשטח: מכירה, שירות, מלאי, אישורים, דוחות. רק אחר כך בוחרים מה לבנות." },
        { type: "h2", text: "מתי צריך מערכת מותאמת" },
        { type: "p", text: "כשיש תהליך שחוזר כל יום, כמה מערכות שלא מדברות, והצוות ממציא סידורים. CRM מדף יכול להיות נכון. לפעמים לא. הסימן הוא פער בין מה שרשום במסך לבין מה שקורה בפועל." },
        { type: "h2", text: "איך בונים בלי פרויקט נצחי" },
        { type: "p", text: "אפיון קצר, ספרינט ראשון עם מסך שעובד, הרשאות ברורות, ואז הרחבה. לא מחכים שנה ל«המערכת המושלמת». עולים עם ליבה, ומשפרים לפי שימוש." },
        { type: "p", text: "זה נכון ל-CRM, לפורטל לקוחות, לדשבורד מנהלים ולחיבור בין כלים שכבר קיימים בעסק." },
        { type: "h2", text: "מה יוצאים איתו" },
        { type: "p", text: "מערכת שהצוות מסכים לפתוח בבוקר. פחות העתקות. פחות חורים. ומקום לגדול — מודול, סוכן, או דוח — בלי להחליף הכול כל שנתיים." },
      ],
      en: [
        { type: "p", text: "A good template saves time — until the business does not fit it. Then the workarounds start: another Excel column, another WhatsApp group, another person who “knows how it is really done”." },
        { type: "p", text: "Custom development here starts on the ground: sales, service, inventory, approvals, reports. Only then do we choose what to build." },
        { type: "h2", text: "When you need a fitted system" },
        { type: "p", text: "When a process repeats every day, several systems do not talk, and the team invents patches. An off-the-shelf CRM can be right. Sometimes it is not. The signal is a gap between what the screen says and what actually happens." },
        { type: "h2", text: "How to build without an endless project" },
        { type: "p", text: "A short spec, a first sprint with a working screen, clear permissions, then expand. Do not wait a year for the perfect system. Ship a core, then improve from use." },
        { type: "p", text: "That applies to CRM, a client portal, an exec dashboard, and wiring tools the business already has." },
        { type: "h2", text: "What you leave with" },
        { type: "p", text: "A system the team will open in the morning. Fewer copy-pastes. Fewer holes. And room to grow — a module, an agent, or a report — without replacing everything every two years." },
      ],
    },
  },
  {
    slug: "digital-products",
    n: "03",
    date: "2026-08-18",
    minutes: 5,
    image: "/blog/products.png",
    imageAlt: {
      he: "אפליקציה ואתר ברמת פרודקשן",
      en: "A production-grade app and website",
    },
    title: {
      he: "אפליקציות ואתרים ברמת פרודקשן",
      en: "Apps and websites at production grade",
    },
    excerpt: {
      he: "מוצר דיגיטלי זה לא רק מסך יפה. זה מהירות, בהירות, והדרך מהרעיון עד שהמשתמש באמת לוחץ.",
      en: "A digital product is not only a pretty screen. It is speed, clarity, and the path from idea to a real tap.",
    },
    body: {
      he: [
        { type: "p", text: "אתר או אפליקציה שיוצאים מהסטודיו צריכים לעמוד באותו מבחן: האם מישהו מבין תוך שניות מה לעשות, והאם זה נטען מהר מספיק כדי שלא ייסגר." },
        { type: "p", text: "ב-Beo System זה אותו סטנדרט כמו המערכת מאחור: עיצוב חד, קוד יציב, וחיבור לתהליך העסקי — לא דף שנשאר מצגת." },
        { type: "h2", text: "מה הופך מוצר ל«פרודקשן»" },
        { type: "p", text: "ניווט ברור, טקסט שמכבד את הקורא, טפסים שעובדים במובייל, ומדידה. בלי אלה יש מראה. עם אלה יש כלי." },
        { type: "p", text: "גוגל אוהב את אותו דבר שהמשתמש אוהב: כותרת אחת ברורה, תוכן קריא, דף מהיר, וכוונה מובנת. אין סתירה בין אתר יפה לאתר שנמצא." },
        { type: "h2", text: "מהרעיון עד למסך" },
        { type: "p", text: "מגדירים למי זה ולמה. מציירים מסכים אמיתיים, לא 40 שקפים. בונים, בודקים על מכשיר, מעלים, ומשפרים לפי שימוש." },
        { type: "h2", text: "מתי זה אפליקציה ומתי אתר" },
        { type: "p", text: "אם העבודה חוזרת בשטח, עם התראות או מצב לא מחובר — אפליקציה. אם המטרה היא אמון, פנייה והסבר — אתר. לפעמים צריך את שניהם, על אותה מערכת מאחור." },
        { type: "p", text: "השאלה הנכונה היא לא «איזה כלי חם עכשיו», אלא איך הלקוח או הצוות מגיעים לתוצאה בלי להילחם במסך." },
      ],
      en: [
        { type: "p", text: "A site or app that leaves the studio should pass the same test: does someone understand in seconds what to do, and does it load fast enough not to get closed." },
        { type: "p", text: "At Beo System that is the same bar as the system behind it: sharp design, stable code, and a link to the business process — not a page that stays a slide." },
        { type: "h2", text: "What makes a product “production”" },
        { type: "p", text: "Clear navigation, copy that respects the reader, forms that work on mobile, and measurement. Without those you have a look. With them you have a tool." },
        { type: "p", text: "Google likes the same things a user likes: one clear heading, readable content, a fast page, and a plain intent. A beautiful site and a findable site are not opposites." },
        { type: "h2", text: "From idea to screen" },
        { type: "p", text: "Define who it is for and why. Draw real screens, not a 40-slide deck. Build, test on a device, launch, then improve from use." },
        { type: "h2", text: "When it is an app and when it is a site" },
        { type: "p", text: "If the work repeats in the field, with alerts or offline state — an app. If the job is trust, a request, and an explanation — a site. Sometimes you need both, on the same system behind them." },
        { type: "p", text: "The right question is not “which tool is hot now”, but how the client or the team reach a result without fighting the screen." },
      ],
    },
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelated(slug: string) {
  return posts.filter((post) => post.slug !== slug);
}
