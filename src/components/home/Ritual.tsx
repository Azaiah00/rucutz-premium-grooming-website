"use client";

import { useEffect, useRef } from "react";
import { Img } from "../Img";
import { BookLink } from "../BookLink";
import { cn } from "@/lib/cn";

const STEPS = [
  {
    n: "01",
    title: "The Consult",
    photo: "ru-at-work",
    text: "Tell Ru the look you want. He listens first, then lays out the plan: length, shape, lines and what it takes to keep it.",
  },
  {
    n: "02",
    title: "The Cleanse",
    photo: "ritual-wash",
    text: "A deep-cleansing shampoo at the bowl. Product, sweat and buildup gone, so the clippers meet your real pattern, not what's sitting on it.",
  },
  {
    n: "03",
    title: "The Cut",
    photo: "svc-king",
    text: "Fade, taper, waves, low cut or a full big chop. Any texture. Built on precision and consistency, the same way every visit.",
  },
  {
    n: "04",
    title: "The Detail",
    photo: "ru-cutting",
    text: "Precise razor work on the hairline and facial hair. It's the difference between clean and sharp, and people notice it.",
  },
  {
    n: "05",
    title: "The Hot Towel",
    photo: "ritual-towel",
    text: "A deep-tissue hot-towel face massage that lifts away excess sweat, oil and grime. A few quiet minutes. You earned them.",
  },
  {
    n: "06",
    title: "The Finish",
    photo: "client-smile",
    text: "Mirror check, the reveal, and an optional spray of Signature Scent on your way out the door.",
  },
];

const PIN_QUERY =
  "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)";

export function Ritual() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (
      !window.matchMedia("(min-width: 1024px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let cleanup = () => {};
    let cancelled = false;
    // GSAP is ~70 KB and only the homepage pins, so it is loaded after the page is interactive.
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = (
        window as unknown as {
          __lenis?: {
            on: (e: string, cb: () => void) => void;
            off: (e: string, cb: () => void) => void;
          };
        }
      ).__lenis;
      const sync = () => ScrollTrigger.update();
      lenis?.on("scroll", sync);
      const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
      const mm = gsap.matchMedia();
      mm.add(PIN_QUERY, () => {
        el.classList.add("is-pinned");
        const imgs = gsap.utils.toArray<HTMLElement>(
          el.querySelectorAll("[data-ritual-img]"),
        );
        const texts = gsap.utils.toArray<HTMLElement>(
          el.querySelectorAll("[data-ritual-text]"),
        );
        const bar = el.querySelector<HTMLElement>("[data-ritual-bar]");
        const counter = el.querySelector<HTMLElement>("[data-ritual-count]");

        gsap.set(imgs, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(imgs[0], { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(texts, { autoAlpha: 0, y: 40 });
        gsap.set(texts[0], { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: el.querySelector("[data-ritual-stage]"),
            start: "top top",
            end: () => `+=${window.innerHeight * (STEPS.length - 0.4)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(
                STEPS.length - 1,
                Math.floor(self.progress * STEPS.length * 0.999),
              );
              if (counter) counter.textContent = STEPS[i].n;
              if (bar) bar.style.transform = `scaleY(${self.progress})`;
            },
          },
        });
        for (let i = 1; i < STEPS.length; i++) {
          tl.to(texts[i - 1], { autoAlpha: 0, y: -40, duration: 0.4 }, i)
            .to(imgs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 }, i)
            .fromTo(
              imgs[i].querySelector("img"),
              { scale: 1.18 },
              { scale: 1, duration: 1 },
              i,
            )
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.5 }, i + 0.3);
        }
        tl.to({}, { duration: 0.6 });
        return () => {
          el.classList.remove("is-pinned");
        };
      });
      cleanup = () => {
        window.clearTimeout(refresh);
        lenis?.off("scroll", sync);
        mm.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={root}
      id="ritual"
      className="ritual relative bg-ink-2"
      aria-labelledby="ritual-title"
    >
      <div
        data-ritual-stage
        className="ritual-stage mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32"
      >
        <div className="ritual-head max-w-3xl">
          <p
            className="spray tag mb-5 -rotate-2 text-[clamp(1.3rem,2.4vw,1.9rem)] text-gold"
            aria-hidden
          >
            the ritual
          </p>
          <h2
            id="ritual-title"
            className="display text-[clamp(2.8rem,6.5vw,5.2rem)]"
          >
            Six steps. <span className="foil-text">Every cut.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-bone-dim">
            This is what $60 buys at RuCutz. Not a quick run with the clippers:
            a full grooming ritual, included in every King Haircut Experience.
          </p>
        </div>

        <div className="ritual-body mt-14 grid gap-16 lg:mt-12">
          <ol className="ritual-steps grid gap-16">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                className="ritual-step grid items-center gap-6 md:grid-cols-2 md:gap-12"
              >
                <div
                  data-ritual-img
                  className={cn(
                    "ritual-img relative aspect-[4/5] overflow-hidden rounded-[3px] border border-line bg-ink-3",
                    i % 2 === 1 && "md:order-2",
                  )}
                >
                  <Img
                    k={s.photo}
                    sizes="(min-width: 1024px) 38vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div data-ritual-text className="ritual-text">
                  <p
                    className="display text-[clamp(4rem,9vw,7.5rem)] text-transparent [-webkit-text-stroke:1px_rgb(216_168_72/0.8)]"
                    aria-hidden
                  >
                    {s.n}
                  </p>
                  <h3 className="display mt-2 text-[clamp(2.2rem,4vw,3.4rem)] text-bone">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg text-bone-dim">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="ritual-meter hidden" aria-hidden>
            <span data-ritual-count className="display text-6xl text-gold">
              01
            </span>
            <span className="relative mt-4 block h-56 w-px bg-line">
              <span
                data-ritual-bar
                className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-gold-lift via-gold to-gold-deep"
              />
            </span>
            <span className="eyebrow mt-4 block text-bone-mute">/ 06</span>
          </aside>
        </div>

        <div className="ritual-cta mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <BookLink label="Book the King Haircut Experience">
            Book the King Haircut · $60
          </BookLink>
          <p className="text-sm text-bone-mute">
            About 45 minutes. Shampoo, hot towel and razor work included.
          </p>
        </div>
      </div>
    </section>
  );
}
