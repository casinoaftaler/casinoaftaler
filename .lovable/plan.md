

## Fix: Slot Machine Stuck at Bottom on Mobile

### Problem
On mobile devices, both slot machines ("Book of Fedesvin" and "Rise of Fedesvin") appear pushed to the bottom of the screen with a large empty gap above them.

### Root Cause
The CSS for `.slot-viewport-container` in `src/index.css` has `transform-origin: center center`. When the game scales down on mobile (e.g., to 0.3x), the scaling shrinks the content toward its center point, leaving unused space above and below. Combined with the flex container, this results in the game appearing at the bottom.

### Fix
Change the `transform-origin` from `center center` to `top center` in `src/index.css`. This ensures the game scales downward from the top, keeping it anchored at the top of the viewport on mobile.

### Technical Details

**File: `src/index.css`**
- Change `.slot-viewport-container` transform-origin from `center center` to `top center`

This single CSS change fixes the positioning for both slot machine pages since they share the same class.
