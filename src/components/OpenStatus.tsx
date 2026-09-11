"use client";

import { useSyncExternalStore } from "react";
import { openState, type OpenState } from "@/lib/hours";
import { cn } from "@/lib/cn";

let cache: OpenState | null = null;
let cacheKey = "";
const listeners = new Set<() => void>();
let timer: number | undefined;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) timer = window.setInterval(() => listeners.forEach((l) => l()), 60_000);
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}
function getSnapshot() {
  const key = String(Math.floor(Date.now() / 60_000));
  if (key !== cacheKey) {
    cacheKey = key;
    const next = openState();
    if (!cache || cache.label !== next.label) cache = next;
  }
  return cache;
}
const getServerSnapshot = () => null;

export function useOpenState() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Live open/closed pill, computed in Florida time. Renders a neutral label before hydration. */
export function OpenStatus({ className }: { className?: string }) {
  const s = useOpenState();
  return (
    <span className={cn("inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/60 px-3.5 py-1.5 text-[0.8rem] font-semibold tracking-wide", className)}>
      <span
        className={cn("h-2 w-2 rounded-full", s?.open ? "bg-[#6bd68c]" : "bg-gold")}
        style={s?.open ? { animation: "pulse-dot 2s infinite" } : undefined}
        aria-hidden
      />
      <span className="text-bone" aria-live="polite">
        {s ? s.label : "Hollywood, FL · Open 6 days"}
      </span>
    </span>
  );
}
