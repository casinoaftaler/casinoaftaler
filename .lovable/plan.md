

# Turneringscredit-begrænsning

## Overblik
Admins kan sætte et valgfrit maksimum for credits brugt per bruger i en turnering. Når en deltager har brugt det tilladte antal credits, tæller efterfølgende spins ikke længere for turneringens leaderboard (men det globale leaderboard og selve spillet fortsætter normalt).

## Database-ændringer

### 1. `tournaments` tabel: ny kolonne
- `max_credits` (integer, nullable, default null) -- null betyder ingen begrænsning

### 2. `tournament_entries` tabel: ny kolonne
- `total_credits_used` (numeric, default 0) -- akkumulerede credits/indsatser brugt i turneringen

### 3. Opdater `upsert_tournament_entry` RPC
Tilføj parameteren `p_bet` (som allerede sendes) til at akkumulere `total_credits_used`. Før upsert tjekkes om brugeren har nået max_credits-grænsen for turneringen. Hvis ja, skippes upsert.

Logik:
```text
1. Slå turneringens max_credits op
2. Hvis max_credits IS NULL -> ingen begrænsning, fortsæt normalt
3. Hent brugerens nuværende total_credits_used for denne turnering
4. Hvis total_credits_used + p_bet > max_credits -> skip (return tidligt)
5. Ellers -> upsert som normalt og addér p_bet til total_credits_used
```

## Frontend-ændringer

### 1. Admin: Opret/Rediger turnering
- Nyt valgfrit felt "Maks credits per deltager" i både `CreateTournamentDialog` og `EditTournamentDialog`
- Placeholder: "Ingen begrænsning" når feltet er tomt

### 2. Turneringskort (Leaderboard.tsx)
- Vis maks credits badge på turneringskortet (fx "Maks 600 credits")
- Vis brugerens forbrugte credits under deres leaderboard-entry (fx "420 / 600 credits brugt")

### 3. useTournaments hook
- Opdater `Tournament` interface med `max_credits: number | null`
- Opdater `TournamentEntry` interface med `total_credits_used: number`

## Backend: slot-spin Edge Function
Ingen ændringer nødvendige i selve slot-spin -- begrænsningen håndteres inde i den opdaterede `upsert_tournament_entry` RPC-funktion, som allerede modtager `p_bet`.

## Tekniske detaljer

### Opdateret `upsert_tournament_entry` RPC (pseudokode)
```text
DECLARE v_max_credits integer;
DECLARE v_current_used numeric;

-- Hent turneringens max_credits
SELECT max_credits INTO v_max_credits FROM tournaments WHERE id = p_tournament_id;

-- Hvis der er en begrænsning, tjek om den er nået
IF v_max_credits IS NOT NULL THEN
  SELECT COALESCE(total_credits_used, 0) INTO v_current_used
  FROM tournament_entries
  WHERE tournament_id = p_tournament_id AND user_id = p_user_id AND game_id = p_game_id;

  IF COALESCE(v_current_used, 0) + p_bet > v_max_credits THEN
    RETURN; -- Skip, brugeren har nået grænsen
  END IF;
END IF;

-- Fortsæt med upsert som normalt, men tilføj total_credits_used
INSERT INTO tournament_entries (..., total_credits_used)
VALUES (..., p_bet)
ON CONFLICT (tournament_id, user_id, game_id)
DO UPDATE SET
  ...,
  total_credits_used = tournament_entries.total_credits_used + p_bet;
```

## Fil-oversigt
| Fil | Ændring |
|---|---|
| Database migration | Tilføj `max_credits` til `tournaments`, `total_credits_used` til `tournament_entries`, opdater RPC |
| `src/hooks/useTournaments.ts` | Opdater interfaces og mutations |
| `src/components/TournamentAdminSection.tsx` | Tilføj max_credits input i opret/rediger dialogs |
| `src/pages/Leaderboard.tsx` | Vis max_credits badge og brugerens credit-forbrug |

