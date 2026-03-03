import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple seeded PRNG (xoshiro128**)
class PRNG {
  private s: Uint32Array;
  constructor(seed: number) {
    this.s = new Uint32Array(4);
    this.s[0] = seed >>> 0;
    this.s[1] = (seed * 1664525 + 1013904223) >>> 0;
    this.s[2] = (this.s[1] * 1664525 + 1013904223) >>> 0;
    this.s[3] = (this.s[2] * 1664525 + 1013904223) >>> 0;
    for (let i = 0; i < 20; i++) this.next();
  }
  next(): number {
    const s = this.s;
    const result = Math.imul(s[1] * 5, 1 << 7 | s[1] >>> 25) * 9;
    const t = s[1] << 9;
    s[2] ^= s[0]; s[3] ^= s[1]; s[1] ^= s[2]; s[0] ^= s[3];
    s[2] ^= t; s[3] = s[3] << 11 | s[3] >>> 21;
    return (result >>> 0) / 4294967296;
  }
}

interface Symbol {
  id: string; name: string; weight: number; bonus_weight: number;
  is_scatter: boolean; multiplier_3: number; multiplier_4: number; multiplier_5: number;
}

const COLS = 6, ROWS = 5;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(url, key);

    // Load symbols
    const { data: syms } = await admin.from('slot_symbols')
      .select('id, name, weight, bonus_weight, is_scatter, multiplier_3, multiplier_4, multiplier_5')
      .eq('game_id', 'fedesvin-bonanza').order('position');
    if (!syms?.length) throw new Error('No symbols');

    // Load settings
    const { data: settings } = await admin.from('site_settings')
      .select('key, value').like('key', 'bonanza_%');
    const cfg: Record<string, string> = {};
    settings?.forEach((s: any) => { cfg[s.key] = s.value || ''; });

    const MIN_MATCH = parseInt(cfg.bonanza_min_match || '8');
    const SCATTER_TRIGGER = parseInt(cfg.bonanza_scatter_trigger || '4');
    const SCATTER_RETRIGGER = parseInt(cfg.bonanza_scatter_retrigger || '3');
    const FREE_SPINS_4 = parseInt(cfg.bonanza_free_spins_4 || '10');
    const FREE_SPINS_5 = parseInt(cfg.bonanza_free_spins_5 || '12');
    const FREE_SPINS_6 = parseInt(cfg.bonanza_free_spins_6 || '15');
    const FREE_SPINS_RETRIGGER = parseInt(cfg.bonanza_free_spins_retrigger || '5');
    const MULT_CHANCE = parseFloat(cfg.bonanza_multiplier_chance_bonus || '0.10');
    const DUP2 = parseFloat(cfg.bonanza_reel_dup_2_chance || '0.35');
    const DUP3 = parseFloat(cfg.bonanza_reel_dup_3_chance || '0.10');

    let MULT_VALUES = [2, 3, 5, 10, 15, 25, 50, 100];
    let MULT_WEIGHTS = [30, 25, 20, 12, 6, 3, 2, 1];
    if (cfg.bonanza_multiplier_values) {
      try { MULT_VALUES = JSON.parse(cfg.bonanza_multiplier_values); } catch {
        MULT_VALUES = cfg.bonanza_multiplier_values.split(',').map(Number);
      }
    }
    if (cfg.bonanza_multiplier_weights) {
      try { MULT_WEIGHTS = JSON.parse(cfg.bonanza_multiplier_weights); } catch {
        MULT_WEIGHTS = cfg.bonanza_multiplier_weights.split(',').map(Number);
      }
    }
    const MULT_TOTAL_W = MULT_WEIGHTS.reduce((a, b) => a + b, 0);

    const symbols: Symbol[] = syms as Symbol[];
    const scatterSym = symbols.find(s => s.is_scatter);
    const nonScatter = symbols.filter(s => !s.is_scatter);

    const body = await req.json().catch(() => ({}));
    const NUM_SPINS = Math.min(body.spins || 10000, 100000);
    const BET = 1; // normalize to 1
    const prng = new PRNG(body.seed || Date.now());

    function pickWeighted(syms: Symbol[], bonus: boolean): Symbol {
      const getW = (s: Symbol) => bonus ? (s.bonus_weight || s.weight) : s.weight;
      const total = syms.reduce((sum, s) => sum + getW(s), 0);
      let r = prng.next() * total;
      for (const s of syms) { r -= getW(s); if (r <= 0) return s; }
      return syms[syms.length - 1];
    }

    function pickBombValue(): number {
      let r = prng.next() * MULT_TOTAL_W;
      for (let i = 0; i < MULT_VALUES.length; i++) {
        r -= MULT_WEIGHTS[i]; if (r <= 0) return MULT_VALUES[i];
      }
      return MULT_VALUES[0];
    }

    function generateGrid(bonus: boolean): string[][] {
      const grid: string[][] = [];
      for (let col = 0; col < COLS; col++) {
        const column: string[] = [];
        let hasScatter = false, hasBomb = false;
        for (let row = 0; row < ROWS; row++) {
          if (bonus && !hasBomb && prng.next() < MULT_CHANCE) {
            column.push(`bomb_${pickBombValue()}x`);
            hasBomb = true; continue;
          }
          let sym = pickWeighted(symbols, bonus);
          if (scatterSym && sym.id === scatterSym.id && hasScatter)
            sym = pickWeighted(nonScatter, bonus);
          if (scatterSym && sym.id === scatterSym.id) hasScatter = true;
          column.push(sym.id);
        }
        // Duplication
        const dupRoll = prng.next();
        if (dupRoll < DUP3 + DUP2) {
          const dupCount = dupRoll < DUP3 ? 3 : 2;
          const regIdx: number[] = [];
          for (let i = 0; i < column.length; i++) {
            if (!column[i].startsWith('bomb_') && (!scatterSym || column[i] !== scatterSym.id))
              regIdx.push(i);
          }
          if (regIdx.length >= dupCount) {
            const srcI = regIdx[Math.floor(prng.next() * regIdx.length)];
            const srcId = column[srcI];
            const others = regIdx.filter(i => i !== srcI);
            for (let i = others.length - 1; i > 0; i--) {
              const j = Math.floor(prng.next() * (i + 1));
              [others[i], others[j]] = [others[j], others[i]];
            }
            for (let i = 0; i < Math.min(dupCount - 1, others.length); i++)
              column[others[i]] = srcId;
          }
        }
        // Shuffle
        for (let i = column.length - 1; i > 0; i--) {
          const j = Math.floor(prng.next() * (i + 1));
          [column[i], column[j]] = [column[j], column[i]];
        }
        grid.push(column);
      }
      return grid;
    }

    function countScatters(grid: string[][]): number {
      if (!scatterSym) return 0;
      let c = 0;
      for (const col of grid) for (const id of col) if (id === scatterSym.id) c++;
      return c;
    }

    function isBomb(id: string) { return id.startsWith('bomb_'); }
    function bombVal(id: string) { const m = id.match(/^bomb_(\d+)x$/); return m ? parseInt(m[1]) : 0; }

    const symMap = new Map(symbols.map(s => [s.id, s]));

    function calcWins(grid: string[][]): { wins: { symbolId: string; payout: number; positions: number[] }[]; } {
      const counts = new Map<string, { count: number; positions: number[] }>();
      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          const id = grid[col][row];
          if (isBomb(id)) continue;
          const flat = col * ROWS + row;
          if (!counts.has(id)) counts.set(id, { count: 0, positions: [] });
          const e = counts.get(id)!; e.count++; e.positions.push(flat);
        }
      }
      const wins: { symbolId: string; payout: number; positions: number[] }[] = [];
      for (const [id, { count, positions }] of counts) {
        const sym = symMap.get(id);
        if (!sym || sym.is_scatter || count < MIN_MATCH) continue;
        let mult = 0;
        if (count >= 12) mult = sym.multiplier_5;
        else if (count >= 10) mult = sym.multiplier_4;
        else if (count >= 8) mult = sym.multiplier_3;
        if (mult > 0) wins.push({ symbolId: id, payout: mult * BET, positions });
      }
      return { wins };
    }

    function tumble(grid: string[][], winPositions: number[], bonus: boolean): string[][] {
      const newGrid = grid.map(col => [...col]);
      const removedByCol = new Map<number, Set<number>>();
      for (const pos of winPositions) {
        const col = Math.floor(pos / ROWS), row = pos % ROWS;
        if (!removedByCol.has(col)) removedByCol.set(col, new Set());
        removedByCol.get(col)!.add(row);
      }
      for (const [col, rows] of removedByCol) {
        const remaining: string[] = [];
        for (let r = 0; r < ROWS; r++) if (!rows.has(r)) remaining.push(newGrid[col][r]);
        const needed = ROWS - remaining.length;
        const fill: string[] = [];
        const colHasScatter = scatterSym ? remaining.some(id => id === scatterSym!.id) : false;
        const colHasBomb = remaining.some(id => isBomb(id));
        let fillScatter = false, fillBomb = false;
        for (let i = 0; i < needed; i++) {
          if (bonus && !colHasBomb && !fillBomb && prng.next() < MULT_CHANCE) {
            fill.push(`bomb_${pickBombValue()}x`); fillBomb = true; continue;
          }
          let sym = pickWeighted(symbols, bonus);
          if (scatterSym && sym.id === scatterSym.id && (colHasScatter || fillScatter))
            sym = pickWeighted(nonScatter, bonus);
          if (scatterSym && sym.id === scatterSym.id) fillScatter = true;
          fill.push(sym.id);
        }
        newGrid[col] = [...fill, ...remaining];
      }
      return newGrid;
    }

    function simulateSpin(bonus: boolean): { win: number; scatters: number } {
      let grid = generateGrid(bonus);
      let scatters = countScatters(grid);
      let rawWin = 0;
      let maxT = 50;
      while (maxT-- > 0) {
        const { wins } = calcWins(grid);
        const winPos = new Set<number>();
        for (const w of wins) for (const p of w.positions) winPos.add(p);
        rawWin += wins.reduce((s, w) => s + w.payout, 0);
        if (wins.length === 0) break;
        grid = tumble(grid, Array.from(winPos), bonus);
        const ns = countScatters(grid); if (ns > scatters) scatters = ns;
      }
      // Collect bombs if any wins happened
      let totalMult = 0;
      if (rawWin > 0) {
        for (const col of grid) for (const id of col) if (isBomb(id)) totalMult += bombVal(id);
      }
      const totalWin = totalMult > 0 ? rawWin * totalMult : rawWin;
      return { win: totalWin, scatters };
    }

    let totalWagered = 0;
    let totalWon = 0;
    let bonusCount = 0;
    let biggestWin = 0;
    let baseWins = 0;
    let bonusWins = 0;

    for (let i = 0; i < NUM_SPINS; i++) {
      totalWagered += BET;
      const result = simulateSpin(false);
      let spinWin = result.win;
      baseWins += result.win;

      // Check bonus trigger
      if (result.scatters >= SCATTER_TRIGGER) {
        bonusCount++;
        let freeSpins = result.scatters >= 6 ? FREE_SPINS_6 :
                        result.scatters >= 5 ? FREE_SPINS_5 : FREE_SPINS_4;
        let bonusTotal = 0;
        while (freeSpins > 0) {
          freeSpins--;
          const bResult = simulateSpin(true);
          bonusTotal += bResult.win;
          if (bResult.scatters >= SCATTER_RETRIGGER) freeSpins += FREE_SPINS_RETRIGGER;
        }
        spinWin += bonusTotal;
        bonusWins += bonusTotal;
      }

      totalWon += spinWin;
      if (spinWin > biggestWin) biggestWin = spinWin;
    }

    const rtp = (totalWon / totalWagered) * 100;
    const baseRTP = (baseWins / totalWagered) * 100;
    const bonusRTP = (bonusWins / totalWagered) * 100;

    return new Response(JSON.stringify({
      spins: NUM_SPINS,
      bet: BET,
      totalWagered,
      totalWon: Math.round(totalWon * 100) / 100,
      rtp: Math.round(rtp * 100) / 100,
      baseRTP: Math.round(baseRTP * 100) / 100,
      bonusRTP: Math.round(bonusRTP * 100) / 100,
      bonusCount,
      bonusFrequency: `1 in ${Math.round(NUM_SPINS / (bonusCount || 1))}`,
      biggestWin: Math.round(biggestWin * 100) / 100,
      settings: { MIN_MATCH, SCATTER_TRIGGER, DUP2, DUP3, MULT_CHANCE, MULT_VALUES, MULT_WEIGHTS },
    }, null, 2), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
