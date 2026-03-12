

## Status: Delvist dækket – men dedikerede sektioner mangler

### Hvad eksisterer allerede
- **BonusMoneyLinks** er implementeret på begge sider (bund af siden) → linker til `/slot-database`, `/casinospil/spillemaskiner`, 4 roterede providers, 4 roterede slots
- **CasinoBonus.tsx** har inline links til Sweet Bonanza og Gates of Olympus i RTP-afsnittet (linje 523)
- **FreeSpins.tsx** nævner udviklere (NetEnt, Pragmatic Play, Play'n GO) i tekst men uden links (linje 770)

### Hvad mangler
Ingen af siderne har **dedikerede strukturerede sektioner** med kontekstuelle slot/provider-anbefalinger. BonusMoneyLinks er generisk og sidst på siden – Google vægter links højere, der er placeret in-content med kontekstuel relevans.

---

### Plan: 2 nye in-content sektioner

#### 1. CasinoBonus.tsx – "Bedste spillemaskiner til bonusomsætning"
Placering: efter RTP-afsnittet (ca. linje 524), før "Max. indsats" sektionen.

Indhold:
- 6 slots med høj RTP + lav volatilitet, ideelle til wagering
- Hver med link til `/casinospil/spillemaskiner/{slug}` og `/slot-katalog/{slug}`
- Links til 3 provider hubs (`/spiludviklere/`) for de repræsenterede udviklere
- Kort forklaring af hvorfor disse slots passer til bonusomsætning

Estimat: ~18 nye kontekstuelle dofollow links

#### 2. FreeSpins.tsx – "Populære udviklere med free spins-venlige slots"
Placering: efter sæsonkampagne-sektionen (ca. linje 781), før loyalitets-sektionen.

Indhold:
- 4 udviklere (Pragmatic Play, NetEnt, Play'n GO, Big Time Gaming) med links til `/spiludviklere/{slug}`
- 2 slots per udvikler med links til `/casinospil/spillemaskiner/{slug}`
- Kort kontekst om hvorfor udvikleren er relevant for free spins

Estimat: ~12 nye kontekstuelle dofollow links

**Samlet: ~30 nye in-content authority links placeret midt i indholdet** (vs. BonusMoneyLinks som sidder i bunden).

