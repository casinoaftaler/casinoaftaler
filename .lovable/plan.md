

## Plan: Tilfoej authentication-krav til leaderboard views

### Analyse af nuvaerende setup

- **`slot_leaderboard`** view: Bruger `security_invoker=on`, saa den respekterer RLS paa `slot_game_results`. Den underliggende tabel har en policy `Anyone can view leaderboard` med `USING (true)` -- det er her adgangen skal aendres.
- **`profiles_leaderboard`** view: Bruger `security_invoker=false` (security definer), som bevidst omgaar RLS for at vise display_name og avatar_url. Denne bruges ogsaa af community clips og kommentarer, som skal vaere synlige for alle.

### Udfordring

`profiles_leaderboard` bruges af 5 forskellige features:
1. Leaderboard (slot-spil)
2. Community clips (offentlig)
3. Community kommentarer (offentlig)
4. Live Big Wins (slot-spil)
5. Slot Points Management (admin)

Hvis vi laaser `profiles_leaderboard` til kun autentificerede brugere, vil community clips og kommentarer miste navne/avatars for gaester.

### Loesung

**Trin 1: Opdater RLS paa `slot_game_results`**
- Erstat den eksisterende "Anyone can view leaderboard" policy med en ny, der kraever `auth.uid() IS NOT NULL`
- Dette sikrer at `slot_leaderboard` viewet (som bruger `security_invoker=on`) automatisk kun er tilgaengeligt for indloggede brugere

**Trin 2: Behold `profiles_leaderboard` som den er**
- Denne view eksponerer kun ikke-folsomme data (display_name, avatar_url)
- Den bruges af offentlige features (community clips), saa den skal forblive tilgaengelig
- Risikoen er minimal da den kun viser offentlige profiloplysninger

**Trin 3: Opdater frontend**
- Tilfoej et login-gate i `SlotLeaderboard` komponenten, saa uautentificerede brugere ser en besked om at logge ind
- Opdater `useSlotLeaderboard` hook til at deaktivere query naar brugeren ikke er logget ind
- Opdater `useUserPoints` hook til at haandtere uautentificeret tilstand

### Tekniske detaljer

```text
Database aendringer:
  1. DROP POLICY "Anyone can view leaderboard" ON slot_game_results
  2. CREATE POLICY "Authenticated users can view leaderboard"
     ON slot_game_results FOR SELECT
     USING (auth.uid() IS NOT NULL)

Frontend aendringer:
  - useSlotLeaderboard.ts: Tilfoej enabled: !!currentUserId
  - SlotLeaderboard.tsx: Vis login-prompt for gaester
  - useUserPoints.ts: Ingen aendring noe dvendig (allerede filtreret paa userId)
```

### Hvad forbliver uaendret
- `profiles_leaderboard` view -- forbliver offentlig (brugt af community features)
- `profiles_public` view -- forbliver offentlig (brugt af offentlige profiler)
- Community clips og kommentarer -- upaavirkede

