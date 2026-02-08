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

function applyExpandingSymbol(
  grid: string[][],
  expandingSymbol: SlotSymbol,
  symbols: SlotSymbol[]
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
    const { bet, sessionId, isBonusSpin } = body;

    // Validate bet amount
    if (typeof bet !== "number" || bet < 1 || bet > 100 || !Number.isInteger(bet)) {
      return new Response(
        JSON.stringify({ error: "Invalid bet amount" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate session (anti-multi-device)
    const { data: sessionData } = await supabase
      .from("slot_active_sessions")
      .select("session_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (sessionData && sessionData.session_id !== sessionId) {
      return new Response(
        JSON.stringify({ error: "Session blocked - active on another device" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch slot symbols from database
    const { data: symbols, error: symbolsError } = await supabase
      .from("slot_symbols")
      .select("*")
      .order("position");

    if (symbolsError || !symbols || symbols.length === 0) {
      return new Response(
        JSON.stringify({ error: "Failed to load symbols" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Handle bonus spin
    if (isBonusSpin) {
      // Get bonus state
      const { data: bonusData, error: bonusError } = await supabase
        .from("slot_bonus_state")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (bonusError || !bonusData || !bonusData.is_active || bonusData.free_spins_remaining <= 0) {
        return new Response(
          JSON.stringify({ error: "No active bonus or no free spins remaining" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const expandingSymbol = symbols.find((s: SlotSymbol) => s.id === bonusData.expanding_symbol_id);
      if (!expandingSymbol) {
        return new Response(
          JSON.stringify({ error: "Expanding symbol not found" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Generate grid with bonus weights
      const originalGrid = generateGrid(symbols, true);
      
      // Apply expanding symbol
      const { expandedGrid, expandedReels } = applyExpandingSymbol(
        originalGrid,
        expandingSymbol,
        symbols
      );

      // Calculate wins
      const wins = calculateBonusWins(expandedGrid, expandedReels, symbols, bet, expandingSymbol);
      
      // Count scatters for retrigger
      const scatterCount = countScatters(originalGrid, symbols);
      const isRetrigger = scatterCount >= 3;

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

      await supabase
        .from("slot_bonus_state")
        .update({
          free_spins_remaining: newFreeSpins,
          total_free_spins: newTotalFreeSpins,
          bonus_winnings: newBonusWinnings,
        })
        .eq("user_id", userId);

      const result: BonusSpinResult = {
        grid: originalGrid,
        expandedGrid,
        expandedReels,
        wins,
        totalWin,
        bonusTriggered: isRetrigger,
        scatterCount,
        isRetrigger,
      };

      return new Response(
        JSON.stringify({
          success: true,
          result,
          bonusState: {
            freeSpinsRemaining: newFreeSpins,
            totalFreeSpins: newTotalFreeSpins,
            bonusWinnings: newBonusWinnings,
            expandingSymbolId: bonusData.expanding_symbol_id,
            expandingSymbolName: bonusData.expanding_symbol_name,
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Normal spin - validate spins remaining
    const today = new Date().toISOString().split("T")[0];
    
    // Get bonus spins permanent from profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("bonus_spins_permanent")
      .eq("user_id", userId)
      .maybeSingle();

    const bonusSpinsPermanent = profileData?.bonus_spins_permanent || 0;

    // Get daily spins setting
    const { data: settingsData } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "slot_daily_spins")
      .maybeSingle();

    const dailySpins = parseInt(settingsData?.value || "100", 10);
    const maxSpins = Math.min(dailySpins + bonusSpinsPermanent, MAX_SPINS_CAP);

    // Get or create today's spin record
    let { data: spinsData } = await supabase
      .from("slot_spins")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .maybeSingle();

    if (!spinsData) {
      const { data: newSpins, error: insertError } = await supabase
        .from("slot_spins")
        .insert({
          user_id: userId,
          date: today,
          spins_remaining: maxSpins,
        })
        .select()
        .single();

      if (insertError) {
        return new Response(
          JSON.stringify({ error: "Failed to initialize spins" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      spinsData = newSpins;
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

      await supabase
        .from("slot_bonus_state")
        .upsert({
          user_id: userId,
          is_active: true,
          free_spins_remaining: 10,
          total_free_spins: 10,
          expanding_symbol_id: expandingSymbol.id,
          expanding_symbol_name: expandingSymbol.name,
          bonus_winnings: 0,
        }, {
          onConflict: "user_id",
        });

      bonusState = {
        isActive: true,
        freeSpinsRemaining: 10,
        totalFreeSpins: 10,
        expandingSymbolId: expandingSymbol.id,
        expandingSymbolName: expandingSymbol.name,
        bonusWinnings: 0,
      };
    }

    // Record game result
    await supabase.from("slot_game_results").insert({
      user_id: userId,
      bet_amount: bet,
      win_amount: result.totalWin,
      is_bonus_triggered: result.bonusTriggered,
      bonus_win_amount: 0,
    });

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
