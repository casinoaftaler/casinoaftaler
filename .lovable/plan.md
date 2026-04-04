

## Change Raffle Duration from 30 Minutes to 1 Hour

### What changes

The raffle system currently creates new raffles with a 30-minute window. We'll update it to 1 hour.

### Technical steps

**1. Database migration** — Update the `ensure_active_raffle()` function to use `interval '1 hour'` instead of `interval '30 minutes'` on line 126:
```sql
VALUES (500, now(), now() + interval '1 hour', 'active')
```

This is the only place the duration is defined. Everything else (settling, cron, UI countdown) reads `ends_at` from the database, so it will automatically adapt.

