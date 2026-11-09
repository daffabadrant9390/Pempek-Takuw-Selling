import id from "@/dictionaries/id.json";
import en from "@/dictionaries/en.json";

export const locales = ["id", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "id";

export type Dictionary = typeof id;

// `en` must have exactly the same shape as `id`; TypeScript checks it here.
const dictionaries: Record<Lang, Dictionary> = { id, en };

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
