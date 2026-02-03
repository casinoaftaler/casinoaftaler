

# Adjustable Reel Spin & Landing Speed

## Overview
Add two new admin-adjustable settings to control the slot machine's visual timing:
1. **Fake Loop Speed** - How fast the reels spin during the constant-speed phase (currently too fast at 600ms per cycle)
2. **Reel Landing Delay** - How quickly each reel lands after the previous one (currently 0ms - they trigger immediately)

## Technical Implementation

### Step 1: Add New Settings to `useSlotSettings.ts`
Extend the settings interface with two new timing parameters:

| Setting | Key | Default | Range | Description |
|---------|-----|---------|-------|-------------|
| Spin Loop Speed | `slot_spin_loop_ms` | 400 | 200-800ms | Duration of one spin cycle (higher = slower) |
| Reel Landing Delay | `slot_reel_stagger_ms` | 150 | 0-500ms | Delay between each reel stopping |

### Step 2: Pass Settings to SlotReel Component
Modify `SlotGame.tsx` to:
- Read the new settings from `useSlotSettings()`
- Pass `spinLoopMs` to each `SlotReel` component
- Use `reelStaggerMs` when triggering the next reel to slow down (add a `setTimeout` delay)

### Step 3: Update `SlotReel.tsx` to Use Dynamic Speed
- Accept new prop `spinLoopMs` (default: 400)
- Replace hardcoded `loopDuration = 600` with the prop value

### Step 4: Add Admin UI Controls
In `SlotMachineAdminSection.tsx` SettingsTab, add a new "Animation Timing" card with two sliders:

```text
┌─────────────────────────────────────────┐
│ Animation Timing                        │
├─────────────────────────────────────────┤
│ Spin Hastighed                          │
│ [======●==================] 400ms       │
│ Lavere = hurtigere spinning             │
│                                         │
│ Hjul Landing Forsinkelse                │
│ [=========●===============] 150ms       │
│ Tid mellem hvert hjul stopper           │
└─────────────────────────────────────────┘
```

## Files to Change

| File | Changes |
|------|---------|
| `src/hooks/useSlotSettings.ts` | Add `spinLoopMs` and `reelStaggerMs` to interface and query |
| `src/components/slots/SlotReel.tsx` | Accept `spinLoopMs` prop, use it for `loopDuration` |
| `src/components/slots/SlotGame.tsx` | Pass settings to reels, add delay when triggering next reel slowdown |
| `src/components/SlotMachineAdminSection.tsx` | Add slider controls in SettingsTab |

## Expected Behavior After Implementation

- **Slower fake loop**: Increasing `spinLoopMs` from 600 to 400-500 makes the spinning animation more visually readable
- **Faster sequential landing**: Setting `reelStaggerMs` to 100-200ms gives a satisfying cascade effect where reels land quickly one after another
- **Admin control**: Admins can fine-tune these values in real-time via sliders in the Settings tab

