

# Spillehal - Visuelt redesign

## Overblik

Spillehallen opgraderes med et flot hero-banner, forbedrede spilkort med animationer, og en mere immersiv visuel oplevelse der matcher det egyptiske/gyldne tema fra spillemaskinen.

## Hvad aendres

### 1. Hero-banner oeverst paa siden
Et fullwidth hero-banner med:
- Moerk gradient baggrund (lilla/blaa som resten af sitet)
- Dekorative floating blur-cirkler (samme moenster som HeroSection og ShopHero)
- Stort Gamepad2-ikon i en cirkel med glassmorphism
- "Spillehal" titel og undertekst
- Subtil animation paa de dekorative elementer

### 2. Opgraderede GameCard-kort
Spilkortene faar et visuelt loeft:
- Stoerre billedsektion med aspect-[16/9]
- Titel overlaid paa billedet i bunden (over gradienten) for et mere "cinematic" look
- Animeret shine-effekt paa hover (bruger eksisterende `shine` keyframe)
- Smoother scale-transition paa billedet ved hover
- "POPULAER" badge paa aktive spil
- Forbedret "Kommer snart" overlay med blur-effekt
- Staggered fade-in animation naar kortene loader (hvert kort faar en lille forsinkelse)

### 3. Forbedret sidebaggrund
- Stærkere radial gradient fra toppen (amber glow)
- Ekstra dekorativ gradient for dybde

### 4. Login-prompten
- Matcher det nye hero-design med gradient baggrund
- Mere visuelt tiltalende layout

## Teknisk plan

### Fil 1: `src/pages/GameLibrary.tsx`
- Erstat den simple header-sektion med en dedikeret `GameLibraryHero` komponent (inline)
- Hero bruger samme gradient-stil som ShopHero (`linear-gradient(135deg, ...)`)
- Floating dekorative cirkler med blur
- Tilfoej staggered animation via inline `style={{ animationDelay }}` paa hvert GameCard
- Wrap hvert kort i en div med `animate-fade-in` og forsinkelse baseret paa index
- Opdater PageBackground med staerkere gradient

### Fil 2: `src/components/games/GameCard.tsx`
- Redesign kort-layoutet:
  - Billedet fylder hele kortet (ingen separat content-sektion under)
  - Titel og beskrivelse overlaid i bunden med gradient overlay
  - Shine-effekt element (et absolut positioneret div der animerer paa hover)
  - "POPULAER" badge oeverst til hoejre paa aktive spil (ny prop: `badge?: string`)
  - Forstorret hover-effekt paa hele kortet (`hover:scale-[1.02]`)
  - Knappen placeres i bunden af overlay-omraadet
  - "Kommer snart" bruger backdrop-blur og mere elegant overlay
- Opdater GameCardProps med valgfri `badge` prop

### Ingen database-aendringer
Rent frontend-aendring.

## Resultat
En visuelt flot spillehal med hero-banner, animerede spilkort med shine-effekter og staggered indlaedsning, der matcher det premium casino-tema fra resten af sitet.

