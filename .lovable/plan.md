

## Analyse af Lighthouse-resultatet for /forfatter/jonas

**Scores**: Performance 92 | Accessibility 93 | Best Practices 77 | SEO 100

### Hvad er godt
- SEO 100 -- perfekt
- TBT 0ms, CLS 0.015 -- excellent
- FCP 1.2s og LCP 1.5s -- acceptabelt

### De to reelle problemer

**1. Ingen cache-headers på first-party assets (5,095 KiB spild)**

`public/_headers` har kun 3 linjer (sitemap link + robots tag). Der er ingen cache-control headers, så browseren downloader alle assets forfra ved hvert besøg.

**Fix**: Tilføj cache-headers til `public/_headers`:
- Immutable assets (`/assets/*` -- Vite-hashed filer): `Cache-Control: public, max-age=31536000, immutable`
- Statiske billeder i `/public` (avatarer, logos): `Cache-Control: public, max-age=604800` (7 dage)
- HTML: `Cache-Control: no-cache` (altid frisk)

**2. Avatar-billeder er ~1.4 MB per styk**

`jonas-forfatter.webp` (1,472 KiB), `kevin-avatar.webp` (1,465 KiB), `jonas-avatar.webp` (1,455 KiB) -- disse vises som 176x176px profilbilleder men vejer over 1 MB hver. Det er 10-20x for stort.

**Fix**: Vi kan ikke resize filer direkte, men vi kan:
- Tilføje `width` og `height` attributter (allerede gjort de fleste steder)
- Bruge `fetchpriority="low"` på avatarer der er below-the-fold
- Anbefale dig at re-uploade optimerede versioner (under 50 KiB per avatar)

**3. Best Practices 77 -- third-party cookies**

Cookiebot og Ahrefs sætter cookies. Det er **ikke noget vi kan fikse** -- det er eksterne services. Google straffer ikke for dette.

### Plan

1. **Udvid `public/_headers`** med korrekte cache-control headers for alle asset-typer
2. **Tilføj `fetchpriority="low"` og `loading="lazy"`** på avatar-billeder i AuthorBio og AuthorMetaBar der ikke er LCP-elementer
3. Anbefale re-upload af optimerede avatar-billeder (separat handling)

