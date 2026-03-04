import { useState, useEffect, useMemo } from "react";

// Default resolution the slot machine is designed at (can be overridden per game)
const DEFAULT_BASE_WIDTH = 1280;
const DEFAULT_BASE_HEIGHT = 960;
const DEFAULT_HEADER_HEIGHT = 64;
const DEFAULT_SAFETY_PADDING = 8;
const DEFAULT_MIN_SCALE = 0.25;
const DEFAULT_MAX_SCALE = 1.0;

export interface SlotScaleOptions {
  baseWidth?: number;
  baseHeight?: number;
  headerHeight?: number;
  safetyPadding?: number;
  minScale?: number;
  maxScale?: number;
}

export interface SlotScale {
  scale: number;
  shouldScale: boolean;
}

/**
 * Unified slot scaling hook.
 * Calculates a single scale factor to fit the entire slot machine
 * within the viewport.
 */
export function useSlotScale(options: SlotScaleOptions = {}): SlotScale {
  const {
    baseWidth = DEFAULT_BASE_WIDTH,
    baseHeight = DEFAULT_BASE_HEIGHT,
    headerHeight = DEFAULT_HEADER_HEIGHT,
    safetyPadding = DEFAULT_SAFETY_PADDING,
    minScale = DEFAULT_MIN_SCALE,
    maxScale = DEFAULT_MAX_SCALE,
  } = options;

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
    const availableWidth = width - safetyPadding;
    const availableHeight = height - headerHeight - safetyPadding;

    const rawScale = Math.min(
      availableWidth / baseWidth,
      availableHeight / baseHeight,
      maxScale
    );

    const scale = Math.max(minScale, rawScale);
    const shouldScale = scale < maxScale;

    return { scale, shouldScale };
  }, [viewport, baseWidth, baseHeight, headerHeight, safetyPadding, minScale, maxScale]);
}
