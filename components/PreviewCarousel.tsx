"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = { src: string; w: number; h: number; position: string; alt: string; caption: string };

const INTERVAL = 3800; // ms per slide
const IDLE_PAUSE = 6000; // ms autoplay stays paused after the visitor interacts

export function PreviewCarousel({ slides, labels }: { slides: Slide[]; labels: { prev: string; next: string; goTo: string } }) {
  const scroller = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  // The slides are rendered three times so there is always a neighbour on both sides; the visitor is
  // silently moved back to the middle copy once scrolling settles, which makes the loop endless.
  const n = slides.length;
  const [active, setActive] = useState(n); // global index (0 .. 3n-1)
  const activeRef = useRef(n);
  const visible = useRef(false);
  const hovering = useRef(false);
  const pausedUntil = useRef(0);
  const reduced = useRef(false);
  const items = [...slides, ...slides, ...slides];

  const leftFor = useCallback((i: number) => {
    const el = scroller.current;
    const item = itemRefs.current[i];
    if (!el || !item) return null;
    return item.offsetLeft - (el.clientWidth - item.clientWidth) / 2;
  }, []);

  const goTo = useCallback(
    (i: number, instant = false) => {
      const left = leftFor(i);
      if (left === null) return;
      scroller.current?.scrollTo({ left, behavior: instant || reduced.current ? "auto" : "smooth" });
    },
    [leftFor],
  );

  const touch = () => {
    pausedUntil.current = Date.now() + IDLE_PAUSE;
  };

  // Track which slide sits closest to the centre while scrolling (drag, swipe, arrows or autoplay).
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const d = Math.abs(item.offsetLeft + item.clientWidth / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      if (best !== activeRef.current) {
        activeRef.current = best;
        setActive(best);
      }
    };
    // Once scrolling has settled outside the middle copy, jump to the identical slide in the middle copy.
    let settle: ReturnType<typeof setTimeout>;
    const recentre = () => {
      const g = activeRef.current;
      if (g >= n && g < 2 * n) return;
      const target = n + (g % n);
      const left = leftFor(target);
      if (left === null) return;
      el.scrollTo({ left, behavior: "auto" });
      activeRef.current = target;
      setActive(target);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
      clearTimeout(settle);
      settle = setTimeout(recentre, 160);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    // Start on the first slide of the middle copy.
    const start = leftFor(n);
    if (start !== null) el.scrollTo({ left: start, behavior: "auto" });
    update();
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(settle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [leftFor, n]);

  // Only autoplay while on screen, and never for people who prefer reduced motion.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const id = window.setInterval(() => {
      if (reduced.current || !visible.current || hovering.current || document.hidden) return;
      if (Date.now() < pausedUntil.current) return;
      goTo(activeRef.current + 1);
    }, INTERVAL);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [goTo, n]);

  const step = (dir: 1 | -1) => {
    touch();
    goTo(active + dir);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      className="relative mt-9"
      onPointerEnter={(e) => (hovering.current = e.pointerType === "mouse")}
      onPointerLeave={() => (hovering.current = false)}
      onPointerDown={touch}
      onWheel={touch}
      onFocus={touch}
    >
      <ul
        ref={scroller}
        tabIndex={0}
        aria-label="Preview"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[calc(50%-8rem)] py-10 [scrollbar-width:none] sm:px-[calc(50%-9rem)] lg:gap-6 lg:px-[calc(50%-10rem)] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((s, i) => {
          const on = i === active;
          const clone = i < n || i >= 2 * n;
          return (
            <li
              key={`${i}-${s.src}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              aria-roledescription="slide"
              aria-hidden={clone || undefined}
              aria-label={`${(i % n) + 1} / ${n}`}
              className="w-64 shrink-0 snap-center sm:w-72 lg:w-80"
            >
              <figure
                className={`card relative overflow-hidden p-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  on ? "scale-100 opacity-100 shadow-2xl" : "scale-[0.88] opacity-55"
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={s.src}
                    width={s.w}
                    height={s.h}
                    alt={s.alt}
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 256px"
                    style={{ objectPosition: s.position }}
                    className={`size-full object-cover transition-transform duration-[2500ms] ease-out ${on ? "scale-110" : "scale-100"}`}
                  />
                </div>
                <figcaption
                  className={`pill absolute bottom-4 left-1/2 max-w-[90%] -translate-x-1/2 whitespace-nowrap px-4 py-1.5 text-sm transition-all duration-500 ${
                    on ? "translate-y-0 opacity-100 delay-300" : "translate-y-3 opacity-0"
                  }`}
                >
                  {s.caption}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label={labels.prev}
        className="absolute left-1 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-maroon shadow-card transition duration-200 hover:scale-110 hover:bg-white active:scale-95 sm:left-4"
      >
        <ChevronLeft className="size-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label={labels.next}
        className="absolute right-1 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-maroon shadow-card transition duration-200 hover:scale-110 hover:bg-white active:scale-95 sm:right-4"
      >
        <ChevronRight className="size-6" aria-hidden="true" />
      </button>

      <div className="mt-2 flex items-center justify-center gap-2.5">
        {slides.map((s, i) => {
          const current = i === active % n;
          return (
          <button
            key={s.src}
            type="button"
            onClick={() => {
              touch();
              // Move to the nearest copy of slide i so the shortest way round is taken.
              const half = Math.floor(n / 2);
              const diff = ((i - (active % n) + n + half) % n) - half;
              goTo(active + diff);
            }}
            aria-label={`${labels.goTo} ${i + 1}`}
            aria-current={current}
            className="group flex h-6 cursor-pointer items-center"
          >
            <span
              className={`relative block h-2.5 overflow-hidden rounded-full transition-all duration-500 ${
                current ? "w-10 bg-maroon/20" : "w-2.5 bg-maroon/30 group-hover:bg-maroon/55"
              }`}
            >
              {current && <span key={active} className="anim-dot-fill absolute inset-y-0 left-0 w-full rounded-full bg-maroon" />}
            </span>
          </button>
          );
        })}
      </div>
    </div>
  );
}
