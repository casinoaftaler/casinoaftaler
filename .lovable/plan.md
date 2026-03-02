

# Fix Win Celebration: Remove Black Box, Better Pulse, Skip-to-Count-End

## Changes

### 1. Remove the black background box (lines 515-548 in WinCelebration.tsx)
The inner `<div>` wrapping the win text has `background: linear-gradient(... rgba(0,0,0,0.7) ...)`, a border, rounded corners, and box-shadow -- this creates the visible black rectangle. Remove the background, border, box-shadow, and backdrop-blur from this container so only the text and its glow are visible.

### 2. Add a stronger pulse effect after counting finishes
Currently `isPulsing` applies `animate-[win-amount-pulse_0.25s_ease-in-out_3]` (3 pulses). Change this to a continuous, more dramatic pulse animation on both the win label and the amount, with a glowing scale effect that loops until the celebration fades out.

### 3. Change skip to only skip the counter, not the whole animation
Currently `handleSkip` immediately fades out and calls `onAnimationComplete`. Instead:
- **First click (while counting)**: Jump the counter to the final value instantly (the existing `useAnimatedCounter` already snaps when `targetValue` matches, so we just need to force it). We can do this by setting a "skipCounter" state that makes the counter display the final amount immediately, then the existing `useEffect` at line 167 detects `displayAmount === winAmount` and triggers the pulse + fade-out flow naturally.
- **Second click (during pulse/after counting)**: Then dismiss the whole celebration (current skip behavior).

### Files to modify
- **`src/components/slots/WinCelebration.tsx`** -- all three changes
- **`src/hooks/useAnimatedCounter.ts`** -- add ability to force-skip to end value
- **`src/styles/slot-animations.css`** -- add a continuous pulse keyframe for the post-count effect

### Technical approach

**useAnimatedCounter.ts**: Add an optional `skipToEnd` boolean param. When true, immediately cancel the animation and return `targetValue`.

**WinCelebration.tsx**:
- Add `counterSkipped` state (boolean)
- On first click: set `counterSkipped = true` (passed to useAnimatedCounter to skip)
- On second click (when `isPulsing` or counting is done): run current fade-out dismiss logic
- Remove `background`, `border`, `borderColor`, `boxShadow`, `backdrop-blur-md`, and `rounded-2xl` from the inner card div -- keep only padding for text layout
- Make `isPulsing` animation continuous (`infinite`) and more dramatic (scale 1 to 1.12)

**slot-animations.css**: Add `win-amount-pulse-loop` keyframe with continuous scale + glow breathing.

