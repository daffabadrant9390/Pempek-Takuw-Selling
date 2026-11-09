import Image from "next/image";

import { bonusTiers, images } from "@/content/catalogue";
import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Bonus({ dict }: { dict: Dictionary }) {
  const { bonus } = dict;

  return (
    <section id="bonus" aria-labelledby="bonus-title" className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="card p-5 sm:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[240px_1fr]">
          <Reveal variant="pop" className="flex justify-center">
            <div className="blob flex w-56 items-center justify-center px-8 py-8 text-center">
              <h2 id="bonus-title" className="text-3xl leading-tight">
                {bonus.title}
              </h2>
            </div>
          </Reveal>

          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-maroon/15">
            {bonusTiers.map((tier, i) => {
              const two = tier.bottles === 2;
              const word = tier.bottles === 1 ? bonus.bottleOne : bonus.bottleMany;
              return (
                <Reveal as="li" key={tier.minPcs} delay={150 + i * 140} className="sm:px-4">
                  <div className="group flex flex-col items-center gap-4">
                    <span className="pill px-6 py-2.5 text-base italic transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                      Min. {tier.minPcs} pcs
                    </span>
                    <div className="flex items-center gap-3">
                      <p className="text-center text-lg font-semibold leading-snug">
                        {tier.bottles} {word}
                        <br />({tier.ml} ml)
                      </p>
                      {two ? (
                        <Image
                          src={images.cukoBottles2.src}
                          width={images.cukoBottles2.w}
                          height={images.cukoBottles2.h}
                          alt={bonus.bottlesAlt}
                          className="h-24 w-auto drop-shadow-md transition duration-300 group-hover:-translate-y-1.5 group-hover:rotate-3"
                        />
                      ) : (
                        <Image
                          src={images.cukoBottle.src}
                          width={images.cukoBottle.w}
                          height={images.cukoBottle.h}
                          alt={bonus.bottleAlt}
                          className={`w-auto drop-shadow-md transition duration-300 group-hover:-translate-y-1.5 group-hover:rotate-6 ${tier.ml === 120 ? "h-16" : "h-24"}`}
                        />
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
