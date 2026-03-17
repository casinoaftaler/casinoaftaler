
Mål: gøre /markedsindsigt visuelt og strategisk “færdig” i samme kvalitetsniveau som /nye-casinoer, og samtidig lukke de vigtigste produktmæssige huller.

Status efter gennemgang:
- Nej, siden er ikke 100% korrekt færdig endnu.
- Datadelen virker: events loader, snapshot findes, operatørtabel findes, SEO/breadcrumb/news-mapping er koblet på.
- Men præsentationen matcher ikke sitets enterprise-standard endnu:
  - hero-headeren bruger en lys gradient i stedet for den mørke branded hero som /nye-casinoer
  - der mangler hero-billede under AuthorMetaBar
  - siden føles mere som en intern feature-side end en fuldt poleret cornerstone-side
- Og formålet er kun delvist opfyldt:
  - den viser markedssignaler
  - men den sælger ikke tydeligt nok hvorfor siden findes, hvordan man bruger den, og hvad næste handling er

Hvad der konkret bør laves:
1. Header/hero skal bringes på niveau med /nye-casinoer
- Erstat nuværende lyse hero-sektion med samme struktur som /nye-casinoer:
  - mørk branded baggrund
  - centreret titel og intro
  - badge/eyebrow i toppen
  - samme spacing og kontrastniveau
- Det vil visuelt få siden til at høre hjemme i resten af sitet.

2. Hero-billede skal tilføjes i content-flow
- Tilføj et stort hero-billede lige under AuthorMetaBar, samme mønster som /nye-casinoer og andre guides.
- Brug eksisterende guide-billedemønster, så siden følger samme artikelstandard.
- Da du valgte “samme som /nye-casinoer-stil”, bør implementeringen bruge samme layoutlogik og helst et passende eksisterende hero midlertidigt, indtil et dedikeret Market Intelligence-billede findes.

3. Siden skal gøres mere “cornerstone” og mindre “feature dump”
- Behold snapshot + featured events + tabel.
- Men tilføj stærkere redaktionel struktur:
  - tydelig introsektion om hvorfor markedsindsigt er vigtigt for spillere
  - en kort “sådan bruger du siden”-sektion
  - mere tydelig overgang mellem featured signaler, eventfeed og operatøroversigt
- Lige nu springer siden for hurtigt fra hero til data.

4. CTA- og brugerflow skal skærpes
- Featured events har links, men siden mangler en klar retning for næste handling.
- Tilføj tydeligere videre flow:
  - til anmeldelser
  - til casino-licenser
  - til casino-bonus
- Målet er, at /markedsindsigt både informerer og distribuerer intern linkværdi.

5. Tomme/tynde states skal hardenes
- Hvis der er få eller ingen events, bør siden stadig føles komplet.
- Plan:
  - fallback-copy for ingen featured events
  - fallback-copy for tom eventliste
  - tydelig forklaring hvis snapshot eksisterer men public events er få
- Det gør siden robust som offentlig hub.

6. Semantik og copy polish
- Justér sproget fra “Fase 3 · Public Market Intelligence” til noget mere public-facing.
- “Public Market Intelligence” føles internt; overskrifter og badge bør være mere redaktionelle.
- Gennemgå labels som:
  - “Bonus kontrolleret”
  - “Seneste verificerede events”
  - “Operatøroversigt”
  så de bliver mere ens med resten af sitets tone.

7. Visuel konsistens med sitets standard
- Brug samme hero-farver, radius, spacing og billedbehandling som /nye-casinoer.
- Sørg for at billedet følger eksisterende hero-standard:
  - rounded container
  - bredt landskabsformat
  - eager loading
- Det er især vigtigt, fordi siden aktuelt visuelt afviger fra memory-standarden om rigtige hero-billeder fremfor gradient-only oplevelser.

Anbefalet implementeringsrækkefølge:
1. Rebuild top hero til /nye-casinoer-stil
2. Tilføj hero-billede under AuthorMetaBar
3. Forbedr intro/brug-af-siden-sektion
4. Tilføj fallback states til events
5. Finpuds public copy og CTA-flow

Kort teknisk note:
- MarketIntelligence.tsx er hovedfilen der skal justeres.
- Genbrug mønstre fra NyeCasinoer.tsx:
  - branded hero section
  - image block efter AuthorMetaBar
- Hero-billedet kan implementeres med eksisterende GuideHeroImage-komponent eller samme inline-mønster som /nye-casinoer.
- Der findes allerede et centralt hero-image-system; /markedsindsigt bør kobles til det eller få et eksplicit importeret hero-billede.

Konklusion:
- Funktionelt: siden er god nok til at eksistere.
- Strategisk og visuelt: nej, den er ikke 100% færdig endnu.
- For at opfylde formålet fuldt ud skal den løftes fra “datahub med komponenter” til “færdig branded cornerstone-side” med korrekt hero, hero-billede, stærkere editorial framing og mere robust UX.
