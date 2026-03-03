

## Plan

### 1. Double floating win text size
**File:** `src/components/slots/BonanzaTumbleWinPopup.tsx`
- Change `text-2xl` → `text-5xl` on the span

**File:** `src/styles/bonanza-animations.css`
- Scale up the `bonanza-win-float` keyframes (larger initial/peak scale)

### 2. Tumble bar: always show during bonus tumbles with default x0 multiplier
**File:** `src/components/slots/BonanzaTumbleWinBar.tsx`
- Always render the multiplier section (remove `runningMultiplier > 0` guard), show `x0` when multiplier is 0
- Add a ref/id on the multiplier element so flying bombs can target it
- Add a "pop" animation class when multiplier updates

**File:** `src/components/slots/BonanzaSlotGame.tsx` (line 783)
- Currently: `visible={tumbleBarVisible && isBonusActive && runningWin > 0}`
- Change to: show tumble bar at the start of every tumble chain during bonus (set `tumbleBarVisible(true)` when first win is detected in `processTumbleSteps`, keep `isBonusActive` gate)
- Move `setTumbleBarVisible(true)` from after all tumble steps (line 374) to inside the loop when `hasWins && winningStepCount === 1` (first win of the chain)

### 3. Flying bomb multiplier animation (Sweet Bonanza style)
**New file:** `src/components/slots/BonanzaFlyingMultiplier.tsx`
- Renders floating "5x" labels that animate from a bomb's grid position upward to the tumble bar multiplier
- Each flyer has: `id`, `value`, `startX`, `startY`
- Uses CSS animation `bonanza-mult-fly-to-bar` (~500ms) then auto-removes

**File:** `src/styles/bonanza-animations.css`
- Add `bonanza-mult-fly-to-bar` keyframe: starts at element position, flies upward to top-center of grid, scales up then down
- Add `bonanza-mult-pop` keyframe for the multiplier counter bump when value arrives

**File:** `src/components/slots/BonanzaSlotGame.tsx`
- Add state: `flyingMultipliers` array
- In the bomb blow-up sequence (lines 330-358), when a bomb activates:
  1. Calculate bomb's pixel position from its grid col/row
  2. Spawn a flying multiplier popup at that position
  3. Wait ~500ms for fly animation
  4. Then increment `runningMultiplier` (move line 343 to after the fly completes)
  5. Remove the flyer
- Render `<BonanzaFlyingMultiplier>` inside the grid container alongside the tumble bar

### Animation flow
```text
Tumble wins detected (bonus) → tumble bar appears with "Tumble Win: X.XX" + "x0"
  → Bombs blow up sequentially:
    → Bomb fractures → "5x" label spawns at bomb position
    → Label flies to multiplier counter (~500ms)
    → Counter updates: x0 → x5 (with pop)
    → Next bomb: "10x" flies up → x5 → x15
  → After all bombs: collision effect merges win × multiplier → final result
```

### Files to modify
1. `src/components/slots/BonanzaTumbleWinPopup.tsx` — bigger text
2. `src/styles/bonanza-animations.css` — scaled win float, new fly + pop keyframes
3. `src/components/slots/BonanzaTumbleWinBar.tsx` — always show multiplier (default x0), pop on update
4. `src/components/slots/BonanzaFlyingMultiplier.tsx` — new component
5. `src/components/slots/BonanzaSlotGame.tsx` — flying multiplier state, updated bomb sequence timing, tumble bar visibility during bonus

