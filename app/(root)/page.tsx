import type { Metadata } from "next";

import { defaultLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Pempek Takuw",
  robots: { index: false },
};

/**
 * "/" has no content of its own: it sends visitors to the default language.
 * The site is a static export, so this is a meta-refresh plus a script
 * (Vercel also redirects "/" via vercel.json before this page is served).
 */
export default function RootRedirect() {
  const target = `/${defaultLang}/`;

  return (
    <main className="flex min-h-screen items-center justify-center p-8 text-center">
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(target)} + window.location.hash);`,
        }}
      />
      <p>
        <a className="font-semibold text-maroon underline" href={target}>
          Pempek Takuw → {target}
        </a>
      </p>
    </main>
  );
}
