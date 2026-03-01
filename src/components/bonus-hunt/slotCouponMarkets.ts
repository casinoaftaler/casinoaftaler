/**
 * Condition types for auto-resolving coupon markets against live hunt data.
 *
 * - bonuses_over_x:  At least `count` opened bonuses with multiplier ≥ `multiplier`
 * - bonuses_under_x: At least `count` opened bonuses with multiplier < `multiplier`
 * - max_win_over:    Highest single win amount ≥ `amount`
 * - max_x_over:      Highest single multiplier ≥ `multiplier`
 * - back_to_back:    Two consecutive opened slots both ≥ `multiplier` (default 50x)
 */
export type CouponConditionType =
  | "bonuses_over_x"
  | "bonuses_under_x"
  | "max_win_over"
  | "max_x_over"
  | "back_to_back";

export interface CouponCondition {
  type: CouponConditionType;
  /** Required count for bonuses_over_x / bonuses_under_x */
  count?: number;
  /** Multiplier threshold */
  multiplier?: number;
  /** Win amount threshold (kr) for max_win_over */
  amount?: number;
}

export interface CouponMarket {
  q: string;
  oddsYes: number;
  oddsNo: number;
  aggressive: boolean;
  /** Machine-readable condition for auto-resolution */
  condition?: CouponCondition;
}

export const DEFAULT_MARKETS: CouponMarket[] = [
  {
    q: "Betaler 10 bonusser over 100x?",
    oddsYes: 1.85, oddsNo: 1.95, aggressive: true,
    condition: { type: "bonuses_over_x", count: 10, multiplier: 100 },
  },
  {
    q: "Betaler 5 bonusser over 300x?",
    oddsYes: 2.10, oddsNo: 1.70, aggressive: true,
    condition: { type: "bonuses_over_x", count: 5, multiplier: 300 },
  },
  {
    q: "Betaler 2 bonusser over 500x?",
    oddsYes: 2.45, oddsNo: 1.55, aggressive: true,
    condition: { type: "bonuses_over_x", count: 2, multiplier: 500 },
  },
  {
    q: "Kommer der mindst 1 gevinst over 1000x?",
    oddsYes: 3.20, oddsNo: 1.30, aggressive: true,
    condition: { type: "bonuses_over_x", count: 1, multiplier: 1000 },
  },
  {
    q: "Kommer der mindst 1 gevinst over 1500x?",
    oddsYes: 4.50, oddsNo: 1.15, aggressive: true,
    condition: { type: "bonuses_over_x", count: 1, multiplier: 1500 },
  },
  {
    q: "Bliver største gevinst over 1.000kr?",
    oddsYes: 1.60, oddsNo: 2.25, aggressive: true,
    condition: { type: "max_win_over", amount: 1000 },
  },
  {
    q: "Bliver største gevinst over 2000kr?",
    oddsYes: 2.30, oddsNo: 1.60, aggressive: true,
    condition: { type: "max_win_over", amount: 2000 },
  },
  {
    q: "Bliver største gevinst over 3000kr?",
    oddsYes: 3.50, oddsNo: 1.25, aggressive: true,
    condition: { type: "max_win_over", amount: 3000 },
  },
  {
    q: "Kommer der back-to-back bonus?",
    oddsYes: 2.00, oddsNo: 1.80, aggressive: false,
    condition: { type: "back_to_back", multiplier: 50 },
  },
  {
    q: "Betaler 5 bonusser under 10x?",
    oddsYes: 1.40, oddsNo: 2.80, aggressive: false,
    condition: { type: "bonuses_under_x", count: 5, multiplier: 10 },
  },
];
