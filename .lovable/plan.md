Mål: flytte intern autoritet hurtigt og tydeligt til `/top-10-casino-online`, sekundært `/casino-bonus`, med kun 2 ændringsflader:

1. `src/lib/entityAutoLinker.ts`
2. alle review pages i `src/pages/*Anmeldelse.tsx`

## DEL 1 — `entityAutoLinker.ts`

### Hvad jeg ville ændre

Jeg ville ikke lave en bred omskrivning af hele mappings-systemet. I stedet ville jeg lægge en hård “money-page override” ind øverst i `autoLinkEntities()` før den normale `ENTITY_MAPPINGS`-loop kører.

### Formål

Tvinge første relevante brede casino-intent til money pages først, uanset hvad andre mappings ellers matcher senere.

### Konkret logik

Indfør en lokal prioriteret liste direkte i `entityAutoLinker.ts`:

```ts
const PRIORITY_MONEY_RULES = [
  {
    href: "/top-10-casino-online",
    patterns: [
      /\bonline casino(er)?\b/i,
      /\bbedste online casino(er)?\b/i,
      /\bonline casino(er)? i (danmark|dk)\b/i,
    ],
    anchorText: "bedste online casinoer",
    priority: 1,
  },
  {
    href: "/casino-bonus",
    patterns: [/\bcasino bonus\b/i, /\bcasinobonus\b/i],
    anchorText: "casino bonusser",
    priority: 2,
  },
  {
    href: "/velkomstbonus",
    patterns: [/\bvelkomstbonus\b/i, /\bvelkomst-bonus\b/i],
    anchorText: "velkomstbonus",
    priority: 3,
  },
  {
    href: "/free-spins-i-dag",
    patterns: [
      /\bfree spins i dag\b/i,
      /\bgratis spins i dag\b/i,
      /\bdagens free spins\b/i,
    ],
    anchorText: "free spins i dag",
    priority: 4,
  },
  {
    href: "/casino-med-mobilepay",
    patterns: [
      /\bcasino med MobilePay\b/i,
      /\bMobilePay casino\b/i,
      /\bcasinoer med MobilePay\b/i,
    ],
    anchorText: "casinoer med MobilePay",
    priority: 5,
  },
];
```

### Prioriteringslogik

Kør i denne rækkefølge:

1. Scan HTML for `PRIORITY_MONEY_RULES` først
2. Indsæt kun første valide match pr. rule
3. Stop når der er sat 2-3 money links totalt
4. Først derefter kører eksisterende `ENTITY_MAPPINGS`
5. Under den normale loop:
  - skip hvis `entity.href` allerede er linked
  - skip hvis money-link cap er nået
  - hvis både money page og utility/guide kan matche samme tekst, så vinder money page altid, fordi den allerede er behandlet først

### Max 2-3 money links pr. side

Jeg ville indføre en simpel tæller:

```ts
const MAX_MONEY_LINKS = 3;
let moneyLinksInserted = 0;
const linkedHrefs = new Set<string>();
```

### Pseudo-kode for flow

```ts
export function autoLinkEntities(html: string): string {
  if (!html) return html;

  let result = html;
  const linkedHrefs = new Set<string>();
  let moneyLinksInserted = 0;

  // 1. Hårde money-page overrides først
  for (const rule of PRIORITY_MONEY_RULES) {
    if (moneyLinksInserted >= MAX_MONEY_LINKS) break;
    if (linkedHrefs.has(rule.href)) continue;

    const inserted = tryInsertFirstValidLink({
      html: result,
      patterns: rule.patterns,
      href: rule.href,
      anchorText: rule.anchorText,
    });

    if (inserted) {
      result = inserted.html;
      linkedHrefs.add(rule.href);
      moneyLinksInserted += 1;
    }
  }

  // 2. Eksisterende mappings bagefter
  for (const entity of ENTITY_MAPPINGS) {
    if (linkedHrefs.has(entity.href)) continue;

    // hvis entity er money-page og cap er nået => skip
    if (
      moneyLinksInserted >= MAX_MONEY_LINKS &&
      [
        "/top-10-casino-online",
        "/casino-bonus",
        "/velkomstbonus",
        "/free-spins-i-dag",
        "/casino-med-mobilepay",
      ].includes(entity.href)
    ) {
      continue;
    }

    // eksisterende match/replace logik
    // ...
  }

  return result;
}
```

