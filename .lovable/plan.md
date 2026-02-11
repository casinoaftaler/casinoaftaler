
## Merge "Brugeroversigt" ind i "Giv Credits til Brugere"

### Hvad bliver lavet
- **ProfileCompletionStatsCard** splittes: stat-oversigten (4 kort + progress bar) forbliver i toppen af Brugere-fanen, men "Brugeroversigt"-tabellen (den med profilfuldforelses-kolonner) fjernes som separat sektion
- Profilfuldforelses-kolonnerne (Profil, Stats, Favoritter, Spillestil, Status) tilfojes direkte i brugerraekken i **SpinManagementSection**
- SpinManagementSection omdoebes fra "Giv Credits til Brugere" til bare **"Brugere"**
- Data fra `useProfileCompletionStats` hook integreres i SpinManagementSection sa hver brugerraekke viser bade credits, ban-status OG profilfuldforelse

### Brugeroplevelse
- Stat-kortene (Totalt brugere, Profiler fuldfort, osv.) forbliver synlige i toppen
- En enkelt brugerliste viser alt: navn, avatar, credits, profilfuldforelsesgrad, og ban/unban
- Mindre rod, ingen duplikerede brugerlister

### Tekniske detaljer

**1. `src/components/SpinManagementSection.tsx`**
- Omdob CardTitle fra "Giv Credits til Brugere" til "Brugere"
- Importer `useProfileCompletionStats` hook
- Merge profil-completion data ind i brugerraekker: vis `sections_completed/4` badge og individuelle sektionsindikatorer (check/X ikoner)
- Tilfoej profilfuldforelses-kolonner i hver brugerraekke (kompakt visning med en badge der viser f.eks. "3/4")

**2. `src/pages/Admin.tsx`**
- Fjern den separate "Profilfuldforelse" sektion med header + `ProfileCompletionStatsCard`
- Behold kun stat-oversigten i toppen -- importer stats-delen direkte fra `useProfileCompletionStats` og vis stat-kortene + progress bar
- Fjern import af `ProfileCompletionStatsCard` (eller behold kun stat-delen)

**3. `src/components/ProfileCompletionStatsCard.tsx`**
- Eksporter stat-oversigts-delen som en separat komponent (`ProfileCompletionOverview`) sa den kan bruges standalone i Admin.tsx uden brugertabellen
