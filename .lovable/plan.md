## Plan: Screenshots til Buffalo King Guide

### Uploaded screenshots → sektions-mapping


| #   | Screenshot | Indhold                                                      | Målsektion                                                                                                       | Size   | Loading |
| --- | ---------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------ | ------- |
| 1   | `_181414`  | Buffalo King logo/banner artwork                             | **Ikke brugt** – dekorativt banner, ikke et autentisk UI-screenshot (Bare brug det alligevel, det er deres logo) | &nbsp; | &nbsp;  |
| 2   | `_161148`  | Spilleautomaten.dk: RTP, max gevinst, indsats, gevinstlinjer | **Teknisk Profil og Volatilitetsanalyse** (efter Card)                                                           | medium | eager   |
| 3   | `_161200`  | Gameplay med x5 multiplikatorer på alle hjul                 | **Multiplikator-Stacking** (efter første afsnit)                                                                 | full   | lazy    |
| 4   | `_161213`  | Base game med bonus-symbol og "Køb Gratis Spins"             | **Free Spins: Op til 100 Gratis Spins** (efter første afsnit)                                                    | full   | lazy    |
| 5   | `_161232`  | Spilleregler side 1: paytable + 4096 ways forklaring         | **Symbolhierarki og Paytable-Dekonstruktion** (efter tabel)                                                      | full   | lazy    |
| 6   | `_161238`  | Spilleregler side 2: Wild, Bonus, free spins regler          | **Den Store Scatter-Gevinst** (efter free spins-tabel)                                                           | medium | lazy    |


### Fravalg

- Banner-billedet (`_181414`) bruges IKKE – det er promotional artwork, ikke et autentisk UI-screenshot. Det bryder med E-E-A-T strategien. (Er du sikker på det? altså jeg har fundet et billede af det på google og taget et screenshot.)

### Tekniske trin

1. **Konvertér 5 screenshots til WebP** via ffmpeg (q82, <150KB target)
2. **Kopiér til** `src/assets/screenshots/` med beskrivende filnavne:
  - `buffalokingRtpData.webp`
  - `buffalokingMultiplikatorStacking.webp`
  - `buffalokingBaseGameBonus.webp`
  - `buffalokingPaytableSymboler.webp`
  - `buffalokingFreeSpinsRegler.webp`
3. **Importér** i BuffaloKingGuide.tsx og tilføj `ReviewScreenshot` med unikke alt-tekster
4. **Placering** med min. 15 linjers kode-gab mellem hver

### Placeringsrækkefølge i guiden

```text
Hero
AuthorMetaBar
H2: Multiplikator-Stacking
  → afsnit 1
  → ★ Screenshot 3 (gameplay x5 multiplikatorer) — full, lazy
  → afsnit 2-4

H2: Teknisk Profil
  → Card (teknisk data)
  → ★ Screenshot 2 (RTP-data fra spilleautomaten) — medium, eager
  → afsnit 1-2

H2: Free Spins
  → afsnit 1
  → ★ Screenshot 4 (base game med bonus) — full, lazy
  → afsnit 2-3

InlineCasinoCards

H2: EV-Beregning
  (ingen screenshot – variation)

H2: Risikoprofil
  (ingen screenshot – variation)

H2: Prærie-Slotten
  (ingen screenshot)

H2: Symbolhierarki
  → tabel
  → ★ Screenshot 5 (paytable spilleregler) — full, lazy
  → afsnit 1-2

H2: All Ways-Mekanikken
  (ingen screenshot – variation)

H2: Den Store Scatter-Gevinst
  → free spins-tabel
  → ★ Screenshot 6 (Wild/Bonus regler) — medium, lazy
  → afsnit 1-2
```

### Filer der ændres

- **5 nye assets** i `src/assets/screenshots/`
- **1 fil redigeres**: `src/pages/slots/BuffaloKingGuide.tsx` (imports + 5× ReviewScreenshot)