

## Plan: Countdown timer, vinderarkiv og "Vis alle" knap til SidebarLeaderboard

### Overblik
Tre nye features:
1. **Countdown timer** i leaderboard-komponenter der viser tid til naeste maned (auto-reset d. 1.)
2. **Vinderarkiv** -- ved maanedsskift arkiveres vinderne for alle 3 kategorier i en ny DB-tabel, og brugere kan se tidligere vindere
3. **"Vis alle" knap** paa SidebarLeaderboard (billedet brugeren sendte) der aabner det fulde leaderboard

---

### 1. Database: Ny tabel `monthly_tournament_archives`

Ny tabel til at gemme vindere ved maanedsskift:

```text
monthly_tournament_archives
- id (uuid, PK)
- month (date) -- foerste dag i maaneden, fx 2026-03-01
- category (text) -- "total_points" | "highest_x" | "highest_win"
- winner_user_id (uuid)
- winner_display_name (text)
- winner_avatar_url (text, nullable)
- winning_value (numeric) -- det vindende tal (point, multiplier, eller gevinst)
- top_entries (jsonb) -- top 10 for denne kategori (for historisk visning)
- created_at (timestamptz)
```

RLS: Alle kan laese (SELECT), kun service_role kan skrive.

Index paa `month` for hurtig historik-opslag.

### 2. Edge Function: `archive-monthly-tournament`

Ny edge function der koerer d. 1. i hver maaned (kan trigges via cron eller manuelt):

- Henter top 1 for hver af de 3 kategorier fra `slot_leaderboard` (monthly_winnings, monthly_biggest_win, monthly_biggest_multiplier)
- Gemmer 3 raekker i `monthly_tournament_archives` (en per kategori)
- Gemmer top 10 per kategori i `top_entries` JSON-feltet
- Henter display_name/avatar_url fra profiles_leaderboard
- Idempotent: tjekker om maaneden allerede er arkiveret foer insert

### 3. Hook: `useMonthlyTournamentArchive`

Ny hook der henter arkiverede vindere:

- Query `monthly_tournament_archives` ordnet efter `month DESC`
- Returnerer liste af maaneder med deres 3 vindere
- Bruges i SlotLeaderboard til at vise "Forrige vindere" sektion

### 4. Countdown Timer

Tilfoej en countdown-komponent der viser tid til d. 1. i naeste maaned:

- Beregner naeste maaneds foerste dag kl. 00:00 dansk tid
- Viser "Xd Xh Xm" format
- Opdateres hvert sekund
- Vises i baade `SlotLeaderboard` (under header) og `SidebarLeaderboard`

### 5. UI: Opdater `SlotLeaderboard`

- Tilfoej countdown timer mellem header og category tabs
- Tilfoej en "Forrige vindere" sektion i bunden eller dialog med arkiverede vindere
- Vis seneste maaneds vindere med avatar, navn og vindende vaerdi

### 6. UI: Opdater `SidebarLeaderboard`

- Tilfoej en "Se alle" knap i bunden (som paa billedet brugeren sendte)
- Knappen aabner en Dialog med det fulde leaderboard (genbruger SlotLeaderboard-dialog logik)
- Tilfoej kort countdown timer tekst under "Top 5 spillere" label

### Filer der aendres/oprettes

| Fil | Type | Beskrivelse |
|---|---|---|
| `supabase/migrations/new.sql` | Ny | Opret `monthly_tournament_archives` tabel |
| `supabase/functions/archive-monthly-tournament/index.ts` | Ny | Edge function til at arkivere vindere |
| `src/hooks/useMonthlyTournamentArchive.ts` | Ny | Hook til at hente arkiverede vindere |
| `src/components/slots/SlotLeaderboard.tsx` | Opdater | Countdown timer + vindere-arkiv visning |
| `src/components/games/SidebarLeaderboard.tsx` | Opdater | "Se alle" knap + countdown |

### Hvad forbliver uaendret
- Admin panel stats
- Turnerings-systemet (join, credits, clawback)
- `useSlotLeaderboard` hook (allerede korrekt)
- MiniLeaderboard
- Leaderboard page (`/community/leaderboard`)

