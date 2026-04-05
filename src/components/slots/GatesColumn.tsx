import React from "react";
import { cn } from "@/lib/utils";
import { GATES_ROWS } from "@/lib/gatesGameLogic";
import { isBombSymbol, getBombValue } from "@/lib/gatesGameLogic";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import type { BombSymbol } from "@/hooks/useBombSymbols";
import { useIdleShimmer } from "@/hooks/useIdleShimmer";
import { BombFractureExplosion } from "./BombFractureExplosion";
import gatesExplosionDecal from "@/assets/slots/gates/explosion-decal.png";
import { BlackChromaKeyVideo } from "./BlackChromaKeyVideo";

const DEFAULT_SYMBOL_WIDTH = 140;
const DEFAULT_SYMBOL_HEIGHT = 108;

export type ColumnSpinState = 'idle' | 'spinning' | 'landing' | 'landed' | 'dropping-off' | 'dropping-in';

export type CellAnimState = 'idle' | 'winning' | 'removing' | 'exploding' | 'dropping' | 'filling' | 'bomb-fizzle' | 'bomb-activate' | 'bomb-exploded' | 'scatter-pulse' | 'scatter-tease' | 'scatter-tease-intense' | 'scatter-video';

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

        // Glow classes applied to <img> elements for alpha-aware drop-shadow
        const imgGlowClass = cn(
          isWinning && "gates-win-highlight",
          cellAnim === 'winning' && "gates-gold-highlight",
          cellAnim === 'scatter-pulse' && "gates-scatter-trigger-pulse",
          cellAnim === 'scatter-tease' && "gates-scatter-tease",
          cellAnim === 'scatter-tease-intense' && "gates-scatter-tease-intense",
        );

        return (
          <div
            key={`${row}-${(cellAnim === 'dropping' || cellAnim === 'filling') ? animationEpoch : 'stable'}-${applyDropOff ? 'off' : applyDropIn ? 'in' : 'idle'}`}
            className={cn(
              "relative rounded-lg overflow-visible",
              "bg-transparent",
              isColumnIdle && cellAnim === 'idle' && "slot-cell-idle-hover-alpha-blue",
              isLanding && "gates-column-stop-impact",
              applyDropOff && "gates-drop-off",
              applyDropIn && "gates-drop-in",
              cellAnim === 'removing' && "gates-tumble-remove",
              cellAnim === 'exploding' && "gates-symbol-explode",
              cellAnim === 'dropping' && "gates-gravity-bounce",
              cellAnim === 'filling' && "gates-lightning-fill",
              cellAnim === 'bomb-fizzle' && "bonanza-bomb-fizzle",
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
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && cellAnim !== 'bomb-fizzle' && cellAnim !== 'bomb-activate' && cellAnim !== 'scatter-video' && symbol && !isBomb && (
              <div className="w-full h-full flex items-center justify-center">
                {symbol.image_url ? (
                  <div className={cn(
                    "w-[120%] h-[120%]",
                    shimmeringCells.has(row) && cellAnim === 'idle' && "slot-idle-shimmer slot-idle-shimmer-blue"
                  )}>
                    <img src={symbol.image_url} alt={symbol.name} className={cn("w-full h-full object-contain", imgGlowClass)} draggable={false} />
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-blue-200">{symbol.name.charAt(0)}</span>
                )}
              </div>
            )}

            {/* Bomb symbol — also visible during 'winning' state to prevent flicker */}
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && cellAnim !== 'bomb-exploded' && cellAnim !== 'bomb-fizzle' && cellAnim !== 'bomb-activate' && isBomb && (
              <div className="w-full h-full flex items-center justify-center relative">
                {bombSymbolsMap?.get(bombValue)?.image_url ? (
                  <img src={bombSymbolsMap.get(bombValue)!.image_url!} alt={`${bombValue}x`} className={cn("w-full h-full object-contain", imgGlowClass)} draggable={false} />
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

            {/* Bomb exploded decal — Gates lightning style */}
            {cellAnim === 'bomb-exploded' && (
              <div className={cn("w-full h-full flex items-center justify-center", !applyDropOff && "gates-bomb-exploded-decal")}>
                <img src={gatesExplosionDecal} alt="Explosion" className="w-[140%] h-[140%] object-contain absolute" draggable={false} style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.8))' }} />
              </div>
            )}

            {/* Scatter celebration video overlay — hides symbol, plays video only */}
            {cellAnim === 'scatter-video' && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <BlackChromaKeyVideo
                  src="/videos/gates-scatter-celebration.mp4"
                  width={SYMBOL_WIDTH}
                  height={SYMBOL_HEIGHT}
                  className="absolute inset-0"
                />
              </div>
            )}


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
