/**
 * Fedesvin Bonanza - Game Logic Engine (Client-side)
 * 
 * Sweet Bonanza-style slot with:
 * - 6x5 grid (6 columns, 5 rows)
 * - Pay Anywhere: 8+ matching symbols anywhere = win
 * - Tumble/Cascade: winning symbols removed, new ones fall in
 * - Multiplier bombs: only in bonus, activate on winning tumbles, fizzle on non-winning
 * - Free spins with per-spin multiplier accumulation
 */

import type { SlotSymbol } from "@/lib/slotGameLogic";

export const BONANZA_COLS = 6;
export const BONANZA_ROWS = 5;
export const BONANZA_TOTAL_CELLS = BONANZA_COLS * BONANZA_ROWS; // 30

export const MIN_MATCH_COUNT = 8;

export const SCATTER_TRIGGER_COUNT = 4;
export const SCATTER_RETRIGGER_COUNT = 3;
export const FREE_SPINS_BY_SCATTER: Record<number, number> = { 4: 10, 5: 12, 6: 15 };
export const FREE_SPINS_RETRIGGER = 5;

export const MULTIPLIER_VALUES = [2, 3, 5, 10, 15, 25, 50, 100];
export const MULTIPLIER_WEIGHTS = [30, 25, 20, 12, 6, 3, 2, 1];

export const MULTIPLIER_CHANCE_BONUS = 0.10; // 10% per cell in bonus

export interface BonanzaWin {
  symbolId: string;
  symbolName: string;
  count: number;
  payout: number;
  positions: number[];
}

export interface BonanzaMultiplierBomb {
  position: number;
  value: number;
  activated: boolean; // true if a win happened on this tumble
}

export interface BonanzaTumbleStep {
  grid: string[][];
  wins: BonanzaWin[];
  winningPositions: number[];
  multiplierBombs: BonanzaMultiplierBomb[];
  stepWin: number;
  bombMultiplier: number; // sum of activated bomb values this step
}

export interface BonanzaSpinResult {
  tumbleSteps: BonanzaTumbleStep[];
  totalWin: number;
  bonusTriggered: boolean;
  scatterCount: number;
  totalMultiplier: number;
  initialGrid: string[][];
}

export function getBonanzaPayout(symbol: SlotSymbol, matchCount: number, betAmount: number): number {
  if (matchCount < MIN_MATCH_COUNT) return 0;
  let multiplier = 0;
  if (matchCount >= 12) multiplier = symbol.multiplier_5;
  else if (matchCount >= 10) multiplier = symbol.multiplier_4;
  else if (matchCount >= 8) multiplier = symbol.multiplier_3;
  return multiplier * betAmount;
}

export function countSymbolMatches(
  grid: string[][],
  symbols: SlotSymbol[]
): Map<string, { count: number; positions: number[] }> {
  const matches = new Map<string, { count: number; positions: number[] }>();
  for (let col = 0; col < BONANZA_COLS; col++) {
    for (let row = 0; row < BONANZA_ROWS; row++) {
      const symbolId = grid[col][row];
      if (symbolId.startsWith("bomb_")) continue;
      const flatIndex = col * BONANZA_ROWS + row;
      if (!matches.has(symbolId)) matches.set(symbolId, { count: 0, positions: [] });
      const entry = matches.get(symbolId)!;
      entry.count++;
      entry.positions.push(flatIndex);
    }
  }
  return matches;
}

export function calculateBonanzaWins(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number
): BonanzaWin[] {
  const matches = countSymbolMatches(grid, symbols);
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const wins: BonanzaWin[] = [];
  for (const [symbolId, { count, positions }] of matches) {
    const symbol = symbolsById.get(symbolId);
    if (!symbol || symbol.is_scatter) continue;
    if (count >= MIN_MATCH_COUNT) {
      const payout = getBonanzaPayout(symbol, count, betAmount);
      if (payout > 0) {
        wins.push({ symbolId, symbolName: symbol.name, count, payout, positions });
      }
    }
  }
  return wins;
}

export function countBonanzaScatters(grid: string[][], symbols: SlotSymbol[]): { count: number; positions: number[] } {
  const scatterSymbol = symbols.find(s => s.is_scatter);
  if (!scatterSymbol) return { count: 0, positions: [] };
  let count = 0;
  const positions: number[] = [];
  for (let col = 0; col < BONANZA_COLS; col++) {
    for (let row = 0; row < BONANZA_ROWS; row++) {
      if (grid[col][row] === scatterSymbol.id) {
        count++;
        positions.push(col * BONANZA_ROWS + row);
      }
    }
  }
  return { count, positions };
}

export function generateBonanzaDisplayGrid(symbols: SlotSymbol[]): string[][] {
  const nonScatter = symbols.filter(s => !s.is_scatter);
  const grid: string[][] = [];
  for (let col = 0; col < BONANZA_COLS; col++) {
    const column: string[] = [];
    for (let row = 0; row < BONANZA_ROWS; row++) {
      const sym = nonScatter[Math.floor(Math.random() * nonScatter.length)];
      column.push(sym.id);
    }
    grid.push(column);
  }
  return grid;
}

export function flatToColRow(flatIndex: number): { col: number; row: number } {
  const col = Math.floor(flatIndex / BONANZA_ROWS);
  const row = flatIndex % BONANZA_ROWS;
  return { col, row };
}

export function colRowToFlat(col: number, row: number): number {
  return col * BONANZA_ROWS + row;
}

// Helper to check if a grid cell ID is a multiplier bomb
export function isBombSymbol(id: string): boolean {
  return id.startsWith("bomb_");
}

// Extract bomb multiplier value from "bomb_5x" -> 5
export function getBombValue(id: string): number {
  const match = id.match(/^bomb_(\d+)x$/);
  return match ? parseInt(match[1], 10) : 0;
}

// Scan grid for bomb symbols
export function scanGridBombs(grid: string[][]): BonanzaMultiplierBomb[] {
  const bombs: BonanzaMultiplierBomb[] = [];
  for (let col = 0; col < BONANZA_COLS; col++) {
    for (let row = 0; row < BONANZA_ROWS; row++) {
      const id = grid[col][row];
      if (isBombSymbol(id)) {
        bombs.push({
          position: col * BONANZA_ROWS + row,
          value: getBombValue(id),
          activated: false,
        });
      }
    }
  }
  return bombs;
}
