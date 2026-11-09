import Image from "next/image";
import { ArrowDownLeft } from "lucide-react";

import { images, previewPhotos } from "@/content/catalogue";
import type { Dictionary } from "@/lib/i18n";
import { Sparks } from "./Icons";
import { PreviewCarousel } from "./PreviewCarousel";
import { Reveal } from "./Reveal";

export function Preview({ dict }: { dict: Dictionary }) {
  const { preview } = dict;

  return (
    <section id="preview" aria-labelledby="preview-title" className="mx-auto max-w-6xl overflow-x-clip px-4 py-10 sm:py-14">
      <Reveal variant="pop" className="text-center">
        <h2 id="preview-title" className="brush mx-auto w-fit max-w-full px-10 py-5 text-2xl sm:px-16 sm:text-4xl">
          {preview.title}
        </h2>
        <p className="mt-4 font-medium text-cocoa/80">{preview.subtitle}</p>
      </Reveal>

      <PreviewCarousel
        slides={previewPhotos.map((photo, i) => ({ ...photo, ...preview.photos[i] }))}
        labels={{ prev: preview.prev, next: preview.next, goTo: preview.goTo }}
      />

      <Reveal variant="pop" className="relative mx-auto mt-6 w-full max-w-[380px]">
        <Image src={images.boxFilled.src} width={images.boxFilled.w} height={images.boxFilled.h} alt={preview.boxAlt} className="h-auto w-full drop-shadow-xl" />
        <span className="blob absolute -top-4 right-0 px-5 py-3 text-center text-lg leading-tight sm:-right-4">{preview.packaging}</span>
        <ArrowDownLeft className="anim-float absolute right-10 top-16 size-9 text-maroon sm:right-8" strokeWidth={2.5} aria-hidden="true" />
        <Sparks className="anim-spark absolute -left-2 top-2 size-8 text-spark" />
      </Reveal>
    </section>
  );
}
