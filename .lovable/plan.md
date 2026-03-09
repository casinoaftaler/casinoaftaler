

## Problem Analysis

Two distinct issues found:

### Issue 1: Hindi/Devanagari slot names in database
There are **82 slots** with non-ASCII names (77 from ELK Studios, 5 from Pragmatic Play). The AI model (Gemini 2.5 Flash) returned translated Hindi names instead of English originals. Examples: "गेमरियम" instead of "Gamerium", "इलेक्ट्रिक शार्क" instead of "Electric Shark".

This happened because the prompt doesn't explicitly enforce English-only output. The Gemini model sometimes translates slot names into other languages.

### Issue 2: All slots "skipped" during seeding
The existing names set includes these Hindi names. When the AI returns the correct English names on a new seeding attempt, `normalizeSlotName` doesn't match them to the Hindi versions already in the DB. But the AI prompt includes the existing names list (line 65: first 200 existing names), so the AI sees the English versions already covered and skips them. The result: 0 new slots found.

## Plan

### 1. Clean up existing Hindi/Devanagari entries (database migration)
- DELETE all 82 non-ASCII slot names from `slot_catalog`
- These are garbage data with no community stats (all have 0 wins, 0x, 0 bonus count)

### 2. Add language enforcement to the AI prompt (edge function)
In `supabase/functions/slot-catalog-seed/index.ts`:
- Add explicit instruction to the system prompt: "Always return slot names in English only. Never translate names."
- Add to the user prompt: "CRITICAL: Return all slot names in their original English titles only. Do NOT translate names into any other language."

### 3. Add ASCII validation before inserting slots
In the `fetchSlotsForProvider` function, filter out any slot whose name contains non-ASCII characters (regex `/[^\x00-\x7F]/`). This prevents non-English names from ever entering the database regardless of AI behavior.

### Files to change
- `supabase/functions/slot-catalog-seed/index.ts` -- prompt hardening + ASCII filter
- Database migration to delete 82 bad rows

