import React from "react";
import { cn } from "@/lib/utils";
import { BONANZA_ROWS } from "@/lib/bonanzaGameLogic";
import { isBombSymbol, getBombValue } from "@/lib/bonanzaGameLogic";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import type { BombSymbol } from "@/hooks/useBombSymbols";
import { useIdleShimmer } from "@/hooks/useIdleShimmer";
import { BombFractureExplosion } from "./BombFractureExplosion";
import bombExplodedDecal from "@/assets/bomb-exploded-decal.png";

const DEFAULT_SYMBOL_WIDTH = 180;
const DEFAULT_SYMBOL_HEIGHT = 140;

export type BonanzaColumnSpinState = 'idle' | 'spinning' | 'landing' | 'landed' | 'dropping-off' | 'dropping-in';

export type BonanzaCellAnimState = 'idle' | 'winning' | 'removing' | 'exploding' | 'dropping' | 'filling' | 'bomb-fizzle' | 'bomb-activate' | 'bomb-exploded' | 'scatter-pulse' | 'scatter-tease' | 'scatter-tease-intense';

interface BonanzaColumnProps {
  col: number;
  spinState: BonanzaColumnSpinState;
  symbols: SlotSymbol[];
  symbolsById: Map<string, SlotSymbol>;
  finalSymbolIds: string[];
  winningPositions: Set<number>;
  cellAnimStates: Map<number, BonanzaCellAnimState>;
  cellDropOffsets: Map<number, number>;
  tumblePhase: string;
  animationEpoch?: number;
  bombSymbolsMap?: Map<number, BombSymbol>;
  symbolWidth?: number;
  symbolHeight?: number;
  symbolScale?: number;
  isBonusActive?: boolean;
  isMobile?: boolean;
}

