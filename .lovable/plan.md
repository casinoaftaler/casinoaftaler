
# Plan: Fjern "Gevinst" Visning i Bunden

## Oversigt
Fjern `WinDisplay` komponenten fra kontrol-rækken i bunden af spillemaskinen. Denne viser det aktuelle gevinstbeløb med en mønt-ikon.

---

## Ændring

### Fil: `src/components/slots/SlotGame.tsx`

**Linje 845-849 - Nuværende:**
```tsx
{/* BOTTOM ROW ON MOBILE: Win Display + Volume */}
<div className="flex items-center gap-2 order-3 sm:order-3">
  <WinDisplay amount={bonusState.isActive ? bonusState.bonusWinnings : winAmount} isAnimating={isWinAnimating} />
  <VolumeControl />
</div>
```

**Efter ændring:**
```tsx
{/* BOTTOM ROW ON MOBILE: Volume */}
<div className="flex items-center gap-2 order-3 sm:order-3">
  <VolumeControl />
</div>
```

---

## Resultat

| Element | Status |
|---------|--------|
| WinDisplay (gevinst-tæller med mønt) | ❌ Fjernet |
| VolumeControl (lydkontrol) | ✅ Bevaret |
| WinCelebration (Big Win overlay) | ✅ Bevaret |
| Gevinstlinjer visualisering | ✅ Bevaret |

---

## Import cleanup

`WinDisplay` importen kan eventuelt fjernes hvis den ikke bruges andre steder, men det påvirker ikke funktionaliteten.
