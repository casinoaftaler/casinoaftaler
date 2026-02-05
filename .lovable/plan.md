

# Plan: Redesign Leaderboard with Multiplier Display

## Summary

Redesign the leaderboard component with a new layout:
- Name/avatar at the TOP of each entry
- Stats (total winnings, spins, highest multiplier) at the BOTTOM
- Replace "Max: 1500" with "1000x" multiplier format

---

## Current Layout

```
[Rank] [Avatar] [Name + Spins]     [Total Winnings]
                                    Max: 1500
```

## New Layout

```
┌─────────────────────────────────────┐
│ [Rank] [Avatar] [Name]              │
│                                     │
│ 16,544   │   2,751 spins  │  1000x  │
│ (coins)     (total spins)  (best)   │
└─────────────────────────────────────┘
```

---

## Changes Required

### 1. Database: Add Biggest Multiplier to Leaderboard View

Create a new migration to update the `slot_leaderboard` view to include `biggest_multiplier`:

```sql
CREATE OR REPLACE VIEW slot_leaderboard AS
SELECT 
  user_id,
  SUM(win_amount) as total_winnings,
  MAX(win_amount) as biggest_win,
  MAX(win_amount / NULLIF(bet_amount, 0)) as biggest_multiplier,
  COUNT(*) as total_spins,
  -- daily/weekly winnings calculations...
FROM slot_game_results
GROUP BY user_id;
```

### 2. Hook: Update LeaderboardEntry Interface

**File: `src/hooks/useSlotLeaderboard.ts`**

Add `biggest_multiplier` to the interface and fetch it:

```typescript
export interface LeaderboardEntry {
  user_id: string;
  total_winnings: number;
  biggest_win: number;
  biggest_multiplier: number;  // NEW
  total_spins: number;
  daily_winnings: number;
  weekly_winnings: number;
  display_name?: string;
  avatar_url?: string;
}
```

### 3. Component: Redesign LeaderboardRow

**File: `src/components/slots/SlotLeaderboard.tsx`**

New layout for each leaderboard entry:

```typescript
function LeaderboardRow({ entry, rank }: { entry: LeaderboardEntry; rank: number }) {
  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return <span className="w-5 text-center text-muted-foreground font-bold">{rank}</span>;
  };

  // Format multiplier as "120x"
  const formattedMultiplier = entry.biggest_multiplier > 0 
    ? `${Math.round(entry.biggest_multiplier)}x` 
    : "-";

  return (
    <div className={cn(
      "p-3 rounded-lg",
      rank <= 3 ? "bg-gradient-to-r from-amber-500/10 to-transparent" : "hover:bg-muted/50"
    )}>
      {/* Top row: Rank, Avatar, Name */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-6 flex justify-center">{getRankIcon()}</div>
        <Avatar className="h-8 w-8">
          <AvatarImage src={entry.avatar_url} alt={entry.display_name} />
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
        <p className="font-medium text-amber-100 flex-1 truncate">
          {entry.display_name}
        </p>
      </div>
      
      {/* Bottom row: Stats in 3 columns */}
      <div className="flex items-center justify-between text-sm pl-9">
        <div className="text-center">
          <p className="font-bold text-amber-500">{entry.total_winnings.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">point</p>
        </div>
        <div className="text-center">
          <p className="font-medium text-amber-100">{entry.total_spins.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">spins</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-green-400">{formattedMultiplier}</p>
          <p className="text-xs text-muted-foreground">bedste</p>
        </div>
      </div>
    </div>
  );
}
```

---

## Visual Design Notes

- **Name row**: Prominent at top with rank icon and avatar
- **Stats row**: Three evenly-spaced columns below
  - Left: Total winnings (amber/gold color)
  - Center: Total spins (neutral color)
  - Right: Best multiplier as "120x" (green to stand out)
- Keep existing Egyptian theme colors (amber, gold gradients)
- Same card styling and dialog for full list

---

## Files to Modify

1. **Database migration** - Add `biggest_multiplier` column to `slot_leaderboard` view
2. **`src/hooks/useSlotLeaderboard.ts`** - Add `biggest_multiplier` to interface and query
3. **`src/components/slots/SlotLeaderboard.tsx`** - Redesign row layout with name on top, stats on bottom

