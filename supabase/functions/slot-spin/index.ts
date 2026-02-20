import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================
// Module-level cache (survives across requests in same Deno instance)
// Eliminates repeated DB calls for static data like symbols/settings
// ============================================================
interface CacheEntry<T> { data: T; fetchedAt: number; }
const symbolsCache = new Map<string, CacheEntry<unknown[]>>();
const settingsCache = new Map<string, CacheEntry<number>>();
const SYMBOL_CACHE_TTL_MS = 5 * 60 * 1000;
const SETTINGS_CACHE_TTL_MS = 5 * 60 * 1000;

// Singleton service client (avoids re-creating TCP connections on every request)
let _serviceClient: ReturnType<typeof createClient> | null = null;
function getServiceClient() {
  if (!_serviceClient) {
    _serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
  }
  return _serviceClient;
}

// Decode JWT locally — no network round-trip to validate user
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload));
  } catch { return null; }
}

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
    const SUBSCRIBER_MAX_SPINS_CAP = 320;
    const SUBSCRIBER_BONUS = 100;
    const ABSOLUTE_MAX_CREDITS = 1000;

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
// Returns BOTH a merged expandedGrid (for visual display) AND independent
// per-symbol reel lists (for win calculation without conflict resolution).
function applyMultiExpandingSymbols(
  grid: string[][],
  expandingSymbols: SlotSymbol[],
): { 
  expandedGrid: string[][]; 
  expandedReels: number[]; 
  expandedSymbolMap: Map<number, SlotSymbol>;
  independentSymbolReels: Map<string, number[]>;
  qualifyingSymbolIds: string[];
} {
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
  // Track INDEPENDENT reels per symbol (no conflict resolution -- for win calculation)
  const independentSymbolReels = new Map<string, number[]>();
  const qualifyingSymbolIds: string[] = [];
  
  const qualifyingExpansions = new Map<number, SlotSymbol[]>(); // reel -> qualifying symbols (for merged grid)
  for (const expSym of expandingSymbols) {
    const reels = symbolReelPresence.get(expSym.id) || [];
    const minReels = expSym.rarity === "premium" ? 2 : 3;
    
    if (reels.length >= minReels) {
      // This symbol qualifies -- store its independent reel list
      independentSymbolReels.set(expSym.id, [...reels]);
      qualifyingSymbolIds.push(expSym.id);
      
      // Also mark for merged grid conflict resolution
      for (const col of reels) {
        const existing = qualifyingExpansions.get(col) || [];
        existing.push(expSym);
        qualifyingExpansions.set(col, existing);
      }
    }
  }

  // Step 3: For each reel that has qualifying expansions, pick the best symbol (for MERGED grid only)
  const expandedReels: number[] = [];
  for (const [col, qualifyingSymbols] of qualifyingExpansions.entries()) {
    const bestSymbol = qualifyingSymbols.reduce((best, s) =>
      s.multiplier_5 > best.multiplier_5 ? s : best
    );
    expandedReels.push(col);
    expandedSymbolMap.set(col, bestSymbol);
  }

  expandedReels.sort((a, b) => a - b);

  if (expandedReels.length > 0) {
    for (const col of expandedReels) {
      const sym = expandedSymbolMap.get(col)!;
      for (let row = 0; row < 3; row++) {
        expandedGrid[col][row] = sym.id;
      }
    }
    return { expandedGrid, expandedReels, expandedSymbolMap, independentSymbolReels, qualifyingSymbolIds };
  }

  return { expandedGrid: grid, expandedReels: [], expandedSymbolMap: new Map(), independentSymbolReels: new Map(), qualifyingSymbolIds: [] };
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

// Multi-expanding bonus wins: calculate for each expanding symbol group INDEPENDENTLY
// Each symbol group gets its own partial grid and pays on ALL 10 lines independently.
// No processedLines guard -- groups don't compete for lines.
function calculateMultiExpandingBonusWins(
  originalGrid: string[][],
  expandedReels: number[],
  _expandedSymbolMap: Map<number, SlotSymbol>,
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbols: SlotSymbol[],
  independentSymbolReels: Map<string, number[]>,
  qualifyingSymbolIds: string[]
): LineWin[] {
  if (expandedReels.length === 0) {
    // No expansion - use standard line wins on original grid
    return calculateStandardLineWins(originalGrid, symbols, betAmount);
  }

  const wins: LineWin[] = [];

  // First: calculate standard "connecting" line wins on the ORIGINAL grid
  // (before any expansion). These are non-expanding payline wins that should
  // be shown before the expanding animation.
  const connectingWins = calculateStandardLineWins(originalGrid, symbols, betAmount);
  // Tag connecting wins so client can distinguish them
  for (const cw of connectingWins) {
    wins.push(cw);
  }

  // Then: for each qualifying expanding symbol, calculate wins independently on its OWN partial grid
  for (const symbolId of qualifyingSymbolIds) {
    const sym = expandingSymbols.find((s) => s.id === symbolId);
    if (!sym) continue;

    const reels = independentSymbolReels.get(symbolId) || [];
    const minReels = sym.rarity === "premium" ? 2 : 3;
    if (reels.length < minReels) continue;

    // Each group pays on ALL 10 lines based on its own reel count
    let multiplier = 0;
    if (reels.length === 2 && sym.rarity === "premium") multiplier = sym.multiplier_2;
    else if (reels.length === 3) multiplier = sym.multiplier_3;
    else if (reels.length === 4) multiplier = sym.multiplier_4;
    else if (reels.length === 5) multiplier = sym.multiplier_5;

    if (multiplier > 0) {
      for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
        wins.push({
          lineIndex,
          symbolId: sym.id,
          count: reels.length,
          payout: multiplier * betAmount,
        });
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

    // Decode JWT locally — no network round-trip needed
    const token = authHeader.replace("Bearer ", "");
    const claims = decodeJwtPayload(token);
    if (!claims?.sub || typeof claims.sub !== "string") {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (claims.exp && typeof claims.exp === "number" && claims.exp < Date.now() / 1000) {
      return new Response(
        JSON.stringify({ error: "Token expired" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const userId = claims.sub;

    // Use singleton service client (avoids creating new TCP connections)
    const serviceClient = getServiceClient();

    // Parse request body
    const body = await req.json();
    let { bet, sessionId, isBonusSpin, gameId: rawGameId } = body;
    const gameId = rawGameId || "book-of-fedesvin";

    console.log(`[slot-spin] gameId=${gameId}, bet=${bet}, isBonusSpin=${isBonusSpin}, userId=${userId}`);

    // Validate bet amount
    if (typeof bet !== "number" || bet < 1 || bet > 100 || !Number.isInteger(bet)) {
      return new Response(
        JSON.stringify({ error: "Invalid bet amount" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get symbols from module-level cache (eliminates DB call for warm instances)
    let symbols: SlotSymbol[];
    const symCached = symbolsCache.get(gameId);
    if (symCached && Date.now() - symCached.fetchedAt < SYMBOL_CACHE_TTL_MS) {
      symbols = symCached.data as SlotSymbol[];
    } else {
      const { data: fetchedSymbols, error: symErr } = await serviceClient
        .from("slot_symbols").select("*").eq("game_id", gameId).order("position");
      if (symErr || !fetchedSymbols || fetchedSymbols.length === 0) {
        return new Response(JSON.stringify({ error: "Failed to load symbols" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      symbols = fetchedSymbols as SlotSymbol[];
      symbolsCache.set(gameId, { data: symbols, fetchedAt: Date.now() });
    }

    // Get daily spins setting from cache (eliminates DB call for warm instances)
    let dailySpinsValue: number;
    const settingsCached = settingsCache.get("slot_daily_spins");
    if (settingsCached && Date.now() - settingsCached.fetchedAt < SETTINGS_CACHE_TTL_MS) {
      dailySpinsValue = settingsCached.data;
    } else {
      const { data: sd } = await serviceClient
        .from("site_settings").select("value").eq("key", "slot_daily_spins").maybeSingle();
      dailySpinsValue = parseInt(sd?.value || "200", 10);
      settingsCache.set("slot_daily_spins", { data: dailySpinsValue, fetchedAt: Date.now() });
    }

    // Parallelize ALL per-user reads: session check + profile + bonus state
    const [sessionRes, profileRes, bonusRes] = await Promise.all([
      serviceClient
        .from("slot_active_sessions")
        .select("session_id")
        .eq("user_id", userId)
        .maybeSingle(),
      serviceClient
        .from("profiles")
        .select("bonus_spins_permanent, twitch_badges")
        .eq("user_id", userId)
        .maybeSingle(),
      // Pre-fetch bonus state (used only for bonus spins, but avoids sequential read)
      isBonusSpin
        ? serviceClient
            .from("slot_bonus_state")
            .select("*")
            .eq("user_id", userId)
            .eq("game_id", gameId)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ]);

    // Validate session (anti-multi-device)
    const sessionData = sessionRes.data;
    if (sessionData && sessionData.session_id !== sessionId) {
      return new Response(
        JSON.stringify({ error: "Session blocked - active on another device" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isRiseOfFedesvin = gameId === "rise-of-fedesvin";



    // Handle bonus spin (bonus state already fetched in parallel above)
    if (isBonusSpin) {
      const bonusData = bonusRes.data;
      const bonusError = bonusRes.error;

      if (bonusError || !bonusData || !bonusData.is_active || bonusData.free_spins_remaining <= 0) {
        return new Response(
          JSON.stringify({ error: "No active bonus or no free spins remaining" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Use the locked-in bet from bonus trigger, not the client-sent value
      const lockedBet = Number(bonusData.bet_amount);
      if (lockedBet > 0 && lockedBet !== bet) {
        console.log(`[slot-spin] Bonus bet override: client sent bet=${bet}, using locked bet=${lockedBet} from DB`);
      }
      bet = lockedBet > 0 ? lockedBet : bet;

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

        // Calculate wins with multi-expanding logic using INDEPENDENT reels per symbol
        wins = calculateMultiExpandingBonusWins(
          originalGrid,
          expandedReels,
          multiResult.expandedSymbolMap,
          symbols,
          bet,
          expandingSymbols,
          multiResult.independentSymbolReels,
          multiResult.qualifyingSymbolIds
        );

        // Build per-reel symbol mapping and win groups for sequential animation
        expandedReelSymbolIds = {};
        expandingWinGroups = [];

        if (expandedReels.length > 0) {
          // Map each reel to its expanding symbol ID (for merged grid display)
          for (const col of expandedReels) {
            const sym = multiResult.expandedSymbolMap.get(col);
            if (sym) {
              expandedReelSymbolIds[String(col)] = sym.id;
            }
          }

          // Build win groups using INDEPENDENT per-symbol reels (not conflict-resolved)
          for (const symId of multiResult.qualifyingSymbolIds) {
            const reels = multiResult.independentSymbolReels.get(symId) || [];
            const symbolWins = wins.filter(w => w.symbolId === symId);
            if (symbolWins.length > 0) {
              expandingWinGroups.push({ symbolId: symId, reels, wins: symbolWins });
            }
          }

          console.log(`[slot-spin] Rise expanding win groups: ${expandingWinGroups.length} groups, independent reels:`,
            Object.fromEntries(multiResult.independentSymbolReels));
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

      await serviceClient
        .from("slot_bonus_state")
        .update(updatePayload)
        .eq("user_id", userId)
        .eq("game_id", gameId);

      // Record bonus result server-side when bonus just ended - fire-and-forget
      if (newFreeSpins <= 0 && newBonusWinnings > 0) {
        const bonusNowISO = new Date().toISOString();
        const capturedWinnings = newBonusWinnings;
        const capturedBet = bet;

        (async () => {
          try {
            const { data: participations } = await serviceClient
              .from("tournament_participants")
              .select("tournament_id")
              .eq("user_id", userId);

            let skipBonusGlobal = false;

            if (participations && participations.length > 0) {
              const participatingIds = participations.map((p: { tournament_id: string }) => p.tournament_id);

              const [{ data: activeTournaments }, { data: allEntries }] = await Promise.all([
                serviceClient
                  .from("tournaments")
                  .select("id, exclude_from_global_leaderboard, max_credits, max_bet")
                  .in("id", participatingIds)
                  .contains("game_ids", [gameId])
                  .lte("starts_at", bonusNowISO)
                  .gte("ends_at", bonusNowISO),
                serviceClient
                  .from("tournament_entries")
                  .select("tournament_id, total_credits_used")
                  .in("tournament_id", participatingIds)
                  .eq("user_id", userId),
              ]);

              if (activeTournaments && activeTournaments.length > 0) {
                await Promise.all(activeTournaments.map(async (t) => {
                  // Enforce max_bet: skip tournament entry if bet exceeds max_bet
                  if (t.max_bet && capturedBet > t.max_bet) {
                    console.log(`[slot-spin] Bonus bet ${capturedBet} exceeds tournament max_bet ${t.max_bet} - skipping tournament entry`);
                    return;
                  }

                  if (t.exclude_from_global_leaderboard) {
                    if (t.max_credits) {
                      const totalUsed = (allEntries || [])
                        .filter((e: { tournament_id: string }) => e.tournament_id === t.id)
                        .reduce((sum: number, e: { total_credits_used: number }) => sum + Number(e.total_credits_used || 0), 0);
                      if (totalUsed + capturedBet <= t.max_credits) skipBonusGlobal = true;
                    } else {
                      skipBonusGlobal = true;
                    }
                  }

                  const { error: bonusUpsertErr } = await serviceClient.rpc("upsert_tournament_entry", {
                    p_tournament_id: t.id,
                    p_user_id: userId,
                    p_game_id: gameId,
                    p_points: capturedWinnings,
                    p_bet: capturedBet,
                    p_is_bonus: true,
                  });
                  if (bonusUpsertErr) {
                    console.error("[slot-spin] Tournament bonus entry upsert failed:", JSON.stringify(bonusUpsertErr));
                  }
                }));
              }
            }

            if (!skipBonusGlobal) {
              await serviceClient.from("slot_game_results").insert({
                user_id: userId,
                bet_amount: capturedBet,
                win_amount: 0,
                is_bonus_triggered: false,
                bonus_win_amount: capturedWinnings,
                game_id: gameId,
              });
            }
          } catch (err) {
            console.error("[slot-spin] Bonus background processing failed:", err);
          }
        })();
      }

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
        betAmount: bet,
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

    // Normal spin - use atomic RPC for spin deduction
    // Use Danish timezone (Europe/Copenhagen) for date boundary
    const now = new Date();
    const todayParts = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Copenhagen",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
    const today = todayParts;
    
    // Profile and settings already fetched/cached above
    const bonusSpinsPermanent = profileRes.data?.bonus_spins_permanent || 0;
    const isSubscriber = !!(profileRes.data as any)?.twitch_badges?.is_subscriber;
    const subBonus = isSubscriber ? SUBSCRIBER_BONUS : 0;
    const capLimit = isSubscriber ? SUBSCRIBER_MAX_SPINS_CAP : MAX_SPINS_CAP;
    const maxSpins = Math.min(dailySpinsValue + subBonus + bonusSpinsPermanent, capLimit);

    // Atomic spin deduction via RPC (handles init + carry-over + deduction in 1 call)
    const { data: newRemaining, error: rpcError } = await serviceClient
      .rpc("deduct_spin", {
        p_user_id: userId,
        p_date: today,
        p_bet: bet,
        p_max_spins: maxSpins,
      });

    if (rpcError) {
      console.error("deduct_spin RPC error:", rpcError);
      return new Response(
        JSON.stringify({ error: "Failed to deduct spins" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (newRemaining === -1) {
      return new Response(
        JSON.stringify({ error: "Not enough spins remaining" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate spin result
    const grid = generateGrid(symbols, false);
    const result = calculateSpinResult(grid, symbols, bet);

    // If bonus triggered, create bonus state
    let bonusState = null;
    if (result.bonusTriggered) {
      const eligibleSymbols = symbols.filter((s: SlotSymbol) => !s.is_scatter);
      const expandingSymbol = getWeightedRandomSymbol(eligibleSymbols);

      // Carry over any base-game win from the triggering spin into bonus_winnings
      const carryOverWin = result.totalWin;
      const bonusInsert: Record<string, unknown> = {
        user_id: userId,
        is_active: true,
        free_spins_remaining: 10,
        total_free_spins: 10,
        expanding_symbol_id: expandingSymbol.id,
        expanding_symbol_name: expandingSymbol.name,
        bonus_winnings: carryOverWin,
        game_id: gameId,
        bet_amount: bet,
      };

      // For Rise of Fedesvin, also set the arrays
      if (isRiseOfFedesvin) {
        bonusInsert.expanding_symbol_ids = [expandingSymbol.id];
        bonusInsert.expanding_symbol_names = [expandingSymbol.name];
      }

      // Awaited: bonus state MUST exist before we respond, otherwise the
      // first bonus spin will hit "No active bonus" due to a race condition.
      await serviceClient
        .from("slot_bonus_state")
        .delete()
        .eq("user_id", userId)
        .eq("game_id", gameId);

      const { error: bonusInsertError } = await serviceClient
        .from("slot_bonus_state")
        .insert(bonusInsert);

      if (bonusInsertError) {
        console.error("[slot-spin] Bonus state insert failed:", bonusInsertError);
      }

      bonusState = {
        isActive: true,
        freeSpinsRemaining: 10,
        totalFreeSpins: 10,
        expandingSymbolId: expandingSymbol.id,
        expandingSymbolName: expandingSymbol.name,
        bonusWinnings: carryOverWin,
        betAmount: bet,
      } as Record<string, unknown>;

      if (isRiseOfFedesvin) {
        bonusState.expandingSymbolIds = [expandingSymbol.id];
        bonusState.expandingSymbolNames = [expandingSymbol.name];
      }
    }

    // Tournament + game result handling - run fully async (fire-and-forget)
    // This does NOT block the response, eliminating the main latency bottleneck
    const nowISO = new Date().toISOString();
    const spinTotalWin = result.totalWin;
    const spinBonusTriggered = result.bonusTriggered;

    (async () => {
      try {
        const { data: participations } = await serviceClient
          .from("tournament_participants")
          .select("tournament_id")
          .eq("user_id", userId);

        let skipGlobalLeaderboard = false;

        if (participations && participations.length > 0) {
          const participatingIds = participations.map((p: { tournament_id: string }) => p.tournament_id);

          // Fetch active tournaments and entries in parallel
          const [{ data: activeTournaments }, { data: allEntries }] = await Promise.all([
            serviceClient
              .from("tournaments")
              .select("id, exclude_from_global_leaderboard, max_credits, max_bet")
              .in("id", participatingIds)
              .contains("game_ids", [gameId])
              .lte("starts_at", nowISO)
              .gte("ends_at", nowISO),
            serviceClient
              .from("tournament_entries")
              .select("tournament_id, total_credits_used")
              .in("tournament_id", participatingIds)
              .eq("user_id", userId),
          ]);

          if (activeTournaments && activeTournaments.length > 0) {
            // Upsert all tournament entries in parallel
            await Promise.all(activeTournaments.map(async (t) => {
              // Enforce max_bet: skip tournament entry if bet exceeds max_bet
              if (t.max_bet && bet > t.max_bet) {
                console.log(`[slot-spin] Bet ${bet} exceeds tournament max_bet ${t.max_bet} for tournament ${t.id} - skipping tournament entry`);
                return;
              }

              if (t.exclude_from_global_leaderboard) {
                if (t.max_credits) {
                  const totalUsed = (allEntries || [])
                    .filter((e: { tournament_id: string }) => e.tournament_id === t.id)
                    .reduce((sum: number, e: { total_credits_used: number }) => sum + Number(e.total_credits_used || 0), 0);
                  if (totalUsed + bet <= t.max_credits) skipGlobalLeaderboard = true;
                } else {
                  skipGlobalLeaderboard = true;
                }
              }

              const { error: upsertError } = await serviceClient.rpc("upsert_tournament_entry", {
                p_tournament_id: t.id,
                p_user_id: userId,
                p_game_id: gameId,
                p_points: spinTotalWin,
                p_bet: bet,
                p_is_bonus: false,
              });
              if (upsertError) {
                console.error("[slot-spin] Tournament entry upsert failed:", JSON.stringify(upsertError));
              } else {
                console.log(`[slot-spin] Tournament entry recorded: tournament=${t.id}, user=${userId}, game=${gameId}, points=${spinTotalWin}`);
              }
            }));
          }
        }

        if (!skipGlobalLeaderboard) {
          await serviceClient.from("slot_game_results").insert({
            user_id: userId,
            bet_amount: bet,
            win_amount: spinTotalWin,
            is_bonus_triggered: spinBonusTriggered,
            bonus_win_amount: 0,
            game_id: gameId,
          });
        }
      } catch (err) {
        console.error("[slot-spin] Background tournament/result processing failed:", err);
      }
    })();

    return new Response(
      JSON.stringify({
        success: true,
        result,
        spinsRemaining: newRemaining,
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
