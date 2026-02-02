
# Plan: Slot Machine Page Lock med Password-adgang

## Oversigt
Implementer en låsefunktion til slot machine-siden, hvor:
1. Admin kan låse/oplåse siden fra admin-panelet
2. Når siden er låst, skal brugere indtaste et password for at få adgang
3. Password er "bookoffedesvin2026"

## Sikkerhedsovervejelser

Password-adgangen bruges som en ekstra "pre-access" gate til at holde siden privat under udvikling/test. Det er IKKE et sikkerheds-login, men en simpel adgangskontrol der gemmes i brugerens session (sessionStorage) så de ikke skal indtaste det igen ved hver sidebesøg.

---

## Tekniske Ændringer

### 1. Database Migration
Tilføj to nye site_settings nøgler:
- `slot_page_locked` - "true" eller "false" (standard: "true")
- `slot_page_password` - Krypteret/hashed password (standard: hashed version af "bookoffedesvin2026")

```text
┌─────────────────────────────┐
│      site_settings          │
├─────────────────────────────┤
│ slot_page_locked: "true"    │
│ slot_page_password: "..."   │
└─────────────────────────────┘
```

### 2. Ny Hook: useSlotPageAccess
Opretter `src/hooks/useSlotPageAccess.ts`:
- Henter `slot_page_locked` status fra databasen
- Tjekker om brugeren har indtastet korrekt password (gemt i sessionStorage)
- Admin-brugere får automatisk adgang (bypass password)
- Eksponerer: `isLocked`, `hasAccess`, `verifyPassword()`, `isAdmin`

### 3. Opdater SlotMachine.tsx
Tilføj en "password gate" komponent der vises når:
- Siden er låst OG
- Brugeren ikke er admin OG
- Brugeren ikke har indtastet korrekt password

UI for låst side:
- Egyptisk tema baggrund (samme som slot-maskinen)
- Ikon med lås eller lignende
- Titel: "Spillemaskinen er midlertidigt lukket"
- Password input felt
- Knap: "Få adgang"
- Fejlbesked ved forkert password

### 4. Admin Panel Udvidelse
Tilføj i `SlotMachineAdminSection.tsx` under "Indstillinger":
- Switch/toggle: "Lås spillemaskine-siden"
- Beskrivelse: "Når aktiveret, skal brugere indtaste et password for at få adgang"
- Mulighed for at ændre password (valgfrit)

---

## Implementation Flow

```text
Bruger besøger /community/slots
         │
         ▼
┌─────────────────────────┐
│ Er siden låst?          │
│ (slot_page_locked)      │
└─────────────────────────┘
         │
    Ja   │   Nej
         ▼         ──────────────► Vis slot-maskinen
┌─────────────────────────┐
│ Er brugeren admin?      │
└─────────────────────────┘
         │
    Ja   │   Nej
         │         ──────────────► Vis password-gate
         ▼
   Vis slot-maskinen
```

---

## Fil-ændringer

| Fil | Ændring |
|-----|---------|
| `src/hooks/useSlotPageAccess.ts` | **NY** - Hook til at tjekke låse-status og password |
| `src/pages/SlotMachine.tsx` | Tilføj password-gate UI og adgangskontrol |
| `src/components/SlotMachineAdminSection.tsx` | Tilføj lock toggle i admin panel |
| `src/hooks/useSlotSettings.ts` | Udvid med lock/password settings |

---

## Database Migration SQL

```sql
-- Tilføj slot page lock setting
INSERT INTO site_settings (key, value)
VALUES ('slot_page_locked', 'true')
ON CONFLICT (key) DO NOTHING;

-- Tilføj slot page password setting
INSERT INTO site_settings (key, value)
VALUES ('slot_page_password', 'bookoffedesvin2026')
ON CONFLICT (key) DO NOTHING;
```

---

## Brugeroplevelse

### For almindelige brugere (når låst):
1. Besøger `/community/slots`
2. Ser egyptisk-tema baggrund med lås-ikon
3. Indtaster password "bookoffedesvin2026"
4. Får adgang til spillemaskinen
5. Password huskes i session (behøver ikke indtaste igen)

### For admin:
1. Besøger `/community/slots` - får automatisk adgang
2. Kan gå til Admin → Spillemaskine → Indstillinger
3. Toggle "Lås spillemaskine-siden" for at låse/oplåse
4. Kan ændre password hvis nødvendigt

---

## Sikkerhed

- Password sammenlignes på klient-siden (acceptabelt da dette er en simpel "preview gate", ikke ægte sikkerhed)
- Admin-status tjekkes via eksisterende `useAuth` hook der validerer mod `user_roles` tabellen
- SessionStorage bruges så password ikke skal indtastes ved hver navigation
- Password gemmes i databasen så admin kan ændre det

