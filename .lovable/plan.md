
# Plan: Større titel-billede med indlæsningsanimation

## Oversigt
Gør titel-billedet endnu større og tilføj en flot "fade-in + scale-up" animation når siden indlæses.

## Ændringer

### 1. Større titel-billede
- Øg `max-w-md` til `max-w-xl` på mobil
- Øg `sm:max-w-lg` til `sm:max-w-2xl` på større skærme
- Dette giver et markant større titel-billede

### 2. Indlæsningsanimation
Tilføj en ny `title-entrance` keyframe animation der kombinerer:
- **Fade-in**: Starter usynlig (`opacity: 0`) og fader ind
- **Scale-up**: Starter lidt mindre (`scale(0.8)`) og vokser til fuld størrelse
- **Slide-down**: Starter lidt over position (`translateY(-20px)`) og glider ned
- **Smooth easing**: Bruger `ease-out` for et naturligt finish

---

## Tekniske detaljer

### tailwind.config.ts
Tilføj ny keyframe og animation:
```typescript
'title-entrance': {
  '0%': { 
    opacity: '0',
    transform: 'scale(0.8) translateY(-20px)'
  },
  '100%': { 
    opacity: '1',
    transform: 'scale(1) translateY(0)'
  }
}

animation: {
  'title-entrance': 'title-entrance 0.8s ease-out forwards'
}
```

### src/pages/SlotMachine.tsx
Opdater titel-billedet:
```tsx
<img 
  src={titleImage} 
  alt="Book of Fedesvin" 
  className="w-full max-w-xl sm:max-w-2xl h-auto animate-title-entrance"
  style={{
    filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5)) ...'
  }}
/>
```

Den eksisterende glow-animation kan kombineres med den nye entrance-animation via CSS.

---

## Resultat
- Titlen er nu ~50% større end før
- Når siden indlæses, vil titlen fade ind og vokse elegant
- Glow-effekten fortsætter efter indlæsningen
