import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface SmallWinBarProps {
  amount: number;
  isActive: boolean;
  onAnimationComplete?: () => void;
}

export function SmallWinBar({ amount, isActive, onAnimationComplete }: SmallWinBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const hasCompletedRef = useRef(false);
  const previousAmountRef = useRef(0);
  
  // Animation duration scales with win size (similar to WinDisplay)
  const duration = Math.min(500 + amount * 10, 1500);
  const displayAmount = useAnimatedCounter(isVisible ? amount : 0, { 
    duration, 
    startFrom: 0, 
    playSound: isVisible && amount > 0 
  });

  // Show bar when active and amount > 0
  useEffect(() => {
    if (isActive && amount > 0) {
      setIsVisible(true);
      setIsFadingOut(false);
      hasCompletedRef.current = false;
      previousAmountRef.current = amount;
    } else if (!isActive && isVisible) {
      // Start fade out when no longer active
      setIsFadingOut(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsFadingOut(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isActive, amount]);

  // Detect when counting finishes
  useEffect(() => {
    if (isVisible && displayAmount === amount && amount > 0 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      
      // Hold for 500ms after counting completes, then trigger callback
      const holdTimeout = setTimeout(() => {
        onAnimationComplete?.();
      }, 500);
      
      return () => clearTimeout(holdTimeout);
    }
  }, [displayAmount, amount, isVisible, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-2 rounded-lg",
        "bg-gradient-to-r from-amber-500/20 to-amber-600/20",
        "border border-amber-500/40",
        "shadow-[0_0_15px_rgba(251,191,36,0.2)]",
        "transition-all duration-300 ease-out",
        isFadingOut 
          ? "opacity-0 scale-95 translate-y-1" 
          : "opacity-100 scale-100 translate-y-0 animate-[fade-in_0.3s_ease-out]"
      )}
    >
      <Coins className="h-5 w-5 text-amber-500" />
      <span className="font-bold text-lg text-amber-500 tabular-nums">
        {displayAmount}
      </span>
    </div>
  );
}
