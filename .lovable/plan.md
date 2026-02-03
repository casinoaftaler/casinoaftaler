

## Plan: Ændre spinning-lyden til at ligne Book of Dead

### Baggrund
Book of Dead har en karakteristisk mekanisk hjul-spinning lyd, der simulerer fysiske hjul, som drejer rundt. Lyden er kendetegnet ved:
- Hurtige, rytmiske "klik" der simulerer symboler, som flyver forbi
- En mekanisk, næsten "ticker-tape" lignende lyd
- Et konstant tempo under spinning
- Subtil undertone der giver dybde

Den nuværende implementering bruger en mystisk, egyptisk stil med:
- Triangelbølge-drone
- Sistrum shimmer (høje metalrangle)
- Ørken-vind undertone
- Langsom, svævende modulation

### Teknisk løsning

Ændre `playReelSpin()` funktionen i `src/lib/slotSoundEffects.ts` til at bruge en mekanisk klik-baseret tilgang:

1. **Primær klik-lyd (Symbol Click)**
   - Hurtige, korte pulser (~20-25 pr. sekund) for at simulere symboler der flyver forbi
   - Bruger oscillator med hurtig attack/decay envelope
   - Lav-mid frekvens (200-400Hz) for mekanisk "thunk" karakter

2. **Sekundær ticker-lyd (Reel Mechanism)**
   - Højere frekvens clicks (~800-1200Hz)
   - Simulerer selve hjulmekanikken
   - Lettere volumen end primær klik

3. **Subtil brum-undertone (Motor Hum)**
   - Lav frekvens drone (~80-120Hz)
   - Simulerer motor/mekanisk bevægelse
   - Meget lavt volumen for dybde

4. **Interval-baseret klik-system**
   - Bruger `setInterval` til at generere rytmiske clicks
   - Fast tempo (~50ms mellem clicks)
   - Stop function rydder interval og fader ud

### Fil der ændres

**`src/lib/slotSoundEffects.ts`** - Modificer `playReelSpin()` metoden (linje 323-438)

### Tekniske detaljer

Den nye `playReelSpin()` vil:

```text
┌─────────────────────────────────────────────────────────┐
│                    Ny Spinning Lyd                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Symbol Clicks (hovedlyd)                            │
│     ├── Frekvens: 280Hz → 180Hz (pitch sweep ned)       │
│     ├── Type: Sine wave                                  │
│     ├── Varighed: 15ms per klik                         │
│     └── Interval: 45ms (ca. 22 clicks/sek)              │
│                                                          │
│  2. Mechanism Ticker (accent)                           │
│     ├── Frekvens: 1000Hz                                │
│     ├── Type: Square wave (filtered)                    │
│     ├── Varighed: 8ms per tick                          │
│     └── Interval: 90ms (alternerer med clicks)          │
│                                                          │
│  3. Motor Hum (undertone)                               │
│     ├── Frekvens: 100Hz med let modulation              │
│     ├── Type: Sawtooth (lowpass filtered)               │
│     └── Konstant, lavt volumen                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Forventet resultat
- Lyden vil minde meget mere om den klassiske Book of Dead spinning-lyd
- Mekanisk, rhythmisk karakter i stedet for mystisk/eterisk
- Hurtige clicks der simulerer hjul-symboler der flyver forbi
- Stadig passer til det egyptiske tema, men med mere "ægte" slot-maskine følelse

