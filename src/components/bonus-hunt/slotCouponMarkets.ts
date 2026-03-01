export interface CouponMarket {
  q: string;
  oddsYes: number;
  oddsNo: number;
  aggressive: boolean;
}

export const DEFAULT_MARKETS: CouponMarket[] = [
  { q: "Betaler 10 bonusser over 100x?", oddsYes: 1.85, oddsNo: 1.95, aggressive: true },
  { q: "Betaler 5 bonusser over 300x?", oddsYes: 2.10, oddsNo: 1.70, aggressive: true },
  { q: "Betaler 2 bonusser over 500x?", oddsYes: 2.45, oddsNo: 1.55, aggressive: true },
  { q: "Kommer der mindst 1 gevinst over 1000x?", oddsYes: 3.20, oddsNo: 1.30, aggressive: true },
  { q: "Kommer der mindst 1 gevinst over 1500x?", oddsYes: 4.50, oddsNo: 1.15, aggressive: true },
  { q: "Bliver største gevinst over 1.000kr?", oddsYes: 1.60, oddsNo: 2.25, aggressive: true },
  { q: "Bliver største gevinst over 2000kr?", oddsYes: 2.30, oddsNo: 1.60, aggressive: true },
  { q: "Bliver største gevinst over 3000kr?", oddsYes: 3.50, oddsNo: 1.25, aggressive: true },
  { q: "Kommer der back-to-back bonus?", oddsYes: 2.00, oddsNo: 1.80, aggressive: false },
  { q: "Betaler 5 bonusser under 10x?", oddsYes: 1.40, oddsNo: 2.80, aggressive: false },
];
