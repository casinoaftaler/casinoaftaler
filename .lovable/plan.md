
# Centrér Spin-Knappen Under Spillemaskinen

## Oversigt
Spin-knappen skal centreres direkte under spillemaskinens runde spin-cirkel på alle skærmstørrelser, i stedet for at være højre-justeret på desktop.

## Nuværende Layout
- Spin-knappen bruger `flex justify-center md:justify-end` 
- På desktop flyttes knappen til højre side med `md:pr-8 lg:pr-16` padding
- Dette gør at knappen ikke er alignet med spillemaskinens centrum

## Nyt Layout
- Spin-knappen skal bruge `flex justify-center` på alle skærmstørrelser
- Fjern padding til højre (`md:pr-8 lg:pr-16`)
- Knappen vil nu være perfekt centreret under slot-rammen

---

## Tekniske Detaljer

### Fil: `src/components/slots/SlotGame.tsx`

**Linje 684 - Opdater spin-knap container:**

Fra:
```typescript
<div className="flex justify-center md:justify-end my-3 sm:my-4 md:pr-8 lg:pr-16">
```

Til:
```typescript
<div className="flex justify-center my-3 sm:my-4">
```

---

## Forventede Ændringer

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Ændre spin-knap container fra højre-justeret til centreret |

## Visuelt Resultat
```
          ╔═══════════════════════════════════╗
          ║                                   ║
          ║      [  SPILLEMASKINE REELS  ]    ║
          ║                                   ║
          ╚═══════════════════════════════════╝
                    
             [Bet] [Auto] [Win] [🔊]
                         
                  ╭─────────────╮
                  │             │
                  │     🎰      │  ← Perfekt centreret
                  │    SPIN     │     under maskinen
                  │             │
                  ╰─────────────╯
```
