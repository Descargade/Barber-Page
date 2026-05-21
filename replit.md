# NOIR Barber Landing Page

A premium dark-aesthetic barber shop landing page template for Argentinian/LatAm barber clients, with real-time booking system and admin panel.

## Run & Operate

- `pnpm --filter @workspace/barber-landing run dev` — run the landing page (port 25715)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v4 + Framer Motion
- Persistence: Supabase (PostgreSQL with real-time subscriptions)
- UI: shadcn/ui components

## Where things live

- `artifacts/barber-landing/src/`
  - `pages/Home.tsx` — full landing page (hero, services, about, gallery, testimonials, CTA, footer)
  - `pages/Admin.tsx` — password-protected admin dashboard
  - `context/BookingContext.tsx` — booking state, Supabase CRUD, real-time subscription
  - `context/AdminAuthContext.tsx` — simple admin auth (session-scoped)
  - `components/BookingModal.tsx` — 5-step booking flow modal
  - `lib/supabase.ts` — Supabase client (reads from env vars)

## Environment Variables

Required for both development and production:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL (e.g. `https://xxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/publishable key (`sb_publishable_...`) |

Both are available via Project Settings → API in the Supabase dashboard.

## Supabase Schema

Table: `appointments`

| Column | Type | Notes |
|---|---|---|
| `id` | text | primary key |
| `name` | text | client name |
| `phone` | text | client phone |
| `service` | text | service slug |
| `barber_id` | text | barber id |
| `barber_name` | text | barber display name |
| `date` | text | ISO date string |
| `time` | text | e.g. "14:00" |
| `status` | text | default `'pendiente'` |
| `created_at` | timestamptz | auto |

RLS policies: public `SELECT`, `INSERT`, `UPDATE` (anon key access).

## Architecture

- DB rows are `snake_case`; TypeScript types are `camelCase` — mapped via `rowToAppointment()` in `BookingContext.tsx`
- Real-time sync via `supabase.channel("appointments-changes")` postgres_changes subscription
- Slot availability: blocks same `service + barberId + date + time` for non-cancelled appointments
- Admin password is set in `AdminAuthContext.tsx` (change per client)

## Product

- Cinematic dark hero, services, about, gallery, testimonials, booking CTA, footer — all in Spanish (Argentinian/LatAm tone)
- 5-step booking modal: service → barber → date/time → datos → confirmación
- Admin panel at `/admin`: live appointment list, status controls (pendiente/confirmado/cancelado), animated stat counters

## User Preferences

- All user-facing text in Spanish (professional Argentinian/LatAm tone)
- No explicit React imports (Vite JSX transformer handles it)
- No unused imports (TypeScript strict mode)

## Cloning for a New Client

1. Fork/duplicate the repo
2. Create a new Supabase project and run the schema above
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your environment
4. Update branding (name, colors, barbers, services) in `BookingContext.tsx` and `Home.tsx`
5. Change the admin password in `AdminAuthContext.tsx`
6. Deploy to Vercel — both env vars go into Vercel's project settings

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
