"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cookieAllowed } from "@/lib/cookies";

export type Lang = "he" | "en";

const copy = {
  he: {
    talk: "דברו איתנו",
    scroll: "גלול",
    contactKicker: "צור קשר",
    contactTitle: "משאירים פנייה.",
    contactRest: " אנחנו חוזרים.",
    contactLead: "טלפון, מייל או הטופס. אומרים מה צריך — ומתקדמים.",
    waDirect: "וואטסאפ ישיר",
    factMobile: "נייד",
    factEmail: "אימייל",
    factAddress: "כתובת",
    name: "שם",
    phone: "טלפון",
    company: "חברה",
    need: "מה צריך",
    send: "שליחה לוואטסאפ",
    sent: "נפתח וואטסאפ — נשלח משם",
    waPrefill: "היי, אשמח לדבר עם ביו סיסטם",
    needs: [
      "סוכן AI / אוטומציה",
      "מערכת / CRM",
      "אפליקציה",
      "אתר",
      "עדיין לא בטוח",
    ],
    tagline: "פיתוח תוכנה עם בינה מלאכותית",
    menu: "תפריט",
    navHome: "דף הבית",
    navAbout: "מי אנחנו",
    navBlog: "בלוג",
    navContact: "צרו קשר",
    privacy: "מדיניות פרטיות",
    accessibility: "הצהרת נגישות",
    footerRights: "כל הזכויות שמורות לחברת Beo-system",
    legalUpdated: "עודכן לאחרונה",
    cookieText: "משתמשים בעוגיות כדי לשמור על הפרטיות שלכם.",
    cookieAccept: "אישור הכל",
    cookieReject: "דחה הכל",
    cookieSave: "שמירת העדפות",
    cookieCustomize: "העדפות",
    cookieNecessary: "הכרחיות",
    cookieNecessaryHint: "תפעול בסיסי של האתר. תמיד פעילות.",
    cookiePrefsKind: "העדפות",
    cookiePrefsHint: "שפה ונגישות — נשמרות במכשיר.",
    cookieAnalytics: "אנליטיקס",
    cookieAnalyticsHint: "סטטיסטיקה אנונימית לשיפור האתר.",
    cookieMarketing: "שיווק",
    cookieMarketingHint: "פרסום ומעקב. כבוי אצלנו כברירת מחדל.",
    aboutKicker: "החברה",
    aboutTitle: "מי אנחנו",
    aboutParas: [
      "Beo System היא חברת טכנולוגיה ופיתוח המתמחה בבניית מערכות חכמות, אוטומציות ופתרונות AI שמחברים בין טכנולוגיה מתקדמת לצרכים האמיתיים של העסק.",
      "אנחנו לא מאמינים בפתרונות מדף. כל מערכת מתחילה בהבנת העסק, התהליכים והיעדים — ומשם אנחנו מתכננים ובונים פתרון מדויק שעובד עבורכם, חוסך זמן ומאפשר לעסק לצמוח.",
      "ההתמחות שלנו כוללת סוכני AI, מערכות ניהול ו-CRM, אוטומציות עסקיות, פיתוח מערכות Web, אפליקציות, פורטלים ודשבורדים, לצד אינטגרציות וחיבורים בין המערכות שכבר קיימות בעסק.",
      "אנחנו מלווים את הלקוח משלב הרעיון והאפיון, דרך הפיתוח וההטמעה ועד לתפעול, שיפור והרחבת המערכת לאורך זמן.",
      "עם פעילות בישראל ובדובאי, אנחנו מביאים שילוב של חשיבה עסקית, פיתוח מתקדם ו-AI כדי להפוך תהליכים מורכבים לפשוטים, מהירים וחכמים יותר.",
    ],
    aboutCta: "יש לכם תהליך שאפשר לייעל או רעיון למערכת? בואו נהפוך אותו לפתרון שעובד.",
    aboutPlaces: [
      "ישראל: החרושת 10, קריית ביאליק",
      "דובאי: Business Bay, Dubai",
    ],
    blogKicker: "יומן",
    blogTitle: "בלוג",
    blogLead: "מאמרים על פיתוח, מערכות ובינה מלאכותית — כל מה שצריך לדעת.",
    blogRead: "דקות קריאה",
    blogBack: "חזרה לבלוג",
    blogMore: "עוד מהסטודיו",
  },
  en: {
    talk: "Talk to us",
    scroll: "Scroll",
    contactKicker: "Contact",
    contactTitle: "Leave a request.",
    contactRest: " We get back to you.",
    contactLead: "Phone, email, or the form. Say what you need — and we move.",
    waDirect: "WhatsApp",
    factMobile: "Mobile",
    factEmail: "Email",
    factAddress: "Address",
    name: "Name",
    phone: "Phone",
    company: "Company",
    need: "What you need",
    send: "Send on WhatsApp",
    sent: "WhatsApp opened — send from there",
    waPrefill: "Hi, I’d like to talk with Beo System",
    needs: [
      "AI agent / automation",
      "System / CRM",
      "App",
      "Website",
      "Not sure yet",
    ],
    tagline: "Software development with artificial intelligence",
    menu: "Menu",
    navHome: "Home",
    navAbout: "About us",
    navBlog: "Blog",
    navContact: "Contact",
    privacy: "Privacy policy",
    accessibility: "Accessibility statement",
    footerRights: "All rights reserved to Beo-system",
    legalUpdated: "Last updated",
    cookieText: "We use cookies to protect your privacy.",
    cookieAccept: "Accept all",
    cookieReject: "Reject all",
    cookieSave: "Save preferences",
    cookieCustomize: "Preferences",
    cookieNecessary: "Necessary",
    cookieNecessaryHint: "Basic site operation. Always on.",
    cookiePrefsKind: "Preferences",
    cookiePrefsHint: "Language and accessibility — stored on this device.",
    cookieAnalytics: "Analytics",
    cookieAnalyticsHint: "Anonymous stats to improve the site.",
    cookieMarketing: "Marketing",
    cookieMarketingHint: "Ads and tracking. Off by default here.",
    aboutKicker: "The company",
    aboutTitle: "About us",
    aboutParas: [
      "Beo System is a technology and development company specializing in smart systems, automation, and AI solutions that connect advanced technology to the real needs of the business.",
      "We don’t believe in off-the-shelf solutions. Every system starts with understanding the business, the processes, and the goals — then we design and build a precise solution that works for you, saves time, and lets the business grow.",
      "Our work includes AI agents, management and CRM systems, business automation, web systems, apps, portals and dashboards, plus integrations between the systems already in the business.",
      "We stay with the client from idea and spec, through development and rollout, to running, improving, and expanding the system over time.",
      "With activity in Israel and Dubai, we bring business thinking, advanced development, and AI to turn complex processes into something simpler, faster, and smarter.",
    ],
    aboutCta: "Have a process to streamline, or an idea for a system? Let’s turn it into something that works.",
    aboutPlaces: [
      "Israel: 10 HaHaroshet, Kiryat Bialik",
      "Dubai: Business Bay, Dubai",
    ],
    blogKicker: "Journal",
    blogTitle: "Blog",
    blogLead: "Articles on development, systems, and AI — everything you need to know.",
    blogRead: "min read",
    blogBack: "Back to the blog",
    blogMore: "More from the studio",
  },
} as const;

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof copy)[Lang];
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("he");

  useEffect(() => {
    const saved = window.localStorage.getItem("beo-lang");
    if (saved === "en" || saved === "he") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    if (cookieAllowed("preferences")) window.localStorage.setItem("beo-lang", lang);
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: copy[lang],
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
