

# Plan: Opdater Scatter og Premium Symboler Stil

## Problem
1. **Scatter symbolet** (katten på bogen) mangler premium-stilen med ramme
2. **Premium symbolerne** skal have rammen helt ud til kanten af billedet

---

## Løsning

### Opdater `supabase/functions/generate-slot-symbol/index.ts`

---

## Ændringer

### 1. Opdater `PREMIUM_FRAME` konstanten

Gør det tydeligt at rammen skal gå helt ud til billedets kant:

```typescript
const PREMIUM_FRAME = `
FRAME/BORDER REQUIREMENTS (MANDATORY):
- Add an ornate golden Egyptian-style frame/border around the ENTIRE image
- The frame MUST touch ALL FOUR EDGES of the image (no gaps at edges)
- Frame width: approximately 5-8% of the image on each side
- Frame design: Intricate golden border with hieroglyphic patterns
- Corner decorations: Small golden lotus flowers or scarab motifs
- The frame should have depth and dimension (3D appearance)
- Inner edge of frame: subtle golden glow effect
- The artwork must extend FULLY to the inner edge of the frame (no gaps)
- CRITICAL: The outer edge of the frame must be FLUSH with the image boundary
`;
```

### 2. Opdater Scatter Symbol Prompt

Tilføj premium-stil og ramme, men behold den eksisterende kat og bog beskrivelse:

```typescript
if (isScatter || normalizedName.includes("fedesvin") || normalizedName.includes("book")) {
  return `Create a slot machine symbol for an Egyptian-themed game called "Book of Fedesvin".

MAIN SUBJECT (MUST KEEP EXACTLY AS DESCRIBED):
- A CHUBBY/FAT gray and white cat (similar to British Shorthair) sitting comfortably
- The cat has green eyes and a sweet, slightly smug expression
- The cat wears an Egyptian pharaoh headdress (nemes) in gold and blue stripes
- A decorative golden collar with blue gems around the cat's neck
- The cat is sitting ON TOP of an ancient Egyptian golden book
- The book has ornate golden decorations with winged scarab and gems on the spine/cover
- A red bookmark ribbon visible from the book

COMPOSITION:
- FULL ART: The cat and book must fill the ENTIRE frame edge-to-edge
- Cat and book centered as the main focus
- Golden divine light emanating from behind
- NO empty space - the artwork extends to all edges

${PREMIUM_FRAME}

${BASE_STYLE}

This is a "Book of the Dead" themed scatter/wild symbol for a slot game.`;
}
```

---

## Visuelt Resultat

```text
┌─────────────────────────────────────────────────────┐
│  SCATTER SYMBOL (nu med premium ramme)              │
│                                                     │
│  ╔═══════════════════════════════════════════════╗  │
│  ║  🌿     GOLDEN FRAME (til kanten)      🌿     ║  │
│  ║ ┌─────────────────────────────────────────┐   ║  │
│  ║ │                                         │   ║  │
│  ║ │      🐱 FEDESVIN CAT (uændret)         │   ║  │
│  ║ │           på golden bog                 │   ║  │
│  ║ │         (fylder hele rammen)            │   ║  │
│  ║ │                                         │   ║  │
│  ║ └─────────────────────────────────────────┘   ║  │
│  ║  🪷       HIEROGLYFFER (til kanten)    🪷    ║  │
│  ╚═══════════════════════════════════════════════╝  │
│       ↑ Rammen rører alle 4 kanter af billedet     │
└─────────────────────────────────────────────────────┘
```

---

## Fil der ændres

| Fil | Ændring |
|-----|---------|
| `supabase/functions/generate-slot-symbol/index.ts` | Opdater PREMIUM_FRAME og scatter prompt |

---

## Tekniske Detaljer

### Frame til kanten:
- Tilføj "MUST touch ALL FOUR EDGES" instruktion
- Tilføj "outer edge FLUSH with image boundary" for klarhed
- Fjerner enhver mulighed for hvide kanter

### Scatter symbol bevarelse:
- Alle beskrivelser af katten forbliver identiske
- Alle beskrivelser af bogen forbliver identiske
- Kun COMPOSITION og ramme/stil tilføjes

