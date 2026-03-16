
Mest sandsynlige årsag til at arbejdet er gået i stå: de 3 VS-sider er stadig håndskrevne, korte JSX-sider, mens den nye enterprise-builder allerede findes i koden men endnu ikke er koblet på nogen af siderne. Derudover er der datamismatch mod anmeldelsessiderne, som skal rettes først for ikke at udvide med forkerte facts.

Hvad jeg har verificeret i koden:
- `SpilleautomatenVsSpilDanskNu.tsx`, `BetiniaVsCampobet.tsx` og `SwiftCasinoVsLunaCasino.tsx` er stadig korte og står på `readTime="36 min"`.
- `src/lib/comparisonEnterpriseBuilder.tsx` og `src/components/comparisons/EnterpriseComparisonSections.tsx` findes allerede, men bruges ikke.
- Der er konkrete source-of-truth forskelle mod anmeldelserne, fx:
  - Spilleautomaten min. indbetaling skal være `75 kr.` og payout skal afspejle hurtige MobilePay/Trustly flows.
  - SpilDanskNu min. indbetaling er også `75 kr.`.
  - Betinia/Campobet/Swift/Luna har mere præcise facts i deres anmeldelsessider om bonuslogik, betalingsbredde, loyalitet og produktposition.

Plan for implementering:
1. Fase 1: byg de første 2 sider færdige
   - `SpilleautomatenVsSpilDanskNu.tsx`
   - `BetiniaVsCampobet.tsx`

2. Konverter hver af de to sider fra statiske 7-8 sektioner til enterprise-struktur
   - behold eksisterende `ComparisonPageTemplate`
   - importér og brug:
     - `buildEnterpriseComparisonSections`
     - `EnterpriseComparisonSections`
   - definér komplette `EnterpriseComparisonProfile`-objekter for begge brands
   - definér 14-18 `EnterpriseComparisonTopic` pr. side, så totalen lander realistisk på 9000+ ord

3. Synkronisér alle facts mod anmeldelsessiderne før indholdet genereres
   - bonusmodel
   - omsætningskrav
   - min. indbetaling
   - payout-flow
   - spilvolumen / udbydere
   - loyalitetsmekanik
   - licens- og trust-claims
   - kun partner-CTA’er beholdes

4. Gør enterprise-indholdet stærkere end nuværende VS-sider
   - mere “money-page” intent
   - flere interne links ind i relevante hubs/guides:
     - bonus / no-sticky / omsætningskrav
     - live casino
     - betalingsmetoder
     - ansvarligt spil / Spillemyndigheden
     - relevante anmeldelsessider
     - spiludviklere hvor det styrker topical depth
   - anti-fit sektioner og spillerprofiler pr. side
   - tydelig retention-, payout-, mobil- og browsinganalyse

5. Opdatér metadata pr. side
   - stærkere meta descriptions
   - mere enterprise intro
   - `readTime` løftes til niveau der matcher 9000+ ord
   - behold korrekt canonical/path via template

6. Fase 2: byg den sidste side
   - `SwiftCasinoVsLunaCasino.tsx`
   - samme enterprise-struktur, men med tydelig differentiering:
     - Swift = volumen, Hot Or Cold, funktionsbredde
     - Luna = kuratering, loyalitetslevels, beslutningsro

7. Slutkontrol før afslutning
   - bekræft at alle 3 filer reelt er udvidet markant i kodebasen
   - hurtig word-count sanity check
   - verifikér at builderen faktisk bruges i alle 3 sider
   - tjek at facts stadig matcher anmeldelserne og at CTA-slugs kun peger på godkendte partnere

Leverance
- Først 2 komplette enterprise-sider uden at forsøge alle 3 samtidig
- Derefter 3. side
- Alle 3 ender som reelle 9000+ ord comparison money-pages med stærk intern linking og tydelig cluster-differentiering
