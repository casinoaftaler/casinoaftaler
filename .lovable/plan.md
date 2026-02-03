

# Plan: Fix Leaderboard Updates

## Problemer identificeret

### Problem 1: Manglende query invalidation
Når en spin bliver registreret i `slot_game_results`, bliver leaderboard-queryen ikke invalideret, så dataen forbliver stale indtil den udløber (30 sekunder).

### Problem 2: RLS blokerer profil-data
Profiles-tabellen har RLS-policies der kun tillader brugere at se deres egen profil. Når leaderboard-hook'en prøver at hente alle spilleres profiler, returneres kun den aktuelle brugers profil (eller ingen hvis ikke logget ind). Dette resulterer i "Anonym" for alle andre spillere.

### Problem 3: Ineffektiv aggregering
Hooket henter ALLE spin-resultater og aggregerer i JavaScript, selvom der allerede findes en `slot_leaderboard` view der gør dette mere effektivt.

---

## Løsninger

### Del 1: Opret en public leaderboard view med profil-data (database)

Opret en ny view der kombinerer `slot_leaderboard` med profil-data på en sikker måde:

```sql
CREATE VIEW public.slot_leaderboard_public
WITH (security_invoker = on) AS
SELECT 
  sl.user_id,
  sl.total_winnings,
  sl.biggest_win,
  sl.total_spins,
  sl.daily_winnings,
  sl.weekly_winnings,
  p.display_name,
  p.avatar_url,
  p.twitch_username
FROM slot_leaderboard sl
LEFT JOIN profiles p ON p.user_id = sl.user_id;
```

**Bemærk:** Vi bruger `security_invoker = on` for at respektere eksisterende RLS, men da `slot_leaderboard` allerede er public-accessible, vil dette fungere.

**Alternativ:** Opret en RLS policy på profiles der tillader offentlig adgang til display_name, avatar_url og twitch_username for leaderboard-formål.

### Del 2: Opdater RLS for profiles (database)

Tilføj en SELECT policy der tillader læsning af display_name, avatar_url og twitch_username for alle brugere:

```sql
-- Tillad alle at se basale profil-info til leaderboard
CREATE POLICY "Anyone can view basic profile info for leaderboard"
ON public.profiles FOR SELECT
USING (true);
```

**Sikkerhedsnoter:** 
- Profiles-tabellen indeholder kun: id, user_id, twitch_id, twitch_username, avatar_url, display_name, created_at, updated_at
- Ingen følsomme data som email eller password
- twitch_id kan potentielt være semi-følsomt, men er nødvendigt for leaderboard-display

### Del 3: Tilføj query invalidation efter spin (`src/components/slots/SlotGame.tsx`)

**Ændringer:**
1. Import `useQueryClient` fra `@tanstack/react-query`
2. Kald `queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] })` efter spin-resultat er gemt

**Linje ~1-30:**
```tsx
import { useQueryClient } from "@tanstack/react-query";
// ... andre imports
```

**Linje ~500-510:**
```tsx
// Record the spin result
if (user) {
  supabase.from("slot_game_results").insert({...});
  
  // Invalidate leaderboard to show updated data
  queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
}
```

### Del 4: Forenkl leaderboard hook (`src/hooks/useSlotLeaderboard.ts`)

Opdater hooket til at bruge den eksisterende `slot_leaderboard` view i stedet for at aggregere manuelt:

```tsx
export function useSlotLeaderboard(period: "daily" | "weekly" | "alltime" = "alltime") {
  return useQuery({
    queryKey: ["slot-leaderboard", period],
    queryFn: async (): Promise<LeaderboardEntry[]> => {
      // Fetch from slot_leaderboard view with profile join
      const { data, error } = await supabase
        .from("slot_leaderboard")
        .select(`
          user_id,
          total_winnings,
          biggest_win,
          total_spins,
          daily_winnings,
          weekly_winnings
        `);

      if (error) throw error;

      // Fetch profiles for display names
      const userIds = (data || []).map(d => d.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, twitch_username")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      const entries: LeaderboardEntry[] = (data || []).map(row => {
        const profile = profileMap.get(row.user_id);
        return {
          user_id: row.user_id,
          total_winnings: row.total_winnings || 0,
          biggest_win: row.biggest_win || 0,
          total_spins: row.total_spins || 0,
          daily_winnings: row.daily_winnings || 0,
          weekly_winnings: row.weekly_winnings || 0,
          display_name: profile?.display_name || profile?.twitch_username || "Anonym",
          avatar_url: profile?.avatar_url || undefined,
        };
      });

      // Sort by period
      const sortKey = period === "daily" ? "daily_winnings" 
                    : period === "weekly" ? "weekly_winnings" 
                    : "total_winnings";
      entries.sort((a, b) => (b[sortKey] as number) - (a[sortKey] as number));

      return entries.slice(0, 10);
    },
    staleTime: 10000, // Reduced to 10 seconds for fresher data
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });
}
```

---

## Filer der skal ændres

| Fil | Ændring |
|-----|---------|
| Database migration | Tilføj public SELECT policy på profiles |
| `src/components/slots/SlotGame.tsx` | Import useQueryClient og invalider leaderboard efter spin |
| `src/hooks/useSlotLeaderboard.ts` | Brug slot_leaderboard view, tilføj refetchInterval |

---

## Tekniske detaljer

### Query invalidation flow
```text
Bruger spinner → Resultat gemmes i slot_game_results → 
slot_leaderboard view opdateres automatisk → 
queryClient.invalidateQueries() kaldes → 
SlotLeaderboard component refetcher → 
Ny data vises
```

### Sikkerhed
- Profiles-data (display_name, avatar_url) er allerede semi-offentlige (Twitch-info)
- Ingen følsomme felter eksponeres
- RLS på slot_game_results forbliver uændret

