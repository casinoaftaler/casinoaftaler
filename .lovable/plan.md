## Problem

Google viser den **tomme/tynde** meta description fra `index.html`:

> *"Casinoaftaler.dk – Din guide til online casinoer i Danmark."*

Dette er fallback-teksten i `index.html` linje 32. Fordi Google crawler (Googlebot) renderer JavaScript, burde React Helmet overskrive den – men i praksis vælger Google ofte den **statiske HTML-fallback** fra `<head>`, især for forsiden.

Casino Holdet har til sammenligning en rig, keyword-tung description med "bedste casinobonusser, eksklusive tilbud og gratis spins".

## Løsning

Opdater fallback meta description i `index.html` (linje 32) til at matche den rigtige SEO-description fra `Index.tsx`:

**Fra:**

```
Casinoaftaler.dk – Din guide til online casinoer i Danmark.
```

**Til:**

```
Find de bedste nye casinoer med bonus hos Casinoaftaler. Sammenlign nye casinoer, live casino, free spins og spil ansvarligt med vores uafhængige anmeldelser.
```

Også opdater `<title>` (linje 31) fra bare "Casinoaftaler" til det fulde title tag:

```
Casinoaftaler.dk - De bedste Online Casinoer 2026
```

## Hvorfor det virker

- Google ser den korrekte description allerede i den statiske HTML, **uden at vente på JavaScript-rendering**
- Matcher 1:1 med hvad React Helmet sætter dynamisk, så der er ingen konflikt
- Giver en fyldig, keyword-rig snippet der konkurrerer med Casino Holdet

## Fil der ændres

- `index.html` – linje 31-32: title + meta description