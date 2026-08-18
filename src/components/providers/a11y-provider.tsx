"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import {
  a11yDefaults,
  applyA11y,
  loadA11y,
  type A11yState,
} from "@/lib/a11y";

type A11yCtx = {
  state: A11yState;
  setState: (next: A11yState | ((prev: A11yState) => A11yState)) => void;
  reset: () => void;
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
};

const Ctx = createContext<A11yCtx | null>(null);

export function A11yProvider({ children }: { children: ReactNode }) {
  const [state, setRaw] = useState<A11yState>(a11yDefaults);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const loaded = loadA11y();
    setRaw(loaded);
    applyA11y(loaded);
    if (loaded.motion) gsap.globalTimeline.pause();
  }, []);

  const setState = useCallback((next: A11yState | ((prev: A11yState) => A11yState)) => {
    setRaw((prev) => {
      const value = typeof next === "function" ? next(prev) : next;
      applyA11y(value);
      if (value.motion) gsap.globalTimeline.pause();
      else gsap.globalTimeline.resume();
      return value;
    });
  }, []);

  const reset = useCallback(() => setState({ ...a11yDefaults }), [setState]);

  const value = useMemo(
    () => ({ state, setState, reset, open, setOpen }),
    [state, setState, reset, open],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useA11y() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useA11y must be used inside A11yProvider");
  return ctx;
}
