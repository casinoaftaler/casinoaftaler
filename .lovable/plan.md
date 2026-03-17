
Mål: fjerne alle tilfælde hvor Google kan få en `<title>` med `Casinoaftaler.dk` i stedet for brandformatet `| Casinoaftaler` — uden at masseændre sider, der allerede er korrekte.

Hvad jeg har undersøgt:
- Jeg har gennemgået title-kilderne i koden, især:
  - `src/components/SEO.tsx`
  - `index.html`
  - alle sider med `<SEO title=...>`
  - templates med `seoTitle` / `metaTitle`
- Den globale formatter i `SEO.tsx` er allerede sat op korrekt:
  - den ender titler med `| Casinoaftaler`
  - den stripper kun brandet, når det står til sidst
- Derfor opstår fejlen på sider, hvor `Casinoaftaler.dk` står inde i selve titelteksten eller før et nyt suffix. Det kan formatteren ikke rydde op i automatisk.

Bekræftede fejlramte sidetitler:
1. `src/pages/Forfatter.tsx`
   - `Jonas – Forfatter & Grundlægger | Casinoaftaler.dk`
2. `src/pages/ForfatterKevin.tsx`
   - `Kevin – Streamer & Casinoanalytiker | Casinoaftaler.dk`
3. `src/pages/ForfatterAjse.tsx`
   - `Ajse – Juridisk redaktør & casinoanalytiker | Casinoaftaler.dk`
4. `src/pages/ForfatterNiklas.tsx`
   - `Niklas – Finansøkonom & forsikringsekspert | Casinoaftaler.dk`
5. `src/pages/Contact.tsx`
   - `Kontakt – Casinoaftaler.dk | Erhverv & Presse`
6. `src/pages/OmTeamet.tsx`
   - `Om teamet bag Casinoaftaler.dk | Streamere & Casinoeksperter`
7. `src/pages/RedaktionelPolitik.tsx`
   - `Redaktionel Politik – Sådan produceres indhold på Casinoaftaler.dk`
8. `src/pages/SaadanTesterVi.tsx`
   - `Sådan tester vi casinoer | Vores testmetode hos Casinoaftaler.dk`
9. `src/pages/Forretningsmodel.tsx`
   - `Forretningsmodel – Sådan finansieres Casinoaftaler.dk`

Vigtig vurdering:
- De mange sider med `| Casinoaftaler` er allerede fine og skal ikke røres.
- `index.html` fallback-title er korrekt: `De bedste Online Casinoer 2026 | Casinoaftaler`
- `NotFound.tsx` er korrekt.
- Templates som comparison/provider/payment bruger overvejende korrekt brandformat allerede.
- Jeg fandt også mange forekomster af `Casinoaftaler.dk` i beskrivelser, schema, alt-tekster, brødtekst og iframe-title. De påvirker ikke nødvendigvis Googles dokument-title, så jeg vil ikke røre dem i denne opgave medmindre du vil have en bred branding-cleanup bagefter.

Implementeringsplan:
1. Rette de 9 fejlramte `SEO title`-strenge manuelt
   - omskrive dem så brandet aldrig står som `Casinoaftaler.dk`
   - sikre at slutresultatet bliver naturligt og ender som `| Casinoaftaler`
2. Beholde den eksisterende globale `formatTitle()`-logik
   - den er allerede rigtig som sikkerhedsnet
   - ingen grund til at ændre en central SEO-komponent, når problemet er lokale rå titler
3. Køre en ny kodescanning efter rettelsen
   - verificere at ingen `title=` / `seoTitle=` / `metaTitle=` længere indeholder `Casinoaftaler.dk`
   - verificere at ingen title bruger forkert separator-mønster omkring brandet
4. Give dig en kort slutliste over præcis hvilke filer der blev rettet

Forventet resultat:
- Alle fejlramte sider leverer rene titles til head-tagget
- Google får ikke længere titler fra disse sider med `Casinoaftaler.dk` i title-strengen
- Resten af sitet forbliver uændret, så vi undgår unødige title-ændringer på sider der allerede performer korrekt

Teknisk note:
- Selv efter kodefix kan Google i nogle tilfælde midlertidigt vise omskrevne snippets i SERP, men kilde-title i HTML vil være korrekt. Det er det rigtige sted at fixe problemet først.
