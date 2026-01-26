
# Casino Card Redesign - Roshtein Style

## Overview
Redesign the casino cards to match the roshtein.com/casino aesthetic with a cleaner, more modern look featuring:
- Dark-themed card backgrounds with gradient overlays
- Horizontal row layout for bonus stats
- Clean feature badges with checkmark icons
- Prominent "Claim Bonus" button styling
- Featured cards at top with larger visual presentation

---

## Design Analysis: Roshtein.com Reference

### Key Visual Elements
1. **Featured Cards (Top 2)**: Large cards with casino branding images/backgrounds, prominent logos, and hero-style presentation
2. **Regular Cards**: Horizontal row layout with logo on left, stats in middle columns, features with checkmarks, and CTA button on right
3. **Color Scheme**: Dark purple/navy backgrounds with white text, subtle gradients
4. **Stats Display**: Percentage + amount + free spins shown in columns
5. **Features**: Listed with green checkmarks, horizontal flow
6. **CTA Button**: Rounded, subtle styling with "Claim Bonus" text

---

## Implementation Plan

### Phase 1: Update Card Layout Structure

**File: `src/components/CasinoCard.tsx`**

1. **New Featured Card Design (Rank 1-2)**
   - Add gradient background overlay with casino branding
   - Large centered logo
   - Prominent bonus display (percentage + amount)
   - Feature badges with checkmark icons
   - Full-width "CLAIM BONUS" button

2. **New Regular Card Design (Rank 3+)**
   - Horizontal row layout
   - Left: Casino logo (smaller, square)
   - Center: Stats columns (% up to, Amount, Free Spins, -)
   - Right-center: Features with checkmark icons (3 max)
   - Right: "CLAIM BONUS" button + info icon

### Phase 2: Styling Updates

**Color & Background Changes**
- Featured cards: Dark gradient backgrounds (purple/navy tones)
- Regular cards: Semi-transparent dark backgrounds
- Text: White primary, muted gray secondary
- Accent: Green checkmarks for features

**Stats Display**
- Column-based layout: "% up to" | "Amount" | "Free Spins" | "-"
- Clear labels above values
- Bold values with proper sizing

**Feature Badges**
- Replace colored badge pills with checkmark + text format
- Green checkmark icons
- White text on dark background

**CTA Button**
- Rounded pill shape
- Subtle border/outline style (not filled)
- "CLAIM BONUS" text
- Hover state with fill

### Phase 3: Remove/Simplify Elements

**Elements to Remove or Simplify**
- Collapsible stats sections (make stats always visible)
- Collapsible features toggle
- Multiple stat rows (consolidate into single row)
- Complex ranking badges (simplify to number in corner)
- "EXTRA HOT" badge styling (keep but simplify)
- Glow effects (remove or reduce)

**Elements to Keep**
- Info dialog button (move to corner)
- "Læs Anmeldelse" link
- 18+ disclaimer at bottom

---

## Technical Details

### File Changes Required

```text
src/components/CasinoCard.tsx
├── Featured card variant (rank 1-2)
│   ├── Full-width hero layout
│   ├── Large logo with gradient overlay
│   ├── Stats row (% | Amount | Spins | -)
│   ├── Feature list with checkmarks
│   └── Full-width CTA button
│
└── Regular card variant (rank 3+)
    ├── Horizontal row layout
    ├── Small logo (left)
    ├── Stats columns (center)
    ├── Features with checkmarks (right-center)
    └── CTA button + info (right)
```

### CSS/Styling Changes

```text
src/index.css (optional)
└── Add new card-specific styles if needed

tailwind.config.ts
└── No changes expected (using existing design tokens)
```

### Component Structure

**Featured Card Layout:**
```text
┌─────────────────────────────────────────────────────────┐
│  [Logo]                                        [i] [🔥]  │
│                                                         │
│  ✓ Feature 1  ✓ Feature 2  ✓ Feature 3                 │
│                                                         │
│  ┌─────────┬─────────┬─────────┬─────────┐             │
│  │ 100%    │ $3,000  │ 200     │ -       │             │
│  │ up to   │         │ spins   │         │             │
│  └─────────┴─────────┴─────────┴─────────┘             │
│                                                         │
│  [          CLAIM BONUS          ]                      │
│                                                         │
│  18+ | T&C Apply                                        │
└─────────────────────────────────────────────────────────┘
```

**Regular Card Layout:**
```text
┌────────────────────────────────────────────────────────────────┐
│ [Logo]  │ 200%    │ €500   │ 200     │ ✓ Feature 1  │ [CLAIM] │
│         │ up to   │        │ spins   │ ✓ Feature 2  │ [BONUS] │
│         │         │        │         │ ✓ Feature 3  │   [i]   │
├─────────┴─────────┴────────┴─────────┴──────────────┴─────────┤
│ 18+ | T&C Apply                                               │
└────────────────────────────────────────────────────────────────┘
```

---

## Summary of Changes

| Current | New (Roshtein Style) |
|---------|---------------------|
| Vertical card layout | Horizontal row (regular) / Hero (featured) |
| Colored feature badges | Checkmark + text list |
| Collapsible stats | Always visible stats row |
| Multiple stat sections | Single consolidated row |
| Colorful glow effects | Subtle dark gradients |
| Filled CTA button | Outlined/subtle CTA button |
| Complex rank badges | Simple corner number |

---

## Preserved Features
- Info dialog with full casino details
- "Læs Anmeldelse" link to casino detail page
- 18+ disclaimer
- Dark/light mode support
- Responsive mobile layout
- Ranking system (1, 2, 3+)
- "ANBEFALET" badge for recommended casinos
