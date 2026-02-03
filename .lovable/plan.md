

## Plan: Fjern glow og "S"-ikon fra scatter-symboler

### Baggrund
Scatter-symboler har to visuelle indikatorer der skal fjernes:
1. En amber/guld ring (glow) rundt om symbolet
2. Et lille "S"-badge i øverste højre hjørne

### Ændringer

**Fil: `src/components/slots/SlotSymbol.tsx`**

**1. Fjern scatter ring/glow (linje 27)**

Før:
```tsx
symbol.is_scatter && "ring-2 ring-amber-500/50"
```

Efter: Fjern denne linje helt fra className

---

**2. Fjern "S" badge (linje 69-74)**

Fjern hele denne sektion:
```tsx
{/* Scatter indicator */}
{symbol.is_scatter && (
  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
    <span className="text-[8px] text-white font-bold">S</span>
  </div>
)}
```

### Resultat
- Scatter-symboler vises nu uden ekstra visuel markering
- De fungerer stadig som scatters i spilmekanikken, men ser ud som normale symboler visuelt

