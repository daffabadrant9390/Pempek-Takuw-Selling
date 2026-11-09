# Project notes

## Images (Next.js 16)
- Use `loading="eager"` (not the deprecated `priority`) on any `next/image` that can be the LCP element: header logo, hero images, and the first item of each list/carousel that is visible on load.
- Everything below the fold stays `loading="lazy"` (the default).
- If the dev console logs "was detected as the Largest Contentful Paint (LCP)", add `loading="eager"` to that image.

## Hydration warnings
- Attributes like `bis_skin_checked`, `bis_register` and `__processed_*__` are injected by a browser extension (e.g. Bitdefender), not by this code. Verify in an incognito window with extensions off before changing any code.
