

## Automatisk provider-synkronisering for slot_catalog

### Problem
Der er to bugs i den nuvaerende synkronisering:

1. **Uaabnede slots springes over**: Koden har `if (win <= 0) continue`, saa nye slots der endnu ikke er aabnet i en bonus hunt faar aldrig deres provider gemt i kataloget.
2. **Provider opdateres aldrig**: Database-funktionen `upsert_slot_catalog` opdaterer kun `highest_win` og `highest_x` paa eksisterende raekker -- provider forbliver "Custom Slot" selvom API'en returnerer det rigtige navn.

Der er aktuelt 4 slots med "Custom Slot" som provider i databasen.

### Loesning

**1. Opdater database-funktionen `upsert_slot_catalog`**
- Tilfoej logik saa provider opdateres naar den eksisterende vaerdi er "Custom Slot" eller "Unknown"
- RTP opdateres ogsaa hvis den eksisterende vaerdi er NULL

```text
ON CONFLICT (slot_name) DO UPDATE SET
  provider = CASE 
    WHEN slot_catalog.provider IN ('Custom Slot', 'Unknown') 
    THEN EXCLUDED.provider 
    ELSE slot_catalog.provider 
  END,
  rtp = COALESCE(slot_catalog.rtp, EXCLUDED.rtp),
  highest_win = GREATEST(...),
  highest_x = GREATEST(...)
```

**2. Opdater Edge Functions (bonus-hunt-proxy og bonus-hunt-auto-settle)**
- Fjern `if (win <= 0) continue` begransningen saa ALLE slots (ogsaa uaabnede) faar deres provider og RTP synkroniseret
- For uaabnede slots saettes `highest_win` og `highest_x` til 0 (saa GREATEST-logikken bevarer eksisterende rekorder)

**3. Ret eksisterende data**
- Koer en engangs-opdatering der retter de 4 eksisterende "Custom Slot" raekker baseret paa data fra `bonus_hunt_provider_overrides` tabellen

### Filer der aendres
- Database-migration: Opdater `upsert_slot_catalog` funktionen
- `supabase/functions/bonus-hunt-proxy/index.ts`: Fjern win-check, synk alle slots
- `supabase/functions/bonus-hunt-auto-settle/index.ts`: Samme aendring

