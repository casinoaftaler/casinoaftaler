
Målet i næste fase er at rette to ting samtidigt: placering og datakvalitet.

1. Hvad der er forkert nu
- Trust-panelet ligger i toppen via `AuthorMetaBar`, så det vises før selve hovedindholdet på alle berørte sider.
- Det passer dårligt til brugerflowet på lange sider: trust er dokumentation, ikke intro.
- Historikblokken viser i praksis rå URL-skift (`old_value -> new_value`), som ser teknisk og utroværdigt ud.
- Flere kilder i databasen er ikke egentlige licenskilder:
  - mange `bonus_source_url` peger på egne anmeldelsessider
  - historikken indeholder gamle/forkerte slug-links
  - licenskilder er kun delvist normaliseret til korrekte Spillemyndigheden-søgninger

2. Hvorfor vi flytter det ned
Jeg vil flytte trust-panelet til lige før `FAQSection` på alle sider, hvor det er rullet ud.
Det er bedre fordi:
- brugeren først får indhold, analyse og konklusion
- trust-panelet fungerer som dokumentation og transparenslag tættere på FAQ, hvor brugeren typisk søger bekræftelse
- det reducerer visuel støj øverst på siden
- det matcher den reference, du peger på

3. Hvad jeg vil ændre i koden
A. Flyt placeringen
- Fjerne `CasinoTrustPanel` fra `AuthorMetaBar`
- Indsætte det eksplicit før `FAQSection` på:
  - review-sider `/casino-anmeldelser/*`
  - hubberne `/casinoer`, `/nye-casinoer`, `/casino-bonus`
- Jeg følger eksisterende sidestruktur, så panelet kommer efter konklusion/relaterede sektioner og før FAQ.

B. Gør kilderne brugbare
- Udvide trust-panelet så historikrækker viser klikbare “Kilde”-links i stedet for kun rå tekst
- På review-sider vise de aktuelle verificerede kilder tydeligt:
  - licenskilde
  - bonuskilde
- Rense formatteringen, så vi ikke viser tekniske URL-mutationer som hovedbudskab

4. Hvad jeg vil rette i data
A. Licenskilder
- Auditere alle rækker i `casino_compliance`
- Validere hver `license_source_url` mod korrekt Spillemyndigheden-side
- Standardisere til én korrekt licenskilde pr. casino, ikke blandede gamle URL-formater

B. Bonuskilder
- Gennemgå alle `bonus_source_url`
- Erstatte egne review-links som “kilde”, hvis de ikke er den faktiske dokumentationskilde
- Kun beholde en intern side som sekundær reference, hvis det er bevidst og tydeligt mærket

C. Historik
- Gennemgå `casino_compliance_history` for forkerte/fældede links
- Rette poster hvor “source_url” eller ændringsværdier peger på forkerte slug-varianter
- Sikre at nyere trust-visning ikke fremhæver gamle defekte links

5. Sådan finder jeg ALLE korrekte licenskilder
Jeg vil arbejde systematisk casino for casino:
- bruge eksisterende `casino_slug`, `casino_name` og nuværende `license_source_url`
- kontrollere dem mod Spillemyndighedens officielle søgeresultater/licensopslag
- lave en endelig kanonisk mapping for alle casinoer i trust-datasættet
- derefter opdatere både aktuelle compliance-records og de steder i UI, der viser kilder

6. Implementeringsrækkefølge
1. Flyt `CasinoTrustPanel` ud af `AuthorMetaBar`
2. Placér panelet før FAQ på alle berørte sider
3. Forbedr trust-panelets kildevisning i UI
4. Auditér alle `casino_compliance` links
5. Rens og normalisér alle licenskilder
6. Rens bonuskilder og de mest synlige historikfejl
7. Validér at alle berørte sider viser korrekte links

7. Resultatet efter denne fase
- Trust-panelet ligger det rigtige sted: lige før FAQ
- Alle nuværende trust-links bliver korrekte og klikbare
- Licenskilder bliver ensartede og officielle
- Bonuskilder bliver mere troværdige
- Hele trust-laget fremstår som dokumentation, ikke som en forstyrrende topblok

8. Vigtig teknisk note
Der er to niveauer af “rette links” her:
- UI-laget: hvordan links vises og klikkes
- datalaget: hvilke links der ligger i `casino_compliance` og `casino_compliance_history`

Jeg vil rette begge dele, ellers vil problemet bare komme igen.
