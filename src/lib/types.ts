export type Status = 'filmed' | 'soon' | 'research';

export interface TextureItem {
  kind: 'food' | 'festival' | 'craft';
  title: string;
  note: string;
  color: string;
}

export interface Town {
  slug: string;
  name: string;
  gaName: string;
  region: string;
  district: string;
  status: Status;
  /** [lat, lng], approximate, used only for the stylised map */
  coords: [number, number];
  blurb: string;
  heroImage: string;
  filmUrl: string;
  filmDuration: string;
  filmedDate: string;
  lastVerified: string;
  chapters: {
    origin: { teaser: string; toldBy: string };
    texture: TextureItem[];
    visit: { fromAccraMin: string; dayBudget: string; bestTime: string };
  };
  credits: string;
}

export interface Person {
  slug: string;
  townSlug: string;
  name: string;
  role: string;
  yearsLabel: string;
  portrait: string;
  color: string;
  quote: string;
  shortVideoUrl: string;
  shortDuration: string;
  dayTitle: string;
  dayTimeline: { label: string; text: string }[];
  whatsChanging: string;
  consent: boolean;
}

export interface Account {
  townSlug: string;
  type: 'oral' | 'written';
  toldBy: string;
  role: string;
  recordedDate: string;
  text: string;
  quote?: string;
  quoteGa?: string;
  isPrimary: boolean;
}

export interface Short {
  slug: string;
  townSlug: string;
  title: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  color: string;
  /** where the card links to, relative to the town page */
  link: string;
}

export interface Place {
  slug: string;
  townSlug: string;
  name: string;
  image: string;
  bestTime: string;
  cost: string;
  payment: string;
  tags: string[];
  coords: [number, number] | null;
  lastVerified: string;
  color: string;
}

export interface Transport {
  townSlug: string;
  mode: string;
  note: string;
  priceGhs: string;
}

export interface Source {
  townSlug: string;
  n: number;
  citation: string;
}

export interface TownBundle {
  town: Town;
  people: Person[];
  accounts: Account[];
  shorts: Short[];
  places: Place[];
  transport: Transport[];
  sources: Source[];
  respectNotes: string[];
  nameCard: { ga: string; meaning: string };
  writtenRecord: string;
}
