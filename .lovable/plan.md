

# Fix Fedesvin Bonanza Card Size

## Problem
In the 2-column grid, the first two cards share a row and size each other via `items-stretch`. The third card (Fedesvin Bonanza) sits alone on the second row with no sibling to match height against, so it can render at a different (likely larger) height.

## Solution
Add a fixed `aspect-ratio` to the `FeaturedSlotPanel` component so all cards render at a consistent height regardless of row siblings.

### File: `src/components/games/FeaturedSlotPanel.tsx`
- Add `aspect-video` (16:9) class to the outer card container alongside the existing `h-full`, ensuring every card has the same proportional height
- This keeps all three cards visually identical whether they share a row or not

### Alternative considered
Adding a fixed pixel height (e.g. `h-[300px]`) -- but `aspect-video` is more responsive and matches the 1200x675 image ratio already used.

