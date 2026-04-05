import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GatesBonusSpinWinRevealProps {
  tumbleWin: number;
  multiplier: number;
  visible: boolean;
}

/**
 * Center-grid overlay that reveals the bonus spin total:
 * 1. Tumble win scales in from center
 * 2. Multiplier flies in from the total-multiplier orb
 * 3. They merge with a flash → show final multiplied win
 */
export function GatesBonusSpinWinReveal({
  tumbleWin,
  multiplier,
  visible,
}: GatesBonusSpinWinRevealProps) {
  const [phase, setPhase] = useState<"idle" | "tumble-in" | "mult-fly" | "merge" | "result">("idle");

  useEffect(() => {
    if (!visible) {
      setPhase("idle");
      return;
    }
    // Phase 1: tumble win scales in
    setPhase("tumble-in");
    const t1 = setTimeout(() => setPhase("mult-fly"), 600);
    const t2 = setTimeout(() => setPhase("merge"), 1100);
    const t3 = setTimeout(() => setPhase("result"), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible]);

  if (!visible || phase === "idle") return null;

  const finalWin = tumbleWin * Math.max(1, multiplier);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Backdrop glow */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-300",
        phase !== "idle" ? "opacity-100" : "opacity-0"
      )} style={{
        background: "radial-gradient(ellipse at center, rgba(147,51,234,0.25) 0%, transparent 70%)"
      }} />

      {/* Tumble win amount */}
      {(phase === "tumble-in" || phase === "mult-fly") && (
        <div className="gates-reveal-tumble-in flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-pink-300/90">
            Tumble Gevinst
          </span>
          <span className="text-4xl md:text-5xl font-black text-white tabular-nums drop-shadow-[0_0_20px_rgba(236,72,153,0.7)] [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
            {tumbleWin.toFixed(2)}
          </span>
        </div>
      )}

      {/* Multiplier flying in */}
      {phase === "mult-fly" && (
        <div className="gates-reveal-mult-fly absolute">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-yellow-300/90">
              Multiplikator
            </span>
            <span className="text-4xl md:text-5xl font-black text-yellow-300 tabular-nums drop-shadow-[0_0_20px_rgba(250,204,21,0.7)] [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
              x{multiplier}
            </span>
          </div>
        </div>
      )}

      {/* Merge flash + result */}
      {(phase === "merge" || phase === "result") && (
        <div className="gates-reveal-merge flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-200/90 mb-1">
            Spin Gevinst
          </span>
          <span className="text-5xl md:text-6xl font-black tabular-nums drop-shadow-[0_0_24px_rgba(250,204,21,0.8)] [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]"
            style={{
              background: "linear-gradient(135deg, #fde68a, #f59e0b, #fde68a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {finalWin.toFixed(2)}
          </span>
          <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
            <span>{tumbleWin.toFixed(2)}</span>
            <span>×</span>
            <span className="text-yellow-300/80">{multiplier}x</span>
          </div>
        </div>
      )}
    </div>
  );
}
