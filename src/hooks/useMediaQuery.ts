import { useEffect, useState } from "react";

export function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Device performance tier used to scale the 3D experience. */
export type Tier = "high" | "medium" | "low";

export function usePerformanceTier(): Tier {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
  const [weak, setWeak] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    setWeak(cores <= 4);
  }, []);

  if (isMobile || weak) return "low";
  if (isTablet) return "medium";
  return "high";
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
