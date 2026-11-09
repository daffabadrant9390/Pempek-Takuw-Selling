import type { MetadataRoute } from "next";

import { SITE } from "@/content/catalogue";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${SITE.url}/${lang}/`,
    changeFrequency: "weekly",
    priority: lang === "id" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE.url}/${l}/`])),
    },
  }));
}
