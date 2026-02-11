
## Flyt Slot Requests ind i Spillemaskine-fanen og vis kun ventende requests

### Hvad bliver lavet
1. **Fjern "Requests" som selvstaendig tab** i admin-navigationen -- flyttes ind som en ny sub-tab under "Spillemaskine"
2. **Admin-listen viser kun ventende (pending) requests** -- naar admin vaelger en handling (Bonus Hit, Ingen Bonus, Afvist), gemmes resultatet i databasen og requestet forsvinder fra listen
3. **Brugerens historik bevares** -- brugeren kan stadig se alle sine requests (inkl. behandlede) paa Rewards-siden via `SlotRequestForm`
4. **Grid opdateres** fra 9 til 8 kolonner i desktop-navigationen

### Brugeroplevelse
- Admin ser kun de requests der kraever handling -- ingen lang liste af gamle behandlede requests
- Brugere ser stadig hele deres historik paa Rewards-siden
- Slot Requests er nu logisk grupperet under Spillemaskine

### Tekniske detaljer

**1. `src/pages/Admin.tsx`**
- Fjern `{ value: "requests", label: "Requests", icon: Gamepad2 }` fra `navItems`
- Fjern `TabsContent value="requests"` blokken
- Fjern import af `SlotRequestsAdminSection`
- Opdater grid fra `grid-cols-9` til `grid-cols-8`

**2. `src/components/SlotMachineAdminSection.tsx`**
- Tilfoej "Requests" som ny tab i Spillemaskine-sektionens `TabsList`
- Tilfoej til `GLOBAL_TABS` array saa game-selector skjules for denne tab
- Importer og render `SlotRequestsAdminSection` i en ny `TabsContent value="requests"`

**3. `src/components/SlotRequestsAdminSection.tsx`**
- Filtrer listen til kun at vise requests med `status === "pending"`
- Vis antal ventende requests i CardTitle (f.eks. "Ventende Requests (3)")

**4. `src/hooks/useSlotRequests.ts`**
- Ingen aendringer needed -- `useAllSlotRequests` henter stadig alt, og filtreringen sker i UI-laget
- `useUpdateSlotRequestStatus` gemmer allerede resultatet korrekt i databasen
