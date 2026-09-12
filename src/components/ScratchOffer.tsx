"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Copy, Check, Gift } from "lucide-react";
import { BookLink } from "./BookLink";
import { ScissorsMark } from "./Brand";

/**
 * Gamified exit-intent offer (agency library: "Scratch-Off Card").
 * Offer: a free Signature Scent add-on ($10 value) on a first Experience.
 * OFFER_CONFIRMED stays false until Ru signs off; while false, a small "preview" tag shows.
 */
const OFFER_CONFIRMED = false;
const CODE = "SCENTONRU";
const COOKIE = "rc_offer_seen";

const seen = () => typeof document !== "undefined" && document.cookie.includes(`${COOKIE}=1`);
const markSeen = () => {
  document.cookie = `${COOKIE}=1; max-age=${60 * 60 * 24 * 30}; path=/; SameSite=Lax`;
};

export function ScratchOffer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const drawing = useRef(false);
  const blocked = pathname.startsWith("/book") || pathname.startsWith("/portal");

  const show = useCallback(() => {
    if (seen() || blocked) return;
    markSeen();
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, [blocked]);

  // Triggers: desktop = cursor leaves toward the tab bar; touch = 35s on site + 55% scrolled.
  useEffect(() => {
    if (blocked || seen()) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let armed = false;
    const arm = window.setTimeout(() => (armed = true), 8000);
    const onLeave = (e: MouseEvent) => {
      if (armed && e.clientY <= 0 && !e.relatedTarget) show();
    };
    let dwell = false;
    const dwellT = window.setTimeout(() => (dwell = true), 35000);
    const onScroll = () => {
      const p = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (dwell && p > 0.55) show();
    };
    if (fine) document.addEventListener("mouseout", onLeave);
    else window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(arm);
      window.clearTimeout(dwellT);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [blocked, show]);

  // Paint the gold foil.
  useEffect(() => {
    if (!open) return;
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const { width, height } = c.getBoundingClientRect();
    c.width = width * dpr;
    c.height = height * dpr;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#82530c");
    g.addColorStop(0.3, "#d8a848");
    g.addColorStop(0.5, "#f6d77f");
    g.addColorStop(0.7, "#d8a848");
    g.addColorStop(1, "#9a620c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(11,10,8,0.82)";
    ctx.font = "700 15px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH HERE", width / 2, height / 2 + 5);
    for (let i = 0; i < 260; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.12})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
    }
    ctx.globalCompositeOperation = "destination-out";
  }, [open]);

  // Focus trap + Escape.
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const d = dialog.current;
    // preventScroll: on short screens the dialog scrolls, and it should open at the top (close button + title), not at the focused button.
    d?.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && d) {
        const f = Array.from(d.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"));
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
      lastFocus.current?.focus?.();
    };
  }, [open]);

  const scratch = (clientX: number, clientY: number) => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const r = c.getBoundingClientRect();
    // destination-out erases by the fill's alpha, so the brush must be fully opaque.
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.arc(clientX - r.left, clientY - r.top, 26, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkProgress = () => {
    const c = canvas.current;
    const ctx = c?.getContext("2d", { willReadFrequently: true });
    if (!c || !ctx || revealed) return;
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
    if (clear / (data.length / 64) > 0.45) setRevealed(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/75 p-4 backdrop-blur-sm sm:items-center" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-title"
        data-lenis-prevent
        className="rise relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overflow-x-hidden overscroll-contain rounded-[4px] border border-gold/40 bg-ink-2 p-7 shadow-gold [@media(max-height:500px)]:p-5"
      >
        <button type="button" onClick={() => setOpen(false)} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-bone-dim hover:text-bone" aria-label="Close offer">
          <X className="h-5 w-5" aria-hidden />
        </button>
        {!OFFER_CONFIRMED && (
          <p className="eyebrow mb-3 inline-block rounded-sm border border-dashed border-gold/60 px-2 py-1 text-[0.62rem] text-gold">Preview · offer pending Ru&apos;s confirmation</p>
        )}
        <div className="flex items-center gap-3">
          <ScissorsMark id="offer-mark" className="h-10 w-auto" />
          <p className="tag text-xl text-gold">before you go…</p>
        </div>
        <h2 id="offer-title" className="display mt-3 text-[2.6rem] leading-[0.9]">
          Scratch for a <span className="foil-text">first-visit gift.</span>
        </h2>

        <div className="relative mt-6 h-36 overflow-hidden rounded-[3px] border border-line bg-ink-3">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <Gift className="h-6 w-6 text-gold" aria-hidden />
            <p className="display mt-2 text-2xl text-bone">Free Signature Scent</p>
            <p className="text-sm text-bone-dim">on your first Experience ($10 value)</p>
          </div>
          {!revealed && (
            <canvas
              ref={canvas}
              className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
              aria-hidden
              onPointerDown={(e) => {
                drawing.current = true;
                scratch(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => {
                if (!drawing.current) return;
                scratch(e.clientX, e.clientY);
                if (Math.random() < 0.08) checkProgress();
              }}
              onPointerUp={() => {
                drawing.current = false;
                checkProgress();
              }}
              onPointerLeave={() => {
                drawing.current = false;
                checkProgress();
              }}
            />
          )}
        </div>

        {revealed ? (
          <div className="mt-6 space-y-4" aria-live="polite">
            <p className="text-bone-dim">
              Book any Experience and add <span className="text-bone">code {CODE}</span> in the Square booking notes. Ru adds the scent at the end of your cut.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(CODE);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
                className="btn btn-ghost flex-1"
              >
                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                {copied ? "Copied" : CODE}
              </button>
              <BookLink className="flex-1" label="Book and claim your Signature Scent">
                Book now
              </BookLink>
            </div>
          </div>
        ) : (
          <button type="button" data-autofocus onClick={() => setRevealed(true)} className="mt-5 w-full text-center text-sm text-bone-mute underline decoration-line underline-offset-4 hover:text-bone">
            Can&apos;t scratch? Reveal my offer
          </button>
        )}
        <p className="mt-5 text-xs text-bone-mute">New clients only. One per person. Mention the code when you book.</p>
      </div>
    </div>
  );
}
