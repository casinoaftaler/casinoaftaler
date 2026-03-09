

## Plan: Tilføj 3 dynamiske datablokke til alle slot-katalog-sider

### Status: Hvad der allerede eksisterer

1. **Slot Statistik** — Allerede delvist implementeret (stats grid linje 735-759 med RTP, volatilitet, højeste X, bonus count). Mangler: Provider-link, max win, og formatering som en samlet infobox/tabel.
2. **Flere slots fra provider** — Allerede implementeret som "Lignende Spillemaskiner" (linje 885-917), henter 6 slots fra samme provider. Skal omdøbes til "Flere slots fra {provider}" og udvides til 8 slots.
3. **Casinoer der har slot** — **Mangler helt**. Skal bygges fra bunden.

### Implementering

#### 1. Ny sektion: "Casinoer hvor du kan spille {slotName}"

- Hent aktive casinoer fra `casinos_public` (de har `game_providers` JSON-array med provider-navne).
- Filtrer casinoer hvor `game_providers` indeholder slottens provider (da vi ikke har direkte slot→casino mapping, matcher vi på provider).
- Vis som tabel med: Casino navn (link til `/casino-anmeldelser/{slug}`), Bonus tilbud, CTA.
- Fallback: Hvis ingen match på provider, vis top-anbefalede casinoer.
- Placeres efter "Om {slotName}" sektionen.

#### 2. Opgradér Slot Statistik til infobox

- Saml eksisterende stats grid + tilføj: Provider (med link til `/spiludviklere/{slug}`), Max Win (`max_potential`-feltet).
- Formatér som en kompakt info-tabel fremfor 4 separate kort.
- Beholder nuværende position.

#### 3. Omdøb og udvid "Lignende Spillemaskiner"

- Omdøb til "Flere slots fra {provider}".
- Udvid limit fra 6 → 8 slots.
- Allerede filtrerer den sig selv ud — dette verificeres.

### Alle ændringer sker i én fil

**`src/pages/SlotCatalogPage.tsx`**:
- Tilføj ny `useCasinosForSlot()` hook (query `casinos_public` filtreret på provider via `game_providers` JSON).
- Tilføj casino-tabel sektion med `<a>`-baserede links.
- Omstrukturér stats grid til infobox-tabel.
- Omdøb "Lignende Spillemaskiner" → "Flere slots fra {provider}" og ændr limit til 8.

