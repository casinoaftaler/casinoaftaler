

## Update Giveaway Banner with New Background Image

### Overview
Replace the current giveaway banner background with the uploaded Egyptian-themed headset image and update the text overlays to match the requested content.

### Changes Required

| File | Action |
|------|--------|
| `src/assets/slots/giveaway-banner.png` | Replace with uploaded image |
| `src/components/slots/GiveawayBanner.tsx` | Update text content |

### Implementation Details

**1. Copy the uploaded image to assets**
- Copy `user-uploads://image-17.png` → `src/assets/slots/giveaway-banner.png`

**2. Update GiveawayBanner.tsx text overlays**
- Top text: "Vind et gamer headset!"
- Bottom text line 1: "Turneringen starter mandag d. 9 og slutter søndag d 19."
- Bottom text line 2: "Værdi: 700kr"

The component already has the correct structure with text overlays positioned at top and bottom with semi-transparent backgrounds - we just need to update the text content.

