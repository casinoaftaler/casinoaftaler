
# Plan: Slot Machine Performance & UX Optimizations

## Overview

After analyzing the slot machine codebase, I've identified several optimization opportunities across performance, code architecture, user experience, and maintainability.

---

## 1. Performance Optimizations

### 1.1 Memoization & Re-render Prevention

**Problem**: The `SlotGame` component is nearly 1000 lines with many state variables that can trigger unnecessary re-renders.

**Solutions**:
- Wrap expensive callback functions with `useCallback` that aren't already memoized (e.g., `getWinningPositions`, `getSymbolDimensions`)
- Use `React.memo()` on `SlotReel`, `SlotSymbol`, and `WinLines` components to prevent re-renders when props haven't changed
- Move `symbolDimensions` calculation into a `useMemo` hook instead of recalculating every render

### 1.2 Responsive Dimension Caching

**Problem**: `getSymbolHeight()` and `getGap()` in `SlotReel.tsx` are called multiple times per render and query `window.innerWidth` each time.

**Solution**: Create a custom hook `useResponsiveSlotDimensions` that:
- Caches dimensions based on current breakpoint
- Only recalculates on window resize (debounced)
- Shares dimensions via context to avoid prop drilling

### 1.3 Reel Strip Generation Optimization

**Problem**: `buildReelStrip()` creates 30 random symbols every spin, using `Math.random()` in a loop.

**Solution**: 
- Pre-generate a pool of random symbol strips on component mount
- Rotate through the pool instead of regenerating each spin
- Use a more efficient shuffling algorithm

### 1.4 Animation Frame Cleanup

**Problem**: Multiple `requestAnimationFrame` calls in `SlotReel` could accumulate if not properly cleaned up.

**Solution**: Ensure all animation cleanup is robust by using a cleanup ref pattern:
```typescript
const cleanupRef = useRef(false);
useEffect(() => {
  cleanupRef.current = false;
  return () => { cleanupRef.current = true; };
}, []);
// Check cleanupRef.current before calling setOffset in animation loops
```

---

## 2. Code Architecture Improvements

### 2.1 Extract SlotGame Logic into Custom Hooks

**Problem**: `SlotGame.tsx` is nearly 1000 lines with complex state management mixed with rendering.

**Solution**: Split into focused hooks:
- `useSlotGameState` - Core game state (grid, bet, isSpinning, etc.)
- `useSlotReelSequencing` - Reel stop timing and tease mode logic  
- `useSlotWinHandling` - Win calculation, animation, and sound coordination
- `useSlotAutospin` - Autospin timer and control logic

This would reduce `SlotGame.tsx` to ~300 lines of UI rendering.

### 2.2 Consolidate Timeout/Ref Management

**Problem**: Multiple timeout refs (`autoSpinTimeoutRef`, `winLinesTimeoutRef`, `spinLockTimeoutRef`, `initialSpinTimeoutRef`) managed separately.

**Solution**: Create a `useTimeoutManager` hook:
```typescript
const timeouts = useTimeoutManager();
timeouts.set('autospin', () => handleSpin(), 1000);
timeouts.clear('autospin');
// Auto-cleanup on unmount
```

### 2.3 State Machine Pattern for Spin Lifecycle

**Problem**: Complex boolean state combinations (`isSpinning`, `isSpinLocked`, `isWinAnimating`, `showScatterCelebration`, etc.) make it hard to track game state.

**Solution**: Implement a finite state machine:
```typescript
type SlotState = 
  | 'idle' 
  | 'spinning' 
  | 'stopping' 
  | 'showing-connecting-wins'
  | 'expanding'
  | 'showing-expansion-wins'
  | 'celebrating-scatter'
  | 'showing-bonus-overlay'
  | 'animating-win';
```

---

## 3. Sound System Optimizations

### 3.1 Lazy Load Synthesized Sound Code

**Problem**: The `slotSoundEffects.ts` file is 2600+ lines with complex synthesis code that may never be used if custom sounds are uploaded.

**Solution**:
- Move synthesized fallback functions to a separate `slotSoundSynthesis.ts` file
- Dynamically import only if needed (when no custom sound is available)
- This reduces initial bundle parsing time

### 3.2 Web Audio Worklet for Complex Sounds

**Problem**: Synthesized sounds (Egyptian scale, drones) run on the main thread.

**Solution**: Move complex audio synthesis to an AudioWorklet for background processing (lower priority optimization).

---

## 4. User Experience Improvements

### 4.1 Smooth Skeleton Loading

**Problem**: The loading state shows a basic spinner.

**Solution**: Add a shimmer/skeleton that matches the slot machine layout:
- 5 skeleton reel columns with pulsing animation
- Skeleton control panel
- Creates perception of faster loading

### 4.2 Preload Next Spin During Win Animation

**Problem**: After a win animation, there's a brief pause before next spin can start.

**Solution**: Pre-generate the next grid during win animation:
```typescript
useEffect(() => {
  if (isWinAnimating) {
    nextGridRef.current = generateGrid(symbols);
  }
}, [isWinAnimating]);
```

### 4.3 Progressive Symbol Loading Indicator

**Problem**: If symbol images are slow to load, users see nothing.

**Solution**: Show loading progress with symbol names and checkmarks as each loads.

---

## 5. Database Query Optimizations

### 5.1 Batch Leaderboard Queries

**Problem**: Leaderboard fetches could be slow with many users.

**Solution**: 
- Add a database index on `slot_game_results(user_id, created_at)`
- Consider materializing the leaderboard view for faster reads

### 5.2 Debounce Game Result Inserts

**Problem**: Each spin immediately inserts a row to `slot_game_results`.

**Solution**: During autospin, batch results and insert every 5 spins to reduce database calls.

---

## Implementation Priority

| Priority | Optimization | Impact | Effort |
|----------|-------------|--------|--------|
| High | Memoization & React.memo | Smoother animations | Low |
| High | Extract hooks from SlotGame | Maintainability | Medium |
| High | Responsive dimension caching | Performance | Low |
| Medium | State machine pattern | Code clarity | Medium |
| Medium | Skeleton loading states | UX perception | Low |
| Medium | Lazy load sound synthesis | Bundle size | Low |
| Low | Web Audio Worklet | CPU usage | High |
| Low | Batch DB inserts | DB load | Medium |

---

## Recommended Starting Point

Start with the highest-impact, lowest-effort optimizations:

1. **Add `React.memo()` to SlotSymbol and SlotReel** - Immediate performance gain
2. **Create `useResponsiveSlotDimensions` hook** - Eliminates repeated window queries
3. **Wrap callbacks in useCallback** - Prevents child re-renders
4. **Add skeleton loading state** - Better perceived performance

These can be done incrementally without breaking existing functionality.
