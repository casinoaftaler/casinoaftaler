import type { BonusHuntSlot } from "@/hooks/useBonusHuntData";
import type { CouponMarket, CouponCondition } from "./slotCouponMarkets";

/**
 * Evaluate a single condition against the opened slots.
 * Returns true (hit), false (miss – only when ALL bonuses are opened), or null (pending).
 */
function evaluateCondition(
  condition: CouponCondition,
  openedSlots: BonusHuntSlot[],
  allOpened: boolean
): boolean | null {
  switch (condition.type) {
    case "bonuses_over_x": {
      const threshold = condition.multiplier ?? 100;
      const needed = condition.count ?? 1;
      const count = openedSlots.filter((s) => s.multiplier >= threshold).length;
      if (count >= needed) return true;
      return allOpened ? false : null;
    }

    case "bonuses_under_x": {
      const threshold = condition.multiplier ?? 10;
      const needed = condition.count ?? 1;
      const count = openedSlots.filter((s) => s.multiplier < threshold).length;
      if (count >= needed) return true;
      return allOpened ? false : null;
    }

    case "max_win_over": {
      const threshold = condition.amount ?? 1000;
      const maxWin = openedSlots.reduce((max, s) => Math.max(max, s.win), 0);
      if (maxWin >= threshold) return true;
      return allOpened ? false : null;
    }

    case "max_x_over": {
      const threshold = condition.multiplier ?? 1000;
      const maxX = openedSlots.reduce((max, s) => Math.max(max, s.multiplier), 0);
      if (maxX >= threshold) return true;
      return allOpened ? false : null;
    }

    case "back_to_back": {
      const threshold = condition.multiplier ?? 50;
      // Check if any two consecutive opened slots (by original order) both exceed threshold
      for (let i = 0; i < openedSlots.length - 1; i++) {
        if (openedSlots[i].multiplier >= threshold && openedSlots[i + 1].multiplier >= threshold) {
          return true;
        }
      }
      return allOpened ? false : null;
    }

    default:
      return null;
  }
}

/**
 * Resolve all coupon markets against live hunt slot data.
 * Returns a record of market index → true (hit) / false (miss) / null (pending).
 */
export function resolveCouponMarkets(
  markets: CouponMarket[],
  slots: BonusHuntSlot[],
  totalSlots: number
): Record<number, boolean | null> {
  const openedSlots = slots.filter((s) => s.opened);
  const allOpened = openedSlots.length >= totalSlots && totalSlots > 0;

  const results: Record<number, boolean | null> = {};
  markets.forEach((market, i) => {
    if (!market.condition) {
      results[i] = null; // No condition defined, stays pending
      return;
    }
    results[i] = evaluateCondition(market.condition, openedSlots, allOpened);
  });
  return results;
}
