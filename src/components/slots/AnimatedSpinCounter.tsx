import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSpinCounterProps {
  value: number;
  className?: string;
}

export function AnimatedSpinCounter({ value, className }: AnimatedSpinCounterProps) {
  const prevRef = useRef(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value < prevRef.current) {
      setAnimating(true);
    }
    prevRef.current = value;
  }, [value]);

  return (
    <span
      className={cn(className, animating && "gates-spin-decrement")}
      onAnimationEnd={() => setAnimating(false)}
      style={{ display: "inline-block", perspective: "200px" }}
    >
      {value}
    </span>
  );
}