export const BonanzaColumn = React.memo(function BonanzaColumn({
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
  symbolScale = 100,
  isBonusActive = false,
}: BonanzaColumnProps) {
  const isDroppingOff = spinState === 'dropping-off';
  const isDroppingIn = spinState === 'dropping-in';
  const isLanding = spinState === 'landing';
  const scaleValue = symbolScale / 100;
  const isColumnIdle = spinState === 'idle' && tumblePhase === 'idle' && !isBonusActive;
  const shimmeringCells = useIdleShimmer(BONANZA_ROWS, isColumnIdle);

  return (
    <div
      className={cn(
        "flex flex-col transition-[filter] duration-200",
        (isDroppingOff || isDroppingIn) ? "overflow-visible" :
        (tumblePhase !== 'idle' && tumblePhase !== 'spinning') ? "overflow-visible" : "overflow-hidden",
      )}
      style={{ gap: 5 }}
    >
      {Array.from({ length: BONANZA_ROWS }).map((_, row) => {
        const symbolId = finalSymbolIds[row];
        const isBomb = symbolId ? isBombSymbol(symbolId) : false;
        const symbol = !isBomb && symbolId ? symbolsById.get(symbolId) : null;
        const bombValue = isBomb && symbolId ? getBombValue(symbolId) : 0;
        const flatIndex = col * BONANZA_ROWS + row;
        const isWinning = winningPositions.has(flatIndex);
        const cellAnim = cellAnimStates.get(flatIndex) || 'idle';
        const scatterAnimClass = cellAnim === 'scatter-pulse' ? 'bonanza-scatter-trigger-pulse'
          : cellAnim === 'scatter-tease-intense' ? 'bonanza-scatter-tease-intense'
          : cellAnim === 'scatter-tease' ? 'bonanza-scatter-tease'
          : null;

        const applyDropOff = isDroppingOff && (cellAnim === 'idle' || cellAnim === 'bomb-exploded');
        const applyDropIn = isDroppingIn && cellAnim === 'idle';

        return (
          <div
            key={`${row}-${(cellAnim === 'dropping' || cellAnim === 'filling') ? animationEpoch : 'stable'}-${applyDropOff ? 'off' : applyDropIn ? 'in' : 'idle'}`}
            className={cn(
              "relative rounded-lg",
              "overflow-visible",
              isColumnIdle && cellAnim === 'idle' && "slot-cell-idle-hover-alpha",
              isWinning && "bonanza-candy-highlight",
              isLanding && "bonanza-column-stop-impact",
              applyDropOff && "bonanza-drop-off",
              applyDropIn && "bonanza-drop-in",
              cellAnim === 'winning' && "bonanza-candy-highlight",
              cellAnim === 'removing' && "bonanza-symbol-explode",
              cellAnim === 'exploding' && "bonanza-symbol-explode",
              cellAnim === 'dropping' && "bonanza-gravity-bounce",
              cellAnim === 'filling' && "bonanza-lightning-fill",
              cellAnim === 'bomb-fizzle' && "bonanza-bomb-fizzle",
              /* bomb-activate handled by BombFractureExplosion */
            )}
            style={{
              width: SYMBOL_WIDTH,
              height: SYMBOL_HEIGHT,
              '--gravity-offset': cellAnim === 'dropping' ? `${-(cellDropOffsets.get(flatIndex) || (SYMBOL_HEIGHT + 4))}px` : undefined,
              animationDelay: applyDropOff ? `${(BONANZA_ROWS - 1 - row) * 40}ms` :
                applyDropIn ? `${row * 50}ms` :
                isLanding ? `${row * 50}ms` :
                cellAnim === 'filling' ? `${row * 40}ms` :
                cellAnim === 'dropping' ? `${row * 30}ms` : undefined,
            } as React.CSSProperties}
          >
            {/* Regular symbol rendering */}
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && cellAnim !== 'bomb-fizzle' && cellAnim !== 'bomb-activate' && symbol && !isBomb && (
              <div className="w-full h-full flex items-center justify-center">
                {symbol.image_url ? (
                  <div className={cn(
                    "w-full h-full",
                    shimmeringCells.has(row) && cellAnim === 'idle' && "slot-idle-shimmer slot-idle-shimmer-pink"
                  )}>
                    <img
                      src={symbol.image_url}
                      alt={symbol.name}
                      className={cn(
                        "w-full h-full object-contain",
                        (isWinning || cellAnim === 'winning') && "bonanza-candy-highlight-img",
                        scatterAnimClass
                      )}
                      style={{ transform: (isWinning || cellAnim === 'winning') ? undefined : `scale(${scaleValue})`, '--symbol-scale': scaleValue } as React.CSSProperties}
                      draggable={false}
                    />
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-pink-200">
                    {getEmojiForSymbol(symbol.name)}
                  </span>
                )}
              </div>
            )}

            {/* Bomb symbol rendering */}
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && cellAnim !== 'bomb-exploded' && cellAnim !== 'bomb-fizzle' && cellAnim !== 'bomb-activate' && isBomb && (
              <div className="w-full h-full flex items-center justify-center relative">
                {bombSymbolsMap?.get(bombValue)?.image_url ? (
                  <img src={bombSymbolsMap.get(bombValue)!.image_url!} alt={`${bombValue}x`} className="w-full h-full object-contain" style={{ transform: `scale(${scaleValue})` }} draggable={false} />
                ) : (
                  <>
                    <span className="text-3xl">💣</span>
                    <span className="bonanza-bomb-value">{bombValue}x</span>
                  </>
                )}
              </div>
            )}

            {/* Bomb fizzle */}
            {cellAnim === 'bomb-fizzle' && isBomb && (
              <div className="w-full h-full flex items-center justify-center relative">
                {bombSymbolsMap?.get(bombValue)?.image_url ? (
                  <img src={bombSymbolsMap.get(bombValue)!.image_url!} alt={`${bombValue}x`} className="w-full h-full object-contain" style={{ transform: `scale(${scaleValue})` }} draggable={false} />
                ) : (
                  <>
                    <span className="text-3xl">💣</span>
                    <span className="bonanza-bomb-value">{bombValue}x</span>
                  </>
                )}
              </div>
            )}

            {/* Bomb activate - fracture explosion */}
            {cellAnim === 'bomb-activate' && isBomb && (
              <BombFractureExplosion
                imageUrl={bombSymbolsMap?.get(bombValue)?.image_url}
                fallbackValue={bombValue}
                scaleValue={scaleValue}
                width={SYMBOL_WIDTH}
                height={SYMBOL_HEIGHT}
              />
            )}

            {/* Bomb exploded — show explosion decal */}
            {cellAnim === 'bomb-exploded' && (
              <div className={cn("w-full h-full flex items-center justify-center", !applyDropOff && "bonanza-bomb-exploded-decal")}>
                <img src={bombExplodedDecal} alt="Explosion" className="w-full h-full object-contain" draggable={false} />
              </div>
            )}

            {/* Removal/explosion for regular symbols */}
            {(cellAnim === 'removing' || cellAnim === 'exploding') && symbol && !isBomb && (
              <div className="w-full h-full flex items-center justify-center bonanza-symbol-explode">
                {symbol.image_url ? (
                  <img src={symbol.image_url} alt={symbol.name} className="w-[85%] h-[85%] object-contain" style={{ transform: `scale(${scaleValue})` }} draggable={false} />
                ) : (
                  <span className="text-2xl font-bold text-pink-200">{getEmojiForSymbol(symbol.name)}</span>
                )}
              </div>
            )}

            {/* Removal/explosion for bombs */}
            {(cellAnim === 'removing' || cellAnim === 'exploding') && isBomb && (
              <div className="w-full h-full flex items-center justify-center bonanza-symbol-explode">
                {bombSymbolsMap?.get(bombValue)?.image_url ? (
                  <img src={bombSymbolsMap.get(bombValue)!.image_url!} alt={`${bombValue}x`} className="w-[85%] h-[85%] object-contain" style={{ transform: `scale(${scaleValue})` }} draggable={false} />
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

function getEmojiForSymbol(name: string): string {
  const emojiMap: Record<string, string> = {
    'Red Heart': '❤️',
    'Purple Square': '🟪',
    'Green Hexagon': '💚',
    'Blue Oval': '💙',
    'Banana': '🍌',
    'Watermelon': '🍉',
    'Grape': '🍇',
    'Apple': '🍎',
    'Peach': '🍑',
    'Lollipop': '🍭',
  };
  return emojiMap[name] || name.charAt(0);
}
