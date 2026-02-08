
# Rise of Fedesvin - Nyt spil med multi-expanding bonus

## Overblik

Tilfoej et helt nyt spil "Rise of Fedesvin" til spillehallen med Merlin/drage-tema, nye symboler og en unik bonus-mekanik: ved retrigger faar spilleren et ekstra expanding symbol (i stedet for bare flere spins). Spins deles paa tvaers af spil, og leaderboardet er faelles.

Pga. omfanget af denne feature anbefales det at implementere i **flere faser** over flere beskeder.

---

## Fase 1: Database-aendringer

Tilfoej `game_id` kolonne til de relevante tabeller saa systemet kan skelne mellem spil.

### Nye kolonner

**`slot_symbols`**: Tilfoej `game_id text NOT NULL DEFAULT 'book-of-fedesvin'`
- Eksisterende symboler faar automatisk `game_id = 'book-of-fedesvin'`
- Nye Merlin-symboler indsaettes med `game_id = 'rise-of-fedesvin'`

**`slot_bonus_state`**: Tilfoej:
- `game_id text NOT NULL DEFAULT 'book-of-fedesvin'`
- `expanding_symbol_ids uuid[] DEFAULT '{}'` (array af flere expanding symboler)
- `expanding_symbol_names text[] DEFAULT '{}'` (navne paa expanding symboler)

**`slot_game_results`**: Tilfoej `game_id text NOT NULL DEFAULT 'book-of-fedesvin'`

### Nye symboler (Rise of Fedesvin - Merlin-tema)

10 symboler indsaettes i databasen med `game_id = 'rise-of-fedesvin'`:

**Premium (4 stk):**
- **Merlin** - Troldmand, hoejeste multipliers (rarity: premium, weight: 20)
- **Dragon** - Ildspyende drage (rarity: premium, weight: 25)
- **Phoenix** - Genfodt fugl (rarity: premium, weight: 30)
- **Crystal Ball** - Magisk krystalkugle (rarity: premium, weight: 30)

**Common (5 stk):**
- **A, K, Q, J, 10** - Samme kort-symboler men med mystisk/magisk tema (rarity: common, weight: 55-65)

**Scatter/Wild (1 stk):**
- **Spell Book** - Magisk trolddomsbog, scatter + wild (rarity: scatter, weight: 20)

Multipliers kopieres fra Book of Fedesvin som udgangspunkt. Billederne genereres via AI i admin-panelet efter oprettelse.

---

## Fase 2: Backend - Opdater slot-spin Edge Function

Opdater `supabase/functions/slot-spin/index.ts` til at:

### Modtag `gameId` parameter
- Tilfoej `gameId` til request body (default: `'book-of-fedesvin'`)
- Filtrer symboler med `.eq('game_id', gameId)`

### Multi-expanding symbol logik (Rise of Fedesvin)
Naar `gameId === 'rise-of-fedesvin'`:

**Bonus trigger (foerste gang):**
- Vaelg 1 expanding symbol (praecis som nu)
- Gem i baade `expanding_symbol_id` (bagudkompatibelt) og `expanding_symbol_ids` array

**Retrigger:**
- Vaelg et NYT symbol (som ikke allerede er i `expanding_symbol_ids`)
- Tilfoej det til `expanding_symbol_ids` arrayet
- +10 free spins (som nu)
- Det nye symbol er OGSAA expanding fra nu af

**Bonus spin med flere expanding symbols:**
- Tjek hvert expanding symbol i gridet
- Expander ALLE tromler der indeholder MINDST ET af de expanding symboler
- Beregn gevinster baseret paa det udvidede grid

### Book of Fedesvin
- Ingen aendringer i logikken - fungerer praecis som foer
- Bruger stadig det eksisterende `expanding_symbol_id` felt

---

## Fase 3: Frontend Hooks

### `useSlotSymbols.ts`
- Tilfoej `gameId` parameter: `useSlotSymbols(gameId: string = 'book-of-fedesvin')`
- Filtrer med `.eq('game_id', gameId)`

### `useServerSpin.ts`
- Tilfoej `gameId` til spin request body
- Send `gameId` med i `supabase.functions.invoke("slot-spin", { body: { ... gameId } })`

### `useBonusGameSync.ts`
- Tilfoej `gameId` parameter
- Filtrer `slot_bonus_state` med `game_id`
- Understot `expanding_symbol_ids` array (flere expanding symboler)
- Returnerer `expandingSymbols: SlotSymbol[]` (array i stedet for enkelt symbol)

