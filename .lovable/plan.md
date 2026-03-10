

## Analyse af de 5 issues

### 1. `index.html` fallback (LAV) ✅ Allerede håndteret
Forsiden matcher allerede. Undersider der failer JS-rendering vil altid vise generisk tekst i en SPA – dette løses kun med prerendering, som er et separat projekt. **Ingen ændring nødvendig nu.**

### 2. Sitemap HTML noindex (LAV) ✅ Korrekt
`noindex, follow` er best practice – crawlere følger links men indekserer ikke selve sitemap-siderne. **Ingen ændring nødvendig.**

### 3. `/community/slots` i seoRoutes vs robots.txt (LAV) ✅ Korrekt
Hubben `/community/slots` er tilladt, kun undersider `/community/slots/` er disallowed. **Ingen ændring nødvendig.**

### 4. `lastmod`-synkronisering (MEDIUM) ⚠️ Kan forbedres
210 ruter har `lastmod: "2026-03-08"` – mange uden faktiske ændringer. Google kan mistro freshness-signaler.

**Anbefaling:** Nulstil lastmod til realistiske datoer for sider der ikke blev ændret den 8. marts. Men dette kræver at I ved *hvornår* siderne faktisk sidst blev redigeret. GitHub Actions workflowet (`update-lastmod.yml`) håndterer dette automatisk fremover – problemet er at en batch-opdatering satte alle til samme dato.

**Plan:** Opdater sider der **faktisk** blev ændret 8.-10. marts til korrekte datoer, og sæt resten tilbage til en ældre dato (fx `2026-03-01` eller deres faktiske launch-dato). Dette er dog en stor manuel opgave med 210 ruter.

**Pragmatisk løsning:** Lad det være. GitHub Actions workflowet vil gradvist rette lastmod-datoerne efterhånden som sider faktisk ændres. Google bruger primært sin egen crawl-cache til freshness, ikke lastmod alene.

### 5. Sourcemap i produktion (LAV) ⚠️ Nem fix
`sourcemap: true` eksponerer kildekode. Ingen SEO-impact, men en sikkerhedsrisiko.

**Plan:** Sæt `sourcemap: false` i `vite.config.ts` (linje ~218).

---

## Anbefalet handling

Kun **én ændring** giver reel værdi:

1. **Slå sourcemaps fra i produktion** – `sourcemap: true` → `sourcemap: false` i `vite.config.ts`

De øvrige 4 issues er enten allerede korrekt håndteret eller løses automatisk over tid via det eksisterende GitHub Actions workflow.

