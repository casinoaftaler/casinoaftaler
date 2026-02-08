import { useState, useEffect, useMemo } from "react";

// Breakpoint thresholds (matching tailwind)
const XL_BREAKPOINT = 1280;

// Height budgets for different layouts
// Desktop WITH title (xl+): Title ~100px, Frame ~180px, Reels ~580px, Controls ~90px = ~950px
// Desktop CORE (no title): Frame ~180px, Reels ~580px, Controls ~90px = ~850px
const BASELINE_DESKTOP_WITH_TITLE = 950;
const BASELINE_DESKTOP_CORE = 850;

// Mobile WITH title (<xl): Title ~80px, Reels ~320px, Controls ~80px = ~480px
// Mobile CORE (no title): Reels ~320px, Controls ~80px = ~400px
// Note: Side content (leaderboard/promo) is placed outside the scaled container on mobile
const BASELINE_MOBILE_WITH_TITLE = 480;
const BASELINE_MOBILE_CORE = 400;

// Header height (fixed)
const HEADER_HEIGHT = 64;

// Safety padding (top + bottom)
const SAFETY_PADDING = 16;

// Scale constraints
const MIN_SCALE = 0.35;
const MAX_SCALE = 1.0;

// Show title only if we have at least 12% extra headroom after fitting core
const TITLE_HEADROOM_FACTOR = 1.12;

// Estimated content widths at each breakpoint (reels + gaps + frame + padding)
// These are generous estimates including frame margins to prevent horizontal overflow
const CONTENT_WIDTH: Record<string, number> = {
  xs:     440,   // 5×61 + separators + frame(31×2) + padding
  mobile: 510,   // 5×71 + separators + frame(40×2) + padding
  sm:     680,   // 5×92 + separators + frame(54×2) + padding
  md:     800,   // 5×109 + separators + frame(54×2) + padding
  lg:     950,   // 5×133 + separators + frame(72×2) + padding
  xl:    1070,   // 5×150 + separators + frame(90×2) + padding
};

function getContentWidth(viewportWidth: number): number {
  if (viewportWidth >= XL_BREAKPOINT) return CONTENT_WIDTH.xl;
  if (viewportWidth >= 1024) return CONTENT_WIDTH.lg;
  if (viewportWidth >= 768) return CONTENT_WIDTH.md;
  if (viewportWidth >= 640) return CONTENT_WIDTH.sm;
  if (viewportWidth >= 400) return CONTENT_WIDTH.mobile;
  return CONTENT_WIDTH.xs;
}

export interface ViewportScaling {
  scale: number;
  availableHeight: number;
  shouldScale: boolean;
  isDesktop: boolean;
  showTitle: boolean;
}

/**
 * Hook that calculates optimal scale factor to fit slot machine within viewport.
 * Considers BOTH height and width constraints — uses the more restrictive one.
 * Adapts baseline calculations based on viewport width (desktop vs mobile layout).
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
    
    // === HEIGHT-based scaling ===
    const availableHeight = height - HEADER_HEIGHT - SAFETY_PADDING;
    
    const coreBaseline = isDesktop ? BASELINE_DESKTOP_CORE : BASELINE_MOBILE_CORE;
    const fullBaseline = isDesktop ? BASELINE_DESKTOP_WITH_TITLE : BASELINE_MOBILE_WITH_TITLE;
    
    const coreScale = availableHeight / coreBaseline;
    const showTitle = coreScale >= TITLE_HEADROOM_FACTOR;
    
    const heightBaseline = showTitle ? fullBaseline : coreBaseline;
    const heightScale = availableHeight / heightBaseline;
    
    // === WIDTH-based scaling ===
    const contentWidth = getContentWidth(width);
    // Use full viewport width minus a small safety margin (8px each side)
    const availableWidth = width - 16;
    const widthScale = availableWidth / contentWidth;
    
    // === Combined: use the MORE restrictive constraint ===
    const rawScale = Math.min(heightScale, widthScale);
    
    // Clamp between min and max
    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, rawScale));
    
    // Only apply scaling if we need to shrink (scale < 1)
    const shouldScale = scale < MAX_SCALE;

    return {
      scale,
      availableHeight,
      shouldScale,
      isDesktop,
      showTitle,
    };
  }, [viewport]);

  return scaling;
}
