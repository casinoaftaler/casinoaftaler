
# Plan: Skjul/Vis Rangliste på Mobil

## Oversigt
Tilføj en toggle-knap på mobil/tablet der gør det muligt at skjule ranglisten, så spillemaskinen får mere plads på skærmen.

## Design

```text
┌──────────────────────────┐
│    Spillemaskine         │
│                          │
├──────────────────────────┤
│   🏆 Vis rangliste ▼     │  ← Toggle knap (når skjult)
└──────────────────────────┘

┌──────────────────────────┐
│    Spillemaskine         │
│                          │
├──────────────────────────┤
│   🏆 Skjul rangliste ▲   │  ← Toggle knap (når synlig)
├──────────────────────────┤
│   [Rangliste indhold]    │
└──────────────────────────┘
```

## Funktionalitet
- Toggle-knap vises **kun på mobil/tablet** (under xl breakpoint)
- Standard: Ranglisten er **skjult** for at give plads til spillemaskinen
- Brugerens valg gemmes i `localStorage` så det huskes mellem besøg
- Desktop (xl+): Ranglisten forbliver altid synlig i sidepanelet

## Tekniske ændringer

### SlotMachine.tsx
1. Tilføj state: `showLeaderboard` (default: `false`)
2. Brug `localStorage` til at gemme/hente præference
3. Erstat den faste leaderboard-visning med en collapsible sektion:
   - Toggle-knap med ikon og tekst
   - Animeret åbne/lukke effekt

### UI-elementer
- **Knap stil**: Matcher egyptisk tema (amber farver, semi-transparent baggrund)
- **Ikon**: Trophy + ChevronDown/ChevronUp
- **Tekst**: "Vis rangliste" / "Skjul rangliste"

## Fil-ændringer

| Fil | Ændring |
|-----|---------|
| `src/pages/SlotMachine.tsx` | Tilføj toggle state, localStorage, og collapsible leaderboard UI |

## Kodestruktur

```typescript
// State med localStorage
const [showLeaderboard, setShowLeaderboard] = useState(() => {
  return localStorage.getItem('slot-show-leaderboard') === 'true';
});

// Toggle handler
const toggleLeaderboard = () => {
  const newValue = !showLeaderboard;
  setShowLeaderboard(newValue);
  localStorage.setItem('slot-show-leaderboard', String(newValue));
};
```

## Resultat
- Brugere på mobil kan skjule ranglisten for mere fokus på spillet
- Valget huskes mellem besøg
- Desktop-oplevelsen forbliver uændret
