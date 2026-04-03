

# Plan: Revert Slot Control Bars to Lucide Icons

## Problem
During the 3D WebP icon migration, the slot game control bars (BonanzaControlBar, GatesControlBar, AutoSpinPopover) had their functional UI icons (`rotate-cw`, `minus`) replaced with `MenuIcon` (3D WebP). These are small UI controls that should use crisp Lucide SVG icons, not 3D images.

## Changes

### 1. `src/components/slots/BonanzaControlBar.tsx`
- Replace all `<MenuIcon iconName="rotate-cw" .../>` with `<RotateCw .../>` from Lucide (7 occurrences)
- Replace all `<MenuIcon iconName="minus" .../>` with `<Minus .../>` from Lucide (2 occurrences)
- Add `RotateCw` to the Lucide import, remove unused `MenuIcon` import

### 2. `src/components/slots/GatesControlBar.tsx`
- Replace all `<MenuIcon iconName="rotate-cw" .../>` with `<RotateCw .../>` (5 occurrences)
- Replace `<MenuIcon iconName="minus" .../>` with `<Minus .../>` (1 occurrence)
- Add `RotateCw, Minus` to Lucide import, remove unused `MenuIcon` import

### 3. `src/components/slots/AutoSpinPopover.tsx`
- Replace `<MenuIcon iconName="rotate-cw" .../>` with `<RotateCw .../>` (1 occurrence)
- Update imports accordingly

Total: ~13 replacements across 3 files.

