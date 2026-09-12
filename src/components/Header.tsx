"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X, MapPin } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";
import { Logo } from "./Brand";
import { BookLink } from "./BookLink";
import { BUSINESS, HOURS_GROUPED } from "@/data/business";
import { cn } from "@/lib/cn";

export const NAV = [
  { href: "/services/", label: "Services" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/about/", label: "Meet Ru" },
  { href: "/visit/", label: "Visit" },
  { href: "/faq/", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the menu when the route changes (adjusting state during render, not in an effect).
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-3 focus:text-ink">
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open ? "border-b border-line/70 bg-ink/85 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1400px] items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/" aria-label="RuCutz Premium Grooming home" className="relative z-10 block w-[118px] shrink-0 md:w-[138px]">
            <Logo title="RuCutz Premium Grooming" priority />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={cn(
                      "eyebrow relative py-2 transition-colors hover:text-gold-lift",
                      isActive(n.href) ? "text-gold" : "text-bone",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100",
                      isActive(n.href) && "after:scale-x-100",
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={BUSINESS.phoneHref}
              className="hidden items-center gap-2 px-3 py-2 text-sm font-semibold tracking-wide text-bone transition-colors hover:text-gold-lift md:inline-flex"
            >
              <Phone className="h-4 w-4 text-gold" aria-hidden />
              {BUSINESS.phone}
            </a>
            <BookLink className="hidden min-h-[44px]! px-5! sm:inline-flex" label="Book now">
              Book now
            </BookLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-bone lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          // z-45: above the mobile book bar (z-40), below the header (z-50). Scrolls on short screens (landscape phones, iPhone SE).
          "grain fixed inset-0 z-[45] flex flex-col overflow-y-auto overscroll-contain bg-ink px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+24px)] transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {[{ href: "/", label: "Home" }, ...NAV, { href: "/journal/", label: "Journal" }].map((n, i) => (
              <li key={n.href} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }} className={cn("transition-[opacity,transform] duration-500", open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>
                <Link href={n.href} className={cn("display block py-1.5 text-[2.7rem] [@media(max-height:500px)]:py-1 [@media(max-height:500px)]:text-[2rem]", isActive(n.href) && n.href !== "/" ? "foil-text" : "text-bone")}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto space-y-5">
          <div className="hairline" />
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {HOURS_GROUPED.map((h) => (
              <div key={h.label} className="contents">
                <dt className="text-bone-mute">{h.label}</dt>
                <dd className="text-bone">{h.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-3">
            <a href={BUSINESS.phoneHref} className="btn btn-ghost flex-1">
              <Phone className="h-4 w-4" aria-hidden /> Call
            </a>
            <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost flex-1">
              <MapPin className="h-4 w-4" aria-hidden /> Directions
            </a>
            <a href={BUSINESS.social.instagram} target="_blank" rel="noopener" className="btn btn-ghost px-4!" aria-label="RuCutz on Instagram">
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
          <BookLink className="w-full" label="Book your experience" />
        </div>
      </div>
    </>
  );
}
