## Plan: Velkomstbesked til nye Twitch-brugere

### Koncept

Når en bruger logger ind via Twitch for første gang, vises en særlig velkomstbesked i support-chat-widgetten. Beskeden er en engangsbesked der forsvinder permanent når brugeren lukker den.

### Trin

**1. Tilføj `welcome_message_dismissed` kolonne til `profiles`-tabellen**

- Ny boolean kolonne `welcome_message_dismissed` (default: `false`)
- Bruges til at tracke om brugeren har set og lukket velkomstbeskeden

**2. Opdater `SupportChatWidget.tsx**`

- Fetch brugerens `welcome_message_dismissed` status fra profilen
- Hvis `false`: vis en særlig velkomstbesked i chatten (over normale beskeder) med:
  - Personlig hilsen med brugerens display name
  - Link til turneringer (`/community/turneringer`)
  - Casinoaftaler-logo som afsender-avatar
  - En "Luk" knap på beskeden
- Når brugeren klikker "Luk": opdater `welcome_message_dismissed = true` i profiles og fjern beskeden fra UI
- Beskeden vises også som en notification-dot på chat-ikonet (ligesom broadcasts)

**3. Styling**

- Beskeden styles som en admin-besked med Casinoaftaler-logoet
- Links i beskeden er klikbare og navigerer korrekt
- Evt. et 🎉 ikon for at markere det som en speciel besked

### Tekniske detaljer

- Ingen nye tabeller nødvendige — kun én ny kolonne på `profiles`
- Ingen belastning af support-systemet (ingen samtale oprettes)
- Beskeden vises client-side baseret på profil-flaget
- RLS: brugere kan allerede opdatere egen profil, så ingen policy-ændringer