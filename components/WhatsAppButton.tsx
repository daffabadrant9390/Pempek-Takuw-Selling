import { WhatsAppIcon } from "./Icons";

type Props = {
  href: string;
  label: string;
  /** "solid": green button. "light": white button for dark backgrounds. */
  variant?: "solid" | "light";
  size?: "md" | "lg";
  className?: string;
};

const variants = {
  solid: "bg-wa-deep text-white hover:bg-[#0b6232]",
  light: "bg-white text-wa-deep hover:bg-cream",
};

const sizes = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

export function WhatsAppButton({ href, label, variant = "solid", size = "md", className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold shadow-pill transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      <span>{label}</span>
    </a>
  );
}
