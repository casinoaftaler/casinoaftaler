
# Plan: Tilføj Retrigger Lydeffekt

## Oversigt
Tilføj en unik lydeffekt for retriggere der adskiller sig fra den normale bonus trigger-lyd. Retrigger-lyden skal føles som en "forstærkning" af den igangværende bonus snarere end en helt ny start.

---

## Lyddesign: Retrigger vs. Bonus Trigger

| Element | Bonus Trigger | Retrigger |
|---------|---------------|-----------|
| Karakter | Dyb, mystisk opvågnen | Hurtig, triumferende forstærkning |
| Tempo | Langsom opbygning (0.8s sweep) | Hurtig burst (0.4s) |
| Frekvenser | Lave toner der stiger | Høje, glimtende toner |
| Følelse | "Bogen åbner" | "Bogen lyser endnu stærkere!" |

---

## Filer der skal ændres

### 1. `src/lib/slotSoundEffects.ts`
Tilføj ny `playRetrigger()` metode med følgende lyddesign:

**Lydkomponenter:**
- Hurtig power surge (burst i stedet for langsom opbygning)
- Ascending sparkle cascade (flere og hurtigere sparkles)
- Triumferende fanfare-akkord (højere og mere strålende)
- "Book glow" shimmer (vedvarende glimmer-effekt)
- Bonus-forstærkende "whoosh" effekt

**Teknisk implementering:**
```text
playRetrigger():
- Power burst: 80-400 Hz over 0.3s (hurtigere end trigger)
- Sparkle cascade: 25 sparkles, tættere intervaller
- Triumphant chord: E major med høje overtoner
- Shimmer layer: Høje frekvenser (2000-5000 Hz) med tremolo
- Total varighed: ~1.5 sekunder
```

### 2. `src/components/slots/SlotGame.tsx`
Kald `slotSounds.playRetrigger()` når retrigger detekteres (ved linje 520).

---

## Lydkarakteristik

**Retrigger-lyden skal kommunikere:**
- "Mere af det gode!"
- Forøget spænding og momentum
- Kontinuitet med bonus-tilstand
- Triumf og belønning

**Forskel fra bonus trigger:**
- Kortere og mere punchy
- Højere frekvensområde (mere strålende)
- Hurtigere tempo
- Mere "celebration" end "awakening"

---

## Opsummering

| Fil | Ændring |
|-----|---------|
| `src/lib/slotSoundEffects.ts` | Tilføj `playRetrigger()` metode |
| `src/components/slots/SlotGame.tsx` | Kald `playRetrigger()` ved retrigger |
