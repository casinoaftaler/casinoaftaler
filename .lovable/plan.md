

## Omstrukturering af Spillemaskine Admin Panel

### Problem
Aktuelt er "Spins" og "Points" tabs placeret inde i spillemaskine-sektionen, hvor de gentages for hver maskine selvom de er globale (deles på tvers af alle maskiner). Derudover viser statistik kun data per spil, men der mangler en samlet oversigt.

### Ny Tab-struktur

Den nuværende tab-struktur i spillemaskine admin:

```text
[Symboler] [Indstillinger] [Spins] [Points] [Statistik]
         ^--- per spil ---^  ^--- globale ---^  ^--- per spil ---^
```

Ny struktur:

```text
[Symboler] [Indstillinger] [Statistik] [Spins] [Points] [Samlet Statistik]
 ^--------- per spil (med game selector) ---------^  ^--- globale (uden game selector) ---^
```

### Detaljeret Plan

**1. Omorganiser tabs i `SlotMachineAdminSection.tsx`**
- Flyt "Spins" og "Points" tabs ud af den per-game kontekst
- Tilf en ny "Samlet Statistik" tab der viser statistik for ALLE maskiner kombineret
- Skjul game selector-knapperne nar globale tabs er aktive (Spins, Points, Samlet Statistik)

**2. Implementer "Samlet Statistik" tab**
- Genbrug `StatisticsTab` komponenten men kald den UDEN `gameId` parameter
- Tilfoej en `useSlotAdminStatistics` query uden gameId-filter der aggregerer data fra alle maskiner
- Viser samlede spins, gevinster, spillere, RTP osv. pa tvers af alle maskiner

**3. UI-forbedringer**
- Tilfoej en visuel separator mellem per-game tabs og globale tabs
- Game selector vises kun nar en per-game tab er aktiv
- Globale tabs far et andet ikon/styling sa det er tydeligt de er globale

### Tekniske Detaljer

**Fil: `src/components/SlotMachineAdminSection.tsx`**
- Opdater `SlotMachineAdminSection` eksport-komponenten (linje 1412-1471)
- Flyt tabs-raekkefoelgen: Symboler, Indstillinger, Statistik (per spil), derefter Spins, Points, Samlet Statistik (globale)
- Tilfoej state-logik til at tracke om aktiv tab er per-game eller global
- Skjul/vis game selector baseret pa aktiv tab

**Fil: `src/hooks/useSlotAdminStatistics.ts`**
- Verificer at hook'en allerede understoetter at blive kaldt uden gameId (optional parameter)
- Sikr at den aggregerer data korrekt nar intet gameId er angivet

