# Rediscover Ghana (Phase 0 prototype)

Astro + TypeScript static site, installable as a PWA. See `CLAUDE.md` for the full brief.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + static build into dist/
npm run preview    # serve the build
```

## Content
All content is in `content/towns/<slug>/*.json` (town, people, accounts, origin, shorts, places, transport, visit, sources). Replace the bracketed placeholders with real content; no code changes needed. A town only gets its own pages when `status` is `"filmed"`. Add a film by setting `filmUrl` to a YouTube/Vimeo **embed** URL (same for `shortVideoUrl` on a person).

## Deploy (free, shareable URL)
- **Netlify / Cloudflare Pages / Vercel:** connect the repo, build command `npm run build`, output directory `dist`.
- **Sub-path hosting (e.g. GitHub Pages):** build with `SITE=https://user.github.io BASE=/repo-name npm run build`.

## Notes
- Offline: `public/sw.js` precaches every page listed by `/precache.json`, so town pages work without signal after the first visit.
- Icons: edit `public/icon.svg`, then `npm run icons`.
- `mockup/` is the original design reference only (proprietary template syntax; not used as code).
