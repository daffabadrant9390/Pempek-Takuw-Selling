import { WhatsAppIcon } from "./Icons";

/** Round WhatsApp button fixed to the bottom-right on every screen size. */
export function FloatingWhatsApp({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        ["--d" as string]: "1400ms",
      }}
      className="anim-pop group fixed z-50 flex h-14 items-center rounded-full bg-wa text-white shadow-[0_8px_24px_-6px_rgb(0_0_0/0.45)] transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 active:scale-95"
    >
      {/* Soft pulse ring to draw the eye; switched off for reduced-motion users. */}
      <span aria-hidden="true" className="anim-ring pointer-events-none absolute left-0 top-0 size-14 rounded-full bg-wa" />
      <span className="relative flex size-14 shrink-0 items-center justify-center">
        <WhatsAppIcon className="size-8 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      </span>
      {/* Label slides out on hover (desktop only); the link keeps an aria-label either way. */}
      <span
        aria-hidden="true"
        className="hidden max-w-0 overflow-hidden whitespace-nowrap pr-0 text-sm font-semibold transition-all duration-300 group-hover:max-w-48 group-hover:pr-5 lg:block"
      >
        {label}
      </span>
    </a>
  );
}
