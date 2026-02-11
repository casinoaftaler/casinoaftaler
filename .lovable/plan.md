

## Tilføj Ban Management sektion i admin panelet

### Hvad bliver lavet
En ny "Bans" fane i admin-panelet med en oversigt over alle bannede brugere, inklusive årsag, dato og mulighed for at unban dem direkte.

### Ændringer

**1. Ny komponent: `src/components/BanManagementSection.tsx`**
- Henter alle rækker fra `user_bans` tabellen med tilhørende profildata (avatar, display_name, twitch_username)
- Viser en liste med:
  - Brugerens avatar og navn
  - Ban-årsag (eller "Ingen årsag angivet")
  - Dato for ban
  - Unban-knap med bekræftelsesdialog
- Viser "Ingen bannede brugere" besked når listen er tom

**2. Opdater `src/pages/Admin.tsx`**
- Tilføj et nyt element i `navItems` arrayet: `{ value: "bans", label: "Bans", icon: Ban }`
- Importér `Ban` ikon fra lucide-react
- Importér `BanManagementSection` komponent
- Tilføj `TabsContent` for "bans" sektionen
- Opdater `TabsList` grid til `grid-cols-12` for at rumme den nye fane

### Tekniske detaljer
- Bruger eksisterende `user_bans` tabel (allerede oprettet med korrekte RLS-politikker for admin)
- Joiner med `profiles` tabellen for brugeroplysninger via separate queries (da der ikke er foreign keys)
- Ingen database-ændringer nødvendige
