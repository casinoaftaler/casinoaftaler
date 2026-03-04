import { useState, useEffect, useRef, useCallback } from "react";

interface UseAnimatedCounterOptions {
  duration?: number;
  startFrom?: number;
  playSound?: boolean;
  isBigWin?: boolean;
  skipToEnd?: boolean;
  speedMultiplier?: number; // 1 = normal, higher = faster
}

export function useAnimatedCounter(
  targetValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const { duration = 1000, startFrom = 0, playSound = true, isBigWin = false, skipToEnd = false, speedMultiplier = 1 } = options;
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef<number | null>(null);
  const previousTargetRef = useRef(targetValue);
  const progressRef = useRef(0);
  const startValueRef = useRef(0);

  // Skip to end when requested
  useEffect(() => {
    if (skipToEnd && targetValue > 0) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setDisplayValue(targetValue);
      previousTargetRef.current = targetValue;
    }
  }, [skipToEnd, targetValue]);

  useEffect(() => {
    if (skipToEnd || targetValue <= 0 || targetValue === previousTargetRef.current) {
      if (!skipToEnd) setDisplayValue(targetValue);
      previousTargetRef.current = targetValue;
      return;
    }

    const start = startFrom;
    const end = targetValue;
    const range = end - start;
    startValueRef.current = start;
    progressRef.current = 0;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      
      // Advance progress based on speed multiplier
      const progressIncrement = (delta / duration) * speedMultiplier;
      progressRef.current = Math.min(progressRef.current + progressIncrement, 1);
      
      const progress = progressRef.current;
      
      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.round(start + range * easedProgress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    previousTargetRef.current = targetValue;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, startFrom, playSound, isBigWin, skipToEnd, speedMultiplier]);

  return displayValue;
}
