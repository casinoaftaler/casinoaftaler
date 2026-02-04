

# Plan: Implementer Ægte Unik Bruger-Tracking

## Oversigt

Denne plan implementerer ægte unik bruger-tracking ved at:
1. Generere en anonym session-ID (UUID) for hver ny besøgende og gemme den i localStorage
2. Tilføje `visitor_id` og `user_id` kolonner til `page_views` tabellen
3. Opdatere tracking-hook'en til at inkludere disse identifikatorer
4. Opdatere dashboard'et til at vise ægte unikke besøgende

## Hvad Er Forskellen?

| Nuværende | Ny Løsning |
|-----------|------------|
| Estimat baseret på path+time | Ægte unik ID per browser |
| Ingen forbindelse til loggede brugere | Kobler anonyme besøg med bruger-konti |
| Kan ikke spore returbesøg | Kan se om samme person vender tilbage |

## Tekniske Ændringer

### 1. Database Migration

Tilføjer to nye kolonner til `page_views` tabellen:

```sql
ALTER TABLE page_views 
ADD COLUMN visitor_id text,
ADD COLUMN user_id uuid REFERENCES auth.users(id);
```

- `visitor_id`: Anonymt UUID gemt i localStorage (f.eks. `"anon_abc123"`)
- `user_id`: Auth bruger-ID hvis logget ind (null for anonyme)

### 2. Hook Opdatering (`src/hooks/usePageTracking.ts`)

```text
Ændringer:
- Generér/hent visitor_id fra localStorage ved første besøg
- Hent nuværende auth session (hvis logget ind)
- Inkluder begge ID'er i page_views insert
```

Logik:
1. Tjek localStorage for `visitor_id`
2. Hvis ikke findes, generer ny UUID og gem
3. Tjek om bruger er logget ind via Supabase auth
4. Send begge værdier med hver page view

### 3. Dashboard Opdatering (`src/components/CombinedAnalyticsDashboard.tsx`)

```text
Ændringer:
- Inkluder visitor_id i data fetch
- Beregn unikke besøgende via Set af visitor_id'er
- Vis ægte unik bruger-tal i stedet for estimat
```

Ny statistik-logik:
```typescript
// Ægte unikke besøgende = antal unikke visitor_id'er
const uniqueVisitors = new Set(pageViewsData.map(v => v.visitor_id)).size;

// Nye vs. tilbagevendende besøgende
const newVisitors = // visitor_id'er set første gang i perioden
const returningVisitors = // visitor_id'er set før perioden
```

## Fil-Ændringer

| Fil | Ændring |
|-----|---------|
| Database migration | Tilføj `visitor_id` og `user_id` kolonner |
| `src/hooks/usePageTracking.ts` | Generer/hent visitor_id, inkluder i tracking |
| `src/components/CombinedAnalyticsDashboard.tsx` | Beregn ægte unikke besøgende |

## Privacy & Cookie Consent

- Visitor ID genereres kun hvis cookie consent er accepteret (`localStorage.getItem("cookie-consent") === "accepted"`)
- Hvis cookies afvist, tracking fortsætter uden visitor_id (sidevisninger logges stadig)
- Ingen personlige data gemmes - kun tilfældigt UUID

## Resultat

Efter implementering vil dashboardet vise:
- **Unikke Besøgende**: Ægte antal forskellige browsere/enheder
- **Sidevisninger**: Total antal sidevisninger (som nu)
- **Nye vs. Tilbagevendende**: Fordeling af nye og tilbagevendende brugere
- **Logget ind brugere**: Antal page views fra autentificerede brugere

