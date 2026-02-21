import React from "react";
import { cn } from "@/lib/utils";
import { GATES_ROWS } from "@/lib/gatesGameLogic";
import { isMultiplierSymbol, getMultiplierImageUrl, getMultiplierSymbolInfo } from "@/lib/gatesMultiplierSymbols";
import type { SlotSymbol } from "@/lib/slotGameLogic";

const SYMBOL_WIDTH = 140;
const SYMBOL_HEIGHT = 108;

export type ColumnSpinState = 'idle' | 'spinning' | 'landing' | 'landed' | 'dropping-off' | 'dropping-in';

/** Per-cell animation state for tumble visuals */
export type CellAnimState = 'idle' | 'winning' | 'removing' | 'exploding' | 'dropping' | 'filling' | 'collecting' | 'scatter-pulse';

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
  /** Incremented each tumble step to force CSS animation restarts */
  animationEpoch?: number;
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
  animationEpoch = 0,
}: GatesColumnProps) {
  const isDroppingOff = spinState === 'dropping-off';
  const isDroppingIn = spinState === 'dropping-in';
  const isLanding = spinState === 'landing';

  return (
    <div
      className={cn(
        "flex flex-col transition-[filter] duration-200",
        (isDroppingOff || isDroppingIn) ? "overflow-visible" :
        (tumblePhase !== 'idle' && tumblePhase !== 'spinning') ? "overflow-visible" : "overflow-hidden",
      )}
      style={{ gap: 5 }}
    >
      {Array.from({ length: GATES_ROWS }).map((_, row) => {
        const symbolId = finalSymbolIds[row];
        const isMult = symbolId ? isMultiplierSymbol(symbolId) : false;
        const symbol = !isMult && symbolId ? symbolsById.get(symbolId) : null;
        const multInfo = isMult && symbolId ? getMultiplierSymbolInfo(symbolId) : null;
        const multImageUrl = isMult && symbolId ? getMultiplierImageUrl(symbolId) : null;
        const flatIndex = col * GATES_ROWS + row;
        const isWinning = winningPositions.has(flatIndex);
        const cellAnim = cellAnimStates.get(flatIndex) || 'idle';

        // Only apply drop-off/drop-in when there's no tumble cell animation active
        const applyDropOff = isDroppingOff && cellAnim === 'idle';
        const applyDropIn = isDroppingIn && cellAnim === 'idle';

        return (
          <div
            key={`${row}-${(cellAnim === 'dropping' || cellAnim === 'filling') ? animationEpoch : 'stable'}-${cellAnim}-${applyDropOff ? 'off' : applyDropIn ? 'in' : ''}`}
            className={cn(
              "relative rounded-lg",
              (cellAnim === 'dropping' || cellAnim === 'filling' || cellAnim === 'exploding' || applyDropOff || applyDropIn) ? "overflow-visible" : "overflow-hidden",
              "bg-blue-950/50 border border-blue-500/10",
              isWinning && "gates-win-highlight",
              isLanding && "gates-symbol-land",
              applyDropOff && "gates-drop-off",
              applyDropIn && "gates-drop-in",
              cellAnim === 'winning' && "gates-gold-highlight",
              cellAnim === 'removing' && "gates-tumble-remove",
              cellAnim === 'exploding' && "gates-symbol-explode",
              cellAnim === 'collecting' && "gates-multiplier-fly-to-bank",
              cellAnim === 'dropping' && "gates-gravity-bounce",
              cellAnim === 'filling' && "gates-lightning-fill",
              cellAnim === 'scatter-pulse' && "gates-scatter-trigger-pulse",
            )}
            style={{
              width: SYMBOL_WIDTH,
              height: SYMBOL_HEIGHT,
              '--gravity-offset': cellAnim === 'dropping' ? `${-(cellDropOffsets.get(flatIndex) || (SYMBOL_HEIGHT + 4))}px` : undefined,
              animationDelay: applyDropOff ? `${row * 40}ms` :
                applyDropIn ? `${row * 50}ms` :
                isLanding ? `${row * 50}ms` : 
                cellAnim === 'filling' ? `${row * 40}ms` :
                cellAnim === 'dropping' ? `${row * 30}ms` : undefined,
            } as React.CSSProperties}
          >
            {/* Regular symbol rendering */}
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && symbol && !isMult && (
              <div className="w-full h-full flex items-center justify-center">
                {symbol.image_url ? (
                  <img
                    src={symbol.image_url}
                    alt={symbol.name}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-200">{symbol.name.charAt(0)}</span>
                )}
              </div>
            )}
            
            {/* Multiplier symbol rendering - first-class grid citizen */}
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && cellAnim !== 'collecting' && isMult && multImageUrl && (
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

            {/* Removal/explosion animation for regular symbols */}
            {(cellAnim === 'removing' || cellAnim === 'exploding') && symbol && !isMult && (
              <div className={cn("w-full h-full flex items-center justify-center", cellAnim === 'exploding' ? "gates-symbol-explode" : "gates-tumble-remove")}>
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

            {/* Removal/explosion animation for multiplier symbols */}
            {(cellAnim === 'removing' || cellAnim === 'exploding') && isMult && multImageUrl && (
              <div className={cn("w-full h-full flex items-center justify-center", cellAnim === 'exploding' ? "gates-symbol-explode" : "gates-tumble-remove")}>
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
