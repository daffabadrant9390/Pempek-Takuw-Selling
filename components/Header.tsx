"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SITE, images } from "@/content/catalogue";
import { locales, type Lang } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";

type Props = {
  lang: Lang;
  waHref: string;
  labels: {
    menu: string;
    terms: string;
    bonus: string;
    preview: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    home: string;
    chatWhatsapp: string;
  };
};

const SECTION_IDS = ["menu", "terms", "bonus", "preview", "contact"] as const;

export function Header({ lang, waHref, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Keep the current section when switching language.
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // Compact header once the page is scrolled.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY < 120) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section in the middle of the screen.
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && window.scrollY >= 120) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Drawer behaviour: scroll lock, Esc to close, focus trap, focus return, close on desktop width.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        toggleRef.current?.focus({ preventScroll: true });
        wasOpen.current = false;
      }
      return;
    }
    wasOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const mq = window.matchMedia("(min-width: 1024px)");
    const onWide = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onWide);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open]);

  // Used by the backdrop and the drawer links. Unlocks scroll first so the anchor jump still works.
  const closeDrawer = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

  const links = [
    { id: "menu", label: labels.menu },
    { id: "terms", label: labels.terms },
    { id: "bonus", label: labels.bonus },
    { id: "preview", label: labels.preview },
    { id: "contact", label: labels.contact },
  ];

  return (
    <>
      <header
        className={`anim-slide-down sticky top-0 z-40 border-b backdrop-blur transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-maroon/15 bg-cream/95 shadow-[0_10px_24px_-18px_rgb(116_3_5/0.6)]"
            : "border-maroon/10 bg-cream/80"
        }`}
      >
        <div className={`mx-auto flex max-w-6xl items-center gap-3 px-4 transition-[height] duration-300 ${scrolled ? "h-14" : "h-16"}`}>
          <a href="#top" aria-label={labels.home} className="shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95">
            <Image
              src={images.logo.src}
              width={images.logo.w}
              height={images.logo.h}
              alt="Pempek Takuw"
              loading="eager"
              className={`w-auto transition-[height] duration-300 ${scrolled ? "h-9" : "h-11"}`}
            />
          </a>

          <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "location" : undefined}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-maroon transition-colors duration-200 hover:bg-maroon/10 after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-spark after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=location]:after:scale-x-100"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div role="group" aria-label={labels.language} className="flex rounded-full bg-paper p-1 shadow-sm ring-1 ring-maroon/15">
              {locales.map((l) => (
                <a
                  key={l}
                  href={`/${l}/${hash}`}
                  lang={l}
                  hrefLang={l}
                  aria-current={l === lang ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 active:scale-90 ${
                    l === lang ? "bg-maroon text-white shadow-sm" : "text-maroon hover:bg-maroon/10"
                  }`}
                >
                  {l.toUpperCase()}
                </a>
              ))}
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden min-h-11 items-center gap-2 rounded-full bg-wa-deep px-4 text-sm font-semibold text-white shadow-pill transition duration-200 hover:-translate-y-0.5 hover:bg-[#0b6232] active:scale-95 sm:inline-flex"
            >
              <WhatsAppIcon className="size-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              {labels.chatWhatsapp}
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={labels.openMenu}
              className="inline-flex size-11 items-center justify-center rounded-full text-maroon transition duration-200 hover:bg-maroon/10 active:scale-90 lg:hidden"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/*
        Mobile drawer. It is a sibling of <header> (not a child) because the header's backdrop blur would
        otherwise trap this fixed layer inside the header. It floats above the page, so nothing is pushed down.
      */}
      <div
        ref={drawerRef}
        id="mobile-drawer"
        inert={!open}
        className={`fixed inset-0 z-[70] transition-[visibility] lg:hidden ${open ? "visible delay-0 duration-0" : "invisible delay-[450ms] duration-0"}`}
      >
        <div
          onClick={closeDrawer}
          aria-hidden="true"
          className={`absolute inset-0 bg-cocoa/55 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${open ? "opacity-100" : "opacity-0"}`}
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label={labels.menu}
          className={`absolute inset-y-0 right-0 flex w-[70%] min-w-[16rem] max-w-[26rem] flex-col overflow-y-auto overscroll-contain rounded-l-[2rem] bg-cream shadow-[-18px_0_40px_-14px_rgb(0_0_0/0.4)] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center justify-between px-5 pb-2 pt-4">
            <Image src={images.logo.src} width={images.logo.w} height={images.logo.h} alt="Pempek Takuw" loading="eager" className="h-10 w-auto" />
            <button
              ref={closeRef}
              type="button"
              onClick={closeDrawer}
              aria-label={labels.closeMenu}
              className="inline-flex size-11 items-center justify-center rounded-full text-maroon transition duration-300 hover:rotate-90 hover:bg-maroon/10 active:scale-90"
            >
              <X className="size-6" />
            </button>
          </div>

          <nav aria-label="Main" className="mt-2 px-3">
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <li
                  key={l.id}
                  style={{ transitionDelay: open ? `${160 + i * 60}ms` : "0ms" }}
                  className={`transition-[opacity,translate] duration-500 ease-out ${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={closeDrawer}
                    aria-current={active === l.id ? "location" : undefined}
                    className="block rounded-2xl px-4 py-3.5 text-lg font-semibold text-maroon transition-[background-color,color,transform] duration-200 hover:bg-maroon/10 active:scale-[0.97] aria-[current=location]:bg-maroon aria-[current=location]:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            style={{ transitionDelay: open ? "480ms" : "0ms" }}
            className={`mt-auto px-5 pt-8 transition-[opacity,translate] duration-500 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDrawer}
              className="group flex min-h-12 items-center justify-center gap-2 rounded-full bg-wa-deep px-4 text-sm font-semibold text-white shadow-pill transition duration-200 active:scale-95"
            >
              <WhatsAppIcon className="size-5 transition-transform duration-300 group-hover:rotate-12" />
              {labels.chatWhatsapp}
            </a>
            <p className="mt-3 text-center text-xs font-medium text-cocoa/70">{SITE.whatsappDisplay}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
