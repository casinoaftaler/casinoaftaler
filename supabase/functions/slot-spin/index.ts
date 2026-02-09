import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Pay line patterns (5 reels, values represent row index 0-2)
const PAY_LINES = [
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

interface SlotSymbol {
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
  rarity: "premium" | "common" | "scatter";
  weight: number;
  bonus_weight: number;
  game_id: string;
}

interface LineWin {
  lineIndex: number;
  symbolId: string;
  count: number;
  payout: number;
}

interface SpinResult {
  grid: string[][];
  wins: LineWin[];
  totalWin: number;
  bonusTriggered: boolean;
  scatterCount: number;
}

interface BonusSpinResult extends SpinResult {
  expandedGrid: string[][];
  expandedReels: number[];
  isRetrigger: boolean;
  expandedReelSymbolIds?: Record<string, string>;
  expandingWinGroups?: Array<{ symbolId: string; reels: number[]; wins: LineWin[] }>;
}

const DEFAULT_SYMBOL_WEIGHT = 10;
const MAX_SPINS_CAP = 220;

// Secure random number generator
function secureRandom(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
}

function getRandomSymbol(
  symbols: SlotSymbol[],
  excludeIds: string[] = [],
  isBonusSpin: boolean = false
): SlotSymbol {
  const availableSymbols = symbols.filter((s) => !excludeIds.includes(s.id));
  const symbolPool =
    availableSymbols.length > 0 ? availableSymbols : symbols;

  const getWeight = (s: SlotSymbol) => {
    if (isBonusSpin) {
      return s.bonus_weight || s.weight || DEFAULT_SYMBOL_WEIGHT;
    }
    return s.weight || DEFAULT_SYMBOL_WEIGHT;
  };

  const totalWeight = symbolPool.reduce((sum, s) => sum + getWeight(s), 0);
  let random = secureRandom() * totalWeight;

  for (const symbol of symbolPool) {
    random -= getWeight(symbol);
    if (random <= 0) return symbol;
  }

  return symbolPool[symbolPool.length - 1];
}

function generateGrid(
  symbols: SlotSymbol[],
  isBonusSpin: boolean = false
): string[][] {
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

function countScatters(grid: string[][], symbols: SlotSymbol[]): number {
  const scatterSymbol = symbols.find((s) => s.is_scatter);
  if (!scatterSymbol) return 0;

  let count = 0;
  for (const column of grid) {
    for (const symbolId of column) {
      if (symbolId === scatterSymbol.id) count++;
    }
  }

  return count;
}

function checkLineWin(
  grid: string[][],
  linePattern: number[],
  symbols: SlotSymbol[],
  betAmount: number
): LineWin | null {
  const symbolsById = new Map(symbols.map((s) => [s.id, s]));

  const lineSymbols = linePattern.map((row, col) => grid[col][row]);
  const lineSymbolData = lineSymbols.map((id) => symbolsById.get(id));

  if (lineSymbolData.some((s) => !s)) {
    return null;
  }

  const validSymbols = lineSymbolData as SlotSymbol[];

  let baseSymbol = validSymbols.find((s) => !s.is_wild) || validSymbols[0];

  let count = 0;
  for (let i = 0; i < 5; i++) {
    const current = validSymbols[i];
    if (
      current.id === baseSymbol.id ||
      current.is_wild ||
      baseSymbol.is_wild
    ) {
      count++;
      if (baseSymbol.is_wild && !current.is_wild) {
        baseSymbol = current;
      }
    } else {
      break;
    }
  }

  const minMatches = baseSymbol.rarity === "premium" ? 2 : 3;

  if (count >= minMatches) {
    let multiplier = 0;
    if (count === 2 && baseSymbol.rarity === "premium") {
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

function calculateSpinResult(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number
): SpinResult {
  const wins: LineWin[] = [];

  for (const linePattern of PAY_LINES) {
    const win = checkLineWin(grid, linePattern, symbols, betAmount);
    if (win) {
      wins.push(win);
    }
  }

  const scatterCount = countScatters(grid, symbols);
  const bonusTriggered = scatterCount >= 3;

  const scatterSymbol = symbols.find((s) => s.is_scatter);
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

// Single expanding symbol (Book of Fedesvin)
function applyExpandingSymbol(
  grid: string[][],
  expandingSymbol: SlotSymbol,
  _symbols: SlotSymbol[]
): { expandedGrid: string[][]; expandedReels: number[] } {
  const expandedGrid = grid.map((col) => [...col]);
  const reelsWithExpanding: number[] = [];

  for (let col = 0; col < 5; col++) {
    const hasExpandingSymbol = grid[col].some(
      (symbolId) => symbolId === expandingSymbol.id
    );
    if (hasExpandingSymbol) {
      reelsWithExpanding.push(col);
    }
  }

  const minReelsForExpand = expandingSymbol.rarity === "premium" ? 2 : 3;

  if (reelsWithExpanding.length >= minReelsForExpand) {
    for (const col of reelsWithExpanding) {
      for (let row = 0; row < 3; row++) {
        expandedGrid[col][row] = expandingSymbol.id;
      }
    }
    return { expandedGrid, expandedReels: reelsWithExpanding };
  }

  return { expandedGrid: grid, expandedReels: [] };
}

// Multi-expanding symbol (Rise of Fedesvin)
// Each expanding symbol is evaluated INDEPENDENTLY based on its rarity:
// - Premium symbols expand if they appear on 2+ reels
// - Common symbols expand if they appear on 3+ reels
// If multiple qualifying symbols appear on the same reel, the one with the
// highest multiplier_5 is chosen to fill that reel.
function applyMultiExpandingSymbols(
  grid: string[][],
  expandingSymbols: SlotSymbol[],
): { expandedGrid: string[][]; expandedReels: number[]; expandedSymbolMap: Map<number, SlotSymbol> } {
  const expandedGrid = grid.map((col) => [...col]);
  const expandedSymbolMap = new Map<number, SlotSymbol>();

  // Step 1: For each expanding symbol, find which reels contain it
  const symbolReelPresence = new Map<string, number[]>();
  for (const expSym of expandingSymbols) {
    const reelsWithSymbol: number[] = [];
    for (let col = 0; col < 5; col++) {
      if (grid[col].some((id) => id === expSym.id)) {
        reelsWithSymbol.push(col);
      }
    }
    symbolReelPresence.set(expSym.id, reelsWithSymbol);
  }

  // Step 2: Determine which symbols qualify for expansion based on rarity
  const qualifyingExpansions = new Map<number, SlotSymbol[]>(); // reel -> qualifying symbols
  for (const expSym of expandingSymbols) {
    const reels = symbolReelPresence.get(expSym.id) || [];
    const minReels = expSym.rarity === "premium" ? 2 : 3;
    
    if (reels.length >= minReels) {
      // This symbol qualifies - mark all its reels
      for (const col of reels) {
        const existing = qualifyingExpansions.get(col) || [];
        existing.push(expSym);
        qualifyingExpansions.set(col, existing);
      }
    }
  }

  // Step 3: For each reel that has qualifying expansions, pick the best symbol
  const expandedReels: number[] = [];
  for (const [col, qualifyingSymbols] of qualifyingExpansions.entries()) {
    // Pick the symbol with the highest multiplier_5
    const bestSymbol = qualifyingSymbols.reduce((best, s) =>
      s.multiplier_5 > best.multiplier_5 ? s : best
    );
    expandedReels.push(col);
    expandedSymbolMap.set(col, bestSymbol);
  }

  // Sort expanded reels for consistent ordering
  expandedReels.sort((a, b) => a - b);

  if (expandedReels.length > 0) {
    for (const col of expandedReels) {
      const sym = expandedSymbolMap.get(col)!;
      for (let row = 0; row < 3; row++) {
        expandedGrid[col][row] = sym.id;
      }
    }
    return { expandedGrid, expandedReels, expandedSymbolMap };
  }

  return { expandedGrid: grid, expandedReels: [], expandedSymbolMap: new Map() };
}

function calculateBonusWins(
  expandedGrid: string[][],
  expandedReels: number[],
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbol: SlotSymbol
): LineWin[] {
  const wins: LineWin[] = [];
  const minReelsForScatterPay = expandingSymbol.rarity === "premium" ? 2 : 3;

  if (expandedReels.length >= minReelsForScatterPay) {
    const reelCount = expandedReels.length;
    let multiplier = 0;
    if (reelCount === 2 && expandingSymbol.rarity === "premium") {
      multiplier = expandingSymbol.multiplier_2;
    } else if (reelCount === 3) {
      multiplier = expandingSymbol.multiplier_3;
    } else if (reelCount === 4) {
      multiplier = expandingSymbol.multiplier_4;
    } else if (reelCount === 5) {
      multiplier = expandingSymbol.multiplier_5;
    }

    for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
      wins.push({
        lineIndex,
        symbolId: expandingSymbol.id,
        count: reelCount,
        payout: multiplier * betAmount,
      });
    }
    return wins;
  }

  // Standard win calculation for non-expanding wins
  const symbolsById = new Map(symbols.map((s) => [s.id, s]));
  
  for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
    const linePattern = PAY_LINES[lineIndex];
    const lineSymbols = linePattern.map((row, col) => expandedGrid[col][row]);
    const lineSymbolData = lineSymbols.map((id) => symbolsById.get(id));

    if (lineSymbolData.some((s) => !s)) continue;

    const validSymbols = lineSymbolData as SlotSymbol[];
    let baseSymbol = validSymbols[0];
    
    if (baseSymbol.is_scatter) {
      const nonScatter = validSymbols.find((s) => !s.is_scatter);
      if (nonScatter) baseSymbol = nonScatter;
    }

    let count = 0;
    for (let i = 0; i < 5; i++) {
      const current = validSymbols[i];
      if (current.id === baseSymbol.id || current.is_scatter) {
        count++;
      } else {
        break;
      }
    }

    const minMatches = baseSymbol.rarity === "premium" ? 2 : 3;

    if (count >= minMatches) {
      let multiplier = 0;
      if (count === 2 && baseSymbol.rarity === "premium") {
        multiplier = baseSymbol.multiplier_2;
      } else if (count === 3) {
        multiplier = baseSymbol.multiplier_3;
      } else if (count === 4) {
        multiplier = baseSymbol.multiplier_4;
      } else if (count === 5) {
        multiplier = baseSymbol.multiplier_5;
      }

      if (multiplier > 0) {
        wins.push({
          lineIndex,
          symbolId: baseSymbol.id,
          count,
          payout: multiplier * betAmount,
        });
      }
    }
  }

  return wins;
}

// Multi-expanding bonus wins: calculate for each expanding symbol group independently
function calculateMultiExpandingBonusWins(
  expandedGrid: string[][],
  expandedReels: number[],
  expandedSymbolMap: Map<number, SlotSymbol>,
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbols: SlotSymbol[]
): LineWin[] {
  if (expandedReels.length === 0) {
    // No expansion - use standard line wins on original grid
    return calculateStandardLineWins(expandedGrid, symbols, betAmount);
  }

  // Group expanded reels by symbol
  const symbolReelGroups = new Map<string, number[]>();
  for (const col of expandedReels) {
    const sym = expandedSymbolMap.get(col)!;
    const existing = symbolReelGroups.get(sym.id) || [];
    existing.push(col);
    symbolReelGroups.set(sym.id, existing);
  }

  const wins: LineWin[] = [];
  const processedLines = new Set<number>();

  // For each expanding symbol group, check if they form valid wins
  for (const [symbolId, reels] of symbolReelGroups.entries()) {
    const sym = expandingSymbols.find((s) => s.id === symbolId);
    if (!sym) continue;

    const minReels = sym.rarity === "premium" ? 2 : 3;
    if (reels.length >= minReels) {
      // All-reels expanding win: every pay line wins
      let multiplier = 0;
      if (reels.length === 2 && sym.rarity === "premium") multiplier = sym.multiplier_2;
      else if (reels.length === 3) multiplier = sym.multiplier_3;
      else if (reels.length === 4) multiplier = sym.multiplier_4;
      else if (reels.length === 5) multiplier = sym.multiplier_5;

      if (multiplier > 0) {
        for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
          if (!processedLines.has(lineIndex)) {
            wins.push({
              lineIndex,
              symbolId: sym.id,
              count: reels.length,
              payout: multiplier * betAmount,
            });
            processedLines.add(lineIndex);
          }
        }
      }
    }
  }

  // For lines not covered by expanding wins, check standard wins
  if (processedLines.size < PAY_LINES.length) {
    const standardWins = calculateStandardLineWins(expandedGrid, symbols, betAmount);
    for (const win of standardWins) {
      if (!processedLines.has(win.lineIndex)) {
        wins.push(win);
      }
    }
  }

  return wins;
}

function calculateStandardLineWins(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number
): LineWin[] {
  const wins: LineWin[] = [];
  const symbolsById = new Map(symbols.map((s) => [s.id, s]));

  for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
    const linePattern = PAY_LINES[lineIndex];
    const lineSymbols = linePattern.map((row, col) => grid[col][row]);
    const lineSymbolData = lineSymbols.map((id) => symbolsById.get(id));

    if (lineSymbolData.some((s) => !s)) continue;

    const validSymbols = lineSymbolData as SlotSymbol[];
    let baseSymbol = validSymbols.find((s) => !s.is_wild && !s.is_scatter) || validSymbols[0];

    let count = 0;
    for (let i = 0; i < 5; i++) {
      const current = validSymbols[i];
      if (current.id === baseSymbol.id || current.is_wild || current.is_scatter) {
        count++;
        if ((baseSymbol.is_wild || baseSymbol.is_scatter) && !current.is_wild && !current.is_scatter) {
          baseSymbol = current;
        }
      } else {
        break;
      }
    }

    const minMatches = baseSymbol.rarity === "premium" ? 2 : 3;
    if (count >= minMatches) {
      let multiplier = 0;
      if (count === 2 && baseSymbol.rarity === "premium") multiplier = baseSymbol.multiplier_2;
      else if (count === 3) multiplier = baseSymbol.multiplier_3;
      else if (count === 4) multiplier = baseSymbol.multiplier_4;
      else if (count === 5) multiplier = baseSymbol.multiplier_5;

      if (multiplier > 0) {
        wins.push({ lineIndex, symbolId: baseSymbol.id, count, payout: multiplier * betAmount });
      }
    }
  }

  return wins;
}

function getWeightedRandomSymbol(symbols: SlotSymbol[]): SlotSymbol {
  const getWeight = (s: SlotSymbol) =>
    s.bonus_weight || s.weight || DEFAULT_SYMBOL_WEIGHT;
  const totalWeight = symbols.reduce((sum, s) => sum + getWeight(s), 0);
  let random = secureRandom() * totalWeight;

  for (const symbol of symbols) {
    random -= getWeight(symbol);
    if (random <= 0) return symbol;
  }

  return symbols[symbols.length - 1];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    // Validate user
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;

    // Parse request body
    const body = await req.json();
    const { bet, sessionId, isBonusSpin, gameId: rawGameId } = body;
    const gameId = rawGameId || "book-of-fedesvin";

    console.log(`[slot-spin] gameId=${gameId}, bet=${bet}, isBonusSpin=${isBonusSpin}, userId=${userId}`);

    // Validate bet amount
    if (typeof bet !== "number" || bet < 1 || bet > 100 || !Number.isInteger(bet)) {
      return new Response(
        JSON.stringify({ error: "Invalid bet amount" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parallelize independent reads: session, symbols, profile, settings
    const [sessionRes, symbolsRes, profileRes, settingsRes] = await Promise.all([
      supabase
        .from("slot_active_sessions")
        .select("session_id")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("slot_symbols")
        .select("*")
        .eq("game_id", gameId)
        .order("position"),
      supabase
        .from("profiles")
        .select("bonus_spins_permanent")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("site_settings")
        .select("value")
        .eq("key", "slot_daily_spins")
        .maybeSingle(),
    ]);

    // Validate session (anti-multi-device)
    const sessionData = sessionRes.data;
    if (sessionData && sessionData.session_id !== sessionId) {
      return new Response(
        JSON.stringify({ error: "Session blocked - active on another device" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate symbols
    const symbols = symbolsRes.data;
    const symbolsError = symbolsRes.error;
    if (symbolsError || !symbols || symbols.length === 0) {
      console.error(`[slot-spin] Failed to load symbols for gameId=${gameId}:`, symbolsError);
      return new Response(
        JSON.stringify({ error: "Failed to load symbols" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isRiseOfFedesvin = gameId === "rise-of-fedesvin";

    // Handle bonus spin (symbols already loaded from parallel fetch above)
    if (isBonusSpin) {
      // Get bonus state filtered by game_id
      const { data: bonusData, error: bonusError } = await supabase
        .from("slot_bonus_state")
        .select("*")
        .eq("user_id", userId)
        .eq("game_id", gameId)
        .maybeSingle();

      if (bonusError || !bonusData || !bonusData.is_active || bonusData.free_spins_remaining <= 0) {
        return new Response(
          JSON.stringify({ error: "No active bonus or no free spins remaining" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Generate grid with bonus weights
      const originalGrid = generateGrid(symbols, true);
      
      // Count scatters for retrigger
      const scatterCount = countScatters(originalGrid, symbols);
      const isRetrigger = scatterCount >= 3;

      let expandedGrid: string[][];
      let expandedReels: number[];
      let wins: LineWin[];
      let newExpandingSymbolIds = bonusData.expanding_symbol_ids || [];
      let newExpandingSymbolNames = bonusData.expanding_symbol_names || [];
      let expandedReelSymbolIds: Record<string, string> | undefined;
      let expandingWinGroups: Array<{ symbolId: string; reels: number[]; wins: LineWin[] }> | undefined;

      if (isRiseOfFedesvin) {
        // ===== RISE OF FEDESVIN: Multi-expanding symbol logic =====
        
        // Handle retrigger: pick a NEW expanding symbol
        if (isRetrigger) {
          const currentExpandingIds: string[] = newExpandingSymbolIds;
          const eligibleForNew = symbols.filter(
            (s: SlotSymbol) => !s.is_scatter && !currentExpandingIds.includes(s.id)
          );
          
          if (eligibleForNew.length > 0) {
            const newExpandSym = getWeightedRandomSymbol(eligibleForNew);
            newExpandingSymbolIds = [...currentExpandingIds, newExpandSym.id];
            newExpandingSymbolNames = [...(bonusData.expanding_symbol_names || []), newExpandSym.name];
            console.log(`[slot-spin] Rise retrigger: added new expanding symbol ${newExpandSym.name} (${newExpandSym.id})`);
          }
        }

        // Resolve all expanding symbols from IDs
        const expandingSymbols = newExpandingSymbolIds
          .map((id: string) => symbols.find((s: SlotSymbol) => s.id === id))
          .filter(Boolean) as SlotSymbol[];

        if (expandingSymbols.length === 0) {
          // Fallback: use single symbol if array is empty (shouldn't happen)
          const fallback = symbols.find((s: SlotSymbol) => s.id === bonusData.expanding_symbol_id);
          if (fallback) expandingSymbols.push(fallback);
        }

        // Apply multi-expanding
        const multiResult = applyMultiExpandingSymbols(originalGrid, expandingSymbols);
        expandedGrid = multiResult.expandedGrid;
        expandedReels = multiResult.expandedReels;

        // Calculate wins with multi-expanding logic
        wins = calculateMultiExpandingBonusWins(
          expandedGrid,
          expandedReels,
          multiResult.expandedSymbolMap,
          symbols,
          bet,
          expandingSymbols
        );

        // Build per-reel symbol mapping and win groups for sequential animation
        expandedReelSymbolIds = {};
        expandingWinGroups = [];

        if (expandedReels.length > 0) {
          // Map each reel to its expanding symbol ID
          for (const col of expandedReels) {
            const sym = multiResult.expandedSymbolMap.get(col);
            if (sym) {
              expandedReelSymbolIds[String(col)] = sym.id;
            }
          }

          // Group reels by symbol
          const symbolReelGroups = new Map<string, number[]>();
          for (const col of expandedReels) {
            const sym = multiResult.expandedSymbolMap.get(col);
            if (sym) {
              const existing = symbolReelGroups.get(sym.id) || [];
              existing.push(col);
              symbolReelGroups.set(sym.id, existing);
            }
          }

          // Build win groups per expanding symbol
          for (const [symId, reels] of symbolReelGroups.entries()) {
            const symbolWins = wins.filter(w => w.symbolId === symId);
            expandingWinGroups.push({ symbolId: symId, reels, wins: symbolWins });
          }

          console.log(`[slot-spin] Rise expanding win groups: ${expandingWinGroups.length} groups, reelSymbolIds:`, expandedReelSymbolIds);
        }
      } else {
        // ===== BOOK OF FEDESVIN: Single expanding symbol (original logic) =====
        const expandingSymbol = symbols.find((s: SlotSymbol) => s.id === bonusData.expanding_symbol_id);
        if (!expandingSymbol) {
          return new Response(
            JSON.stringify({ error: "Expanding symbol not found" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const singleResult = applyExpandingSymbol(originalGrid, expandingSymbol, symbols);
        expandedGrid = singleResult.expandedGrid;
        expandedReels = singleResult.expandedReels;

        wins = calculateBonusWins(expandedGrid, expandedReels, symbols, bet, expandingSymbol);
      }

      // Calculate scatter payout
      const scatterSymbol = symbols.find((s: SlotSymbol) => s.is_scatter);
      let scatterPayout = 0;
      if (scatterSymbol && scatterCount >= 3) {
        if (scatterCount === 3) scatterPayout = scatterSymbol.multiplier_3 * bet;
        else if (scatterCount === 4) scatterPayout = scatterSymbol.multiplier_4 * bet;
        else if (scatterCount === 5) scatterPayout = scatterSymbol.multiplier_5 * bet;
      }

      const totalWin = wins.reduce((sum, w) => sum + w.payout, 0) + scatterPayout;

      // Update bonus state in database
      const newFreeSpins = isRetrigger 
        ? bonusData.free_spins_remaining - 1 + 10 
        : bonusData.free_spins_remaining - 1;
      
      const newTotalFreeSpins = isRetrigger 
        ? bonusData.total_free_spins + 10 
        : bonusData.total_free_spins;

      const newBonusWinnings = Number(bonusData.bonus_winnings) + totalWin;

      const updatePayload: Record<string, unknown> = {
        free_spins_remaining: newFreeSpins,
        total_free_spins: newTotalFreeSpins,
        bonus_winnings: newBonusWinnings,
      };

      // For Rise: update expanding arrays on retrigger
      if (isRiseOfFedesvin && isRetrigger) {
        updatePayload.expanding_symbol_ids = newExpandingSymbolIds;
        updatePayload.expanding_symbol_names = newExpandingSymbolNames;
        // Keep single field in sync with first symbol for backward compat
        if (newExpandingSymbolIds.length > 0) {
          updatePayload.expanding_symbol_id = newExpandingSymbolIds[0];
          updatePayload.expanding_symbol_name = newExpandingSymbolNames[0];
        }
      }

      await supabase
        .from("slot_bonus_state")
        .update(updatePayload)
        .eq("user_id", userId)
        .eq("game_id", gameId);

      const result: BonusSpinResult = {
        grid: originalGrid,
        expandedGrid,
        expandedReels,
        wins,
        totalWin,
        bonusTriggered: isRetrigger,
        scatterCount,
        isRetrigger,
        expandedReelSymbolIds,
        expandingWinGroups,
      };

      // Build bonus state response
      const bonusStateResponse: Record<string, unknown> = {
        freeSpinsRemaining: newFreeSpins,
        totalFreeSpins: newTotalFreeSpins,
        bonusWinnings: newBonusWinnings,
        expandingSymbolId: bonusData.expanding_symbol_id,
        expandingSymbolName: bonusData.expanding_symbol_name,
      };

      if (isRiseOfFedesvin) {
        bonusStateResponse.expandingSymbolIds = newExpandingSymbolIds;
        bonusStateResponse.expandingSymbolNames = newExpandingSymbolNames;
      }

      return new Response(
        JSON.stringify({
          success: true,
          result,
          bonusState: bonusStateResponse,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Normal spin - validate spins remaining
    const today = new Date().toISOString().split("T")[0];
    
    // Profile and settings already fetched in parallel above
    const bonusSpinsPermanent = profileRes.data?.bonus_spins_permanent || 0;
    const dailySpins = parseInt(settingsRes.data?.value || "100", 10);
    const maxSpins = Math.min(dailySpins + bonusSpinsPermanent, MAX_SPINS_CAP);

    // Get or create today's spin record (shared across games)
    // Use upsert with conflict handling to prevent race conditions
    // when multiple requests try to create the same daily record simultaneously
    const { error: upsertError } = await supabase
      .from("slot_spins")
      .upsert(
        {
          user_id: userId,
          date: today,
          spins_remaining: maxSpins,
        },
        {
          onConflict: "user_id,date",
          ignoreDuplicates: true, // Don't overwrite if record already exists
        }
      );

    if (upsertError) {
      console.error("Upsert error:", upsertError);
      return new Response(
        JSON.stringify({ error: "Failed to initialize spins" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Now fetch the record (guaranteed to exist after upsert)
    const { data: spinsData, error: fetchError } = await supabase
      .from("slot_spins")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .single();

    if (fetchError || !spinsData) {
      console.error("Failed to fetch spins after upsert:", fetchError);
      return new Response(
        JSON.stringify({ error: "Failed to read spins data" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate user has enough spins
    if (spinsData.spins_remaining < bet) {
      return new Response(
        JSON.stringify({ error: "Not enough spins remaining" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate spin result
    const grid = generateGrid(symbols, false);
    const result = calculateSpinResult(grid, symbols, bet);

    // Deduct spins (atomic update)
    const { error: updateError } = await supabase
      .from("slot_spins")
      .update({ spins_remaining: spinsData.spins_remaining - bet })
      .eq("id", spinsData.id)
      .eq("spins_remaining", spinsData.spins_remaining); // Optimistic locking

    if (updateError) {
      return new Response(
        JSON.stringify({ error: "Failed to update spins - please retry" }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If bonus triggered, create bonus state
    let bonusState = null;
    if (result.bonusTriggered) {
      const eligibleSymbols = symbols.filter((s: SlotSymbol) => !s.is_scatter);
      const expandingSymbol = getWeightedRandomSymbol(eligibleSymbols);

      const bonusInsert: Record<string, unknown> = {
        user_id: userId,
        is_active: true,
        free_spins_remaining: 10,
        total_free_spins: 10,
        expanding_symbol_id: expandingSymbol.id,
        expanding_symbol_name: expandingSymbol.name,
        bonus_winnings: 0,
        game_id: gameId,
      };

      // For Rise of Fedesvin, also set the arrays
      if (isRiseOfFedesvin) {
        bonusInsert.expanding_symbol_ids = [expandingSymbol.id];
        bonusInsert.expanding_symbol_names = [expandingSymbol.name];
      }

      // Fire-and-forget: delete existing bonus state then insert new one
      supabase
        .from("slot_bonus_state")
        .delete()
        .eq("user_id", userId)
        .eq("game_id", gameId)
        .then(() => supabase.from("slot_bonus_state").insert(bonusInsert))
        .catch((err: unknown) => console.error("[slot-spin] Fire-and-forget bonus state write failed:", err));

      bonusState = {
        isActive: true,
        freeSpinsRemaining: 10,
        totalFreeSpins: 10,
        expandingSymbolId: expandingSymbol.id,
        expandingSymbolName: expandingSymbol.name,
        bonusWinnings: 0,
      } as Record<string, unknown>;

      if (isRiseOfFedesvin) {
        bonusState.expandingSymbolIds = [expandingSymbol.id];
        bonusState.expandingSymbolNames = [expandingSymbol.name];
      }
    }

    // Fire-and-forget: record game result (analytics only)
    supabase.from("slot_game_results").insert({
      user_id: userId,
      bet_amount: bet,
      win_amount: result.totalWin,
      is_bonus_triggered: result.bonusTriggered,
      bonus_win_amount: 0,
      game_id: gameId,
    }).then(() => {}).catch((err: unknown) => console.error("[slot-spin] Fire-and-forget game result insert failed:", err));

    return new Response(
      JSON.stringify({
        success: true,
        result,
        spinsRemaining: spinsData.spins_remaining - bet,
        maxSpins,
        bonusState,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Spin error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
