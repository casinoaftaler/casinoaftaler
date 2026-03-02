import React from "react";
import { cn } from "@/lib/utils";
import { BONANZA_ROWS } from "@/lib/bonanzaGameLogic";
import { isBombSymbol, getBombValue } from "@/lib/bonanzaGameLogic";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import type { BombSymbol } from "@/hooks/useBombSymbols";
import bombExplodedDecal from "@/assets/bomb-exploded-decal.png";

const SYMBOL_WIDTH = 140;
const SYMBOL_HEIGHT = 108;

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
}: BonanzaColumnProps) {
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
      {Array.from({ length: BONANZA_ROWS }).map((_, row) => {
        const symbolId = finalSymbolIds[row];
        const isBomb = symbolId ? isBombSymbol(symbolId) : false;
        const symbol = !isBomb && symbolId ? symbolsById.get(symbolId) : null;
        const bombValue = isBomb && symbolId ? getBombValue(symbolId) : 0;
        const flatIndex = col * BONANZA_ROWS + row;
        const isWinning = winningPositions.has(flatIndex);
        const cellAnim = cellAnimStates.get(flatIndex) || 'idle';

        const applyDropOff = isDroppingOff && cellAnim === 'idle';
        const applyDropIn = isDroppingIn && cellAnim === 'idle';

        return (
          <div
            key={`${row}-${(cellAnim === 'dropping' || cellAnim === 'filling') ? animationEpoch : 'stable'}-${cellAnim}-${applyDropOff ? 'off' : applyDropIn ? 'in' : ''}`}
            className={cn(
              "relative rounded-lg",
              (cellAnim === 'dropping' || cellAnim === 'filling' || cellAnim === 'exploding' || applyDropOff || applyDropIn) ? "overflow-visible" : "overflow-hidden",
              
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
              cellAnim === 'bomb-activate' && "bonanza-bomb-activate",
              cellAnim === 'scatter-pulse' && "bonanza-scatter-trigger-pulse",
              cellAnim === 'scatter-tease' && "bonanza-scatter-tease",
              cellAnim === 'scatter-tease-intense' && "bonanza-scatter-tease-intense",
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
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && cellAnim !== 'bomb-fizzle' && cellAnim !== 'bomb-activate' && symbol && !isBomb && (
              <div className="w-full h-full flex items-center justify-center">
                {symbol.image_url ? (
                  <img
                    src={symbol.image_url}
                    alt={symbol.name}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                ) : (
                  <span className="text-2xl font-bold text-pink-200">
                    {getEmojiForSymbol(symbol.name)}
                  </span>
                )}
              </div>
            )}

            {/* Bomb symbol rendering */}
            {cellAnim !== 'removing' && cellAnim !== 'exploding' && cellAnim !== 'bomb-exploded' && isBomb && (
              <div className="w-full h-full flex items-center justify-center relative">
                {bombSymbolsMap?.get(bombValue)?.image_url ? (
                  <img src={bombSymbolsMap.get(bombValue)!.image_url!} alt={`${bombValue}x`} className="w-full h-full object-contain" draggable={false} />
                ) : (
                  <>
                    <span className="text-3xl">💣</span>
                    <span className="bonanza-bomb-value">{bombValue}x</span>
                  </>
                )}
              </div>
            )}

            {/* Bomb fizzle / activate */}
            {(cellAnim === 'bomb-fizzle' || cellAnim === 'bomb-activate') && isBomb && (
              <div className="w-full h-full flex items-center justify-center relative">
                {bombSymbolsMap?.get(bombValue)?.image_url ? (
                  <img src={bombSymbolsMap.get(bombValue)!.image_url!} alt={`${bombValue}x`} className="w-full h-full object-contain" draggable={false} />
                ) : (
                  <>
                    <span className="text-3xl">💣</span>
                    <span className="bonanza-bomb-value">{bombValue}x</span>
                  </>
                )}
              </div>
            )}

            {/* Bomb exploded — show explosion decal */}
            {cellAnim === 'bomb-exploded' && (
              <div className="w-full h-full flex items-center justify-center bonanza-bomb-exploded-decal">
                <img src={bombExplodedDecal} alt="Explosion" className="w-full h-full object-contain" draggable={false} />
              </div>
            )}

            {/* Removal/explosion for regular symbols */}
            {(cellAnim === 'removing' || cellAnim === 'exploding') && symbol && !isBomb && (
              <div className="w-full h-full flex items-center justify-center bonanza-symbol-explode">
                {symbol.image_url ? (
                  <img src={symbol.image_url} alt={symbol.name} className="w-[85%] h-[85%] object-contain" draggable={false} />
                ) : (
                  <span className="text-2xl font-bold text-pink-200">{getEmojiForSymbol(symbol.name)}</span>
                )}
              </div>
            )}

            {/* Removal/explosion for bombs */}
            {(cellAnim === 'removing' || cellAnim === 'exploding') && isBomb && (
              <div className="w-full h-full flex items-center justify-center bonanza-symbol-explode">
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
