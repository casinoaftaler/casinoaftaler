

# Plan: Ensret AI Symbol Generering Stil

## Problem
Symbolerne genereres med forskellige stilarter og baggrunde, hvilket skaber visuel inkonsistens. Brugeren ønsker at alle symboler genereres med:
1. Samme kunststil som Anubis-symbolet
2. Samme baggrundstype som K/A bogstaverne (egyptisk tempel baggrund)

---

## Løsning

### Opdater `supabase/functions/generate-slot-symbol/index.ts`

Omskriv `BASE_STYLE` konstanten til at være mere detaljeret og konsistent, og opdater alle symbol-prompts til at følge samme struktur.

---

## Ændringer

### 1. Opdater `BASE_STYLE` konstanten

```typescript
// Fra (linje 10):
const BASE_STYLE = `Style: High-quality cartoon/game art style, clean lines, vibrant colors, detailed but stylized. Square 1:1 aspect ratio suitable for a slot machine symbol. Egyptian temple background with subtle columns and hieroglyphics. Warm golden color palette with rich amber tones.`;

// Til:
const BASE_STYLE = `
STYLE REQUIREMENTS (MANDATORY - MUST FOLLOW EXACTLY):
- Art style: High-quality digital painting, semi-realistic with stylized elements
- Rendering: Smooth gradients, soft shadows, polished game art quality
- Color palette: Warm golden and amber tones, with accents of deep blue, turquoise, and rich browns
- Lighting: Dramatic golden rim lighting from behind, creating a divine glow effect
- Detail level: High detail on the main subject, slightly softer background

BACKGROUND REQUIREMENTS (MANDATORY):
- Egyptian temple interior background
- Stone columns with hieroglyphic carvings visible on both sides
- Subtle torch light creating warm ambient glow
- Slightly blurred/depth-of-field background to make the symbol pop
- The background must fill the ENTIRE canvas edge-to-edge
- NO white borders, NO white edges, NO margins anywhere

FORMAT: Square 1:1 aspect ratio, suitable for a slot machine symbol.
`;
```

### 2. Opdater Premium Symbol Prompts (Anubis-stil)

Alle premium symboler (Pharaoh, Anubis, Horus, Scarab) får samme detaljerede stilbeskrivelse:

```typescript
// Anubis (reference stil)
if (normalizedName.includes("anubis")) {
  return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- The Egyptian god Anubis depicted as a bust/portrait
- Sleek black jackal head with elegant pointed ears
- Fur rendered with subtle sheen and detail
- Piercing golden/amber eyes with an intense, mysterious gaze
- Golden Egyptian usekh collar (broad collar) with lapis lazuli and turquoise inlays
- Golden earrings and ceremonial headdress elements
- Noble, powerful, and slightly menacing expression

COMPOSITION:
- Centered portrait filling most of the frame
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject

${BASE_STYLE}`;
}

// Pharaoh (samme stil som Anubis)
if (normalizedName.includes("pharaoh") || normalizedName.includes("farao")) {
  return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A majestic Egyptian Pharaoh depicted as a bust/portrait
- Golden nemes headdress with blue and gold stripes
- Royal uraeus cobra prominently on the forehead
- Strong, regal face with kohl-lined eyes
- Golden usekh collar with lapis lazuli, turquoise, and carnelian gems
- Powerful, commanding expression befitting a god-king

COMPOSITION:
- Centered portrait filling most of the frame
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject

${BASE_STYLE}`;
}
```

### 3. Opdater Common Symbol Prompts (K/A baggrund stil)

Alle bogstav/tal symboler får en mere simpel men konsistent stil:

```typescript
// Letter A (og lignende for K, Q, J, 10)
if (normalizedName === "a" || normalizedName.includes("letter a")) {
  return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate letter "A" as the central focus
- The letter is made of polished gold with a metallic sheen
- Decorated with subtle hieroglyphic engravings carved into the gold
- Small turquoise and lapis lazuli gem accents at key points
- The letter has depth and dimension (3D appearance)
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a golden artifact/treasure

${BASE_STYLE}`;
}
```

---

## Komplet Prompt Struktur

Alle prompts følger nu denne struktur:

```text
┌─────────────────────────────────────────────────────────────┐
│  1. INTRO: "Create a slot machine symbol for an Egyptian-  │
│            themed game."                                    │
├─────────────────────────────────────────────────────────────┤
│  2. MAIN SUBJECT: Detaljeret beskrivelse af symbolet       │
│     - Fysiske detaljer                                      │
│     - Materialer og teksturer                               │
│     - Farver og effekter                                    │
├─────────────────────────────────────────────────────────────┤
│  3. COMPOSITION: Placering og vinkel                        │
│     - Centreret, 3/4 view for karakterer                    │
│     - Fylder 70-80% af rammen                               │
├─────────────────────────────────────────────────────────────┤
│  4. BASE_STYLE: Fælles stil- og baggrundskrav              │
│     - Art style (semi-realistisk digital painting)          │
│     - Farvepalette (guld, amber, turkis, blå)               │
│     - Belysning (dramatisk gyldent rim light)               │
│     - Baggrund (egyptisk tempel, søjler, hieroglyffer)      │
│     - Format (1:1, ingen hvide kanter)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Fil der ændres

| Fil | Ændring |
|-----|---------|
| `supabase/functions/generate-slot-symbol/index.ts` | Opdater BASE_STYLE og alle symbol-prompts for konsistent stil |

---

## Eksempel på Før/Efter

### Før (inkonsistent):
- Anubis: "Sleek black jackal head..."
- K: "Stylized letter K in golden Egyptian style..."
- Pharaoh: "Majestic Egyptian Pharaoh bust..."

Hver har forskellige detaljeniveauer og ingen fælles struktur.

### Efter (konsistent):
Alle symboler har:
- Samme intro
- MAIN SUBJECT sektion med detaljerede beskrivelser
- COMPOSITION sektion
- Identisk BASE_STYLE med baggrunds- og stilkrav

