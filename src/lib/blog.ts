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
    image: "/blog/agents.webp",
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
    image: "/blog/custom.webp",
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
    image: "/blog/products.webp",
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
  {
    slug: "apps-websites-ai",
    n: "04",
    date: "2026-08-22",
    minutes: 7,
    image: "/blog/apps-ai.webp",
    imageAlt: {
      he: "פיתוח אפליקציות, אתרים ובינה מלאכותית בחברת ביו סיסטם",
      en: "App, website, and AI development at Beo System",
    },
    title: {
      he: "פיתוח אפליקציות ואתרים עם AI — מתי זה חברה, ומתי זה דמו",
      en: "Apps and websites with AI — when it is a company, and when it is a demo",
    },
    excerpt: {
      he: "חברות מחפשות פיתוח אפליקציות, אתרים ובינה מלאכותית באותו מקום. ביו סיסטם (ביוסיסטם) בונה את שלושתם כמערכת אחת — לא שלושה ספקים.",
      en: "Companies want apps, websites, and AI from one place. Beo System builds all three as one system — not three vendors.",
    },
    body: {
      he: [
        { type: "p", text: "רוב החברות לא מחפשות «כלי AI». הן מחפשות מישהו שיבנה אפליקציה שעובדת בשטח, אתר שממיר פנייה, ומערכת שמחברת את שניהם ללידים, למשימות ולכסף. כשזה מתפצל לשלושה ספקים, מתחילים החורים: האתר לא מדבר עם ה-CRM, האפליקציה לא מעדכנת מלאי, והבוט עונה יפה בלי לפתוח משימה." },
        { type: "p", text: "ביו סיסטם (ביוסיסטם, Beo System) היא חברת פיתוח אפליקציות, אתרים ומערכות AI. העבודה נמדדת לפי תהליך שנסגר — לא לפי מצגת." },
        { type: "h2", text: "מה חברות באמת קונות" },
        { type: "p", text: "פיתוח אתרים טוב נותן אמון ודרך לפעולה: שירותים ברורים, טופס שעובד במובייל, וואטסאפ, ומדידה. פיתוח אפליקציות נכנס כשהעבודה חוזרת — הזמנות, שטח, התראות, מצב לא מחובר. בינה מלאכותית נכנסת רק אחרי שיש מערכת לכתוב אליה: לסווג פנייה, לפתוח ליד, לסכם שיחה, לא לספר סיפור." },
        { type: "p", text: "אם אין מקור אמת (CRM, הזמנות, לקוחות) — AI יישאר צ׳אט. אם אין אתר ברור — לא מגיעים לידים. אם אין אפליקציה במקום שצריך שטח — הצוות ימציא וואטסאפ." },
        { type: "h2", text: "איך בונים בלי פרויקט נצחי" },
        { type: "p", text: "מתחילים מתהליך אחד: לידים באתר, הזמנה באפליקציה, או סוכן שסוגר פנייה בשירות. ספרינט ראשון עם מסך חי. הרשאות. ואז מרחיבים. ככה עולים לאוויר, במקום לחכות שנה ל«המערכת המושלמת»." },
        { type: "p", text: "זה אותו סטנדרט בפרויקטים שכבר רצים: פורטל עסקים, אפליקציית חנות, אתר תדמית עם אוטומציית CRM, ומערכת ניהול עם סוכני AI בפנים." },
        { type: "h2", text: "מתי לפנות לביו סיסטם" },
        { type: "p", text: "כשיש עסק שצריך נוכחות דיגיטלית ומערכת מאחוריה — לא עוד דף נחיתה בלי תור. כשרוצים פיתוח אפליקציות ואתרים באותה שפה, עם AI שמחובר לנתונים. פעילות בישראל (קריית ביאליק) ובדובאי." },
        { type: "p", text: "אם יש תהליך שחוזר כל יום, כמה כלים שלא מדברים, וצוות שממציא סידורים — זה המקום להתחיל. משאירים פנייה באתר, ועוברים למסך שעובד." },
      ],
      en: [
        { type: "p", text: "Most companies are not shopping for “an AI tool”. They need an app that works in the field, a site that turns a visit into a request, and a system that ties both to leads, tasks, and money. Split that across three vendors and the holes start: the site does not talk to the CRM, the app does not update stock, the bot answers nicely without opening a task." },
        { type: "p", text: "Beo System (ביו סיסטם) builds apps, websites, and AI as one stack. The work is measured by a closed process — not a slide." },
        { type: "h2", text: "What companies actually buy" },
        { type: "p", text: "A good website is trust and a path to act: clear services, a form that works on mobile, WhatsApp, measurement. An app belongs when work repeats — orders, field, alerts, offline. AI belongs only after there is a system to write into: classify a request, open a lead, summarize a call — not tell a story." },
        { type: "p", text: "No source of truth (CRM, orders, customers) — AI stays chat. No clear site — leads do not arrive. No app where the field needs one — the team invents WhatsApp." },
        { type: "h2", text: "How to build without an endless project" },
        { type: "p", text: "Start with one process: leads on the site, an order in the app, or an agent that closes a service request. First sprint with a live screen. Permissions. Then expand. Ship, instead of waiting a year for the perfect system." },
        { type: "p", text: "Same bar on work already live: a business portal, a store app, a brand site with CRM automation, and an operating system with AI agents inside." },
        { type: "h2", text: "When to talk to Beo System" },
        { type: "p", text: "When the business needs a digital presence and a system behind it — not another landing page with no queue. When apps and websites should share one language, with AI wired to data. Israel (Kiryat Bialik) and Dubai." },
        { type: "p", text: "If a process repeats every day, several tools do not talk, and the team invents patches — start there. Leave a request on the site, and move to a screen that works." },
      ],
    },
  },
  {
    slug: "ai-lead-agent",
    n: "05",
    date: "2026-09-07",
    minutes: 7,
    image: "/blog/ai-lead-agent.webp",
    imageAlt: {
      he: "סוכן בינה מלאכותית שמנהל לידים מהאתר עד וואטסאפ ו־CRM",
      en: "An AI agent moving leads from the website to WhatsApp and CRM",
    },
    title: {
      he: "סוכן AI ללידים — מהאתר עד הוואטסאפ וה־CRM",
      en: "An AI lead agent — from the site to WhatsApp and the CRM",
    },
    excerpt: {
      he: "ליד טוב לא נגמר בטופס. סוכן AI מסווג פנייה, כותב למערכת, שולח לוואטסאפ, ומעביר לאדם רק כשצריך.",
      en: "A good lead does not end at the form. An AI agent classifies the request, writes to the system, pings WhatsApp, and hands off to a person only when needed.",
    },
    body: {
      he: [
        { type: "p", text: "רוב הלידים לא מתים בגלל חוסר עניין. הם מתים בין הטופס לוואטסאפ, בין הוואטסאפ לאקסל, ובין האקסל לאדם ש«יחזור אחר כך». ביו סיסטם (ביוסיסטם, Beo System) בונה סוכני AI שנכנסים למשפך הזה — לא עוד בוט שעונה יפה ונעלם." },
        { type: "p", text: "סוכן לידים נמדד לפי תהליך שנסגר: האם הפנייה הגיעה למקום הנכון, עם הקשר, בזמן, בלי שהצוות ימציא סידורים." },
        { type: "h2", text: "מה נשבר במשפך הלידים היום" },
        { type: "p", text: "באתר יש טופס. בוואטסאפ יש תור. ב־CRM יש שדות. באמצע — העתקה ידנית, הודעות שאבדו, וליד שחיכה שעתיים בלי תשובה. צ׳אטבוט מדף יכול לשאול שלוש שאלות. בלי חיבור למערכת הוא לא פותח משימה, לא מעדכן סטטוס, ולא יודע מי בצוות פנוי." },
        { type: "p", text: "הסימן ברור: יש פניות באתר, יש שיחות בוואטסאפ, ואין תמונה אחת של «מה קרה עם הליד הזה»." },
        { type: "h2", text: "סוכן לידים מול צ׳אטבוט מדף" },
        { type: "p", text: "צ׳אט עונה. סוכן פועל. הוא קורא את הפנייה, מסווג כוונה (מכירה, שירות, סתם שאלה), בודק אם יש לקוח קיים, כותב ל־CRM או לגיליון, שולח הודעה לוואטסאפ לפי תבנית, ומעביר לאדם כשהכלל דורש אישור." },
        { type: "p", text: "בלי מקור אמת — CRM, רשימת לקוחות, או לפחות תור מסודר — זה יישאר בוט תשובות. עם חיבור, זה עובד דיגיטלי שיושב בין האתר לצוות." },
        { type: "h2", text: "איך מחברים בלי לשבור את העסק" },
        { type: "p", text: "מתחילים מתהליך אחד צר: פנייה מהאתר (או מ־/#contact), אחר כך סיווג, רשומה במערכת, הודעה לוואטסאפ, ואדם רק לחריגים. מגדירים מה מותר לסוכן לעשות, מה אסור, ואיפה חובה אישור אנושי." },
        { type: "p", text: "ספרינט ראשון עם מסך חי עדיף על מצגת של «מחלקת AI». אחרי שרואים לידים שמגיעים נקיים — מרחיבים: תזכורות, סיווג מתקדם, חיבור ליומן או להצעת מחיר." },
        { type: "h2", text: "מה חייב להיות מוכן לפני שמתחילים" },
        { type: "p", text: "איפה הלידים נכנסים היום. איזו מערכת היא מקור האמת. מי מאשר הצעה או שיחה. ומה קורה כשהסוכן טועה בסיווג. אם אין תשובה לשלושת האחרונים — מתחילים משם, לא מהמודל." },
        { type: "p", text: "גם אתר ברור חשוב: שירותים קריאים, דרך לפעולה במובייל, וואטסאפ זמין. סוכן טוב על אתר מבולבל רק מאיץ בלבול." },
        { type: "h2", text: "מתי זה מתאים לביו סיסטם" },
        { type: "p", text: "כשצריך אתר, מערכת וסוכן באותה שפה — לא שלושה ספקים שמשאירים חורים. ביו סיסטם עובדת עם עסקים בישראל (קריית ביאליק) ובדובאי: פיתוח אפליקציות ואתרים, CRM בהתאמה, וסוכני AI שמחוברים לנתונים." },
        { type: "p", text: "אם יש תהליך לידים שחוזר כל יום, כמה כלים שלא מדברים, וצוות שמעתיק בין מסכים — זה המקום להתחיל. משאירים פנייה באתר או בוואטסאפ, ועוברים למשפך שעובד." },
      ],
      en: [
        {
          type: "p",
          text: "Most leads do not die from lack of interest. They die between the form and WhatsApp, between WhatsApp and a spreadsheet, and between the sheet and the person who will “get back later”. Beo System (ביו סיסטם) builds AI agents that enter that funnel — not another bot that answers nicely and disappears.",
        },
        {
          type: "p",
          text: "A lead agent is measured by a closed process: did the request reach the right place, with context, on time, without the team inventing workarounds.",
        },
        { type: "h2", text: "What breaks in the lead funnel today" },
        {
          type: "p",
          text: "The site has a form. WhatsApp has a queue. The CRM has fields. In the middle — manual copy-paste, lost messages, and a lead that waited two hours with no reply. A landing-page chatbot can ask three questions. Without a system connection it does not open a task, update status, or know who on the team is free.",
        },
        {
          type: "p",
          text: "The signal is clear: there are site requests, there are WhatsApp chats, and there is no single picture of “what happened to this lead”.",
        },
        { type: "h2", text: "Lead agent vs page chatbot" },
        {
          type: "p",
          text: "Chat answers. An agent acts. It reads the request, classifies intent (sales, service, just a question), checks for an existing customer, writes to the CRM or sheet, sends a WhatsApp message from a template, and hands off to a person when the rule requires approval.",
        },
        {
          type: "p",
          text: "Without a source of truth — CRM, customer list, or at least an ordered queue — it stays a reply bot. With a connection, it is a digital worker sitting between the site and the team.",
        },
        { type: "h2", text: "How to connect without breaking the business" },
        {
          type: "p",
          text: "Start with one narrow process: a request from the site (or /#contact), then classify, record in the system, WhatsApp message, and a person only for exceptions. Define what the agent may do, what it may not, and where human approval is mandatory.",
        },
        {
          type: "p",
          text: "A first sprint with a live screen beats an “AI department” deck. After clean leads start arriving — expand: reminders, richer classification, calendar or quote hooks.",
        },
        { type: "h2", text: "What must be ready before you start" },
        {
          type: "p",
          text: "Where leads enter today. Which system is the source of truth. Who approves a quote or a call. And what happens when the agent mis-classifies. If the last three have no answer — start there, not with the model.",
        },
        {
          type: "p",
          text: "A clear site matters too: readable services, a mobile path to act, WhatsApp available. A good agent on a confused site only speeds up confusion.",
        },
        { type: "h2", text: "When Beo System fits" },
        {
          type: "p",
          text: "When you need a site, a system, and an agent in one language — not three vendors leaving holes. Beo System works with businesses in Israel (Kiryat Bialik) and Dubai: apps and websites, fitted CRM, and AI agents wired to data.",
        },
        {
          type: "p",
          text: "If a lead process repeats every day, several tools do not talk, and the team copies between screens — start there. Leave a request on the site or WhatsApp, and move to a funnel that works.",
        },
      ],
    },
  },
  {
    slug: "ai-automation-start",
    n: "06",
    date: "2026-09-08",
    minutes: 6,
    image: "/blog/ai-automation-start.webp",
    imageAlt: {
      he: "אוטומציה עסקית עם בינה מלאכותית שמחברת תהליכים קיימים",
      en: "Business automation with AI connecting existing processes",
    },
    title: {
      he: "אוטומציה עם AI לעסק — מאיפה מתחילים בלי פרויקט נצחי",
      en: "AI automation for business — where to start without an endless project",
    },
    excerpt: {
      he: "אוטומציה טובה לא מחליפה את כל העסק בבת אחת. היא סוגרת חור אחד בתהליך — ואז גדלה.",
      en: "Good automation does not replace the whole business at once. It closes one hole in the process — then grows.",
    },
    body: {
      he: [
        { type: "p", text: "רוב העסקים לא צריכים «מחלקת AI». הם צריכים שתהליך שחוזר כל יום ייגמר בלי העתקות, בלי הודעות שאבדו, ובלי אדם שזוכר בעל־פה מה קרה אתמול. ביו סיסטם (ביוסיסטם, Beo System) בונה אוטומציות וסוכנים שמחוברים למערכות שכבר רצות — לא מצגת על הענן." },
        { type: "p", text: "השאלה הנכונה היא לא «איזה כלי חם». השאלה היא איזה חור בתהליך עולה הכי הרבה זמן וכסף." },
        { type: "h2", text: "מה אוטומציה עושה — ומה היא לא" },
        { type: "p", text: "אוטומציה מעבירה מידע, מעדכנת סטטוס, שולחת הודעה, פותחת משימה. היא לא מחליפה שיקול דעת בכל מקום. כשמערבבים את השניים — או שמפחדים לגעת בתהליך, או שמנסים לאוטמט הכול ביום אחד ונופלים." },
        { type: "p", text: "צ׳אטבוט בלי חיבור למערכת הוא שיחה. אוטומציה בלי כללי אישור היא סיכון. סוכן AI נכנס כשצריך גם הבנה וגם פעולה מול CRM, וואטסאפ, או תור עבודה." },
        { type: "h2", text: "מאיפה מתחילים בפועל" },
        { type: "p", text: "בוחרים תהליך אחד צר: ליד מהאתר, פניית שירות, תיאום פגישה, או סיווג מיילים. ממפים מי נוגע, איזו מערכת היא מקור האמת, ומה אסור שיקרה אוטומטית." },
        { type: "p", text: "ספרינט ראשון עם מסך חי עדיף על אפיון של חצי שנה. רואים אם הזמן באמת מתקצר. רק אז מרחיבים." },
        { type: "h2", text: "סימנים שאתם מוכנים — וסימנים שעדיין לא" },
        { type: "p", text: "מוכנים: יש מקור אמת (CRM או לפחות טבלה מסודרת), יש אדם שמאשר חריגים, ויש מדד פשוט — זמן תגובה, לידים שאבדו, או העתקות ביום." },
        { type: "p", text: "עדיין לא: הכול באקסל פרטי, אין הסכמה מי מחליט, והציפייה היא «ה־AI יסדר את העסק». במצב כזה מתחילים מסדר, לא ממודל." },
        { type: "h2", text: "איך ביו סיסטם ניגשת לזה" },
        { type: "p", text: "אותה שפה לאתר, למערכת ולסוכן: פיתוח אפליקציות ואתרים, CRM בהתאמה, ואוטומציות AI שמחוברות לנתונים. פעילות בישראל (קריית ביאליק) ובדובאי." },
        { type: "p", text: "אם יש תהליך שחוזר, כמה כלים שלא מדברים, וצוות שממציא סידורים — מתחילים משם. משאירים פנייה באתר או בוואטסאפ, ועוברים לאוטומציה שעובדת על מסך חי." },
      ],
      en: [
        { type: "p", text: "Most businesses do not need an “AI department”. They need a process that repeats every day to finish without copy-paste, lost messages, or one person who remembers yesterday by heart. Beo System (ביו סיסטם) builds automations and agents wired to systems that already run — not a deck about the cloud." },
        { type: "p", text: "The right question is not “which tool is hot”. It is which hole in the process costs the most time and money." },
        { type: "h2", text: "What automation does — and what it is not" },
        { type: "p", text: "Automation moves data, updates status, sends a message, opens a task. It does not replace judgment everywhere. Mix the two badly and you either fear touching the process, or try to automate everything in a day and fall." },
        { type: "p", text: "A chatbot with no system link is a chat. Automation with no approval rules is risk. An AI agent belongs when you need both understanding and action against a CRM, WhatsApp, or work queue." },
        { type: "h2", text: "Where to start in practice" },
        { type: "p", text: "Pick one narrow process: a site lead, a service request, scheduling, or mail classification. Map who touches it, which system is the source of truth, and what must never happen automatically." },
        { type: "p", text: "A first sprint with a live screen beats a six-month spec. See if time really drops. Only then expand." },
        { type: "h2", text: "Signs you are ready — and signs you are not" },
        { type: "p", text: "Ready: there is a source of truth (CRM or at least an ordered table), someone who approves exceptions, and a simple measure — reply time, lost leads, or daily copy-pastes." },
        { type: "p", text: "Not yet: everything lives in a private spreadsheet, nobody agrees who decides, and the hope is “AI will fix the business”. In that case start with order, not a model." },
        { type: "h2", text: "How Beo System approaches it" },
        { type: "p", text: "One language for the site, the system, and the agent: apps and websites, fitted CRM, and AI automations wired to data. Israel (Kiryat Bialik) and Dubai." },
        { type: "p", text: "If a process repeats, several tools do not talk, and the team invents patches — start there. Leave a request on the site or WhatsApp, and move to automation that works on a live screen." },
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
