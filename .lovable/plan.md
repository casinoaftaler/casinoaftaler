

# Plan: 10 Nye Provider-Guides (Batch 1: 3 stk)

## Eksisterende Struktur (Auditeret)

12 provider-guides eksisterer allerede, alle bruger `ProviderPageTemplate.tsx` med disse props:
- SEO metadata (seoTitle, seoDescription, currentPath)
- Hero (name, heroSubtitle, heroImage)
- 10 sektioner med unik sectionOrder-rotation
- 6 game spotlights, 10-punkt timeline, 7 pros/5 cons, 5 FAQs
- Strategic analysis (~1.500 ord), Technical profile (9 stat-cards), Intro (~1.500 ord)
- Intern linking til andre providers via `<Link>`

Alle er registreret i: `App.tsx` (routes), `seoRoutes.ts`, `navData.ts`, `entityMappings.ts`, `slotProviderLinks.ts`, `ProviderPageTemplate.tsx` providerLinks array.

## De 10 Nye Providers

1. **Thunderkick** 2. **Blueprint Gaming** 3. **Push Gaming** 4. **Quickspin** 5. **iSoftBet** 6. **Betsoft** 7. **Wazdan** 8. **Endorphina** 9. **Stakelogic** 10. **Booming Games**

## Batch 1 (Denne Implementering): Thunderkick, Blueprint Gaming, Push Gaming

### Per Side: Indholdsstruktur (~9.000+ ord)

Hver side følger NetEntGuide.tsx-strukturen præcist:

| Sektion | Ordantal | Indhold |
|---------|----------|---------|
| introContent | ~1.500 | Dyb analyse af studiet, DNA, markedsposition, dansk relevans |
| strategicAnalysis | ~2.500 | 4-5 H3-underoverskrifter: filosofi, konkurrentsammenligning, målgruppe, fremtid |
| technicalProfile | ~1.200 | Tekst + 9 stat-cards (RTP, volatilitet, mekanikker, release-kadence etc.) |
| historyIntro + timeline | ~400 | Intro + 10 milepæle |
| gamesIntro + 6 games | ~1.200 | Detaljerede spilanalyser med RTP, volatilitet, maks. gevinst |
| licensesContent | ~400 | Specifik licensinfo |
| pros (7) + cons (5) | ~300 | Konkrete styrker/svagheder |
| faqs (5) | ~800 | Dybdegående svar med interne links |
| responsibleGamingText | ~200 | Specifik ansvarlig spil-tekst |

### Section Order Rotation (Undgår Template Footprint)

- **Thunderkick**: `["technical", "strategic", "intro", "history", "games", "licenses", "casinos", "proscons", "providers", "responsible"]`
- **Blueprint Gaming**: `["intro", "history", "technical", "strategic", "games", "casinos", "licenses", "proscons", "providers", "responsible"]`
- **Push Gaming**: `["strategic", "intro", "games", "technical", "history", "licenses", "casinos", "proscons", "providers", "responsible"]`

### Filer der Oprettes (Batch 1)

1. `src/pages/ThunderkickGuide.tsx` (~300 linjer)
2. `src/pages/BlueprintGamingGuide.tsx` (~300 linjer)
3. `src/pages/PushGamingGuide.tsx` (~300 linjer)

### Filer der Opdateres (Batch 1)

| Fil | Ændring |
|-----|---------|
| `src/App.tsx` | 3 nye routes + imports |
| `src/lib/seoRoutes.ts` | 3 nye entries under Spiludviklere |
| `src/components/header/navData.ts` | 3 nye i PROVIDER_LINKS |
| `src/lib/entityMappings.ts` | 3 nye entity mappings med regex + anchorVariants |
| `src/lib/slotProviderLinks.ts` | 3 nye i PROVIDER_DISPLAY_NAMES |
| `src/pages/providers/ProviderPageTemplate.tsx` | 3 nye i providerLinks array |

### Intern Linking Strategi

Hver guide linker til minimum 4 eksisterende providers via `<Link>` i introContent og strategicAnalysis, plus cross-links til relevante hubs (/free-spins, /omsaetningskrav, /velkomstbonus, /live-casino, /slot-database).

### Batch 2 & 3 (Efterfølgende)

- **Batch 2**: Quickspin, iSoftBet, Betsoft (3 nye sectionOrder-rotationer)
- **Batch 3**: Wazdan, Endorphina, Stakelogic (3 nye rotationer)
- **Batch 4**: Booming Games (1 resterende)

Skal jeg starte med Batch 1?

