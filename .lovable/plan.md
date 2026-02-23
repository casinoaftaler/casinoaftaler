

## Add Fedesvin Credit Coin Icon Across All Credit Displays

Save the uploaded coin image as a project asset and create a tiny reusable `CreditCoin` component, then replace the current generic icons (Sparkles, Zap) with this coin wherever credits are displayed.

### New Files

**1. Copy coin image to `src/assets/fedesvin-credit-coin.png`**

**2. Create `src/components/CreditCoin.tsx`**
- A simple reusable component that renders the coin image at a configurable size
- Default size: 16x16px (`h-4 w-4`)
- Props: `size` (sm/md/lg) and optional `className`

### Files to Update

**3. `src/components/slots/GatesControlBar.tsx`** (all 3 slot games use this now)
- Replace the `Sparkles` icon in the Credits section (line 142) with `CreditCoin`

**4. `src/components/spin-the-reel/UserStatsBar.tsx`**
- Replace the `Zap` icon next to "Slot Credits" (line 30) with `CreditCoin`

**5. `src/components/profile/ProfileCommunityBonusSection.tsx`**
- Replace the `Sparkles` icon next to "Uaktiverede" count (line 51) with `CreditCoin`
- Replace the `Sparkles` icon in the "Aktiver Credits" button (line 73) with `CreditCoin`

**6. `src/components/profile/ProfileRewardsProgress.tsx`**
- Replace the `Sparkles` icon in the header (line 42) with `CreditCoin`
- Add a small coin next to the credits counter text (line 46-47)
- Add a small coin next to each "+5 credits" label (line 110)

**7. `src/components/profile/ActivateBonusSpinsDialog.tsx`**
- Replace the `Sparkles` icon in the dialog title (line 41) with `CreditCoin`

**8. `src/components/profile/ProfileSlotRequestStats.tsx`**
- Add a small coin next to "Credits Optjent" value (line 57)

### Technical Details

The `CreditCoin` component will be:
```tsx
import coinImage from "@/assets/fedesvin-credit-coin.png";
import { cn } from "@/lib/utils";

const SIZES = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };

export function CreditCoin({ size = "md", className }) {
  return <img src={coinImage} alt="" className={cn(SIZES[size], "inline-block", className)} />;
}
```

This keeps changes minimal -- just swapping icon components -- while giving a consistent branded credit identity across the entire site.

