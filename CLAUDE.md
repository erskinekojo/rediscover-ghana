# Rediscover Ghana — Project Brief

> Working title. Owner: Kojo (Keen Eye Media Alliance / KEMA), Accra.
> Put this file at the root of the repo as `CLAUDE.md` so Claude Code reads it every session.

## What this is

A progressive web app for **getting to know Ghana, one town at a time**. Each town gets:
- a short documentary film (made by KEMA),
- the stories of its people,
- its origin story, credited to the people who told it,
- and a practical, verified guide to visiting.

It is **not** a booking or listings app. It's a documentary and heritage archive with a travel layer on top. Audience: locals rediscovering their country, diaspora / roots-seekers, and visitors.

The pilot town is **Teshie** (Ga coast, Greater Accra). Next: La, Nungua, Osu, Jamestown, Tema.

## Current goal: Phase 0 — pitch prototype

Build a polished, clickable prototype with **sample content**, so Kojo can show funders, partners and volunteers what the finished product will look like. Real content comes later. Priorities:
1. Looks finished and works well on a phone (most viewers will open the link on a phone).
2. Every screen below exists and links up properly.
3. Content lives in data files, so real content can replace the sample later without changing code.
4. Deployed to a public URL that's easy to share.

## Screens (Phase 0)

1. **Discover (home)**
   - Wordmark, headline "Get to know Ghana, one town at a time.", search field
   - Browse chips: Towns · People · Food · Festivals · Places to go
   - Featured town card (photo, region, name, one-line description, "Watch the film · [12 min]") → Town page
   - "Short stories" horizontal row (vertical video thumbnails, duration, title)
   - "Next on the coast": towns with a status badge (Filmed / Filming soon / Researching)
   - "Know a story from your town?" contribute card
   - Bottom nav: Discover · Map · Saved · Contribute

2. **Town page (Teshie)**
   - Hero image, back and save buttons
   - Region / district line, name, 2-line description, "Watch the film" button
   - Chapter tabs: Origin · People · Texture · Go see it (they jump to sections)
   - Origin teaser card → Origin page
   - People grid (portrait, name, role) → Person page
   - Texture cards: Food / Festival / Craft
   - Go-see-it summary card (time from Accra, day budget, best time) → Visit page
   - Footer: credits, number of interviews and sources, last verified date

3. **Origin story**
   - Video clip ("In Ga, with subtitles")
   - "The name" card (Ga spelling and meaning)
   - Main account with an **"Oral tradition" badge** and "As told by [name], [role] · recorded [date]"
   - Pull quote, with the original Ga underneath
   - "Another account" block. Different versions are shown side by side, never ranked.
   - "What the written record says"
   - Numbered sources list, and a "Know a different version? Tell us" button

4. **Person profile**
   - Full-width portrait, name, role, years doing the work
   - Pull quote, "Watch her story" button
   - "A day at…" timeline (4 steps)
   - "What's changing" paragraph
   - "More people of Teshie" row

5. **Go see it (visit guide)**
   - "Last verified [date]" at the top
   - Getting there: Trotro / Bolt or Uber / Driving, each with a note and price in GH₵
   - Place cards: photo, name, chips (best time, cost, cash/MoMo, etiquette)
   - Respect notes (photo etiquette, festival rules, places not to film)
   - "Go with a local guide": a disabled card marked **Later phase**

6. **Map**
   - Stylised map of the coast with a pin per town, coloured by status
   - Legend: Filmed (green) · Filming soon (gold) · Researching (grey)
   - Tapping a pin opens a bottom sheet with name, status and blurb. Filmed towns get "Open town page"; the others get "Help us tell this town's story".
   - A real map (Leaflet + OpenStreetMap) is fine if it's simple; otherwise a stylised SVG.

## Content rules (important)

