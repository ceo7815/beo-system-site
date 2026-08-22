export type ShotMove = "enter" | "through" | "iris";

export type Shot = {
  file: string;
  fileMobile: string;
  move: ShotMove;
  kicker: { he: string; en: string };
  title: { he: string; en: string };
  line?: { he: string; en: string };
};

export const shots: Shot[] = [
  {
    file: "/film/01.webp",
    fileMobile: "/film/m/01.webp",
    move: "enter",
    kicker: { he: "", en: "" },
    title: {
      he: "מבינים תוכנה.\nמבינים AI.",
      en: "We understand software.\nWe understand AI.",
    },
    line: {
      he: "בינה מלאכותית. מערכות. אפליקציות. טכנולוגיה.",
      en: "Artificial intelligence. Systems. Apps. Technology.",
    },
  },
  {
    file: "/film/06.webp",
    fileMobile: "/film/m/06.webp",
    move: "iris",
    kicker: { he: "01", en: "01" },
    title: { he: "אפליקציות\nואתרים", en: "Apps\nand websites" },
    line: {
      he: "מוצרים דיגיטליים\nחכמים,\nמהרעיון ועד למסך.",
      en: "Smart digital\nproducts,\nfrom the idea to the screen.",
    },
  },
  {
    file: "/film/03.webp",
    fileMobile: "/film/m/03.webp",
    move: "iris",
    kicker: { he: "02", en: "02" },
    title: { he: "סוכני AI", en: "AI agents" },
    line: {
      he: "לא עוד צ׳אט. עובדים דיגיטליים לעסק שלכם.",
      en: "Not another chat. Digital workers for your business.",
    },
  },
  {
    file: "/film/05.webp",
    fileMobile: "/film/m/05.webp",
    move: "through",
    kicker: { he: "03", en: "03" },
    title: { he: "פיתוח בהתאמה אישית", en: "Custom development" },
    line: {
      he: "CRM, מערכות לניהול עסק, ERP, פורטלים ודשבורדים — פתרונות שנבנים סביב העסק שלכם.",
      en: "CRM, business systems, ERP, portals and dashboards — solutions built around your business.",
    },
  },
  {
    file: "/film/04.webp",
    fileMobile: "/film/m/04.webp",
    move: "enter",
    kicker: { he: "04", en: "04" },
    title: { he: "צ׳אטבוטים ואוטומציות", en: "Chatbots and automation" },
    line: {
      he: "מייעלים תהליכים, חוסכים זמן ומאפשרים לעסק שלכם לעבוד חכם יותר.",
      en: "Streamline processes, save time, and let your business work smarter.",
    },
  },
  {
    file: "/film/02.webp",
    fileMobile: "/film/m/02.webp",
    move: "through",
    kicker: { he: "05", en: "05" },
    title: { he: "בינה מלאכותית", en: "Artificial intelligence" },
    line: {
      he: "מטמיעים פתרונות בינה מלאכותית חכמים בארגונים ובעסקים — משלב הרעיון ועד לפתרון שעובד בפועל. מותאם לכל תחום, תהליך וצורך עסקי.",
      en: "We embed smart AI solutions in organizations and businesses — from the idea to a working system. Fitted to every field, process, and business need.",
    },
  },
  {
    file: "/film/08.webp",
    fileMobile: "/film/m/08.webp",
    move: "through",
    kicker: { he: "סיום", en: "Close" },
    title: { he: "יש פרוייקט ?\nבוא נדבר כמה דקות.", en: "Got a project?\nLet’s talk a few minutes." },
  },
];
