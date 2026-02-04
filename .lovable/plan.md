
# Plan: Enkel-enhed Spilbegrænsning og Bonus-synkronisering

## Overblik

Implementer et system der sikrer at brugere kun kan spille på én enhed ad gangen, samtidig med at bonus-tilstanden synkroniseres på tværs af enheder.

## Arkitektur

### Ny Database-tabel: `slot_active_sessions`

| Kolonne | Type | Beskrivelse |
|---------|------|-------------|
| id | UUID | Primær nøgle |
| user_id | UUID | Reference til brugeren |
| session_id | TEXT | Unik session-identifikator per browser/enhed |
| last_heartbeat | TIMESTAMP | Seneste aktivitetstidspunkt |
| device_info | TEXT | Browser/enhed info (til visning) |
| created_at | TIMESTAMP | Oprettelsestidspunkt |

### Ny Database-tabel: `slot_bonus_state`

| Kolonne | Type | Beskrivelse |
|---------|------|-------------|
| id | UUID | Primær nøgle |
| user_id | UUID | Reference til brugeren (UNIQUE) |
| is_active | BOOLEAN | Om bonus er aktiv |
| free_spins_remaining | INTEGER | Resterende gratis spins |
| total_free_spins | INTEGER | Totale gratis spins tildelt |
| expanding_symbol_id | UUID | ID på det udvidende symbol |
| expanding_symbol_name | TEXT | Navn på symbolet |
| bonus_winnings | NUMERIC | Akkumulerede gevinster i bonus |
| updated_at | TIMESTAMP | Seneste opdateringstidspunkt |

## Implementeringsplan

### 1. Database Migration

Opret de to nye tabeller med passende RLS-policies:
- Brugere kan kun se/redigere deres egen session og bonus-tilstand
- Session-låsning baseret på heartbeat (timeout efter 30 sekunder)

### 2. Ny Hook: `useSlotSession`

Håndterer enhedssession og låsning:

- Genererer unik `session_id` ved første indlæsning (gemmes i `sessionStorage`)
- Sender heartbeat hvert 10. sekund mens spillet er åbent
- Tjekker om anden enhed er aktiv før spins tillades
- Giver mulighed for at "overtage" session fra inaktiv enhed

```text
┌─────────────────────────────────────────────────────────┐
│                  useSlotSession Flow                     │
├─────────────────────────────────────────────────────────┤
│  1. Generer/hent session_id fra sessionStorage          │
│  2. Tjek database for eksisterende aktiv session        │
│  3. Hvis anden session aktiv (heartbeat < 30s):         │
│     → Vis "Aktiv på anden enhed" besked                 │
│     → Tilbyd "Overtag session" knap                     │
│  4. Hvis ingen anden aktiv session:                     │
│     → Registrer denne enhed som aktiv                   │
│     → Start heartbeat interval (10s)                    │
│  5. Ved unmount: Stop heartbeat                         │
└─────────────────────────────────────────────────────────┘
```

### 3. Opdateret Hook: `useBonusGame`

Migreres fra localStorage til database:

- Hent bonus-tilstand fra `slot_bonus_state` tabel
- Synkroniser ændringer til database i realtid
- Brug Supabase realtime til at lytte på ændringer (så anden enhed ser opdateringer)

```text
┌─────────────────────────────────────────────────────────┐
│              Bonus Sync Flow                             │
├─────────────────────────────────────────────────────────┤
│  Mobil starter bonus:                                   │
│  1. triggerBonus() → Gem til database                   │
│  2. Database opdateres med expanding symbol             │
│                                                         │
│  Bruger skifter til PC:                                 │
│  1. PC overtager session                                │
│  2. Henter bonus-tilstand fra database                  │
│  3. Fortsætter med samme expanding symbol               │
│  4. Opdaterer database efter hvert free spin            │
└─────────────────────────────────────────────────────────┘
```

### 4. Ny Komponent: `SlotSessionGate`

UI-komponent der vises når anden enhed er aktiv:

```text
┌────────────────────────────────────────┐
│      🎰 Aktiv på anden enhed           │
│                                        │
│  Du spiller allerede på:               │
│  "Chrome på Windows"                   │
│                                        │
│  Sidst aktiv: for 5 sekunder siden     │
│                                        │
│  ┌────────────────────────────────┐    │
│  │   🔄 Overtag her               │    │
│  └────────────────────────────────┘    │
│                                        │
│  (Stopper spillet på den anden enhed)  │
└────────────────────────────────────────┘
```

### 5. Integration i SlotGame

Opdater `SlotGame.tsx` til at bruge de nye hooks:

```text
SlotGame
├── useSlotSession()      ← NY: Tjekker enhedslåsning
├── useBonusGame()        ← OPDATERET: Database i stedet for localStorage  
├── useSlotSpins()        ← Uændret
└── useSlotSettings()     ← Uændret
```

## Filer der skal oprettes

| Fil | Formål |
|-----|--------|
| `src/hooks/useSlotSession.ts` | Session-håndtering og heartbeat |
| `src/components/slots/SlotSessionGate.tsx` | UI for "anden enhed aktiv" |

## Filer der skal opdateres

| Fil | Ændringer |
|-----|-----------|
| `src/hooks/useBonusGame.ts` | Migrer fra localStorage til database |
| `src/components/slots/SlotGame.tsx` | Integrer session-tjek |
| `src/pages/SlotMachine.tsx` | Tilføj session gate wrapper |

## Tekniske Detaljer

### Session Timeout Logik

- Heartbeat sendes hvert **10 sekunder**
- Session betragtes som inaktiv efter **30 sekunder** uden heartbeat
- Ved overtag: Gammel session markeres som ugyldig
- Ny session registreres med frisk heartbeat

### RLS Policies

```sql
-- slot_active_sessions
CREATE POLICY "Users can manage own sessions"
  ON slot_active_sessions
  FOR ALL
  USING (auth.uid() = user_id);

-- slot_bonus_state  
CREATE POLICY "Users can manage own bonus state"
  ON slot_bonus_state
  FOR ALL
  USING (auth.uid() = user_id);
```

### Enhedsinfo Generering

Bruger `navigator.userAgent` til at generere en brugervenlig enhedsbeskrivelse:
- "Chrome på Windows"
- "Safari på iPhone"
- "Firefox på MacOS"

## Fordele

1. **Enkel-enhed sikkerhed**: Forhindrer misbrug via flere samtidige sessioner
2. **Sømløs bonus-oplevelse**: Start på mobil, fortsæt på PC
3. **Realtime synkronisering**: Bonus-tilstand opdateres øjeblikkeligt
4. **Brugervenlig overtag**: Nem måde at skifte enhed på

## Edge Cases Håndteret

- Browser lukkes uden clean unmount → Heartbeat timeout
- Internet forbindelse tabes → Heartbeat stopper, session frigives
- Bruger logger ud → Session slettes
- Multiple tabs på samme enhed → Deler sessionStorage ID
