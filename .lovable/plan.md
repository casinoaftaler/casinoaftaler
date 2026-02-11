
## Merge Casino Tilbud, Butik og Highlights til 1 tab

### Hvad bliver lavet
De tre separate admin-faner "Casino Tilbud", "Butik" og "Highlights" samles i en enkelt fane kaldet "Indhold" med interne sub-tabs til at skifte mellem de tre sektioner.

### Brugeroplevelse
- I stedet for 3 separate faner i top-navigationen, vises 1 fane: **"Indhold"** (med et passende ikon)
- Når man klikker på "Indhold", vises en sekundær tab-bar med 3 sub-tabs: **Casino Tilbud**, **Butik**, **Highlights**
- Alt eksisterende indhold og funktionalitet forbliver uændret -- det er kun navigationsstrukturen der ændres
- Desktop tab-bar reduceres fra 12 til 10 kolonner
- Mobil sidebar viser blot "Indhold" som et enkelt punkt

### Tekniske detaljer

**Fil: `src/pages/Admin.tsx`**

1. **Reducer `navItems`**: Fjern de tre separate entries (`casinos`, `shop`, `highlights`) og erstat med en enkelt `{ value: "content", label: "Indhold", icon: Gift }`
2. **Tilføj sub-tab state**: Ny `useState` for `contentSubTab` med default `"casinos"`
3. **Opdater `TabsList`**: Ændr `grid-cols-12` til `grid-cols-10`
4. **Ny samlet `TabsContent value="content"`**:
   - Indeholder en sekundær `Tabs`-komponent med 3 triggers: "Casino Tilbud", "Butik", "Highlights"
   - Hver sub-tab renderer det eksisterende indhold (casino-listen, `ShopAdminSection`, `HighlightsAdminSection`)
5. **Fjern** de gamle `TabsContent` for `casinos`, `shop` og `highlights`
6. **Mobil sidebar**: Viser "Indhold" som et enkelt punkt der navigerer til `content`-fanen
