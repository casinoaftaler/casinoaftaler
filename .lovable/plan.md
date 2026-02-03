

# Plan: Fix Scatter Symbol Sizing + Generate New AI Symbol

## Overview
Fix the scatter symbol sizing issue and create an AI-powered symbol generator that produces a new scatter symbol matching the **exact current design**: a fat gray/white cat wearing an Egyptian pharaoh headdress, sitting on a golden Book of the Dead.

---

## Part 1: Fix Symbol Auto-Sizing

### Problem
The scatter symbol appears with inconsistent sizing because images with different aspect ratios or internal whitespace don't fill the container properly when using `object-contain`.

### Solution
Update the image styling in `SlotSymbol.tsx` to use `object-cover` which ensures all symbols fill their container consistently, regardless of their original proportions.

**File:** `src/components/slots/SlotSymbol.tsx`
- Change `object-contain` to `object-cover`
- This ensures symbols with different aspect ratios (like the cat+book combo) scale to fill the space properly

---

## Part 2: Create AI Symbol Generation Edge Function

### New Edge Function
**File:** `supabase/functions/generate-slot-symbol/index.ts`

The function will:
1. Accept a symbol ID in the request
2. Use Lovable AI (`google/gemini-3-pro-image-preview`) with a detailed prompt matching the current design
3. Upload the generated image to the `slot-symbols` storage bucket
4. Update the symbol's `image_url` in the database
5. Return the public URL

### AI Prompt (Matching Current Design)
The prompt will describe the **exact** current scatter symbol design:

```text
Create a slot machine symbol icon for an Egyptian-themed game called "Book of Fedesvin".

The symbol MUST feature:
- A CHUBBY/FAT gray and white cat (similar to British Shorthair) sitting comfortably
- The cat has green eyes and a sweet, slightly smug expression
- The cat wears an Egyptian pharaoh headdress (nemes) in gold and blue stripes
- A decorative golden collar with blue gems around the cat's neck
- The cat is sitting ON TOP of an ancient Egyptian golden book
- The book has ornate golden decorations with winged scarab and gems on the spine/cover
- A red bookmark ribbon visible from the book
- Background with subtle Egyptian temple elements (columns, hieroglyphics, Anubis statues)
- Warm golden color palette with rich amber tones

Style: High-quality cartoon/game art style, clean lines, vibrant colors, detailed but stylized. The composition should be square (1:1 aspect ratio) suitable for a slot machine symbol. The cat should be the central focus, looking regal and content.

This is a "Book of the Dead" themed scatter/wild symbol for a slot game.
```

---

## Part 3: Add Admin UI for AI Generation

### Update Config
**File:** `supabase/config.toml`
- Add the new `generate-slot-symbol` function

### Update Admin Symbol Dialog
**File:** `src/components/SlotMachineAdminSection.tsx`

Add a "Generate with AI" button in the `EditSymbolDialog` that:
1. Shows a loading state during generation (can take 10-30 seconds)
2. Calls the new edge function with the symbol ID
3. Automatically updates the form with the new image URL on success
4. Shows appropriate error messages for rate limits (429) or credit issues (402)

---

## Technical Details

### Edge Function Structure
```text
supabase/functions/generate-slot-symbol/
└── index.ts
```

### API Contract
```text
POST /functions/v1/generate-slot-symbol
Body: { symbolId: string }
Response: { success: true, imageUrl: string, symbolId: string }
```

### Storage
- Uses existing `slot-symbols` bucket (already public)
- Filename pattern: `ai-generated-{symbolId}-{timestamp}.png`

---

## Files to Create/Modify

| Action | File |
|--------|------|
| Modify | `src/components/slots/SlotSymbol.tsx` |
| Create | `supabase/functions/generate-slot-symbol/index.ts` |
| Modify | `supabase/config.toml` |
| Modify | `src/components/SlotMachineAdminSection.tsx` |

---

## Execution Order

1. Fix the `SlotSymbol` component sizing (change to `object-cover`)
2. Create the edge function for AI symbol generation
3. Update `config.toml` with the new function
4. Add the AI generation button to the admin symbol edit dialog

