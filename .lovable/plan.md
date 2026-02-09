

## Fix: Retrigger Symbol Picker + Sekventiel Expansion Animation

### Problem 1: Retrigger viser gammelt symbol
Nar en retrigger sker i Rise of Fedesvin, viser overlayet det FORRIGE expanding symbol i stedet for det NYE. Det skyldes at `bonusState.expandingSymbols` ikke opdateres for overlayet lukkes (det er bevidst forsinket), men overlayet bruger `bonusState.expandingSymbols[last]` som `newRetriggerSymbol`.

**Losning:** Gem det nye retrigger-symbol fra serverresponsen i en dedikeret state-variabel (`pendingRetriggerSymbol`), og brug det i retrigger-overlayet. Serveren returnerer allerede `expandingSymbolIds` med det nye symbol tilfojet sidst - vi kan udlede det nye symbol derfra.

### Problem 2: Retrigger mangler symbol-picker animation
Ved retrigger vises bare et statisk symbol. Det skal bruge samme roulette-animation som ved bonus-trigger (BonusSymbolPicker).

**Losning:** Gendan retrigger-overlayet til at bruge `BonusSymbolPicker`-komponenten med det nye symbol som `selectedSymbol`. Overlayet far samme opbygning som trigger-overlayet men med "RETRIGGER!" tekst og "+10 GRATIS SPINS".

### Problem 3: Duplikerede expanding symbols
Der er ingen klient-side validering mod at vise et allerede valgt symbol i pickeren.

**Losning:** Tilfoej en `excludeSymbolIds` prop til `BonusSymbolPicker` sa allerede aktive expanding symbols filtreres fra i animationen. Serveren haandterer allerede dette (linje 688-689 i slot-spin), men animationen skal matche.

### Problem 4: Sekventiel expansion ved multiple gevinster
Nar fx J og K begge ekspanderer, ser det rodet ud fordi animationerne overlapper. 

**Losning:** Denne logik er allerede implementeret i `SlotGame.tsx` linje 794-836 (sekventiel expansion med `expandingWinGroups`). Problemet er sandsynligvis at der mangler en delay mellem unexpand og naeste expand. Delayet pa linje 835 er kun 300ms - det oges til 500ms for en tydeligere overgang. Desuden tilfojes en kort "flash" effekt nar et nyt symbol begynder at ekspandere.

---

### Tekniske AEndringer

**1. `src/components/slots/SlotGame.tsx`**
- Tilfoej ny state: `pendingRetriggerSymbol` (SlotSymbol | null)
- Nar serveren returnerer en retrigger med `expandingSymbolIds`, find det nye symbol (sidste element i arrayet) og gem det i `pendingRetriggerSymbol`
- Send `pendingRetriggerSymbol` som `newRetriggerSymbol` til retrigger-overlayet i stedet for `bonusState.expandingSymbols[last]`
- Send nuvaerende expanding symbol IDs som `excludeSymbolIds` til overlayet
- Nulstil `pendingRetriggerSymbol` nar retrigger-overlay lukkes
- Oeg delay mellem sekventielle expansion-grupper fra 300ms til 500ms

**2. `src/components/slots/BonusOverlay.tsx`**
- AEndr retrigger-typen til at bruge `BonusSymbolPicker` med roulette-animation (ligesom trigger)
- Tilfoej `excludeSymbolIds` prop der videregives til `BonusSymbolPicker`
- Vis "RETRIGGER!" titel og "+10 GRATIS SPINS!" tekst
- Knaptekst aendres til "FORTSAET FREE SPINS" i stedet for "START FREE SPINS"

**3. `src/components/slots/BonusSymbolPicker.tsx`**
- Tilfoej `excludeSymbolIds?: string[]` prop
- Filtrer eligible symbols sa allerede aktive expanding symbols ikke kan vises i animationen
- Tilfoej `buttonText?: string` prop sa knapteksten kan tilpasses (default: "START FREE SPINS")
