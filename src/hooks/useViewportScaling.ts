import { useState, useEffect, useMemo } from "react";

// Height budget at xl breakpoint (baseline for scaling)
// Title: ~100px, Frame padding: ~180px, Reels: ~482px, Controls: ~130px, Bonus bar: ~40px
const BASELINE_HEIGHT = 950;

// Header height
const HEADER_HEIGHT = 64;

// Safety margin
const SAFETY_MARGIN = 16;

// Scale constraints
const MIN_SCALE = 0.5;
const MAX_SCALE = 1.0;

export interface ViewportScaling {
  scale: number;
  availableHeight: number;
  shouldScale: boolean;
}

/**
 * Hook that calculates optimal scale factor to fit slot machine within viewport height.
 * Uses debounced resize listener for performance.
 */
export function useViewportScaling(): ViewportScaling {
  const [viewportHeight, setViewportHeight] = useState(() => {
    if (typeof window === "undefined") return 1080;
    return window.innerHeight;
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      // Debounce resize handler (100ms)
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewportHeight(window.innerHeight);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scaling = useMemo<ViewportScaling>(() => {
    const availableHeight = viewportHeight - HEADER_HEIGHT - SAFETY_MARGIN;
    
    // Calculate raw scale factor
    const rawScale = availableHeight / BASELINE_HEIGHT;
    
    // Clamp between min and max
    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, rawScale));
    
    // Only apply scaling if we need to shrink (scale < 1)
    const shouldScale = scale < MAX_SCALE;

    return {
      scale,
      availableHeight,
      shouldScale,
    };
  }, [viewportHeight]);

  return scaling;
}
