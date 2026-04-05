

## Plan: Manual Bonus Hit med slot-vælger dialog

### Hvad bygges
Når admin trykker på "Manuel Bonus Hit" (Trophy-knappen) på en pending slot request, åbnes en dialog der viser alle slots fra den aktive bonus hunt som **ikke** allerede har en requester tilknyttet. Admin vælger hvilken slot requestet matcher, og derefter tildeles bonus hit + 200 credits som normalt.

### Teknisk implementering

**1. Ny komponent: `ManualBonusHitDialog.tsx`**
- Modtager props: `requestId`, `userId`, `slotName` (fra requestet), `open`, `onOpenChange`
- Fetcher aktive hunt data via `useBonusHuntData()` (slot-listen fra API)
- Fetcher `useBonusHuntSlotRequesters(huntNumber)` for at finde slots der allerede har en requester
- Filtrerer hunt-slots til kun dem **uden** requester-match (via `findBestRequesterMatch`)
- Viser en søgbar liste af umatched slots med navn + provider
- Pre-highlighter den slot der fuzzy-matcher requestets `slot_name` (hvis nogen)
- Ved valg kalder `useUpdateSlotRequestStatus` med bonus_hit + credits

**2. Ændring i `SlotRequestsAdminSection.tsx`**
- Erstatter den direkte `handleAction(... "bonus_hit", true)` onClick på Trophy-knappen med åbning af `ManualBonusHitDialog`
- State for hvilken request der er valgt (`selectedRequest`) og dialog open/close

**3. Ingen database-ændringer nødvendige**
- Eksisterende `useUpdateSlotRequestStatus` mutation bruges som-is
- Hunt data + requester map hooks eksisterer allerede