### Praktisk effekt

Det giver præcis den adfærd du vil have:

- brede casino-termer sendes først til `/top-10-casino-online`
- bonus-intents sendes først til deres money pages
- senere glossary/guide-matches får ikke lov at “stjæle” de vigtige første links
- overlinking holdes nede

## DEL 2 — Review template ændringer (`/casino-anmeldelser/*`)

### Hvad jeg ville gøre

Ikke footer. Ikke et nyt modul. Ikke refactor.
Jeg ville indsætte én fast, tydelig CTA-blok direkte i hver review-template samme sted:

**placering:**
lige efter

```tsx
<AuthorMetaBar ... />
<CasinoReviewHero ... />
```

og lige før første indholds-`<section>`.

Det er den mest stabile fælles placering jeg kan se på tværs af review-siderne.

### JSX-eksempel

```tsx
<section className="mb-10">
  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
    <h2 className="text-xl font-bold mb-3">Bedste online casinoer i Danmark</h2>
    <div className="flex flex-col gap-3">
      <Link
        to="/top-10-casino-online"
        className="inline-flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 font-medium text-primary hover:underline"
      >
        Se de bedste online casinoer
      </Link>

      <Link
        to="/casino-bonus"
        className="inline-flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 font-medium text-primary hover:underline"
      >
        Se aktuelle casino bonusser
      </Link>

      {/* kun på relevante reviews */}
      <Link
        to="/casino-med-mobilepay"
        className="inline-flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 font-medium text-primary hover:underline"
      >
        Se casinoer med MobilePay
      </Link>
    </div>
  </div>
</section>
```

### Helt præcis placering i template

Eksempel på mønster i review-filer:

```tsx
<div className="container py-8 md:py-12">
  <AuthorMetaBar author="jonas" readTime="..." />
  <CasinoReviewHero slug="..." casinoName="..." />

  {/* INDSÆT CTA-BLOK HER */}

  <section className="mb-12">
    ...
  </section>
</div>
```

### Hvilke links på hvilke reviews

- På **alle** review pages:
  - `/top-10-casino-online`
  - `/casino-bonus`
- På **kun relevante** review pages:
  - `/casino-med-mobilepay`
- Relevans kan holdes ultra simpelt:
  - tilføj MobilePay-link kun hvis siden allerede nævner MobilePay / betalingsmetoder / hurtige danske indbetalinger
  - ellers behold kun 2 links

### Hvorfor dette er høj-impact

Det giver et direkte, sitewide flow fra alle review-sider til din vigtigste money page.
Review-siderne er stærke, kommercielt relevante og allerede tæt på mål-intent. Derfor er det den hurtigste interne autoritetsgenvej uden at røre resten af systemet.

## DEL 3 — Ultra simpel prioritering

### Dag 1

1. Ret `entityAutoLinker.ts`
  - læg priority money rules ind
  - cap money links til max 3
  - lad eksisterende mappings køre bagefter
2. Ret review templates
  - indsæt den faste CTA-blok efter `CasinoReviewHero`
  - alle reviews får Top 10 + Casino Bonus
  - kun relevante reviews får MobilePay som tredje link

### Dag 2

Deploy kun disse ændringer.
Ingen ekstra moduler.
Ingen ekstra brede SEO-greb.
Ingen ændringer andre steder.

### Dag 7–14

Mål kun disse ting i GSC:

1. `/top-10-casino-online`
  - impressions
  - average position
  - clicks
2. `/casino-bonus`
  - impressions
  - average position
  - clicks
3. Query-grupper:
  - “online casino”
  - “bedste casino”
  - “top casino”
  - “casino bonus”
4. Crawl/index signaler:
  - om de to URL’er får øget intern eksponering i performance over tid

## Kort implementeringsprincip

- Ingen stor refactor
- Ingen nye moduler
- Ingen fase 2/3
- Kun to flader
- Maksimal intern autoritet til `/top-10-casino-online`
- Sekundært løft til `/casino-bonus`

Det her er den mest direkte 1-2 timers implementering med størst sandsynlig SEO-effekt nu.