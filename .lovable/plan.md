
# Plan: Red Egyptian Frame for Scatter Symbol

## Overview
Update the AI symbol generation to give scatter symbols (Book of Fedesvin / cat on book) a distinctive red Egyptian-style frame instead of the golden frame used by premium symbols.

---

## Technical Details

### File: `supabase/functions/generate-slot-symbol/index.ts`

#### Change 1: Add SCATTER_FRAME constant (after line 40)
Create a new constant specifically for scatter symbols with a red Egyptian frame:

```typescript
const SCATTER_FRAME = `
FRAME/BORDER REQUIREMENTS (MANDATORY):
- Add an ornate RED Egyptian-style frame/border around the ENTIRE image
- The frame MUST touch ALL FOUR EDGES of the image (no gaps at edges)
- Frame width: approximately 5-8% of the image on each side
- Frame design: Intricate deep ruby red border with hieroglyphic patterns carved into it
- Frame color: Rich crimson/ruby red with subtle golden trim on the edges
- Corner decorations: Small scarab motifs with ruby red gems and golden accents
- The frame should have depth and dimension (3D appearance)
- Inner edge of frame: subtle red glow effect with golden highlights
- The artwork must extend FULLY to the inner edge of the frame (no gaps)
- CRITICAL: The outer edge of the frame must be FLUSH with the image boundary
`;
```

#### Change 2: Update scatter symbol prompt (line 64)
Replace `${PREMIUM_FRAME}` with `${SCATTER_FRAME}` in the scatter/Book of Fedesvin generation section:

**Current (line 64):**
```typescript
${PREMIUM_FRAME}
```

**Updated:**
```typescript
${SCATTER_FRAME}
```

---

## Visual Comparison

| Frame Aspect | Premium (Golden) | Scatter (Red) |
|--------------|------------------|---------------|
| Primary color | Golden | Ruby red/crimson |
| Trim accents | Gold only | Golden trim on red |
| Corner gems | Golden lotus/scarab | Scarab with ruby gems |
| Inner glow | Golden | Red with gold highlights |
| Hieroglyphics | Golden carved | Red carved |

---

## Result
When generating a scatter symbol, the AI will create a distinctive red Egyptian-style frame that maintains the same ornate hieroglyphic and scarab patterns but in a rich ruby/crimson color scheme, making it immediately recognizable as the special scatter symbol.
