

## Plan: UX-forbedringer til review-systemet

### Ændringer

**1. `src/components/UserReviewForm.tsx`** – Multi-step flow + dynamiske labels

Omskriv formularen til 3 trin:
- **Step 1**: Stjerne-rating med dynamiske hover-labels ("Dårlig oplevelse" → "Fantastisk casino")
- **Step 2**: Review-tekst med helper-prompts i placeholder ("Hvordan var udbetalingen? Var bonus fair? Hvordan var supporten?") + valgfri titel
- **Step 3**: Navn-felt (kun gæster) / bekræftelsesknap (logged in)
- Progress-indikator (3 prikker/steps)
- CTA-knap ændres til "Del din oplevelse"
- Fjern ubrugt `guestEmail` state

**2. `src/components/UserReviewSection.tsx`** – Trust badges + bedre empty state

- Tilføj trust-tekst over formularen: "Din anmeldelse hjælper andre spillere med at vælge det rigtige casino"
- Trust badges: "✔️ 100% ægte anmeldelser" · "✔️ Modereres for spam" · "✔️ Email vises ikke"
- Empty state: Erstat "Ingen anmeldelser endnu" med "Vær den første til at anmelde – det tager kun 30 sekunder" + placeholder review-kort (tom UI-preview uden fake data)

### Hvad ændres IKKE
- Database (ingen ændringer)
- Schema/SEO (beholder `SoftwareApplication` – korrekt for gambling)
- `UserReviewCard.tsx` (uændret)
- Admin moderation (uændret)

