
## Fix: Tilfoej fuld hero-sektion paa alle 8 nye casinospil-sider

### Problem
Alle 8 nye sider bruger en tynd gradient-bar (`h-16 md:h-24`) i stedet for den fulde hero-sektion med titel, badge og beskrivelse, som bruges paa sider som "Nye Casinoer", "Casino Bonus" osv.

### Loesning
Erstat den tynde gradient-div paa alle 8 sider med en fuld hero-sektion der foelger det etablerede moenster fra NyeCasinoer:

```text
<section className="relative overflow-hidden py-12 text-white md:py-20"
  style={{ backgroundImage: "linear-gradient(135deg, ...)" }}>
  <div className="container">
    <div className="mx-auto max-w-3xl text-center">
      <Badge>Opdateret Februar 2026</Badge>
      <h1>Sidetitel</h1>
      <p>Kort beskrivelse</p>
    </div>
  </div>
</section>
```

Derudover flyttes H1-titlen fra broed-indholdet op i hero-sektionen, saa den vises med hvid tekst paa den farvede baggrund.

### Aendringer pr. side

| Side | Gradient-farver | Hero-titel | Hero-beskrivelse |
|------|----------------|------------|-----------------|
| BlackjackGuide | Groen (160/140/120) | Blackjack Regler 2026 | Guide til kortvaerdier, strategi og varianter |
| RouletteGuide | Roed (0/350/340) | Roulette Regler 2026 | Guide til vaeddemaal, odds og varianter |
| PokerGuide | Blaa (210/220/230) | Poker Regler 2026 | Guide til Texas Hold'em, Omaha og strategi |
| CrapsGuide | Brun/orange (30/20/10) | Craps Regler 2026 | Guide til terningspil, odds bets og strategi |
| BaccaratGuide | Pink/lilla (330/340/350) | Baccarat Regler 2026 | Guide til Punto Banco, kortregler og strategi |
| RouletteStrategiGuide | Guld (45/35/25) | Roulette Strategi 2026 | Martingale, Fibonacci og matematisk analyse |
| OnlineLotteriGuide | Gul (50/40/30) | Online Lotteri 2026 | Guide til Keno, skrabelodder og odds |
| GameShowsGuide | Lilla (280/300/320) | Online Game Shows 2026 | Guide til Crazy Time, Dream Catcher og mere |

### Filer der aendres

Alle 8 filer i `src/pages/casinospil/`:
- `BlackjackGuide.tsx`
- `RouletteGuide.tsx`
- `PokerGuide.tsx`
- `CrapsGuide.tsx`
- `BaccaratGuide.tsx`
- `RouletteStrategiGuide.tsx`
- `OnlineLotteriGuide.tsx`
- `GameShowsGuide.tsx`

### Praecis aendring pr. fil

1. Tilfoej `Badge` import fra `@/components/ui/badge` og `Sparkles` ikon
2. Erstat den tynde gradient-div med fuld hero-sektion (ca. 15 linjer)
3. Fjern den gamle H1-tag fra container-indholdet (den flyttes op i hero)