### `useSlotLeaderboard.ts`
- Ingen aendringer (leaderboard er faelles paa tvaers af spil)

### `useSlotSpins.ts`
- Ingen aendringer (spins deles paa tvaers af spil)

---

## Fase 4: Frontend - Ny spilside

### `src/pages/RiseOfFedesvin.tsx` (Nyt)
- Kopi af `SlotMachine.tsx` med foelgende forskelle:
  - `gameId = 'rise-of-fedesvin'` sendes til alle hooks
  - Nyt baggrundsbillede (mystisk/magisk tema - kan genbruge default midlertidigt)
  - Ny titel "Rise of Fedesvin"
  - Tilbageknap peger paa `/community/slots`

### `src/components/slots/SlotGameRise.tsx` (Nyt)
- Variant af `SlotGame.tsx` med multi-expanding symbol support
- Understotter `expandingSymbols` (array) i stedet for enkelt symbol
- Viser den horisontale symbolbar i bonus-modus

### Routing i `App.tsx`
- Tilfoej: `/community/slots/rise-of-fedesvin` -> `RiseOfFedesvin`

### Opdater `GameLibrary.tsx`
- Tilfoej nyt spilkort for "Rise of Fedesvin" med passende beskrivelse og badge

---

## Fase 5: Bonus Symbol Bar (Ny komponent)

### `src/components/slots/BonusSymbolBar.tsx` (Nyt)
En horisontal bar der vises under/over tromlerne under bonus-runden:

- Viser ALLE spillets symboler i en raekke (undtagen scatter)
- Symboler der ER expanding: Fuldt farvelagt med gylden ramme/glow
- Symboler der IKKE er expanding: Grayscale filter + reduceret opacity (0.3-0.4)
- Naar et nyt symbol bliver expanding (ved retrigger): Animeret overgang fra graa til farve
- Responsivt layout: Symboler skalerer med skaermstorrelse

Visuelt design:
```
[ Merlin* ] [ Dragon ] [ Phoenix ] [ Crystal ] [ A ] [ K ] [ Q ] [ J ] [ 10 ]
   glow       grey       grey        grey      grey  grey  grey  grey  grey
```
(* = expanding, fuldt farvelagt med gylden glow)

Ved retrigger: Dragon "oplaaeses" fra graa til fuld farve med animation.

---

## Fase 6: Opdater Bonus Overlays

### `BonusOverlay.tsx` - Retrigger for Rise of Fedesvin
- Ved retrigger: Vis det NYE expanding symbol der tilfoerjes
- Tekst: "NYT EXPANDING SYMBOL!" + symbolets navn og billede
- Symbol-picker animation korer igen for det nye symbol

### `BonusStatusBar.tsx` - Multi-symbol support
- Vis alle expanding symboler i raekke (ikke kun 1)
- F.eks. "Expanding: [Merlin] [Dragon]" med begge symbolers ikoner

### `BonusCompleteScreen.tsx`
- Vis alle expanding symboler der blev brugt i bonussen

---

## Fase 7: Admin Panel Separation

### `SlotMachineAdminSection.tsx`
Tilfoej et spil-vaelder oeoverst:

```
[ Book of Fedesvin ] [ Rise of Fedesvin ]
```

- Hvert spil har sine egne under-tabs (Symboler, Indstillinger, Statistik)
- Symboler-tabben filtrerer efter `game_id`
- Statistik filtrerer `slot_game_results` efter `game_id`

### Nye admin-features for Rise of Fedesvin
- Samme symbol-redigering som Book of Fedesvin
- AI-generering af symbolbilleder (genbruger eksisterende funktionalitet)
- Mulighed for at justere multipliers og vaegt per spil

---

## Implementeringsraekkefoelge

Pga. omfanget anbefales foelgende opdeling:

**Besked 1:** Database-migrationer + nye symboler (Fase 1)
**Besked 2:** Backend edge function opdatering (Fase 2)
**Besked 3:** Frontend hooks + ny spilside (Fase 3 + 4)
**Besked 4:** Bonus symbol bar + overlay opdateringer (Fase 5 + 6)
**Besked 5:** Admin panel separation (Fase 7)

---

## Ingen breaking changes

- Alle eksisterende data faar `game_id = 'book-of-fedesvin'` som default
- Book of Fedesvin fungerer 100% som foer
- Leaderboard og spins forbliver delt
- Edge function er bagudkompatibel (default gameId = 'book-of-fedesvin')
