"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  /** Start delay in ms, handy for staggering siblings. */
  delay?: number;
  variant?: "up" | "pop" | "left" | "right";
  className?: string;
  children: ReactNode;
};

/** Fades/slides its children in the first time they scroll into view. */
export function Reveal({ as: Tag = "div", delay = 0, variant = "up", className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-variant={variant}
      style={{ ["--d" as string]: `${delay}ms` } as CSSProperties}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
