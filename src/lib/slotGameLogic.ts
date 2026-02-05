// Pay line patterns (5 reels, values represent row index 0-2)
export const PAY_LINES = [
  [1, 1, 1, 1, 1], // Line 1: middle row
  [0, 0, 0, 0, 0], // Line 2: top row
  [2, 2, 2, 2, 2], // Line 3: bottom row
  [0, 1, 2, 1, 0], // Line 4: V shape
  [2, 1, 0, 1, 2], // Line 5: inverted V
  [0, 0, 1, 2, 2], // Line 6: top to bottom
  [2, 2, 1, 0, 0], // Line 7: bottom to top
  [1, 0, 0, 0, 1], // Line 8: U shape top
  [1, 2, 2, 2, 1], // Line 9: U shape bottom
  [0, 1, 1, 1, 0], // Line 10: mild V
];

export interface SlotSymbol {
  id: string;
  name: string;
  image_url: string | null;
  multiplier_2: number;
  multiplier_3: number;
  multiplier_4: number;
  multiplier_5: number;
  is_scatter: boolean;
  is_wild: boolean;
  position: number;
  rarity: 'premium' | 'common' | 'scatter';
  weight: number;
}

export interface SpinResult {
  grid: string[][]; // 5 columns x 3 rows of symbol IDs
  wins: LineWin[];
  totalWin: number;
  bonusTriggered: boolean;
  scatterCount: number;
}

export interface LineWin {
  lineIndex: number;
  symbolId: string;
  count: number;
  payout: number;
}

// Rarity system types
export type SymbolRarity = 'premium' | 'common' | 'scatter';

export const RARITY_COLORS: Record<SymbolRarity, string> = {
  premium: 'text-amber-400',
  common: 'text-gray-400',
  scatter: 'text-purple-400'
};

export const RARITY_LABELS: Record<SymbolRarity, string> = {
  premium: 'Premium',
  common: 'Almindelig',
  scatter: 'Scatter'
};

// Default fallback weight if not set in database
const DEFAULT_SYMBOL_WEIGHT = 10;

// Count scatters per reel column
export function countScattersPerReel(grid: string[][], symbols: SlotSymbol[]): number[] {
  const scatterSymbol = symbols.find(s => s.is_scatter);
  if (!scatterSymbol) return [0, 0, 0, 0, 0];
  
  return grid.map(column => 
    column.filter(symbolId => symbolId === scatterSymbol.id).length
  );
}

// Get which reels should have tease (slow) animation
export interface TeaseInfo {
  reels: number[];
  lateScatter: boolean; // true if 2nd scatter is on reel 4 (needs extended fake loop)
  lastScatterReel: number; // The reel index where the 2nd scatter lands
}

export function getScatterTeaseReels(grid: string[][], symbols: SlotSymbol[]): TeaseInfo {
  const scattersPerReel = countScattersPerReel(grid, symbols);
  
  // Count total scatters in first N reels
  let scatterCount = 0;
  let teaseStartReel = -1;
  let secondScatterReel = -1;
  
  for (let i = 0; i < 5; i++) {
    if (scattersPerReel[i] > 0) {
      scatterCount += scattersPerReel[i];
      // Track where the 2nd scatter lands
      if (scatterCount >= 2 && secondScatterReel === -1) {
        secondScatterReel = i;
      }
    }
    // If we have 2+ scatters in the first 1-4 reels, tease on remaining reels
    // Extended to include reel 4 (i < 4)
    if (scatterCount >= 2 && teaseStartReel === -1 && i < 4) {
      teaseStartReel = i + 1; // Tease starts on the next reel
    }
  }
  
  // Return info about tease reels
  if (teaseStartReel > 0) {
    return {
      reels: Array.from({ length: 5 - teaseStartReel }, (_, i) => teaseStartReel + i),
      lateScatter: secondScatterReel === 3, // Reel 4 is index 3
      lastScatterReel: secondScatterReel
    };
  }
  return { reels: [], lateScatter: false, lastScatterReel: -1 };
}

export function getRandomSymbol(symbols: SlotSymbol[], excludeIds: string[] = [], isBonusSpin: boolean = false): SlotSymbol {
  const availableSymbols = symbols.filter(s => !excludeIds.includes(s.id));
  
  // If all symbols are excluded, fall back to full list (shouldn't happen normally)
  const symbolPool = availableSymbols.length > 0 ? availableSymbols : symbols;
  
  // Use weight from database, with fallback to default (same odds in base and bonus game)
  const getWeight = (s: SlotSymbol) => s.weight || DEFAULT_SYMBOL_WEIGHT;
  
  const totalWeight = symbolPool.reduce((sum, s) => sum + getWeight(s), 0);
  let random = Math.random() * totalWeight;
  
  for (const symbol of symbolPool) {
    random -= getWeight(symbol);
    if (random <= 0) return symbol;
  }
  
  return symbolPool[symbolPool.length - 1];
}

