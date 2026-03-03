import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BonanzaRetriggerOverlayProps {
  isActive: boolean;
  spinsAwarded: number;
  onComplete: () => void;
}

type RetriggerPhase = 'flash' | 'fade-in' | 'hold' | 'done';

export function BonanzaRetriggerOverlay({ isActive, spinsAwarded, onComplete }: BonanzaRetriggerOverlayProps) {
  const [phase, setPhase] = useState<RetriggerPhase>('flash');

  useEffect(() => {
    if (!isActive) { setPhase('flash'); return; }
    setPhase('flash');
    const t1 = setTimeout(() => setPhase('fade-in'), 400);
    const t2 = setTimeout(() => setPhase('hold'), 1000);
    const t3 = setTimeout(() => { setPhase('done'); onComplete(); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const showContent = phase === 'fade-in' || phase === 'hold';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {phase === 'flash' && (
        <div className="absolute inset-0 bg-pink-300/40 animate-pulse" />
      )}

      <div className={cn(
        "absolute inset-0 bg-black/70 transition-opacity duration-300",
        phase === 'flash' ? "opacity-0" : "opacity-100"
      )} />

      {showContent && (
        <div
          className="relative z-10 flex flex-col items-center gap-3 px-8 py-5 rounded-2xl backdrop-blur-md border border-white/10 animate-fade-in"
          style={{
            background: "rgba(0,0,0,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            maxWidth: "340px",
          }}
        >
          <div className="text-5xl animate-bounce mb-1">🍭</div>

          <div className={cn(
            "text-3xl font-black tracking-widest uppercase",
            "bg-gradient-to-r from-pink-300 via-yellow-200 to-pink-300",
            "bg-clip-text text-transparent",
            "drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]"
          )}>
            Retrigger!
          </div>

          <div className={cn(
            "w-48 h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent"
          )} />

          <div className={cn(
            "text-5xl font-black tabular-nums",
            "bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-500",
            "bg-clip-text text-transparent",
            "drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]",
            phase === 'hold' && "animate-pulse"
          )}>
            +{spinsAwarded}
          </div>

          <div className="text-base font-bold text-pink-300/80 uppercase tracking-wider">
            Free Spins
          </div>
        </div>
      )}
    </div>
  );
}
