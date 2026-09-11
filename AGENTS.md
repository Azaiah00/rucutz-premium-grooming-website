<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# RuCutz — repo rules

Read `DESIGN.md` before touching anything visual and `RESEARCH-DOSSIER.md` before touching anything factual.

1. **Facts live in `src/data/`.** Prices, hours, NAP, reviews, FAQ copy and article text are data, never hard-coded in a component. If a fact changes, change it there and re-run `npm run audit:flow`.
2. **Never invent a fact about Ru.** Every claim on this site traces to his Square page, Google profile, Salon Lofts bio, Yelp page or Instagram captions. If you can't source it, don't write it. If a real asset is missing, render a `PhotoSlot` marker instead of a stock photo.
3. **No emoji in client-facing output.** Lucide icons or brand SVG only. `audit:flow` fails the build if an emoji reaches the HTML.
4. **Tokens only.** No colour, font or radius outside `DESIGN.md`. `audit:contrast` reads the real hexes out of `globals.css`.
5. **Run `npm run audit` before showing the client anything.** Lint, build, contrast, content/SEO and accessibility all have to pass.
6. **Booking is Square.** `BookLink` is the only booking CTA and points at `BOOKING_URL`. `/book/` and `/portal/` are previews on mock data (`src/lib/db.ts`) and must stay `noindex` and visibly labelled until there's a real backend.
7. **Pinned sections must not use `.reveal`** — see DESIGN.md, Motion.
8. **Never `npm install` inside the OneDrive folder.**
