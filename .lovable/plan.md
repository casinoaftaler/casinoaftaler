

## Increase Slide Height for Disclaimer Visibility

### Problem
The promo slider uses `aspect-[4/3]` which restricts the height, causing the legal disclaimer at the bottom of the SlotCasinoCard to be cut off.

### Solution
Change the aspect ratio to a taller proportion to accommodate all content including the expandable disclaimer.

### Change Required

| File | Change |
|------|--------|
| `src/components/slots/SlotPromoSlider.tsx` | Change `aspect-[4/3]` to `aspect-[3/4]` for a taller container |

### Technical Details
- Line 27: Update from `aspect-[4/3]` to `aspect-[3/4]`
- This changes the container from a landscape (1.33:1) to a portrait (0.75:1) orientation
- The SlotCasinoCard already uses `h-full` with flex layout, so it will automatically fill the new space
- The GiveawayBanner and third slide images will also adapt with `object-cover`

