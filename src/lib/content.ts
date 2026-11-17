import type { TownBundle, Town } from './types';

// Content lives in /content/towns/<slug>/*.json. Real content replaces the sample files; no code changes needed.
const files = import.meta.glob('/content/towns/*/*.json', { eager: true, import: 'default' }) as Record<string, any>;

const bySlug = new Map<string, Record<string, any>>();
for (const [path, data] of Object.entries(files)) {
  const m = path.match(/\/content\/towns\/([^/]+)\/([^/]+)\.json$/);
  if (!m) continue;
  const [, slug, name] = m;
  if (!bySlug.has(slug)) bySlug.set(slug, {});
  bySlug.get(slug)![name] = data;
}

const ORDER = ['teshie', 'la', 'nungua', 'osu', 'jamestown', 'tema'];

export function getBundles(): TownBundle[] {
  return [...bySlug.values()]
    .filter((f) => f.town)
    .map((f) => ({
      town: f.town,
      people: f.people ?? [],
      accounts: f.accounts ?? [],
      shorts: f.shorts ?? [],
      places: f.places ?? [],
      transport: f.transport ?? [],
      sources: f.sources ?? [],
      respectNotes: f.visit?.respectNotes ?? [],
      nameCard: f.origin?.nameCard ?? { ga: '[Ga spelling]', meaning: '[Meaning of the name in Ga]' },
      writtenRecord: f.origin?.writtenRecord ?? '',
    }))
    .sort((a, b) => ORDER.indexOf(a.town.slug) - ORDER.indexOf(b.town.slug));
}

export function getBundle(slug: string): TownBundle {
  const b = getBundles().find((x) => x.town.slug === slug);
  if (!b) throw new Error(`No content for town ${slug}`);
  return b;
}

export const getTowns = (): Town[] => getBundles().map((b) => b.town);
export const filmedBundles = () => getBundles().filter((b) => b.town.status === 'filmed');

export const STATUS_LABEL = { filmed: 'Filmed', soon: 'Filming soon', research: 'Researching' } as const;
