

# Plan: Tilføj Fuld Kunst og Ramme til Premium Symboler

## Problem
Premium symbolerne (Pharaoh, Anubis, Horus, Scarab) mangler:
1. Fuld kunst der fylder hele billedet
2. En dekorativ ramme/border omkring symbolet

---

## Løsning

### Opdater `supabase/functions/generate-slot-symbol/index.ts`

Tilføj specifikke krav til premium symboler om fuld kunst og dekorativ egyptisk ramme.

---

## Ændringer

### 1. Tilføj ny `PREMIUM_FRAME` konstant

```typescript
const PREMIUM_FRAME = `
FRAME/BORDER REQUIREMENTS (MANDATORY FOR PREMIUM SYMBOLS):
- Add an ornate golden Egyptian-style frame/border around the entire image
- The frame should be approximately 5-8% of the image width on each side
- Frame design: Intricate golden border with hieroglyphic patterns
- Corner decorations: Small golden lotus flowers or scarab motifs
- The frame should have depth and dimension (3D appearance)
- Inner edge of frame: subtle golden glow effect
- The artwork must extend FULLY to the inner edge of the frame (no gaps)
`;
```

### 2. Opdater alle Premium Symbol Prompts

Tilføj "full art" og frame-krav til Pharaoh, Anubis, Horus og Scarab:

**Pharaoh:**
```typescript
if (normalizedName.includes("pharaoh") || normalizedName.includes("farao")) {
  return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A majestic Egyptian Pharaoh depicted as a bust/portrait
- Golden nemes headdress with blue and gold stripes
- Royal uraeus cobra prominently on the forehead
- Strong, regal face with kohl-lined eyes
- Golden usekh collar (broad collar) with lapis lazuli, turquoise, and carnelian gems
- Powerful, commanding expression befitting a god-king
- Skin with a warm, bronze tone

COMPOSITION:
- FULL ART: The Pharaoh must fill the ENTIRE frame edge-to-edge
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject
- NO empty space - the artwork extends to all edges

${PREMIUM_FRAME}

${BASE_STYLE}`;
}
```

**Anubis:**
```typescript
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
- FULL ART: Anubis must fill the ENTIRE frame edge-to-edge
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject
- NO empty space - the artwork extends to all edges

${PREMIUM_FRAME}

${BASE_STYLE}`;
}
```

**Horus:**
```typescript
if (normalizedName.includes("horus")) {
  return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- The Egyptian god Horus depicted as a bust/portrait
- Majestic falcon head with detailed feathers in brown, gold, and white
- Sharp, piercing golden eyes with divine intensity
- Golden and blue pschent (double crown) or sun disk headdress
- Golden usekh collar with Eye of Horus motifs
- Regal and divine appearance befitting the sky god

COMPOSITION:
- FULL ART: Horus must fill the ENTIRE frame edge-to-edge
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject
- NO empty space - the artwork extends to all edges

${PREMIUM_FRAME}

${BASE_STYLE}`;
}
```

**Scarab:**
```typescript
if (normalizedName.includes("scarab")) {
  return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A sacred golden scarab beetle, highly detailed
- Wings spread outward in a majestic display
- Body encrusted with turquoise, lapis lazuli, and ruby gems
- Holding the sun disk above its head
- Intricate golden filigree and hieroglyphic patterns on the wings
- Polished, reflective gold surface with depth

COMPOSITION:
- FULL ART: The scarab must fill the ENTIRE frame edge-to-edge
- Wings spread symmetrically touching the frame edges
- Sun disk creating a golden glow above
- NO empty space - the artwork extends to all edges

${PREMIUM_FRAME}

${BASE_STYLE}`;
}
```

---

## Visuelt Resultat

```text
┌─────────────────────────────────────────────────────┐
│  PREMIUM SYMBOL (med ramme)                         │
│  ┌───────────────────────────────────────────────┐  │
│  │ ╔═══════════════════════════════════════════╗ │  │
│  │ ║  🌿        GOLDEN FRAME         🌿        ║ │  │
│  │ ║ ┌─────────────────────────────────────┐  ║ │  │
│  │ ║ │                                     │  ║ │  │
│  │ ║ │      FULL ART PHARAOH/ANUBIS       │  ║ │  │
│  │ ║ │        (fylder hele rammen)         │  ║ │  │
│  │ ║ │                                     │  ║ │  │
│  │ ║ └─────────────────────────────────────┘  ║ │  │
│  │ ║  🪷        HIEROGLYFFER         🪷       ║ │  │
│  │ ╚═══════════════════════════════════════════╝ │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## Fil der ændres

| Fil | Ændring |
|-----|---------|
| `supabase/functions/generate-slot-symbol/index.ts` | Tilføj PREMIUM_FRAME konstant og opdater premium symbol prompts |

---

## Tekniske Detaljer

### Frame Specifikation:
- **Bredde**: Ca. 5-8% af billedets bredde på hver side
- **Design**: Gylden egyptisk stil med hieroglyffer
- **Hjørner**: Lotus blomster eller scarab motiver
- **3D effekt**: Dybde og dimension i rammen
- **Glow**: Subtil gylden glød på indersiden

### Full Art Krav:
- Ingen tomme områder inden for rammen
- Motivet strækker sig til alle kanter af den indre ramme
- Baggrunden (tempel) fylder alt bag motivet

