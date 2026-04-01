

## Broadcast Chat-besked til alle brugere

### Koncept
Admins kan sende en broadcast-besked via chat-systemet. Brugere ser en kompakt preview (forste 5-6 ord) ved chat-ikonet. Klik udvider til fuld besked. Kryds dismisser permanent.

### Trin

**1. Ny database-tabel: `chat_broadcasts`**
```sql
CREATE TABLE public.chat_broadcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users(id) NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.chat_broadcast_dismissals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  broadcast_id uuid REFERENCES public.chat_broadcasts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  dismissed_at timestamptz DEFAULT now(),
  UNIQUE(broadcast_id, user_id)
);
```
- RLS: Admins kan INSERT broadcasts. Authenticated users kan SELECT broadcasts + INSERT egne dismissals.
- Realtime enabled pa `chat_broadcasts`.

**2. Admin UI -- "Skriv besked" knap i SupportAdminSection**
- Ny knap i header: "Skriv besked til alle"
- Klik abner en dialog med textarea + send-knap
- Sender INSERT til `chat_broadcasts`
- Toast bekraeftelse

**3. Bruger-side -- Broadcast preview ved chat-ikonet**
- `SupportChatWidget` henter seneste ikke-dismissede broadcast
- Viser en lille boble ved chat-knappen (som billede 1): avatar + forste 5-6 ord + afsender
- Klik pa boblen abner en modal/expanded view med fuld besked (som billede 2)
- X-knap i expanded view INSERTer dismissal og skjuler alt

**4. Hook: `useBroadcastChat`**
- Ny hook der fetcher seneste broadcast fra `chat_broadcasts` WHERE id NOT IN user's dismissals
- Funktion `dismissBroadcast(broadcastId)` -- inserter i `chat_broadcast_dismissals`
- Realtime subscription for nye broadcasts

### Filer der oprettes/aendres
| Fil | Handling |
|-----|---------|
| Migration SQL | Ny tabel + RLS |
| `src/hooks/useBroadcastChat.ts` | Ny hook |
| `src/components/SupportChatWidget.tsx` | Tilfoej broadcast preview + expanded view |
| `src/components/SupportAdminSection.tsx` | Tilfoej "Skriv besked" knap + dialog |

