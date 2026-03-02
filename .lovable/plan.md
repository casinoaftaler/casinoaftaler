

# Fix Bomb Animations: Remove Mid-Tumble Effects, Add Sequential Blow-Up After Chain Ends

## Problem
Currently, bombs get visual effects during the tumble chain:
1. **Activated bombs** get a `winning` highlight pulse during each winning step (lines 213-216)
2. **Non-activated bombs** fizzle after every winning tumble step (lines 243-252)

The user wants: NO bomb animations during the tumble chain. Only after ALL tumbles are complete should bombs animate -- blowing up sequentially from left to right.

## Changes

### File: `src/components/slots/BonanzaSlotGame.tsx`

**A. Remove mid-tumble bomb animations (inside the `for` loop):**

1. **Lines 213-216**: Remove the block that highlights activated bombs with `winning` animation during each step. Bombs should remain visually inert during tumbles.

2. **Lines 234-237**: Remove the block that plays `bomb-activate` on activated bombs during the explode phase. They shouldn't animate here.

3. **Lines 243-252**: Remove the entire fizzle block that runs after each winning step. No bomb effects mid-chain.

**B. Add sequential bomb blow-up AFTER the tumble loop ends (after line 314, before line 315):**

After the `for` loop completes, collect all bombs from the final tumble step. Then animate them sequentially left-to-right:

```text
// After tumble loop ends:
// Collect all bombs from the last step that had bombs
const lastStepWithBombs = [...steps].reverse().find(s => s.multiplierBombs?.length > 0);
if (lastStepWithBombs?.multiplierBombs?.length) {
  const bombs = lastStepWithBombs.multiplierBombs;
  // Sort by position (left to right = by column, then row)
  const sorted = [...bombs].sort((a, b) => a.position - b.position);
  
  for (const bomb of sorted) {
    const animState = bomb.activated ? 'bomb-activate' : 'bomb-fizzle';
    setCellAnimStates(new Map([[bomb.position, animState]]));
    if (bomb.activated) {
      slotSounds.playCrackle();
      setScreenShake('normal');
      setTimeout(() => setScreenShake('none'), 400);
    }
    await new Promise(r => setTimeout(r, 400)); // stagger each bomb
  }
  await new Promise(r => setTimeout(r, 300)); // final pause
}
```

This gives a dramatic sequential bomb reveal: each bomb blows up (if activated) or fizzles (if not) one by one from left to right, only after all tumbling is done.

**C. Remove the bomb multiplier shake from mid-tumble (lines 221-225):**

Move the multiplier accumulation (`setRunningMultiplier`) to the post-loop bomb sequence so the multiplier updates as each bomb visually activates.

### File: `src/components/slots/BonanzaColumn.tsx`

No changes needed -- the existing `bomb-activate` and `bomb-fizzle` CSS animations are correct. We're just changing WHEN they trigger.

### File: `src/styles/bonanza-animations.css`

No changes needed -- existing bomb animations work fine.

## Summary of behavior after fix

| Phase | Bomb behavior |
|-------|--------------|
| During tumble wins | Bombs sit silently, no visual effects |
| During gravity/fill | Bombs remain static |
| After all tumbles done | Bombs animate one-by-one, left to right: activated ones explode, non-activated ones fizzle |

