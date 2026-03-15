

## Plan: Opdater "Teamet i tal" på /om-siden

### Ændringer i `src/pages/OmTeamet.tsx` (stats-arrayet, linje 149-154)

**Nuværende → Ny:**

| # | Nu | Nyt | Begrundelse |
|---|-----|-----|-------------|
| 1 | `7+` / "Års samlet streaming-erfaring" | `10+` / "Års samlet erfaring" | Samlet erfaring (Jonas 4+ år, Kevin 3+ år, Ajse + Niklas). Fjerner "streaming" – det handler om hele teamets arbejde |
| 2 | `30+` / "Testede danske casinoer" | Beholdes som den er | Stadig korrekt |
| 3 | `7000+` / "Timers live streaming" | `7000+` / "Timers live streaming" | Beholdes – dette er specifikt streaming og er korrekt |
| 4 | `160+` / "Publicerede artikler & guides" | `270+` / "Publicerede artikler & guides" | Reelt antal: Jonas ~180 (inkl. ordbog), Kevin ~65, Ajse ~16, Niklas ~12 = ~273 |
| 5 | `Aktivt` / "Engageret community" | Beholdes | Stadig korrekt |

### Teknisk
- Kun `stats`-arrayet i `OmTeamet.tsx` skal ændres (2 linjer)
- Ikonet for stat #1 ændres fra `Clock` til `Briefcase` for at matche "samlet erfaring" i stedet for tid/streaming

