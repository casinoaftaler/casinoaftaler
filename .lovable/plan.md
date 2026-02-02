
# Fejlrettelse: Ekspanderende Symbol Udvider Fejlagtigt

## Problem
Under bonusrunder udvider det ekspanderende symbol sig på hjulene, selvom der kun er ét af symbolet på skærmen, og det ikke er del af gevinstkombinationen. 

Dette sker fordi koden tjekker om **nogen** gevinstlinje vinder efter udvidelse, men verificerer ikke at det **ekspanderende symbol selv** er del af gevinsten.

## Årsag
I `checkIfExpandingCreatesPaylineWin()` funktionen:
1. Koden skaber en hypotetisk udvidet grid
2. Den tjekker derefter hver gevinstlinje for gevinster
3. **Fejlen:** Den bruger det første ikke-wild symbol som base - dette kan være ETHVERT symbol, ikke nødvendigvis det ekspanderende symbol
4. Så hvis der er 3+ af samme symbol på en linje (f.eks. A, A, A), returnerer funktionen `true` selvom det ekspanderende symbol ikke bidrog til gevinsten

## Løsning
Ret `checkIfExpandingCreatesPaylineWin()` funktionen til kun at returnere `true` hvis det ekspanderende symbol faktisk er del af gevinstkombinationen.

### Ændringer i `src/lib/bonusGameLogic.ts`

Ret logikken (linjer 64-113) til at:

1. For hvert hjul med det ekspanderende symbol, tjek om det er blandt de første N positioner på en gevinstlinje hvor N er antallet af sammenhængende matches
2. Kun tæl som gevinst hvis det ekspanderende symbol er base-symbolet for linjen

```text
NUVÆRENDE LOGIK (forkert):
- Tjek om NOGEN kombination vinder på den udvidede grid
- Returnér true hvis 3+ symboler matcher fra venstre

NY LOGIK (korrekt):
- Tjek kun om det EKSPANDERENDE SYMBOL selv skaber en gevinst
- Base-symbolet skal være det ekspanderende symbol
- Tæl kun sammenhængende matches af det ekspanderende symbol
```

---

## Tekniske Detaljer

### Fil: `src/lib/bonusGameLogic.ts`

**Funktion `checkIfExpandingCreatesPaylineWin` (linje 64-113):**

Erstat den nuværende logik med:
- Sæt `baseSymbol` til `expandingSymbol` i stedet for at finde det første ikke-wild symbol
- Tjek kun om det ekspanderende symbol skaber sammenhængende matches fra venstre
- Returner kun `true` hvis det ekspanderende symbol matcher 3+ gange i træk fra venstre

Specifik ændring:
```typescript
// NUVÆRENDE (forkert - linje 87-92):
let baseSymbol = lineSymbols.find(s => s && !s.is_wild);
if (!baseSymbol) {
  baseSymbol = lineSymbols[0];
}

// NY (korrekt):
// For expanding symbol check, we ONLY care about wins 
// where the expanding symbol is the base
const baseSymbol = symbolsById.get(expandingSymbol.id);
if (!baseSymbol) continue;
```

Og opdater match-logikken (linje 94-106):
```typescript
// NUVÆRENDE (forkert):
const isMatch = symbol.id === baseSymbol?.id;

// NY (korrekt - kun ekspanderende symbol eller wild tæller):
const isMatch = symbol?.id === expandingSymbol.id || symbol?.is_wild;
```

Dette sikrer at:
- Udvidelse kun sker hvis det ekspanderende symbol selv bidrager til en gevinst
- Andre gevinstkombinationer (A, A, A osv.) ikke udløser forkert udvidelse

