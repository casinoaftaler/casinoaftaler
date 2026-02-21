
# Replace CSS Zeus Silhouette with AI-Generated Zeus Sprite

Replace the hand-drawn CSS silhouette of Zeus with a proper illustrated character image generated via AI, while keeping all existing animation and intensity state logic.

---

## Approach

Use the existing AI image generation pipeline (same pattern as `generate-slot-symbol`) to generate a Zeus character illustration, upload it to storage, then use the image in the component. The CSS animations (breathing, bounce, climax power pose) will apply to the image container via `transform` and `filter` rather than drawing individual body parts.

---

## What Changes

### 1. New edge function: `supabase/functions/generate-zeus-sprite/index.ts`

A backend function that generates a Zeus character illustration using the Lovable AI image model (`google/gemini-2.5-flash-image`). It will:

- Generate a Zeus bust/upper-body illustration with transparent-friendly dark background
- Prompt: powerful Greek god Zeus, muscular upper body, flowing white beard, golden crown/helmet, holding lightning bolts, dramatic purple/blue lighting, slot machine game art style, semi-transparent edges for compositing
- Upload to storage bucket `slot-assets` with path `gates/zeus-character.png`
- Return the public URL

This only needs to run once to produce the asset. The component will reference the stored image URL.

### 2. Update: `src/components/slots/GatesZeusCharacter.tsx`

Replace the entire CSS-drawn body (head, eyes, beard, crown, torso, arms -- lines 38-106) with a single `<img>` element:

- Load the Zeus sprite image from storage (with a fallback to the existing `zeus-scatter.png` asset already in the project at `src/assets/slots/gates/zeus-scatter.png`)
- The `<img>` gets the same animation classes (`gates-zeus-idle`, `gates-zeus-spin`, `gates-zeus-win`, `gates-zeus-climax`) applied to it
- Size: ~120x120px, `object-fit: contain`
- Keep the aura glow div behind it (unchanged)
- Keep the hand lightning sparks overlay in front (unchanged)
- Add intensity-driven CSS `filter` for eye glow simulation: brightness increases at win/climax states
- Remove all the individual body-part divs (head, eyes, beard, crown, torso, arms)

### 3. Update: `src/styles/gates-zeus.css`

- Remove arm-specific keyframes (`gates-zeus-arm-sway-left/right`, `gates-zeus-arm-raise-left/right`, `gates-zeus-arm-climax-raise`) since there are no separate arm elements
- Remove eye-specific keyframes (`gates-zeus-eye-pulse-idle`, `gates-zeus-eye-win-flash`, `gates-zeus-eye-climax-blaze`)
- Keep and adapt the body-level animations to work on the image container:
  - `gates-zeus-idle`: breathing translateY (unchanged)
  - `gates-zeus-spin`: alert lean (unchanged)
  - `gates-zeus-win`: bounce with scale (unchanged)
  - `gates-zeus-climax`: power pose with larger scale (unchanged)
- Add new filter-based intensity classes:
  - `.gates-zeus-img-idle`: `filter: brightness(0.9) drop-shadow(0 0 8px rgba(139,92,246,0.3))`
  - `.gates-zeus-img-spin`: `filter: brightness(1.0) drop-shadow(0 0 12px rgba(59,130,246,0.4))`
  - `.gates-zeus-img-win`: `filter: brightness(1.15) drop-shadow(0 0 16px rgba(250,204,21,0.5))`
  - `.gates-zeus-img-climax`: `filter: brightness(1.3) drop-shadow(0 0 24px rgba(250,204,21,0.8))`
  - `.gates-zeus-img-bonus`: Extra brightness and golden drop-shadow overlay
- Keep all aura and spark animations exactly as they are

### 4. Initial image generation trigger

Add a simple admin utility or use the existing pattern: call the edge function once from the browser to generate the Zeus sprite. After generation, the image URL is stored and the component references it directly. As a fallback, the component will use the existing `zeus-scatter.png` from the local assets.

---

## Technical Details

- The component wrapper size stays at `w-[120px] h-[100px]` 
- The image will be sized to fill this container with `object-fit: contain`
- All `transform`-based animations (breathing, bounce, scale) apply to the image wrapper div -- same classes, just targeting a different child
- The `filter` property replaces the eye-glow and arm-raise effects with whole-image brightness/glow changes that look natural on illustrated art
- Lightning sparks remain as CSS elements overlaid on top of the image
- Aura glow remains as a CSS radial gradient behind the image
- Bonus mode behavior (elevated position, constant lightning, brighter glow) is preserved

---

## Files

| Action | File |
|--------|------|
| Create | `supabase/functions/generate-zeus-sprite/index.ts` |
| Modify | `src/components/slots/GatesZeusCharacter.tsx` |
| Modify | `src/styles/gates-zeus.css` |
