

## Problem: Falsk "Bonus Hunt Tests" tal

### Årsag

`upsert_slot_catalog` RPC'en indsætter nye slots med `bonus_count = 1` som default:

```sql
INSERT INTO slot_catalog (..., bonus_count)
VALUES (..., 1);  -- <-- BUG: skal være 0
```

Når seed-funktionen tilføjede ~500 nye slots, fik hver enkelt `bonus_count = 1` — selvom de **aldrig** har optrådt i en bonus hunt. Det blæser "Bonus Hunt Tests"-tallet op med ~500.

### Plan

**1. Fix `upsert_slot_catalog` RPC** (database migration)
- Ændr INSERT-linjen fra `bonus_count, 1` til `bonus_count, 0` for nye slots.

**2. Nulstil seeded slots' bonus_count** (database migration)
- Sæt `bonus_count = 0` for alle slots der aldrig har optrådt i en bonus hunt (dvs. `highest_win = 0 AND highest_x = 0`).

**Resultat:** "Bonus Hunt Tests" viser kun reelle optræden i bonus hunts — ikke AI-seedede slots.

