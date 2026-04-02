
# Audit: Erstat Lucide-ikoner med 3D WebP menu-ikoner sitewide

## Oversigt
En gennemgang af hele kodebasen viser **12+ offentligt synlige komponenter** der stadig bruger generiske Lucide SVG-ikoner, hvor de autentiske 3D WebP-billeder fra `MENU_ICON_MAP` burde bruges i stedet. Admin-paneler, UI-primitiver (checkboxes, dropdowns) og slot-spil gameplay-kontroller er **ikke** inkluderet — kun brugervendte indholdssektioner.

## Komponenter der skal opdateres

### 1. Footer.tsx (~40 Lucide-ikoner)
Den største synder. Hver footer-link bruger Lucide-ikoner (`Star`, `Trophy`, `Gamepad2`, `CreditCard`, `Shield`, `Scale`, `FileText`, `Newspaper` osv.). Alle har direkte mappings i `MENU_ICON_MAP`.

### 2. CommunityNav.tsx (8 ikoner)
Bruger Lucide-komponenter (`Home`, `Gamepad2`, `Target`, `Trophy`, `Video`, `Crown`, `Gift`, `ShoppingBag`). Skal erstattes med `<img>` fra `MENU_ICON_MAP`.

### 3. BonusHuntCommunityLinks.tsx (10 ikoner)
Alle community-kort bruger Lucide (`Gamepad2`, `Trophy`, `Video`, `RotateCw`, `Gift`, `ShoppingBag`, `Archive`, `Database`, `Crown`, `BarChart3`).

### 4. BonusHuntRelatedGuides.tsx (6 ikoner)
Guide-kort med `TrendingUp`, `BookOpen`, `ShieldCheck`, `Gamepad2`, `CreditCard`, `Users`.

### 5. BonusHuntStatStrip.tsx (3 ikoner)
Stat-kort med `Target`, `Film`, `BarChart3`.

### 6. WhyTrustUs.tsx (5 ikoner)
Trust-sektion med `ShieldCheck`, `BarChart3`, `Scale`, `Eye`, `Award`.

### 7. ReviewMoneyLinks.tsx (4-5 ikoner)
Pills med `Trophy`, `Gift`, `Sparkles`, `Smartphone`.

### 8. CommunityPromoSection.tsx (3 ikoner)
Bruger `Sparkles`, `Video`, `Trophy` i knapper.

### 9. NewsContextualCTA.tsx (6+ ikoner)
Kontekstuelle CTA-links med `ShieldCheck`, `Sparkles`, `CreditCard`, `BarChart3`, `Landmark`, `Gift`.

### 10. ContentSidebar.tsx (8+ ikoner)
Sidebar-kategori-ikoner med `Crown`, `Sparkles`, `Gift`, `Dices`, `CreditCard`, `Gamepad2`, `Tv`, `Star`.

### 11. TestMetodeSeoContent.tsx (12+ ikoner)
Test-metode sektionen med `Shield`, `TrendingUp`, `Target`, `BarChart3`, `Zap`, `Scale`, `Eye`, `Database` osv.

### 12. HomepageBottomSections.tsx (delvist allerede konverteret)
`HomepageBonusHuntSection` bruger allerede `MenuIcon`, men `HomepageTrendsSection` bruger stadig `CheckCircle2`, og `HomepageSlotShowcase` bruger `Sparkles`.

### 13. QuickFactsProviders.tsx
Bruger `ShieldCheck`, `BarChart3` som Lucide.

## Teknisk tilgang

Opretter en genbrugelig `MenuIcon`-komponent (eller genbruger den eksisterende fra `HomepageBottomSections.tsx`) og importerer den i alle berørte filer. Mønsteret:

```text
// FØR:
<Trophy className="h-4 w-4" />

// EFTER:
<MenuIcon iconName="trophy" alt="Trophy" className="h-4 w-4" />
```

For ikoner der ikke har en mapping (fx `Eye`, `Film`), beholdes Lucide som fallback, eller der tilføjes en fallback i `MenuIcon`-komponenten.

### Fælles MenuIcon-komponent
Flyttes til sin egen fil `src/components/MenuIcon.tsx` så alle komponenter kan importere den uden circular dependencies.

## Scope-afgrænsning

**Inkluderet**: Alle offentligt synlige sektioner (footer, navigation, promo-sektioner, guide-kort, sidebars, trust-sektioner, CTA-pills, stat-strips).

**Ekskluderet**: 
- Admin-paneler og dashboards
- UI-primitiver (checkbox, dropdown, toast, calendar)
- Slot-spil gameplay-kontroller (spin-knapper, bet-kontroller)
- Social media SVG-ikoner (custom SVGs i footer)
- Casino-anmeldelse sider (individuelle review-pages bruger ikoner i kontekst-specifik body-tekst)

## Estimeret omfang
~12-15 filer ændres. Ingen database- eller backendændringer.
