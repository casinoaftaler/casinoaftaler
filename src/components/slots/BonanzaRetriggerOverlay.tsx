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
    if (!isActive) { setPhase('flash'); return; }
    setPhase('flash');
    const t1 = setTimeout(() => setPhase('reveal'), 400);
    const t2 = setTimeout(() => setPhase('hold'), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isActive]);

  if (!isActive) return null;

  const showContent = phase === 'reveal' || phase === 'hold';

  return (
    <>
      {phase === 'flash' && (
        <div className="fixed inset-0 z-50 animate-pulse"
          style={{ background: 'rgba(255,182,193,0.4)' }}
        />
      )}

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
    </>
  );
}
