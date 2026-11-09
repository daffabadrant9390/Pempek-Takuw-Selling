import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "@fontsource/poppins/latin-800.css";
import "@fontsource/poppins/latin-600-italic.css";
import "@fontsource/poppins/latin-700-italic.css";
import "../globals.css";

import { SITE } from "@/content/catalogue";
import { getDictionary, isLang, locales, type Lang } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#960508",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDictionary(lang);

  return {
    metadataBase: new URL(SITE.url),
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: `/${lang}/`,
      languages: { id: "/id/", en: "/en/", "x-default": "/id/" },
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url: `/${lang}/`,
      siteName: SITE.name,
      locale: lang === "id" ? "id_ID" : "en_US",
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: d.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      images: ["/og.jpg"],
    },
    icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang as Lang}>
      <body>
        {/* Without JavaScript, show everything that would otherwise wait to be revealed. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
