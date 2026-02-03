
# Tilføj Intens Lyd og Visuel Effekt til Aktivt Tease-Hjul

## Oversigt
Når et tease-hjul aktivt bremser ned (skifter fra fake loop til 3-sekunders nedbremsning), tilføjes en mere dramatisk lyd og visuel effekt for at fremhæve spændingen.

## Nuværende Implementation
- **Lyd**: Der spilles en generel `playTeaseStart()` lyd med heartbeat og drone når tease-mode starter, men ingen specifik lyd når hvert hjul aktivt bremser ned
- **Visuel**: Tease-hjul har en amber glow og pulse-animation, men den samme effekt bruges til både fake-looping og aktivt bremsende hjul

## Nye Effekter

### Lyd: `playActiveTeaseSlowdown()`
- **Stigende crescendo**: En intens opbyggende lyd der crescendoer over nedbremsningsperioden
- **Accelererende trommer**: Egyptisk darbuka-rytme der starter langsomt og accelererer
- **Dramatisk drone**: Stigende pitch for at bygge spænding
- **Metallisk shimmer**: Sistrum-lignende raslen der intensiveres

### Visuel: Forbedret Glow-Effekt
- **Intensere glow**: Større, lysere amber glow specifikt for det aktive tease-hjul
- **Pulserende border**: Animeret kant der pulserer hurtigere end fake-looping hjul
- **Partikler/gnister**: Subtile amber partikler omkring det aktive hjul
- **Differentier visuelt**: Fake-looping hjul har dæmpet glow, aktivt hjul har intens glow

---

## Tekniske Detaljer

### Fil: `src/lib/slotSoundEffects.ts`

**Ny metode `playActiveTeaseSlowdown()` (tilføjes efter linje 1130):**

```text
playActiveTeaseSlowdown(reelIndex: number): () => void {
  // Returnerer stop-funktion
  // Opretter accelererende drumroll med egyptisk tema
  // Stigende pitch drone over 3 sekunder
  // Intensiverende sistrum shimmer
}
```

Lyddesign:
- **Accelererende rytme**: Starter med 300ms interval, accelererer til 80ms
- **Stigende drone**: Starter på 80Hz, ramper op til 200Hz over 3 sekunder
- **Intensiverende shimmer**: Høje frekvenser (2500-4000Hz) der bliver stærkere
- **Pitch baseret på reel-index**: Senere hjul har højere basis-pitch for progression

### Fil: `src/components/slots/SlotReel.tsx`

**Opdater glow-effekten (linje 339-343):**

Nuværende:
```typescript
(isActiveTeaseReel || isFakeLooping) && spinState === "spinning" && 
"shadow-[0_0_20px_rgba(251,191,36,0.6),0_0_40px_rgba(251,191,36,0.3)] animate-pulse"
```

Ny differentieret effekt:
```typescript
// Fake looping: Dæmpet glow
isFakeLooping && !isActiveTeaseReel && spinState === "spinning" && 
"shadow-[0_0_15px_rgba(251,191,36,0.3),0_0_25px_rgba(251,191,36,0.15)] animate-pulse"

// Active tease: Intens glow med hurtigere animation
isActiveTeaseReel && spinState === "spinning" && 
"shadow-[0_0_30px_rgba(251,191,36,0.9),0_0_60px_rgba(251,191,36,0.6),0_0_90px_rgba(251,191,36,0.3)] 
 animate-[glow-intense_0.5s_ease-in-out_infinite]"
```

**Tilføj lyd-hook ved aktiv tease-start (linje 198-250):**

```text
// Når isActiveTeaseReel bliver true:
// 1. Start playActiveTeaseSlowdown() lyd
// 2. Gem stop-funktion i ref
// 3. Stop lyden i cleanup eller når animation slutter
```

### Fil: `src/index.css`

**Tilføj ny keyframe animation (efter eksisterende glow animation):**

```text
@keyframes glow-intense {
  0%, 100% {
    box-shadow: 
      0 0 30px rgba(251,191,36,0.9),
      0 0 60px rgba(251,191,36,0.6),
      0 0 90px rgba(251,191,36,0.3);
  }
  50% {
    box-shadow: 
      0 0 40px rgba(251,191,36,1),
      0 0 80px rgba(251,191,36,0.8),
      0 0 120px rgba(251,191,36,0.5);
  }
}
```

### Fil: `src/components/slots/SlotGame.tsx`

**Tilføj lyd-trigger for aktivt tease (opdater handleReelStop callback):**

Når det næste tease-hjul aktiveres, start den nye lyd:
```text
// I handleReelStop callback:
// Når et tease-hjul aktiveres, spil playActiveTeaseSlowdown(reelIndex)
```

---

## Flow

```text
Spin Start
    │
    ├── Hjul 1-2 stopper normalt
    │
    └── Hjul 3 er første tease-hjul
            │
            ├── Fake-looping (dæmpet glow)
            │
            └── Bliver aktivt når Hjul 2 stopper
                    │
                    ├── Intens glow aktiveres
                    ├── playActiveTeaseSlowdown() starter
                    │
                    └── 3 sekunders nedbremsning
                            │
                            └── Hjul 3 stopper → Hjul 4 bliver aktivt → Gentag
```

---

## Forventede Ændringer

| Fil | Ændring |
|-----|---------|
| `src/lib/slotSoundEffects.ts` | Tilføj `playActiveTeaseSlowdown()` metode med accelererende lyd |
| `src/components/slots/SlotReel.tsx` | Differentiér glow for fake-loop vs aktiv tease, tilføj lyd-hook |
| `src/index.css` | Tilføj `glow-intense` keyframe animation |
| `src/components/slots/SlotGame.tsx` | Trigger lyd når tease-hjul aktiveres |

## Test Scenarier
- Spin med 2+ scatters på de første 3 hjul
- Verificer at fake-looping hjul har dæmpet glow
- Verificer at det aktive tease-hjul har intens glow når det bremser
- Lyt efter den accelererende lyd under nedbremsning
- Tjek at lyden stopper når hjulet lander
