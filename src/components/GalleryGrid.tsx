"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, GALLERY_FILTERS, srcSet, largest, type Photo } from "@/lib/photos";
import { cn } from "@/lib/cn";

export function GalleryGrid() {
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const items = useMemo<Photo[]>(() => (filter === "all" ? GALLERY : GALLERY.filter((p) => p.tags.includes(filter))), [filter]);
  const counts = useMemo(() => Object.fromEntries(GALLERY_FILTERS.map((f) => [f.id, f.id === "all" ? GALLERY.length : GALLERY.filter((p) => p.tags.includes(f.id)).length])), []);

  const close = useCallback(() => {
    setActive(null);
    opener.current?.focus();
  }, []);
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (active === null) return;
    closeBtn.current?.focus();
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [active, close, step]);

  const cur = active !== null ? items[active] : null;

  return (
    <>
      <div role="group" aria-label="Filter the gallery" className="flex flex-wrap gap-2">
        {GALLERY_FILTERS.filter((f) => counts[f.id] > 0).map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-semibold tracking-wide transition-colors",
              filter === f.id ? "border-gold bg-gold text-ink" : "border-line text-bone-dim hover:border-gold/60 hover:text-bone",
            )}
          >
            {f.label} <span className={cn("ml-1 text-xs", filter === f.id ? "text-ink/70" : "text-bone-mute")}>{counts[f.id]}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {items.length} photos
      </p>

      <ul className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
        {items.map((p, i) => (
          <li key={p.key} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setActive(i);
              }}
              className="group relative block w-full overflow-hidden rounded-[3px] border border-line bg-ink-3 text-left"
              aria-label={`View larger: photo ${i + 1} of ${items.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.files[0].src}
                srcSet={srcSet(p)}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                width={p.w}
                height={p.h}
                alt={p.alt}
                loading={i < 6 ? "eager" : "lazy"}
                decoding="async"
                className="h-auto w-full transition-transform duration-[1.1s] ease-[var(--ease-cut)] group-hover:scale-[1.04]"
              />
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/95 to-transparent p-3 text-xs text-bone transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                {p.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {cur && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={(e) => e.target === e.currentTarget && close()}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={largest(cur)} alt={cur.alt} className="max-h-[82vh] max-w-full rounded-[3px] border border-line object-contain" />
          <p className="absolute inset-x-4 bottom-5 mx-auto max-w-2xl text-center text-sm text-bone-dim">
            {cur.alt} <span className="text-bone-mute">· {active! + 1} / {items.length}</span>
          </p>
          <button ref={closeBtn} type="button" onClick={close} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink text-bone" aria-label="Close photo viewer">
            <X className="h-5 w-5" aria-hidden />
          </button>
          <button type="button" onClick={() => step(-1)} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink text-bone md:left-6" aria-label="Previous photo">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button type="button" onClick={() => step(1)} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink text-bone md:right-6" aria-label="Next photo">
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
