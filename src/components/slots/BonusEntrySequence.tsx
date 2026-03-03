import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type BonusEntryPhase = 'freeze' | 'lightning' | 'fadeout' | 'temple' | 'spins-reveal' | 'done';

interface BonusEntrySequenceProps {
  isActive: boolean;
  freeSpinsAwarded: number;
  onComplete: () => void;
}

export function BonusEntrySequence({ isActive, freeSpinsAwarded, onComplete }: BonusEntrySequenceProps) {
  const [phase, setPhase] = useState<BonusEntryPhase>('freeze');
  const [spinsCountUp, setSpinsCountUp] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase('freeze');
      setSpinsCountUp(0);
      return;
    }

    // Phase 0: Freeze (0-200ms) — grid freeze visual
    setPhase('freeze');

    const t0 = setTimeout(() => {
      // Phase 1: Lightning strike (200-500ms)
      setPhase('lightning');
    }, 200);

    const t1 = setTimeout(() => {
      // Phase 2: Fade out base background (500-1100ms)
      setPhase('fadeout');
    }, 500);

    const t2 = setTimeout(() => {
      // Phase 3: Storm Temple background appears (1100-1700ms)
      setPhase('temple');
    }, 1100);

    const t3 = setTimeout(() => {
      // Phase 4: Free spins count-up reveal (1700-3700ms)
      setPhase('spins-reveal');
    }, 1700);

    const t4 = setTimeout(() => {
      // Sequence complete
      setPhase('done');
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, onComplete]);

  // Count-up animation for spins
  useEffect(() => {
    if (phase !== 'spins-reveal') return;
    setSpinsCountUp(0);
    let current = 0;
    const step = Math.max(1, Math.floor(freeSpinsAwarded / 15));
    const interval = setInterval(() => {
      current += step;
      if (current >= freeSpinsAwarded) {
        current = freeSpinsAwarded;
        clearInterval(interval);
      }
      setSpinsCountUp(current);
    }, 80);
    return () => clearInterval(interval);
  }, [phase, freeSpinsAwarded]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Phase 0: Freeze overlay — brief white flash */}
      <div className={cn(
        "absolute inset-0 z-5 bg-white/20 transition-opacity duration-100",
        phase === 'freeze' ? "opacity-100" : "opacity-0"
      )} />

      {/* Lightning strikes - Phase 1 */}
      <div className={cn(
        "absolute inset-0 z-10 transition-opacity duration-200",
        phase === 'lightning' ? "opacity-100" : "opacity-0"
      )}>
        {/* Strong white flash */}
        <div className="absolute inset-0 bg-white/60 animate-pulse" />
        {/* Multiple lightning bolts */}
        <div className="absolute inset-0 bonus-lightning-flash" />
        <div className="absolute top-0 left-1/4 w-1 h-full bonus-lightning-bolt" style={{ animationDelay: '0ms' }} />
        <div className="absolute top-0 left-1/2 w-1 h-full bonus-lightning-bolt" style={{ animationDelay: '100ms' }} />
        <div className="absolute top-0 left-3/4 w-1 h-full bonus-lightning-bolt" style={{ animationDelay: '200ms' }} />
      </div>

      {/* Base background fade-out overlay - Phase 2 */}
      <div className={cn(
        "absolute inset-0 z-20 bg-black transition-opacity duration-800",
        phase === 'freeze' || phase === 'lightning' ? "opacity-0" :
        phase === 'fadeout' ? "opacity-90" : "opacity-0"
      )} />

      {/* Storm Temple background - Phase 3+ */}
      <div className={cn(
        "absolute inset-0 z-30 transition-opacity duration-1000",
        (phase === 'temple' || phase === 'spins-reveal' || phase === 'done') ? "opacity-100" : "opacity-0"
      )}>
        {/* Storm temple environment — darker purple for bonus */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950" />
        
        {/* Animated storm clouds */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[140%] h-48 bg-gradient-to-r from-purple-900/60 via-indigo-800/40 to-purple-900/60 bonus-storm-cloud" />
          <div className="absolute top-10 -left-10 w-[120%] h-32 bg-gradient-to-r from-slate-800/50 via-purple-700/30 to-slate-800/50 bonus-storm-cloud" style={{ animationDelay: '-3s', animationDuration: '12s' }} />
        </div>

        {/* Lightning ambient flashes */}
        <div className="absolute inset-0 bonus-ambient-lightning" />

        {/* Temple pillars */}
        <div className="absolute bottom-0 left-[10%] w-16 h-[60%] bg-gradient-to-t from-slate-700/40 via-slate-600/20 to-transparent rounded-t-lg" />
        <div className="absolute bottom-0 right-[10%] w-16 h-[60%] bg-gradient-to-t from-slate-700/40 via-slate-600/20 to-transparent rounded-t-lg" />
        <div className="absolute bottom-0 left-[25%] w-12 h-[45%] bg-gradient-to-t from-slate-700/30 via-slate-600/15 to-transparent rounded-t-lg" />
        <div className="absolute bottom-0 right-[25%] w-12 h-[45%] bg-gradient-to-t from-slate-700/30 via-slate-600/15 to-transparent rounded-t-lg" />

        {/* Purple energy glow at center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-3xl bonus-energy-pulse" />
      </div>

      {/* Content overlay - Free Spins reveal - Phase 4 */}
      <div className={cn(
        "absolute inset-0 z-40 flex items-center justify-center transition-opacity duration-500",
        (phase === 'spins-reveal' || phase === 'done') ? "opacity-100" : "opacity-0"
      )}>
        <div className="flex flex-col items-center gap-3 px-8 py-6 rounded-2xl backdrop-blur-md border border-white/10"
          style={{ background: "rgba(0,0,0,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)", maxWidth: "380px" }}>
          {/* Zeus bolt icon */}
          <div className="text-6xl bonus-zeus-entrance">⚡</div>

          {/* FREE SPINS AWARDED title */}
          <div className="bonus-title-entrance">
            <h2 className="text-3xl sm:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 bonus-text-glow">
              FREE SPINS AWARDED
            </h2>
          </div>

          {/* Spins count */}
          <div className="mt-2 bonus-count-entrance">
            <div className="text-6xl sm:text-7xl font-black text-yellow-400 bonus-spins-counter">
              {spinsCountUp}
            </div>
          </div>

          {/* Subtitle */}
          <div className={cn(
            "text-base sm:text-lg text-blue-200/90 font-medium transition-opacity duration-500",
            phase === 'spins-reveal' ? "opacity-100" : "opacity-0"
          )}>
            Alle multipliers akkumuleres!
          </div>

          {/* Multiplier bank reset indicator */}
          <div className={cn(
            "flex gap-5 text-sm text-blue-300/70 transition-opacity duration-500",
            phase === 'spins-reveal' ? "opacity-100" : "opacity-0"
          )} style={{ transitionDelay: '400ms' }}>
            <span>Multiplier Bank: <span className="text-yellow-400 font-bold">0x</span></span>
            <span>Gevinst: <span className="text-green-400 font-bold">0</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
