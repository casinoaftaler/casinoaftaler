
# Plan: Tilføj beskrivelsestekst til Butik-siden

## Oversigt
Tilføj en beskrivende header-tekst under "Butik" overskriften, der forklarer at produkterne kun kan købes med Twitch-point.

## Ændringer

### Fil: src/pages/Shop.tsx

Tilføj den angivne beskrivelsestekst som en paragraph under h1 overskriften i alle tre render-tilstande (loading, error og normal):

**Teksten der tilføjes:**
> "Her kan du shoppe eksklusive varer, men der er en lille twist – alt her kan kun købes med point, som du optjener ved at se vores streams på Twitch! Det betyder, at jo mere du ser, desto flere point tjener du, og desto flere fede produkter kan du få fat i. Så det er bare at sætte dig godt til rette, nyde vores streams, og se pointene rulle ind. Gå på opdagelse i vores udvalg og start din rejse mod de unikke præmier i dag!"

**Styling:**
- Tilføjes som en `<p>` tag med passende styling (`text-muted-foreground`, `mb-8`, `max-w-3xl`)
- Placeres direkte under h1 overskriften
- Maksimal bredde for bedre læsbarhed på store skærme

---

## Tekniske detaljer

Ændringer på linje 12, 30, og 38 hvor `<h1>` overskriften er, tilføjes en paragraph med beskrivelsen:

```tsx
<h1 className="text-3xl font-bold mb-4">Butik</h1>
<p className="text-muted-foreground mb-8 max-w-3xl">
  Her kan du shoppe eksklusive varer, men der er en lille twist – alt her kan kun købes med point, som du optjener ved at se vores streams på Twitch! Det betyder, at jo mere du ser, desto flere point tjener du, og desto flere fede produkter kan du få fat i. Så det er bare at sætte dig godt til rette, nyde vores streams, og se pointene rulle ind. Gå på opdagelse i vores udvalg og start din rejse mod de unikke præmier i dag!
</p>
```

Margin på h1 ændres fra `mb-8` til `mb-4` for at skabe bedre visuel sammenhæng mellem overskrift og beskrivelse.
