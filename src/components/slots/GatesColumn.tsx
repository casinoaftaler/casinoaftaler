import React from "react";
import { cn } from "@/lib/utils";
import { GATES_ROWS } from "@/lib/gatesGameLogic";
import { isBombSymbol, getBombValue } from "@/lib/gatesGameLogic";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import type { BombSymbol } from "@/hooks/useBombSymbols";
import { useIdleShimmer } from "@/hooks/useIdleShimmer";
import { BombFractureExplosion } from "./BombFractureExplosion";
import bombExplodedDecal from "@/assets/bomb-exploded-decal.webp";

const DEFAULT_SYMBOL_WIDTH = 140;
const DEFAULT_SYMBOL_HEIGHT = 108;

export type ColumnSpinState = 'idle' | 'spinning' | 'landing' | 'landed' | 'dropping-off' | 'dropping-in';

export type CellAnimState = 'idle' | 'winning' | 'removing' | 'exploding' | 'dropping' | 'filling' | 'bomb-fizzle' | 'bomb-activate' | 'bomb-exploded' | 'scatter-pulse' | 'scatter-tease' | 'scatter-tease-intense';

interface GatesColumnProps {
  col: number;
  spinState: ColumnSpinState;
  symbols: SlotSymbol[];
  symbolsById: Map<string, SlotSymbol>;
  finalSymbolIds: string[];
  winningPositions: Set<number>;
  cellAnimStates: Map<number, CellAnimState>;
  cellDropOffsets: Map<number, number>;
  tumblePhase: string;
  animationEpoch?: number;
  bombSymbolsMap?: Map<number, BombSymbol>;
  symbolWidth?: number;
  symbolHeight?: number;
  isBonusActive?: boolean;
  isMobile?: boolean;
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
  bombSymbolsMap,
  symbolWidth: SYMBOL_WIDTH = DEFAULT_SYMBOL_WIDTH,
  symbolHeight: SYMBOL_HEIGHT = DEFAULT_SYMBOL_HEIGHT,
  isBonusActive = false,
  isMobile = false,
}: GatesColumnProps) {
  const isDroppingOff = spinState === 'dropping-off';
  const isDroppingIn = spinState === 'dropping-in';
  const isLanding = spinState === 'landing';
  const isColumnIdle = spinState === 'idle' && tumblePhase === 'idle' && !isBonusActive;
  const shimmeringCells = useIdleShimmer(GATES_ROWS, isColumnIdle);

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
        const isBomb = symbolId ? isBombSymbol(symbolId) : false;
        const symbol = !isBomb && symbolId ? symbolsById.get(symbolId) : null;
        const bombValue = isBomb && symbolId ? getBombValue(symbolId) : 0;
        const flatIndex = col * GATES_ROWS + row;
        const isWinning = winningPositions.has(flatIndex);
        const cellAnim = cellAnimStates.get(flatIndex) || 'idle';

        const applyDropOff = isDroppingOff && (cellAnim === 'idle' || cellAnim === 'bomb-exploded');
        const applyDropIn = isDroppingIn && cellAnim === 'idle';

        return (
          <div
            key={`${row}-${(cellAnim === 'dropping' || cellAnim === 'filling') ? animationEpoch : 'stable'}`}
            className={cn(
              "relative rounded-lg overflow-visible",
              "bg-transparent",
              isWinning && "gates-win-highlight",
              isLanding && "gates-column-stop-impact",
              applyDropOff && "gates-drop-off",
              applyDropIn && "gates-drop-in",
              cellAnim === 'winning' && "gates-gold-highlight",
              cellAnim === 'removing' && "gates-tumble-remove",
              cellAnim === 'exploding' && "gates-symbol-explode",
              cellAnim === 'dropping' && "gates-gravity-bounce",
              cellAnim === 'filling' && "gates-lightning-fill",
              cellAnim === 'bomb-fizzle' && "bonanza-bomb-fizzle",
              cellAnim === 'scatter-pulse' && "gates-scatter-trigger-pulse",
              cellAnim === 'scatter-tease' && "gates-scatter-tease",
              cellAnim === 'scatter-tease-intense' && "gates-scatter-tease-intense",
            )}
            style={{
              width: SYMBOL_WIDTH,
              height: SYMBOL_HEIGHT,
              '--gravity-offset': cellAnim === 'dropping' ? `${-(cellDropOffsets.get(flatIndex) || (SYMBOL_HEIGHT + 4))}px` : undefined,
              animationDelay: applyDropOff ? `${(GATES_ROWS - 1 - row) * 40}ms` :
                applyDropIn ? `${row * 50}ms` :
                isLanding ? `${row * 50}ms` :
                cellAnim === 'filling' ? `${row * 40}ms` :
                cellAnim === 'dropping' ? `${row * 30}ms` : undefined,
            } as React.CSSProperties}
          >
            {/* Regular symbol */}
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && cellAnim !== 'bomb-fizzle' && cellAnim !== 'bomb-activate' && symbol && !isBomb && (
              <div className="w-full h-full flex items-center justify-center">
                {symbol.image_url ? (
                  <img src={symbol.image_url} alt={symbol.name} className="w-full h-full object-contain" draggable={false} />
                ) : (
                  <span className="text-2xl font-bold text-blue-200">{symbol.name.charAt(0)}</span>
                )}
              </div>
            )}

            {/* Bomb symbol */}
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && cellAnim !== 'bomb-exploded' && cellAnim !== 'bomb-fizzle' && cellAnim !== 'bomb-activate' && isBomb && (
              <div className="w-full h-full flex items-center justify-center relative">
                {bombSymbolsMap?.get(bombValue)?.image_url ? (
                  <img src={bombSymbolsMap.get(bombValue)!.image_url!} alt={`${bombValue}x`} className="w-full h-full object-contain" draggable={false} />
                ) : (
                  <>
                    <span className="text-3xl">💣</span>
                    <span className="absolute bottom-0.5 right-1 text-xs font-black text-yellow-300">{bombValue}x</span>
                  </>
                )}
              </div>
            )}

            {/* Bomb fizzle */}
            {cellAnim === 'bomb-fizzle' && isBomb && (
              <div className="w-full h-full flex items-center justify-center relative">
                {bombSymbolsMap?.get(bombValue)?.image_url ? (
                  <img src={bombSymbolsMap.get(bombValue)!.image_url!} alt={`${bombValue}x`} className="w-full h-full object-contain" draggable={false} />
                ) : (
                  <span className="text-3xl">💣</span>
                )}
              </div>
            )}

            {/* Bomb activate - fracture explosion */}
            {cellAnim === 'bomb-activate' && isBomb && (
              <BombFractureExplosion
                imageUrl={bombSymbolsMap?.get(bombValue)?.image_url}
                fallbackValue={bombValue}
                scaleValue={1}
                width={SYMBOL_WIDTH}
                height={SYMBOL_HEIGHT}
              />
            )}

            {/* Bomb exploded decal */}
            {cellAnim === 'bomb-exploded' && (
              <div className={cn("w-full h-full flex items-center justify-center", !applyDropOff && "bonanza-bomb-exploded-decal")}>
                <img src={bombExplodedDecal} alt="Explosion" className="w-full h-full object-contain" draggable={false} />
              </div>
            )}

            {/* Removal/explosion for regular symbols */}
            {(cellAnim === 'removing' || cellAnim === 'exploding') && symbol && !isBomb && (
              <div className="w-full h-full flex items-center justify-center gates-symbol-explode">
                {symbol.image_url ? (
                  <img src={symbol.image_url} alt={symbol.name} className="w-[85%] h-[85%] object-contain" draggable={false} />
                ) : (
                  <span className="text-2xl font-bold text-blue-200">{symbol.name.charAt(0)}</span>
                )}
              </div>
            )}

            {/* Removal/explosion for bombs */}
            {(cellAnim === 'removing' || cellAnim === 'exploding') && isBomb && (
              <div className="w-full h-full flex items-center justify-center gates-symbol-explode">
                {bombSymbolsMap?.get(bombValue)?.image_url ? (
                  <img src={bombSymbolsMap.get(bombValue)!.image_url!} alt={`${bombValue}x`} className="w-[85%] h-[85%] object-contain" draggable={false} />
                ) : (
                  <span className="text-3xl">💣</span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});
