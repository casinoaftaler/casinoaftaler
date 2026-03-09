

## Problem

1. **Duplicate/typo providers** in the filter dropdown: "No Limit", "Noliomit City" alongside "Nolimit City"
2. **Novomatic** and many other non-approved providers exist in the database with slots that don't belong to them (AI hallucinated provider assignments during seeding)
3. **Provider whitelist** needs to be reduced from 29 to 17 approved providers

### Current state (from database query)

Providers to **keep** (17): Pragmatic Play, NetEnt, Microgaming, Playtech, Thunderkick, Play'n GO, Red Tiger Gaming, Big Time Gaming, Betsoft, Blueprint Gaming, Relax Gaming, Push Gaming, ELK Studios, Quickspin, Yggdrasil Gaming, Nolimit City, Hacksaw Gaming

Providers to **delete** (24): Aristocrat (1), Backseatgaming (2), BGaming (1), Booming Games (2), Core Gaming (1), Evoplay (1), G.Games (3), Gaming Corps (1), Gamomat (1), Green Jade Games (3), High 5 Games (1), iSoftBet (59), No Limit (1), Noliomit City (1), Northern Lights Gaming (2), Novomatic (6), PearFiction Studios (1), Print Studios (4), Rarestone Gaming (1), Reel Kingdom (1), Slingo (2), Stakelogic (1), Swintt (1), Synot Games (1)

**"Custom Slot"** (8 rows) will be kept since those are user-created entries.

### Plan

**Step 1: Database migration**
- Merge typos: "No Limit" and "Noliomit City" → "Nolimit City"
- Delete all slots from non-approved providers (except "Custom Slot" and "Unknown")

```sql
-- Fix typos first
UPDATE slot_catalog SET provider = 'Nolimit City' 
WHERE provider IN ('No Limit', 'Noliomit City');

-- Delete non-approved providers
DELETE FROM slot_catalog 
WHERE provider NOT IN (
  'Pragmatic Play', 'NetEnt', 'Microgaming', 'Playtech', 'Thunderkick',
  'Play''n GO', 'Red Tiger Gaming', 'Big Time Gaming', 'Betsoft',
  'Blueprint Gaming', 'Relax Gaming', 'Push Gaming', 'ELK Studios',
  'Quickspin', 'Yggdrasil Gaming', 'Nolimit City', 'Hacksaw Gaming',
  'Custom Slot', 'Unknown'
);
```

**Step 2: Update `SEED_PROVIDERS` in `SlotCatalogAdminSection.tsx`**
- Reduce from 29 to 17 approved providers

**Step 3: Update `DEFAULT_PROVIDERS` in `slot-catalog-seed/index.ts`**
- Same 17 providers

**Result:** Only approved providers remain in the database, the filter dropdown is clean, and future seeding only targets the 17 approved providers.

