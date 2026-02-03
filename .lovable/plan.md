
# Plan: Tilføj Rarity System til Symboler

## Oversigt
Tilføjer et sjældenhedssystem til slot-symbolerne hvor:
- **Premium** (sjældne): Pharaoh (mest sjælden), Anubis, Horus, Scarab
- **Common** (almindelige): A, K, Q, J, 10
- **Scatter**: Beholder sin nuværende ekstremt sjældne vægt

---

## Database Ændring

### Ny kolonne i `slot_symbols` tabel

Tilføj en `rarity` kolonne med enum-værdier:

```sql
-- Tilføj rarity kolonne
ALTER TABLE slot_symbols 
ADD COLUMN rarity text NOT NULL DEFAULT 'common' 
CHECK (rarity IN ('premium', 'common', 'scatter'));

-- Opdater eksisterende symboler med deres rarity
UPDATE slot_symbols SET rarity = 'premium' WHERE name = 'Pharaoh';
UPDATE slot_symbols SET rarity = 'premium' WHERE name = 'Anubis';
UPDATE slot_symbols SET rarity = 'premium' WHERE name = 'Horus';
UPDATE slot_symbols SET rarity = 'premium' WHERE name = 'Scarab';
UPDATE slot_symbols SET rarity = 'scatter' WHERE is_scatter = true;
-- Resten forbliver 'common' (default)
```

---

## Kodeændringer

### 1. `src/lib/slotGameLogic.ts`

Opdater `SYMBOL_WEIGHTS` med justerede vægte:

| Symbol | Nuværende | Ny Vægt | Rarity |
|--------|-----------|---------|--------|
| Pharaoh | 8 | 5 | Premium (mest sjælden) |
| Anubis | 12 | 8 | Premium |
| Horus | 15 | 12 | Premium |
| Scarab | 20 | 15 | Premium |
| A | 30 | 40 | Common |
| K | 35 | 45 | Common |
| Q | 40 | 50 | Common |
| J | - | 55 | Common |
| 10 | - | 60 | Common |
| Book | 1 | 1 | Scatter (uændret) |

Tilføj også rarity-hjælpefunktioner:

```typescript
export type SymbolRarity = 'premium' | 'common' | 'scatter';

export const RARITY_COLORS: Record<SymbolRarity, string> = {
  premium: 'text-amber-400',
  common: 'text-gray-400',
  scatter: 'text-purple-400'
};

export const RARITY_LABELS: Record<SymbolRarity, string> = {
  premium: 'Premium',
  common: 'Almindelig',
  scatter: 'Scatter'
};
```

### 2. `src/integrations/supabase/types.ts`

Tilføj `rarity` felt til `slot_symbols` interface (auto-genereret efter migration).

### 3. `src/components/slots/PayTable.tsx`

Opdater gevinsttabellen til at vise rarity med farve-kodning:

```tsx
// Gruppér symboler efter rarity
const premiumSymbols = symbols?.filter(s => s.rarity === 'premium');
const commonSymbols = symbols?.filter(s => s.rarity === 'common');
const scatterSymbol = symbols?.find(s => s.is_scatter);

// Vis med rarity badge
<span className={cn(
  "text-xs px-1 rounded",
  symbol.rarity === 'premium' && "bg-amber-500/20 text-amber-400",
  symbol.rarity === 'common' && "bg-gray-500/20 text-gray-400",
  symbol.rarity === 'scatter' && "bg-purple-500/20 text-purple-400"
)}>
  {RARITY_LABELS[symbol.rarity]}
</span>
```

---

## Visuelt Resultat i Gevinsttabellen

```text
┌─────────────────────────────────────────────────┐
│  GEVINSTTABEL                                   │
├─────────────────────────────────────────────────┤
│  🏆 PREMIUM SYMBOLER                            │
│  ┌──────────────────────────────────────────┐   │
│  │ 👑 Pharaoh [Premium]   30×  100×  500×   │   │
│  │ 🐺 Anubis [Premium]    20×   60×  200×   │   │
│  │ 🦅 Horus [Premium]     15×   40×  125×   │   │
│  │ 🪲 Scarab [Premium]    10×   30×  100×   │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  📝 ALMINDELIGE SYMBOLER                        │
│  ┌──────────────────────────────────────────┐   │
│  │ A [Almindelig]          5×   10×   40×   │   │
│  │ K [Almindelig]          5×   10×   30×   │   │
│  │ Q [Almindelig]          5×   10×   25×   │   │
│  │ J [Almindelig]          5×   15×   50×   │   │
│  │ 10 [Almindelig]        10×   25×   75×   │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  ✨ SCATTER                                     │
│  ┌──────────────────────────────────────────┐   │
│  │ 📖 Fedesvins Book [Wild/Scatter]         │   │
│  │     2×   20×  200× + Bonus Spins!        │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| Database | Migration: Tilføj `rarity` kolonne |
| `src/lib/slotGameLogic.ts` | Opdater SYMBOL_WEIGHTS, tilføj rarity typer og farver |
| `src/components/slots/PayTable.tsx` | Vis symboler grupperet efter rarity med farve-kodning |

---

## Tekniske Detaljer

### Sandsynlighedsfordeling efter ændringer:

| Rarity | Symboler | Total Vægt | Ca. Sandsynlighed |
|--------|----------|------------|-------------------|
| Premium | 4 stk | 40 (5+8+12+15) | ~13% |
| Common | 5 stk | 250 (40+45+50+55+60) | ~86% |
| Scatter | 1 stk | 1 | ~0.3% |

Dette giver premium symboler en væsentligt lavere frekvens, hvilket matcher deres højere udbetalinger.
