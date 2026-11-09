import { Check, ClipboardCheck } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { RichText } from "./RichText";

export function Terms({ dict }: { dict: Dictionary }) {
  return (
    <section id="terms" aria-labelledby="terms-title" className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="card grid items-center gap-6 p-5 sm:p-8 md:grid-cols-[280px_1fr]">
        <Reveal variant="pop">
          <div className="flex items-center gap-4 rounded-3xl bg-maroon p-5 text-white shadow-pill">
            <ClipboardCheck className="size-14 shrink-0" strokeWidth={1.6} aria-hidden="true" />
            <h2 id="terms-title" className="text-2xl font-semibold italic leading-tight">
              {dict.terms.title}
            </h2>
          </div>
        </Reveal>

        <ul className="space-y-3.5">
          {dict.terms.rules.map((rule, i) => (
            <Reveal as="li" key={rule} variant="left" delay={150 + i * 110} className="flex gap-3 text-base leading-snug">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-maroon text-white">
                <Check className="size-4" strokeWidth={3.5} aria-hidden="true" />
              </span>
              <span>
                <RichText text={rule} />
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
