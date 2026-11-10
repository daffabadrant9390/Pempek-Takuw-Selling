import Image from "next/image";

import { PACKAGE_PRICE, smallPempek } from "@/content/catalogue";
import { formatRupiah } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

export function Package({ dict, waHref }: { dict: Dictionary; waHref: string }) {
  const { paket } = dict;

  return (
    <section id="paket" aria-labelledby="paket-heading" className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="card p-5 sm:p-8">
        <Reveal variant="pop" className="mb-6 flex justify-center">
          <h2 id="paket-heading" className="pill px-8 py-2.5 text-2xl italic sm:text-3xl">
            {paket.label}
          </h2>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-3xl font-bold italic leading-tight text-maroon sm:text-4xl">{paket.title}</h3>
            <p className="mt-1 text-base font-medium">{paket.subtitle}</p>
          </div>
          <span className="pill shrink-0 px-6 py-2.5 text-xl italic sm:text-2xl">
            {formatRupiah(PACKAGE_PRICE)}
            {paket.perPaket}
          </span>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {smallPempek.map((p, i) => (
            <Reveal as="li" key={p.id} variant="pop" delay={100 + i * 90} className="min-w-0 last:col-span-2 sm:last:col-span-1">
              <div className="group relative mx-auto flex max-w-[11rem] flex-col items-center rounded-b-[2rem] rounded-t-2xl border-2 border-maroon/25 bg-gradient-to-br from-white/90 to-sun/20 px-2 pb-4 pt-9 transition duration-300 hover:-translate-y-1 hover:shadow-card">
                {/* bag neck + tie */}
                <span aria-hidden="true" className="absolute -top-[1.1rem] left-1/2 h-5 w-14 -translate-x-1/2 border-x-2 border-t-2 border-maroon/25 bg-white/90 [clip-path:polygon(0_100%,18%_0,82%_0,100%_100%)]" />
                <span aria-hidden="true" className="absolute left-1/2 top-1.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-maroon" />
                <span className="absolute -right-3 -top-3 flex size-11 rotate-6 items-center justify-center rounded-full border-[3px] border-white bg-sun text-base font-extrabold text-maroon shadow-md transition duration-300 group-hover:rotate-12 group-hover:scale-110">
                  {paket.qty}
                </span>

                <div className="relative h-24 w-32" role="img" aria-label={paket.itemAlt.replace("{name}", p.name)}>
                  {[0, 1].map((n) => (
                    <Image
                      key={n}
                      src={p.image.src}
                      width={p.image.w}
                      height={p.image.h}
                      alt=""
                      aria-hidden="true"
                      className={`absolute size-[5.25rem] rounded-full border-4 border-white object-cover shadow-card transition duration-300 ${n === 0 ? "left-0 top-0 group-hover:-translate-x-1 group-hover:-rotate-6" : "right-0 top-3 group-hover:translate-x-1 group-hover:rotate-6"}`}
                    />
                  ))}
                </div>
                <span className="pill mt-3 whitespace-nowrap px-4 py-1.5 text-sm">{p.name}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <WhatsAppButton href={waHref} label={paket.cta} size="lg" />
        </div>
      </div>
    </section>
  );
}
