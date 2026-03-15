

## Plan: Tilføj kategori-baserede visuelle thumbnails til "Artikler skrevet af" sektionen

### Problem
"Artikler skrevet af" sektionen viser kun tekst-kort (billede 2), mens "Seneste artikler fra redaktionen" på /om-siden viser kort med billeder (billede 1). Artiklerne er statiske guides uden individuelle hero-billeder.

### Løsning
Skab visuelt tiltalende kort med **CSS-gradient thumbnails + kategori-ikon** som placeholder. Ingen ekstra billeder downloades = nul performance-impact. Kortene får samme layout som nyhedskortene: billede øverst, tekst nedenunder.

### Tekniske ændringer

**1. Ny utility: `src/lib/categoryThumbnails.ts`**
- Eksporterer en funktion `getCategoryGradient(category: string)` der returnerer en CSS gradient + ikon baseret på kategori:
  - "Guide" → blå/lilla gradient + BookOpen ikon
  - "Slot Guide" → grøn/teal gradient + Gamepad2 ikon
  - "Anmeldelse" → orange/amber gradient + Star ikon
  - "Ordbog" → indigo gradient + FileText ikon
  - "Community" → pink/rose gradient + Users ikon
  - osv.

**2. Opdater alle 4 forfatter-sider** (article-grid sektionen):
- `src/pages/Forfatter.tsx` (Jonas)
- `src/pages/ForfatterKevin.tsx`
- `src/pages/ForfatterNiklas.tsx`
- `src/pages/ForfatterAjse.tsx` (hvis den findes)

Ændring i hver fil: Erstat det nuværende tekst-kun kort med et kort der har et `aspect-video` gradient-felt øverst (med kategori-ikon centreret), efterfulgt af badge + titel + excerpt nedenunder. Samme layout som nyhedskortene på /om.

**Før (nuværende):**
```text
┌─────────────────────────┐
│ [Badge: Guide]          │
│ Titel                   │
│ Excerpt...              │
└─────────────────────────┘
```

**Efter (nyt):**
```text
┌─────────────────────────┐
│  ┌───────────────────┐  │
│  │   gradient bg      │  │
│  │    📖 ikon         │  │
│  └───────────────────┘  │
│ 12. marts 2026 · Guide  │
│ Titel                   │
│ Excerpt...              │
└─────────────────────────┘
```

**3. Grid layout ændring:**
- Fra `md:grid-cols-2` til `md:grid-cols-2 lg:grid-cols-3` for at matche nyhedskortenes 3-kolonne layout.

### Performance
- Ingen nye billeder, ingen ekstra netværksanmodninger
- Pure CSS gradients er GPU-accelererede
- Ingen ændring i bundle-størrelse ud over ~30 linjer utility-kode

