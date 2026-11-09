/**
 * All static business data lives here. To change a price, a product or the
 * WhatsApp number, edit this file and rebuild. Page text lives in /dictionaries.
 */

export const SITE = {
  name: "Pempek Takuw",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pempek-takuw-selling.vercel.app",
  website: "https://pempek-takuw-selling.vercel.app",
  /** Digits only, with country code (no +, no spaces). Used for wa.me links. */
  whatsappNumber: "6281271363702",
  whatsappDisplay: "+62 812-7136-3702",
} as const;

export type Img = { src: string; w: number; h: number };

export type Product = {
  id: string;
  /** Product names are not translated. */
  name: string;
  /** Price per pcs in rupiah. */
  price: number;
  image: Img;
};

const img = (src: string, w: number, h: number): Img => ({
  src: `/images/${src}.webp`,
  w,
  h,
});

/** Small pempek: all one price, ordered min. 5 pcs per type. */
export const SMALL_PRICE = 7500;

export const smallPempek: Product[] = [
  { id: "telur", name: "Telur", price: SMALL_PRICE, image: img("pempek-photo/telur", 360, 360) },
  { id: "keriting", name: "Keriting", price: SMALL_PRICE, image: img("pempek-photo/keriting", 360, 360) },
  { id: "lenjer-kecil", name: "Lenjer Kecil", price: SMALL_PRICE, image: img("pempek-photo/lenjer-kecil", 360, 360) },
  { id: "adaan", name: "Adaan", price: SMALL_PRICE, image: img("pempek-photo/adaan", 360, 360) },
  { id: "kulit", name: "Kulit", price: SMALL_PRICE, image: img("pempek-photo/kulit", 360, 360) },
];

export const largePempek: Product[] = [
  { id: "kapal-selam", name: "Kapal Selam", price: 30000, image: img("platters/plate-kapal-selam", 236, 157) },
  { id: "lenjer-besar", name: "Lenjer Besar", price: 35000, image: img("platters/plate-lenjer-besar", 240, 163) },
];

/** Free cuko tiers. Above 50 pcs the 50-pcs tier repeats (see dictionaries). */
export type BonusTier = {
  minPcs: number;
  bottles: number;
  ml: 120 | 250;
};

export const bonusTiers: BonusTier[] = [
  { minPcs: 10, bottles: 1, ml: 120 },
  { minPcs: 25, bottles: 1, ml: 250 },
  { minPcs: 50, bottles: 2, ml: 250 },
];

/** Vacuum-pack preview photos, with their label. */
export const packs: { label: string; image: Img }[] = [
  { label: "Pempek Telur", image: img("packaging/pack-telur", 186, 119) },
  { label: "Lenjer Kecil", image: img("packaging/pack-lenjer-kecil", 180, 125) },
  { label: "Keriting", image: img("packaging/pack-keriting", 186, 124) },
  { label: "Adaan", image: img("packaging/pack-adaan", 187, 126) },
  { label: "Kulit", image: img("packaging/pack-kulit", 185, 127) },
  { label: "Lenjer Besar", image: img("packaging/pack-lenjer-besar", 191, 125) },
];

export const images = {
  logo: img("brand/logo", 355, 178),
  mascot: img("brand/mascot-cat", 168, 136),
  platterAll: img("platters/platter-all", 349, 226),
  cukoBottle: img("cuko/cuko-bottle", 100, 251),
  cukoBowl: img("cuko/cuko-bowl", 177, 129),
  cukoBottles2: img("cuko/cuko-bottles-2", 123, 135),
  cukoBottles3: img("cuko/cuko-bottles-3", 176, 188),
  boxFilled: img("packaging/box-filled", 350, 317),
  bridge: img("decor/ampera-bridge", 274, 142),
  leaf: img("decor/banana-leaf", 228, 116),
  cucumber: img("decor/cucumber-slices", 220, 98),
  wave: img("decor/wave-pattern", 184, 94),
};

/** Real photos of the product and packaging, shown in the Preview section (order matches dictionary `preview.photos`). */
export const previewPhotos = [
  { src: "/images/preview/keranjang-segar.webp", w: 900, h: 1600, position: "50% 40%" },
  { src: "/images/preview/basket-vakum-cuko.webp", w: 900, h: 1600, position: "50% 0%" },
  { src: "/images/preview/aneka-vakum.webp", w: 900, h: 1200, position: "50% 60%" },
  { src: "/images/preview/vakum-pack.webp", w: 900, h: 1600, position: "50% 4%" },
];
