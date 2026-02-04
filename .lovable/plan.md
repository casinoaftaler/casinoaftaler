

# Plan: Rangliste - Vis kun 3 brugere + "Vis alle" overlay

## Ændringer

### 1. Flyt ranglisten 20 pixels op
Tilføj `style={{ marginTop: '-20px' }}` til rangliste-containeren på desktop i `SlotMachine.tsx`.

### 2. Modificer SlotLeaderboard.tsx til kun at vise 3 brugere
- Begræns visningen til de første 3 entries i hovedvisningen
- Tilføj en "Vis alle" knap nederst

### 3. Tilføj Dialog overlay til fuld rangliste
- Importer Dialog komponent
- Tilføj state til at styre overlay åbning
- Vis hele listen (op til 10 brugere) i overlayet

## Teknisk implementering

### Fil: `src/pages/SlotMachine.tsx`

**Desktop rangliste container (linje 172)**
```tsx
<div className="hidden xl:block absolute right-full mr-4 top-0 w-80" style={{ marginTop: '-20px' }}>
```

### Fil: `src/components/slots/SlotLeaderboard.tsx`

**1. Tilføj imports**
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
```

**2. Tilføj state til dialog**
```tsx
const [showFullList, setShowFullList] = useState(false);
```

**3. Opdater hovedvisning til kun 3 brugere + "Vis alle" knap**
```tsx
{entries && entries.length > 0 ? (
  <>
    <div className="space-y-1">
      {entries.slice(0, 3).map((entry, index) => (
        <LeaderboardRow
          key={entry.user_id}
          entry={entry}
          rank={index + 1}
          period={period}
        />
      ))}
    </div>
    {entries.length > 3 && (
      <Dialog open={showFullList} onOpenChange={setShowFullList}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full mt-2 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 border border-amber-500/30"
          >
            <Users className="h-4 w-4 mr-2" />
            Vis alle ({entries.length})
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md border-amber-500/30 bg-gradient-to-b from-amber-950/98 via-black/95 to-amber-950/98">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-100">
              <Trophy className="h-5 w-5 text-amber-500" />
              Fuld Rangliste
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {entries.map((entry, index) => (
              <LeaderboardRow
                key={entry.user_id}
                entry={entry}
                rank={index + 1}
                period={period}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    )}
  </>
) : (
  // empty state...
)}
```

## Resultat
- Ranglisten vises 20px højere på desktop
- Kun top 3 brugere vises i den kompakte visning
- "Vis alle" knap åbner et overlay med hele listen (op til 10)
- Overlayet matcher det egyptiske tema med amber/guld farver

## Filer der ændres
- `src/pages/SlotMachine.tsx`
- `src/components/slots/SlotLeaderboard.tsx`

