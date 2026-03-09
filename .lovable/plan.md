

## Problem: Supabase 1.000 rækker default limit

Ingen af slot catalog queries har en eksplicit `.limit()`, så Supabase's standard cap på 1.000 rækker træder i kraft. Når databasen nu har >1.000 slots, vises kun de første 1.000.

### Berørte steder

1. **`useSlotCatalog()`** (admin) — `.select('*').order('slot_name')` — mangler range/limit
2. **`useSlotCatalogMap()`** (bonus hunt display) — `.select('slot_name, provider')` — mangler range/limit  
3. **`useSlotCatalog()` i `SlotDatabase.tsx`** — bruger `useSlotCatalog()` som returnerer max 1.000

### Plan

**Trin 1: Tilføj pagination til alle slot catalog queries**

For queries der skal returnere ALLE slots (map-lookup, admin, slot database page), brug en pagineringsfunktion der henter i batches af 1.000 og sammensætter:

```typescript
async function fetchAllSlots(selectQuery: string) {
  let allData = [];
  let from = 0;
  const batchSize = 1000;
  while (true) {
    const { data, error } = await supabase
      .from('slot_catalog')
      .select(selectQuery)
      .range(from, from + batchSize - 1);
    if (error) throw error;
    allData = allData.concat(data || []);
    if (!data || data.length < batchSize) break;
    from += batchSize;
  }
  return allData;
}
```

Opdater disse tre hooks:
- `useSlotCatalog()` — hent alle med pagination
- `useSlotCatalogMap()` — hent alle med pagination
- `SlotDatabase.tsx` — bruger allerede `useSlotCatalog()`, så den fixes automatisk

**Resultat:** Alle 1.000+ slots vises korrekt på /slot-katalog og i admin.

