

# Plan: Tilføj 5 screenshots til 4 money pages

## Status nu
| Side | Har nu | Mål | Mangler |
|------|--------|-----|---------|
| VipProgram.tsx | 2 | 3 | 1 |
| NyeCasinoer.tsx | 2 | 3 | 1 |
| Omsaetningskrav.tsx | 2 | 3 | 1 |
| Spillemyndigheden.tsx | 1 | 3 | 2 |

## Trin 1: Kopiér billeder til assets

| Upload | Filnavn | Side |
|--------|---------|------|
| Billede 1 (ComeOn/GetLucky) | `comeon-getlucky-vip-tilbud.png` | VipProgram |
| Billede 2 (PlayKasino forside) | `playkasino-forside-velkomst.png` | NyeCasinoer |
| Billede 3 (Bet365 bonus) | `bet365-velkomstbonus-vilkaar.png` | Omsaetningskrav |
| Billede 4 (Spillemyndigheden forside) | `spillemyndigheden-dk-forside.png` | Spillemyndigheden |
| Billede 5 (Spilleverandør-side) | `spillemyndigheden-spilleverandoer.png` | Spillemyndigheden |

## Trin 2: Placering i koden

### VipProgram.tsx (2→3)
- **Placering:** Efter section `#omsaetningskrav-vip` (linje ~730, efter `</section>`)
- **Alt:** `"ComeOn og GetLucky VIP-kampagner med eksklusive bonustilbud og loyalitetsprogrammer for danske spillere"`
- **Caption:** `"ComeOn og GetLucky tilbyder begge dedikerede kampagner og VIP-tilbud til loyale spillere"`

### NyeCasinoer.tsx (2→3)
- **Placering:** Efter section om markedsanalyse/statistik (linje ~440, mellem sektioner)
- **Alt:** `"PlayKasino forside med 100% velkomstbonus op til 500 kr. – eksempel på nyt dansk casino med fuld licens"`
- **Caption:** `"PlayKasino – et af de nyeste danske casinoer med moderne design og konkurrencedygtig velkomstbonus"`

### Omsaetningskrav.tsx (2→3)
- **Placering:** Efter section om teknisk analyse d+b vs b (~linje 600, efter `</section>`)
- **Alt:** `"Bet365 Casino velkomstbonus med 100% op til 1.000 kr. og omsætningskrav på 10x indbetaling plus bonus"`
- **Caption:** `"Bet365s bonusvilkår viser tydeligt omsætningskravet – 10x på indbetaling + bonus inden for 60 dage"`

### Spillemyndigheden.tsx (1→3)
- **Screenshot 1 (forside):** Efter section "Licenstyper i Danmark" (~linje 336, efter `</section>`)
  - **Alt:** `"Spillemyndigheden.dk forside med nyhedsbrev, pressemeddelelser og information om dansk spillelovgivning"`
  - **Caption:** `"Spillemyndigheden.dk – den officielle myndighed der regulerer alt online spil i Danmark"`

- **Screenshot 2 (spilleverandør):** Efter section "Tekniske Krav og Datasikkerhed" (~linje 440, efter `</section>`)
  - **Alt:** `"Spillemyndighedens side for spilleverandører med ansøgningsblanketter og krav til tilladelse som spiludbyder i Danmark"`
  - **Caption:** `"Spillemyndighedens licensansøgningsportal – alle operatører skal igennem denne proces for at få dansk tilladelse"`

## Teknisk mønster (gentages for alle 5)
```tsx
// 1. Import øverst i filen
import comeonGetluckyVip from "@/assets/screenshots/comeon-getlucky-vip-tilbud.webp";

// 2. Placering mellem sektioner
<ReviewScreenshot
  src={comeonGetluckyVip}
  alt="..."
  caption="..."
/>
```

Alle bruger default `size="full"` og `lazy` loading (ingen er above-the-fold).

