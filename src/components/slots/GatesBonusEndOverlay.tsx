import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { slotSounds } from "@/lib/slotSoundEffects";

interface GatesBonusEndOverlayProps {
  isActive: boolean;
  totalWin: number;
  totalMultiplier: number;
  totalSpins: number;
  onComplete: () => void;
}

type EndPhase = 'storm-peak' | 'calm' | 'fade-in' | 'counting' | 'hold' | 'done';

export function GatesBonusEndOverlay({
  isActive,
  totalWin,
  totalMultiplier,
  totalSpins,
  onComplete,
}: GatesBonusEndOverlayProps) {
  const [phase, setPhase] = useState<EndPhase>('storm-peak');
  const [displayedWin, setDisplayedWin] = useState(0);
  const [thunderFlash, setThunderFlash] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const thunderIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determine win tier for effects
  const winTier = totalWin >= 5000 ? 'very-large' : totalWin >= 1000 ? 'large' : totalWin >= 200 ? 'medium' : 'small';

  useEffect(() => {
    if (!isActive) {
      setPhase('storm-peak');
      setDisplayedWin(0);
      return;
    }

    // Phase 1: Storm peak (0-600ms) — bright flash, Zeus pose
    setPhase('storm-peak');
    
    const t0 = setTimeout(() => {
      // Phase 2: Calm transition (600-1400ms)
      setPhase('calm');
    }, 600);

    const t1 = setTimeout(() => {
      // Phase 3: Fade in content (1400-2000ms)
      setPhase('fade-in');
    }, 1400);

    const t2 = setTimeout(() => {
      // Phase 4: Count up
      setPhase('counting');
      // Play win swell for larger wins
      if (winTier !== 'small') {
        slotSounds.playBonusWinSwell();
      }
    }, 2000);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isActive, winTier]);

  // Thunder flashes during count-up for medium+ wins
  useEffect(() => {
    if (phase !== 'counting') {
      if (thunderIntervalRef.current) clearInterval(thunderIntervalRef.current);
      return;
    }
    if (winTier === 'small') return;

    const interval = winTier === 'very-large' ? 300 : winTier === 'large' ? 500 : 800;
    thunderIntervalRef.current = setInterval(() => {
      setThunderFlash(true);
      if (winTier === 'large' || winTier === 'very-large') {
        slotSounds.playBonusThunderCrack();
      }
      setTimeout(() => setThunderFlash(false), 100);
    }, interval);

    return () => {
      if (thunderIntervalRef.current) clearInterval(thunderIntervalRef.current);
    };
  }, [phase, winTier]);

  // Animated count-up
  useEffect(() => {
    if (phase !== 'counting') return;

    const duration = Math.min(2500, Math.max(1000, totalWin * 2));
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedWin(Math.round(totalWin * eased));

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayedWin(totalWin);
        // Final thunder hit
        slotSounds.playMultiplierSlam();
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
      phase === 'storm-peak' ? "opacity-100" : "opacity-100"
    )}>
      {/* Storm peak flash */}
      {phase === 'storm-peak' && (
        <div className="absolute inset-0 bg-white/50 animate-pulse z-20" />
      )}

      {/* Thunder flashes during count */}
      {thunderFlash && (
        <div className="absolute inset-0 bg-white/30 z-20" />
      )}


      {/* Camera shake for large wins during count */}
      <div className={cn(
        "relative z-10 flex flex-col items-center gap-4 px-6 py-5 rounded-2xl backdrop-blur-md border border-white/10",
        phase === 'counting' && (winTier === 'large' || winTier === 'very-large') && "gates-shake"
      )} style={{ background: "rgba(0,0,0,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)", maxWidth: "340px" }}>
        {/* Title */}
        <div className={cn(
          "text-3xl font-black tracking-widest uppercase",
          "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400",
          "bg-clip-text text-transparent",
          "drop-shadow-[0_0_30px_rgba(234,179,8,0.6)]",
          "transition-opacity duration-500",
          (phase === 'fade-in' || phase === 'counting' || phase === 'hold') ? "opacity-100" : "opacity-0"
        )}>
          Bonus Færdig!
        </div>

        {/* Decorative line */}
        <div className={cn(
          "w-48 h-px bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent transition-opacity duration-500",
          (phase === 'fade-in' || phase === 'counting' || phase === 'hold') ? "opacity-100" : "opacity-0"
        )} />

        {/* Win amount */}
        <div className={cn(
          "flex flex-col items-center gap-1 transition-opacity duration-500",
          (phase === 'counting' || phase === 'hold') ? "opacity-100" : "opacity-0"
        )}>
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
        <div className={cn(
          "flex items-center gap-8 mt-2 transition-opacity duration-500",
          (phase === 'counting' || phase === 'hold') ? "opacity-100" : "opacity-0"
        )}>
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
