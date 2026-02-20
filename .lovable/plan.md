

# Gates of Fedesvin: "Coming Soon" for Users, Playable for Admins

## Overview

Move Gates of Fedesvin from the "featured/playable" section to "coming soon" for regular users in the game library, while keeping it fully accessible for admins.

## Changes

### 1. GameLibrary Page (`src/pages/GameLibrary.tsx`)

- Move Gates of Fedesvin from `FEATURED_SLOTS` to `MORE_SLOTS` (coming soon section)
- Use `useAuth()` (which already provides `isAdmin`) to check admin status
- For admins: render Gates as a playable `FeaturedSlotPanel` (not disabled, with link to game)
- For non-admins: render Gates as disabled with "Kommer snart" badge (already handled by `disabled` prop)

Specifically:
- Remove the `gates-of-fedesvin` entry from `FEATURED_SLOTS`
- Add it to `MORE_SLOTS` with `status: "coming-soon"`
- In the rendering logic, override `disabled` to `false` and provide the real `href` when `isAdmin` is true

### 2. Gates Page (`src/pages/GatesOfFedesvin.tsx`)

- Add an admin check: if the user is not an admin, show a "coming soon" message instead of the game
- This prevents direct URL access by non-admin users
- Use `useAuth()` which already provides `isAdmin`

### Files Changed

| File | Change |
|---|---|
| `src/pages/GameLibrary.tsx` | Move Gates to MORE_SLOTS, conditionally enable for admins |
| `src/pages/GatesOfFedesvin.tsx` | Block non-admin users with a "coming soon" screen |

