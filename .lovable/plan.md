

## Plan: Upgrade Plain Text Menu Links with Icons

### Problem
The "Casinoer", "Nye Casinoer", "Live Casino", "Casino Bonus", "Community", "Betalingsmetoder", "Info & Om", and "Forfattere" sections all use plain text links (`MegaLink`), which look bland compared to the logo-card sections (Spiludviklere, Anmeldelser).

### Approach
Inspired by the reference image (image 2), each text link gets a small, colorful icon to the left — making them visually richer while keeping them compact. Two options:

**Option A — Lucide icons with colored circles**
Each `MegaLink` gets a Lucide icon wrapped in a small colored circle/badge (like the reference shows). We map each link to a relevant icon (e.g., Trophy for "Top 10", Zap for "Hurtig Udbetaling", Gift for bonus links, etc.). The circle backgrounds use a few accent colors for visual variety.

**Option B — Small custom illustration images**
Create or source ~40 small PNG/WebP illustrations (like the betting reference). More visually unique but significantly more work and maintenance.

### Recommendation: Option A
Lucide icons are already in the project, require no new assets, and can be mapped semantically. A small colored background circle (24×24px) gives the same visual pop as the reference.

### Implementation Details

1. **Extend `navData.ts`**: Add an optional `iconName` field (Lucide icon name string) to relevant link arrays (`CASINO_LINKS`, `NYE_CASINOER_LINKS`, `LIVE_CASINO_LINKS`, `BONUS_LINKS`, `COMMUNITY_LINKS`, `PAYMENT_LINKS`, `MORE_LINKS`, `FORFATTER_LINKS`). Map each link to a semantically relevant icon.

2. **Update `MegaLink` in `DesktopMegaNav.tsx`**: Accept an optional icon prop. When present, render a small colored circle with the Lucide icon before the label. Use 4-5 rotating accent colors (purple, blue, green, amber, rose) based on index for variety.

3. **Update call sites**: Pass the icon data through `ExpandableGrid`, `ExpandableColumn`, and `MegaLink` where applicable.

### Visual Result
Each text link goes from:
```
┌─────────────────────────┐
│ Hurtig Udbetaling     › │
└─────────────────────────┘
```
To:
```
┌─────────────────────────┐
│ ⚡ Hurtig Udbetaling  › │
│ (colored circle bg)      │
└─────────────────────────┘
```

### Files Changed
- `src/components/header/navData.ts` — add `iconName` to link entries
- `src/components/header/DesktopMegaNav.tsx` — update `MegaLink`, `ExpandableGrid`, `ExpandableColumn` to render icons

