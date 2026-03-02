import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type BonusEntryPhase = 'freeze' | 'candy-burst' | 'fadeout' | 'candy-land' | 'spins-reveal' | 'done';

interface BonanzaBonusEntrySequenceProps {
  isActive: boolean;
  freeSpinsAwarded: number;
  onComplete: () => void;
}

export function BonanzaBonusEntrySequence({ isActive, freeSpinsAwarded, onComplete }: BonanzaBonusEntrySequenceProps) {
  const [phase, setPhase] = useState<BonusEntryPhase>('freeze');
  const [spinsCountUp, setSpinsCountUp] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase('freeze');
      setSpinsCountUp(0);
      return;
    }

    setPhase('freeze');
    const t0 = setTimeout(() => setPhase('candy-burst'), 200);
    const t1 = setTimeout(() => setPhase('fadeout'), 500);
    const t2 = setTimeout(() => setPhase('candy-land'), 1100);
    const t3 = setTimeout(() => setPhase('spins-reveal'), 1700);
    const t4 = setTimeout(() => { setPhase('done'); onComplete(); }, 4500);

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isActive, onComplete]);

  useEffect(() => {
    if (phase !== 'spins-reveal') return;
    setSpinsCountUp(0);
    let current = 0;
    const step = Math.max(1, Math.floor(freeSpinsAwarded / 15));
    const interval = setInterval(() => {
      current += step;
      if (current >= freeSpinsAwarded) { current = freeSpinsAwarded; clearInterval(interval); }
      setSpinsCountUp(current);
    }, 80);
    return () => clearInterval(interval);
  }, [phase, freeSpinsAwarded]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Phase 0: Freeze — pink flash */}
      <div className={cn(
        "absolute inset-0 z-5 bg-pink-300/30 transition-opacity duration-100",
        phase === 'freeze' ? "opacity-100" : "opacity-0"
      )} />

      {/* Phase 1: Candy burst flash */}
      <div className={cn(
        "absolute inset-0 z-10 transition-opacity duration-200",
        phase === 'candy-burst' ? "opacity-100" : "opacity-0"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/70 via-fuchsia-400/60 to-purple-400/70 animate-pulse" />
        {/* Candy sparkle bursts */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-yellow-300 animate-ping" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-pink-300 animate-ping" style={{ animationDelay: '100ms' }} />
        <div className="absolute bottom-1/3 left-1/2 w-5 h-5 rounded-full bg-fuchsia-300 animate-ping" style={{ animationDelay: '200ms' }} />
      </div>

      {/* Phase 2: Fade out */}
      <div className={cn(
        "absolute inset-0 z-20 bg-black transition-opacity duration-800",
        phase === 'freeze' || phase === 'candy-burst' ? "opacity-0" :
        phase === 'fadeout' ? "opacity-90" : "opacity-0"
      )} />

      {/* Phase 3: Candy landscape */}
      <div className={cn(
        "absolute inset-0 z-30 transition-opacity duration-1000",
        (phase === 'candy-land' || phase === 'spins-reveal' || phase === 'done') ? "opacity-100" : "opacity-0"
      )}>
        <div className="absolute inset-0 bg-gradient-to-b from-pink-950 via-fuchsia-950 to-purple-950" />
        {/* Candy clouds */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[140%] h-48 bg-gradient-to-r from-pink-800/40 via-fuchsia-700/30 to-pink-800/40 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-10 -left-10 w-[120%] h-32 bg-gradient-to-r from-purple-800/30 via-pink-700/20 to-purple-800/30 animate-pulse" style={{ animationDuration: '12s' }} />
        </div>
        {/* Candy glow at center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
      </div>

      {/* Phase 4: Content */}
      <div className={cn(
        "absolute inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-500",
        (phase === 'spins-reveal' || phase === 'done') ? "opacity-100" : "opacity-0"
      )}>
        {/* Lollipop icon */}
        <div className="text-8xl mb-4 animate-bounce">🍭</div>

        {/* FREE SPINS title */}
        <h2 className="text-4xl sm:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-200 to-pink-300 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
          FREE SPINS
        </h2>

        {/* Spins count */}
        <div className="mt-6">
          <div className="text-7xl sm:text-9xl font-black text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]">
            {spinsCountUp}
          </div>
        </div>

        {/* Subtitle */}
        <div className={cn(
          "mt-4 text-lg sm:text-xl text-pink-200/90 font-medium transition-opacity duration-500",
          phase === 'spins-reveal' ? "opacity-100" : "opacity-0"
        )}>
          Multiplier bomber aktive! 💣
        </div>
      </div>
    </div>
  );
}
