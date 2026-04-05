

## Play Scatter Celebration Video in Scatter Cells — Gates of Fedesvin

### Overview
When scatters trigger a bonus in Gates of Fedesvin, play the uploaded video inside each scatter cell (replacing the current CSS glow animation). The video has a black background, so we'll use a black-chroma-key variant to make it transparent.

### Steps

**1. Add the video asset**
- Copy `user-uploads://hf_20260405_120256_66841dd4-18ee-4b5c-bb60-9e334a0b1e3d.mp4` to `public/videos/gates-scatter-celebration.mp4`

**2. Create a BlackChromaKeyVideo component (or extend ChromaKeyVideo)**
- The existing `ChromaKeyVideo` removes green. We need a variant that removes black (dark pixels → transparent).
- New fragment shader: discard pixels where `r + g + b < threshold` (e.g. 0.15), with soft-edge alpha falloff for near-black pixels.
- Same structure as `ChromaKeyVideo` but with the black-key shader.

**3. Add `scatter-video` cell animation state to GatesColumn**
- Add `'scatter-video'` to the `CellAnimState` type.
- When `cellAnim === 'scatter-video'`, render the `BlackChromaKeyVideo` component inside the cell, sized to `SYMBOL_WIDTH × SYMBOL_HEIGHT`, overlaid on top of the scatter symbol.
- The video plays once (`loop={false}`), positioned absolutely over the scatter image.

**4. Update GatesSlotGame scatter celebration logic**
- In all places where `scatter-pulse` is set on scatter positions, change to `scatter-video`.
- Keep the 1500ms wait (or adjust to match video duration).
- After video ends / timeout, reset `cellAnimStates` back to empty map as before.

**5. Keep existing CSS scatter-pulse as fallback**
- The `scatter-pulse` CSS animation remains available but won't be used for Gates scatter celebrations anymore.

### Technical Details
- The black-key shader replaces the green-dominance check with a luminance check: `float lum = r * 0.299 + g * 0.587 + b * 0.114; if (lum < 0.08) discard;` with soft edge smoothstep for lum 0.08–0.15.
- Video preloaded on component mount to avoid delay when scatters land.
- Component renders as `position: absolute; inset: 0; z-index: 10` inside the cell div.

