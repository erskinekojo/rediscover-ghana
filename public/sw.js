// Rediscover Ghana service worker: precache every page and its assets so towns work offline.
const VERSION = 'rg-v1';
const scope = new URL(self.registration.scope).pathname; // e.g. "/" or "/sub/"

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(VERSION);
      try {
        const pages = await (await fetch(scope + 'precache.json', { cache: 'no-store' })).json();
        const assets = new Set([scope + 'icon.svg']);
        for (const url of pages) {
          const res = await fetch(url);
          if (!res.ok) continue;
          await cache.put(url, res.clone());
          const html = await res.text();
          for (const m of html.matchAll(/(?:href|src)="([^"]*\/_astro\/[^"]+)"/g)) assets.add(m[1]);
        }
        await Promise.all([...assets].map((a) => cache.add(a).catch(() => {})));
      } catch (e) {
        /* offline install: ignore, runtime caching still works */
      }
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isFont) return;

  if (req.mode === 'navigate') {
    // Pages: network first so updates show, cache when offline.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(async () => (await caches.match(req, { ignoreSearch: true })) || (await caches.match(scope)))
    );
    return;
  }
  // Assets and fonts: cache first, fill in the background.
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy));
          }
          return res;
        })
    )
  );
});
