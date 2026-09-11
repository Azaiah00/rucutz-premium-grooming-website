import data from "@/data/photos.json";

export type Photo = {
  key: string;
  w: number;
  h: number;
  tags: string[];
  alt: string;
  files: { w: number; src: string }[];
  source: "instagram" | "yelp";
};

export const PHOTOS = data as Photo[];
const byKey = new Map(PHOTOS.map((p) => [p.key, p]));

export function photo(key: string): Photo {
  const p = byKey.get(key);
  if (!p) throw new Error(`Unknown photo key: ${key}`);
  return p;
}

export const srcSet = (p: Photo) => p.files.map((f) => `${f.src} ${f.w}w`).join(", ");
export const largest = (p: Photo) => p.files[p.files.length - 1].src;
export const GALLERY = PHOTOS.filter((p) => /^g\d+$/.test(p.key) || ["hero-taper-beard", "waves-temple", "bigchop-after", "svc-afterhours", "svc-edgeup-enh", "svc-prince", "client-smile"].includes(p.key));

export const GALLERY_FILTERS = [
  { id: "all", label: "All" },
  { id: "fades", label: "Fades & Tapers" },
  { id: "waves", label: "Waves" },
  { id: "beards", label: "Beards" },
  { id: "textures", label: "All Textures" },
  { id: "locs", label: "Locs, Twists & Braids" },
  { id: "transformations", label: "Transformations" },
  { id: "kids", label: "Young Kings" },
] as const;
