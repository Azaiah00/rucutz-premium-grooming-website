# DESIGN.md — "Gold Standard"

The design system for RuCutz Premium Grooming. Never use a colour, font or spacing value that isn't in here. Measured contrast ratios are enforced by `npm run audit:contrast`.

## The idea

Ru's logo is gold on black: a pair of shears, a rounded script wordmark, a clipper, and an **ankh** standing in for the "t". His current site already uses a hand-lettered marker font (Rock Salt) for headings like "SERVICE MENU". So the site is **matte black, foil gold, and a graffiti hand** — masculine, night-lit, barbershop-after-dark, with the restraint of an editorial layout. Nothing pastel, nothing rounded-soft, no emoji anywhere.

## Colour

Sampled from the pixels of Ru's own 3500px logo.

| Token | Hex | Use |
| --- | --- | --- |
| `ink` | `#0B0A08` | Page ground. Never pure black. |
| `ink-2` | `#12100D` | Alternate sections |
| `ink-3` | `#1B1814` | Cards, wells |
| `ink-4` | `#26221C` | Raised chips |
| `line` | `#332D24` | Hairlines, borders |
| `bone` | `#F2ECE1` | Primary text (16.8:1 on ink) |
| `bone-dim` | `#B8AE9F` | Body copy (9.0:1) |
| `bone-mute` | `#8F8677` | Meta, captions (5.5:1) |
| `gold` | `#D8A848` | Accent, links, prices (9.1:1) |
| `gold-lift` | `#F6D77F` | Hover, graffiti tag (14.1:1) |
| `gold-deep` | `#B87008` | Foil gradient dark stop (5.1:1 against ink text) |
| `bronze` | `#82530C` | Deep foil, decorative only |
| `bronze-ink` | `#6B430A` | Gold-family **text on light** grounds (7.3:1 on paper) |
| `paper` | `#F2ECE1` | Light ground, if a light section is ever added |

Rules that matter:

- **Gold is never text on a light ground.** `gold` on `paper` is 1.9:1. Use `bronze-ink`.
- **Two gold gradients.** `--gold-foil` (buttons, decorative) runs down to `#B87008`; `foil-text` (large display type) never drops below `#C4851E` so the last letters of a headline stay readable (6.3:1).
- Body text is never below `bone-mute`.

## Type

| Role | Face | Notes |
| --- | --- | --- |
| Display | **Big Shoulders Display** 700/800/900 | Uppercase, `line-height: .88`. Headlines, prices, numbers. |
| Body | **Barlow** 400/500/600/700 | 17px base, 1.6 line-height. |
| Tag | **Rock Salt** 400 | The graffiti hand Ru already uses. Section kickers only, 1–4 words, rotated −2°, `word-spacing: .22em`. Never for body copy, never for anything a screen reader has to parse as content (kickers are `aria-hidden`). |

All three are self-hosted (latin subset, ~200 KB total) through `next/font/local`. No network font requests.

## Layout

- Max width `1400px`, gutters `20px` phone / `32px` desktop.
- Sections: `py-24` phone, `py-32` desktop.
- Radius: `2–3px` only. Square corners read masculine; pills are reserved for filter chips and status pills.
- One primary CTA per screen, always "Book".

## Motion

GSAP + ScrollTrigger + Lenis, all gated on `prefers-reduced-motion`.

1. **The wordmark writes itself.** The hero logo is Ru's real logo, vectorised with potrace: 67 contours stroked on in gold, then the fill floods in. Pure CSS, no JS required.
2. **Spray reveal.** Rock Salt kickers wipe in behind a soft-edged mask, like a spray can passing.
3. **The Ritual.** The six-step section pins on desktop (`min-width: 1024px and min-height: 680px`) and scrubs: images wipe up with a `clip-path`, text crossfades, and a gold meter fills beside a step counter. Below that breakpoint it is a plain stacked list — the markup is identical, JS only adds `.is-pinned`.
4. **Before / after.** The locs-to-waves slider sweeps once when it enters view so people know it's draggable. Keyboard accessible (`role="slider"`, arrow keys).
5. **Marquee + reviews** scroll on CSS keyframes; review rows pause on hover.
6. Everything else is a 28px rise + fade via one IntersectionObserver (`.reveal`). Above-the-fold content uses CSS animation instead, so the hero renders with JS disabled.

**Pinned sections must not use `.reveal`** — the observer's bottom `rootMargin` means elements parked in the bottom 8% of a pinned stage never intersect.

## Components with rules

- `BookLink` — the only booking CTA. Carries `data-cta="book"` (the flow audit asserts one per page) and opens Square in a new tab.
- `PhotoSlot` — branded "needs real photo" marker with the shot brief. Any service without a photo renders one; it is impossible to ship a silent gap.
- `OpenStatus` / `HoursTable` — compute open/closed in `America/New_York` regardless of the visitor's timezone, via `useSyncExternalStore` so there is no hydration flash.
- `ScratchOffer` — the gamified exit-intent card. `OFFER_CONFIRMED = false` until Ru signs off, and while false the card shows a "preview" tag.

## Accessibility bar

- WCAG 2.1 AA colour, verified by script, not by eye.
- axe-core clean at 375 / 768 / 1024 / 1440.
- Targets ≥ 32px tall (WCAG 2.2 asks 24).
- Focus ring: 2px `gold`, 3px offset, on everything.
- Native `<details>` for FAQs: answers are in the HTML for crawlers and work with JS off.
