

# Spilbibliotek - Redesign af Slot-siden

## Overblik

Den nuvaerende `/community/slots` side viser direkte "Book of Fedesvin" spillemaskinen. Vi omdanner denne side til et **spilbibliotek** (game library), hvor brugere kan se og vaelge mellem flere spil. "Book of Fedesvin" bliver det foerste spil i biblioteket, og det faktiske gameplay flyttes til en ny underside.

## Brugeroplevelse

1. **Bibliotekssiden** (`/community/slots`) - En flot oversigtside der viser alle tilgaengelige spil som kort/tiles
   - Hvert spil vises med et preview-billede, titel og kort beskrivelse
   - "Book of Fedesvin" er det foerste (og foreloebig eneste) spil
   - Designet matcher det eksisterende egyptiske/gyldne tema
   - Et "Kommer snart"-kort vises for fremtidige spil (placeholder)
   - Krav om login gaelder stadig - uloggede brugere ser login-prompten

2. **Spilsiden** (`/community/slots/book-of-fedesvin`) - Den nuvaerende spillemaskine flyttes hertil
   - Al eksisterende funktionalitet bevares 100% (loading screen, intro, gameplay, leaderboard, osv.)
   - En "Tilbage til spil"-knap tilfojes oeverst saa brugere nemt kan vende tilbage til biblioteket

## Teknisk plan

### 1. Ny side: `src/pages/GameLibrary.tsx`
- Opretter en ny side der fungerer som spilbiblioteket
- Viser spilkort i et responsivt grid
- Login-gating fra den nuvaerende `SlotMachine.tsx` flyttes hertil
- Baggrund med mork gradient (lignende det nuvaerende slot-tema)
- Hvert spilkort inkluderer: thumbnail, titel, beskrivelse, og "Spil nu"-knap

### 2. Ny komponent: `src/components/games/GameCard.tsx`
- Et genbrugeligt kort-komponent til hvert spil
- Props: titel, billede, beskrivelse, link, status (aktiv/kommer snart)
- Hover-effekter og animationer der matcher det gyldne tema
- "Kommer snart" varianten viser en nedtonet version med badge

### 3. Opdater routing i `src/App.tsx`
- `/community/slots` peger nu paa `GameLibrary`
- `/community/slots/book-of-fedesvin` peger paa `SlotMachine` (den nuvaerende spillemaskine)
- Begge lazy-loaded med Suspense fallbacks

### 4. Opdater `src/pages/SlotMachine.tsx`
- Tilfoej en "Tilbage"-knap der linker til `/community/slots`
- Al eksisterende logik og funktionalitet forbliver uaendret

### 5. Opdater `src/components/Layout.tsx`
- Udvid footer-hide logikken til ogsaa at gaelder `/community/slots/book-of-fedesvin`
- Brug `startsWith` i stedet for eksakt match

### 6. Opdater navigation i `src/components/Header.tsx`
- Community dropdown-links peger stadig paa `/community/slots` (som nu er biblioteket)
- Eventuelt opdater teksten fra "Slot Machine" til "Spil" eller "Spillehal"

## Ingen database-aendringer
- Denne aendring er rent frontend - ingen nye tabeller eller migrationer nødvendige
- Al eksisterende slot-data og funktionalitet forbliver intakt

## Fremtidig skalerbarhed
Denne struktur goer det nemt at tilfoeje nye spil i fremtiden:
- Tilfoej et nyt spilkort i `GameLibrary.tsx`
- Opret en ny side under `/community/slots/[spil-navn]`
- Hvert spil kan have sin egen logik, symboler og tema

