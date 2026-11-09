import Image from "next/image";

import { images } from "@/content/catalogue";
import type { Dictionary } from "@/lib/i18n";
import { delay } from "@/lib/motion";
import { Sparks } from "./Icons";
import { WhatsAppButton } from "./WhatsAppButton";

export function Hero({ dict, waHref }: { dict: Dictionary; waHref: string }) {
  const { hero, common } = dict;

  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-8 overflow-x-clip px-4 pb-8 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-14">
      <div className="relative z-10 text-center lg:text-left">
        <span style={delay(150)} className="blob anim-pop mb-5 inline-flex items-center gap-2 px-6 py-2 text-sm sm:text-base">
          <Sparks className="anim-spark size-5 text-spark" />
          {hero.badge}
        </span>

        <h1
          style={delay(300)}
          className="brush anim-fade-up mx-auto w-fit max-w-full px-9 py-6 text-center leading-tight sm:px-12 sm:py-8 lg:mx-0 lg:text-left"
        >
          <span className="block text-2xl sm:text-4xl">{hero.line1}</span>
          <span className="mt-1 block text-lg sm:text-2xl">{hero.line2}</span>
        </h1>

        <div style={delay(500)} className="anim-fade-up mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row lg:justify-start">
          <WhatsAppButton href={waHref} label={common.orderWhatsapp} size="lg" />
          <a
            href="#menu"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-maroon px-7 py-3.5 text-base font-semibold text-maroon transition duration-200 hover:-translate-y-0.5 hover:bg-maroon hover:text-white active:scale-95"
          >
            {hero.seeMenu}
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[420px] pb-4 pt-10 sm:pt-12">
        <Image
          src={images.bridge.src}
          width={images.bridge.w}
          height={images.bridge.h}
          alt={hero.bridgeAlt}
          style={delay(700)}
          className="anim-fade-up absolute -right-4 top-0 w-44 opacity-95 sm:-right-10 sm:w-56"
        />
        <Image
          src={images.platterAll.src}
          width={images.platterAll.w}
          height={images.platterAll.h}
          alt={hero.platterAlt}
          loading="eager"
          style={delay(350)}
          className="anim-pop relative h-auto w-full drop-shadow-[0_18px_18px_rgb(116_3_5/0.22)]"
        />
        <div style={delay(1200)} className="anim-float absolute -right-3 bottom-0 sm:-right-8">
          <Image
            src={images.cukoBottle.src}
            width={images.cukoBottle.w}
            height={images.cukoBottle.h}
            alt={hero.bottleAlt}
            style={delay(750)}
            className="anim-pop h-36 w-auto drop-shadow-lg sm:h-44"
          />
        </div>
        <div style={delay(2000)} className="anim-float absolute -left-2 bottom-0 sm:-left-8">
          <Image
            src={images.cukoBowl.src}
            width={images.cukoBowl.w}
            height={images.cukoBowl.h}
            alt={hero.bowlAlt}
            style={delay(900)}
            className="anim-pop w-24 drop-shadow-lg sm:w-32"
          />
        </div>
        <Sparks style={delay(600)} className="anim-spark absolute -left-1 top-20 size-9 text-spark sm:-left-6" />
      </div>
    </section>
  );
}