export function generateGrid(symbols: SlotSymbol[], isBonusSpin: boolean = false): string[][] {
  const grid: string[][] = [];
  
  for (let col = 0; col < 5; col++) {
    const column: string[] = [];
    const usedIds: string[] = [];
    
    for (let row = 0; row < 3; row++) {
      const symbol = getRandomSymbol(symbols, usedIds, isBonusSpin);
      column.push(symbol.id);
      usedIds.push(symbol.id);
    }
    grid.push(column);
  }
  
  return grid;
}

export function checkLineWin(
  grid: string[][],
  linePattern: number[],
  symbols: SlotSymbol[],
  betAmount: number
): LineWin | null {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const wildSymbol = symbols.find(s => s.is_wild);
  
  // Get symbols on this line
  const lineSymbols = linePattern.map((row, col) => grid[col][row]);
  const lineSymbolData = lineSymbols.map(id => symbolsById.get(id));
  
  // Safety check: if any symbol is missing, skip this line
  if (lineSymbolData.some(s => !s)) {
    console.warn('[SlotGame] Missing symbol data for line, skipping win check');
    return null;
  }
  
  // Now we know all symbols exist, cast to non-null array
  const validSymbols = lineSymbolData as SlotSymbol[];
  
  // Find the first non-wild symbol (or wild if all wilds)
  let baseSymbol = validSymbols.find(s => !s.is_wild) || validSymbols[0];
  
  // Count consecutive matching symbols from left
  let count = 0;
  for (let i = 0; i < 5; i++) {
    const current = validSymbols[i];
    if (current.id === baseSymbol.id || current.is_wild || baseSymbol.is_wild) {
      count++;
      if (baseSymbol.is_wild && !current.is_wild) {
        baseSymbol = current; // Update base if we started with wild
      }
    } else {
      break;
    }
  }
  
  // Premium symbols can win with 2+ matches, common symbols need 3+
  const minMatches = baseSymbol.rarity === 'premium' ? 2 : 3;
  
  if (count >= minMatches) {
    let multiplier = 0;
    if (count === 2 && baseSymbol.rarity === 'premium') {
      multiplier = baseSymbol.multiplier_2;
    } else if (count === 3) {
      multiplier = baseSymbol.multiplier_3;
    } else if (count === 4) {
      multiplier = baseSymbol.multiplier_4;
    } else if (count === 5) {
      multiplier = baseSymbol.multiplier_5;
    }
    
    if (multiplier > 0) {
      return {
        lineIndex: PAY_LINES.indexOf(linePattern),
        symbolId: baseSymbol.id,
        count,
        payout: multiplier * betAmount,
      };
    }
  }
  
  return null;
}

export function countScatters(grid: string[][], symbols: SlotSymbol[]): number {
  const scatterSymbol = symbols.find(s => s.is_scatter);
  if (!scatterSymbol) return 0;
  
  let count = 0;
  for (const column of grid) {
    for (const symbolId of column) {
      if (symbolId === scatterSymbol.id) count++;
    }
  }
  
  return count;
}

export function calculateSpinResult(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number
): SpinResult {
  const wins: LineWin[] = [];
  
  // Check each pay line
  for (const linePattern of PAY_LINES) {
    const win = checkLineWin(grid, linePattern, symbols, betAmount);
    if (win) {
      wins.push(win);
    }
  }
  
  const scatterCount = countScatters(grid, symbols);
  const bonusTriggered = scatterCount >= 3;
  
  // Calculate scatter wins (scatters pay anywhere)
  const scatterSymbol = symbols.find(s => s.is_scatter);
  let scatterPayout = 0;
  if (scatterSymbol && scatterCount >= 3) {
    if (scatterCount === 3) scatterPayout = scatterSymbol.multiplier_3 * betAmount;
    else if (scatterCount === 4) scatterPayout = scatterSymbol.multiplier_4 * betAmount;
    else if (scatterCount === 5) scatterPayout = scatterSymbol.multiplier_5 * betAmount;
  }
  
  const totalWin = wins.reduce((sum, w) => sum + w.payout, 0) + scatterPayout;
  
  return {
    grid,
    wins,
    totalWin,
    bonusTriggered,
    scatterCount,
  };
}

// Get symbol emoji fallback for display
export function getSymbolEmoji(name: string): string {
  const emojis: Record<string, string> = {
    'Pharaoh': '👑',
    'Anubis': '🐺',
    'Horus': '🦅',
    'Scarab': '🪲',
    'Isis': '👸',
    'Ankh': '☥',
    'A': '🅰️',
    'K': '🎴',
    'Q': '👑',
    'Book': '📖',
  };
  return emojis[name] || '❓';
}
