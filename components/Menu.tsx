import Image from "next/image";

import { largePempek, smallPempek, SMALL_PRICE } from "@/content/catalogue";
import { formatRupiah } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Menu({ dict }: { dict: Dictionary }) {
  const perPcs = dict.common.perPcs;

  return (
    <section id="menu" aria-labelledby="menu-title" className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="card p-5 sm:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[240px_1fr]">
          <Reveal variant="pop" className="flex justify-center">
            <div className="blob flex w-60 flex-col items-center justify-center px-8 py-7 text-center">
              <h2 id="menu-title" className="text-3xl leading-tight">
                {dict.menu.title}
              </h2>
              <span className="pill mt-3 -rotate-3 px-4 py-1.5 text-sm not-italic">
                {formatRupiah(SMALL_PRICE)}
                {perPcs}
              </span>
            </div>
          </Reveal>

          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-7">
            {smallPempek.map((p, i) => (
              <Reveal as="li" key={p.id} variant="pop" delay={120 + i * 90} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(20%-0.8rem)]">
                <div className="group flex flex-col items-center gap-3">
                  <div className="aspect-square w-full max-w-[8.5rem] overflow-hidden rounded-3xl border-4 border-white shadow-card ring-1 ring-sun/60">
                    <Image
                      src={p.image.src}
                      width={p.image.w}
                      height={p.image.h}
                      alt={p.name}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="size-full object-cover transition duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <span className="pill whitespace-nowrap px-4 py-2 text-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">{p.name}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <ul className="mt-8 grid gap-4 border-t border-maroon/10 pt-8 lg:grid-cols-2">
          {largePempek.map((p, i) => (
            <Reveal as="li" key={p.id} variant={i === 0 ? "left" : "right"} delay={i * 120} className="min-w-0">
              <div className="group flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-cream/70 p-4 transition duration-300 hover:-translate-y-1 hover:bg-cream hover:shadow-card sm:p-5">
                <div className="flex flex-col items-start gap-3">
                  <h3 className="text-lg font-bold italic leading-tight text-maroon min-[420px]:text-xl sm:text-2xl">{p.name}</h3>
                  <span className="pill px-4 py-2 text-base italic sm:px-5">
                    {formatRupiah(p.price)}
                    {perPcs}
                  </span>
                </div>
                <Image
                  src={p.image.src}
                  width={p.image.w}
                  height={p.image.h}
                  alt={p.name}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-auto w-24 max-[359px]:w-16 shrink-0 drop-shadow-md transition duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3 min-[420px]:w-36 sm:w-44"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
