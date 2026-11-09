import type { CSSProperties } from "react";

/** Sets the --d CSS variable used by the animation classes as a start delay. */
export const delay = (ms: number): CSSProperties => ({ ["--d" as string]: `${ms}ms` });
