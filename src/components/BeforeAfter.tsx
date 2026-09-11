"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { Img } from "./Img";

/** Drag / keyboard comparison slider. Sweeps once on first view to show it's interactive. */
export function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After" }: { before: string; after: string; beforeLabel?: string; afterLabel?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const run = (t: number) => {
          const k = Math.min(1, (t - t0) / 1800);
          // 50 → 78 → 24 → 50
          const v = k < 0.33 ? 50 + 28 * (k / 0.33) : k < 0.72 ? 78 - 54 * ((k - 0.33) / 0.39) : 24 + 26 * ((k - 0.72) / 0.28);
          if (!dragging.current) setPos(v);
          if (k < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative aspect-[4/5] select-none overflow-hidden rounded-[3px] border border-line bg-ink-3 touch-pan-y md:aspect-[5/6]"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className="absolute inset-0">
        <Img k={after} sizes="(min-width: 1024px) 45vw, 100vw" />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img k={before} sizes="(min-width: 1024px) 45vw, 100vw" />
      </div>
      <span className="eyebrow absolute left-4 top-4 rounded-sm bg-ink/80 px-3 py-1.5 text-bone">{beforeLabel}</span>
      <span className="eyebrow absolute right-4 top-4 rounded-sm bg-gold px-3 py-1.5 text-ink">{afterLabel}</span>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-gold-lift shadow-[0_0_18px_rgba(246,215,127,0.7)]" style={{ left: `${pos}%` }} aria-hidden />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 5));
        }}
        className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold bg-ink/90 text-gold shadow-gold"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal className="h-5 w-5" aria-hidden />
      </div>
    </div>
  );
}
