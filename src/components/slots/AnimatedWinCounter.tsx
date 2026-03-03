import { useEffect, useRef, useState } from "react";

interface AnimatedWinCounterProps {
  targetValue: number;
  duration?: number; // ms
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated counter that counts up with acceleration (ease-out).
 * Starts slow, speeds up in the middle, decelerates at the end.
 */
export function AnimatedWinCounter({ targetValue, duration = 1200, className, style }: AnimatedWinCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevTargetRef = useRef(0);
  const rafRef = useRef<number>();
  const bumpRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (targetValue === prevTargetRef.current) return;
    
    const startValue = prevTargetRef.current;
    const delta = targetValue - startValue;
    prevTargetRef.current = targetValue;
    
    if (delta <= 0) {
      setDisplayValue(targetValue);
      return;
    }

    const startTime = performance.now();
    // Scale duration based on delta size for better feel
    const scaledDuration = Math.min(duration, Math.max(400, delta * 3));

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / scaledDuration, 1);
      
      // Ease-out cubic for acceleration feel: fast start, decelerate at end
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.round(startValue + delta * eased);
      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayValue(targetValue);
        // Trigger bump animation on completion without forced reflow
        if (bumpRef.current) {
          const el = bumpRef.current;
          el.classList.remove('gates-counter-bump');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.classList.add('gates-counter-bump');
            });
          });
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [targetValue, duration]);

  // Reset when target goes to 0 (new spin)
  useEffect(() => {
    if (targetValue === 0) {
      prevTargetRef.current = 0;
      setDisplayValue(0);
    }
  }, [targetValue]);

  return (
    <span ref={bumpRef} className={className} style={style}>
      {displayValue.toLocaleString()}
    </span>
  );
}
