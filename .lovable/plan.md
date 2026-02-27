

# Auto-Enrich Slot Catalog + Name Formatting + Bonus Count Display

## Overview
Three improvements to the Slot Catalog system:
1. Auto-search slot metadata (provider, RTP, volatility, max win) when new slots are added via bonus hunts
2. Proper title-case formatting of slot names
3. Show how many bonuses the highest win/x records are based on

---

## 1. Add `bonus_count` Column to `slot_catalog`

**Database migration:**
- Add `bonus_count INTEGER NOT NULL DEFAULT 0` to `slot_catalog`
- Update the `upsert_slot_catalog` RPC to increment `bonus_count` by 1 on every upsert (tracking how many bonus hunts contributed data)

**Updated RPC logic:**
```text
bonus_count = slot_catalog.bonus_count + 1
```

This counts every time a slot appears in a bonus hunt, giving context to the highest_win and highest_x values.

---

## 2. Auto Title-Case Slot Names

**In the `upsert_slot_catalog` RPC:**
- Apply `initcap()` to `p_slot_name` on INSERT to properly capitalize new entries
- On UPDATE (conflict), keep the existing name (admin may have manually corrected it)

**One-time data fix:**
- Run an UPDATE to fix existing lowercase names using `initcap()`, but skip names that already look correct (contain apostrophes, special casing like "Play'n GO")

**In the Edge Functions** (`bonus-hunt-proxy` and `bonus-hunt-auto-settle`):
- Apply a `toTitleCase()` helper to slot names before upserting, handling edge cases like "of", "and", "the" (lowercase), Roman numerals, and apostrophes

---

## 3. Auto-Search Slot Metadata via Edge Function

**New Edge Function: `slot-catalog-enrich`**

When a new slot is inserted into the catalog with missing metadata (no volatility, no max_potential), this function:
1. Uses Lovable AI (Gemini 2.5 Flash) to look up the slot's metadata
2. Specifically asks for: provider, RTP (SpilDanskNu version), volatility, and max win potential
3. Updates the `slot_catalog` row with the found data (only fills NULL fields, never overwrites admin edits)

**Trigger:** Called from `bonus-hunt-proxy` and `bonus-hunt-auto-settle` after `syncSlotCatalog` runs, for any slots where `volatility IS NULL` or `max_potential IS NULL`.

**AI Prompt structure:**
```text
For the slot machine "[slot_name]" by [provider]:
- What is the RTP on SpilDanskNu (Danish casino)?
- What is the volatility level?
- What is the maximum win potential (e.g. "10,000x")?
Return JSON: { rtp, volatility, max_potential }
```

---

## 4. Display Bonus Count in UI

**`BonusHuntSlotInfoDialog.tsx` (popover):**
- Show "(X bonusser)" next to highest win and highest X values
- Example: `160 kr (3)` and `160x (3)`

**`SlotCatalogAdminSection.tsx` (admin table):**
- Add a "# Bonusser" column showing the bonus_count
- Display highest_win and highest_x with "(count)" suffix

---

## Files to Change

| File | Change |
|------|--------|
| `supabase/functions/slot-catalog-enrich/index.ts` | **NEW** - AI-powered metadata lookup |
| `supabase/functions/bonus-hunt-proxy/index.ts` | Add title-case helper, call enrich function for new slots |
| `supabase/functions/bonus-hunt-auto-settle/index.ts` | Add title-case helper, call enrich function for new slots |
| `src/components/bonus-hunt/BonusHuntSlotInfoDialog.tsx` | Display bonus_count next to records |
| `src/components/admin/SlotCatalogAdminSection.tsx` | Add bonus count column, display counts |
| `src/hooks/useSlotCatalog.ts` | Add `bonus_count` to interface |
| Database migration | Add `bonus_count` column, update `upsert_slot_catalog` RPC |

---

## Technical Details

**Title Case Logic:**
- Capitalize first letter of each word
- Keep lowercase: "of", "and", "the", "in", "at", "by", "to", "for"  
- Always capitalize first word
- Preserve apostrophes (e.g., "Drop 'Em", "Play'n GO")
- Handle Roman numerals (II, III, IV)

**Enrich Function Rate Limiting:**
- Only enrich slots where metadata is missing (volatility IS NULL OR max_potential IS NULL)
- Max 5 slots per sync call to avoid overloading
- Cache-friendly: once enriched, won't be called again for that slot

**Data Fix for Existing Slots:**
- One-time migration to fix ~20+ slots with incorrect casing (e.g., "bigger bass splash" -> "Bigger Bass Splash")

