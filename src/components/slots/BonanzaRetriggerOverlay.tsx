import React, { useEffect, useState, useRef } from "react";
import { BonanzaOverlayCard } from "./BonanzaOverlayCard";

interface BonanzaRetriggerOverlayProps {
  isActive: boolean;
  spinsAwarded: number;
  onComplete: () => void;
}

type RetriggerPhase = 'flash' | 'reveal' | 'hold' | 'done';

export function BonanzaRetriggerOverlay({ isActive, spinsAwarded, onComplete }: BonanzaRetriggerOverlayProps) {
  const [phase, setPhase] = useState<RetriggerPhase>('flash');
  const stableComplete = useRef(onComplete);
  stableComplete.current = onComplete;

  useEffect(() => {
    if (!isActive) { setPhase('reveal'); return; }
    setPhase('reveal');
    const t2 = setTimeout(() => setPhase('hold'), 800);
    return () => { clearTimeout(t2); };
  }, [isActive]);

  if (!isActive) return null;

  const showContent = phase === 'reveal' || phase === 'hold';

  return (
    <div className="absolute inset-0 z-50">
      {/* Dark backdrop covering entire grid */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'rgba(80,20,60,0.6)' }}
      />

      <BonanzaOverlayCard
        showContent={showContent}
        onDismiss={() => stableComplete.current()}
        bubbleContent={
          <span className="relative z-10 text-5xl sm:text-6xl font-black text-white tabular-nums"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.3)' }}>
            +{spinsAwarded}
          </span>
        }
        bottomLabel="EXTRA FREE SPINS"
      />
    </div>
  );
}
