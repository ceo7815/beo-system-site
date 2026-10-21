const paths: Record<string, string> = {
  motion:
    "M4 7.5h10.2M4 12h7.2M4 16.5h10.2M16.2 8.2 20 12l-3.8 3.8",
  clock: "M12 7v5.2l3.2 1.8M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  megaphone:
    "M5 10.2v3.6h2.2L14 17.5V6.5L7.2 10.2H5ZM14 9.2a3.2 3.2 0 0 1 0 5.6M7.4 14.2 8.6 18H11",
  layers: "M12 4.5 20 9l-8 4.5L4 9l8-4.5ZM6.2 12.2 12 15.5l5.8-3.3M6.2 15.2 12 18.5l5.8-3.3",
  chat: "M6 16.8 4.8 19.2A8.2 8.2 0 1 1 8 18.6L6 16.8Z M8.2 11h.1M12 11h.1M15.8 11h.1",
  filter: "M4.5 6.5h15l-5.6 6.2v4.2l-3.8 1.6v-5.8L4.5 6.5Z",
  tone: "M5 15.5V8.8l7-3.3v13.2l-7-3.2ZM12 9.2a3.4 3.4 0 0 1 0 5.6M15.2 7.4a6.2 6.2 0 0 1 0 9.2",
  save: "M7 4.8h8.2L19 8.6V19H5V4.8h2ZM8 4.8V9h6.2M8 19v-5.2h8V19",
  inbox: "M4.5 13.2 6.4 5.5h11.2l1.9 7.7M4.5 13.2h4.1l1.1 2.1h4.6l1.1-2.1h4.1V19H4.5v-5.8Z",
  people: "M9.2 11.2a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM4.8 18.2c.4-2.3 2.1-3.5 4.4-3.5s4 .1 4.4 3.5M16.2 11a2.2 2.2 0 1 0 0-4.4M15.4 14.8c1.6.2 2.8 1.1 3.2 3.4",
  link: "M9.2 12.8 8 14a3 3 0 0 1-4.2-4.2l2.2-2.2a3 3 0 0 1 4.2 0M14.8 11.2 16 10a3 3 0 0 1 4.2 4.2l-2.2 2.2a3 3 0 0 1-4.2 0M8.6 15.4l6.8-6.8",
  flag: "M6 19.5V5M6 5.2h9.2l-1.4 3.2 1.4 3.1H6",
};

export function LpIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="lp-icon">
      <path
        d={paths[name] ?? paths.motion}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const benefitIcons: Record<string, readonly string[]> = {
  "ai-video-realestate": ["motion", "clock", "megaphone", "layers"],
  "ai-agent": ["chat", "filter", "tone", "save"],
  automation: ["inbox", "people", "link", "flag"],
};

export function benefitIcon(pageId: string, index: number) {
  return benefitIcons[pageId]?.[index] ?? "motion";
}
