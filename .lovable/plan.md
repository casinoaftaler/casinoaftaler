

## Plan: Implementér alle 4 SEO-forbedringer

### Status — hvad er allerede på plads

| Feature | Status |
|---------|--------|
| Review Schema (#9) | Allerede implementeret på alle 29 casino-anmeldelser |
| ItemList Schema (#10) | Implementeret på TopCasinoOnline + FreeSpinsIDag. **Mangler** på: `/casino-anmeldelser`, `/casino-bonus`, `/nye-casinoer` |
| TestLog (#11) | Inline-kode i Swift Casino + Luna Casino. **Ingen genanvendelig komponent** |
| Link Density Monitor (#13) | Eksisterer ikke endnu |

### Hvad der skal bygges

---

**1. ItemList Schema på 3 manglende listesider**

Tilføj `ItemList` JSON-LD til:
- `CasinoAnmeldelser.tsx` — liste over alle casino-anmeldelser med position + review-URL
- `CasinoBonus.tsx` — rangerede bonustilbud
- `NyeCasinoer.tsx` — nye casinoer med position

Mønstret kopieres fra `TopCasinoOnline.tsx`: et `itemListElement`-array med `ListItem`, `position`, `name`, `url` — injiceret i SEO-komponentens `jsonLd`-array.

---

**2. Genanvendelig TestLog-komponent**

Opretter `src/components/CasinoTestLog.tsx` — en komponent der modtager:
- `casinoName: string`
- `startkapital: string`
- `testPeriod: string`
- `entries: { title: string; content: string }[]`

Erstatter den duplikerede inline-kode i Swift Casino og Luna Casino med den nye komponent. Fremtidige anmeldelser kan genbruge den.

---

**3. Link Density Monitor i admin**

Opretter `src/components/LinkDensityMonitor.tsx` — et admin-værktøj der:
- Importerer alle ruter fra `seoRoutes.ts`
- For hver rute tæller antal `<Link>` og `<a>` tags i den renderede komponent (statisk analyse via kode-søgning er urealistisk; i stedet scanner vi routefilerne)
- Viser en tabel med path, link-antal, og farvekodede advarsler (grøn < 40, gul 40-60, rød > 60)
- Tilføjes som ny tab i Admin-panelet

Da runtime DOM-scanning fra admin er komplekst, bygger vi i stedet en **klient-side dev-tool** der:
- Bruger `document.querySelectorAll('a')` på den aktuelle side
- Viser et lille floating badge med link-antal (kun synligt for admins)
- Klikbar for at se en liste over alle links og deres destinations-URLs

---

### Filændringer

| # | Fil | Ændring |
|---|-----|---------|
| 1 | `src/pages/CasinoAnmeldelser.tsx` | Tilføj ItemList JSON-LD baseret på casino-listen |
| 2 | `src/pages/CasinoBonus.tsx` | Tilføj ItemList JSON-LD |
| 3 | `src/pages/NyeCasinoer.tsx` | Tilføj ItemList JSON-LD |
| 4 | `src/components/CasinoTestLog.tsx` | Ny genanvendelig TestLog-komponent |
| 5 | `src/pages/SwiftCasinoAnmeldelse.tsx` | Refactor til CasinoTestLog |
| 6 | `src/pages/LunaCasinoAnmeldelse.tsx` | Refactor til CasinoTestLog |
| 7 | `src/components/LinkDensityMonitor.tsx` | Ny admin floating tool |
| 8 | `src/pages/Admin.tsx` | Integrér LinkDensityMonitor |

