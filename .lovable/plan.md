

# Redesign: QuickComparisonTable → Premium Casino Cards

## Analyse

**Nuværende design (billede 1):** En simpel HTML-tabel med kolonner (#, Casino, Bonus, Omsætning, Udbetaling, Score, CTA). Funktionelt men visuelt fladt og generisk — ligner enhver affiliate-tabel.

**Reference (billede 2 – bedrageri.com):** Individuelle kort-baserede layouts med:
- Rank-badge (nummer i farvet cirkel)
- Stort casino-logo + rating (x/5 ★)
- Nøgletal i horisontale kolonner (Udbetalingssats, Cash out, Min. indbetaling)
- Prominent bonus-beløb (stor typografi)
- Betalingsmetode-ikoner
- Stor CTA-knap
- Fuld disclaimer under hvert kort

**Komponenten bruges på 71+ sider** — ét centralt redesign opdaterer hele sitet.

## Plan

### Fil: `src/components/QuickComparisonTable.tsx` — fuld omskrivning

Erstat `<table>` med en vertikal stak af premium casino-kort. Behold alle eksisterende props (`count`, `title`, `prioritySlugs`) og logik (partner-filtrering, anti-footprint CTA-rotation, scoring).

**Nyt kort-layout per casino:**

```text
┌─────────────────────────────────────────────────────┐
│ [1]                                                 │
│                                                     │
│  ┌──────┐   Casino Navn           ┌───────────────┐ │
│  │ LOGO │   4.7/5 ★★★★★          │  100% op til  │ │
│  └──────┘                         │  1.000 kr.    │ │
│                                   └───────────────┘ │
│  Omsætning: 10x  │  Udbetaling: 24t  │  Min: 100kr │
│                                                     │
│  ┌─────────────────────────────────────────────────┐ │
│  │           BESØG CASINO →                        │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
│  Annoncering | 18+ | Vis vilkår ▼                   │
└─────────────────────────────────────────────────────┘
```

**Design-detaljer:**
- Hvert kort: `rounded-xl border border-border bg-card` med hover-shadow
- Rank-badge: Farvet cirkel (guld #1, sølv #2, bronze #3) i øverste venstre hjørne
- Logo: Stort (64×64px), afrundet med subtil baggrund
- Rating: Stjerner + numerisk score fra `CASINO_SCORES`
- Bonus-beløb: Fremhævet i stor, fed typografi med primary-farve
- Nøgletal: 3-kolonne grid med labels (Omsætning, Udbetaling, Min. indbetaling)
- CTA: Fuld-bredde knap med gradient (primary), anti-footprint roteret tekst + pil
- Disclaimer: Genbruger `CasinoCardDisclaimer` under hvert kort
- Casino-navn linker til anmeldelse (bevares)
- Responsivt: Stacker naturligt da det er kort-baseret (ingen tabel-problemer på mobil)

**Data brugt fra Casino-objektet:**
- `logo_url`, `name`, `slug` (link)
- `bonus_amount` (fremhævet)
- `wagering_requirements`, `payout_time`, `min_deposit`
- Score fra `CASINO_SCORES` (eller fallback `rating`)

### Ingen andre filer ændres
Alle 71+ sider importerer allerede `QuickComparisonTable` med samme props — de får automatisk det nye design.

