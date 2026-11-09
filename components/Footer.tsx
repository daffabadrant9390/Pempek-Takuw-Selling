import Image from "next/image";

import { SITE, images } from "@/content/catalogue";
import type { Dictionary } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

export function Footer({ dict, waHref }: { dict: Dictionary; waHref: string }) {
  const { contact, common } = dict;

  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative mt-10 overflow-hidden bg-maroon text-white">
      {/* Decorative wave pattern in both bottom corners. */}
      <Image src={images.wave.src} width={images.wave.w} height={images.wave.h} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-4 -left-6 w-40 opacity-15 invert sm:w-56" />
      <Image src={images.wave.src} width={images.wave.w} height={images.wave.h} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-4 -right-6 w-40 -scale-x-100 opacity-15 invert sm:w-56" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-12 text-center sm:py-16">
        <Reveal variant="pop">
          <div className="anim-float rounded-full bg-white p-2 shadow-lg">
            <Image src={images.mascot.src} width={images.mascot.w} height={images.mascot.h} alt={dict.menu.mascotAlt} className="size-20 object-contain" />
          </div>
        </Reveal>

        <Reveal delay={100} className="flex flex-col items-center gap-5">
          <h2 id="contact-title" className="text-2xl font-semibold italic sm:text-3xl">
            {contact.title}
          </h2>
          <p className="max-w-md text-white/90">{contact.text}</p>
        </Reveal>

        <Reveal delay={220}>
          <WhatsAppButton href={waHref} label={common.chatWhatsapp} variant="light" size="lg" />
        </Reveal>

        <Reveal delay={320} className="w-full">
          <dl className="mt-2 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-10">
            <div className="flex items-center gap-2">
              <dt className="sr-only">{contact.whatsappLabel}</dt>
              <WhatsAppIcon className="size-5 text-white" />
              <dd className="text-base font-semibold">{SITE.whatsappDisplay}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">{contact.websiteLabel}</dt>
              <dd className="text-base font-semibold">{SITE.website}</dd>
            </div>
          </dl>

          <p className="mt-6 text-xs text-white/70">
            © {new Date().getFullYear()} {contact.rights}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
