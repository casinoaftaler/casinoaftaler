import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Randomly selects symbol cells to shimmer while the grid is idle.
 * Returns a Set of cell indices currently shimmering.
 *
 * @param cellCount   Total cells in the grid (e.g. 15 for 5x3, 30 for 6x5)
 * @param isIdle      Whether the grid is idle (not spinning/tumbling)
 * @param intervalMs  Time between shimmer picks (default 2500ms)
 * @param shimmerMs   How long each shimmer lasts (default 1200ms)
 */
export function useIdleShimmer(
  cellCount: number,
  isIdle: boolean,
  intervalMs = 2500,
  shimmerMs = 1200
) {
  const [shimmeringCells, setShimmeringCells] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pickCell = useCallback(() => {
    if (cellCount <= 0) return;
    // Pick 1-2 random cells
    const count = Math.random() > 0.6 ? 2 : 1;
    const cells = new Set<number>();
    for (let i = 0; i < count; i++) {
      cells.add(Math.floor(Math.random() * cellCount));
    }
    setShimmeringCells(cells);

    // Clear after shimmer duration
    setTimeout(() => {
      setShimmeringCells(new Set());
    }, shimmerMs);
  }, [cellCount, shimmerMs]);

  useEffect(() => {
    if (!isIdle || cellCount <= 0) {
      setShimmeringCells(new Set());
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Start after a short initial delay
    const startDelay = setTimeout(() => {
      pickCell();
      timerRef.current = setInterval(pickCell, intervalMs);
    }, 1500);

    return () => {
      clearTimeout(startDelay);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setShimmeringCells(new Set());
    };
  }, [isIdle, cellCount, intervalMs, pickCell]);

  return shimmeringCells;
}
