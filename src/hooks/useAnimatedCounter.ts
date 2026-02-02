import { useState, useEffect, useRef } from "react";

interface UseAnimatedCounterOptions {
  duration?: number; // Duration in ms
  startFrom?: number;
}

export function useAnimatedCounter(
  targetValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const { duration = 1000, startFrom = 0 } = options;
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef<number | null>(null);
  const previousTargetRef = useRef(targetValue);

  useEffect(() => {
    // Only animate if target increased (new win)
    if (targetValue <= 0 || targetValue === previousTargetRef.current) {
      setDisplayValue(targetValue);
      previousTargetRef.current = targetValue;
      return;
    }

    const start = startFrom;
    const end = targetValue;
    const range = end - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for more satisfying feel (ease-out)
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
  }, [targetValue, duration, startFrom]);

  return displayValue;
}
