import { getBundles } from '../lib/content';
import { u } from '../lib/url';

// List of pages the service worker caches up front so the town pages work offline.
export function GET() {
  const urls = [u('/'), u('/map/'), u('/saved/'), u('/contribute/'), ...['towns', 'people', 'food', 'festivals', 'places'].map((c) => u(`/browse/${c}/`))];
  for (const b of getBundles()) {
    if (b.town.status !== 'filmed') continue;
    const base = `/towns/${b.town.slug}`;
    urls.push(u(`${base}/`), u(`${base}/origin/`), u(`${base}/visit/`), ...b.people.map((p) => u(`${base}/people/${p.slug}/`)));
  }
  return new Response(JSON.stringify(urls), { headers: { 'Content-Type': 'application/json' } });
}
