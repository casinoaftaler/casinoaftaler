

## Analyse: Slots med gevinster men 0 hunts

### Hvad jeg fandt

Der er **15 slots** i katalogen med `highest_x > 0` men `bonus_count = 0`. Disse stammer IKKE fra bonus hunts — de blev oprettet af **slot-catalog-seed** funktionen (AI-seeding) mellem 23-28 februar.

Problemet falder i to kategorier:

**Kategori 1: Duplikater (4 slots)** — seeded under forkert navn, mens den rigtige arkiv-version allerede eksisterer:

| Seeded (forkert, bonus_count=0) | Rigtig arkiv-entry (har korrekt count) |
|---|---|
| Eye of the Panda | Eye Of Panda (1 hunt) |
| Toshi Video Club Mega | Toshi Video Club 96 (2 hunts) |
| Gates Of Olympus Super Scatter 500 | Gates of olympus super scatter (16 hunts) |
| Tombstone Rip | Tombstone R.i.p (9 hunts) |

**Kategori 2: Aldrig i et hunt (11 slots)** — slots som Fat Panda, Fish Eye, Wild Walker osv. De optræder simpelthen ikke i nogen af de 119 arkiverede hunts. Deres `highest_win`/`highest_x` data stammer fra proxy-synkronisering under live hunts, men hunt-navnene i arkivets JSON matcher ikke katalogens navne.

### Plan

1. **Slet de 4 duplikater** fra `slot_catalog` — de rigtige versioner eksisterer allerede med korrekte data
2. **Nulstil win-data for de 11 "phantom" slots** — sæt `highest_win = 0` og `highest_x = 0` da de aldrig har været i et dokumenteret hunt, og dataen er upålidelig
3. **Forbedre `upsert_slot_catalog` funktionen** — tilføj dot-stripping (`replace(name, '.', '')`) til normaliseringen, så fremtidige imports af f.eks. "Tombstone R.I.P" matcher "Tombstone R.i.p" korrekt

### SQL (via data insert tool)

**Slet duplikater:**
```sql
DELETE FROM slot_catalog WHERE slot_name IN (
  'Eye of the Panda', 'Toshi Video Club Mega', 
  'Gates Of Olympus Super Scatter 500', 'Tombstone Rip'
);
```

**Nulstil phantom win-data:**
```sql
UPDATE slot_catalog 
SET highest_win = 0, highest_x = 0, updated_at = now()
WHERE bonus_count = 0 AND highest_x > 0;
```

**Opdater normalisering i upsert-funktionen** (migration):
Tilføj `REPLACE(name, '.', '')` til normaliseringslogikken i `upsert_slot_catalog` så punktummer strippes og "R.I.P" matcher "Rip".

### Filer der ændres
Ingen frontend-ændringer — kun database data cleanup + en migration til `upsert_slot_catalog` funktionen.

