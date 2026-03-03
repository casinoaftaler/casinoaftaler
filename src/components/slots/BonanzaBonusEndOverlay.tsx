import React, { useEffect, useState, useRef } from "react";
import { BonanzaOverlayCard } from "./BonanzaOverlayCard";
import { slotSounds } from "@/lib/slotSoundEffects";

interface BonanzaBonusEndOverlayProps {
  isActive: boolean;
  totalWin: number;
  totalMultiplier: number;
  totalSpins: number;
  onComplete: () => void;
}

type EndPhase = 'flash' | 'calm' | 'counting' | 'hold' | 'done';

export function BonanzaBonusEndOverlay({
  isActive, totalWin, totalMultiplier, totalSpins, onComplete,
}: BonanzaBonusEndOverlayProps) {
  const [phase, setPhase] = useState<EndPhase>('flash');
  const [displayedWin, setDisplayedWin] = useState(0);
  const animFrameRef = useRef<number | null>(null);
  const stableComplete = useRef(onComplete);
  stableComplete.current = onComplete;

  const winTier = totalWin >= 5000 ? 'very-large' : totalWin >= 1000 ? 'large' : totalWin >= 200 ? 'medium' : 'small';

  useEffect(() => {
    if (!isActive) { setPhase('calm'); setDisplayedWin(0); return; }
    setPhase('calm');
    const t1 = setTimeout(() => {
      setPhase('counting');
      if (winTier !== 'small') slotSounds.playBonusWinSwell();
    }, 800);
    return () => { clearTimeout(t1); };
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

  if (!isActive) return null;

  const showContent = phase === 'counting' || phase === 'hold';

  return (
    <div className="absolute inset-0 z-50">
      {/* Dark backdrop covering entire grid */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'rgba(80,20,60,0.7)' }}
      />

      <BonanzaOverlayCard
        showContent={showContent}
        onDismiss={() => stableComplete.current()}
        header="TOTAL GEVINST"
        subtitle=""
        bubbleContent={
          <span className="relative z-10 text-4xl sm:text-5xl font-black text-white tabular-nums"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.3)' }}>
            {displayedWin.toLocaleString()}
          </span>
        }
        bottomLabel={<>i {totalSpins} Free Spins</>}
      />
    </div>
  );
}
