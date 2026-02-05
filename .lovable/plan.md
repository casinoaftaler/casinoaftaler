
# Plan: Fix Giveaway Banner Image and Display

## Changes Required

### 1. Process Giveaway Image
Use AI to remove the black corners/background from the uploaded image, creating a proper transparent PNG that preserves the Egyptian-themed card design with its rounded corners.

### 2. Update GiveawayBanner Component
Simplify the component to display the giveaway image directly as the full card:
- Remove the `backgroundImage` prop (no longer needed)
- Remove the casino card background styling
- Remove the dark overlay
- Display the giveaway image to fill the entire container
- Keep the rounded corners and amber border styling

**Before:**
```
Card with casino background → overlay → small centered giveaway image
```

**After:**
```
Giveaway image fills entire card (with transparent corners that blend)
```

### Files to Modify
| File | Change |
|------|--------|
| `src/assets/slots/giveaway-banner.png` | Re-process with transparent corners |
| `src/components/slots/GiveawayBanner.tsx` | Remove background, make image fill card |
| `src/components/slots/SlotPromoSlider.tsx` | Remove backgroundImage prop from GiveawayBanner |
