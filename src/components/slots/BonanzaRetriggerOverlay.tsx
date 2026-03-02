import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BonanzaRetriggerOverlayProps {
  isActive: boolean;
  spinsAwarded: number;
  onComplete: () => void;
}

export function BonanzaRetriggerOverlay({ isActive, spinsAwarded, onComplete }: BonanzaRetriggerOverlayProps) {
  const [phase, setPhase] = useState<'flash' | 'text' | 'done'>('flash');

  useEffect(() => {
    if (!isActive) { setPhase('flash'); return; }
    setPhase('flash');
    const t1 = setTimeout(() => setPhase('text'), 400);
    const t2 = setTimeout(() => { setPhase('done'); onComplete(); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {phase === 'flash' && (
        <div className="absolute inset-0 bg-pink-300/40 animate-pulse" />
      )}
      <div className={cn(
        "absolute inset-0 bg-black/70 transition-opacity duration-300",
        phase === 'flash' ? "opacity-0" : "opacity-100"
      )} />
      {phase === 'text' && (
        <div className="relative z-10 text-center space-y-3 animate-fade-in">
          <div className="text-6xl animate-bounce">🍭</div>
          <div className={cn(
            "text-4xl font-black tracking-wider",
            "bg-gradient-to-r from-pink-300 via-yellow-200 to-pink-300",
            "bg-clip-text text-transparent",
            "drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]"
          )}>
            +{spinsAwarded} FREE SPINS
          </div>
          <div className="text-lg text-pink-300/80 font-medium">
            Retrigger!
          </div>
        </div>
      )}
    </div>
  );
}
