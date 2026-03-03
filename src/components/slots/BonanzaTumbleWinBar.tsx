import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export type CollisionPhase = 'idle' | 'colliding' | 'resolved';

interface BonanzaTumbleWinBarProps {
  runningWin: number;
  runningMultiplier: number;
  collisionPhase: CollisionPhase;
  visible: boolean;
}

export function BonanzaTumbleWinBar({
  runningWin,
  runningMultiplier,
  collisionPhase,
  visible,
}: BonanzaTumbleWinBarProps) {
  const [showResult, setShowResult] = useState(false);
  const [multPop, setMultPop] = useState(false);
  const prevMultRef = useRef(runningMultiplier);

  useEffect(() => {
    if (collisionPhase === 'colliding') {
      setShowResult(false);
      const t = setTimeout(() => setShowResult(true), 600);
      return () => clearTimeout(t);
    }
    if (collisionPhase === 'idle') setShowResult(false);
  }, [collisionPhase]);

  // Pop animation when multiplier changes
  useEffect(() => {
    if (runningMultiplier !== prevMultRef.current && runningMultiplier > 0) {
      setMultPop(true);
      const t = setTimeout(() => setMultPop(false), 400);
      prevMultRef.current = runningMultiplier;
      return () => clearTimeout(t);
    }
    prevMultRef.current = runningMultiplier;
  }, [runningMultiplier]);

  if (!visible) return null;

  const finalWin = runningWin * Math.max(1, runningMultiplier);

  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 pointer-events-none bonanza-tumble-bar-in">
      <div
        className={cn(
          "flex items-center gap-4 px-10 py-3 rounded-full",
          "bg-gradient-to-r from-fuchsia-700/90 via-pink-600/90 to-fuchsia-700/90",
          "border-2 border-pink-400/60",
          "shadow-[0_0_20px_rgba(236,72,153,0.5),0_4px_16px_rgba(0,0,0,0.4)]",
          "min-w-[280px] justify-center"
        )}
      >
        {collisionPhase === 'resolved' || showResult ? (
          <div className="bonanza-collide-flash flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest text-pink-200/80 font-bold">Tumble Win</span>
            <span className="text-3xl font-black text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] tabular-nums">
              {finalWin.toFixed(2)}
            </span>
          </div>
        ) : (
          <>
            <div className={cn(
              "flex flex-col items-center",
              collisionPhase === 'colliding' && "bonanza-collide-left"
            )}>
              <span className="text-[10px] uppercase tracking-widest text-pink-200/80 font-bold">Tumble Win</span>
              <span className="text-2xl font-black text-white tabular-nums drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                {runningWin.toFixed(2)}
              </span>
            </div>
            <div
              id="bonanza-mult-target"
              className={cn(
                "flex flex-col items-center",
                collisionPhase === 'colliding' && "bonanza-collide-right",
                multPop && "bonanza-mult-pop"
              )}
            >
              <span className="text-[10px] uppercase tracking-widest text-yellow-200/80 font-bold">Multi</span>
              <span className="text-2xl font-black text-yellow-300 tabular-nums drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">
                x{runningMultiplier}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
