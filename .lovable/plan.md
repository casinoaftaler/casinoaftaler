

# Redesign Bonanza Bonus Overlays — Sweet Bonanza Style

The reference images show Sweet Bonanza's bonus screens: a large candy-pink rounded card with a striped candy border, a pink candy/bubble shape holding the key number, golden "CONGRATULATIONS" / "YOU HAVE WON" text, and a "Press Anywhere to Continue" prompt. The current overlays use small glassmorphism cards with dark backgrounds — a completely different aesthetic.

## Design Target (from reference)

- **Large centered card** (~60-70% of viewport width) with a deep purple/magenta semi-transparent background
- **Candy-stripe border** — pink/white diagonal stripe pattern around the card edge
- **Golden "CONGRATULATIONS"** header with text-stroke/shadow
- **"YOU HAVE WON"** subtitle in warm gradient gold
- **Pink candy/bubble shape** in the center holding the main number (spin count or win amount)
- **"FREE SPINS"** or **"in X Free Spins"** label below the bubble
- **Decorative star elements** scattered around the card corners
- **"Press Anywhere to Continue"** at the bottom
- No dark backdrop/vignette — the game grid remains visible behind

## Changes per component

### 1. `BonanzaBonusEntrySequence.tsx` — Bonus Entry
- Replace glassmorphism card with the large candy-card layout
- "CONGRATULATIONS" gold header
- "YOU HAVE WON" subtitle
- Pink candy bubble shape with the free spins count inside (drum-roll counter stays)
- "FREE SPINS" label below the bubble
- Keep flash + particle phases but remove dark vignette
- Add "Press Anywhere to Continue" — clicking completes early (replace auto-timeout)
- Add decorative CSS star elements at card corners

### 2. `BonanzaRetriggerOverlay.tsx` — Retrigger
- Same candy-card layout as entry
- "CONGRATULATIONS" header
- "YOU HAVE WON" subtitle
- Pink candy bubble with "+{spinsAwarded}" inside
- "EXTRA FREE SPINS" label
- "Press Anywhere to Continue" — click to dismiss (replace auto-timeout)

### 3. `BonanzaBonusEndOverlay.tsx` — Bonus End
- Same candy-card layout
- "CONGRATULATIONS" header
- "YOU HAVE WON" subtitle
- Pink candy bubble with the win amount (counting animation stays)
- "in {totalSpins} Free Spins" label below
- "Press Anywhere to Continue" — click to dismiss
- Keep sound effects (swell + slam)

### 4. `bonanza-animations.css` — New CSS
- Add candy-stripe border keyframe/class
- Add pink candy bubble shape (rounded pill with pink gradient + drip/splash decorations via pseudo-elements or inline SVG)
- Add golden text gradient classes
- Add decorative star animation

## Technical Notes
- All three overlays share the same card structure — extract a shared `BonanzaOverlayCard` wrapper component with slots for header, bubble content, and subtitle
- "Press Anywhere to Continue" uses `pointer-events-auto` on the overlay + `onClick` to call `onComplete`
- The candy bubble is a CSS pill shape: `rounded-full` with pink gradient background, white inner shadow, and a slight scale animation
- Decorative stars are small absolute-positioned rotating star SVGs

## Files to modify
| File | Change |
|------|--------|
| `src/components/slots/BonanzaOverlayCard.tsx` | **New** — shared candy-card wrapper |
| `src/components/slots/BonanzaBonusEntrySequence.tsx` | Use new card, candy bubble with counter |
| `src/components/slots/BonanzaRetriggerOverlay.tsx` | Use new card, candy bubble with +spins |
| `src/components/slots/BonanzaBonusEndOverlay.tsx` | Use new card, candy bubble with win amount |
| `src/styles/bonanza-animations.css` | Add candy-stripe, bubble, star animations |

