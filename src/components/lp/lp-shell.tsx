import type { ReactNode } from "react";
import { Field } from "@/components/canvas/field";
import { LpWhatsapp } from "@/components/lp/lp-whatsapp";

export function LpShell({
  source,
  waText,
  children,
}: {
  source: string;
  waText: string;
  children: ReactNode;
}) {
  return (
    <main className="lp-page relative min-h-svh" dir="rtl" lang="he">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Field />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,4,10,0.22)_0%,rgba(6,4,10,0.16)_42%,rgba(6,4,10,0.9)_100%)]" />
      <div className="relative z-10">{children}</div>
      <LpWhatsapp source={source} text={waText} />
    </main>
  );
}
