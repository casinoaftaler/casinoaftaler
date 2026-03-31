

# Plan: Erstat Lucide-ikoner med 3D WebP menu-ikoner på forsiden

## Problem
Forsiden bruger generiske Lucide-ikoner (CreditCard, Gamepad2, Trophy, etc.) til betalingsmetoder, spiludviklere og link-knapper — mens mega-menuen bruger flotte 3D WebP-ikoner fra `MENU_ICON_MAP`. Det skaber visuel inkonsistens.

## Berørte filer og ændringer

### 1. `src/components/HomepagePaymentProviders.tsx`
- **Betalingsmetoder-sektionen**: Erstat `<CreditCard>` Lucide-ikon med det korrekte 3D WebP-ikon per betalingsmetode (baseret på `PAYMENT_LINKS` i navData: apple→apple.webp, smartphone→mobile, wallet, credit-card, banknote, send, shield, landmark, circle-dollar-sign)
- **Spiludvikler-sektionen**: Erstat `<Gamepad2>` Lucide-ikon med `gamepad-fun.webp` fra MENU_ICON_MAP

### 2. `src/components/HomepageBottomSections.tsx`
- **Bonus Hunt links** (linje 146-174): Erstat Lucide-ikoner (Target, BookOpen, Gamepad2, Trophy, TrendingUp, Users) med matchende 3D WebP-ikoner (target-aim, book-glossary, gamepad-fun, trophy-casino, trending-rtp, users-group)
- **Slot Showcase links** (linje 301-312): Erstat Zap→lightning-fast, Trophy→trophy-casino, Gift→gift-bonus
- **Nyheder-link** (linje 191): Erstat Newspaper→newspaper.webp

### 3. Implementeringsmetode
- Importér `MENU_ICON_MAP` fra `@/components/header/menuIconMap`
- Lav en lille hjælpekomponent `MenuIcon` der renderer `<img>` med det korrekte WebP-ikon baseret på iconName, med fallback til Lucide-ikon
- Tilføj `iconName` til betalingsmetode-arrayet (matching navData's PAYMENT_LINKS)
- Erstat alle inline `<LucideIcon>` med `<MenuIcon>` i link-cards

### 4. Ikke berørt
- `HomepageTopProviders.tsx` bruger allerede provider-logoer (korrekt)
- `HomepageAnmeldelserSection` bruger allerede casino-logoer (korrekt)
- Trends-sektionens CheckCircle2 er generisk og passer fint som er

