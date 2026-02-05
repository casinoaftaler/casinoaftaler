import { useState, useEffect, useCallback, useMemo } from "react";

// Match the responsive symbol sizes from SlotSymbol/SlotReel
const SYMBOL_SIZE = { xs: 61, mobile: 71, sm: 92, md: 109, lg: 133, xl: 150 };
const GAP = { xs: 4, mobile: 6, sm: 8, md: 12, lg: 16 };

// Breakpoint thresholds (matching tailwind)
const BREAKPOINTS = {
  xs: 400,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

type Breakpoint = "xs" | "mobile" | "sm" | "md" | "lg" | "xl";

export interface SlotDimensions {
  symbolSize: number;
  gap: number;
  breakpoint: Breakpoint;
  totalSymbolHeight: number;
  viewportHeight: number;
  viewportWidth: number;
}

function getBreakpoint(width: number): Breakpoint {
  if (width < BREAKPOINTS.xs) return "xs";
  if (width < BREAKPOINTS.sm) return "mobile";
  if (width < BREAKPOINTS.md) return "sm";
  if (width < BREAKPOINTS.lg) return "md";
  if (width < BREAKPOINTS.xl) return "lg";
  return "xl";
}

function getDimensions(breakpoint: Breakpoint): { symbolSize: number; gap: number } {
  const symbolSize = breakpoint === "xl" ? SYMBOL_SIZE.xl : SYMBOL_SIZE[breakpoint];
  const gap = breakpoint === "xl" ? GAP.lg : GAP[breakpoint] ?? GAP.lg;
  return { symbolSize, gap };
}

/**
 * Hook that caches responsive slot dimensions and only recalculates on window resize.
 * Uses debounced resize listener to avoid excessive recalculations.
 */
export function useResponsiveSlotDimensions(): SlotDimensions {
  const getInitialDimensions = useCallback(() => {
    if (typeof window === "undefined") {
      return { breakpoint: "xl" as Breakpoint, symbolSize: SYMBOL_SIZE.xl, gap: GAP.lg };
    }
    const breakpoint = getBreakpoint(window.innerWidth);
    return { breakpoint, ...getDimensions(breakpoint) };
  }, []);

  const [dimensions, setDimensions] = useState(getInitialDimensions);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    const handleResize = () => {
      // Debounce resize handler (100ms)
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newBreakpoint = getBreakpoint(window.innerWidth);
        setDimensions((prev) => {
          // Only update if breakpoint actually changed
          if (prev.breakpoint === newBreakpoint) return prev;
          return { breakpoint: newBreakpoint, ...getDimensions(newBreakpoint) };
        });
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Memoize derived calculations
  const fullDimensions = useMemo<SlotDimensions>(() => {
    const { symbolSize, gap, breakpoint } = dimensions;
    const totalSymbolHeight = symbolSize + gap;
    const viewportHeight = 3 * symbolSize + 2 * gap;
    const viewportWidth = 5 * symbolSize + 4 * gap;
    
    return {
      symbolSize,
      gap,
      breakpoint,
      totalSymbolHeight,
      viewportHeight,
      viewportWidth,
    };
  }, [dimensions]);

  return fullDimensions;
}
