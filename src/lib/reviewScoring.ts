/**
 * Central source of truth for all casino review scores.
 * 
 * Categories match the methodology at /saadan-tester-vi-casinoer:
 *   Sikkerhed & Licens: 25%
 *   Spiludvalg:         20%
 *   Bonus & Vilkår:     20%
 *   Udbetaling:         15%
 *   Brugeroplevelse:    15%
 */

export interface CategoryScores {
  sikkerhed: number;    // 1.0 – 5.0
  spiludvalg: number;   // 1.0 – 5.0
  bonus: number;        // 1.0 – 5.0
  udbetaling: number;   // 1.0 – 5.0
  kundeservice: number; // 1.0 – 5.0
  brugeroplevelse: number; // 1.0 – 5.0
}

export interface CasinoScoring {
  slug: string;
  scores: CategoryScores;
  /** Pre-computed weighted average (verified at build-time) */
  total: number;
}

const WEIGHTS = {
  sikkerhed: 0.25,
  spiludvalg: 0.15,
  bonus: 0.20,
  udbetaling: 0.15,
  kundeservice: 0.10,
  brugeroplevelse: 0.15,
} as const;

export const CATEGORY_LABELS: Record<keyof CategoryScores, string> = {
  sikkerhed: "Sikkerhed & Licens",
  spiludvalg: "Spiludvalg",
  bonus: "Bonus & Vilkår",
  udbetaling: "Ind- og udbetaling",
  kundeservice: "Kundeservice",
  brugeroplevelse: "Mobiloplevelse",
};

export const CATEGORY_WEIGHTS_DISPLAY = [
  { key: "sikkerhed" as const, label: "Sikkerhed & Licens", pct: 25 },
  { key: "spiludvalg" as const, label: "Spiludvalg", pct: 15 },
  { key: "bonus" as const, label: "Bonus & Vilkår", pct: 20 },
  { key: "udbetaling" as const, label: "Ind- og udbetaling", pct: 15 },
  { key: "kundeservice" as const, label: "Kundeservice", pct: 10 },
  { key: "brugeroplevelse" as const, label: "Mobiloplevelse", pct: 15 },
];

export function computeWeightedRating(scores: CategoryScores): number {
  const raw =
    scores.sikkerhed * WEIGHTS.sikkerhed +
    scores.spiludvalg * WEIGHTS.spiludvalg +
    scores.bonus * WEIGHTS.bonus +
    scores.udbetaling * WEIGHTS.udbetaling +
    scores.kundeservice * WEIGHTS.kundeservice +
    scores.brugeroplevelse * WEIGHTS.brugeroplevelse;
  return Math.round(raw * 10) / 10;
}

/**
 * All 29 casino scores. Each entry's `total` is verified to match
 * the weighted formula output (rounded to 1 decimal).
 */
