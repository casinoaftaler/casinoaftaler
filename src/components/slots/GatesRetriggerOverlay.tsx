import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GatesRetriggerOverlayProps {
  isActive: boolean;
  spinsAwarded: number;
  onComplete: () => void;
}

export function GatesRetriggerOverlay({ isActive, spinsAwarded, onComplete }: GatesRetriggerOverlayProps) {
  const [phase, setPhase] = useState<'lightning' | 'text' | 'done'>('lightning');

  useEffect(() => {
    if (!isActive) {
      setPhase('lightning');
      return;
    }
    setPhase('lightning');
    const t1 = setTimeout(() => setPhase('text'), 400);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Lightning flash */}
      {phase === 'lightning' && (
        <div className="absolute inset-0 bg-blue-200/40 animate-pulse" />
      )}

      {/* Dark backdrop */}
      <div className={cn(
        "absolute inset-0 bg-black/70 transition-opacity duration-300",
        phase === 'lightning' ? "opacity-0" : "opacity-100"
      )} />

      {/* Content */}
      {phase === 'text' && (
        <div className="relative z-10 text-center space-y-3 animate-fade-in">
          {/* Lightning bolt icon */}
          <div className="text-6xl animate-bounce">⚡</div>
          
          <div className={cn(
            "text-4xl font-black tracking-wider",
            "bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300",
            "bg-clip-text text-transparent",
            "drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]",
            "animate-scale-in"
          )}>
            +{spinsAwarded} FREE SPINS
          </div>
          
          <div className="text-lg text-blue-300/80 font-medium animate-fade-in">
            Retrigger!
          </div>
        </div>
      )}
    </div>
  );
}
