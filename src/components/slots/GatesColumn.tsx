import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GATES_ROWS } from "@/lib/gatesGameLogic";
import { isMultiplierSymbol, getMultiplierImageUrl, getMultiplierSymbolInfo } from "@/lib/gatesMultiplierSymbols";
import type { SlotSymbol } from "@/lib/slotGameLogic";

const SYMBOL_SIZE = 100;
const CYCLE_INTERVAL = 70;

export type ColumnSpinState = 'idle' | 'spinning' | 'landing' | 'landed';

/** Per-cell animation state for tumble visuals */
export type CellAnimState = 'idle' | 'winning' | 'removing' | 'dropping' | 'filling' | 'collecting';

interface GatesColumnProps {
  col: number;
  spinState: ColumnSpinState;
  symbols: SlotSymbol[];
  symbolsById: Map<string, SlotSymbol>;
  finalSymbolIds: string[];
  winningPositions: Set<number>;
  /** Per-cell animation states (flat-indexed) */
  cellAnimStates: Map<number, CellAnimState>;
  /** Per-cell gravity drop offset in pixels (flat-indexed) */
  cellDropOffsets: Map<number, number>;
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
  cellDropOffsets,
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
        tumblePhase !== 'idle' && tumblePhase !== 'spinning' ? "overflow-visible" : "overflow-hidden",
      )}
      style={{ gap: 4 }}
    >
      {Array.from({ length: GATES_ROWS }).map((_, row) => {
        const symbolId = displayIds[row];
        const isMult = symbolId ? isMultiplierSymbol(symbolId) : false;
        const symbol = !isMult && symbolId ? symbolsById.get(symbolId) : null;
        const multInfo = isMult && symbolId ? getMultiplierSymbolInfo(symbolId) : null;
        const multImageUrl = isMult && symbolId ? getMultiplierImageUrl(symbolId) : null;
        const flatIndex = col * GATES_ROWS + row;
        const isWinning = winningPositions.has(flatIndex);
        const cellAnim = cellAnimStates.get(flatIndex) || 'idle';

        return (
          <div
            key={row}
            className={cn(
              "relative rounded-lg",
              (cellAnim === 'dropping' || cellAnim === 'filling') ? "overflow-visible" : "overflow-hidden",
              "bg-blue-950/50 border border-blue-500/10",
              isWinning && "gates-win-highlight",
              isLanding && "gates-symbol-land",
              cellAnim === 'winning' && "gates-win-highlight",
              cellAnim === 'removing' && "gates-tumble-remove",
              cellAnim === 'collecting' && "gates-multiplier-fly-to-bank",
              cellAnim === 'dropping' && "gates-tumble-gravity",
              cellAnim === 'filling' && "gates-tumble-drop",
            )}
            style={{
              width: SYMBOL_SIZE,
              height: SYMBOL_SIZE,
              '--gravity-offset': cellAnim === 'dropping' ? `${-(cellDropOffsets.get(flatIndex) || 104)}px` : undefined,
              animationDelay: isLanding ? `${row * 50}ms` : 
                cellAnim === 'dropping' ? `${row * 40}ms` :
                cellAnim === 'filling' ? `${row * 40}ms` : undefined,
            } as React.CSSProperties}
          >
            {/* Regular symbol rendering */}
            {cellAnim !== 'removing' && symbol && !isMult && (
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
            
            {/* Multiplier symbol rendering - first-class grid citizen */}
            {cellAnim !== 'removing' && cellAnim !== 'collecting' && isMult && multImageUrl && (
              <div className="w-full h-full flex items-center justify-center gates-multiplier-pulse">
                <img
                  src={multImageUrl}
                  alt={multInfo?.label || 'Multiplier'}
                  className="w-[90%] h-[90%] object-contain"
                  draggable={false}
                />
              </div>
            )}

            {/* Multiplier fly-to-bank collection animation */}
            {cellAnim === 'collecting' && isMult && multImageUrl && (
              <div className="w-full h-full flex items-center justify-center gates-multiplier-fly-to-bank">
                <img
                  src={multImageUrl}
                  alt={multInfo?.label || 'Multiplier'}
                  className="w-[90%] h-[90%] object-contain"
                  draggable={false}
                />
              </div>
            )}

            {/* Removal animation for regular symbols */}
            {cellAnim === 'removing' && symbol && !isMult && (
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

            {/* Removal animation for multiplier symbols (collected) */}
            {cellAnim === 'removing' && isMult && multImageUrl && (
              <div className="w-full h-full flex items-center justify-center gates-tumble-remove">
                <img
                  src={multImageUrl}
                  alt={multInfo?.label || 'Multiplier'}
                  className="w-[90%] h-[90%] object-contain"
                  draggable={false}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});
