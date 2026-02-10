

## Fix: Mobile Side Panels Position (Closer to Game)

### Problem

On mobile, the game container div uses `flex-1` which makes it expand to fill the entire remaining viewport height. Even though the slot game is scaled down and visually small, the container still occupies the full flex space. The mobile side panels (leaderboard, promo slider) appear after this oversized container, resulting in a large empty gap before the panels become visible.

### Root Cause

Both `SlotMachine.tsx` (line 190) and `RiseOfFedesvin.tsx` (line 195) have:
```
<div className="flex-1 flex items-start justify-center overflow-hidden">
```

The `flex-1` class makes this container grow to fill all available space in the flex column, pushing the mobile panels far below.

### Fix

Remove `flex-1` from the game container on screens below `xl` breakpoint so the container only takes up the space the scaled game actually needs. On `xl` and above, keep `flex-1` so the desktop layout remains unchanged.

**File 1: `src/pages/SlotMachine.tsx`** (line 190)
- Change `flex-1 flex items-start justify-center overflow-hidden` to `xl:flex-1 flex items-start justify-center overflow-hidden`

**File 2: `src/pages/RiseOfFedesvin.tsx`** (line 195)
- Change `flex-1 flex items-start justify-center overflow-hidden` to `xl:flex-1 flex items-start justify-center overflow-hidden`

This single-class change ensures:
- Mobile/tablet: container shrinks to fit the scaled game, panels sit right below
- Desktop (xl+): container still fills viewport height as before

