import { useState, useEffect, useMemo } from "react";

// Breakpoint thresholds (matching tailwind)
const XL_BREAKPOINT = 1280;

// Height budgets for different layouts
// Desktop (xl+): Title ~100px, Frame ~180px, Reels ~580px, Controls ~90px = ~950px
// Mobile (<xl): Title ~80px, Reels ~320px, Controls ~80px, Side content ~250px = ~730px
const BASELINE_DESKTOP = 950;
const BASELINE_MOBILE = 730;

// Header height (fixed)
const HEADER_HEIGHT = 64;

// Safety padding (top + bottom)
const SAFETY_PADDING = 16;

// Scale constraints
const MIN_SCALE = 0.45;
const MAX_SCALE = 1.0;

export interface ViewportScaling {
  scale: number;
  availableHeight: number;
  shouldScale: boolean;
  isDesktop: boolean;
}

/**
 * Hook that calculates optimal scale factor to fit slot machine within viewport height.
 * Adapts baseline height calculation based on viewport width (desktop vs mobile layout).
 * Uses debounced resize listener for performance.
 */
export function useViewportScaling(): ViewportScaling {
  const [viewport, setViewport] = useState(() => {
    if (typeof window === "undefined") return { width: 1920, height: 1080 };
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    // Initial measurement (immediate)
    setViewport({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      // Debounce resize handler (100ms)
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scaling = useMemo<ViewportScaling>(() => {
    const { width, height } = viewport;
    const isDesktop = width >= XL_BREAKPOINT;
    
    // Calculate available height (viewport minus header and padding)
    const availableHeight = height - HEADER_HEIGHT - SAFETY_PADDING;
    
    // Use appropriate baseline based on layout
    const baseline = isDesktop ? BASELINE_DESKTOP : BASELINE_MOBILE;
    
    // Calculate raw scale factor
    const rawScale = availableHeight / baseline;
    
    // Clamp between min and max
    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, rawScale));
    
    // Only apply scaling if we need to shrink (scale < 1)
    const shouldScale = scale < MAX_SCALE;

    return {
      scale,
      availableHeight,
      shouldScale,
      isDesktop,
    };
  }, [viewport]);

  return scaling;
}
