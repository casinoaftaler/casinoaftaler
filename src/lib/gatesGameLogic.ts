/**
 * Gates of Fedesvin - Game Logic Engine
 * 
 * A "Gates of Olympus" style slot with:
 * - 6x5 grid (6 columns, 5 rows)
 * - Pay Anywhere: 8+ matching symbols anywhere = win
 * - Tumble/Cascade: winning symbols removed, new ones fall in
 * - Multiplier orbs: random multipliers applied to total round win
 * - Free spins with cumulative multiplier
 */

import type { SlotSymbol } from "@/lib/slotGameLogic";

export const GATES_COLS = 6;
export const GATES_ROWS = 5;
export const GATES_TOTAL_CELLS = GATES_COLS * GATES_ROWS; // 30

// Minimum symbols needed for a pay-anywhere win
export const MIN_MATCH_COUNT = 8;

// Scatter count needed for free spins
export const SCATTER_TRIGGER_COUNT = 4;
export const SCATTER_RETRIGGER_COUNT = 3;
// Free spins awarded by scatter count: 4→10, 5→12, 6→15
export const FREE_SPINS_BY_SCATTER: Record<number, number> = { 4: 10, 5: 12, 6: 15 };
export const FREE_SPINS_RETRIGGER = 5;

// Multiplier orb values and their weights
export const MULTIPLIER_VALUES = [2, 3, 5, 10, 15, 25, 50, 100];
export const MULTIPLIER_WEIGHTS = [30, 25, 20, 12, 6, 3, 2, 1];

// Re-export multiplier helpers for convenience
export { isMultiplierSymbol, getMultiplierValue } from './gatesMultiplierSymbols';

// Bomb symbol helpers (Bonanza-style multipliers used in Gates engine)
export function isBombSymbol(id: string): boolean {
  return id.startsWith("bomb_");
}

export function getBombValue(id: string): number {
  const match = id.match(/^bomb_(\d+)x$/);
  return match ? parseInt(match[1], 10) : 0;
}

export interface GatesBomb {
  position: number;
  value: number;
  activated: boolean;
}

export function scanGridBombs(grid: string[][]): GatesBomb[] {
  const bombs: GatesBomb[] = [];
  for (let col = 0; col < GATES_COLS; col++) {
    for (let row = 0; row < GATES_ROWS; row++) {
      const id = grid[col][row];
      if (isBombSymbol(id)) {
        bombs.push({ position: col * GATES_ROWS + row, value: getBombValue(id), activated: false });
      }
    }
  }
  return bombs;
}

// Chance of multiplier orbs appearing on a spin (percentage of cells)
export const MULTIPLIER_CHANCE_BASE = 0.08; // 8% per cell in base game
export const MULTIPLIER_CHANCE_BONUS = 0.12; // 12% per cell in bonus

export interface GatesWin {
  symbolId: string;
  symbolName: string;
  count: number;
  payout: number;
  positions: number[]; // flat indices (col * GATES_ROWS + row)
}

export interface MultiplierOrb {
  position: number; // flat index
  value: number;
}

export interface TumbleStep {
  grid: string[][]; // 6 cols x 5 rows
  wins: GatesWin[];
  winningPositions: number[];
  multiplierOrbs: MultiplierOrb[];
  stepWin: number; // raw win before multiplier
}

export interface GatesSpinResult {
  tumbleSteps: TumbleStep[];
  totalWin: number;
  bonusTriggered: boolean;
  scatterCount: number;
  totalMultiplier: number; // sum of all multiplier orb values
  initialGrid: string[][]; // the very first grid before any tumbles
}

/**
 * Get payout for a symbol based on match count.
 * Gates uses multiplier_3 = 8-9, multiplier_4 = 10-11, multiplier_5 = 12+
 */
