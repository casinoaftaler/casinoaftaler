

## Add Free Spin Count Decrement Animation

When a free spin is used in Gates of Fedesvin, the free spins counter (displayed prominently at top center during bonus mode) will animate with a "flip + bounce" effect each time the number decreases.

### Approach

Create a new `AnimatedSpinCounter` component that detects when its value decreases and triggers a CSS flip-bounce animation.

### Changes

**New file: `src/components/slots/AnimatedSpinCounter.tsx`**

A small component that:
- Tracks previous value via `useRef`
- When the value decreases (spin used), applies a CSS class that triggers a vertical flip + scale bounce
- Removes the class after the animation completes (via `onAnimationEnd`)
- Renders the number inside a `span` with `tabular-nums` for stable width

**File: `src/styles/gates-animations.css`**

Add a new `@keyframes gates-spin-decrement` animation:
- 0%: `rotateX(0) scale(1)` -- normal
- 30%: `rotateX(-90deg) scale(0.8)` -- flip away (number changes here visually)
- 60%: `rotateX(0) scale(1.15)` -- flip back, overshoot scale
- 80%: `scale(0.95)` -- slight undershoot
- 100%: `scale(1)` -- settle

Plus a `.gates-spin-decrement` utility class applying this animation (~400ms).

**File: `src/components/slots/GatesSlotGame.tsx`**

Replace the plain `{freeSpinsRemaining}` span (line 502-504) with the new `AnimatedSpinCounter` component, passing the current value and existing className.

### Technical Detail

```text
AnimatedSpinCounter({ value, className })
  |
  |-- prevRef = useRef(value)
  |-- [animating, setAnimating] = useState(false)
  |
  |-- useEffect: if value < prevRef.current -> setAnimating(true)
  |       prevRef.current = value
  |
  |-- <span
  |       className={cn(className, animating && "gates-spin-decrement")}
  |       onAnimationEnd={() => setAnimating(false)}
  |       style={{ display: 'inline-block', perspective: '200px' }}
  |     >
  |       {value}
  |     </span>
```

No backend or database changes needed.

