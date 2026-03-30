

## Fase 1: Klassificer alle 1.460+ slots i 4 arketyper

### Baggrund
Slot-siderne har allerede en solid arkitektur med anti-footprint, deep_content, description, FAQ-varianter osv. Men der mangler en eksplicit **klassificering** der gør det muligt at:
1. Vide hvilke slots der har nok data til at blive beriget yderligere
2. Prioritere AI-berigelse intelligent (stats-heavy først)
3. Tilpasse rendering baseret på arketype (fremtidigt)

### Hvad der bygges

**1. Database-migration** – Tilføj 2 nye kolonner til `slot_catalog`:
- `content_archetype` (text, nullable) – værdier: `stats-heavy`, `community-driven`, `comparison`, `minimal`
- `content_enriched_at` (timestamptz, nullable) – hvornår slotten sidst blev beriget

**2. Edge Function: `slot-classify-archetypes`** – Klassificerer alle slots automatisk:
- **Stats-heavy**: `rtp IS NOT NULL AND bonus_count >= 3 AND (highest_x > 0 OR highest_win > 0)`
- **Community-driven**: `bonus_count BETWEEN 1 AND 2 AND (highest_x > 0 OR highest_win > 0)`
- **Comparison**: `rtp IS NOT NULL AND bonus_count = 0`
- **Minimal**: Alt andet (ingen RTP, ingen bonus hunts)

Klassificeringen sker direkte i SQL via en enkelt UPDATE med CASE-statement – ingen AI nødvendig, ingen API-kost.

**3. Admin-knap** – Tilføj en "Klassificer Arketyper" knap i admin-panelet (eller eksisterende slot-catalog admin), så du kan køre klassificeringen manuelt og se fordelingen.

**4. SlotCatalogPage rendering** – Tilføj et diskret badge der viser arketype (kun synligt for admins), så du kan verificere klassificeringen.

### Klassificeringslogik (SQL)
```text
CASE
  WHEN rtp IS NOT NULL 
   AND bonus_count >= 3 
   AND (highest_x > 0 OR highest_win > 0)
  THEN 'stats-heavy'
  
  WHEN bonus_count >= 1 
   AND (highest_x > 0 OR highest_win > 0)
  THEN 'community-driven'
  
  WHEN rtp IS NOT NULL
  THEN 'comparison'
  
  ELSE 'minimal'
END
```

### Filer der ændres/oprettes
1. **Migration**: Tilføj `content_archetype` + `content_enriched_at` kolonner
2. **`supabase/functions/slot-classify-archetypes/index.ts`** – Edge function der kører klassificeringen
3. **`supabase/config.toml`** – Tilføj function config
4. **`src/hooks/useSlotCatalog.ts`** – Opdater `SlotCatalogEntry` interface med nye felter
5. **Admin UI** – Knap + statistik-visning af arketype-fordelingen

### Forventet resultat (baseret på data-preview)
| Arketype | Antal | Andel |
|---|---|---|
| Stats-heavy | ~233 | 16% |
| Community-driven | ~183 | 12% |
| Comparison | ~1.055 | 71% |
| Minimal | ~5 | <1% |

### Hvad dette IKKE gør (endnu)
- Ændrer ikke indholdet på nogen sider (kun tilføjer metadata)
- Ændrer ikke URL'er, titles, eller eksisterende tekst
- Kræver ingen AI API-kald (ren data-logik)

Dette er fundamentet for Fase 2, hvor vi begynder at berige stats-heavy slots med unik AI-genereret indhold baseret på deres arketype.

