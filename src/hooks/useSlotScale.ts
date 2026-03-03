import { useState, useEffect, useMemo } from "react";

// Base resolution the slot machine is designed at (fixed)
const BASE_WIDTH = 1280;
const BASE_HEIGHT = 920;
const HEADER_HEIGHT = 64;
const SAFETY_PADDING = 16;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1.0;

export interface SlotScale {
  scale: number;
  shouldScale: boolean;
}

/**
 * Unified slot scaling hook.
 * Calculates a single scale factor to fit the entire slot machine
 * (designed at baseWidth x baseHeight) within the viewport.
 * 
 * scale = min(availableWidth / baseWidth, availableHeight / baseHeight, 1.0)
 */
export function useSlotScale(baseWidth = BASE_WIDTH, baseHeight = BASE_HEIGHT): SlotScale {
  const [viewport, setViewport] = useState(() => {
    if (typeof window === "undefined") return { width: 1920, height: 1080 };
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    setViewport({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
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

  return useMemo<SlotScale>(() => {
    const { width, height } = viewport;
    const availableWidth = width - SAFETY_PADDING;
    const availableHeight = height - HEADER_HEIGHT - SAFETY_PADDING;

    const rawScale = Math.min(
      availableWidth / baseWidth,
      availableHeight / baseHeight,
      MAX_SCALE
    );

    const scale = Math.max(MIN_SCALE, rawScale);
    const shouldScale = scale < MAX_SCALE;

    return { scale, shouldScale };
  }, [viewport, baseWidth, baseHeight]);
}
