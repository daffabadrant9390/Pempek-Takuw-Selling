import { Megaphone } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

export function LargeOrder({ dict, waHref }: { dict: Dictionary; waHref: string }) {
  const { largeOrder } = dict;

  return (
    <section id="large-order" aria-labelledby="large-order-title" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
      <Reveal>
        <div className="grid items-center gap-5 rounded-3xl bg-maroon p-6 text-white shadow-card sm:p-8 md:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-4">
            <Megaphone className="anim-wiggle mt-1 size-10 shrink-0 text-spark" strokeWidth={1.8} aria-hidden="true" />
            <div>
              <h2 id="large-order-title" className="text-2xl font-semibold italic leading-tight sm:text-3xl">
                {largeOrder.title}
              </h2>
              <p className="mt-2 text-base font-medium">{largeOrder.note}</p>
              <p className="mt-1 text-sm text-white/85">{largeOrder.example}</p>
            </div>
          </div>
          <WhatsAppButton href={waHref} label={largeOrder.cta} variant="light" size="lg" />
        </div>
      </Reveal>
    </section>
  );
}
