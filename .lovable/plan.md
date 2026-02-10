

## Move "Live spillere" as a Tab Inside Spillemaskine

### What Changes

Move the "Live spillere" section from being appended below the SlotMachineAdminSection (with a separator) to being its own tab inside the slot machine tab navigation, placed next to "Statistik".

### Changes

**1. `src/pages/Admin.tsx`**
- Remove the `Separator`, heading, and `<LivePlayersAdminSection />` from the `slotmachine` TabsContent
- Remove the `LivePlayersAdminSection` import and the `Separator` import (if unused elsewhere)

**2. `src/components/SlotMachineAdminSection.tsx`**
- Import `LivePlayersAdminSection` from `@/components/LivePlayersAdminSection`
- Add a new `TabsTrigger` for "Live spillere" in the per-game tabs section (after "Statistik"), with a green dot or Users icon
- Add a corresponding `TabsContent` rendering `<LivePlayersAdminSection />`
- Add "live-players" to the `GLOBAL_TABS` array so the game selector is hidden when this tab is active (since live players shows all games already)

### Result

The tab bar inside Spillemaskine will show: Symboler | Indstillinger | Statistik | Live spillere | -- | Spins | Points | Samlet Statistik

