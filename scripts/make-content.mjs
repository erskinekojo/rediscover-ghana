// One-off helper: writes stub town.json files for the other coast towns. Safe to delete after running.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const towns = [
  ['la', 'La (Labadi)', 'soon', 5.5575, -0.1465, 'Labadi Beach, the La palace and its own Homowo. Shoot planned for [month].'],
  ['nungua', 'Nungua', 'research', 5.5983, -0.0733, 'Neighbour to Teshie, with its own story of the coast. Researching sources and contacts.'],
  ['osu', 'Osu', 'research', 5.556, -0.1822, 'Castle, Oxford Street and some of the oldest families in Accra. Researching sources and contacts.'],
  ['jamestown', 'Jamestown', 'research', 5.5337, -0.2113, 'Old Accra by the harbour: lighthouse, boxing gyms and the fishing port. Researching sources and contacts.'],
  ['tema', 'Tema', 'research', 5.6698, -0.0166, 'From fishing village to port city. Researching sources and contacts.'],
];

for (const [slug, name, status, lat, lng, blurb] of towns) {
  const dir = `content/towns/${slug}`;
  mkdirSync(dir, { recursive: true });
  if (existsSync(`${dir}/town.json`)) continue;
  const town = {
    slug, name, gaName: '[Ga spelling]', region: 'Greater Accra', district: '[District]', status,
    coords: [lat, lng], blurb, heroImage: `Photo · ${name}`, filmUrl: '', filmDuration: '', filmedDate: '',
    lastVerified: '[date]', credits: 'Keen Eye Media Alliance',
    chapters: { origin: { teaser: '', toldBy: '' }, texture: [], visit: { fromAccraMin: '[—]', dayBudget: 'GH₵ [—]', bestTime: '[—]' } },
  };
  writeFileSync(`${dir}/town.json`, JSON.stringify(town, null, 2) + '\n');
}
