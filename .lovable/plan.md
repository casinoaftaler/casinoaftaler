

# Make Fedesvin Bonanza Public and Remove Debug Tools

## Overview
Open Fedesvin Bonanza to all authenticated users (not just admins) and remove the debug/force-bonus button.

## Changes

### 1. Remove admin-only gate (`src/pages/FedesvinBonanza.tsx`)
- Remove the `isAdmin` check and the "Kommer snart!" block (lines ~117-138) that blocks non-admin users
- Remove `isAdmin` from the `useAuth()` destructure since it's no longer needed on this page

### 2. Remove debug button (`src/components/slots/BonanzaSlotGame.tsx`)
- Remove the `Bug` icon import
- Remove `debugScattersRef` ref
- Remove the `debugButton` prop passed to `GatesControlBar` (the entire block rendering the bug button)
- Remove the `useDebugScatters` usage in the spin handler that sends it to the server
- Remove `isAdmin` from `useAuth()` destructure if no longer needed

### 3. No leaderboard changes needed
The leaderboard and stats components (`SlotLeaderboard`, `SpinsRemaining`, etc.) are already wired up with `gameId="fedesvin-bonanza"` and will work for all users once the admin gate is removed.

## Technical Notes
- The `GatesControlBar` component will simply receive `undefined` for `debugButton` (or we stop passing it entirely), which it already handles gracefully
- The server-side spin endpoint may still accept a debug parameter, but since the client no longer sends it, this is harmless
