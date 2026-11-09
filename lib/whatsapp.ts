import { SITE } from "@/content/catalogue";

/** Builds a click-to-chat link: https://wa.me/<number>?text=<message> */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
