import { Field } from "@/components/canvas/field";
import type { ReactNode } from "react";

export function InnerPage({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-svh overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Field />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,4,10,0.18)_0%,rgba(6,4,10,0.12)_36%,rgba(6,4,10,0.82)_100%)]" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-24 pt-40 md:px-16 md:pt-48 lg:pt-52">
          <p className="text-[12px] font-medium tracking-[0.28em] text-brand-hot uppercase">
            {kicker}
          </p>
          <h1 className="mt-4 font-semibold tracking-tight leading-[1.06] text-[clamp(1.8rem,5vw,3.4rem)]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted md:text-lg">{lead}</p>
          <div className="mt-12">{children}</div>
        </div>
    </main>
  );
}
