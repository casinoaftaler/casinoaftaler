

# Plan: Fjern konstant spin-lyd og afspil kun en kort startlyd

## Nuværende adfærd

Spillemaskinen afspiller to lyde når hjulene spinner:
1. **`playSpinStart()`** – En hurtig "whoosh" og tromme-effekt (~0.4 sekunder) ved spinets start
2. **`playReelSpin()`** – En **kontinuerlig** klikkende/motor-lyd der looper indtil alle hjul er stoppet

## Ønsket ændring

Fjern den kontinuerlige spin-lyd og behold kun den korte startlyd.

---

## Ændringer

### Fil: `src/components/slots/SlotGame.tsx`

**Ændring 1 - Fjern opstart af kontinuerlig spin-lyd (linje 304-306):**

```tsx
// Før
// Play spin start sound and start continuous spin sound
slotSounds.playSpinStart();
stopSpinSound.current = slotSounds.playReelSpin();

// Efter
// Play quick spin start sound only (no continuous loop)
slotSounds.playSpinStart();
```

**Ændring 2 - Fjern stop-kald for spin-lyd (linje 339-341):**

Fjern referencerne til `stopSpinSound.current()` da der ikke længere er en kontinuerlig lyd at stoppe.

**Ændring 3 - Fjern stop-kald ved reel-landing (linje 627-629):**

Samme fjernelse af `stopSpinSound.current()` kald.

**Ændring 4 - Fjern/simplificer `stopSpinSound` ref (linje 98):**

Da den ikke længere bruges, kan refen fjernes eller bare efterlades (ingen funktionel ændring).

---

## Tekniske detaljer

Ændringerne er minimale:
- Fjern `stopSpinSound.current = slotSounds.playReelSpin();` linjen
- Fjern alle `stopSpinSound.current()` kald (3 steder: cleanup useEffect, error handler, og onReelStop callback)
- Behold `slotSounds.playSpinStart()` som det eneste spin-lyd

## Resultat

- Kun én kort, punchy lyd afspilles ved spin-start
- Ingen konstant loop-lyd under spinning
- Reel-stop lyde (`playReelStopSingle`) fortsætter som normalt

