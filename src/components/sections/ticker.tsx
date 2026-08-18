import { ticker } from "@/lib/site";

export function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="relative overflow-hidden border-y border-line py-4">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-[13px] tracking-[0.18em] text-muted uppercase"
          >
            {item}
            <span className="text-brand-hot">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
