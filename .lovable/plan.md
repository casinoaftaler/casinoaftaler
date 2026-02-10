

# Website Optimering - 5 Forbedringer

## Oversigt
Fem optimeringer der reducerer initial load-tid, mindsker unodvendige netvaerksopkald og goer queries mere effektive. Al funktionalitet bevares.

---

## 1. Lazy-load flere sider

**Problem:** 17 sider importeres eagerly og indgaar i initial bundle, selvom brugere kun besoeger 1-2 sider ad gangen.

**Loesning:** Lazy-load alle sider undtagen Index (forsiden) og Layout. Tilfoej en generel loading-fallback.

**Fil:** `src/App.tsx`
- Konverter alle page-imports (Admin, Profile, Auth, Shop, Highlights osv.) til `lazy(() => import(...))`
- Wrap alle routes i `<Suspense>` med en simpel loading-fallback
- Behold Index som eager import (forsiden skal loade hurtigt)

---

## 2. Cache site settings

**Problem:** `useSiteSettings` har `staleTime: 0`, saa den refetcher ved HVER komponent-mount og hvert page-skift. Site settings aendres sjældent.

**Loesning:** Saet `staleTime: 5 * 60 * 1000` (5 minutter) saa settings caches og ikke hentes igen paa hvert sideskift.

**Fil:** `src/hooks/useSiteSettings.ts`
- AEndr `staleTime` fra 0 til 300000 (5 min)

---

## 3. Optimer casino auth-check

**Problem:** `useCasinos` kalder `supabase.auth.getSession()` i HVER query-execution, ogsaa for public brugere der aldrig har brug for auth.

**Loesning:** Flyt auth-check ud saa den kun koerer naar `includeInactive=true` (kun admin-panelet). Public brugere springer auth-check over.

**Fil:** `src/hooks/useCasinos.ts`
- Flyt `getSession()` ind i `if (includeInactive)` blokken
- Public path (default) gaar direkte til `casinos_public` view uden auth-check

---

## 4. Begrans leaderboard-data

**Problem:** `useSlotLeaderboard` henter ALLE raekker fra `slot_leaderboard` view uden limit. Efterhaanden som brugerbasen vokser, bliver dette langsomt.

**Loesning:** Tilfoej `.limit(100)` til leaderboard-query og `.limit(100)` til profiles-query. Top 100 er rigeligt til visning, og current user hentes separat allerede.

**Fil:** `src/hooks/useSlotLeaderboard.ts`
- Tilfoej `.limit(100)` paa leaderboard-query
- Tilfoej `.limit(100)` paa profiles-query

---

## 5. Fjern unodig realtime-subscription paa leaderboard

**Problem:** Leaderboard subscribes til ALLE inserts i `slot_game_results` og invaliderer query ved hvert spin. Med 28.000+ raekker og aktive spillere giver det mange unodvendige refetches.

**Loesning:** Fjern realtime-subscription helt. Leaderboardet har allerede `refetchInterval: 30000` (30 sek), hvilket er tilstraekkeligt for en leaderboard.

**Fil:** `src/hooks/useSlotLeaderboard.ts`
- Slet hele `useEffect` med `supabase.channel('leaderboard-updates')`
- Behold `refetchInterval: 30000` som opdateringsmekanisme

---

## Teknisk sektion

### App.tsx aendringer
```
// Alle sider lazy-loaded undtagen Index
const Admin = lazy(() => import("./pages/Admin"));
const Profile = lazy(() => import("./pages/Profile"));
const Auth = lazy(() => import("./pages/Auth"));
// ... osv for alle sider

// Generel fallback
<Suspense fallback={<div className="min-h-screen" />}>
  <Route ... />
</Suspense>
```

### useSiteSettings.ts
```
staleTime: 5 * 60 * 1000, // 5 minutter cache
```

### useCasinos.ts
```
// Kun check auth naar det er noedvendigt
if (includeInactive) {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) { ... }
}
// Public path: ingen auth-check
```

### useSlotLeaderboard.ts
```
// Tilfoej limit
.from("slot_leaderboard").select(...).limit(100)

// Fjern realtime useEffect helt
// Behold refetchInterval: 30000
```

### Filer der aendres
- `src/App.tsx` - lazy-load sider
- `src/hooks/useSiteSettings.ts` - cache staleTime
- `src/hooks/useCasinos.ts` - fjern unodig auth-check
- `src/hooks/useSlotLeaderboard.ts` - limit + fjern realtime

### Ingen breaking changes
- Al funktionalitet bevares
- Leaderboard opdateres stadig hvert 30. sekund
- Admin faar stadig fuld casino-data
- Site settings refetches stadig ved window focus
