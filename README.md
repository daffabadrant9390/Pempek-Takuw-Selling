# Pempek Takuw website

Static, bilingual (Indonesian / English) pre-order catalogue for Pempek Takuw.
One home page at `/id/` and `/en/`; every order goes to WhatsApp (+62 812-7136-3702).
Built with Next.js (App Router), TypeScript and Tailwind CSS. No backend, no database.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /id/)
npm run build      # writes the finished static site to ./out
npm run preview    # serves ./out locally
```

## Where to edit things

| What | File |
| --- | --- |
| Prices, products, bonus tiers, WhatsApp number, website | `content/catalogue.ts` |
| Indonesian text | `dictionaries/id.json` |
| English text | `dictionaries/en.json` (must keep the same keys as `id.json`) |
| WhatsApp prefilled messages | `wa` block in both dictionaries |
| Colours and shared look (brush banner, blob, pill) | `app/globals.css` |
| Images | `public/images/...` (see `assets-manifest.json` for sizes and sources) |
| Social share image / favicon | `public/og.jpg`, `public/favicon.png`, `public/apple-touch-icon.png` |

Colours: maroon `#960508`, deep maroon `#740305`, yellow `#F9CF4D`, cream `#FFF4E3`. Font: Poppins (self-hosted via `@fontsource/poppins`).

## Changing the domain

Set `NEXT_PUBLIC_SITE_URL` (for example `https://www.pempektakuw.com`) when building. It is used for
canonical links, the sitemap and the social-share image. The default is `https://www.pempektakuw.com`.

## Deploying

`npm run build` creates `out/`, a folder of plain files that any static host can serve
(Vercel, Cloudflare Pages, Netlify, or your own VPS with nginx).
`vercel.json` redirects `/` to `/id/`. On other hosts, `/` shows a small page that redirects to `/id/`.

## Replacing the placeholder photos

The images in `public/images` were cut out from generated artwork. When you have real photos, keep the same
file names (or edit the paths in `content/catalogue.ts`) and rebuild. `public/images/photos/` holds six
full-size plate photos that are not used on the page yet.
