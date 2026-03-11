

## Fix: Backfill `bonus_count` fra bonus hunt arkiv-data

### Problem
`bonus_count` i `slot_catalog` viser forkerte tal (de fleste er 0-2), fordi `increment_slot_bonus_counts` kun kører ved *nye* imports — ikke retroaktivt. Reelt har f.eks. Hot Fiesta optrådt i 45 hunts, men viser `2`.

### Løsning
Kør en engangs-backfill SQL query der:
1. Tæller **antal unikke hunts** per slot fra `bonus_hunt_archives.api_data`
2. Matcher slot-navne med same normalisering som `upsert_slot_catalog` (strip apostroffer, lowercase)
3. Opdaterer `slot_catalog.bonus_count` med de korrekte tal

### SQL (via data insert tool)
```sql
WITH hunt_slot_counts AS (
  SELECT 
    lower(replace(replace(replace(
      s->'slot'->>'name', '''', ''), E'\u2019', ''), E'\u2018', '')) as norm_name,
    count(DISTINCT a.hunt_number) as real_count
  FROM bonus_hunt_archives a,
       jsonb_array_elements(a.api_data->'slots') s
  WHERE a.total_slots > 0
    AND s->'slot'->>'name' IS NOT NULL
  GROUP BY 1
)
UPDATE slot_catalog sc
SET bonus_count = hsc.real_count,
    updated_at = now()
FROM hunt_slot_counts hsc
WHERE lower(replace(replace(replace(
  sc.slot_name, '''', ''), E'\u2019', ''), E'\u2018', '')) = hsc.norm_name
  AND sc.bonus_count IS DISTINCT FROM hsc.real_count;
```

### Ingen kodeændringer
UI'et viser allerede `slot.bonus_count` korrekt i:
- `/slot-database` → "Antal Hunts" kolonnen
- `/slot-katalog/{slug}` → deep content sektioner
- Provider hub sider → top slots

Det er udelukkende data der er forkert — ikke koden.

### Forventet resultat
- Hot Fiesta: 2 → **45**
- Rip City: 2 → **44**  
- ~315 slots med `bonus_count: 1` → korrekte tal (mange vil stige til 10-40+)
- ~1134 slots med `bonus_count: 0` forbliver 0 (aldrig i et hunt)

