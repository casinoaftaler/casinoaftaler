

# Database Oprydning og Optimering

## Oversigt
En gennemgang af databasen og kodebasen har afsloeret ubrugt kode, en ubrugt edge function, en ubrugt database view, en ubrugt hook, og manglende indekser paa den stoerste tabel. Alt funktionalitet bevares.

---

## 1. Slet ubrugt kode

### Filer der kan slettes
| Fil | Grund |
|---|---|
| `src/hooks/useSlotStatistics.ts` | Eksporteres men importeres aldrig nogen steder i kodebasen |
| `src/hooks/useLogoColor.ts` | Eksporteres men importeres aldrig nogen steder i kodebasen |
| `supabase/functions/stress-test-slots/index.ts` | Aldrig kaldt fra frontend-koden - kun et test-vaerktoj |
| `supabase/functions/generate-and-save-slot-sound/index.ts` | Aldrig kaldt fra frontend-koden (elevenlabs-sfx bruges i stedet) |

### Database view der kan slettes
| View | Grund |
|---|---|
| `shop_items_public` | Eksisterer i databasen men bruges aldrig i koden (shop-siden laeser direkte fra `shop_items` tabellen) |

---

## 2. Tilfoej manglende indekser (ydeevne)

Tabellen `slot_game_results` har 28.800+ raekker og vokser hurtigt, men mangler indekser paa de kolonner der bruges til filtrering:

| Indeks | Kolonne | Bruges af |
|---|---|---|
| `idx_slot_game_results_user_id` | `user_id` | Leaderboard, bruger-statistik |
| `idx_slot_game_results_created_at` | `created_at` | Daglig/ugentlig statistik-filtrering |

---

## 3. Oprydning i edge function config

Fjern de slettede funktioner fra `supabase/config.toml` saa de ikke laengere deployes.

---

## Teknisk sektion

### Migration SQL
```sql
-- Add missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_slot_game_results_user_id
  ON public.slot_game_results (user_id);
CREATE INDEX IF NOT EXISTS idx_slot_game_results_created_at
  ON public.slot_game_results (created_at);

-- Drop unused view
DROP VIEW IF EXISTS public.shop_items_public;
```

### Filer der aendres
- Slet `src/hooks/useSlotStatistics.ts`
- Slet `src/hooks/useLogoColor.ts`
- Slet `supabase/functions/stress-test-slots/` (mappe)
- Slet `supabase/functions/generate-and-save-slot-sound/` (mappe)
- Fjern de to funktioners entries fra `supabase/config.toml`
- Kør migration med indekser og view-drop

### Hvad der IKKE roeres
- Alle tabeller bevares (ingen data slettes)
- Alle aktive edge functions bevares
- Alle views der faktisk bruges (`casinos_public`, `profiles_public`, `profiles_leaderboard`, `slot_leaderboard`) bevares

