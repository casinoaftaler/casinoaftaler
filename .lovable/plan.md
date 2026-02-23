

## Clawback af ubrugte credits ved admin-afslutning af turneringer

### Problem
Naar en admin manuelt afslutter en turnering via admin-panelet, opdateres kun status og `ends_at` i databasen. Den kreditclawback-logik, der fjerner ubrugte turneringscredits fra brugernes saldo, koerer kun i `update-tournament-status` edge function (som er en cron-baseret funktion). Det betyder at brugere beholder ubrugte turneringscredits naar en admin afslutter manuelt.

### Loesning
Opdater `useEndTournament` hookens mutation til ogsaa at kalde `update-tournament-status` edge function efter status-opdateringen. Denne funktion indeholder allerede al clawback-logik og vil automatisk behandle den netop afsluttede turnering.

### Tekniske detaljer

**Fil: `src/hooks/useTournaments.ts`** - `useEndTournament` mutation

Nuvaerende logik:
1. Opdater tournament status til "ended" og ends_at til nu

Ny logik:
1. Opdater tournament status til "ended" og ends_at til nu (uaendret)
2. Kald `update-tournament-status` edge function, som automatisk finder turneringer med status "ended" og koerer clawback
3. Invalidate ogsaa `slot-spins` query saa brugerens credit-visning opdateres

Denne tilgang genbruger den eksisterende, testede clawback-logik uden duplikering. Edge function'en haandterer allerede alle edge cases: beregning af ubrugte credits, fradrag fra dagens saldo, opdatering af tracking-raekker, og logning.

