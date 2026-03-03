import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { slotSounds } from "@/lib/slotSoundEffects";

interface BonanzaBonusEndOverlayProps {
  isActive: boolean;
  totalWin: number;
  totalMultiplier: number;
  totalSpins: number;
  onComplete: () => void;
}

type EndPhase = 'flash' | 'calm' | 'fade-in' | 'counting' | 'hold' | 'done';

export function BonanzaBonusEndOverlay({
  isActive, totalWin, totalMultiplier, totalSpins, onComplete,
}: BonanzaBonusEndOverlayProps) {
  const [phase, setPhase] = useState<EndPhase>('flash');
  const [displayedWin, setDisplayedWin] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  const winTier = totalWin >= 5000 ? 'very-large' : totalWin >= 1000 ? 'large' : totalWin >= 200 ? 'medium' : 'small';

  useEffect(() => {
    if (!isActive) { setPhase('flash'); setDisplayedWin(0); return; }
    setPhase('flash');
    const t0 = setTimeout(() => setPhase('calm'), 600);
    const t1 = setTimeout(() => setPhase('fade-in'), 1400);
    const t2 = setTimeout(() => {
      setPhase('counting');
      if (winTier !== 'small') slotSounds.playBonusWinSwell();
    }, 2000);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [isActive, winTier]);

  useEffect(() => {
    if (phase !== 'counting') return;
    const duration = Math.min(2500, Math.max(1000, totalWin * 2));
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedWin(Math.round(totalWin * eased));
      if (progress < 1) { animFrameRef.current = requestAnimationFrame(tick); }
      else { setDisplayedWin(totalWin); slotSounds.playMultiplierSlam(); setTimeout(() => setPhase('hold'), 300); }
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [phase, totalWin]);

  useEffect(() => {
    if (phase !== 'hold') return;
    const t = setTimeout(() => { setPhase('done'); onComplete(); }, 3000);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {phase === 'flash' && <div className="absolute inset-0 bg-pink-300/50 animate-pulse z-20" />}

      <div className={cn(
        "absolute inset-0 transition-all duration-1000",
        phase === 'flash' ? "bg-pink-950/90 backdrop-blur-sm" :
        phase === 'calm' ? "bg-black/80 backdrop-blur-sm" : "bg-black/85 backdrop-blur-sm"
      )} />

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-5 rounded-2xl backdrop-blur-md border border-white/10"
        style={{ background: "rgba(0,0,0,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)", maxWidth: "340px" }}>
        <div className={cn(
          "text-3xl font-black tracking-widest uppercase",
          "bg-gradient-to-r from-pink-300 via-yellow-200 to-pink-300",
          "bg-clip-text text-transparent",
          "drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]",
          "transition-opacity duration-500",
          (phase === 'fade-in' || phase === 'counting' || phase === 'hold') ? "opacity-100" : "opacity-0"
        )}>
          Bonus Færdig!
        </div>

        <div className={cn(
          "w-48 h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent transition-opacity duration-500",
          (phase === 'fade-in' || phase === 'counting' || phase === 'hold') ? "opacity-100" : "opacity-0"
        )} />

        <div className={cn(
          "flex flex-col items-center gap-1 transition-opacity duration-500",
          (phase === 'counting' || phase === 'hold') ? "opacity-100" : "opacity-0"
        )}>
          <div className="text-lg font-medium text-pink-300/70 uppercase tracking-wider">Total Gevinst</div>
          <div className={cn(
            "text-6xl font-black tabular-nums",
            "bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-500",
            "bg-clip-text text-transparent",
            "drop-shadow-[0_0_40px_rgba(250,204,21,0.5)]",
            phase === 'hold' && "animate-pulse"
          )}>
            {displayedWin.toLocaleString()}
          </div>
          <div className="text-xl font-bold text-yellow-500/80">POINT</div>
        </div>

        <div className={cn(
          "flex items-center gap-8 mt-2 transition-opacity duration-500",
          (phase === 'counting' || phase === 'hold') ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex flex-col items-center">
            <span className="text-sm text-pink-400/60 uppercase tracking-wider">Free Spins</span>
            <span className="text-2xl font-bold text-pink-200">{totalSpins}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
