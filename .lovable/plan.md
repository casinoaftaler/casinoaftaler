

## Allow Users to Change Their Bet (While Betting is Open)

Currently, both edge functions and UI block users from placing a second bet ("You have already placed a bet"). This plan changes the behavior so users can **update** their existing bet while betting is open, but still enforces 1 bet per user per category.

### Changes

**1. `supabase/functions/bonus-hunt-place-bet/index.ts` -- Update instead of reject**

For both GTW and AVG X: when an existing bet is found and betting is open, **update** the existing bet instead of returning an error. Handle the credit difference (refund old bet amount, charge new bet amount).

- If existing bet found: calculate credit difference (`newBet - oldBet`), deduct/refund the difference, then update the row
- If no existing bet: deduct credits and insert as before

**2. `supabase/functions/bonus-hunt-twitch-bet/index.ts` -- Same update logic for Twitch**

Apply the same "update if exists" logic for Twitch chat commands, with appropriate Danish messages like `"Dit GTW bet er opdateret!"`.

**3. `src/components/bonus-hunt/BonusHuntGTWTab.tsx` -- Show edit form when bet exists and betting open**

- When the user has an existing bet AND betting is open, show the form pre-filled with their current guess/bet amounts and a "Opdater GTW Bet" button
- When betting is closed, just show the existing bet info (no edit option)

**4. `src/components/bonus-hunt/BonusHuntAvgXTab.tsx` -- Show edit form when bet exists and betting open**

- When the user has an existing bet AND betting is open, allow selecting a new group and show the form with an "Opdater AVG X Bet" button
- When betting is closed, show existing bet info only

### Technical Details

**Credit handling on update (edge functions):**

```text
oldBet = existing.bet_amount
diff = newBetAmount - oldBet

if diff > 0:
    deduct_spin(diff)  -- charge the extra
elif diff < 0:
    refund abs(diff)   -- give back credits
else:
    no credit change

UPDATE the bet row with new values
```

**UI changes summary:**
- GTW: The condition `isOpen && !userBet` becomes `isOpen && userId` (show form whether or not bet exists). Pre-fill inputs if `userBet` exists. Button text changes to "Opdater" vs "Placer".
- AVG X: Same pattern -- allow group re-selection and amount change when bet exists and betting is open.

### File Summary

| File | Change |
|------|--------|
| `supabase/functions/bonus-hunt-place-bet/index.ts` | Update existing bets instead of rejecting; handle credit diff |
| `supabase/functions/bonus-hunt-twitch-bet/index.ts` | Update existing bets via Twitch; handle credit diff |
| `src/components/bonus-hunt/BonusHuntGTWTab.tsx` | Show edit form when betting open + bet exists |
| `src/components/bonus-hunt/BonusHuntAvgXTab.tsx` | Show edit form when betting open + bet exists |
