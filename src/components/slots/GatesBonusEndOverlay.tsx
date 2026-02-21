import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface GatesBonusEndOverlayProps {
  isActive: boolean;
  totalWin: number;
  totalMultiplier: number;
  totalSpins: number;
  onComplete: () => void;
}

export function GatesBonusEndOverlay({
  isActive,
  totalWin,
  totalMultiplier,
  totalSpins,
  onComplete,
}: GatesBonusEndOverlayProps) {
  const [phase, setPhase] = useState<'fade-in' | 'counting' | 'hold' | 'done'>('fade-in');
  const [displayedWin, setDisplayedWin] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setPhase('fade-in');
      setDisplayedWin(0);
      return;
    }

    setPhase('fade-in');
    const t1 = setTimeout(() => setPhase('counting'), 600);
    return () => clearTimeout(t1);
  }, [isActive]);

  // Animated count-up
  useEffect(() => {
    if (phase !== 'counting') return;

    const duration = Math.min(2500, Math.max(1000, totalWin * 2));
    const startTime = performance.now();
    const startVal = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedWin(Math.round(startVal + (totalWin - startVal) * eased));

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayedWin(totalWin);
        setTimeout(() => setPhase('hold'), 300);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [phase, totalWin]);

  // Auto-dismiss after hold
  useEffect(() => {
    if (phase !== 'hold') return;
    const t = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3000);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  if (!isActive) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      "transition-opacity duration-500",
      phase === 'fade-in' ? "opacity-0" : "opacity-100"
    )}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8">
        {/* Title */}
        <div className={cn(
          "text-3xl font-black tracking-widest uppercase",
          "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400",
          "bg-clip-text text-transparent",
          "drop-shadow-[0_0_30px_rgba(234,179,8,0.6)]",
          "animate-fade-in"
        )}>
          Bonus Færdig!
        </div>

        {/* Decorative line */}
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />

        {/* Win amount - large animated counter */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-lg font-medium text-blue-300/70 uppercase tracking-wider">
            Total Gevinst
          </div>
          <div className={cn(
            "text-6xl font-black tabular-nums",
            "bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-500",
            "bg-clip-text text-transparent",
            "drop-shadow-[0_0_40px_rgba(234,179,8,0.5)]",
            phase === 'hold' && "animate-pulse"
          )}>
            {displayedWin.toLocaleString()}
          </div>
          <div className="text-xl font-bold text-yellow-500/80">POINT</div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-sm text-blue-400/60 uppercase tracking-wider">Multiplier</span>
            <span className="text-2xl font-bold text-blue-200">
              x{totalMultiplier}
            </span>
          </div>
          <div className="w-px h-10 bg-blue-500/20" />
          <div className="flex flex-col items-center">
            <span className="text-sm text-blue-400/60 uppercase tracking-wider">Free Spins</span>
            <span className="text-2xl font-bold text-blue-200">
              {totalSpins}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
