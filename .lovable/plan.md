

# Plan: Casino Card Footer Disclaimer with Admin Editing

## Overview
Replace the existing short footer disclaimer in casino cards with a new comprehensive Danish legal disclaimer. The footer will show the first 3 sentences with the rest accessible via scrolling. Admins will be able to edit this footer text through the admin panel.

## Current State
- **FeaturedCard** (lines 344-347 in CasinoCard.tsx) has a simple footer:
  ```
  18+ | Vilkår gælder | Spil ansvarligt | Rofus.nu
  ```
- All casino cards now use the FeaturedCard component
- Site settings are stored in the `site_settings` table with key-value pairs
- Admin panel has a "Settings" tab for managing site-wide settings

## New Disclaimer Text
```
Annoncering | 18+ | Spil ansvarligt | Selvudelukkelse via Rofus.nu | Kontakt Spillemyndighedens hjælpelinje på StopSpillet.dk – rådgivning om spilafhængighed | spillemyndigheden.dk |

Tilbud til nye spillere. Gælder indtil videre. Min. indbetaling: 100 kr. Max. bonus: 1000 kr. Tilbuddet gælder kun ved første indbetaling. Bonus og indbetalt beløb skal omsættes 10 gange. Bonusser kan kun anvendes på udvalgte spilleautomater. Bonus er gyldig i 60 dage. Regler og vilkår gælder. CasinoAftaler er ikke ansvarlig for eventuelle fejl i den offentliggjorte tilbudsinformation.
```

## Implementation Steps

### Step 1: Database Changes
Add a new entry to the `site_settings` table for the casino card footer disclaimer:
- **Key**: `casino_card_disclaimer`
- **Default value**: The full disclaimer text provided above

Update the RLS policy to include `casino_card_disclaimer` in the publicly readable settings list.

### Step 2: Create Disclaimer Footer Component
Create a new component `CasinoCardDisclaimer.tsx` that:
- Fetches the disclaimer text from site settings
- Falls back to a default disclaimer if none is set
- Shows only the first 3 sentences (truncated at approximately 150 characters or first 3 sentences based on `|` separators)
- Provides a scrollable area (max-height with overflow-y-auto) for the full text
- Uses subtle styling with small text and muted colors

### Step 3: Update CasinoCard Component
Replace the existing disclaimer paragraph in `FeaturedCard` (lines 344-347) with the new `CasinoCardDisclaimer` component.

### Step 4: Create Admin Disclaimer Input Component
Create `DisclaimerInput.tsx` component for the admin panel:
- Textarea for editing the full disclaimer text
- Save button with loading state
- Uses the same pattern as `SocialLinksInput` and `HeroSettingsInput`

### Step 5: Add Disclaimer Settings to Admin Panel
Add a new section in the Settings tab of the admin panel:
- Label: "Casino Kort Disclaimer"
- Uses the new `DisclaimerInput` component
- Positioned after the existing settings sections

## Technical Details

### Disclaimer Footer Component Structure
```text
+---------------------------------------+
| First 3 sentences visible...          |
|                                       |
| [Scrollable area - max-height: 60px]  |
| Full disclaimer text continues...     |
+---------------------------------------+
```

### Files to Create
1. `src/components/CasinoCardDisclaimer.tsx` - Disclaimer display with scroll
2. `src/components/DisclaimerInput.tsx` - Admin editing component

### Files to Modify
1. `src/components/CasinoCard.tsx` - Replace footer disclaimer with new component
2. `src/pages/Admin.tsx` - Add disclaimer section to Settings tab

### Database Migration
- Add default value for `casino_card_disclaimer` in site_settings
- Update RLS policy to allow public reading of this setting

### Sentence Detection Logic
The disclaimer uses `|` as separators. The component will:
1. Split text by `|` to identify segments
2. Show first 3 segments fully visible
3. Apply `max-height` and `overflow-y-auto` for scrolling the rest
4. Use CSS `mask-image` gradient to indicate more content below

