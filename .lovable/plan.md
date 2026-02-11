

## Fix: Dobbelt "Site Settings" og flyt Point Administration til Brugere

### Problem 1: Dobbelt Site Settings
`TabsContent value="settings"` blokken er duplikeret i `src/pages/Admin.tsx` (linje 1020-1058 og linje 1062-1101). Den anden kopi skal fjernes.

### Problem 2: Point Administration skal flyttes til Brugere
`SlotPointsManagement` komponenten ligger i dag under "Spillemaskine" tabben som en "Points" sub-tab. Den skal flyttes til "Brugere" tabben i stedet.

### Tekniske ændringer

**`src/pages/Admin.tsx`**
1. Slet den duplikerede `TabsContent value="settings"` blok (linje 1062-1101)
2. Importér `SlotPointsManagement` fra `@/components/slots/SlotPointsManagement`
3. Tilføj `SlotPointsManagement` i "Brugere" tabben (under SpinManagementSection) med en border-separator og passende overskrift

**`src/components/SlotMachineAdminSection.tsx`**
1. Fjern "Points" sub-tabben (`TabsTrigger value="points"`) fra spillemaskinens tab-liste
2. Fjern `TabsContent value="points"` blokken der renderer `SlotPointsManagement`
3. Fjern importen af `SlotPointsManagement` (og `Users` ikonet hvis ikke brugt andetsteds)
4. Opdater `grid-cols` i TabsList til at matche det nye antal tabs (en færre)

