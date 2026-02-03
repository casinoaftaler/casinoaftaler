

# Plan: Slot Statistik Dashboard til Admin

## Oversigt
Opret et udvidet statistik-dashboard i admin-panelet der viser slot-maskine statistikker for forskellige tidsperioder: I dag, Denne uge, Denne måned, og Alt tid.

---

## Funktioner

### Tidsperiode Selector
| Periode | Beskrivelse |
|---------|-------------|
| I dag | Data fra dagens start (00:00) til nu |
| Denne uge | Data fra mandag denne uge |
| Denne måned | Data fra den 1. i denne måned |
| Alt tid | Al historisk data |

### Statistik Kort (4 kort)
- **Total Spins** - Antal spins i perioden
- **Total Gevinster** - Samlet gevinst-points udbetalt
- **Største Gevinst** - Den højeste enkelt-gevinst
- **Unikke Spillere** - Antal forskellige brugere der har spillet

### Grafer
1. **Spins Over Tid** - Line chart der viser antal spins per dag
2. **Gevinster Over Tid** - Area chart med daglige gevinster
3. **Top 10 Vindere** - Liste med avatar, navn og total gevinst i perioden

---

## Filer der skal ændres/oprettes

### 1. Opret ny hook: `src/hooks/useSlotAdminStatistics.ts`

Ny hook med periode-parameter der henter aggregeret data:

```typescript
interface SlotAdminStats {
  totalSpins: number;
  totalWinnings: number;
  biggestWin: number;
  uniquePlayers: number;
  totalBets: number;
  avgWinPerSpin: number;
  dailyStats: DailyStats[];
  topWinners: TopWinner[];
}

interface DailyStats {
  date: string;
  spins: number;
  winnings: number;
  players: number;
}

interface TopWinner {
  user_id: string;
  total_winnings: number;
  display_name: string | null;
  avatar_url: string | null;
}
```

Hooket beregner datogrænser baseret på valgt periode:
- "today": Fra i dag kl. 00:00
- "week": Fra mandag i denne uge
- "month": Fra den 1. i denne måned
- "alltime": Ingen startdato-filter

### 2. Opdater `src/components/SlotMachineAdminSection.tsx`

Udvid `StatisticsTab` komponenten med:

**Import af nye komponenter:**
- Tabs for periode-valg
- Recharts for grafer (allerede installeret)
- ChartContainer fra ui/chart

**Struktur:**
```tsx
function StatisticsTab() {
  const [period, setPeriod] = useState<"today" | "week" | "month" | "alltime">("today");
  const { data: stats, isLoading } = useSlotAdminStatistics(period);

  return (
    <div className="space-y-6">
      {/* Periode Selector */}
      <div className="flex gap-2">
        <Button variant={...} onClick={() => setPeriod("today")}>I dag</Button>
        <Button variant={...} onClick={() => setPeriod("week")}>Denne uge</Button>
        <Button variant={...} onClick={() => setPeriod("month")}>Denne måned</Button>
        <Button variant={...} onClick={() => setPeriod("alltime")}>Alt tid</Button>
      </div>

      {/* Statistik Kort */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Sparkles} label="Total Spins" value={stats.totalSpins} />
        <StatCard icon={TrendingUp} label="Total Gevinster" value={stats.totalWinnings} suffix="pts" />
        <StatCard icon={Trophy} label="Største Gevinst" value={stats.biggestWin} suffix="pts" />
        <StatCard icon={Users} label="Unikke Spillere" value={stats.uniquePlayers} />
      </div>

      {/* Grafer */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitet Over Tid</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={...} className="h-[300px]">
            <AreaChart data={stats.dailyStats}>
              ...
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Vindere */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Vindere</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.topWinners.map(...)}
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Data Flow

```text
Admin vælger periode → useSlotAdminStatistics(period) → 
Supabase query med dato-filter → 
Aggreger data client-side → 
Vis i kort, grafer og top-liste
```

---

## SQL Query Strategi

**Hovedquery for periode-data:**
```sql
SELECT 
  COUNT(*) as total_spins,
  SUM(win_amount) as total_winnings,
  MAX(win_amount) as biggest_win,
  SUM(bet_amount) as total_bets,
  COUNT(DISTINCT user_id) as unique_players
FROM slot_game_results
WHERE created_at >= [period_start]
```

**Daglig statistik:**
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as spins,
  SUM(win_amount) as winnings,
  COUNT(DISTINCT user_id) as players
FROM slot_game_results
WHERE created_at >= [period_start]
GROUP BY DATE(created_at)
ORDER BY date
```

**Top vindere:**
```sql
SELECT 
  user_id,
  SUM(win_amount) as total_winnings
FROM slot_game_results
WHERE created_at >= [period_start]
GROUP BY user_id
ORDER BY total_winnings DESC
LIMIT 10
```

Da vi bruger Supabase JS client, vil disse queries blive implementeret med `.select()`, `.gte()` og client-side aggregering.

---

## UI Komponenter

### Periode Buttons
- Samme styling som CombinedAnalyticsDashboard
- Active state med `variant="default"`, inactive med `variant="outline"`

### Statistik Kort
```tsx
<Card>
  <CardHeader className="pb-2">
    <CardTitle className="text-sm font-medium flex items-center gap-2">
      <Icon className="h-4 w-4 text-amber-500" />
      Label
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">{value.toLocaleString()}</div>
  </CardContent>
</Card>
```

### Line/Area Chart
- Brug ChartContainer fra ui/chart
- X-akse: Datoer formateret med da-DK locale
- Y-akse: Værdier
- Farver: amber-500 for slot-tema konsistens

### Top Vindere Liste
- Avatar + display_name + total gevinst
- Rangnummer badge
- Samme styling som nuværende topWinnersToday

---

## Tekniske Detaljer

**Dato beregning:**
```typescript
const getPeriodStart = (period: string): Date | null => {
  const now = new Date();
  switch (period) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "week":
      const dayOfWeek = now.getDay();
      const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      return new Date(now.setDate(diff));
    case "month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "alltime":
      return null; // No filter
  }
};
```

**Performance:**
- `staleTime: 30000` (30 sekunder cache)
- `refetchInterval: 60000` (auto-refresh hvert minut)
- Client-side aggregering for fleksibilitet

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/hooks/useSlotAdminStatistics.ts` | Opret ny hook med periode-baseret data-fetching |
| `src/components/SlotMachineAdminSection.tsx` | Udvid StatisticsTab med periode-selector, flere kort, grafer og forbedret top-liste |

