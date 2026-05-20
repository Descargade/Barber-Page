# NOIR Barber Landing Page

A premium dark-aesthetic barber shop landing page template for Argentinian/LatAm barber clients, with real-time booking system and admin panel.

## Run & Operate

- `pnpm --filter @workspace/barber-landing run dev` — run the landing page (port 25715)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000, not used by this app)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v4 + Framer Motion
- Backend persistence: Supabase (PostgreSQL)
- UI: shadcn/ui components

## Where things live

- `artifacts/barber-landing/src/` — main app source
  - `pages/Home.tsx` — full landing page with all sections
  - `pages/Admin.tsx` — password-protected admin panel
  - `context/BookingContext.tsx` — booking state, Supabase CRUD, real-time subscription
  - `context/AdminAuthContext.tsx` — admin auth (password: `noir2024`)
  - `components/BookingModal.tsx` — 5-step booking flow modal
  - `lib/supabase.ts` — Supabase client init

## Architecture decisions

- Supabase table `appointments` with columns: `id`, `name`, `phone`, `service`, `barber_id`, `barber_name`, `date`, `time`, `status` (default `pendiente`), `created_at`. RLS allows public select/insert/update.
- `supabase.ts` hardcodes the project URL (`https://ptcrrzshpbcdagmdrjcv.supabase.co`) since it's public. The anon key is read from `VITE_SUPABASE_URL` secret (note: secrets were stored with swapped names — `VITE_SUPABASE_URL` holds the anon key value).
- Real-time sync via `supabase.channel("appointments-changes")` postgres_changes subscription.
- DB rows are snake_case; TypeScript types are camelCase — mapped via `rowToAppointment()`.

## Product

- Cinematic dark hero, services, about, gallery, testimonials, booking CTA, footer — all in Spanish (Argentinian/LatAm tone)
- 5-step booking modal: service → barber → date/time → datos → confirmación
- Slot availability: blocks same service+barberId+date+time for non-cancelled appointments
- Admin panel at `/admin` (password: `noir2024`): appointment cards, status controls (pendiente/confirmado/cancelado), filter bar, animated stat counters

## User preferences

- All user-facing text in Spanish (professional Argentinian/LatAm tone)
- Do NOT import React explicitly (Vite JSX transformer handles it)
- Never add unused imports (TypeScript strict)

## Gotchas

- Replit secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are **swapped** — the secret named `VITE_SUPABASE_URL` actually contains the anon key, and vice versa. `supabase.ts` accounts for this by hardcoding the URL and reading the anon key from `VITE_SUPABASE_URL`.
- If Vite dep cache gets stale, run: `rm -rf artifacts/barber-landing/node_modules/.vite`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
