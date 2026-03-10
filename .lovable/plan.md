

## Problem: Template-indhold på 1.460 slot-sider

Du har helt ret. Efter gennemgang af `SlotCatalogPage.tsx` er problemet klart:

**6 sektioner er reelt templates** der kun udskifter slot-navnet og vælger mellem 2-3 intro-varianter via hash:
- RTP-sektion (3 intro-varianter, men body er identisk for alle slots med samme RTP-range)
- Volatilitet-sektion (3 varianter per volatilitets-niveau — alle "High" slots har samme tekst)
- Bonus Hunt-sektion (3 intro-varianter, men samme analyse-tekst)
- Provider-sektion (3 intro-varianter, men paragraf 2 og 3 er 100% identiske)
- "Sådan Fungerer" (3 intro-varianter, men paragraf 2 og 3 er identiske på ALLE 1.460 sider)
- Bankroll Management (2 intro-varianter, næsten identisk body)
- Ansvarligt Spil (3 intro-varianter, men paragraf 2 og 3 er copy-paste på alle sider)

**Resultatet:** Slots med samme volatilitet + samme provider har ~80% identisk prosatekst. Google ser dette som "thin/duplicate content" på tværs af hundredvis af sider.

**Den unikke "Om [slot]"-sektion** (AI-genereret `description`) er allerede god — men den udgør kun ~300 ord af ~2.000.

---

## Plan: Erstat template-sektioner med AI-genereret unikt indhold

### Trin 1: Ny database-kolonne `deep_content`
Migration der tilføjer en `deep_content` (TEXT) kolonne til `slot_catalog`. Denne gemmer et JSON-objekt med unikke afsnit for hver sektion per slot.

### Trin 2: Ny Edge Function `slot-deep-content`
Batch-funktion (ligesom `slot-meta-descriptions`) der:
- Henter slots hvor `deep_content IS NULL` (max 25 per batch)
- Sender slot-data (navn, provider, RTP, volatilitet, max_potential, bonus_count, highest_x) til AI
- Prompter AI til at generere **6 unikke afsnit på dansk** — hver 80-150 ord, specifikt om DEN slot:
  1. RTP-analyse (unik vinkel baseret på slottens faktiske tal)
  2. Volatilitets-vurdering (sammenligning med andre spil fra samme provider)
  3. Bonus hunt-indsigt (data-drevet hvis data findes, ellers unik perspektiv)
  4. Provider-kontekst (slottens plads i providerens portefølje)
  5. Spillemekanik (unik beskrivelse af hvordan DENNE slot adskiller sig)
  6. Bankroll-anbefaling (specifik til denne slots profil)
- Gemmer som JSON i `deep_content`
- Kører i batches af 25 med rate-limit håndtering

### Trin 3: Opdater `SlotCatalogPage.tsx`
- Hvis `deep_content` er udfyldt: Brug de unikke AI-afsnit i stedet for template-funktionerne
- Hvis `deep_content` er `null`: Fallback til de eksisterende template-sektioner (så intet går i stykker)
- Behold H2-rotation (den del er fin)
- Fjern "Sådan Fungerer" og "Ansvarligt Spil" sektionerne fra det unikke indhold — de er generiske og kan beholdes som korte standardtekster

### Trin 4: Kør Edge Function
Du kalder URL'en gentagne gange (ligesom med meta_descriptions) indtil alle 1.460 slots har unikt deep_content.

---

## Forventet resultat
- Hver slot-side får ~600-900 ord **unikt** AI-genereret indhold (deep_content) + ~300 ord unikt (description) = ~1.000+ unikke ord
- Template-sektioner "Sådan Fungerer" og "Ansvarligt Spil" forkortes til ~100 ord hver (de ER generiske af natur)
- 0% duplikeret prosatekst mellem slot-sider

