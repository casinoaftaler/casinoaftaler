

# Darker Pink Background During Bonus

The reference (image 2) shows the grid background turning from the light pastel pink to a deeper purple/magenta tint during free spins — similar to `rgba(120, 40, 100, 0.8)` or a `from-pink-900/80 via-fuchsia-900/70 to-pink-800/80` gradient.

## Change

**`src/components/slots/BonanzaSlotGame.tsx`** — Make the grid container's background conditional on `isBonusActive`:

- **Normal mode** (current): `bg-gradient-to-b from-pink-100/80 via-rose-50/70 to-fuchsia-100/80` with `border-pink-400/60`
- **Bonus mode**: `bg-gradient-to-b from-pink-800/80 via-fuchsia-900/70 to-pink-900/80` with `border-pink-500/50` and a stronger pink/purple shadow glow

Also add a CSS `transition-colors duration-500` so the shift fades smoothly when bonus activates/deactivates, and similarly darken the reel divider gradient during bonus.

Single file change (~5 lines modified around line 720-724).

