
# Plan: Add #1 Casino Card with Custom Background Below Leaderboard

## Overview
Add the #1 ranked casino card underneath the leaderboard on the slot machine page, using the uploaded Egyptian cat image as the card background instead of the current gradient. The card will match the leaderboard width (w-80).

## Implementation Steps

### 1. Save the Background Image
Copy the uploaded Egyptian cat image to the project assets folder for use as the casino card background.

**File:** `src/assets/slots/slot-casino-card-bg.png`

### 2. Create a Specialized Casino Card Component for Slots
Create a new component `SlotCasinoCard` that renders a casino card with a custom background image instead of the gradient.

**File:** `src/components/slots/SlotCasinoCard.tsx`

Key features:
- Accept a `backgroundImage` prop to display the Egyptian cat image
- Render the #1 casino data in a compact format matching the leaderboard width
- Maintain the Egyptian/amber theme to match the slot machine page
- Include the "HENT BONUS" button with affiliate link functionality

### 3. Update SlotMachine Page
Modify the slot machine page to:
- Fetch the #1 ranked casino using `useCasinos` hook
- Display the `SlotCasinoCard` component below the leaderboard toggle/content on desktop
- On mobile, show it below the collapsible leaderboard section

**File:** `src/pages/SlotMachine.tsx`

Changes:
- Import the new `SlotCasinoCard` component and background image
- Add casino data fetching
- Position the card below the leaderboard in the left sidebar (desktop) and below collapsible leaderboard (mobile)

## Visual Layout

```text
Desktop (xl+):
+------------------+     +-------------------+
|  Toggle Button   |     |                   |
+------------------+     |                   |
|  Leaderboard     |     |   Slot Machine    |
|  (if visible)    |     |                   |
+------------------+     |                   |
|  #1 Casino Card  |     |                   |
|  (with cat bg)   |     |                   |
+------------------+     +-------------------+

Mobile:
+-------------------------+
|     Slot Machine        |
+-------------------------+
|   Toggle Leaderboard    |
+-------------------------+
|   Leaderboard (if open) |
+-------------------------+
|   #1 Casino Card        |
+-------------------------+
```

## Technical Details

### SlotCasinoCard Component Structure
- Background: Egyptian cat image with dark overlay for text readability
- Logo: Casino logo (h-16 w-16, smaller than standard cards)
- Name and rating: Compact header
- Bonus headline: Prominent display
- Key stats: Bonus type and wagering requirements
- CTA button: "HENT BONUS" with affiliate redirect
- Amber/gold themed borders and accents to match slot page

### Data Flow
1. Use existing `useCasinos()` hook to get all active casinos
2. Filter for the #1 ranked casino (position = 1 or first in sorted array)
3. Pass casino data and background image to `SlotCasinoCard`

### Responsive Behavior
- Desktop (xl+): Card in left sidebar, full w-80 width, below leaderboard
- Mobile/Tablet: Card below collapsible leaderboard, max-w-sm width
