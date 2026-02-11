
## Konsolider Brugere-fanen og styrk Ban-funktionalitet

### Hvad bliver lavet
1. **Admin Brugere sektion g&#248;res collapsible** -- s&#229; den kan foldes sammen for at spare plads
2. **&#201;n samlet brugerliste** -- fjern TwitchUsersSection og BanManagementSection fra Brugere-fanen. SpinManagementSection (som allerede viser alle brugere med ban/unban) flyttes fra sin egen "Spins" tab ind i "Brugere" som den prim&#230;re brugerliste
3. **Ban sletter leaderboard-data og credits** -- n&#229;r en bruger bannes, slettes ogs&#229; deres `slot_game_results` (leaderboard) og `slot_spins` (credits)

### Brugeroplevelse
- "Brugere"-fanen viser: Profilfuldforelse (uaendret), Admin Brugere (collapsible), og derunder den fulde brugerliste med credits + ban/unban (fra SpinManagementSection)
- Ban-knappen fjerner nu ogs&#229; brugerens leaderboard-data og credits automatisk
- "Spins"-tabben fjernes fra top-navigationen (indholdet er nu under "Brugere")
- BanManagementSection og TwitchUsersSection fjernes -- al info er samlet i &#233;n liste
- Desktop tab-bar g&#229;r fra 9 til 8 kolonner

### Tekniske detaljer

**1. `src/pages/Admin.tsx`**
- Fjern `spins` fra `navItems` og opdater grid til `grid-cols-8`
- Fjern TwitchUsersSection og BanManagementSection imports/renders fra "users" tab
- Flyt SpinManagementSection ind i "users" TabsContent (under Admin Brugere)
- G&#248;r "Admin Brugere" sektionen collapsible med Collapsible-komponenten
- Fjern `TabsContent value="spins"`

**2. `src/components/SpinManagementSection.tsx`**
- Opdater `banUser` mutation til ogs&#229; at slette fra `slot_game_results` og `slot_spins` n&#229;r en bruger bannes
- Disse sletninger kr&#230;ver service role, s&#229; vi opretter en edge function

**3. Ny edge function: `supabase/functions/ban-user/index.ts`**
- Modtager `userId`, `reason`, `bannedBy`
- Verificerer at kaldende bruger er admin
- Inds&#230;tter i `user_bans`
- Sletter fra `slot_game_results` (leaderboard data)
- S&#230;tter `slot_spins.spins_remaining` til 0
- Alt k&#248;res med service_role for at omg&#229; RLS

**4. Oprydning**
- `src/components/TwitchUsersSection.tsx` kan fjernes (al info er i SpinManagementSection)
- `src/components/BanManagementSection.tsx` kan fjernes (ban/unban er i SpinManagementSection)
