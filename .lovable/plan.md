

## Fix: Bonus Hunt End Balance Calculation

### Problem
The client-side `parseHuntResponse` function in `useBonusHuntData.ts` (line 72-73) **ignores** the StreamSystem API's `end` field and incorrectly sets `endBalance = totalWinnings`.

In reality, when you hunt from 5000 kr down to 1500 kr, the end balance after opening bonuses should be **1500 + total bonus winnings**, not just the bonus winnings alone. The API's `huntData.end` field already contains this correct value.

The backend edge functions (`bonus-hunt-proxy`, `bonus-hunt-auto-settle`, `bonus-hunt-bulk-import`) all correctly use `huntData.end`, so only the client parser needs fixing.

### Fix (1 file)

**`src/hooks/useBonusHuntData.ts`** — line 72-73:

Replace:
```ts
const endVal = totalWinnings > 0 ? totalWinnings : null;
```

With:
```ts
const endVal = huntData.end != null ? huntData.end : (totalWinnings > 0 ? totalWinnings : null);
```

This uses the API's `end` field when available (which includes the remaining hunting balance + bonus winnings), and only falls back to `totalWinnings` if the API doesn't provide it.

### Impact
- **End Balance** row in the stats tab will show the correct final balance
- **Resultat** row (profit/loss = endBalance - startBalance) will be accurate
- No changes needed to the stats UI or edge functions — they already handle this correctly

