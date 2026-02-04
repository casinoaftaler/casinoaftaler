

# Redesign Slot Machine Control Bar

## Current Issues
The current control bar has several usability problems:
1. **Cluttered layout** - Bet controls, autospin selector, autospin button, and spins remaining are all crammed together
2. **Poor visual hierarchy** - No clear grouping or separation between different control types
3. **Inconsistent sizing** - Buttons have inconsistent padding and sizing
4. **Mobile experience** - Stacking works but lacks visual polish
5. **Scattered information** - Related controls (bet + spins remaining) aren't visually connected

## Redesigned Layout

### Desktop View (side-by-side)
```text
┌─────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │  INDSATS    [-] 5 [+] │     │    SPIN     │     │  🔊  [i]   │   │
│  │  ✨ 47/100 spins     │     │    🎮       │     │            │   │
│  └─────────────────────┘     └─────────────┘     └─────────────┘   │
│      (Left Panel)              (Center)            (Right Panel)    │
│                                                                     │
│        ┌──────────────────────────────┐                            │
│        │  [10▼] [▶ AUTO]              │                            │
│        └──────────────────────────────┘                            │
│               (Below Spin Button)                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Mobile View (stacked)
```text
┌───────────────────────────────────┐
│    ┌───────────────────────┐      │
│    │  INDSATS   [-] 5 [+]  │      │
│    │   ✨ 47/100 spins     │      │
│    └───────────────────────┘      │
│                                   │
│         ┌───────────┐             │
│         │   SPIN    │             │
│         │    🎮     │             │
│         └───────────┘             │
│                                   │
│      ┌─────────────────┐          │
│      │ [10▼] [▶ AUTO]  │          │
│      └─────────────────┘          │
│                                   │
│      ┌─────────────────┐          │
│      │    🔊   [i]     │          │
│      └─────────────────┘          │
└───────────────────────────────────┘
```

## Key Improvements

### 1. Create New `SlotControlPanel` Component
A unified control panel component that groups related controls with proper visual hierarchy:

**Left Panel (Bet Section)**
- Bet controls with styled container (dark amber gradient background)
- Spins remaining integrated directly below bet in same container
- Clear "INDSATS" label

**Center (Spin Button)**
- Keep the existing beautiful spin button design
- Remove from inline layout - give it breathing room

**Below Spin (Autospin Row)**
- Move autospin controls below the spin button
- Horizontal row with dropdown + toggle button
- More discoverable and less cluttered

**Right Panel (Utilities)**
- Volume control
- Pay Table button (moved here from below)

### 2. Enhanced BetControls Component
Update to be more visually polished:
- Darker amber gradient background matching the theme
- Integrated spins display below
- Larger, more tappable +/- buttons on mobile
- Remove separate label - integrate into the panel header

### 3. New AutospinRow Component
Separate component for autospin controls:
- Cleaner horizontal layout
- Consistent button styling
- Status indicator when active

## Files to Create/Modify

| File | Action | Changes |
|------|--------|---------|
| `src/components/slots/SlotControlPanel.tsx` | **Create** | New unified control panel with proper layout structure |
| `src/components/slots/BetControls.tsx` | **Modify** | Enhanced styling with integrated spins display option |
| `src/components/slots/AutospinRow.tsx` | **Create** | Extracted autospin controls as separate component |
| `src/components/slots/SlotGame.tsx` | **Modify** | Replace inline controls with new SlotControlPanel component |

## Component Designs

### SlotControlPanel
```tsx
interface SlotControlPanelProps {
  bet: number;
  onBetChange: (bet: number) => void;
  onSpin: () => void;
  onAutoSpinToggle: () => void;
  isSpinning: boolean;
  canSpin: boolean;
  isAutoSpinning: boolean;
  autoSpinCount: AutoSpinCount;
  onAutoSpinCountChange: (count: AutoSpinCount) => void;
  autoSpinsRemaining: number | null;
  bonusState: BonusState;
  disabled?: boolean;
}
```

### BetControls (Updated)
```tsx
interface BetControlsProps {
  bet: number;
  onBetChange: (bet: number) => void;
  disabled?: boolean;
  minBet?: number;
  maxBet?: number;
  showSpins?: boolean; // New prop to show spins inline
  spinsRemaining?: number;
  maxSpins?: number;
}
```

### AutospinRow (New)
```tsx
interface AutospinRowProps {
  isAutoSpinning: boolean;
  autoSpinCount: AutoSpinCount;
  onAutoSpinCountChange: (count: AutoSpinCount) => void;
  onToggle: () => void;
  autoSpinsRemaining: number | null;
  disabled?: boolean;
}
```

## Styling Details

### Unified Panel Background
- `bg-gradient-to-r from-amber-950/80 to-amber-900/60`
- `border border-amber-500/30`
- `backdrop-blur-sm`
- `rounded-xl` for softer edges
- Consistent padding: `p-3 sm:p-4`

### Button Sizes
- Bet +/- buttons: `h-10 w-10` on mobile, `h-8 w-8` on desktop
- Autospin buttons: Consistent `h-10` height
- Volume/Info buttons: `h-10 w-10` icon buttons

### Spacing
- Gap between major sections: `gap-4 sm:gap-6`
- Internal gaps: `gap-2`

## Expected Result

A cleaner, more intuitive control layout where:
1. Users can easily see their bet and remaining spins together
2. The spin button is the clear focal point
3. Autospin controls are discoverable but not cluttering main controls
4. Mobile users get larger, more tappable controls
5. All controls share a consistent visual theme