- **Never invent history, names, prices or quotes.** Facts we don't have yet appear as visible placeholders in brackets: `[Elder's name]`, `GH₵ [—]`, `[date]`.
- Facts that are safe to use as sample copy: Teshie is a Ga fishing town on the coast east of Accra, in Ledzokuku Municipal; it's known for fishing canoes, fish smoking, fantasy coffin carving and Homowo (the Ga harvest festival).
- Every origin claim is credited to a named source. Oral tradition and written history are labelled separately.
- Every practical detail shows a "Last verified" date.
- Images: use clearly labelled placeholders (a solid or striped block with a dashed label, such as "PHOTO · Canoes at sunrise") until Kojo supplies stills. Don't use stock photos of real people.

## Data model (content as files, no backend in Phase 0)

```
Town        { slug, name, gaName, region, district, status: filmed|soon|research,
              coords, blurb, heroImage, filmUrl, filmDuration, filmedDate,
              lastVerified, chapters: { origin, texture, visit } }
Person      { slug, townSlug, name, role, yearsLabel, portrait, quote,
              shortVideoUrl, dayTimeline[{label, text}], whatsChanging, consent: bool }
Account     { townSlug, type: oral|written, toldBy, role, recordedDate,
              text, quote, quoteGa, isPrimary }
Short       { slug, townSlug, title, duration, videoUrl, thumbnail }
Place       { slug, townSlug, name, image, bestTime, cost, payment, tags[], coords, lastVerified }
Transport   { townSlug, mode, note, priceGhs }
Source      { townSlug, n, citation }
```
One folder per town (for example `content/towns/teshie/`), using Markdown or JSON.

## Design

- Mobile-first, max content width about 480px on large screens (centred), with a proper desktop layout as a nice-to-have.
- Colours:
  - Ground `#F6F4EE` · Ink `#171A16` · Body text `#33362F` · Muted `#5B5F57`
  - Accent green `#1E5B3A` (buttons, active nav; white text on it)
  - Gold `#E0A526` (play buttons, highlights; dark text on it, never gold text on light)
  - Warm placeholders: `#2B3D31`, `#3B2F22`, `#4A3A27`, `#23402F`, `#7A3B1D`, `#1D3F6E`
  - Status badges: soon `#F3D58C`, research `#E4E0D5`, filmed `#D7E7DC`
  - Borders `#E4E0D5` / `#D8D4C8`; secondary card `#EDE9DE`
- Type: **Space Grotesk** (headings, 600–700, slight negative letter-spacing) + **Inter** (body, 400–600), both from Google Fonts.
- Shape: cards with 16–22px corners, pill buttons, 44px minimum touch targets, inline stroke SVG icons (no emoji).
- Feel: documentary, warm, calm. Slow, not flashy. No gradient washes.
- Accessibility: real buttons and links, alt text or aria-labels on placeholders, 4.5:1 text contrast.

## Tech (suggested; adjust if you have a better reason)

- **Astro** (static, content collections fit the data model) or **Next.js** static export. Use TypeScript.
- PWA: web app manifest + service worker (e.g. `@vite-pwa/astro`), with town pages cached for offline use, because signal drops at many sites.
- Video: YouTube or Vimeo embeds for now. Don't self-host video.
- Deploy: Cloudflare Pages, Netlify or Vercel (free tier) and give Kojo a shareable URL.
- No accounts, database or payments in Phase 0. "Saved" can use localStorage.

## Later phases (not now)

- Phase 1: real content for Teshie (from the shoot), then La and Nungua.
- Phase 2: contributor form (suggest a town or elder, volunteer), simple CMS (e.g. Decap or a headless CMS) so collaborators can add content.
- Phase 3: local guide bookings, partner listings, donations or sponsorship. These need partnerships, payments and moderation, so they wait until there's an audience.

## Reference

`mockup/` contains the original design mockup, one HTML file per screen (`Main` = home, `Town`, `Origin`, `Person`, `Visit`, `Map`). They use a proprietary template syntax (`{{ }}`, `<sc-for>`, `<x-dc>`), so treat them as **visual and layout reference only**. Don't copy them in as code.
