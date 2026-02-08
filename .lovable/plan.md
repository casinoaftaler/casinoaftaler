

## Plan: Rise of Fedesvin Symbol Generation with Frames and Consistent Backgrounds

### Problem
The `generate-slot-symbol` edge function currently only contains Egyptian-themed prompts for "Book of Fedesvin". When generating symbols for "Rise of Fedesvin" (Merlin, Dragon, Phoenix, Crystal Ball, Spell Book, etc.), they all fall through to a generic Egyptian fallback -- resulting in wrong theme, no frames on premium/scatter symbols, and inconsistent backgrounds.

### Solution
Update the edge function to:
1. Fetch the `game_id` from the database alongside the symbol name
2. Add a complete Rise of Fedesvin prompt set with a **wizard/fantasy theme**
3. Add frames to premium and scatter symbols (purple/silver arcane frame for premium, glowing magical red frame for scatter)
4. Add a consistent mystical background across all Rise of Fedesvin symbols

### Changes

#### 1. Edge Function: `supabase/functions/generate-slot-symbol/index.ts`

**Fetch `game_id` from database** -- update the select query from `"name, is_scatter"` to `"name, is_scatter, game_id"` so we know which game the symbol belongs to.

**Add Rise of Fedesvin style constants:**
- `RISE_BASE_STYLE` -- Mystical wizard tower background with purple/blue tones, arcane lighting, magical particle effects. Consistent across all symbols.
- `RISE_PREMIUM_FRAME` -- Ornate silver and purple arcane frame with rune carvings, crystal corner decorations, and inner magical glow.
- `RISE_SCATTER_FRAME` -- Glowing magical red/crimson frame with enchanted rune patterns and pulsing energy effects.

**Add Rise of Fedesvin symbol prompts** (new function `getPromptForRiseSymbol`):
- **Merlin** (Premium): Wise wizard with long beard, star-covered hat, magical staff, arcane energy
- **Dragon** (Premium): Majestic fantasy dragon with scales, fiery breath, spread wings
- **Phoenix** (Premium): Magnificent phoenix in flames, golden/red feathers, rebirth energy
- **Crystal Ball** (Premium): Glowing crystal ball on ornate stand, swirling magical mists inside
- **Spell Book** (Scatter): The Fedesvin cat sitting on a magical spell book with arcane symbols (red frame)
- **Letter symbols** (A, K, Q, J, 10): Same gemstone letter style but with mystical/arcane backgrounds instead of Egyptian

**Update routing logic** -- modify `getPromptForSymbol` to accept `game_id` parameter, and route to `getPromptForRiseSymbol` when `game_id === 'rise-of-fedesvin'`.

### Technical Details

```text
Current flow:
  symbolId -> fetch(name, is_scatter) -> getPromptForSymbol(name, is_scatter) -> AI generate

Updated flow:
  symbolId -> fetch(name, is_scatter, game_id) -> route by game_id:
    book-of-fedesvin -> getPromptForSymbol(name, is_scatter)     [existing, unchanged]
    rise-of-fedesvin -> getPromptForRiseSymbol(name, is_scatter) [new]
```

Key design decisions:
- Premium symbols (Merlin, Dragon, Phoenix, Crystal Ball) get `RISE_PREMIUM_FRAME` (silver/purple arcane frame)
- Scatter symbol (Spell Book) gets `RISE_SCATTER_FRAME` (red magical frame)
- Common letter symbols (A, K, Q, J, 10) get no frame (consistent with Book of Fedesvin behavior)
- All Rise of Fedesvin symbols share the same `RISE_BASE_STYLE` background (wizard tower interior) for visual cohesion
- No changes to Book of Fedesvin prompts -- they remain exactly as they are

