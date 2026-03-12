

## Problem: Identisk "Flere slots fra" på tværs af alle slots fra samme provider

### Root Cause
`useSimilarSlots()` i `SlotCatalogPage.tsx` (linje 108-133) henter altid de **top 20 slots by `bonus_count DESC`** for den givne provider, sorterer efter volatilitet-match, og tager de første 8. 

Da sorteringen er deterministisk og uafhængig af den aktuelle slot, viser **alle Pragmatic Play-slots de præcis samme 8 maskiner** (Gates of Olympus, 5 Lions Megaways, etc.). Det samme gælder for alle andre providers – alle Hacksaw-slots viser de samme 8 Hacksaw-maskiner, alle NetEnt-slots viser de samme 8, osv.

**Med 1.460+ slots er dette en massiv template footprint** som Google kan straffe via "omitted results" eller algorithmic grouping.

### Fix
Ændr `useSimilarSlots` til at bruge **hash-baseret rotation** (som allerede bruges andre steder i filen via `hashStr`):

1. Hent en **større pool** fra provideren (fx 50 slots i stedet for 20)
2. Brug `hashStr(currentSlotName)` til at **deterministisk rotere** startpunktet i poolen
3. Vælg 8 slots fra det roterede offset, så hver slot-side viser en **unik kombination**

```text
Før:  Slot A → top 8 by bonus_count
      Slot B → top 8 by bonus_count  (SAME)
      Slot C → top 8 by bonus_count  (SAME)

Efter: Slot A → pool[offset_A .. offset_A+8]
       Slot B → pool[offset_B .. offset_B+8]  (DIFFERENT)
       Slot C → pool[offset_C .. offset_C+8]  (DIFFERENT)
```

### Ændringer
**Fil: `src/pages/SlotCatalogPage.tsx`** – `useSimilarSlots` funktionen (linje 108-133):
- Øg `limit` fra 20 → 50
- Filtrer current slot fra
- Brug `hashStr(currentName)` til at beregne et offset i den filtrerede liste
- Slice 8 slots fra det offset (wrap-around)
- Bevar volatilitet-match som sekundær prioritet i sorteringen

Dette sikrer at fx 200 Pragmatic Play-slots får **~25+ unikke kombinationer** af related slots i stedet for den samme liste, hvilket eliminerer template-footprintet fuldstændigt.

