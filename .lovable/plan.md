
# Plan: Dynamic Symbol Theme for AI Generation

## Overview
Update the AI symbol generation edge function to create symbols that match the theme of each specific symbol rather than always generating the cat-on-book scatter design.

## Current Problem
The edge function uses a **hardcoded prompt** that always generates the "chubby cat on a book" scatter symbol, regardless of which symbol is being regenerated.

## Solution
1. Fetch the symbol's name from the database
2. Generate a dynamic prompt based on the symbol type
3. Use the cat-on-book prompt **only** for the scatter symbol (Fedesvins Book)
4. Use Egyptian-themed prompts for other symbols (Pharaoh, Anubis, Horus, etc.)

---

## Symbol Types & Prompts

| Symbol | Theme Description |
|--------|-------------------|
| **Fedesvins Book** (scatter) | Chubby gray/white cat in pharaoh headdress on golden book |
| **Pharaoh** | Majestic Egyptian pharaoh with golden headdress and royal regalia |
| **Anubis** | Black jackal-headed god with golden accents |
| **Horus** | Falcon-headed god with Eye of Horus symbolism |
| **Scarab** | Golden jeweled scarab beetle with wings |
| **Isis** | Egyptian goddess with throne crown and golden wings |
| **Ankh** | Ornate golden ankh symbol with gems |
| **A, K, Q** | Stylized letters with Egyptian hieroglyphic decorations |

---

## Changes

**File:** `supabase/functions/generate-slot-symbol/index.ts`

1. Remove the hardcoded `AI_PROMPT` constant
2. Add a function `getPromptForSymbol(name: string, isScatter: boolean)` that returns the appropriate prompt
3. Before calling the AI, fetch the symbol's name and is_scatter flag from the database
4. Use the dynamic prompt based on the symbol type

### Prompt Templates

**Base style (applied to all):**
```text
Style: High-quality cartoon/game art style, clean lines, vibrant colors, 
detailed but stylized. Square 1:1 aspect ratio suitable for a slot machine symbol.
Egyptian temple background with warm golden color palette and rich amber tones.
```

**Example: Pharaoh prompt:**
```text
Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- A majestic Egyptian Pharaoh bust/portrait
- Golden nemes headdress with blue and gold stripes
- Royal uraeus cobra on the forehead
- Golden collar/pectoral with lapis lazuli and turquoise gems
- Regal, powerful expression
- Warm golden lighting with subtle glow

[base style]
```

**Example: Anubis prompt:**
```text
Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- The Egyptian god Anubis (jackal-headed deity)
- Sleek black jackal head with pointed ears
- Golden Egyptian collar and ceremonial adornments
- Piercing golden or amber eyes
- Mysterious and noble appearance

[base style]
```

---

## Technical Details

### API Contract (unchanged)
```text
POST /functions/v1/generate-slot-symbol
Body: { symbolId: string }
Response: { success: true, imageUrl: string, symbolId: string }
```

### Database Query
Before generating, fetch the symbol:
```typescript
const { data: symbol } = await supabase
  .from("slot_symbols")
  .select("name, is_scatter")
  .eq("id", symbolId)
  .single();
```

---

## Files to Modify

| File | Change |
|------|--------|
| `supabase/functions/generate-slot-symbol/index.ts` | Add dynamic prompt generation based on symbol name |
