
# Plan: Add CasinoCardDisclaimer Footer to SlotCasinoCard

## Overview
Add the same legal disclaimer footer from the main casino cards to the SlotCasinoCard component on the slot machine page.

## Implementation

### File: `src/components/slots/SlotCasinoCard.tsx`

**Changes:**
1. Import the `CasinoCardDisclaimer` component
2. Add the disclaimer below the "HENT BONUS" button

The disclaimer will display:
- First 6 segments of the legal text (18+, Spil ansvarligt, links to Rofus.nu, StopSpillet.dk, etc.)
- Expandable "Vis vilkår" toggle for full terms
- Clickable links for legal domains

### Code Changes

```tsx
// Add import
import { CasinoCardDisclaimer } from "@/components/CasinoCardDisclaimer";

// Add after the CTA Button (before closing </div> of content)
<CasinoCardDisclaimer />
```

The disclaimer component already has styling that works well with the dark/amber theme:
- `text-[10px] text-white/60` for subtle appearance
- Centered text alignment
- Expandable toggle for full terms