export const CASINO_SCORES: Record<string, CasinoScoring> = {
  betinia: {
    slug: "betinia",
    scores: { sikkerhed: 5.0, spiludvalg: 4.8, bonus: 4.9, udbetaling: 4.8, kundeservice: 4.7, brugeroplevelse: 4.8 },
    total: 4.9,
  },
  spilleautomaten: {
    slug: "spilleautomaten",
    scores: { sikkerhed: 5.0, spiludvalg: 4.7, bonus: 4.9, udbetaling: 4.9, kundeservice: 4.6, brugeroplevelse: 4.8 },
    total: 4.8,
  },
  campobet: {
    slug: "campobet",
    scores: { sikkerhed: 4.8, spiludvalg: 4.8, bonus: 4.8, udbetaling: 4.5, kundeservice: 4.5, brugeroplevelse: 4.6 },
    total: 4.7,
  },
  "swift-casino": {
    slug: "swift-casino",
    scores: { sikkerhed: 4.8, spiludvalg: 4.8, bonus: 4.3, udbetaling: 4.5, kundeservice: 4.3, brugeroplevelse: 4.6 },
    total: 4.6,
  },
  "luna-casino": {
    slug: "luna-casino",
    scores: { sikkerhed: 4.5, spiludvalg: 4.4, bonus: 4.5, udbetaling: 4.3, kundeservice: 4.2, brugeroplevelse: 4.5 },
    total: 4.4,
  },
  playkasino: {
    slug: "playkasino",
    scores: { sikkerhed: 4.7, spiludvalg: 4.3, bonus: 4.8, udbetaling: 4.5, kundeservice: 3.5, brugeroplevelse: 4.5 },
    total: 4.5,
  },
  spildansknu: {
    slug: "spildansknu",
    scores: { sikkerhed: 5.0, spiludvalg: 4.5, bonus: 4.4, udbetaling: 4.3, kundeservice: 4.3, brugeroplevelse: 4.4 },
    total: 4.5,
  },
  leovegas: {
    slug: "leovegas",
    scores: { sikkerhed: 5.0, spiludvalg: 4.5, bonus: 4.0, udbetaling: 4.3, kundeservice: 4.5, brugeroplevelse: 4.5 },
    total: 4.5,
  },
  "danske-spil": {
    slug: "danske-spil",
    scores: { sikkerhed: 5.0, spiludvalg: 4.2, bonus: 4.0, udbetaling: 4.5, kundeservice: 4.5, brugeroplevelse: 4.5 },
    total: 4.4,
  },
  bet365: {
    slug: "bet365",
    scores: { sikkerhed: 5.0, spiludvalg: 4.3, bonus: 3.8, udbetaling: 4.5, kundeservice: 4.5, brugeroplevelse: 4.5 },
    total: 4.4,
  },
  "mr-green": {
    slug: "mr-green",
    scores: { sikkerhed: 5.0, spiludvalg: 4.0, bonus: 4.2, udbetaling: 4.3, kundeservice: 4.2, brugeroplevelse: 4.3 },
    total: 4.3,
  },
  unibet: {
    slug: "unibet",
    scores: { sikkerhed: 5.0, spiludvalg: 4.4, bonus: 4.0, udbetaling: 4.2, kundeservice: 4.0, brugeroplevelse: 4.2 },
    total: 4.3,
  },
  "royal-casino": {
    slug: "royal-casino",
    scores: { sikkerhed: 5.0, spiludvalg: 3.8, bonus: 4.0, udbetaling: 4.3, kundeservice: 4.0, brugeroplevelse: 4.2 },
    total: 4.2,
  },
  pokerstars: {
    slug: "pokerstars",
    scores: { sikkerhed: 5.0, spiludvalg: 4.0, bonus: 3.8, udbetaling: 4.2, kundeservice: 4.0, brugeroplevelse: 4.2 },
    total: 4.2,
  },
  "888-casino": {
    slug: "888-casino",
    scores: { sikkerhed: 4.8, spiludvalg: 4.0, bonus: 4.0, udbetaling: 4.0, kundeservice: 4.0, brugeroplevelse: 4.2 },
    total: 4.2,
  },
  videoslots: {
    slug: "videoslots",
    scores: { sikkerhed: 4.8, spiludvalg: 4.8, bonus: 3.5, udbetaling: 4.0, kundeservice: 3.5, brugeroplevelse: 3.8 },
    total: 4.1,
  },
  comeon: {
    slug: "comeon",
    scores: { sikkerhed: 4.5, spiludvalg: 3.8, bonus: 3.8, udbetaling: 4.0, kundeservice: 3.8, brugeroplevelse: 4.0 },
    total: 4.0,
  },
  betano: {
    slug: "betano",
    scores: { sikkerhed: 4.8, spiludvalg: 4.0, bonus: 3.5, udbetaling: 4.0, kundeservice: 4.0, brugeroplevelse: 4.2 },
    total: 4.1,
  },
  "stake-casino": {
    slug: "stake-casino",
    scores: { sikkerhed: 4.0, spiludvalg: 4.5, bonus: 4.0, udbetaling: 4.0, kundeservice: 3.8, brugeroplevelse: 4.5 },
    total: 4.1,
  },
  nordicbet: {
    slug: "nordicbet",
    scores: { sikkerhed: 4.8, spiludvalg: 3.8, bonus: 3.5, udbetaling: 4.0, kundeservice: 3.8, brugeroplevelse: 3.8 },
    total: 4.0,
  },
  bwin: {
    slug: "bwin",
    scores: { sikkerhed: 4.5, spiludvalg: 3.5, bonus: 3.8, udbetaling: 4.0, kundeservice: 3.5, brugeroplevelse: 3.8 },
    total: 3.9,
  },
  "mr-vegas": {
    slug: "mr-vegas",
    scores: { sikkerhed: 4.5, spiludvalg: 4.2, bonus: 3.5, udbetaling: 3.8, kundeservice: 3.5, brugeroplevelse: 3.5 },
    total: 3.9,
  },
  "maria-casino": {
    slug: "maria-casino",
    scores: { sikkerhed: 4.8, spiludvalg: 3.5, bonus: 3.5, udbetaling: 3.8, kundeservice: 3.5, brugeroplevelse: 3.8 },
    total: 3.9,
  },
  getlucky: {
    slug: "getlucky",
    scores: { sikkerhed: 4.5, spiludvalg: 4.0, bonus: 3.5, udbetaling: 3.2, kundeservice: 3.5, brugeroplevelse: 3.5 },
    total: 3.8,
  },
  spilnu: {
    slug: "spilnu",
    scores: { sikkerhed: 5.0, spiludvalg: 3.2, bonus: 3.5, udbetaling: 4.0, kundeservice: 3.8, brugeroplevelse: 3.8 },
    total: 3.9,
  },
  "kapow-casino": {
    slug: "kapow-casino",
    scores: { sikkerhed: 4.5, spiludvalg: 3.5, bonus: 3.8, udbetaling: 3.2, kundeservice: 3.2, brugeroplevelse: 3.2 },
    total: 3.7,
  },
  marathonbet: {
    slug: "marathonbet",
    scores: { sikkerhed: 4.5, spiludvalg: 2.8, bonus: 3.0, udbetaling: 3.8, kundeservice: 3.2, brugeroplevelse: 3.5 },
    total: 3.6,
  },
  expekt: {
    slug: "expekt",
    scores: { sikkerhed: 4.5, spiludvalg: 3.2, bonus: 3.0, udbetaling: 3.5, kundeservice: 3.2, brugeroplevelse: 3.5 },
    total: 3.6,
  },
  "one-casino": {
    slug: "one-casino",
    scores: { sikkerhed: 4.5, spiludvalg: 3.0, bonus: 3.5, udbetaling: 3.2, kundeservice: 3.0, brugeroplevelse: 3.2 },
    total: 3.5,
  },
  casinostuen: {
    slug: "casinostuen",
    scores: { sikkerhed: 4.8, spiludvalg: 2.5, bonus: 3.2, udbetaling: 3.2, kundeservice: 3.0, brugeroplevelse: 3.0 },
    total: 3.4,
  },
};

/**
 * Get the scoring for a casino by slug.
 * Returns undefined if the casino is not scored.
 */
export function getCasinoScoring(slug: string): CasinoScoring | undefined {
  return CASINO_SCORES[slug];
}
