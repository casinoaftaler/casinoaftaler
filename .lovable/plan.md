

## Plan: Fuzzy matching + custom slot auto-matching for slot requests

### Problem
1. The auto-match logic in `bonus-hunt-proxy` uses exact string comparison (`huntSlotNames.includes(slotKey)`), so "Le Viking Bebe" won't match "Le Viking" from the API.
2. Custom slot requests (slots not in our catalog) are never matched because the name the user typed rarely matches the API name exactly.

### Solution

**Single file change**: `supabase/functions/bonus-hunt-proxy/index.ts`

Replace the exact match on line 554 with a fuzzy/contains matching strategy:

1. **Fuzzy match function**: Add a helper that checks if a request slot name matches any hunt slot name using:
   - Exact match (current behavior)
   - Contains match: if the hunt slot name *contains* the request name or vice versa (handles "Le Viking" matching "Le Viking Bebe" or similar API variations)
   - Normalized match: strip common suffixes/noise words and compare (e.g., remove trailing words like "bebe", "deluxe", "megaways" for base-name comparison)
   - The function returns the matched hunt slot name (for logging) or null

2. **Already-awarded check update**: The `awardedSlotNames` set and `awardedThisBatch` set checks also need to use the same fuzzy logic — if "Le Viking" was already awarded, "Le Viking Bebe" shouldn't also get awarded.

3. **Custom slot inclusion**: The current query already fetches all pending requests regardless of `is_custom`, so custom slots are already included in the matching loop. The fix is purely in the matching logic — once fuzzy matching works, custom slots will naturally match when the API returns the correct name.

### Matching priority
```text
1. Exact match (lowercase)
2. Hunt slot contains request name (e.g. "le viking" found in "le viking bebe")  
3. Request name contains hunt slot name (e.g. "le viking bebe" contains "le viking")
```

This ensures the most specific match wins, and prevents false positives on very short names by requiring a minimum overlap length (≥ 4 characters).

### Files to modify
- `supabase/functions/bonus-hunt-proxy/index.ts` — add fuzzy match helper, update the matching loop (lines 552-554)

