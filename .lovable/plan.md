

# Live Support Chat — Professionel Kundesupport

## Overblik

En floating support-widget (som Intercom/Zendesk) i nederste højre hjørne, hvor indloggede brugere kan starte en samtale med jeres admin-team. Admins håndterer beskeder via en ny fane i Admin-panelet.

## Brugeroplevelse

```text
┌─────────────────────────────────┐
│  Hjemmesiden                    │
│                                 │
│                          ┌────┐ │
│                          │ 💬 │ │  ← Floating chat-knap
│                          └────┘ │
└─────────────────────────────────┘

Klik → åbner chat-panel:
┌──────────────────────┐
│ ✕  Casinoaftaler      │
│     Support           │
├──────────────────────┤
│ Velkommen! Hvad kan  │
│ vi hjælpe med?       │
│                      │
│ [Bruger besked]  →   │
│        ← [Admin svar]│
│                      │
├──────────────────────┤
│ Skriv en besked...   │
│              [Send]  │
└──────────────────────┘
```

**Admin-side** (ny fane i /admin):
- Liste over aktive samtaler med ubesvarede markeret
- Realtids-opdatering via Supabase Realtime
- Kan se brugerens profil (display_name, twitch, avatar)
- Kan lukke/arkivere samtaler

## Database (2 nye tabeller)

**support_conversations**
- `id`, `user_id` (references auth.users), `status` (open/closed), `subject`, `created_at`, `updated_at`, `last_message_at`, `assigned_admin_id` (nullable)

**support_messages**
- `id`, `conversation_id` (FK), `sender_id`, `sender_role` (user/admin), `message` (text, max 2000 chars), `read_at` (nullable), `created_at`

Realtime aktiveres på begge tabeller. RLS: brugere ser kun egne samtaler, admins ser alle.

## Komponenter

1. **SupportChatWidget** — floating knap + chat-panel, vises for indloggede brugere (ikke på /admin)
2. **SupportChatPanel** — selve chat-vinduet med besked-historik og input
3. **SupportAdminSection** — ny fane i Admin med samtaleliste + svar-interface
4. **NotificationBadge** — ubesvarede beskeder tæller (for bruger + admin)

## Nøglefunktioner

- Realtime beskeder (Supabase postgres_changes)
- Ulæste-badge på chat-knappen for brugere
- Ulæste-badge i admin-nav for admins
- Automatisk velkomstbesked ved ny samtale
- Samtale-status (åben/lukket)
- Admin kan tildele sig selv en samtale
- Professionelt, animeret UI med slide-up panel
- Mobilresponsivt

## Implementeringsrækkefølge

1. Database-migration (2 tabeller + RLS + realtime)
2. SupportChatWidget + SupportChatPanel (brugerside)
3. SupportAdminSection (adminside, ny fane)
4. Realtime + ulæste-notifikationer begge veje
5. Tilføj widget til Layout.tsx, fane til Admin.tsx

