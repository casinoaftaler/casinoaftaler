

## Ny sektion i Vilkår og Betingelser: Fair Play & Exploit-politik

### Hvad der tilfojes

En ny sektion **"12. Fair Play & Exploits"** i Terms-siden (`src/pages/Terms.tsx`) med folgende indhold:

- Casinoaftaler.dk star for fair play i alle spil og konkurrencer pa platformen
- Brugere er forpligtet til at rapportere eventuelle fejl, bugs eller exploits til administratorerne hurtigst muligt
- Administratorer forbeholder sig retten til at diskvalificere brugere, der bevidst udnytter exploits uden at rapportere dem
- Konsekvenser ved brug af exploits kan omfatte:
  - Permanent ban fra websitet
  - Ban fra Twitch-kanalen
  - Sletning af alle credits og point
  - Fjernelse af al leaderboard-fremgang
- Afgoerelsen om diskvalifikation ligger hos administratorerne og er endelig

### Teknisk implementering

- Tilfojer en ny `Card`-komponent i `src/pages/Terms.tsx` efter sektion 11 (Lovvalg og vaerneting) og for "Tilbage til forsiden"-linket
- Bruger `Shield` eller `ShieldAlert`-ikonet fra lucide-react for at matche temaet
- Anvender samme card-styling med `border-l-4 border-l-destructive` for at signalere vigtigheden (ligesom aldersbegraensnings-sektionen)
- Opdaterer den eksisterende sektion-nummerering: den nye sektion bliver nr. 12

