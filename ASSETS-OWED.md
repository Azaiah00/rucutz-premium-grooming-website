# What we still need from Ru

The site is complete and factually sourced from his own listings. These are the things only he can confirm or supply. Everything marked **on-screen** shows a visible marker on the site until it's resolved.

## Confirm (5 minutes, on a call)

1. **ZIP code.** Square says 33025; every other listing says 33021. The site uses **33021**. He should correct Square.
2. **Hours.** Google, Square and Yelp disagree. The site publishes Google's (Mon–Wed 12–6, Thu–Fri 10–7, Sat 10–4, closed Sunday). Pick one set and make all three match.
3. **Prices.** Pulled from Square on 11 Sep 2026. Confirm nothing has changed.
4. **The exit-intent offer** — *free Signature Scent on a first Experience, code SCENTONRU*. **On-screen:** the card carries a "preview, pending Ru's confirmation" tag until he approves it. Flip `OFFER_CONFIRMED` in `src/components/ScratchOffer.tsx` once he does.
5. **Big-chop before/after.** Confirm the "locs" and "waves" photos are the same client. If not, we'll swap in a pair that is.
6. **The three Journal guides** are written in his voice but published under the business byline. If he reads and approves them, we switch the byline to him, which is stronger for E-E-A-T.
7. **Kay Pro Styles mention.** The About page has a short "one-stop shop" block linking to @kayprostyles. Confirm she's happy with it.

## Photos we'd love (phone camera is fine)

1. **A women's cut.** **On-screen:** the Queen Haircut Experience currently renders a "needs real photo" marker with the shot brief. A short tapered cut or big chop on a woman, finished, three-quarter profile.
2. **The suite itself** — the chair, the shampoo bowl, the massage chair, the neon sign, clean and empty. Right now the only interior shots are behind clients.
3. **Ru at work, shot properly** — 3–4 frames: consult, the wash, razor detail, the hot towel. These are the six "Ritual" steps; today they're stills pulled from his reels.
4. **A headshot.** The About portrait is a full-length photo from his feed. A proper portrait in the suite would lift the whole page.
5. **The Distinguished Experience** — the massage chair, the essential-oil towel, the parfum on the counter.

## Free wins on his own profiles

- **Google Business Profile:** add the address (it currently shows none), add photos (it has none), add the service menu and the "Book" link. He has 13 five-star reviews and an almost empty profile.
- **Yelp:** 38 photos and zero reviews. Ask five regulars to review there.
- **Square:** fix the ZIP; add the Queen/Prince descriptions to match the site.
- **Instagram bio:** point the link at the new site instead of the Square Online page.

## Before launch

- Domain: point `rucutzpremiumgrooming.com` at the new deploy and retire the Square Online site (redirects are in `README.md`).
- Add the new site URL to Google Business Profile, Yelp, Instagram, Facebook and Salon Lofts.
- Submit the sitemap in Google Search Console and request indexing for the home, services and big-chop pages.
