# START HERE — RuCutz Premium Grooming

This folder is the complete website source. It was built and audited in the cloud workspace, then copied here.

## 1. Get it onto GitHub

The git history is in `rucutz-premium-grooming.bundle` (the sync couldn't carry a live `.git` folder into OneDrive safely — git can't manage its lock files there).

From a **local** folder, not OneDrive:

```bash
git clone rucutz-premium-grooming.bundle rucutz-premium-grooming-website
cd rucutz-premium-grooming-website
git remote set-url origin https://github.com/Azaiah00/rucutz-premium-grooming-website.git
git push -u origin main
```

(The bundle carries one commit with the full build. If you'd rather start clean, just `git init` in a local copy of this folder and push that.)

## 2. Run it

```bash
npm install     # in the local copy, never inside OneDrive
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

## 3. Before showing Ru

```bash
npm run audit   # lint + build + contrast + content/SEO + accessibility
```

All three audits were green at handoff: 1,851 content/SEO checks, axe-core clean at 375/768/1024/1440, every colour pairing above WCAG AA.

## 4. Read these

- `README.md` — how the site is put together, deploy settings, redirects
- `DESIGN.md` — the design system and the rules that keep it consistent
- `RESEARCH-DOSSIER.md` — every fact on the site and where it came from, plus the three conflicts Ru needs to settle
- `ASSETS-OWED.md` — the short list of things only Ru can give us
- `AGENTS.md` — rules for the next AI agent that touches this repo

## 5. Deploy

Netlify: build `npm run build`, publish `out`, Node 20. `netlify.toml` is already set up with the old Square Online redirects.
