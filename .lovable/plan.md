## Plan: Ret beskrivelsen af bonus hunt-processen på alle sider

### Problem

Flere sider beskriver forkert, at vi "køber bonusser" som den primære metode i en bonus hunt. Den korrekte proces er:

1. Start med en balance (fx 5.000 kr)
2. Spin på maskiner og hunter bonusser organisk – når en bonus trigges, gemmes/lukkes den ned
3. Fortsæt indtil balancen er i 0
4. Åbn ALLE gemte bonusser på én gang live

Bonus buy er en alternativ metode, der somme tider bruges, men er ikke standard.

### Filer der skal rettes

**1. `src/components/bonus-hunt/BonusHuntSeoContent.tsx**` (Trin 1 kort)

- Linje 11: "Vi enten køber eller hunter bonusser" → Beskriv korrekt: vi spinner med en startbalance, gemmer bonusser undervejs, og åbner alle til sidst. Bonus buy nævnes som alternativ.

**2. `src/components/bonus-hunt/BonusHuntIntroBlock.tsx**` (intro-tekst)

- Linje 10: "hvor flere bonusser enten købes eller huntes, og så åbnes" → Ret til at beskrive den korrekte proces: man spinner ned en balance, gemmer bonusser man rammer, og åbner dem samlet.

**3. `src/components/bonus-hunt/BonusHuntFaq.tsx**` (FAQ svar 1)

- Linje 9: "hvor vi køber eller hunter bonusser" → Ret til primært at beskrive hunting-processen korrekt.

**4. `src/pages/BonusHuntArkiv.tsx**` (FAQ item 2)

- Linje 25: "Vi køber bonusser på en række spillemaskiner" → Ret til korrekt beskrivelse af hunting-processen.

**5. `src/components/seo-content/BonusHuntArkivSeoContent.tsx**` (flere steder)

- Linje 15: "hvor vi køber bonusser på en række spillemaskiner" → Hunting-beskrivelse
- Linje 42: "summen af alle bonus-køb" → summen af alle indsatser/bonus-priser
- Linje 56: "det samlede beløb investeret i at købe bonusser" → Ret startbalance-beskrivelse
- Linje 63-64: "gevinster fra tidlige bonusser genbruges til at købe flere bonusser" → Ret
- Linje 89-98: EV-formel refererer til "Feature Buy" som standard → Ret til at reflektere at hunting er standard, bonus buy er alternativ
- Linje 285-289: "Feature Buy-pris" som standard strategi → Ret
- Linje 396-401: Historisk afsnit om organiske vs Feature Buy → Ret perspektivet (hunting er stadig standard)

**6. `src/components/bonus-hunt/BonusHuntSeoText.tsx**` (flere steder)

- Linje 18: "indsamler et bestemt antal bonusser" → Beskriv hunting-processen
- Linje 69: "inklusiv købspris for bonusser" → indsats brugt til at triggere bonusser
- Linje 120: "bonus buy-funktionalitet" som primært kriterium → Ret
- Linje 286-290: "fordeler det på tværs af et bestemt antal bonusser" → Ret strategi-beskrivelse
- Linje 295: "bonus buy-pris (typisk 50–100x bet)" → Ret kontekst
- Linje 338: "bonus buy-betingelser" → Ret
- Linje 436-437: "En bonus buy koster ofte 50–100x" → Ret til at forklare forskellen mellem hunting og buying

### Ændringernes karakter

Alle rettelser handler om at:

- Beskrive hunting som den primære metode (spin ned balance → gem bonusser → åbn alle)
- Nævne bonus buy som en alternativ metode der somme tider bruges
- Forklare at REQ X kan være t under 100x ved hunting (pga. basegame hits undervejs), mens det er ~100x ved bonus buy. Ved hunting af bonusser kan man også være uheldig ikke at ramme bonusserne, hvilket gør at REQ X kan være oppe mellem 100-200x hvis man er uheldig. Man kan sige at den eneste fordel ved at hunte bonusserne, er når REQ x ved start af åbning af bonusser, er under 100X. I dette tilfælde har det betalt sig at hunte bonusser, fordi ved køb af bonusserne, vil REQ X være omkring 100x. 
- Korrekt beskrive startbalance som den balance man starter med og spinner ned, ikke som et beløb man bruger til at købe bonusser

### Omfang

7 filer med i alt ~25-30 tekststeder der skal justeres. Ingen strukturelle/kode-ændringer – kun indholdsrettelser i dansk tekst.