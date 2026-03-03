

## Plan: Make Bonus Entry & End Overlays Full Grid Size

The `BonanzaOverlayCard` currently has a fixed max width of `min(320px, 80%)`. To make it cover the entire slot grid (matching the reference image), the card needs to fill the parent container.

### Change: `src/components/slots/BonanzaOverlayCard.tsx`

- Change the inner card's width from `min(320px, 80%)` to `100%` and height to `100%`
- Add `justify-center` to vertically center content within the full-size card
- Keep the same design (gradient background, candy stripe border, stars, bubble, golden text) — just expand to fill the grid
- Remove the rounded corners on the outer card since it now fills the grid edge-to-edge (or keep subtle rounding)
- Scale up the bubble and text sizes slightly to look proportional in the larger card

