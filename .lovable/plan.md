

# Implementation Plan: Full Internal Link Graph Fixes

## Overview
Fix all identified gaps across 2 files in 2 batches. The `DeveloperSiblingLinks` and `DeveloperMoneyLinks` are already synced from the previous fix. The remaining issues are in `RelatedGuides.tsx`.

---

## Batch 1: RelatedGuides.tsx — Sync All Sibling Arrays

### Fix 1: `providerSiblings` (line 140-153)
Add the 10 missing providers: Thunderkick, Blueprint Gaming, Push Gaming, Quickspin, iSoftBet, Betsoft, Wazdan, Endorphina, Stakelogic, Booming Games.

### Fix 2: `liveCasinoSiblings` (line 924-929)
Add 4 missing spokes:
- `/live-casino/crazy-time` — Crazy Time
- `/live-casino/dream-catcher` — Dream Catcher
- `/live-casino/deal-or-no-deal` — Deal or No Deal
- `/live-casino/game-shows` — Game Shows

### Fix 3: `nyeCasinoerSiblings` (line 1003-1008)
Add 5 missing spokes:
- `/nye-casinoer/uden-rofus` — Uden ROFUS
- `/nye-casinoer/bonus-uden-indbetaling` — Bonus uden Indbetaling
- `/nye-casinoer/trustly` — Med Trustly
- `/nye-casinoer/mitid` — Med MitID

These 4 actual routes exist in App.tsx but are missing from the sibling rotation array.

---

## Batch 2: entityMappings.ts — Add anchorVariants

Add `anchorVariants` arrays to all provider entities that currently lack them (Thunderkick, Blueprint, Push Gaming, Quickspin, iSoftBet, Betsoft, Wazdan, Endorphina, Stakelogic, Booming Games already have variants from the previous fix — verify and add for the original 12 that still lack them: NetEnt, Pragmatic Play, Evolution, Play'n GO, Hacksaw, Nolimit City, Microgaming, Relax Gaming, ELK Studios, Big Time Gaming).

---

## Impact
- **Batch 1**: ~200 new internal links across the site via RelatedGuides rotation
- **Batch 2**: Improved anchor text diversity for entity auto-linking

