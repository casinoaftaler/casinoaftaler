
# Stor Rund Spin-Knap med Guld-Tema

## Oversigt
Omdesign spin-knappen til at være en stor, rund knap centreret under spillemaskinen, der matcher det gyldne egyptiske tema.

## Nuværende Design
- Rektangulær knap på samme linje som bet-kontroller og autospin
- Størrelse: `px-4 sm:px-8 py-3 sm:py-5`
- Gradient: `from-amber-500 to-amber-600`
- Placering: Inline med andre kontroller i en flex-row

## Nyt Design

### Visuel Stil
- **Form**: Perfekt cirkel (`rounded-full`)
- **Størrelse**: 80px på mobil, 96px på tablet, 120px på desktop
- **Gradient**: Radialt guld-gradient med 3D-effekt (lysere i midten)
- **Border**: Tynd guld-kant for ekstra definition
- **Skygge**: Dyb amber glow-effekt
- **Ikon**: Stort Gamepad2 eller Play-ikon centreret

### Interaktive Effekter
- **Hover**: Lysere gradient + større glow + subtle scale-up
- **Active/Press**: Inward shadow for 3D-tryk effekt
- **Spinning**: Pulserende glow-animation + Loader-ikon
- **Disabled**: Dæmpet farve + ingen glow

### Layout-ændring
Reorganiser kontrollinjen:
```
[Bet Controls] | [Autospin] | [Win Display] | [Volume]
                    ↓
            [ 🎰 STOR RUND SPIN ]
```

---

## Tekniske Detaljer

### Fil: `src/components/slots/SlotGame.tsx`

**Opdater kontrolsektionen (linje 573-688):**

1. Fjern spin-knappen fra den inline flex-row
2. Opret ny centreret sektion til spin-knappen under andre kontroller
3. Opdater knappens styling til rund form med guld-tema

**Ny spin-knap styling:**
```typescript
<Button
  className={cn(
    // Rund form
    "rounded-full aspect-square",
    // Responsive størrelse
    "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
    // Guld-gradient med 3D-effekt
    bonusState.isActive
      ? "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700"
      : "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700",
    // Guld border
    "border-2 border-amber-400/60",
    // Dyb glow-skygge
    bonusState.isActive
      ? "shadow-[0_0_30px_rgba(168,85,247,0.5),0_4px_20px_rgba(0,0,0,0.3)]"
      : "shadow-[0_0_30px_rgba(251,191,36,0.5),0_4px_20px_rgba(0,0,0,0.3)]",
    // Hover effekter
    "hover:shadow-[0_0_50px_rgba(251,191,36,0.7),0_6px_25px_rgba(0,0,0,0.4)]",
    "hover:scale-105 transition-all duration-200",
    // Active/tryk effekt
    "active:scale-95 active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]",
    // Tekst
    "text-white font-bold text-lg sm:text-xl"
  )}
/>
```

**Opdateret layout-struktur:**
```text
{/* Kontrol-række UDEN spin-knap */}
<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
  <BetControls ... />
  <AutospinControls ... />
  <WinDisplay ... />
  <VolumeControl />
</div>

{/* Centreret stor spin-knap */}
<div className="flex justify-center my-3 sm:my-4">
  <Button className="...rund guld knap..." />
</div>
```

**Spinning-tilstand animation:**
- Tilføj pulserende glow-animation under spinning
- Brug `animate-pulse` eller custom keyframe
- Vis Loader2-ikon centreret i cirklen

---

## Forventede Ændringer

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Flyt spin-knap til egen centreret sektion, opdater til rund form med guld-gradient og glow-effekter |

## Visuelt Resultat
```
     ┌─────────────────────────────────────┐
     │       [Bet] [Auto] [Win] [🔊]       │
     └─────────────────────────────────────┘
                      ↓
              ╭─────────────╮
              │             │
              │     🎰      │  ← Stor rund guld knap
              │    SPIN     │     med glow-effekt
              │             │
              ╰─────────────╯
```
