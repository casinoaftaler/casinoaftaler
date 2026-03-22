

## Plan: Brugeranmeldelser & Ratings-system med AggregateRating Schema

### Hvad og hvorfor
Et brugeranmeldelsessystem på alle 29 casino-anmeldelsessider, der genererer **reelle** AggregateRating data til Google Rich Results (stjerner i SERP). Dette erstatter de nuværende hardcoded `ratingCount` værdier med ægte brugerdata, styrker E-E-A-T massivt via UGC, og skaber frisk, unikt indhold på hver anmeldelsesside.

### Arkitektur

```text
┌─────────────────────────────────────┐
│  Casino Review Page (e.g. Betinia)  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  <UserReviewSection>          │  │
│  │  ├── Submit Review Form       │  │
│  │  │   (Twitch-logget = auto)   │  │
│  │  │   (Guest = navn + email)   │  │
│  │  ├── Star Rating (1-5)        │  │
│  │  ├── Review Text (min 50 ch)  │  │
│  │  └── Moderation notice        │  │
│  │                               │  │
│  │  ├── Approved Reviews List    │  │
│  │  │   (avatar, name, stars,    │  │
│  │  │    text, date, helpful?)   │  │
│  │  └── Pagination / Load more   │  │
│  └───────────────────────────────┘  │
│                                     │
│  JSON-LD: AggregateRating from DB   │
└─────────────────────────────────────┘
```

### Database (2 tabeller)

**1. `casino_user_reviews`**
- `id`, `casino_slug`, `user_id` (nullable – for gæster), `guest_name`, `guest_email`
- `rating` (1-5 integer), `review_text`, `title`
- `status` (enum: pending, approved, rejected), `rejection_reason`
- `helpful_count`, `created_at`, `updated_at`
- `is_verified_player` (boolean – true for Twitch-brugere)
- Unique constraint: én anmeldelse per bruger per casino (`user_id + casino_slug` eller `guest_email + casino_slug`)
- RLS: Alle kan se approved reviews, brugere kan indsætte egne, admins kan moderere

**2. `casino_review_aggregates`** (materialiseret via trigger)
- `casino_slug` (PK), `avg_rating`, `review_count`, `updated_at`
- Opdateres automatisk via DB trigger når reviews godkendes/afvises
- Hurtig læsning uden at tælle reviews runtime

### Komponenter

**1. `src/components/UserReviewSection.tsx`** – Hovedkomponent
- Viser godkendte reviews med avatar, navn, stjerner, tekst, dato
- "Var denne anmeldelse nyttig?" knap (helpful_count)
- Sortér: Nyeste / Højeste / Laveste / Mest nyttige
- Load more pagination (10 ad gangen)

**2. `src/components/UserReviewForm.tsx`** – Indsendelsesformular
- **Logget ind (Twitch)**: Auto-udfyld navn + avatar fra profil, vis "Verificeret spiller" badge
- **Gæst**: Navn + email felter (email vises IKKE offentligt, kun til moderation)
- 1-5 stjerne-rating (klikbar)
- Titel (valgfri, max 100 tegn)
- Review-tekst (min 50, max 2000 tegn)
- Succesbesked: "Din anmeldelse er modtaget og afventer godkendelse"

**3. `src/components/UserReviewCard.tsx`** – Enkelt review visning
- Avatar (fra profil eller generisk), navn, dato, stjerner
- "Verificeret spiller" badge for Twitch-brugere
- Review-tekst med "Læs mere" truncation ved 300 tegn
- Helpful-knap med count

**4. `src/components/admin/ReviewModerationSection.tsx`** – Admin panel
- Liste af pending reviews med godkend/afvis knapper
- Afvisningsgrund (dropdown + fritekst)
- Filter: Pending / Approved / Rejected / Alle

### SEO Enterprise – Schema Integration

**Dynamisk AggregateRating fra DB:**
- Opdater `buildReviewSchema()` til at acceptere dynamiske `ratingValue`/`ratingCount` fra `casino_review_aggregates`
- Ny hook `useCasinoReviewAggregates(slug)` henter live aggregater
- Fallback til redaktionelle scores fra `reviewScoring.ts` hvis 0 brugeranmeldelser
- Minimum 3 godkendte reviews før bruger-aggregat bruges i schema (Google's anbefaling)

**Review snippet i schema:**
```json
{
  "@type": "SoftwareApplication",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",      // ← fra DB
    "reviewCount": "47",       // ← fra DB
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

**Individuelle Review-entiteter:**
- De nyeste 5 godkendte reviews embeddes som `review` array i JSON-LD
- Hver med `author`, `reviewRating`, `datePublished`, `reviewBody`
- Verified-brugere får `"@type": "Person"` med profil-URL

### Hook: `useUserReviews(casinoSlug)`
- Henter godkendte reviews + aggregater for et casino
- Submit-funktion med input-validering (zod)
- Helpful-vote funktion
- Pagination state

### Integration i anmeldelsessider
- `<UserReviewSection casinoSlug="betinia" />` tilføjes i bunden af ALLE 29 anmeldelsessider
- Placeres efter hovedindholdet, før FAQ-sektionen (optimal crawl-position)
- Schema opdateres dynamisk baseret på review-data

### Moderation & Sikkerhed
- Alle reviews starter som `pending` – vises IKKE før admin-godkendelse
- Rate limiting: Max 1 review per casino per bruger/email
- Gæste-emails valideres med zod, gemmes hashed for spam-forebyggelse
- Profanity-filter (dansk ordliste) som client-side warning
- Admin notifikation ved nye pending reviews

### Opsummering af filer

| Fil | Handling |
|---|---|
| Migration SQL | Opret `casino_user_reviews`, `casino_review_aggregates`, triggers, RLS |
| `src/hooks/useUserReviews.ts` | CRUD + aggregater hook |
| `src/components/UserReviewSection.tsx` | Hovedcontainer |
| `src/components/UserReviewForm.tsx` | Indsendelsesformular |
| `src/components/UserReviewCard.tsx` | Enkelt review-kort |
| `src/components/admin/ReviewModerationSection.tsx` | Admin moderation |
| `src/lib/seo.ts` | Udvid `buildReviewSchema` med dynamisk data |
| 29 anmeldelsessider | Tilføj `<UserReviewSection>` komponent |

