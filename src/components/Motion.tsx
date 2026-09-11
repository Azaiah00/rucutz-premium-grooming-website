"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger pins stay in sync. */
export function SmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, smoothWheel: true, autoRaf: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    window.dispatchEvent(new Event("lenis:ready"));
    return () => {
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return null;
}

/** Adds .is-in to .reveal / .spray elements as they enter the viewport. Re-scans on route change. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in), .spray:not(.is-in)"));
    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

/** Scroll to top on route change when Lenis is active (Next's own reset can be overridden by it). */
export function RouteScrollReset() {
  const pathname = usePathname();
  useEffect(() => {
    const l = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (l && !window.location.hash) l.scrollTo(0, { immediate: true });
  }, [pathname]);
  return null;
}
