

## Plan: Add 4 CampoBet Screenshots to /casinoer Hub

### What I'll Do

1. **Convert images to WebP** – Copy all 4 uploaded PNGs, convert to optimized WebP (<150KB) and save in `src/assets/screenshots/`

2. **Import and place screenshots** across varied sections (anti-footprint rule: no clustering):

| Screenshot | Content | Placement (section) | `size` |
|---|---|---|---|
| Indbetaling (betalingsmetoder) | CampoBet kassesektion med MobilePay, Visa, PayPal etc. | Section 7: Betalingsmetoder (~line 462) | `"medium"` |
| Udbydere (providers grid) | CampoBet udbyderoversigt med 80+ spiludviklere | Section 11: Spiludviklere (~line 589) | `"full"` |
| Live Spil (live casino lobby) | CampoBet live casino med Roulette, Blackjack, Baccarat | Section 10: Spiltyper (~line 543) | `"full"` |
| Ansvarligt spil | CampoBet ansvarligt spil-sektion | Section 12: Ansvarligt Spil (~line 620) | `"medium"` |

3. **Alt/caption metadata** – Each screenshot gets a unique, descriptive Danish alt text and caption referencing CampoBet.dk as source. First screenshot uses `eager` if above fold (none will be – all use `lazy`).

### File Changes
- **4 new assets** in `src/assets/screenshots/` (WebP format)
- **1 file edited**: `src/pages/casinoer/CasinoerHub.tsx` – add 4 imports + 4 `<ReviewScreenshot>` placements

This gives the page 5 total screenshots (1 Betano + 4 CampoBet) distributed across 5 different H2 sections, ensuring no clustering pattern.

