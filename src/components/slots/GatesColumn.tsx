import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GATES_ROWS } from "@/lib/gatesGameLogic";
import type { SlotSymbol } from "@/lib/slotGameLogic";

const SYMBOL_SIZE = 100;
const CYCLE_INTERVAL = 70;

export type ColumnSpinState = 'idle' | 'spinning' | 'landing' | 'landed';

/** Per-cell animation state for tumble visuals */
export type CellAnimState = 'idle' | 'winning' | 'removing' | 'dropping' | 'filling';

interface GatesColumnProps {
  col: number;
  spinState: ColumnSpinState;
  symbols: SlotSymbol[];
  symbolsById: Map<string, SlotSymbol>;
  finalSymbolIds: string[];
  winningPositions: Set<number>;
  /** Per-cell animation states (flat-indexed) */
  cellAnimStates: Map<number, CellAnimState>;
  multiplierOrbAt: (flatIndex: number) => { value: number } | undefined;
  tumblePhase: string;
}

export const GatesColumn = React.memo(function GatesColumn({
  col,
  spinState,
  symbols,
  symbolsById,
  finalSymbolIds,
  winningPositions,
  cellAnimStates,
  multiplierOrbAt,
  tumblePhase,
}: GatesColumnProps) {
  const [cyclingIds, setCyclingIds] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pickRandom = useCallback(() => {
    if (!symbols.length) return [];
    const ids: string[] = [];
    for (let r = 0; r < GATES_ROWS; r++) {
      ids.push(symbols[Math.floor(Math.random() * symbols.length)].id);
    }
    return ids;
  }, [symbols]);

  useEffect(() => {
    if (spinState === 'spinning') {
      setCyclingIds(pickRandom());
      intervalRef.current = setInterval(() => {
        setCyclingIds(pickRandom());
      }, CYCLE_INTERVAL);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [spinState, pickRandom]);

  const isSpinning = spinState === 'spinning';
  const isLanding = spinState === 'landing';
  const displayIds = isSpinning ? cyclingIds : finalSymbolIds;

  return (
    <div
      className={cn(
        "flex flex-col transition-[filter] duration-200",
        isSpinning && "gates-column-spinning",
        isLanding && "gates-column-landing",
      )}
      style={{ gap: 4 }}
    >
      {Array.from({ length: GATES_ROWS }).map((_, row) => {
        const symbolId = displayIds[row];
        const symbol = symbolId ? symbolsById.get(symbolId) : null;
        const flatIndex = col * GATES_ROWS + row;
        const isWinning = winningPositions.has(flatIndex);
        const cellAnim = cellAnimStates.get(flatIndex) || 'idle';
        const orb = multiplierOrbAt(flatIndex);

        return (
          <div
            key={row}
            className={cn(
              "relative rounded-lg overflow-hidden",
              "bg-blue-950/50 border border-blue-500/10",
              isWinning && "gates-win-highlight",
              isLanding && "gates-symbol-land",
              cellAnim === 'winning' && "gates-win-highlight",
              cellAnim === 'removing' && "gates-tumble-remove",
              cellAnim === 'dropping' && "gates-tumble-drop",
              cellAnim === 'filling' && "gates-tumble-drop",
            )}
            style={{
              width: SYMBOL_SIZE,
              height: SYMBOL_SIZE,
              animationDelay: isLanding ? `${row * 50}ms` : 
                cellAnim === 'dropping' ? `${row * 40}ms` :
                cellAnim === 'filling' ? `${row * 40}ms` : undefined,
            }}
          >
            {/* Hide symbol during removal animation end */}
            {cellAnim !== 'removing' && symbol && (
              <div className="w-full h-full flex items-center justify-center">
                {symbol.image_url ? (
                  <img
                    src={symbol.image_url}
                    alt={symbol.name}
                    className="w-[85%] h-[85%] object-contain"
                    draggable={false}
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-200">{symbol.name.charAt(0)}</span>
                )}
              </div>
            )}
            {/* Show symbol during removal with pop animation */}
            {cellAnim === 'removing' && symbol && (
              <div className="w-full h-full flex items-center justify-center gates-tumble-remove">
                {symbol.image_url ? (
                  <img
                    src={symbol.image_url}
                    alt={symbol.name}
                    className="w-[85%] h-[85%] object-contain"
                    draggable={false}
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-200">{symbol.name.charAt(0)}</span>
                )}
              </div>
            )}

            {orb && (
              <div className="absolute inset-0 flex items-center justify-center z-10 gates-multiplier-pulse">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-yellow-400/80 shadow-lg">
                  <span className="text-sm font-black text-yellow-200">{orb.value}x</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});
