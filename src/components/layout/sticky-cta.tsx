import { whatsappUrl } from "@/lib/site";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/90 p-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <a
          href="#contact"
          className="flex-1 rounded-full bg-brand py-3 text-center text-sm font-medium text-white"
        >
          שיחת היכרות
        </a>
        <a
          href={whatsappUrl("היי, אשמח לדבר עם ביו סיסטם")}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-full border border-line py-3 text-center text-sm"
        >
          וואטסאפ
        </a>
      </div>
    </div>
  );
}
