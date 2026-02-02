
# Create Egyptian Slot Machine Interface with AI-Generated Image

## Summary
Generate an Egyptian-themed slot machine frame/interface using AI image generation, then integrate it into the slot game component to create an immersive visual experience.

---

## Current State
- The slot game already has Egyptian-themed symbols (Pharaoh, Anubis, Horus, Scarab, etc.)
- The interface uses basic CSS styling with amber/gold accents
- Background is an Egyptian temple image (`slot-background.jpg`)
- Title logo is `book-of-fedesvin-title.png`
- Frame elements are simple CSS borders with corner decorations

---

## What We Will Generate

### Egyptian Slot Machine Frame
An ornate Egyptian-themed slot machine frame with:
- Golden hieroglyph-decorated borders
- Pharaoh head sculptures on the sides
- Lotus flower and scarab ornaments
- Ancient stone/gold texture
- Eye of Horus symbols
- Transparent center area for the reels

---

## Technical Implementation

### File: `supabase/functions/generate-slot-frame/index.ts` (New)

Create an edge function to generate the slot machine frame image:
- Use the Lovable AI gateway with `google/gemini-2.5-flash-image` model
- Generate a PNG image with transparent center for reels
- Upload the generated image to Supabase storage
- Return the public URL

### File: `src/components/slots/SlotGame.tsx`

Integrate the generated frame:
- Add an overlay image around the reel container
- Position the frame as an absolute element behind/around the reels
- Keep the reels visible through the transparent center
- Remove the current CSS corner decorations (replace with the frame image)

### File: `src/hooks/useSiteSettings.ts`

Add support for a new setting:
- `slot_machine_frame_image` - URL to the generated Egyptian frame

---

## Generation Prompt

The AI will be asked to generate:

```text
"Create an ornate Egyptian slot machine frame with transparent center. 
The frame should feature:
- Golden hieroglyph-decorated borders on all sides
- Pharaoh head sculptures on the left and right pillars
- Lotus flowers and scarab beetles as ornamental details
- Ancient Egyptian stone texture with gold leaf accents
- Eye of Horus symbols at the corners
- The center must be completely transparent (for reels)
- Aspect ratio suitable for a 5x3 slot grid
Style: ancient Egyptian temple aesthetic, rich gold and amber tones, 
detailed stone carvings, mystical glow effects"
```

---

## Integration Approach

The frame will be positioned as an absolute overlay:

```text
+------------------------------------------+
|  [Pharaoh]   EGYPTIAN FRAME    [Pharaoh] |
|     |                              |     |
|     |   +--------------------+     |     |
|     |   |                    |     |     |
|     |   |   SLOT REELS       |     |     |
|     |   |   (transparent)    |     |     |
|     |   |                    |     |     |
|     |   +--------------------+     |     |
|     |                              |     |
|  [Lotus]                      [Scarab]   |
+------------------------------------------+
```

---

## Files to Create/Modify

1. **`supabase/functions/generate-slot-frame/index.ts`** (New)
   - Edge function to call AI image generation
   - Upload result to storage
   - Return image URL

2. **`src/components/slots/SlotMachineFrame.tsx`** (New)
   - Component to render the Egyptian frame overlay
   - Handles loading state with fallback to current styling
   - Positions frame around the reel container

3. **`src/components/slots/SlotGame.tsx`**
   - Import and use `SlotMachineFrame` component
   - Remove old CSS corner decorations
   - Adjust padding to accommodate frame

4. **Database Migration**
   - Add `slot_machine_frame_image` column to site_settings table

---

## Fallback Behavior

If the frame image fails to load:
- Fall back to the current CSS-based corner decorations
- Show a subtle loading indicator while generating
- Cache the generated image URL in site settings

---

## Admin Panel Integration

Add an option in the slot machine admin section to:
- Generate a new frame image
- Preview the current frame
- Reset to default (CSS styling)