export function getGatesPayout(symbol: SlotSymbol, matchCount: number, betAmount: number): number {
  if (matchCount < MIN_MATCH_COUNT) return 0;
  
  let multiplier = 0;
  if (matchCount >= 12) {
    multiplier = symbol.multiplier_5;
  } else if (matchCount >= 10) {
    multiplier = symbol.multiplier_4;
  } else if (matchCount >= 8) {
    multiplier = symbol.multiplier_3;
  }
  
  return multiplier * betAmount;
}

/**
 * Count how many of each symbol appear on the grid (pay-anywhere).
 * Returns a map of symbolId -> { count, positions[] }
 */
export function countSymbolMatches(
  grid: string[][],
  symbols: SlotSymbol[]
): Map<string, { count: number; positions: number[] }> {
  const matches = new Map<string, { count: number; positions: number[] }>();
  
  for (let col = 0; col < GATES_COLS; col++) {
    for (let row = 0; row < GATES_ROWS; row++) {
      const symbolId = grid[col][row];
      const flatIndex = col * GATES_ROWS + row;
      
      if (!matches.has(symbolId)) {
        matches.set(symbolId, { count: 0, positions: [] });
      }
      const entry = matches.get(symbolId)!;
      entry.count++;
      entry.positions.push(flatIndex);
    }
  }
  
  return matches;
}

/**
 * Calculate wins from the current grid state.
 */
export function calculateGatesWins(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number
): GatesWin[] {
  const matches = countSymbolMatches(grid, symbols);
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const wins: GatesWin[] = [];
  
  for (const [symbolId, { count, positions }] of matches) {
    const symbol = symbolsById.get(symbolId);
    if (!symbol || symbol.is_scatter) continue; // scatters don't pay via cluster
    
    if (count >= MIN_MATCH_COUNT) {
      const payout = getGatesPayout(symbol, count, betAmount);
      if (payout > 0) {
        wins.push({
          symbolId,
          symbolName: symbol.name,
          count,
          payout,
          positions,
        });
      }
    }
  }
  
  return wins;
}

/**
 * Count scatter symbols on the grid.
 */
export function countGatesScatters(grid: string[][], symbols: SlotSymbol[]): { count: number; positions: number[] } {
  const scatterSymbol = symbols.find(s => s.is_scatter);
  if (!scatterSymbol) return { count: 0, positions: [] };
  
  let count = 0;
  const positions: number[] = [];
  
  for (let col = 0; col < GATES_COLS; col++) {
    for (let row = 0; row < GATES_ROWS; row++) {
      if (grid[col][row] === scatterSymbol.id) {
        count++;
        positions.push(col * GATES_ROWS + row);
      }
    }
  }
  
  return { count, positions };
}

/**
 * Pick a random multiplier value using weighted distribution.
 */
export function pickMultiplierValue(): number {
  const totalWeight = MULTIPLIER_WEIGHTS.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < MULTIPLIER_VALUES.length; i++) {
    random -= MULTIPLIER_WEIGHTS[i];
    if (random <= 0) return MULTIPLIER_VALUES[i];
  }
  
  return MULTIPLIER_VALUES[0];
}

/**
 * Generate a display-only grid for initial rendering (client-side only).
 */
export function generateGatesDisplayGrid(symbols: SlotSymbol[]): string[][] {
  const nonScatter = symbols.filter(s => !s.is_scatter);
  const grid: string[][] = [];
  
  for (let col = 0; col < GATES_COLS; col++) {
    const column: string[] = [];
    for (let row = 0; row < GATES_ROWS; row++) {
      const sym = nonScatter[Math.floor(Math.random() * nonScatter.length)];
      column.push(sym.id);
    }
    grid.push(column);
  }
  
  return grid;
}

/**
 * Convert flat index to column/row pair.
 */
export function flatToColRow(flatIndex: number): { col: number; row: number } {
  const col = Math.floor(flatIndex / GATES_ROWS);
  const row = flatIndex % GATES_ROWS;
  return { col, row };
}

/**
 * Convert column/row to flat index.
 */
export function colRowToFlat(col: number, row: number): number {
  return col * GATES_ROWS + row;
}
