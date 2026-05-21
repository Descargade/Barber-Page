# NOIR — Premium Barber Landing Page Template

A cinematic, dark-aesthetic barber shop landing page with real-time booking system and admin panel. Built for Argentinian/LatAm barber clients by 2bleA.

---

## Tech Stack

- **React 19** + **Vite 7** + **TypeScript**
- **Tailwind CSS v4** + **Framer Motion**
- **Supabase** — real-time PostgreSQL backend
- **pnpm** — package manager
- **Wouter** — lightweight client-side routing
- **shadcn/ui** — base UI components

---

## Features

- Cinematic hero with parallax ambiance
- Services section with pricing
- Barber profiles
- Gallery
- Testimonials
- 5-step booking modal (service → barber → date/time → datos → confirmación)
- Real-time slot availability (no double-bookings)
- Premium animated confirmation screen
- Password-protected admin panel (`/admin`)
- Live appointment management (pendiente / confirmado / cancelado)
- Real-time sync across all open tabs

---

## Environment Variables

Create a `.env.local` file from the example:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/publishable key |

Find both in your Supabase dashboard → **Project Settings → API**.

---

## Supabase Setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a new project.

### 2. Create the `appointments` table

Run this SQL in the **Supabase SQL Editor**:

```sql
create table appointments (
  id text primary key,
  name text not null,
  phone text not null,
  service text not null,
  barber_id text not null,
  barber_name text not null,
  date text not null,
  time text not null,
  status text not null default 'pendiente',
  created_at timestamptz not null default now()
);
```

### 3. Enable RLS with public access

```sql
alter table appointments enable row level security;

create policy "public select" on appointments
  for select using (true);

create policy "public insert" on appointments
  for insert with check (true);

create policy "public update" on appointments
  for update using (true);
```

### 4. Enable Realtime

In the Supabase dashboard → **Database → Replication**, enable the `appointments` table for Realtime.

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)  
Default password: `noir2024` (change in `src/context/AdminAuthContext.tsx`)

---

## Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual steps

1. Push the repo to GitHub
2. Import the project in [vercel.com](https://vercel.com)
3. Set **Root Directory** to `artifacts/barber-landing`
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy — Vercel auto-detects Vite and uses `vercel.json` for SPA routing

---

## Cloning for a New Client

1. **Duplicate** this repo (or fork it)
2. **Create a new Supabase project** and run the schema above
3. **Update branding** in:
   - `src/context/BookingContext.tsx` → `BARBERS`, `SERVICES`
   - `src/components/Hero.tsx` → name, tagline, location
   - `src/components/Footer.tsx` → contact details
   - `src/pages/Admin.tsx` → shop name
4. **Change the admin password** in `src/context/AdminAuthContext.tsx`
5. **Set new env vars** in Vercel for the new Supabase project
6. Deploy

Estimated setup time per new client: **~15 minutes**.

---

## Project Structure

```
src/
├── components/
│   ├── BookingModal.tsx     # 5-step booking flow
│   ├── Hero.tsx             # Cinematic hero section
│   ├── Services.tsx         # Service cards with pricing
│   ├── About.tsx            # Studio story section
│   ├── Gallery.tsx          # Photo gallery
│   ├── Testimonials.tsx     # Client reviews
│   ├── BookingCTA.tsx       # Booking call-to-action
│   ├── Navbar.tsx           # Sticky navigation
│   └── Footer.tsx           # Footer with contact
├── context/
│   ├── BookingContext.tsx   # Booking state + Supabase CRUD
│   └── AdminAuthContext.tsx # Admin session auth
├── lib/
│   └── supabase.ts          # Supabase client
└── pages/
    ├── Home.tsx             # Landing page
    └── Admin.tsx            # Admin dashboard
```

---

## Admin Panel

URL: `/admin`  
Default password: `noir2024`

Features:
- Live appointment list from Supabase
- Filter by status (todos / pendiente / confirmado / cancelado)
- One-click status changes
- Animated stat counters
- Real-time updates

---

*Built with precision by 2bleA.*
