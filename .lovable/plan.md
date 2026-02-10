

# Top-Up Credit Model (i stedet for fuld nulstilling)

## Oversigt
Aendrer den daglige credit-tildeling fra "giv altid 220" til "fyld op til 220". Brugere der allerede har 220+ credits (fra admin eller community bonusser) beholder deres ekstra credits.

## Nuvaerende problem
- Hver dag oprettes en ny record med 220 credits uanset hvad
- Hvis admin har givet en bruger 300 credits, mister de det naeste dag (nulstilles til 220)
- Community bonus credits over 220 forsvinder ogsa ved dagsskift

## Ny logik

### Regler
1. Daglig tildeling beregner brugerens "cap" = base (200) + profil-bonus (max 20) = max 220
2. Hent gaarsdagens (eller seneste) credits for brugeren
3. Hvis credits >= cap: giv ingenting (behold ekstra fra admin/community)
4. Hvis credits < cap: tilfoej kun differencen (cap - current)
5. Kun community bonus-aktivering og admin-tildeling kan overskride 220

### Paavirkede filer

**1. `supabase/functions/daily-credit-allocation/index.ts`**
- I stedet for at oprette nye records med fuld cap, hent gaarsdagens `spins_remaining` for alle brugere
- Beregn diff: `topUp = max(0, cap - yesterday_remaining)`
- Opret dagens record med `yesterday_remaining + topUp`
- Hvis brugeren allerede har > cap, behold deres nuvaerende vaerdi
- Log kun det faktiske tilfoejede belob (ikke hele cap)

**2. `src/hooks/useSlotSpins.ts`**
- Aendr lazy-init logikken: i stedet for altid at upserte med fuld cap, check om der findes en record fra igaar
- Hvis igaar har > cap credits: carry over det belob
- Hvis igaar har < cap: top up til cap
- Nye brugere (ingen historik) far fuld cap som for

**3. `supabase/functions/slot-spin/index.ts`**
- Samme logik som useSlotSpins: ved upsert, check for eksisterende credits fra igaar for at bestemme startvaerdien
- Sorg for at carry-over logikken er konsistent med hook'en

## Teknisk sektion

### daily-credit-allocation (Edge Function)
```
For each user:
  1. cap = min(200 + bonus_spins_permanent, 220)
  2. Get yesterday's spins_remaining (or latest record before today)
  3. If no previous record: start_value = cap
  4. If previous >= cap: start_value = previous (carry over)
  5. If previous < cap: start_value = cap (top up to cap)
  6. Upsert today with start_value, ignoreDuplicates still on
  7. Log actual amount added (start_value - previous, or start_value for new users)
```

### useSlotSpins (Client-side lazy init)
```
When no record exists for today:
  1. cap = min(dailySpins + bonusPermanent, 220)
  2. Fetch yesterday's record
  3. If yesterday >= cap: create today with yesterday's value
  4. If yesterday < cap or no yesterday: create today with cap
  5. Use ignoreDuplicates to prevent race conditions
```

### slot-spin Edge Function
Same carry-over logic as useSlotSpins to keep server and client consistent.

### Vigtige edge cases
- Forste dag for en bruger (ingen historik): far fuld cap (220)
- Bruger med 300 credits fra admin: beholder 300 naeste dag
- Bruger med 170 credits (brugt 50): far topped op til 220
- Bruger med 0 credits (brugt alle): far topped op til 220
- Maanedlig reset (slot_spins slettes): brugere far fuld cap igen

