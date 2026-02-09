

## Fix: Mobile Control Bar Layout and Scrolling on Rise of Fedesvin

### Problem 1: Control Bar Layout on Mobile

The `SlotControlPanel` renders 6 elements in a single flex row with `flex-wrap` on mobile. This causes items to wrap unpredictably -- some items end up on row 1, some on row 2, with inconsistent sizing and gaps.

**Fix**: Reorganize the mobile layout into a structured 2-row grid:
- **Row 1**: Volume | BetControls | SmallWinBar | SpinButton
- **Row 2**: AutospinRow | PayTable (centered)

On desktop (sm+), keep the current single-row layout.

**File: `src/components/slots/SlotControlPanel.tsx`**
- Replace the single `flex-wrap` container with a responsive layout
- On mobile (< sm): Use a two-row flex layout with the spin button centered in the top row alongside the core controls, and autospin + paytable in a smaller bottom row
- On sm+: Keep the existing single horizontal row (no wrapping)
- Reduce mobile sizes slightly for Volume/PayTable icons to fit better

### Problem 2: Scrolling Cuts Off

The game area container uses `flex-1` which makes it expand to fill available space but doesn't allow it to overflow vertically. The mobile side panels below (`xl:hidden` leaderboard/promo) get pushed off-screen and can't be scrolled to.

**Fix in `src/pages/RiseOfFedesvin.tsx`**:
- Change the outer container from `flex flex-col` with `flex-1` game area to allow natural document flow on mobile
- On mobile (< xl): Remove `flex-1` constraint from the game area so the page flows naturally and the mobile side panels are scrollable
- Keep the `overflow-x-hidden` to prevent horizontal overflow from scaled content
- Change the outer div from `min-h-[calc(100dvh-4rem)]` with `flex flex-col` to use `min-h-[calc(100dvh-4rem)]` with overflow-y-auto so the full page scrolls naturally
- The background stays fixed via absolute positioning with the existing -z-10 setup

### Changes Summary

**`src/components/slots/SlotControlPanel.tsx`**
- Wrap controls in a responsive container:
  - Mobile: Two rows -- top row has Volume + BetControls + Spin + WinBar, bottom row has Autospin + PayTable
  - Desktop: Single row as-is
- Tighten mobile gaps and sizes

**`src/pages/RiseOfFedesvin.tsx`**
- Change game area from `flex-1 flex items-center justify-center` to remove `flex-1` on mobile so content flows naturally
- Add `overflow-y-auto` to the outer container so the page is scrollable
- This ensures the mobile side panels (leaderboard, promo slider) below the game are reachable by scrolling

