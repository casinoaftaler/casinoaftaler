# Plan: KapowCasino registrerings-screenshots på money pages

## Billederne og deres indhold

1. **kapow-velkomstbonus.png** — Trin 1: Bonusvalg med 100 kr = 100 Spins til Gates of Olympus, toggle "Fortsæt uden bonus"
2. **kapow-registrering.png** — Trin 1: Kontaktformular med CPR, fornavn, efternavn, email, mobilnummer, tidsperiode, overførselsgrænse
3. **kapow-mitid-registrering.png** — Trin 2: MitID-verificeringsside med "Registrer med MitID"
4. **kapow-mitid-login.png** — Trin 2: Scrive MitID-login med bruger-ID felt
5. **kapow-mitid-godkendt.png** — Trin 2: MitID-verifikation godkendt (blåt skjold)

## Placeringsplan – 15 money pages

Billederne matches til sider baseret på indholdets relevans:

### Velkomstbonus-billedet (kapow-velkomstbonus.png)


| Side                       | Kontekst                                   |
| -------------------------- | ------------------------------------------ |
| `Velkomstbonus.tsx`        | Ved sektion om bonusaktivering/valg        |
| `Indskudsbonus.tsx`        | Ved trin-guide om bonusaktivering          |
| `CasinoBonus.tsx`          | Ved sektion om velkomstbonustyper          |
| `FreeSpins.tsx`            | Ved sektion om free spins ved registrering |
| `BonusUdenIndbetaling.tsx` | Ved sammenligning med indbetalingsbonusser |


### Registreringsformular (kapow-registrering.png)


| Side                                      | Kontekst                               |
| ----------------------------------------- | -------------------------------------- |
| `TopCasinoOnline.tsx`                     | Ved "Opret konto med MitID" trin-guide |
| `NyeCasinoer.tsx`                         | Ved sektion om registreringsproces     |
| `nye-casinoer/NyeCasinoerDanskLicens.tsx` | Ved dansk licens-registreringskrav     |
| `Omsaetningskrav.tsx`                     | Ved sektion om overførselsgrænser      |


### MitID-registrering (kapow-mitid-registrering.png)


| Side                                | Kontekst                        |
| ----------------------------------- | ------------------------------- |
| `nye-casinoer/NyeCasinoerMitID.tsx` | Primær side om MitID – vigtigst |
| `Spillemyndigheden.tsx`             | Ved KYC/identitetsverifikation  |
| `CasinoLicenser.tsx`                | Ved licenskrav og MitID         |


### MitID-login (kapow-mitid-login.png)


| Side                             | Kontekst                                 |
| -------------------------------- | ---------------------------------------- |
| `payments/TrustlyGuide.tsx`      | Ved MitID-godkendelse for bankoverførsel |
| `payments/BankTransferGuide.tsx` | Ved MitID-login til bankgodkendelse      |


### MitID-godkendt (kapow-mitid-godkendt.png)


| Side                                           | Kontekst                         |
| ---------------------------------------------- | -------------------------------- |
| `nye-casinoer/NyeCasinoerHurtigUdbetaling.tsx` | Ved pre-verifikation via MitID   |
| `KapowCasinoAnmeldelse.tsx`                    | Ved registrerings-/MitID-sektion |


## Teknisk implementation

1. Copy 5 billeder til `src/assets/screenshots/`:
  - `kapow-velkomstbonus.png`
  - `kapow-registrering.png`
  - `kapow-mitid-registrering.png`
  - `kapow-mitid-login.png`
  - `kapow-mitid-godkendt.png`
2. I hver side: import billede, indsæt `<ReviewScreenshot>` med `size="full"`, unik alt-tekst og caption tilpasset sidens kontekst. Interleaved med tekst, aldrig stacked.
3. Hvert billede bruges på 2-4 sider med unik alt-tekst pr. instans.
4. Max 2 KapowCasino-screenshot pr. side (medmindre siden specifikt handler om registreringsprocessen, fx NyeCasinoerMitID).

## Estimat

- 5 assets kopieret
- ~15 sider redigeret med 1-2 screenshots hver