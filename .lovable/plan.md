

## Plan: Add two LeoVegas screenshots to Sticky Bonus page

Both uploaded images show the same LeoVegas welcome offer. They need to be converted to WebP assets and placed in two specific sections.

### Steps

1. **Convert and save images as WebP assets**
   - `user-uploads://image-1774693797.png` → `src/assets/screenshots/leovegas-sticky-bonus-mekanik.webp` (the wide/full version for "Mekanikken" section)
   - `user-uploads://Skærmbillede_2026-03-28_112558-2.png` → this is essentially the same as the existing `leovegas-sticky-bonus-velkomst.webp` — keep the existing asset for the "Typiske betingelser" section

2. **Edit `src/pages/StickyBonus.tsx`**
   - **Import** the new asset for the "Mekanikken" section
   - **Insert Screenshot 1** (wide image) after the cards in the "Mekanikken bag en Sticky Bonus" section (~line 294, after the closing `</div>` of the cards). Use `size="medium"` with appropriate alt/caption about LeoVegas sticky bonus mechanics.
   - **Move existing Screenshot 2** (already `leovegasStickyBonus` at line 488-493) into the "Typiske betingelser" section — move it to right after line 485 (after the grid's closing `</div>` inside that section, before the section closes at line 486). Remove the current placement at lines 488-493.

### Technical details
- Both screenshots use `ReviewScreenshot` component with `size="medium"`
- Minimum 15-line gap between screenshots enforced per governance rules
- Image 1 uses `eager={false}` (lazy) as it's below the fold
- WebP conversion via ffmpeg at q82, under 150KB

