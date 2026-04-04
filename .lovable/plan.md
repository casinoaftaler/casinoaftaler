

# Live Winners Feed — Højre-side aktivitetsbar

## Hvad vi bygger
En vertikal "Winners" feed-widget inspireret af det uploadede screenshot, placeret som en fixed sidebar i højre side af skærmen, over navigationen. Den viser tre typer live-hændelser:

1. **Store gevinster (100x+)** — Når en spiller lander en gevinst på 100x eller mere
2. **Leaderboard-overtagelser (top 5)** — Når en spiller overtager en andens plads i top 5 på en maskine
3. **Nylige gevinster** — Generel feed af seneste vindere

Alt på dansk, opdateret via Supabase Realtime (instant) med fallback polling hvert 60. sekund.

---

## Teknisk plan

### 1. Ny komponent: `LiveWinnersFeed.tsx`
- Fixed position i højre side (`fixed right-0 top-1/3 z-40`)
- Kan minimeres/lukkes (toggle-knap)
- Mørkt design som i screenshottet med semi-transparent baggrund
- Viser op til 8-10 seneste hændelser med auto-scroll/fade
- Skjules på mobil og på slot-maskine-sider (som SupportChatWidget)

### 2. Data-hook: `useLiveWinnersFeed.ts`
- **Realtime listener** på `slot_game_results` (allerede i `supabase_realtime` publication)
  - Filtrerer: kun vis events hvor `win_amount / bet_amount >= 100`
  - Beriger med brugerprofil fra `profiles_leaderboard`
- **Leaderboard-overtagelser**: Ved hvert nyt result, sammenlign med cached top-5 per game fra `slot_leaderboard_by_game`. Hvis en bruger rykker ind i top 5 eller overtager en plads, generer en "overtog"-besked
- **Initial load**: Hent seneste 10 store gevinster (100x+) fra `slot_game_results` ved mount
- Polling fallback hvert 60s for leaderboard-ændringer

### 3. Feed-event typer
```text
┌──────────────────────────────────────┐
│  🏆 LIVE VINDERE          ─  ✕     │
├──────────────────────────────────────┤
│  🎰 Bruger123                2m     │
│  €462 · x231 · Bonanza       ▶     │
├──────────────────────────────────────┤
│  📈 Bruger456 overtog #3            │
│  fra Bruger789 · Book of F.         │
├──────────────────────────────────────┤
│  🎰 AnonSpiller              5m     │
│  €87 · x150 · Rise of F.           │
└──────────────────────────────────────┘
```

### 4. Game ID mapping
Genbruger eksisterende `GAME_LABELS` mønster fra `LivePlayersAdminSection.tsx` til at vise pæne maskinnavne.

### 5. Integration i Layout
- Tilføj `<LiveWinnersFeed />` i `Layout.tsx`
- Skjul på slot-maskine-sider og mobil
- Placering: fixed right, vertikalt centreret, z-index under modals men over indhold

### 6. Performance
- Maks 15 events i hukommelse, ældste slettes
- Debounce leaderboard-tjek (1 per minut)
- Ingen ekstra DB-tabeller nødvendige — alt bygger på eksisterende `slot_game_results` + `slot_leaderboard_by_game` + `profiles_leaderboard`

---

## Filer der oprettes/ændres
| Fil | Handling |
|-----|----------|
| `src/hooks/useLiveWinnersFeed.ts` | Ny — realtime + polling hook |
| `src/components/LiveWinnersFeed.tsx` | Ny — UI komponent |
| `src/components/Layout.tsx` | Tilføj LiveWinnersFeed |

Ingen database-migrationer nødvendige — bruger kun eksisterende tabeller og realtime publication.

