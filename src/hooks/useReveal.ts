import { useEffect, type RefObject } from "react";
import { revealChildren } from "@/lib/animations";

/** Reveals every `.reveal` descendant of the ref when it scrolls into view. */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  options?: Parameters<typeof revealChildren>[1],
) {
  useEffect(() => {
    const cleanup = revealChildren(ref.current, options);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
