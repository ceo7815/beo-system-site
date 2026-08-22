export type ProjectKind = "web" | "app";

export type Project = {
  slug: string;
  kind: ProjectKind;
  n: string;
  title: { he: string; en: string };
  role?: { he: string; en: string };
  line: { he: string; en: string };
  credit?: { he: string; en: string };
  live?: string;
  liveLabel?: { he: string; en: string };
  stores?: { apple?: string; google?: string };
  video?: string;
  videoWebm?: string;
  poster: string;
};

export const projects: Project[] = [
  {
    slug: "biz-bakrayot",
    kind: "web",
    n: "01",
    title: { he: "ביז בקריות", en: "Biz Bakrayot" },
    role: { he: "פורטל העסקים של הקריות", en: "The Krayot business portal" },
    line: {
      he: "פיתוח פורטל עסקים וקהילה מתקדם המרכז עסקים, שירותים ותוכן מקומי באזור הקריות.\nהמערכת כוללת אינדקס עסקים חכם, מנוע חיפוש וסינון, אזור אישי לבעלי עסקים, ניהול לידים, חבילות פרסום וקידום עסקים.\nהפורטל פותח כמערכת דיגיטלית מלאה המאפשרת לעסקים לנהל את הנוכחות שלהם ולהיחשף לקהל מקומי במקום אחד.",
      en: "An advanced business and community portal for shops, services, and local content in the Krayot.\nThe system includes a smart business index, search and filters, a private area for owners, lead management, and promotion packages.\nA full digital platform — businesses manage their presence and reach a local audience in one place.",
    },
    credit: {
      he: "בשיתוף עם חברת האב מערכות מתקדמות",
      en: "In collaboration with Hub Advanced Systems",
    },
    live: "https://biz.bakrayot.co.il",
    video: "/projects/biz-bakrayot.mp4",
    poster: "/projects/biz-bakrayot.webp",
  },
  {
    slug: "shikshuk",
    kind: "app",
    n: "02",
    title: { he: "שיקשוק", en: "ShikShuk" },
    role: { he: "אפליקציית מובייל מתקדמת", en: "Advanced mobile app" },
    line: {
      he: "פיתוח אפליקציית מובייל מתקדמת המחוברת באופן מלא לחנות ה־WordPress / WooCommerce של שיקשוק, בהתאמה לעיצוב ולחוויית המשתמש שנבחרו על ידי הלקוח.\nהמערכת כוללת אינטגרציות מורכבות וסנכרון שוטף של מוצרים, הזמנות, לקוחות ותכנים בין האתר לאפליקציה.\nניהול האפליקציה מתבצע ישירות מתוך ממשק הניהול של WordPress, ומאפשר ללקוח שליטה מרכזית ונוחה ללא צורך בניהול מערכת נפרדת.",
      en: "An advanced mobile app fully connected to ShikShuk’s WordPress / WooCommerce store, matched to the client’s design and UX.\nComplex integrations keep products, orders, customers, and content in sync between the site and the app.\nThe app is managed from the WordPress admin — one place, no separate system.",
    },
    credit: {
      he: "בשיתוף עם חברת האב מערכות",
      en: "In collaboration with Hub Advanced Systems",
    },
    stores: {
      apple: "https://apps.apple.com/il/app/%D7%A9%D7%99%D7%A7%D7%A9%D7%95%D7%A7/id6772709473?l=he",
      google: "https://play.google.com/store/apps/details?id=com.shikshuk.store",
    },
    video: "/projects/shikshuk.mp4",
    poster: "/projects/shikshuk.webp",
  },
  {
    slug: "liba",
    kind: "web",
    n: "03",
    title: { he: "ליבה", en: "Liba" },
    role: { he: "אתר מתקדם לסוכנות ביטוח ופיננסים", en: "Advanced site for an insurance & finance agency" },
    line: {
      he: "פיתוח אתר תדמית מתקדם לסוכנות ליבה ביטוח ופיננסים, בטכנולוגיית Next.js, עם דגש על ביצועים גבוהים, חוויית משתמש מודרנית והתאמה מלאה למובייל.\nהאתר כולל טפסים ותהליכי אוטומציה חכמים, המעבירים את הלידים באופן אוטומטי וישירות למערכת ה־CRM של הסוכנות להמשך טיפול ומעקב.\nהפרויקט כלל פיתוח ועיצוב בהתאמה לשפה המיתוגית של החברה, אינטגרציות למערכות הלקוח ותשתית טכנולוגית המאפשרת המשך הרחבה ופיתוח בעתיד.",
      en: "An advanced brand site for Liba Insurance & Finance, built in Next.js — high performance, modern UX, fully mobile.\nSmart forms and automation send leads straight into the agency CRM for follow-up.\nDesign matched the brand language, with client-system integrations and a stack ready to grow.",
    },
    live: "https://liba-fs.co.il/",
    video: "/projects/liba.mp4",
    poster: "/projects/liba.webp",
  },
  {
    slug: "beo-os",
    kind: "web",
    n: "04",
    title: { he: "Beo OS", en: "Beo OS" },
    role: {
      he: "מערכת ניהול חכמה לסוכנויות דיגיטל וחברות פיתוח",
      en: "A smart OS for digital agencies and software studios",
    },
    line: {
      he: "פיתוח מערכת ניהול מרכזית המיועדת לסוכנויות דיגיטל, בתי תוכנה וחברות פיתוח, ומרכזת במקום אחד לקוחות, לידים, פרויקטים, משימות, קמפיינים, שעות עבודה וניהול פיננסי.\nהמערכת כוללת אינטגרציות למערכות חשבוניות, Google Drive, דוא״ל ומערכות חיצוניות, ומאפשרת אוטומציה של תהליכים עסקיים וניהול שוטף מתוך ממשק אחד.\nבתוך המערכת משולבים סוכני AI מותאמים אישית, המסייעים בניהול, מעקב, ניתוח מידע וביצוע משימות — כדי לתת לבעל העסק שליטה מלאה על כל הפעילות במקום אחד.",
      en: "A central operating system for digital agencies and software studios — clients, leads, projects, tasks, campaigns, hours, and finance in one place.\nIntegrations with invoicing, Google Drive, email, and external systems, plus automation of day-to-day work from a single interface.\nCustom AI agents sit inside the product to help manage, track, analyze, and execute — full control over the operation, in one place.",
    },
    live: "https://os.beosystem.com",
    liveLabel: { he: "למערכת", en: "Open system" },
    video: "/projects/beo-os.mp4",
    poster: "/projects/beo-os.webp",
  },
  {
    slug: "shemesh",
    kind: "web",
    n: "05",
    title: { he: "שמש", en: "Shemesh" },
    role: { he: "אתר תדמית מתקדם — מימוש זכויות", en: "Advanced brand site — rights realization" },
    line: {
      he: "פיתוח אתר תדמית מודרני ומותאם אישית עבור שמש מימוש זכויות, עם דגש על הצגת השירותים בצורה ברורה, חוויית משתמש מקצועית והנעה לפעולה.\nהאתר כולל עמודי שירות, טפסי לידים, חיבור ישיר ל־WhatsApp, התאמה מלאה למובייל ותשתית מהירה ומתקדמת להצגת פעילות החברה.\nהפרויקט נבנה בשפה עיצובית ייחודית המותאמת לתחום הפיננסים ומימוש הזכויות, במטרה לחזק אמינות ולהפוך מבקרים באתר לפניות חדשות.",
      en: "A custom modern brand site for Shemesh Rights Realization — clear services, professional UX, and a path to act.\nService pages, lead forms, direct WhatsApp, full mobile, and a fast stack to present the company.\nA visual language for finance and rights work, built to earn trust and turn visitors into inquiries.",
    },
    live: "https://shemesh-site.pages.dev/",
    video: "/projects/shemesh.mp4",
    poster: "/projects/shemesh.webp",
  },
];
