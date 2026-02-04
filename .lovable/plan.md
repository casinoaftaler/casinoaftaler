

# Add "Bonus Sounds Only" Option to Volume Settings

## Overview

Add a new toggle option in the volume control popover that enables only scatter, tease, and bonus trigger sound effects while muting all other sounds (spin, stop, win sounds, etc.). This allows players to focus on the exciting bonus-related audio cues without the continuous mechanical sounds.

## What Will Change

The volume settings popover will get a new "Bonus lyde kun" (Bonus Sounds Only) toggle that, when enabled, will:
- Play scatter land sounds (cat meow effects)
- Play tease mode sounds (drumroll/heartbeat when 2+ scatters land)
- Play bonus trigger sounds (book opening effect)
- Mute spin start, reel spinning, reel stop, small/medium/big win, and bonus complete sounds

## User Experience

When enabled:
- The game will feel quieter during normal play
- Excitement sounds will play when scatter symbols land
- Tension-building tease sounds will play with 2+ scatters
- The bonus trigger fanfare will play when entering free spins
- All other mechanical and win sounds remain silent

---

## Technical Details

### Files to Modify

**1. `src/lib/slotSoundEffects.ts`**

Add new state and methods for "bonus sounds only" mode:

```typescript
// Update PersistedAudioSettings interface
interface PersistedAudioSettings {
  enabled: boolean;
  volume: number;
  musicEnabled: boolean;
  effectsEnabled: boolean;
  bonusSoundsOnly: boolean; // NEW
}

// Add new private property
private bonusSoundsOnly: boolean = false;

// Add getter/setter methods
isBonusSoundsOnly(): boolean {
  return this.bonusSoundsOnly;
}

setBonusSoundsOnly(enabled: boolean): void {
  this.bonusSoundsOnly = enabled;
  this.persistSettings();
}
```

Update the helper method for checking if effects can play:

```typescript
// Add new method for checking bonus sounds specifically
private canPlayBonusSound(): boolean {
  return this.enabled && this.effectsEnabled;
}

// Update canPlayEffect to consider bonusSoundsOnly mode
private canPlayEffect(): boolean {
  return this.enabled && this.effectsEnabled && !this.bonusSoundsOnly;
}
```

Update sound methods to use appropriate checks:
- `playScatterLand()` - Use `canPlayBonusSound()` 
- `playTeaseStart()` - Use `canPlayBonusSound()`
- `playActiveTeaseSlowdown()` - Use `canPlayBonusSound()`
- `playBonusTrigger()` - Use `canPlayBonusSound()`
- All other sound methods continue using `canPlayEffect()`

**2. `src/components/slots/VolumeControl.tsx`**

Add the new toggle to the UI:

```tsx
// Add state for bonusSoundsOnly
const [bonusSoundsOnly, setBonusSoundsOnly] = useState(slotSounds.isBonusSoundsOnly());

// Add effect to sync with slotSounds
useEffect(() => {
  slotSounds.setBonusSoundsOnly(bonusSoundsOnly);
}, [bonusSoundsOnly]);

// Add handler
const handleBonusSoundsOnlyToggle = (checked: boolean) => {
  setBonusSoundsOnly(checked);
};
```

Add new UI section in the popover (after the Effects toggle):

```tsx
{/* Bonus sounds only toggle */}
<div className="pt-2 border-t border-border">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Cat className="h-4 w-4 text-amber-500" />
      <span className="text-sm font-medium">Kun bonus lyde</span>
    </div>
    <Switch
      checked={bonusSoundsOnly && enabled && effectsEnabled}
      onCheckedChange={handleBonusSoundsOnlyToggle}
      disabled={!enabled || !effectsEnabled}
    />
  </div>
  <p className="text-xs text-muted-foreground mt-1">
    Kun scatter, tease og bonus lyde
  </p>
</div>
```

### Sound Method Categorization

**Bonus sounds (always play when effects enabled):**
- `playScatterLand()`
- `playTeaseStart()`
- `playActiveTeaseSlowdown()`
- `playBonusTrigger()`

**Regular sounds (muted in bonus-only mode):**
- `playSpinStart()`
- `playReelSpin()`
- `playReelStopSingle()`
- `playSmallWin()`
- `playMediumWin()`
- `playBigWin()`
- `playBonusWin()` (completion sound, not trigger)
- `playSymbolExpand()`
- `playButtonClick()`
- And other UI/game sounds

