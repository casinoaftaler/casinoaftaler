

# Afvis Alle Requests — Manuel knap + Automatisk ved settle

## Hvad der bygges
1. **Manuel "Afvis Alle" knap** i Request-fanen i admin panelet, der afviser alle ventende requests med ét klik (med bekræftelsesdialog).
2. **Automatisk afvisning** af alle ventende slot requests når bonus hunt settles (i `bonus-hunt-settle` edge function).

## Ændringer

### 1. `src/components/SlotRequestsAdminSection.tsx`
- Tilføj en "Afvis Alle" knap ved siden af "Ventende Requests" overskriften.
- Knappen viser en `AlertDialog` bekræftelse før den udfører handlingen.
- Ved bekræftelse: opdater alle pending requests til `status: 'rejected'` via en enkelt Supabase update query.

### 2. `supabase/functions/bonus-hunt-settle/index.ts`
- Tilføj et nyt trin i slutningen af settle-flowet (efter GTW/AVG X settlement, før response).
- Hent hunt_number fra sessionen og afvis alle `slot_requests` med `status = 'pending'` for den pågældende hunt, samt alle globale pending requests uden hunt_number.
- SQL: `UPDATE slot_requests SET status = 'rejected' WHERE status = 'pending'`

### 3. `src/hooks/useSlotRequests.ts`
- Tilføj en ny `useRejectAllPendingRequests` mutation hook der opdaterer alle pending requests til rejected og invaliderer relevante queries.

## Teknisk detalje
- Den manuelle knap bruger `supabase.from('slot_requests').update({ status: 'rejected' }).eq('status', 'pending')` direkte.
- Edge function bruger service role client til samme operation, hvilket sikrer at RLS ikke blokerer.
- Begge metoder invaliderer/trigger realtime updates via det eksisterende channel subscription.

