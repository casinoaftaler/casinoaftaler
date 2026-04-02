

# Plan: Erstat Lucide-ikoner med 3D WebP-ikoner på ALLE sider

## Problemet
Forsiden bruger allerede de flotte 3D WebP-ikoner via `MenuIcon`-komponenten, men **222 sider** og **251 komponenter** bruger stadig generiske Lucide SVG-ikoner (Star, Trophy, Shield, Zap, etc.) i deres indhold. Det giver et inkonsistent, "fladt" udseende sammenlignet med forsiden.

## Strategi

Da omfanget er enormt (14.000+ Lucide-brug fordelt på 380+ filer), opdeler vi arbejdet i faser med en smart tilgang:

### Fase 1: Opret en drop-in replacement-komponent
Lav en ny `ContentIcon`-komponent der automatisk vælger 3D WebP-ikon hvis det findes, og falder tilbage til Lucide som sidste udvej. Den mapper Lucide-komponentnavne (PascalCase) til `MENU_ICON_MAP`-nøgler (kebab-case).

```text
ContentIcon({ icon: "Zap", className: "h-6 w-6" })
  → finder "zap" i MENU_ICON_MAP
  → renderer <img src="lightning-fast.webp" />
```

### Fase 2: Tilføj manglende 3D-ikoner
Nogle Lucide-ikoner brugt i indhold har ikke et match i `MENU_ICON_MAP` endnu. Vi tilføjer mappings for:
- `Check` → circle-check.webp
- `X` → (nyt ikon eller rød variant)  
- `AlertTriangle` → (nyt ikon behøves)
- `Globe` → (nyt ikon behøves)
- `Headphones` → (nyt ikon behøves)

For ikoner uden eksisterende WebP-asset skal vi enten generere nye eller finde passende eksisterende (f.eks. `Globe` → `info-circle.webp`).

### Fase 3: Systematisk udskiftning - Reviews (højest prioritet)
Opdater alle **casino-anmeldelser** (Unibet, Bet365, Betano, Betinia, etc.) da disse er "money pages":
- Erstat `<Zap className="h-6 w-6 text-primary" />` med `<MenuIcon iconName="zap" className="h-6 w-6" />`
- Erstat `<Trophy>`, `<Star>`, `<Shield>`, `<Sparkles>`, `<Globe>`, `<Target>`, `<TrendingUp>`, `<CreditCard>`, `<Smartphone>`, `<Headphones>` osv.
- Behold `<Check>` og `<X>` i pro/con-lister som de er (de fungerer som funktionelle checkmarks/krydser, ikke dekorative ikoner)

### Fase 4: Slot-guides
Opdater alle slot-guides (Sweet Bonanza, Book of Dead, Wolf Gold, etc.) med samme mønster.

### Fase 5: Hub-sider og øvrige sider
- Betalingsmetoder, Casino Bonus, Live Casino, Casinospil-hubs
- Provider-sider, comparison-sider
- Community, ansvarligt spil, redaktionel politik

### Fase 6: Delte komponenter
Opdater komponenter der bruges på tværs af mange sider (FAQSection, RelatedGuides, InlineCasinoCards, etc.)

## Undtagelser (rør IKKE)
- **Admin-panel** (`src/pages/Admin.tsx`) — internt værktøj
- **UI-primitiver** (Button, Input, Checkbox) — funktionelle ikoner
- **Pro/Con-lister** med `<Check>` og `<X>` — semantiske checkmarks
- **Loader/spinner** ikoner (`Loader2`)
- **Navigation-ikoner** i header/sidebar (allerede konverteret)
- **ChevronRight/Left/Down** — strukturelle UI-elementer

## Teknisk tilgang
Hver fil opdateres ved at:
1. Tilføje `import { MenuIcon } from "@/components/MenuIcon"` 
2. Erstatte `<LucideIcon className="..." />` med `<MenuIcon iconName="kebab-name" className="..." />`
3. Fjerne ubrugte Lucide-imports

## Estimat
- ~60 review/guide-sider (højest prioritet)
- ~40 hub/kategori-sider
- ~30 komponenter
- Total: ~130 filer skal opdateres

Vil du godkende denne plan, så starter jeg med Fase 1-3?

