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
  multiplier_3: number;
  multiplier_4: number;
  multiplier_5: number;
  is_scatter: boolean;
  is_wild: boolean;
  position: number;
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

// Symbol weights for RNG (higher = more common)
export const SYMBOL_WEIGHTS: Record<string, number> = {
  'Pharaoh': 5,
  'Anubis': 8,
  'Horus': 10,
  'Scarab': 15,
  'Isis': 15,
  'Ankh': 20,
  'A': 25,
  'K': 30,
  'Q': 35,
  'Book': 12, // Scatter/Wild - slightly rarer
};

export function getRandomSymbol(symbols: SlotSymbol[]): SlotSymbol {
  const totalWeight = symbols.reduce((sum, s) => sum + (SYMBOL_WEIGHTS[s.name] || 10), 0);
  let random = Math.random() * totalWeight;
  
  for (const symbol of symbols) {
    random -= SYMBOL_WEIGHTS[symbol.name] || 10;
    if (random <= 0) return symbol;
  }
  
  return symbols[symbols.length - 1];
}

export function generateGrid(symbols: SlotSymbol[]): string[][] {
  const grid: string[][] = [];
  
  for (let col = 0; col < 5; col++) {
    const column: string[] = [];
    for (let row = 0; row < 3; row++) {
      column.push(getRandomSymbol(symbols).id);
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
  const lineSymbolData = lineSymbols.map(id => symbolsById.get(id)!);
  
  // Find the first non-wild symbol (or wild if all wilds)
  let baseSymbol = lineSymbolData.find(s => !s.is_wild) || lineSymbolData[0];
  
  // Count consecutive matching symbols from left
  let count = 0;
  for (let i = 0; i < 5; i++) {
    const current = lineSymbolData[i];
    if (current.id === baseSymbol.id || current.is_wild || baseSymbol.is_wild) {
      count++;
      if (baseSymbol.is_wild && !current.is_wild) {
        baseSymbol = current; // Update base if we started with wild
      }
    } else {
      break;
    }
  }
  
  if (count >= 3) {
    let multiplier = 0;
    if (count === 3) multiplier = baseSymbol.multiplier_3;
    else if (count === 4) multiplier = baseSymbol.multiplier_4;
    else if (count === 5) multiplier = baseSymbol.multiplier_5;
    
    return {
      lineIndex: PAY_LINES.indexOf(linePattern),
      symbolId: baseSymbol.id,
      count,
      payout: multiplier * betAmount,
    };
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
