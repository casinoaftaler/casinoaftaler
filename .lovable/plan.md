

## Slot Database & Provider Override System

This plan adds two features:
1. An admin system to override "Custom Slot" providers with correct provider names
2. A slot database with info (RTP, volatility, max potential, highest win/x) that users can view by clicking a slot name in the bonus hunt table

---

### 1. New Database Table: `slot_catalog`

A new table to store slot metadata:

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| slot_name | text | Unique, the canonical name |
| provider | text | The correct provider name |
| rtp | numeric | e.g. 96.50 |
| volatility | text | "Low", "Medium", "High", "Extreme" |
| max_potential | text | e.g. "50,000x" |
| highest_win | numeric | Our highest win amount on this slot |
| highest_x | numeric | Our highest multiplier on this slot |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

RLS: Anyone can read, admins can manage.

### 2. New Database Table: `bonus_hunt_provider_overrides`

A simple mapping table for overriding API provider names per slot name:

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| slot_name | text | Unique, exact match from API |
| provider_override | text | The correct provider name |
| created_at | timestamptz | Default now() |

RLS: Anyone can read, admins can manage.

### 3. Data Flow Changes

**Provider Override (in `useBonusHuntData.ts`):**
- After parsing slots from the API, fetch all `bonus_hunt_provider_overrides`
- For any slot where `provider === 'Custom Slot'`, check if there's an override and apply it
- Also check `slot_catalog` for provider info as a fallback

**Slot Info Dialog (new component `BonusHuntSlotInfoDialog.tsx`):**
- When a user clicks a slot name in the table, a dialog/overlay opens
- Shows: slot name, provider, RTP, volatility, max potential, our highest win, our highest x
- Data fetched from `slot_catalog` by matching slot name

### 4. Admin UI Changes

**New admin section or sub-tab for managing slot catalog:**
- Table listing all slots in the catalog
- Add/edit/delete entries (slot name, provider, RTP, volatility, max potential, highest win, highest x)
- Search/filter functionality

**Provider override management:**
- A simple list showing current overrides
- Add new override: type slot name + correct provider
- Could also auto-detect "Custom Slot" entries from recent hunts to suggest overrides

### 5. Frontend Changes

**`BonusHuntSlotTable.tsx`:**
- Make slot names clickable (cursor-pointer, underline on hover)
- On click, open `BonusHuntSlotInfoDialog` with the slot name
- Apply provider overrides when rendering

**New hook `useSlotCatalog.ts`:**
- Fetches slot catalog data and provider overrides
- Provides lookup functions

**New hook `useProviderOverrides.ts`:**
- Fetches all overrides, cached with React Query
- Used in `useBonusHuntData` to fix provider names

### 6. Technical Details

**Migration SQL:**

```sql
-- Slot catalog table
CREATE TABLE public.slot_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_name text UNIQUE NOT NULL,
  provider text NOT NULL DEFAULT '',
  rtp numeric,
  volatility text,
  max_potential text,
  highest_win numeric DEFAULT 0,
  highest_x numeric DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.slot_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view slot catalog"
  ON public.slot_catalog FOR SELECT USING (true);

CREATE POLICY "Admins can manage slot catalog"
  ON public.slot_catalog FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Provider overrides table
CREATE TABLE public.bonus_hunt_provider_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_name text UNIQUE NOT NULL,
  provider_override text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bonus_hunt_provider_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view provider overrides"
  ON public.bonus_hunt_provider_overrides FOR SELECT USING (true);

CREATE POLICY "Admins can manage provider overrides"
  ON public.bonus_hunt_provider_overrides FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
```

**Files to create:**
- `src/hooks/useSlotCatalog.ts` -- query hook for slot catalog + overrides
- `src/components/bonus-hunt/BonusHuntSlotInfoDialog.tsx` -- popup overlay with slot details
- `src/components/admin/SlotCatalogAdminSection.tsx` -- admin CRUD for slot catalog + overrides

**Files to modify:**
- `src/hooks/useBonusHuntData.ts` -- apply provider overrides during parsing
- `src/components/bonus-hunt/BonusHuntSlotTable.tsx` -- make slot names clickable, show dialog
- `src/pages/Admin.tsx` -- add new Slot Catalog admin tab

