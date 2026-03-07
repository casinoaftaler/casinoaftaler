

## Audit: Money Pages → Ordbog Linking

### Status

**Ordbog → Money pages**: Fungerer via `relatedPages` kort på alle 66 termer. ✅

**Money pages → Ordbog**: Delvist implementeret. Auto-linkeren (`entityAutoLinker.ts`) virker KUN på HTML-strenge (nyhedsartikler + ordbog-termer). Alle money pages er statisk JSX og kræver manuelle `<Link>` indsættelser.

### Nuværende dækning

**Money pages MED ordbog-links** (13 sider — allerede gode):
- CasinoBonus.tsx (rtp, house-edge, wagering, volatilitet)
- Spillemaskiner.tsx (rtp, volatilitet, house-edge)
- FreeSpins.tsx (rtp, volatilitet)
- Omsaetningskrav.tsx (wagering)
- Velkomstbonus.tsx (rtp)
- NoStickyBonus.tsx (rtp)
- CashbackBonus.tsx (house-edge)
- Indskudsbonus.tsx (rtp)
- StickyBonus.tsx (house-edge)
- ReloadBonus.tsx (rtp)
- Casinospil.tsx (rtp, volatilitet, house-edge)
- SpillemaskinerHoejRTP.tsx (house-edge)
- LiveCasino.tsx (house-edge)
- BonusUdenOmsaetningskrav.tsx (house-edge)
- 27+ casinospil/slot/live-casino guides (house-edge, rtp, etc.)

### Money pages UDEN ordbog-links (mangler)

| Side | Naturlige ordbog-termer at linke |
|---|---|
| NyeCasinoer.tsx | `kyc`, `rng`, `gamification`, `ssl-kryptering` |
| BonusUdenIndbetaling.tsx | `rtp`, `volatilitet`, `house-edge`, `max-bet` |
| FreeSpinsIDag.tsx | `rtp`, `volatilitet`, `wagering` |
| CasinoAnmeldelser.tsx | `rtp`, `house-edge`, `rng` |
| Betalingsmetoder.tsx | `pending-time`, `ssl-kryptering`, `kyc` |
| CasinoLicenser.tsx | `rng`, `kyc`, `fairness-audit` |
| Spillemyndigheden.tsx | `kyc`, `rng`, `spillicens` |
| TopCasinoOnline.tsx | `rtp`, `house-edge`, `volatilitet` |
| SlotDatabase.tsx | `rtp`, `volatilitet`, `hit-frequency` |
| Payment guides (alle) | `pending-time`, `ssl-kryptering`, `kyc` |

### Plan

**Tilføj naturlige `<Link to="/ordbog/...">` i 10 money pages** ved at indsætte ordbog-links i eksisterende tekst hvor termerne allerede nævnes (ingen ny tekst). Maks 2-4 ordbog-links per side for at undgå overlinking.

**Filer der redigeres:**
1. `NyeCasinoer.tsx` — link KYC, RNG, gamification ved naturlige forekomster
2. `BonusUdenIndbetaling.tsx` — link RTP, volatilitet, house-edge, max-bet
3. `FreeSpinsIDag.tsx` — link RTP, volatilitet, wagering
4. `CasinoAnmeldelser.tsx` — link RTP, house-edge
5. `Betalingsmetoder.tsx` — link KYC, SSL-kryptering
6. `CasinoLicenser.tsx` — link RNG, KYC, fairness-audit
7. `Spillemyndigheden.tsx` — link KYC, spillicens
8. `TopCasinoOnline.tsx` — link RTP, house-edge
9. `SlotDatabase.tsx` — link RTP, volatilitet
10. Evt. 1-2 payment guides som eksempel (Trustly, MobilePay)

**Regler:**
- Kun første forekomst per term per side
- Kun i brødtekst (aldrig headings/buttons)
- Naturlig kontekst — ingen forceret linking
- `className={linkClass}` pattern som alle andre sider

