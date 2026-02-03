
## Plan: Tilføj loading screen og introduktionsbillede til spillemaskinen

### Oversigt
Når brugere besøger spillemaskinens side, vil de nu se:
1. **Loading screen** - Med titel-billedet øverst og en animeret loading bar
2. **Introduktionsbillede** - Det uploadede billede vises efter loading, og brugeren skal klikke "FORTSÆT" for at se spillemaskinen

### Flow
```text
┌─────────────────────────────────────────┐
│         LOADING SCREEN                  │
│                                         │
│    [Book of Fedesvin Title Art]         │
│                                         │
│    ████████░░░░░░░░░░░  45%            │
│    "Indlæser spillemaskine..."          │
│                                         │
└─────────────────────────────────────────┘
                   ↓
                   ↓ (efter ~2-3 sek)
                   ↓
┌─────────────────────────────────────────┐
│       INTRODUKTIONSBILLEDE              │
│                                         │
│    [Det uploadede intro-billede]        │
│                                         │
│         [ FORTSÆT KNAP ]                │
│                                         │
└─────────────────────────────────────────┘
                   ↓
                   ↓ (bruger klikker)
                   ↓
┌─────────────────────────────────────────┐
│        SPILLEMASKINEN                   │
│   (den normale slot machine visning)    │
└─────────────────────────────────────────┘
```

---

### Tekniske ændringer

**1. Kopiér intro-billedet til projektet**
- Placering: `src/assets/slots/slot-intro-screen.jpg`

**2. Ny komponent: `src/components/slots/SlotLoadingScreen.tsx`**
- Viser titel-billedet centreret øverst
- Animeret progress bar med egyptisk styling (guld/amber farver)
- Loading tekst: "Indlæser spillemaskine..."
- Simuleret loading progress over ca. 2-3 sekunder
- Callback når loading er færdig

**3. Ny komponent: `src/components/slots/SlotIntroScreen.tsx`**
- Viser det uploadede intro-billede i fuld størrelse (responsivt)
- "FORTSÆT" knap i egyptisk stil (guld gradient)
- Callback når bruger klikker for at fortsætte
- Subtil fade-in animation

**4. Opdater `src/pages/SlotMachine.tsx`**
- Tilføj tre nye states:
  - `loadingPhase`: "loading" | "intro" | "ready"
- Vis `SlotLoadingScreen` når `loadingPhase === "loading"`
- Vis `SlotIntroScreen` når `loadingPhase === "intro"`
- Vis den normale spillemaskine kun når `loadingPhase === "ready"`
- Session persistence: Gem i sessionStorage så brugeren ikke ser loading igen ved navigation tilbage

**5. CSS animationer i `src/index.css`**
- `@keyframes loading-progress` - Animerer progress baren
- `@keyframes intro-fade-in` - Fade-in for intro screen

---

### Brugeroplevelse
- Loading tager ca. 2-3 sekunder med en smooth progress animation
- Intro-billedet vises derefter med en fade-in effekt
- Brugeren skal aktivt klikke "FORTSÆT" for at se spillemaskinen
- Ved navigation tilbage til siden (i samme session) springes loading/intro over
