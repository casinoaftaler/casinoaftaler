

# Turneringssystem

## Overblik
Et komplet turneringssystem hvor administratorer kan oprette tidsbaserede turneringer med egne leaderboards. Point fra spillemaskinerne taeller baade for turneringer OG det eksisterende globale leaderboard. Navigationen aendres fra "Leaderboard" til "Turneringer".

## Database

### Ny tabel: `tournaments`
| Kolonne | Type | Beskrivelse |
|---|---|---|
| id | uuid (PK) | Auto-genereret |
| title | text | Turneringsnavn (fx "Vind et headset!") |
| description | text (nullable) | Beskrivelse/praemieinformation |
| game_ids | text[] | Hvilke spil der taeller (`['book-of-fedesvin']`, `['rise-of-fedesvin']`, eller begge) |
| separate_leaderboards | boolean (default false) | Hvis true: separate ranglister per slot. Hvis false: samlet rangliste |
| starts_at | timestamptz | Starttidspunkt |
| ends_at | timestamptz | Sluttidspunkt |
| status | text (default 'upcoming') | `upcoming`, `active`, `ended` |
| created_by | uuid | Admin-brugerens ID |
| created_at | timestamptz | |

RLS: Admins kan CRUD. Autentificerede brugere kan laese.

### Ny tabel: `tournament_entries`
| Kolonne | Type | Beskrivelse |
|---|---|---|
| id | uuid (PK) | |
| tournament_id | uuid (FK -> tournaments) | |
| user_id | uuid | |
| game_id | text | Hvilket spil pointene kom fra |
| total_points | numeric (default 0) | Akkumulerede point |
| total_spins | integer (default 0) | Antal spins |
| biggest_win | numeric (default 0) | Stoerste enkelgevinst |
| biggest_multiplier | numeric (default 0) | Stoerste multiplikator |
| updated_at | timestamptz | |

Unique constraint paa `(tournament_id, user_id, game_id)`.
RLS: Autentificerede brugere kan laese. Ingen klient-INSERT/UPDATE (kun server via slot-spin).

### Ny database-funktion: `upsert_tournament_entry`
Atomisk funktion der tilfojer point til en brugers turneringsentry (eller opretter den). Opdaterer biggest_win og biggest_multiplier kun hvis hoejere.

```text
upsert_tournament_entry(
  p_tournament_id uuid,
  p_user_id uuid,
  p_game_id text,
  p_points numeric,
  p_bet integer,
  p_is_bonus boolean
)
```

## Backend: slot-spin Edge Function

Efter den eksisterende `slot_game_results` insert (baade normal spin og bonus-afslutning), tilfojes et async kald:

1. Hent aktive turneringer hvor `game_ids` indeholder det aktuelle `gameId` og `now()` er mellem `starts_at` og `ends_at`
2. For hver aktiv turnering: kald `upsert_tournament_entry` RPC'en
3. Dette er fire-and-forget (ligesom game_results insert) saa det ikke paavirker spin-latens

Vigtigt: Point taeller STADIG for det globale leaderboard (`slot_game_results` og `slot_leaderboard` view) -- turneringen er et ekstra lag ovenpa.

## Frontend

### 1. Header.tsx
- "Leaderboard" -> "Turneringer" i baade desktop dropdown og mobilmenu (2 steder)
- Route forbliver `/community/leaderboard`

### 2. Leaderboard.tsx (turneringssiden)
Redesignes til at vise:
- **Aktive turneringer**: Kort med titel, beskrivelse, nedtaellingstimer, og turneringens leaderboard (top 10)
  - Hvis `separate_leaderboards = true`: vis tabs per slot-maskine inden i turneringskortet
  - Hvis `separate_leaderboards = false`: samlet rangliste
- **Kommende turneringer**: Badge med "Starter om X timer/dage"
- **Afsluttede turneringer**: Viser vinderen med trophy-badge og "Afsluttet"-label
- Fallback: Hvis ingen turneringer eksisterer, vises en besked om at der snart kommer turneringer

### 3. Ny hook: `useTournaments.ts`
- `useTournaments()` - henter alle turneringer (aktive, kommende, afsluttede)
- `useTournamentLeaderboard(tournamentId, gameId?)` - henter leaderboard for en specifik turnering
- Admin-mutationer: opret, afslut foertidigt, slet

### 4. Ny komponent: `TournamentAdminSection.tsx`
Placeres som sub-tab under "Spillemaskine"-tabben i Admin:
- Liste over alle turneringer med status-badges
- "Opret turnering"-dialog:
  - Titel og beskrivelse
  - Vaelg start- og sluttidspunkt (datetime picker)
  - Vaelg hvilke spillemaskiner (checkboxes: Book of Fedesvin, Rise of Fedesvin)
  - Toggle: Separate leaderboards per slot (ja/nej)
- Mulighed for at afslutte en turnering foertidigt
- Visning af turneringsresultater

### 5. SlotLeaderboard.tsx (sidebar i spillehallen)
Forbliver uaendret -- den viser stadig det globale all-time leaderboard uafhaengigt af turneringer.

## Fil-oversigt
| Fil | Aendring |
|---|---|
| Database migration | 2 nye tabeller + RPC-funktion |
| `supabase/functions/slot-spin/index.ts` | Tilfoej turnerings-tracking efter game_results insert |
| `src/components/Header.tsx` | "Leaderboard" -> "Turneringer" (2 steder) |
| `src/pages/Leaderboard.tsx` | Redesign til turneringsoversigt med timer og vinderannoncering |
| `src/hooks/useTournaments.ts` | Ny hook til turneringsdata og admin-mutationer |
| `src/components/TournamentAdminSection.tsx` | Ny admin-komponent til CRUD paa turneringer |
| `src/pages/Admin.tsx` | Importér og tilfoej TournamentAdminSection under spillemaskine-tab |

## Turneringsstatus-logik
- **upcoming**: `starts_at` er i fremtiden
- **active**: `starts_at` er passeret, `ends_at` er i fremtiden
- **ended**: `ends_at` er passeret

Status-overgange haandteres "lazy" -- naar turneringsdata hentes, tjekkes tidspunkterne og status opdateres automatisk. Slot-spin funktionen filtrerer udelukkende paa tidspunkter (ikke status-feltet) for at undgaa race conditions.

